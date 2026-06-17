import { ProfilePhoto } from "@/components/profile-photo";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { domains, experts } from "@/lib/demo-data";

export default function ExpertProfileSettingsPage() {
  const user = getCurrentUser();
  const expert = experts.find((item) => item.id === user.expertId) ?? experts[1];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <section className="rounded-lg border border-border bg-white p-6 shadow-card">
          <div className="flex items-center gap-4">
            <ProfilePhoto
              src={expert.avatarUrl}
              alt={`${expert.firstName} ${expert.lastName}`}
              initials={`${expert.firstName[0]}${expert.lastName[0]}`}
              size="xl"
            />
            <div>
              <p className="font-semibold text-accent">Dossier expert</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-primary">Profil professionnel</h1>
              <p className="mt-1 text-slate-600">Votre page doit donner envie de vous faire confiance avant meme le premier message.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-semibold text-primary md:col-span-2">
              Titre
              <input className="focus-ring mt-2 w-full rounded-lg border border-border px-4 py-3" defaultValue={expert.title} />
            </label>
            <label className="block text-sm font-semibold text-primary md:col-span-2">
              Bio
              <textarea className="focus-ring mt-2 min-h-36 w-full rounded-lg border border-border p-4" defaultValue={expert.bio} />
            </label>
            <label className="block text-sm font-semibold text-primary">
              Tarif horaire
              <input className="focus-ring mt-2 w-full rounded-lg border border-border px-4 py-3" defaultValue={expert.hourlyRate} />
            </label>
            <label className="block text-sm font-semibold text-primary">
              Domaines
              <select className="focus-ring mt-2 w-full rounded-lg border border-border bg-white px-4 py-3">
                {domains.map((domain) => (
                  <option key={domain}>{domain}</option>
                ))}
              </select>
            </label>
          </div>
          <button className="mt-6 rounded-full bg-accent px-5 py-3 font-semibold text-white">Soumettre a validation</button>
        </section>
      </main>
    </>
  );
}
