"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Bot, FileText, Loader2, MessageCircle, Paperclip, Send, Sparkles, X } from "lucide-react";
import type { AssistantAttachment, AssistantMessage } from "@/lib/sos-knowledge";
import { cn } from "@/lib/utils";

const starterQuestions = [
  "Explique le projet SOS Expert",
  "Comment marche le matching IA ?",
  "Comment un admin valide un expert ?",
  "Quelle difference entre mission simple et crowdsourcing ?"
];

export function SosAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState<AssistantAttachment[]>([]);
  const [attachmentError, setAttachmentError] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      role: "assistant",
      content:
        "Bonjour, je suis l'assistant SOS Expert. Posez-moi une question sur la plateforme, un document ou un sujet general : je repondrai directement et je vous dirai clairement quand une information me manque."
    }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function askBot(question: string) {
    const trimmedQuestion = question.trim();

    if ((!trimmedQuestion && attachments.length === 0) || loading) {
      return;
    }

    const pendingAttachments = attachments;
    const displayQuestion = trimmedQuestion || "Analyse les pieces jointes.";
    setInput("");
    setAttachments([]);
    setLoading(true);
    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: pendingAttachments.length
          ? `${displayQuestion}\n\nPieces jointes : ${pendingAttachments.map((attachment) => attachment.name).join(", ")}`
          : displayQuestion
      }
    ]);

    try {
      const history = messages.slice(-8);
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: displayQuestion, messages: history, attachments: pendingAttachments })
      });
      const data = (await response.json()) as {
        answer?: string;
        mode?: "llm" | "local";
        intent?: "greeting" | "clarification" | "sos" | "general";
        sources?: { source: string; title: string }[];
      };
      const sourceText = data.sources?.length
        ? `\n\nSources RAG : ${data.sources
            .slice(0, 4)
            .map((source) => `${source.source} / ${source.title}`)
            .join(" ; ")}`
        : "";

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `${data.answer ?? "Je n'ai pas pu generer une reponse claire. Essayez de reformuler."}${sourceText}`
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "Je n'arrive pas a joindre le bot pour le moment, mais la base SOS Expert reste disponible localement."
        }
      ]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askBot(input);
  }

  async function attachFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    setAttachmentError("");

    if (!files.length) {
      return;
    }

    const nextAttachments: AssistantAttachment[] = [];

    for (const file of files.slice(0, 5)) {
      if (!isSupportedTextFile(file)) {
        setAttachmentError("Formats acceptes : txt, md, csv, json, ts, tsx, js, jsx, sql. Pour PDF/DOCX, exportez en texte.");
        continue;
      }

      if (file.size > 500_000) {
        setAttachmentError("Piece jointe trop grande : limitez chaque fichier a 500 Ko pour la demo locale.");
        continue;
      }

      const content = await file.text();
      nextAttachments.push({
        name: file.name,
        type: file.type || file.name.split(".").pop() || "text",
        content
      });
    }

    setAttachments((current) => [...current, ...nextAttachments].slice(0, 5));
  }

  function removeAttachment(name: string) {
    setAttachments((current) => current.filter((attachment) => attachment.name !== name));
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <section className="assistant-panel mb-4 flex max-h-[calc(100vh-7rem)] w-[min(94vw,420px)] flex-col overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-2xl">
          <div className="assistant-header flex items-center justify-between gap-3 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-bold">Assistant SOS Expert</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/75">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  IA generale + RAG projet
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="focus-ring rounded-full p-2 hover:bg-white/10"
              aria-label="Fermer le chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="assistant-messages flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message, index) => (
              <article
                key={`${message.role}-${index}`}
                className={cn(
                  "max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-card",
                  message.role === "user"
                    ? "ml-auto rounded-br-md bg-accent text-white"
                    : "mr-auto rounded-bl-md border border-border bg-white text-slate-700"
                )}
              >
                {formatMessage(message.content)}
              </article>
            ))}
            {loading ? (
              <div className="mr-auto flex w-fit items-center gap-2 rounded-lg border border-border bg-white px-4 py-3 text-sm text-muted shadow-card">
                <Loader2 className="h-4 w-4 animate-spin" />
                Le bot reflechit...
              </div>
            ) : null}
          </div>

          <div className="assistant-composer border-t border-border bg-white p-3">
            {attachments.length ? (
              <div className="mb-3 flex flex-wrap gap-2">
                {attachments.map((attachment) => (
                  <span
                    key={attachment.name}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-primary"
                  >
                    <FileText className="h-3 w-3" />
                    {attachment.name}
                    <button
                      type="button"
                      onClick={() => removeAttachment(attachment.name)}
                      className="rounded-full text-muted hover:text-error"
                      aria-label={`Retirer ${attachment.name}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : null}
            {attachmentError ? <p className="mb-3 text-xs font-semibold text-error">{attachmentError}</p> : null}
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {starterQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => void askBot(question)}
                  className="focus-ring shrink-0 rounded-full bg-accent-light px-3 py-2 text-xs font-semibold text-accent hover:bg-slate-100"
                >
                  {question}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".txt,.md,.csv,.json,.ts,.tsx,.js,.jsx,.sql,text/*,application/json"
                onChange={attachFiles}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary hover:bg-slate-100"
                aria-label="Ajouter des pieces jointes"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="focus-ring min-w-0 flex-1 rounded-full border border-border px-4 py-3 text-sm"
                placeholder="Posez votre question..."
              />
              <button
                type="submit"
                disabled={loading || (!input.trim() && attachments.length === 0)}
                className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                aria-label="Envoyer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => {
          setOpen((current) => !current);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
        className="focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-2xl transition hover:scale-105"
        aria-label="Ouvrir le chat SOS Expert"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        <span className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
          <Sparkles className="h-3 w-3" />
        </span>
      </button>
    </div>
  );
}

function isSupportedTextFile(file: File) {
  const extension = file.name.toLowerCase().split(".").pop();
  return (
    file.type.startsWith("text/") ||
    file.type === "application/json" ||
    ["txt", "md", "csv", "json", "ts", "tsx", "js", "jsx", "sql"].includes(extension ?? "")
  );
}

function formatMessage(content: string) {
  return content.split("\n\n").map((paragraph, index) => {
    if (paragraph.startsWith("**")) {
      const titleEnd = paragraph.indexOf("**", 2);
      const title = paragraph.slice(2, titleEnd);
      const body = paragraph.slice(titleEnd + 2).trim();

      return (
        <div key={index} className={index ? "mt-3" : undefined}>
          <p className="font-bold text-primary">{title}</p>
          <p className="mt-1 whitespace-pre-wrap">{body}</p>
        </div>
      );
    }

    return (
      <p key={index} className={index ? "mt-3 whitespace-pre-wrap" : "whitespace-pre-wrap"}>
        {paragraph}
      </p>
    );
  });
}
