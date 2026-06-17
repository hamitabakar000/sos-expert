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

  if (intent !== "sos") {
    return NextResponse.json({
      answer: buildLocalRagAnswer(message, attachments),
      mode: "local",
      intent,
      sources: []
    });
  }

  const rag = retrieveLocalContext(message, attachments);
  const llmAnswer =
    (await askOpenAI(message, history, rag.context)) ?? (await askAnthropic(message, history, rag.context));

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

async function askOpenAI(message: string, history: AssistantMessage[], ragContext: string) {
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
            content: `${assistantSystemPrompt}\n\nContexte RAG local SOS Expert et pieces jointes:\n${ragContext}`
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

async function askAnthropic(message: string, history: AssistantMessage[], ragContext: string) {
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
        system: `${assistantSystemPrompt}\n\nContexte RAG local SOS Expert et pieces jointes:\n${ragContext}`,
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
