import { ExpertValidationBoard } from "@/components/expert-validation-board";
import { SiteHeader } from "@/components/site-header";
import { expertValidationCases, experts } from "@/lib/demo-data";

export default function PendingExpertsPage() {
  const pendingExperts = experts.filter((expert) => expert.validationStatus === "pending");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-semibold text-accent">Controle qualite</p>
            <h1 className="font-display text-3xl font-bold text-primary">Validation des experts</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Un expert ne peut etre confirme qu'apres examen de son CV, de son profil, des pieces, des risques et
              d'une note de decision admin. Les profils incomplets restent bloques.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-white px-4 py-3 text-sm shadow-card">
            <p className="font-bold text-primary">{pendingExperts.length} experts en attente</p>
            <p className="mt-1 text-muted">{expertValidationCases.length} dossiers ouverts</p>
          </div>
        </div>

        <ExpertValidationBoard cases={expertValidationCases} experts={experts} />
      </main>
    </>
  );
}
