import { LogIn, ShieldCheck, User, Wrench } from "lucide-react";
import { loginAsRole, loginWithEmail } from "@/app/auth/actions";
import { ProfilePhoto } from "@/components/profile-photo";
import { SiteHeader } from "@/components/site-header";
import { demoUsers } from "@/lib/demo-data";

const roleCards = [
  {
    role: "client",
    title: "Client",
    text: "Racontez votre besoin, choisissez une personne de confiance et suivez tout depuis votre espace.",
    icon: User
  },
  {
    role: "expert",
    title: "Expert",
    text: "Recevez des demandes claires, echangez avec les clients et livrez vos contributions sereinement.",
    icon: Wrench
  },
  {
    role: "admin",
    title: "Admin",
    text: "Gardez la qualite humaine au centre : validation, moderation, suivi et confiance.",
    icon: ShieldCheck
  }
] as const;

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="text-center">
          <p className="font-semibold text-accent">Connexion demo</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-primary">Choisir un profil SOS Expert</h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Pour le PFE, la connexion est simulee par cookie. Les trois profils permettent de tester les parcours client,
            expert et administrateur.
          </p>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {roleCards.map((card) => (
            <form key={card.role} action={loginAsRole} className="rounded-lg border border-border bg-white p-6 shadow-card">
              <input type="hidden" name="role" value={card.role} />
              <div className="flex items-center justify-between">
                <card.icon className="h-8 w-8 text-accent" />
                {demoUsers
                  .filter((user) => user.role === card.role)
                  .map((user) => (
                    <ProfilePhoto
                      key={user.id}
                      src={user.avatarUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                      initials={user.avatarInitials}
                      size="sm"
                    />
                  ))}
              </div>
              <h2 className="mt-4 font-display text-xl font-bold text-primary">{card.title}</h2>
              <p className="mt-3 min-h-16 text-sm leading-6 text-slate-600">{card.text}</p>
              <button className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 font-semibold text-white hover:bg-blue-700">
                <LogIn className="h-4 w-4" />
                Entrer comme {card.title}
              </button>
            </form>
          ))}
        </section>

        <section className="mx-auto mt-8 max-w-xl rounded-lg border border-border bg-white p-6 shadow-card">
          <h2 className="font-display text-xl font-bold text-primary">Connexion par email demo</h2>
          <form action={loginWithEmail} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <select name="email" className="focus-ring min-w-0 flex-1 rounded-lg border border-border bg-white px-4 py-3">
              {demoUsers.map((user) => (
                <option key={user.id} value={user.email}>
                  {user.email}
                </option>
              ))}
            </select>
            <button className="focus-ring rounded-full bg-primary px-5 py-3 font-semibold text-white">Connexion</button>
          </form>
        </section>
      </main>
    </>
  );
}
