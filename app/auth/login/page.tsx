import Link from "next/link";
import { LockKeyhole, ShieldCheck, User, Wrench } from "lucide-react";
import { loginAsRole, loginWithEmail } from "@/app/auth/actions";
import { ProfilePhoto } from "@/components/profile-photo";
import { PublicHeader } from "@/components/public-header";
import { DEMO_DEFAULT_PASSWORD, getRolePassword } from "@/lib/auth";
import { demoUsers } from "@/lib/demo-data";

const roleCards = [
  {
    role: "client",
    title: "Client",
    email: "client@sosexpert.ma",
    text: "Publier une mission, trouver un expert, suivre les consultations et les paiements.",
    icon: User
  },
  {
    role: "expert",
    title: "Expert",
    email: "expert@sosexpert.ma",
    text: "Recevoir des demandes, gerer ses disponibilites, livrer des Lots et suivre ses revenus.",
    icon: Wrench
  },
  {
    role: "admin",
    title: "Admin",
    email: "admin@sosexpert.ma",
    text: "Verifier les experts, moderer les utilisateurs, suivre les avis et les indicateurs.",
    icon: ShieldCheck
  }
] as const;

type LoginPageProps = {
  searchParams?: {
    error?: string;
    email?: string;
    role?: string;
    next?: string;
  };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  const selectedEmail = searchParams?.email ?? "client@sosexpert.ma";
  const next = searchParams?.next ?? "";
  const hasError = Boolean(searchParams?.error);

  return (
    <>
      <PublicHeader />
      <main className="bg-slate-50">
        <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-semibold text-accent">Espace connecte</p>
            <h1 className="mt-2 font-display text-4xl font-bold text-primary sm:text-5xl">
              Connectez-vous avant d'entrer dans SOS Expert.
            </h1>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              La vitrine explique le concept. Le compte donne acces aux dashboards, missions, consultations,
              validations admin et revenus experts. Pour la demo PFE, les identifiants sont visibles.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {roleCards.map((card) => {
                const user = demoUsers.find((item) => item.email === card.email);
                return (
                  <div key={card.role} className="rounded-lg border border-border bg-white p-4 shadow-card">
                    <div className="flex items-center justify-between">
                      <card.icon className="h-6 w-6 text-accent" />
                      <ProfilePhoto
                        src={user?.avatarUrl}
                        alt={user ? `${user.firstName} ${user.lastName}` : card.title}
                        initials={user?.avatarInitials ?? card.title.slice(0, 2)}
                        size="xs"
                      />
                    </div>
                    <p className="mt-3 font-display text-lg font-bold text-primary">{card.title}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{card.text}</p>
                    <p className="mt-3 rounded-lg bg-slate-50 p-2 text-xs font-semibold text-primary">
                      {card.email}
                      <br />
                      Mot de passe : {getRolePassword(card.role)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <section className="rounded-lg border border-border bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-light text-accent">
                <LockKeyhole className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-2xl font-bold text-primary">Connexion</p>
                <p className="text-sm text-slate-500">Email + mot de passe demo.</p>
              </div>
            </div>

            {hasError ? (
              <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-error">
                Identifiants incorrects. Utilisez le mot de passe du role ou le mot de passe commun {DEMO_DEFAULT_PASSWORD}.
              </p>
            ) : null}

            <form action={loginWithEmail} className="mt-6 grid gap-4">
              <input type="hidden" name="next" value={next} />
              <label className="grid gap-2 text-sm font-semibold text-primary">
                Adresse email
                <select name="email" defaultValue={selectedEmail} className="focus-ring rounded-lg border border-border bg-white px-4 py-3 font-normal text-slate-700">
                  {demoUsers.map((user) => (
                    <option key={user.id} value={user.email}>
                      {user.email} - {user.role}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-primary">
                Mot de passe
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Ex: client123"
                  className="focus-ring rounded-lg border border-border px-4 py-3 font-normal text-slate-700"
                  required
                />
              </label>
              <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-white hover:bg-blue-700">
                <LockKeyhole className="h-4 w-4" />
                Entrer dans mon espace
              </button>
            </form>

            <div className="mt-6 border-t border-border pt-5">
              <p className="text-sm font-semibold text-primary">Connexion rapide par role</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {roleCards.map((card) => (
                  <form key={card.role} action={loginAsRole} className="grid gap-2 rounded-lg border border-border p-3">
                    <input type="hidden" name="role" value={card.role} />
                    <p className="text-sm font-bold text-primary">{card.title}</p>
                    <input
                      name="password"
                      type="password"
                      placeholder={getRolePassword(card.role)}
                      className="focus-ring min-w-0 rounded-lg border border-border px-3 py-2 text-sm"
                      required
                    />
                    <button className="rounded-full bg-primary px-3 py-2 text-xs font-semibold text-white">Ouvrir</button>
                  </form>
                ))}
              </div>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Nouveau sur SOS Expert ?{" "}
              <Link href="/auth/register" className="font-semibold text-accent">
                Creer un compte
              </Link>
            </p>
          </section>
        </section>
      </main>
    </>
  );
}
