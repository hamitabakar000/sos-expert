import { NextResponse } from "next/server";
import { buildLocalRagAnswer, classifyAssistantRequest, retrieveLocalContext } from "@/lib/local-rag";
import {
  assistantSystemPrompt,
  type AssistantAttachment,
  type AssistantMessage
} from "@/lib/sos-knowledge";

type AssistantRequestBody = {
  message?: string;
  messages?: AssistantMessage[];
  attachments?: AssistantAttachment[];
};

type OpenAIChatResponse = {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
  error?: {
    message?: string;
  };
};

type AnthropicResponse = {
  content?: {
    type?: string;
    text?: string;
  }[];
  error?: {
    message?: string;
  };
};

type OllamaResponse = {
  message?: {
    content?: string;
  };
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as AssistantRequestBody | null;
  const message = body?.message?.trim();

  if (!message) {
    return NextResponse.json(
      {
        answer: "Posez-moi une question sur SOS Expert : roles, matching IA, validation admin, missions ou paiement."
      },
      { status: 400 }
    );
  }

  const history = body?.messages ?? [];
  const attachments = sanitizeAttachments(body?.attachments ?? []);
  const intent = classifyAssistantRequest(message, attachments);

  if (intent === "greeting" || intent === "clarification") {
    return NextResponse.json({
      answer: buildLocalRagAnswer(message, attachments),
      mode: "local",
      intent,
      sources: []
    });
  }

  const rag = intent === "sos"
    ? retrieveLocalContext(message, attachments)
    : { context: "", sources: [], snippets: [], hasMatches: false };
  const llmAnswer =
    (await askOpenAI(message, history, rag.context, intent)) ??
    (await askAnthropic(message, history, rag.context, intent)) ??
    (await askOllama(message, history, rag.context, intent));

  if (llmAnswer) {
    return NextResponse.json({
      answer: llmAnswer,
      mode: "llm",
      intent,
      sources: rag.sources
    });
  }

  return NextResponse.json({
    answer: buildLocalRagAnswer(message, attachments),
    mode: "local",
    intent,
    sources: rag.sources
  });
}

async function askOpenAI(
  message: string,
  history: AssistantMessage[],
  ragContext: string,
  intent: "sos" | "general"
) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const recentHistory = history.slice(-8).map((item) => ({
    role: item.role,
    content: item.content
  }));

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.35,
        messages: [
          {
            role: "system",
            content: buildSystemPrompt(ragContext, intent)
          },
          ...recentHistory,
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = (await response.json()) as OpenAIChatResponse;

    if (!response.ok) {
      console.warn("OpenAI assistant fallback:", data.error?.message ?? response.statusText);
      return null;
    }

    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (error) {
    console.warn("OpenAI assistant unavailable:", error);
    return null;
  }
}

async function askAnthropic(
  message: string,
  history: AssistantMessage[],
  ragContext: string,
  intent: "sos" | "general"
) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return null;
  }

  const recentHistory = history.slice(-8).map((item) => ({
    role: item.role,
    content: item.content
  }));

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL ?? "claude-3-5-sonnet-latest",
        max_tokens: 900,
        temperature: 0.35,
        system: buildSystemPrompt(ragContext, intent),
        messages: [
          ...recentHistory,
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = (await response.json()) as AnthropicResponse;

    if (!response.ok) {
      console.warn("Anthropic assistant fallback:", data.error?.message ?? response.statusText);
      return null;
    }

    return data.content?.find((item) => item.type === "text")?.text?.trim() || null;
  } catch (error) {
    console.warn("Anthropic assistant unavailable:", error);
    return null;
  }
}

async function askOllama(
  message: string,
  history: AssistantMessage[],
  ragContext: string,
  intent: "sos" | "general"
) {
  const model = process.env.OLLAMA_MODEL;

  if (!model) {
    return null;
  }

  const recentHistory = history.slice(-8).map((item) => ({
    role: item.role,
    content: item.content
  }));

  try {
    const response = await fetch(`${process.env.OLLAMA_URL ?? "http://127.0.0.1:11434"}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        stream: false,
        messages: [
          {
            role: "system",
            content: buildSystemPrompt(ragContext, intent)
          },
          ...recentHistory,
          {
            role: "user",
            content: message
          }
        ],
        options: {
          temperature: 0.35
        }
      }),
      signal: AbortSignal.timeout(30000)
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as OllamaResponse;
    return data.message?.content?.trim() || null;
  } catch {
    return null;
  }
}

function buildSystemPrompt(ragContext: string, intent: "sos" | "general") {
  if (intent === "general") {
    return `${assistantSystemPrompt}\n\nLa question actuelle est generale. Ne force pas de lien avec SOS Expert.`;
  }

  return `${assistantSystemPrompt}\n\nContexte RAG local SOS Expert et pieces jointes:\n${ragContext}`;
}

function sanitizeAttachments(attachments: AssistantAttachment[]) {
  return attachments
    .filter((attachment) => attachment.name && attachment.content)
    .slice(0, 5)
    .map((attachment) => ({
      name: attachment.name.slice(0, 120),
      type: attachment.type.slice(0, 80),
      content: attachment.content.slice(0, 12000)
    }));
}
