import Link from "next/link";
import { BriefcaseBusiness, CheckCircle2, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { registerDemoUser } from "@/app/auth/actions";
import { PublicHeader } from "@/components/public-header";

type RegisterPageProps = {
  searchParams?: {
    role?: string;
    error?: string;
  };
};

const roles = [
  {
    value: "client",
    title: "Client",
    text: "Je cherche un avis fiable, une consultation ou une mission complete.",
    icon: UserRound
  },
  {
    value: "expert",
    title: "Expert",
    text: "Je veux proposer mes competences et soumettre mon dossier a validation.",
    icon: BriefcaseBusiness
  }
] as const;

export default function RegisterPage({ searchParams }: RegisterPageProps) {
  const defaultRole = searchParams?.role === "expert" ? "expert" : "client";
  const hasError = Boolean(searchParams?.error);

  return (
    <>
      <PublicHeader />
      <main className="bg-slate-50">
        <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="font-semibold text-accent">Creation de compte</p>
            <h1 className="mt-2 font-display text-4xl font-bold text-primary sm:text-5xl">
              Rejoignez SOS Expert avec un espace adapte a votre role.
            </h1>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Le client peut demander de l'aide immediatement. L'expert cree son profil, ajoute ses justificatifs, puis
              attend la validation admin avant d'apparaitre comme expert verifie.
            </p>

            <div className="mt-7 grid gap-4">
              {[
                "Mot de passe requis pour entrer dans l'espace prive.",
                "Profil expert examine avant validation publique.",
                "Parcours client, expert et admin clairement separes."
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-border bg-white p-4 shadow-card">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="font-semibold text-primary">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <section className="rounded-lg border border-border bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-light text-accent">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-2xl font-bold text-primary">Inscription demo</p>
                <p className="text-sm text-slate-500">Le formulaire simule la creation du compte pour le PFE.</p>
              </div>
            </div>

            {hasError ? (
              <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-error">
                Le mot de passe doit contenir au moins 6 caracteres et correspondre a la confirmation.
              </p>
            ) : null}

            <form action={registerDemoUser} className="mt-6 grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {roles.map((role) => (
                  <label
                    key={role.value}
                    className="has-[:checked]:border-accent has-[:checked]:bg-blue-50 rounded-lg border border-border p-4"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      defaultChecked={defaultRole === role.value}
                      className="sr-only"
                    />
                    <role.icon className="h-6 w-6 text-accent" />
                    <span className="mt-3 block font-display text-lg font-bold text-primary">{role.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-slate-600">{role.text}</span>
                  </label>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-primary">
                  Prenom
                  <input className="focus-ring rounded-lg border border-border px-4 py-3 font-normal" name="firstName" placeholder="Hamit" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-primary">
                  Nom
                  <input className="focus-ring rounded-lg border border-border px-4 py-3 font-normal" name="lastName" placeholder="Moussa" />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-semibold text-primary">
                Email
                <input
                  className="focus-ring rounded-lg border border-border px-4 py-3 font-normal"
                  type="email"
                  name="email"
                  placeholder="vous@example.com"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-primary">
                  Mot de passe
                  <input
                    className="focus-ring rounded-lg border border-border px-4 py-3 font-normal"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-primary">
                  Confirmer
                  <input
                    className="focus-ring rounded-lg border border-border px-4 py-3 font-normal"
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    required
                  />
                </label>
              </div>
              <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-white hover:bg-blue-700">
                <LockKeyhole className="h-4 w-4" />
                Creer mon espace
              </button>
            </form>

            <p className="mt-5 text-sm text-slate-500">
              Vous avez deja un compte ?{" "}
              <Link href="/auth/login" className="font-semibold text-accent">
                Se connecter
              </Link>
            </p>
          </section>
        </section>
      </main>
    </>
  );
}
