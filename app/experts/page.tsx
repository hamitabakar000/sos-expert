import { ExpertSearch } from "@/components/expert-search";
import { SiteHeader } from "@/components/site-header";
import { domains, experts } from "@/lib/demo-data";

export default function ExpertsPage() {
  const validatedExperts = experts.filter((expert) => expert.validationStatus === "validated");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div>
          <p className="font-semibold text-accent">Recherche & discovery</p>
          <h1 className="font-display text-3xl font-bold text-primary">Experts certifies</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Des profils verifies, avec une vraie photo, un parcours lisible et des signaux simples pour choisir avec confiance.
          </p>
        </div>

        <ExpertSearch experts={validatedExperts} domains={domains} />
      </main>
    </>
  );
}
