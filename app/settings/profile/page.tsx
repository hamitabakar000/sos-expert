import { ProfilePhoto } from "@/components/profile-photo";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";

export default function ProfileSettingsPage() {
  const user = getCurrentUser();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <section className="rounded-lg border border-border bg-white p-6 shadow-card">
          <div className="flex items-center gap-4">
            <ProfilePhoto src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} initials={user.avatarInitials} size="xl" />
            <div>
              <p className="font-semibold text-accent">Parametres</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-primary">Profil personnel</h1>
              <p className="mt-1 text-slate-600">Les experts verront uniquement les informations utiles a la mission.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="Prenom" value={user.firstName} />
            <Field label="Nom" value={user.lastName} />
            <Field label="Email" value={user.email} />
            <Field label="Ville" value={user.city} />
          </div>
          <button className="mt-6 rounded-full bg-accent px-5 py-3 font-semibold text-white">Enregistrer</button>
        </section>
      </main>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block text-sm font-semibold text-primary">
      {label}
      <input className="focus-ring mt-2 w-full rounded-lg border border-border px-4 py-3" defaultValue={value} />
    </label>
  );
}
