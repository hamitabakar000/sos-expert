import { CheckCircle2, Clock, GitBranch } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { experts, lots, missions } from "@/lib/demo-data";
import { formatMad } from "@/lib/utils";

export default function CrowdsourcePage() {
  const mission = missions[0];
  const deliveredLots = lots.filter((lot) => lot.status === "delivered" || lot.status === "validated").length;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 font-semibold text-accent">
              <GitBranch className="h-5 w-5" />
              Session crowdsourcing
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-primary">{mission.title}</h1>
          </div>
          <div className="rounded-lg border border-border bg-white px-5 py-3 text-right shadow-card">
            <p className="text-sm text-muted">Budget total</p>
            <strong className="font-display text-2xl text-primary">{formatMad(mission.budgetAmount ?? 0)}</strong>
          </div>
        </div>

        <section className="mt-8 rounded-lg border border-border bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold text-primary">Progression des Lots</h2>
              <p className="mt-1 text-sm text-muted">
                {deliveredLots}/{lots.length} Lots livres, consolidation IA en attente.
              </p>
            </div>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-warning">En cours</span>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-accent" style={{ width: `${(deliveredLots / lots.length) * 100}%` }} />
          </div>

          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3">Lot</th>
                  <th className="px-4 py-3">Expert</th>
                  <th className="px-4 py-3">Deadline</th>
                  <th className="px-4 py-3">Budget</th>
                  <th className="px-4 py-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {lots.map((lot) => {
                  const expert = experts.find((item) => item.id === lot.expertId);
                  return (
                    <tr key={lot.id}>
                      <td className="px-4 py-4">
                        <strong className="block text-primary">
                          Lot {lot.number} - {lot.title}
                        </strong>
                        <span className="mt-1 block text-muted">{lot.description}</span>
                      </td>
                      <td className="px-4 py-4">{expert ? `${expert.firstName} ${expert.lastName}` : "A assigner"}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent" />
                          {lot.deadline}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-semibold">{formatMad(lot.budget)}</td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-700">
                          {lot.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-border bg-white p-6 shadow-card">
          <h2 className="font-display text-xl font-bold text-primary">Consolidation IA</h2>
          <p className="mt-3 flex items-center gap-2 text-slate-600">
            <CheckCircle2 className="h-5 w-5 text-success" />
            Le livrable final sera disponible lorsque tous les Lots seront valides par le client.
          </p>
        </section>
      </main>
    </>
  );
}
