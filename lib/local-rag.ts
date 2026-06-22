import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { demoUsers, experts } from "@/lib/demo-data";
import { sosKnowledgeSections, type AssistantAttachment } from "@/lib/sos-knowledge";

type RagChunk = {
  source: string;
  title: string;
  content: string;
};

type ScoredChunk = RagChunk & {
  score: number;
};

export type AssistantIntent = "greeting" | "clarification" | "sos" | "general";

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
  "slt",
  "sava",
  "cv"
]);

const smallTalkPatterns = [
  "ca va",
  "sava",
  "comment vas tu",
  "comment allez vous",
  "quoi de neuf",
  "merci",
  "thanks",
  "qui es tu",
  "ton nom"
];

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

  if (isShortGreeting || smallTalkPatterns.some((pattern) => normalizedQuestion.includes(normalize(pattern)))) {
    return "greeting";
  }

  if (sosRelevanceScore(normalizedQuestion, words) >= SOS_RELEVANCE_THRESHOLD) {
    return "sos";
  }

  if (words.length <= 5 && clarificationPatterns.some((pattern) => normalizedQuestion.includes(normalize(pattern)))) {
    return "clarification";
  }

  return "general";
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
    return buildSmallTalkAnswer(question);
  }

  if (intent === "clarification") {
    return "Je peux t'aider, mais precise un peu le sujet SOS Expert : tu veux parler du parcours client, du profil expert, de l'admin, du matching IA, du paiement, du crowdsourcing ou du chatbot RAG ?";
  }

  if (intent === "general") {
    return buildGeneralLocalAnswer(question);
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

function buildSmallTalkAnswer(question: string) {
  const normalizedQuestion = normalize(question);

  if (/merci|thanks/.test(normalizedQuestion)) {
    return "Avec plaisir ! Si tu veux, envoie-moi directement la prochaine question, même en une phrase courte.";
  }

  if (/qui es tu|ton nom/.test(normalizedQuestion)) {
    return "Je suis l'assistant intelligent de SOS Expert. J'utilise la base locale du projet pour les questions sur la plateforme et un fournisseur LLM lorsqu'il est configuré pour les sujets généraux.";
  }

  if (/ca va|sava|comment vas tu|comment allez vous|quoi de neuf/.test(normalizedQuestion)) {
    return "Ça va bien, merci ! Je suis prêt. Tu peux me demander quelque chose sur SOS Expert, un profil, une fonctionnalité, un document ou un sujet général.";
  }

  return "Bonjour ! Comment puis-je t'aider aujourd'hui ?";
}

function buildGeneralLocalAnswer(question: string) {
  const normalizedQuestion = normalize(question);
  const peopleQuestion = /^(qui|c est qui|connais tu|parle moi de)/.test(normalizedQuestion);

  if (peopleQuestion) {
    const matches = findPeople(question);

    if (matches.length === 1) {
      return describePerson(matches[0]);
    }

    if (matches.length > 1) {
      return [
        "J'ai trouvé plusieurs personnes proches de ce nom dans SOS Expert :",
        ...matches.slice(0, 4).map((person) => `- ${person.name} — ${person.description}`),
        "Précise le nom complet et je te donnerai le bon profil."
      ].join("\n");
    }

    const requestedName = normalizedQuestion
      .replace(/^(qui est|qui|c est qui|connais tu|parle moi de)\s+/, "")
      .trim();
    return `Je ne trouve pas de profil correspondant exactement à « ${requestedName || question} » dans les données SOS Expert. Il peut s'agir d'une faute dans le nom ou d'une personne externe. Donne-moi son nom complet, son métier ou son entreprise pour éviter d'inventer.`;
  }

  if (/quelle heure|date aujourd|quel jour/.test(normalizedQuestion)) {
    return `Nous sommes le ${new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeZone: "Africa/Casablanca" }).format(new Date())}.`;
  }

  return [
    `J'ai bien compris la question : « ${question.trim()} ».`,
    "Le moteur local n'a pas de connaissance fiable suffisante pour y répondre sans risquer d'inventer.",
    "Ajoute un peu de contexte, ou configure OpenAI, Anthropic ou Ollama pour obtenir une réponse générale complète."
  ].join(" ");
}

type PersonMatch = {
  name: string;
  description: string;
  score: number;
  expertId?: string;
};

function findPeople(question: string): PersonMatch[] {
  const personQuery = normalize(question).replace(/^(qui est|qui|c est qui|connais tu|parle moi de)\s+/, "").trim();
  const queryWords = extractWords(personQuery);
  const people: PersonMatch[] = [
    ...experts.map((expert) => ({
      name: `${expert.firstName} ${expert.lastName}`,
      description: `${expert.title}, ${expert.city}, ${expert.yearsExperience} ans d'expérience`,
      expertId: expert.id,
      score: 0
    })),
    ...demoUsers.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      description: `${roleLabel(user.role)} SOS Expert à ${user.city}`,
      score: 0
    }))
  ];

  const exactMatches = people.filter((person) => normalize(person.name) === personQuery);
  if (exactMatches.length) {
    return exactMatches.slice(0, 1);
  }

  const ranked = people
    .map((person) => {
      const nameWords = extractWords(normalize(person.name));
      const score = queryWords.reduce((total, queryWord) => {
        const best = Math.max(...nameWords.map((nameWord) => wordSimilarity(queryWord, nameWord)), 0);
        return total + best;
      }, 0);
      return { ...person, score };
    })
    .filter((person) => person.score >= Math.max(0.65, queryWords.length * 0.42))
    .sort((a, b) => b.score - a.score)
    .filter((person, index, all) => all.findIndex((item) => item.name === person.name) === index);
  const bestScore = ranked[0]?.score ?? 0;

  return ranked.filter((person) => person.score >= bestScore - 0.25).slice(0, 5);
}

function describePerson(person: PersonMatch) {
  const expert = person.expertId ? experts.find((item) => item.id === person.expertId) : undefined;

  if (!expert) {
    return `${person.name} est ${person.description}.`;
  }

  return `${expert.firstName} ${expert.lastName} est ${expert.title.toLowerCase()} à ${expert.city}. Son profil couvre ${expert.domains.join(", ")}, avec ${expert.yearsExperience} ans d'expérience, une note de ${expert.averageRating}/5 et un tarif de ${expert.hourlyRate} MAD/h.`;
}

function wordSimilarity(left: string, right: string) {
  if (left === right) return 1;
  if (left.includes(right) || right.includes(left)) return 0.82;
  const distance = levenshtein(left, right);
  return 1 - distance / Math.max(left.length, right.length, 1);
}

function levenshtein(left: string, right: string) {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= right.length; j += 1) {
      const current = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        previous + (left[i - 1] === right[j - 1] ? 0 : 1)
      );
      previous = current;
    }
  }
  return row[right.length];
}

function roleLabel(role: "client" | "expert" | "admin") {
  if (role === "admin") return "administrateur";
  if (role === "expert") return "expert";
  return "client";
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
