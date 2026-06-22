import { NewMissionForm } from "@/components/new-mission-form";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { domains } from "@/lib/demo-data";

export default function NewMissionPage() {
  const user = getCurrentUser();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div>
          <p className="font-semibold text-accent">Publication de mission</p>
          <h1 className="font-display text-3xl font-bold text-primary">Nouvelle mission</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Décrivez votre besoin. Après l’envoi, l’administration contrôle la demande avant le matching avec les experts.
          </p>
        </div>
        <NewMissionForm domains={domains} user={user} />
      </main>
    </>
  );
}
