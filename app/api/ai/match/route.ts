import { NextResponse } from "next/server";
import { missions } from "@/lib/demo-data";
import { recommendExperts } from "@/lib/matching";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { missionId?: string } | null;
  const mission = missions.find((item) => item.id === body?.missionId) ?? missions[0];

  return NextResponse.json({
    missionId: mission.id,
    recommendations: recommendExperts(mission).map((recommendation) => ({
      expert_id: recommendation.expert.id,
      compatibility_score: recommendation.compatibilityScore,
      semantic_score: recommendation.semanticScore,
      rule_score: recommendation.ruleScore,
      match_reasons: recommendation.matchReasons,
      alerts: recommendation.alerts,
      rank: recommendation.rank
    }))
  });
}
