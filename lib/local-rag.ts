import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { sosKnowledgeSections, type AssistantAttachment } from "@/lib/sos-knowledge";

type RagChunk = {
  source: string;
  title: string;
  content: string;
};

type ScoredChunk = RagChunk & {
  score: number;
};

export type AssistantIntent = "greeting" | "clarification" | "sos" | "off_topic";

const workspaceRoot = process.cwd();
const MAX_ATTACHMENT_CHARS = 12000;
const SOS_RELEVANCE_THRESHOLD = 2;

const localFiles = [
  { source: "Spec PFE", path: "sos_expert_spec_v2.md" },
  { source: "README", path: "README.md" },
  { source: "Types applicatifs", path: "lib/types.ts" },
  { source: "Donnees demo", path: "lib/demo-data.ts" },
  { source: "Matching IA demo", path: "lib/matching.ts" },
  { source: "Schema Supabase", path: "supabase/migrations/0001_initial_schema.sql" }
];

const greetingWords = new Set([
  "hi",
  "hello",
  "hey",
  "salut",
  "bonjour",
  "bonsoir",
  "cc",
  "coucou",
  "salam",
  "slt"
]);

const clarificationPatterns = [
  "comment ca marche",
  "comment ça marche",
  "explique moi",
  "tu peux expliquer",
  "c'est quoi",
  "cest quoi"
];

const sosKeywords = [
  "sos",
  "expert",
  "client",
  "admin",
  "utilisateur",
  "profil",
  "connexion",
  "inscription",
  "auth",
  "mission",
  "consultation",
  "rendez",
  "paiement",
  "revenu",
  "stripe",
  "matching",
  "ia",
  "rag",
  "llm",
  "chatbot",
  "assistant",
  "validation",
  "valider",
  "diplome",
  "certification",
  "document",
  "piece",
  "jointe",
  "crowdsourcing",
  "lot",
  "annuaire",
  "dashboard",
  "reseau",
  "notification",
  "avis",
  "photo",
  "theme",
  "couleur",
  "dark",
  "supabase",
  "tailwind",
  "next"
];

export function classifyAssistantRequest(question: string, attachments: AssistantAttachment[] = []): AssistantIntent {
  const normalizedQuestion = normalize(question).trim();
  const tokens = normalizedQuestion.split(/[^a-z0-9]+/).filter(Boolean);

  if (attachments.length > 0) {
    return "sos";
  }

  if (!normalizedQuestion) {
    return "clarification";
  }

  const words = extractWords(normalizedQuestion);
  const isShortGreeting = tokens.length > 0 && tokens.length <= 3 && tokens.every((word) => greetingWords.has(word));

  if (isShortGreeting) {
    return "greeting";
  }

  if (sosRelevanceScore(normalizedQuestion, words) >= SOS_RELEVANCE_THRESHOLD) {
    return "sos";
  }

  if (words.length <= 5 && clarificationPatterns.some((pattern) => normalizedQuestion.includes(normalize(pattern)))) {
    return "clarification";
  }

  return "off_topic";
}

export function retrieveLocalContext(question: string, attachments: AssistantAttachment[] = []) {
  const chunks = [...buildProjectChunks(), ...buildAttachmentChunks(attachments)];
  const query = normalize(question);
  const queryWords = extractWords(query);
  const scoredChunks = chunks
    .map((chunk) => ({
      ...chunk,
      score: scoreChunk(chunk, query, queryWords)
    }))
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 9);

  const selectedChunks = scoredChunks.length ? scoredChunks : chunks.slice(0, 6).map((chunk) => ({ ...chunk, score: 0 }));

  return {
    context: selectedChunks
      .map(
        (chunk, index) =>
          `[${index + 1}] Source: ${chunk.source} - ${chunk.title}\n${compact(chunk.content, 1800)}`
      )
      .join("\n\n"),
    snippets: selectedChunks.slice(0, 4).map((chunk) => ({
      source: chunk.source,
      title: chunk.title,
      text: snippet(chunk.content)
    })),
    sources: selectedChunks.map((chunk) => ({
      source: chunk.source,
      title: chunk.title
    })),
    hasMatches: scoredChunks.length > 0
  };
}

export function buildLocalRagAnswer(question: string, attachments: AssistantAttachment[] = []) {
  const intent = classifyAssistantRequest(question, attachments);

  if (intent === "greeting") {
    return "Salut ! Je suis l'assistant SOS Expert. Je peux t'aider sur le fonctionnement du projet, les roles client/expert/admin, le matching IA, la validation des experts, les missions, le paiement ou le RAG local.";
  }

  if (intent === "clarification") {
    return "Je peux t'aider, mais precise un peu le sujet SOS Expert : tu veux parler du parcours client, du profil expert, de l'admin, du matching IA, du paiement, du crowdsourcing ou du chatbot RAG ?";
  }

  if (intent === "off_topic") {
    return "Je suis reserve au projet SOS Expert. Je peux repondre sur la plateforme, ses profils, son matching IA, son administration, ses missions, ses paiements, son design et son chatbot RAG.";
  }

  const { snippets, sources, hasMatches } = retrieveLocalContext(question, attachments);
  const sourceList = sources
    .slice(0, 4)
    .map((source) => `- ${source.source} : ${source.title}`)
    .join("\n");
  const usefulSnippets = snippets
    .slice(0, 3)
    .map((item) => `- ${item.text}`)
    .join("\n");

  return [
    hasMatches
      ? "Voici la reponse cote SOS Expert, a partir du RAG local :"
      : "Je n'ai pas trouve de passage tres precis, mais voici le cadre general SOS Expert :",
    usefulSnippets,
    practicalConclusion(question),
    sourceList ? `Sources utilisees :\n${sourceList}` : ""
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildProjectChunks() {
  const knowledgeChunks = sosKnowledgeSections.map((section) => ({
    source: "Base connaissance SOS Expert",
    title: section.title,
    content: section.content
  }));

  return [...knowledgeChunks, ...localFiles.flatMap(readFileChunks)];
}

function readFileChunks(file: { source: string; path: string }) {
  const fullPath = join(workspaceRoot, file.path);

  if (!existsSync(fullPath)) {
    return [];
  }

  const content = readFileSync(fullPath, "utf8");
  return chunkText(content, file.source, file.path);
}

function buildAttachmentChunks(attachments: AssistantAttachment[]) {
  return attachments.flatMap((attachment) =>
    chunkText(
      compact(attachment.content, MAX_ATTACHMENT_CHARS),
      `Piece jointe: ${attachment.name}`,
      attachment.type || "document"
    )
  );
}

function chunkText(content: string, source: string, title: string) {
  const cleanContent = content.replace(/\r/g, "").trim();
  if (!cleanContent) {
    return [];
  }

  const paragraphs = cleanContent.split(/\n{2,}/);
  const chunks: RagChunk[] = [];
  let buffer = "";

  for (const paragraph of paragraphs) {
    const next = buffer ? `${buffer}\n\n${paragraph}` : paragraph;
    if (next.length > 1600 && buffer) {
      chunks.push({ source, title, content: buffer });
      buffer = paragraph;
    } else {
      buffer = next;
    }
  }

  if (buffer) {
    chunks.push({ source, title, content: buffer });
  }

  return chunks.slice(0, 40);
}

function scoreChunk(chunk: RagChunk, query: string, queryWords: string[]) {
  const content = normalize(`${chunk.source} ${chunk.title} ${chunk.content}`);
  let score = 0;

  if (content.includes(query) && query.length > 8) {
    score += 12;
  }

  for (const word of queryWords) {
    if (content.includes(word)) {
      score += word.length > 6 ? 2 : 1;
    }
  }

  if (chunk.source === "Base connaissance SOS Expert" && score > 0) {
    score += 5;
  }

  if (chunk.title === "Validation des experts" && /valid|confirm|dossier|document|certif|admin/.test(query)) {
    score += 12;
  }

  if (chunk.title === "Roles utilisateurs" && /role|client|expert|admin|utilisateur|profil/.test(query)) {
    score += 8;
  }

  if (chunk.title === "Matching IA neuro-symbolique" && /matching|recommand|score|ia|algorithme/.test(query)) {
    score += 8;
  }

  if (chunk.title === "Modes de mission" && /mission|lot|crowd|consultation|rendez/.test(query)) {
    score += 8;
  }

  if (chunk.source.startsWith("Piece jointe")) {
    score += 4;
  }

  return score;
}

function sosRelevanceScore(question: string, words: string[]) {
  let score = 0;

  for (const keyword of sosKeywords) {
    const normalizedKeyword = normalize(keyword);
    if (question.includes(normalizedKeyword)) {
      score += normalizedKeyword.length > 4 ? 2 : 1;
    }
  }

  if (question.includes("sos expert")) {
    score += 4;
  }

  if (words.some((word) => ["site", "plateforme", "page", "projet", "pfe", "application"].includes(word))) {
    score += 1;
  }

  return score;
}

function extractWords(value: string) {
  return Array.from(new Set(value.split(/[^a-z0-9]+/).filter((word) => word.length > 2)));
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function compact(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength)}\n...[contenu tronque]`;
}

function snippet(value: string) {
  const cleanValue = value
    .replace(/\s+/g, " ")
    .replace(/export const .*?= \[/g, "")
    .replace(/[{}[\]";]/g, "")
    .trim();

  return compact(cleanValue, 360);
}

function practicalConclusion(question: string) {
  const normalizedQuestion = normalize(question);

  if (/valid|confirm|dossier|document|certif|admin/.test(normalizedQuestion)) {
    return "Concretement, l'admin doit ouvrir le dossier expert, verifier les justificatifs, consulter les alertes, ajouter une note de decision, puis valider, rejeter ou demander un complement.";
  }

  if (/chatbot|assistant|rag|llm|piece|jointe/.test(normalizedQuestion)) {
    return "Concretement, le bot detecte d'abord l'intention, refuse les demandes hors SOS Expert, recupere les passages locaux utiles, puis repond en langage naturel avec les sources quand elles sont pertinentes.";
  }

  if (/matching|recommand|score|ia/.test(normalizedQuestion)) {
    return "Concretement, le matching doit expliquer pourquoi un expert est recommande : domaine, disponibilite, budget, langue, validation, experience et niveau de confiance.";
  }

  if (/mission|lot|crowd|consultation|rendez/.test(normalizedQuestion)) {
    return "Concretement, SOS Expert oriente le besoin vers une consultation simple ou vers une mission decoupee en Lots quand plusieurs specialites doivent intervenir.";
  }

  return "Concretement, la reponse doit rester centree sur SOS Expert et donner une action ou une page utile plutot qu'un long extrait documentaire.";
}
