import { experts } from "@/lib/demo-data";
import type { Expert, Mission, Recommendation } from "@/lib/types";

const priceTiers = {
  low: [0, 300],
  medium: [250, 550],
  high: [500, Number.POSITIVE_INFINITY]
} as const;

function tokenize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function semanticScore(mission: Mission, expert: Expert) {
  const missionTokens = new Set(tokenize(`${mission.title} ${mission.description} ${mission.domain}`));
  const expertTokens = tokenize(`${expert.bio} ${expert.domains.join(" ")} ${expert.certifications.join(" ")}`);
  const matches = expertTokens.filter((token) => missionTokens.has(token)).length;
  const domainBonus = expert.domains.includes(mission.domain) ? 40 : 0;

  return Math.min(100, domainBonus + matches * 9);
}

function symbolicRules(mission: Mission, expert: Expert) {
  const reasons: string[] = [];
  const alerts: string[] = [];
  let passed = 0;
  let total = 0;

  function check(condition: boolean, reason: string) {
    total += 1;
    if (condition) {
      passed += 1;
      reasons.push(reason);
    }
  }

  check(expert.validationStatus === "validated", "Expert certifie et valide");
  check(expert.domains.includes(mission.domain), "Domaine correspondant");
  check(mission.budgetAmount ? mission.budgetAmount >= expert.hourlyRate : true, "Budget compatible");
  check(
    expert.hourlyRate >= priceTiers[mission.budgetPreference][0] &&
      expert.hourlyRate <= priceTiers[mission.budgetPreference][1],
    "Positionnement tarifaire coherent"
  );
  check(mission.urgency !== "immediate" || expert.isAvailableImmediately, "Disponible selon l'urgence");
  check(
    mission.confidentiality !== "strict" || expert.confidentialityPolicy === "strict_ok",
    "Confidentialite stricte acceptee"
  );

  if (mission.complexityScore > 7 && expert.flatRate) {
    alerts.push("Mission complexe au forfait : suivi horaire recommande");
  }

  if (mission.complexityScore > 8 && mission.mode === "immediate") {
    alerts.push("Mission complexe : rendez-vous planifie recommande");
  }

  return {
    passed,
    total,
    ruleScore: Math.round((passed / total) * 100),
    reasons,
    alerts
  };
}

export function recommendExperts(mission: Mission, limit = 5): Recommendation[] {
  return experts
    .map((expert) => {
      const semantic = semanticScore(mission, expert);
      const rules = symbolicRules(mission, expert);
      const ratingScore = Math.round((expert.averageRating / 5) * 100);
      const compatibilityScore = Math.round(semantic * 0.5 + rules.ruleScore * 0.3 + ratingScore * 0.2);

      return {
        expert,
        compatibilityScore,
        semanticScore: semantic,
        ruleScore: rules.ruleScore,
        matchReasons: rules.reasons,
        alerts: rules.alerts,
        rank: 0
      };
    })
    .filter((recommendation) => recommendation.ruleScore >= 65)
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
    .slice(0, limit)
    .map((recommendation, index) => ({
      ...recommendation,
      rank: index + 1
    }));
}

export function evaluateCrowdsourcing(mission: Mission) {
  const divisibility = mission.complexityScore > 7 ? 0.9 : 0.45;
  const lowCoupling = mission.description.length > 140 ? 0.75 : 0.5;
  const consolidability = mission.domain.includes("IT") || mission.domain.includes("Finance") ? 0.82 : 0.62;
  const score = divisibility * 0.4 + lowCoupling * 0.35 + consolidability * 0.25;

  return {
    score,
    decision: score > 0.7 ? "eligible" : score >= 0.4 ? "hybrid" : "simple",
    criteria: {
      divisibility,
      lowCoupling,
      consolidability
    }
  };
}
