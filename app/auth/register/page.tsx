import Link from "next/link";
import { registerDemoUser } from "@/app/auth/actions";
import { SiteHeader } from "@/components/site-header";

export default function RegisterPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <section className="rounded-lg border border-border bg-white p-6 shadow-card">
          <p className="font-semibold text-accent">Inscription</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-primary">Choisissez votre role</h1>
          <p className="mt-2 text-slate-600">
            Pour la demo, chaque role ouvre un espace complet. Le client cherche de l'aide, l'expert repond, l'admin garde la qualite.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <form action={registerDemoUser} className="rounded-lg border border-border p-5 hover:border-accent hover:bg-blue-50">
              <input type="hidden" name="role" value="client" />
              <strong className="text-primary">Client</strong>
              <p className="mt-2 text-sm leading-6 text-slate-600">Publier des missions et consulter des experts.</p>
              <button className="mt-4 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">Creer demo client</button>
            </form>
            <form action={registerDemoUser} className="rounded-lg border border-border p-5 hover:border-accent hover:bg-blue-50">
              <input type="hidden" name="role" value="expert" />
              <strong className="text-primary">Expert</strong>
              <p className="mt-2 text-sm leading-6 text-slate-600">Soumettre un dossier, gerer disponibilites et Lots.</p>
              <button className="mt-4 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">Creer demo expert</button>
            </form>
          </div>
          <p className="mt-5 text-sm text-slate-500">
            Vous avez deja un profil ? <Link href="/auth/login" className="font-semibold text-accent">Se connecter</Link>
          </p>
        </section>
      </main>
    </>
  );
}
