import { SiteHeader } from "@/components/site-header";

export default function SecurityPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <section className="rounded-lg border border-border bg-white p-6 shadow-card">
          <h1 className="font-display text-3xl font-bold text-primary">Securite</h1>
          <div className="mt-6 grid gap-4">
            <input className="focus-ring rounded-lg border border-border px-4 py-3" placeholder="Mot de passe actuel" type="password" />
            <input className="focus-ring rounded-lg border border-border px-4 py-3" placeholder="Nouveau mot de passe" type="password" />
            <input className="focus-ring rounded-lg border border-border px-4 py-3" placeholder="Confirmer" type="password" />
          </div>
          <button className="mt-6 rounded-full bg-accent px-5 py-3 font-semibold text-white">Changer le mot de passe</button>
          <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="font-semibold text-error">Suppression de compte</p>
            <p className="mt-1 text-sm text-red-700">Soft delete avec anonymisation, comme prevu dans la spec.</p>
          </div>
        </section>
      </main>
    </>
  );
}
