import Link from "next/link";
import { AlertTriangle, GitBranch, Paperclip } from "lucide-react";
import { ExpertCard } from "@/components/expert-card";
import { SiteHeader } from "@/components/site-header";
import { missions } from "@/lib/demo-data";
import { evaluateCrowdsourcing, recommendExperts } from "@/lib/matching";
import { formatMad } from "@/lib/utils";

type MissionPageProps = {
  params: {
    id: string;
  };
};

export default function MissionPage({ params }: MissionPageProps) {
  const mission = missions.find((item) => item.id === params.id) ?? missions[0];
  const recommendations = recommendExperts(mission);
  const crowdsourcing = evaluateCrowdsourcing(mission);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {crowdsourcing.decision !== "simple" ? (
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-950">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="flex items-center gap-2 font-semibold">
                <GitBranch className="h-5 w-5" />
                Mission complexe detectee : score crowdsourcing {Math.round(crowdsourcing.score * 100)}%
              </p>
              <Link href="/missions/mis-001/crowdsource" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">
                Decomposer en taches paralleles
              </Link>
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="h-fit rounded-lg border border-border bg-white p-6 shadow-card">
            <p className="font-semibold text-accent">Mission</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-primary">{mission.title}</h1>
            <p className="mt-4 leading-7 text-slate-600">{mission.description}</p>
            <dl className="mt-6 grid gap-4 text-sm">
              <div className="flex justify-between gap-4 border-t border-border pt-4">
                <dt className="font-semibold text-muted">Domaine</dt>
                <dd className="font-bold text-primary">{mission.domain}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-border pt-4">
                <dt className="font-semibold text-muted">Budget</dt>
                <dd className="font-bold text-primary">{mission.budgetAmount ? formatMad(mission.budgetAmount) : "A definir"}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-border pt-4">
                <dt className="font-semibold text-muted">Urgence</dt>
                <dd className="font-bold text-primary">{mission.urgency}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-border pt-4">
                <dt className="font-semibold text-muted">Confidentialite</dt>
                <dd className="font-bold text-primary">{mission.confidentiality}</dd>
              </div>
            </dl>
            <button className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold">
              <Paperclip className="h-4 w-4" />
              2 pieces jointes
            </button>
          </aside>

          <section>
            <div>
              <p className="font-semibold text-accent">IA neuro-symbolique</p>
              <h2 className="font-display text-3xl font-bold text-primary">Experts recommandes pour vous</h2>
              <p className="mt-2 max-w-2xl text-slate-600">
                La recommandation ne remplace pas votre choix : elle vous donne une short-list claire, avec des raisons et des alertes.
              </p>
            </div>
            <div className="mt-6 grid gap-5 xl:grid-cols-2">
              {recommendations.map((recommendation) => (
                <div key={recommendation.expert.id}>
                  <ExpertCard expert={recommendation.expert} recommendation={recommendation} />
                  {recommendation.alerts.length ? (
                    <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                      {recommendation.alerts.map((alert) => (
                        <p key={alert} className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          {alert}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
