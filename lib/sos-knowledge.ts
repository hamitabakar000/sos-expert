type KnowledgeSection = {
  title: string;
  keywords: string[];
  content: string;
};

export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AssistantAttachment = {
  name: string;
  type: string;
  content: string;
};

export const sosKnowledgeSections: KnowledgeSection[] = [
  {
    title: "Vision du projet",
    keywords: ["projet", "vision", "objectif", "sos expert", "plateforme", "pfe"],
    content:
      "SOS Expert est une plateforme PFE de mise en relation entre clients et experts. L'objectif est de permettre a un client de decrire son besoin, recevoir des recommandations expliquees, puis consulter un expert ou lancer une mission complexe decoupee en Lots."
  },
  {
    title: "Roles utilisateurs",
    keywords: ["role", "client", "expert", "admin", "connexion", "profil"],
    content:
      "Le site gere trois profils : client, expert et admin. Le client cree des missions, recherche des experts, consulte et paie. L'expert gere son profil, sa disponibilite, ses Lots et ses revenus. L'admin controle les utilisateurs, les validations experts, les consultations, les avis, les notifications et les analytics."
  },
  {
    title: "Matching IA neuro-symbolique",
    keywords: ["ia", "matching", "neuro", "symbolique", "recommandation", "score", "compatibilite"],
    content:
      "Le matching combine une lecture semantique du besoin et des regles symboliques : domaine, budget, disponibilite, langue, confidentialite, statut de validation, experience et qualite de reponse. Les recommandations affichent un score, des raisons et des alertes pour eviter l'effet boite noire."
  },
  {
    title: "Modes de mission",
    keywords: ["mission", "immediate", "scheduled", "planifie", "crowdsourcing", "lots", "lot"],
    content:
      "Une mission peut etre immediate, planifiee ou crowdsourcing. Les missions simples vont vers une consultation chat, audio ou video. Les missions complexes sont decoupees en Lots confies a plusieurs experts, puis consolidees dans un livrable final."
  },
  {
    title: "Validation des experts",
    keywords: ["validation", "expert", "admin", "dossier", "document", "confirmer", "rejet", "checklist"],
    content:
      "Un expert ne doit pas etre confirme automatiquement. L'admin examine un dossier : profil, identite, diplomes, certifications, references, risques, documents, notes et checklist obligatoire. La decision doit etre motivee avant validation, rejet ou demande de complement."
  },
  {
    title: "Confiance et securite",
    keywords: ["confiance", "securite", "confidentialite", "donnees", "risque", "sante", "juridique"],
    content:
      "La confiance est centrale : profils verifies, badges, politique de confidentialite, documents sensibles, limites des domaines sante/juridique et traces de decision admin. Les experts non valides ne doivent pas apparaitre comme certifies dans l'annuaire public."
  },
  {
    title: "Paiement et revenus",
    keywords: ["paiement", "revenu", "commission", "stripe", "payout", "tarif"],
    content:
      "La demo contient un flux de paiement et revenus : montant consultation ou Lot, commission plateforme, payout expert et statut de paiement. La cible technique prevoit Stripe en mode test pour la version connectee."
  },
  {
    title: "Pages principales",
    keywords: ["page", "route", "dashboard", "annuaire", "network", "admin", "historique"],
    content:
      "Les routes principales sont : / pour la landing page, /auth/login et /auth/register pour la demo de connexion, /dashboard, /experts, /missions/new, /missions/[id], /missions/[id]/crowdsource, /consultations/[id], /network, /notifications, /earnings et les pages /admin."
  },
  {
    title: "Donnees de demonstration",
    keywords: ["demo", "donnees", "profil", "photo", "fictif", "seed"],
    content:
      "La demo utilise lib/demo-data.ts avec des utilisateurs, experts, missions, consultations, paiements, avis, notifications, collections et posts reseau. Les photos de profil sont stockees dans public/experts et public/users."
  },
  {
    title: "Stack technique",
    keywords: ["technique", "stack", "next", "tailwind", "supabase", "api", "typescript"],
    content:
      "Le socle est Next.js App Router, TypeScript strict et Tailwind CSS. Le schema cible inclut Supabase Auth, PostgreSQL, Realtime et Storage. L'interface consomme encore les donnees de demo pour avancer rapidement sur les parcours PFE."
  },
  {
    title: "Design et theme",
    keywords: ["theme", "couleur", "dark", "darkmode", "design", "style"],
    content:
      "Le site propose un changement de couleur et un mode sombre depuis la barre de navigation. Les couleurs principales utilisent des variables CSS pour adapter les boutons, badges, liens et surfaces sans refaire chaque page."
  }
];

export function buildAssistantAnswer(question: string) {
  const normalizedQuestion = normalize(question);
  const scoredSections = sosKnowledgeSections
    .map((section) => ({
      section,
      score:
        section.keywords.reduce((total, keyword) => total + (normalizedQuestion.includes(normalize(keyword)) ? 3 : 0), 0) +
        overlapScore(normalizedQuestion, normalize(`${section.title} ${section.content}`))
    }))
    .sort((a, b) => b.score - a.score);

  const selectedSections = scoredSections.filter((item) => item.score > 0).slice(0, 3);
  const sections = selectedSections.length ? selectedSections : scoredSections.slice(0, 3);

  return [
    answerIntro(question),
    ...sections.map(({ section }) => `**${section.title}**\n${section.content}`),
    "Je peux aussi expliquer un parcours precis : client, expert, admin, matching IA, validation expert, paiement ou crowdsourcing."
  ].join("\n\n");
}

export function buildAssistantContext(question: string) {
  const normalizedQuestion = normalize(question);
  const scoredSections = sosKnowledgeSections
    .map((section) => ({
      section,
      score:
        section.keywords.reduce((total, keyword) => total + (normalizedQuestion.includes(normalize(keyword)) ? 3 : 0), 0) +
        overlapScore(normalizedQuestion, normalize(`${section.title} ${section.content}`))
    }))
    .sort((a, b) => b.score - a.score);
  const selectedSections = scoredSections.filter((item) => item.score > 0).slice(0, 6);
  const sections = selectedSections.length ? selectedSections : scoredSections.slice(0, 6);

  return sections.map(({ section }) => `${section.title}: ${section.content}`).join("\n\n");
}

export const assistantSystemPrompt = [
  "Tu es l'assistant intelligent de SOS Expert, capable de traiter aussi bien les questions sur la plateforme que les questions generales.",
  "Tu reponds dans la langue de l'utilisateur, avec un style clair, naturel, precis et utile.",
  "Tu comprends les salutations et les demandes vagues sans declencher une longue reponse documentaire.",
  "Tu peux expliquer le fonctionnement du site, ses roles, son IA, son admin, les missions, le paiement, le crowdsourcing, les donnees de demo et les choix UX.",
  "Quand la question concerne SOS Expert, base-toi en priorite sur le contexte RAG fourni et ne fabrique jamais une information absente.",
  "Quand la question est generale, reponds directement avec tes connaissances et ignore les passages RAG non pertinents.",
  "Si une personne, une donnee ou un fait n'est pas identifiable avec certitude, dis-le franchement et demande le contexte minimal utile.",
  "Pour les sujets medicaux, juridiques ou financiers, reste prudent et indique les limites de la reponse.",
  "N'affiche pas tout le contexte RAG. Synthese seulement les elements utiles et cite les sources seulement si elles aident la reponse.",
  "Ne pretend pas qu'une integration reelle Supabase, Stripe ou LLM externe est terminee si elle est seulement prevue ou simulee.",
  "Quand tu expliques une fonctionnalite, donne des etapes concretes et cite les pages utiles quand c'est possible.",
  "Evite les reponses generiques : reponds d'abord a la question, puis ajoute une breve precision seulement si elle est utile."
].join(" ");

function answerIntro(question: string) {
  const normalizedQuestion = normalize(question);

  if (normalizedQuestion.includes("comment") || normalizedQuestion.includes("expliquer")) {
    return "Bien sur. Voici l'explication la plus utile pour SOS Expert :";
  }

  if (normalizedQuestion.includes("admin") || normalizedQuestion.includes("validation")) {
    return "Pour la partie administration, le point important est la confiance avant la mise en avant publique :";
  }

  if (normalizedQuestion.includes("ia") || normalizedQuestion.includes("matching")) {
    return "Pour l'IA de SOS Expert, il faut retenir qu'elle recommande mais explique aussi ses raisons :";
  }

  return "Voici ce que je peux dire a partir de la base de connaissance SOS Expert :";
}

function overlapScore(question: string, content: string) {
  const words = question.split(/\s+/).filter((word) => word.length > 3);
  return words.reduce((score, word) => score + (content.includes(word) ? 1 : 0), 0);
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
