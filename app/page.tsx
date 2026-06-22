import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Clock3,
  GitBranch,
  LockKeyhole,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
  Video
} from "lucide-react";
import { ProfilePhoto } from "@/components/profile-photo";
import { PublicHeader } from "@/components/public-header";
import { domains, expertCollections, experts, successStories } from "@/lib/demo-data";

const steps = [
  {
    title: "Decrivez votre besoin",
    text: "Vous expliquez la situation avec vos mots. La plateforme garde le contexte, le budget et l'urgence bien ranges."
  },
  {
    title: "L'IA recommande",
    text: "L'IA propose des experts, mais chaque recommandation reste lisible : pourquoi cette personne, pourquoi maintenant."
  },
  {
    title: "Consultez ou crowdsourcez",
    text: "Vous parlez avec un expert, ou vous confiez une mission complexe a plusieurs specialistes coordonnes."
  }
];

export default function HomePage() {
  const validatedExperts = experts.filter((expert) => expert.validationStatus === "validated");
  const publicStories = successStories.filter((story) => validatedExperts.some((expert) => expert.id === story.expertId));

  return (
    <>
      <PublicHeader />
      <main>
        <section className="home-hero relative overflow-hidden text-white">
          <div className="home-hero__glow home-hero__glow--one" />
          <div className="home-hero__glow home-hero__glow--two" />
          <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Nouveau : matching explicable et missions multi-experts
              </span>
              <h1 className="mt-7 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-7xl">
                Trouvez la bonne expertise.
                <span className="mt-2 block text-accent">Avancez sans deviner.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Decrivez votre besoin avec vos mots. SOS Expert identifie les profils verifies, explique chaque
                recommandation et organise la consultation ou l'equipe dont votre projet a besoin.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/experts"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-bold text-white shadow-[0_18px_50px_rgb(var(--color-accent)/0.28)] transition hover:-translate-y-0.5"
                >
                  <Search className="h-5 w-5" />
                  Trouver un expert
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/auth/register?role=expert"
                  className="focus-ring rounded-full border border-white/20 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Devenir expert
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex -space-x-3">
                  {validatedExperts.slice(0, 5).map((expert) => (
                    <ProfilePhoto
                      key={expert.id}
                      src={expert.avatarUrl}
                      alt={`${expert.firstName} ${expert.lastName}`}
                      initials={`${expert.firstName[0]}${expert.lastName[0]}`}
                      size="sm"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Profils verifies et disponibles</p>
                  <p className="mt-1 text-xs text-slate-400">Droit, cybersecurite, finance, sante et plus</p>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "500+", label: "Experts verifies", icon: UsersRound },
                  { value: "10k+", label: "Echanges realises", icon: MessageSquare },
                  { value: "98%", label: "Satisfaction client", icon: TrendingUp },
                  { value: "< 24h", label: "Delai de reponse", icon: Clock3 }
                ].map((stat) => (
                  <article
                    key={stat.label}
                    className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.09] sm:p-7"
                  >
                    <stat.icon className="h-5 w-5 text-accent" />
                    <p className="mt-8 font-display text-4xl font-bold tracking-tight text-accent sm:text-5xl">{stat.value}</p>
                    <p className="mt-2 text-sm font-medium text-slate-400 sm:text-base">{stat.label}</p>
                  </article>
                ))}
              </div>
              <div className="mt-4 rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                      <BrainCircuit className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-white">Matching transparent</p>
                      <p className="mt-1 text-sm text-slate-400">Chaque score vient avec ses raisons.</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-bold text-emerald-300">87% match</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="concept" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 max-w-3xl">
            <p className="font-semibold text-accent">Avant de demander conseil</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-primary">
              Une porte d'entree claire pour les clients, les experts et les admins.
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              SOS Expert n'est pas juste une liste de profils. La plateforme guide la demande, explique les choix de
              l'IA, securise les dossiers sensibles et garde chaque role dans son espace.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-border bg-white p-6 shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light font-bold text-accent">
                  {index + 1}
                </span>
                <h2 className="mt-5 font-display text-xl font-bold text-primary">{step.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3">
            <div>
              <BrainCircuit className="h-10 w-10 text-accent" />
              <h2 className="mt-4 font-display text-2xl font-bold text-primary">Moteur neuro-symbolique</h2>
              <p className="mt-3 leading-7 text-slate-600">
                L'etape neuro comprend le besoin en langage naturel. L'etape symbolique verifie budget, disponibilite,
                validation, confidentialite et domaine.
              </p>
            </div>
            <div>
              <GitBranch className="h-10 w-10 text-accent" />
              <h2 className="mt-4 font-display text-2xl font-bold text-primary">Crowdsourcing par Lots</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Les missions complexes sont decoupees en taches independantes, assignees a un essaim d'experts, puis
                consolidees en livrable final.
              </p>
            </div>
            <div>
              <Video className="h-10 w-10 text-accent" />
              <h2 className="mt-4 font-display text-2xl font-bold text-primary">Consultation temps reel</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Chat, audio et video sont prevus via Supabase Realtime et WebRTC, avec partage de fichiers et suivi de
                session.
              </p>
            </div>
          </div>
        </section>

        <section id="confiance" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-semibold text-accent">Avantage concurrentiel</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-primary">Plus qu'un annuaire : un reseau de confiance.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                Pour rivaliser avec les plateformes de mise en relation, SOS Expert doit montrer des personnes, des
                resultats, des equipes pretes et des signaux de confiance visibles.
              </p>
            </div>
            <Link href="/auth/login?next=/network" className="rounded-full bg-primary px-5 py-3 font-semibold text-white">
              Voir le reseau apres connexion
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-4">
              {expertCollections.slice(0, 3).map((collection) => (
                <article key={collection.id} className="rounded-lg border border-border bg-white p-5 shadow-card">
                  <p className="text-sm font-semibold text-accent">{collection.domain}</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-primary">{collection.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{collection.description}</p>
                  <div className="mt-4 flex -space-x-3">
                    {collection.expertIds.slice(0, 5).map((expertId) => {
                      const expert = validatedExperts.find((item) => item.id === expertId);
                      if (!expert) {
                        return null;
                      }
                      return (
                        <ProfilePhoto
                          key={expert.id}
                          src={expert.avatarUrl}
                          alt={`${expert.firstName} ${expert.lastName}`}
                          initials={`${expert.firstName[0]}${expert.lastName[0]}`}
                          size="sm"
                        />
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {publicStories.map((story) => {
                const expert = validatedExperts.find((item) => item.id === story.expertId);
                return (
                  <article key={story.id} className="rounded-lg border border-border bg-white p-5 shadow-card">
                    <div className="flex items-center gap-3">
                      <ProfilePhoto
                        src={expert?.avatarUrl}
                        alt={expert ? `${expert.firstName} ${expert.lastName}` : story.clientName}
                        initials={expert ? `${expert.firstName[0]}${expert.lastName[0]}` : story.clientName.slice(0, 2)}
                        size="sm"
                      />
                      <div>
                        <p className="text-sm font-semibold text-primary">{story.clientName}</p>
                        <p className="text-xs text-muted">{story.clientRole}</p>
                      </div>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-primary">{story.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{story.outcome}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="domaines" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary">Domaines couverts</h2>
              <p className="mt-3 text-slate-600">Une taxonomie multi-domaines extensible pour le PFE et la suite.</p>
            </div>
            <ShieldCheck className="hidden h-12 w-12 text-accent sm:block" />
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((domain) => (
              <div key={domain} className="rounded-lg border border-border bg-white p-4 font-semibold text-primary">
                {domain}
              </div>
            ))}
          </div>
        </section>

        <section className="home-cta text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="font-semibold text-blue-100">Espace protege</p>
              <h2 className="mt-2 font-display text-3xl font-bold">Connectez-vous pour entrer dans la plateforme.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-200">
                Le compte donne acces aux dashboards, aux missions, aux messages, aux revenus experts et a
                l'administration. La vitrine reste publique, le travail se fait dans l'espace connecte.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/auth/login"
                className="focus-ring flex items-center gap-3 rounded-lg bg-white px-5 py-4 font-semibold text-primary"
              >
                <LockKeyhole className="h-5 w-5 text-accent" />
                Connexion par mot de passe
              </Link>
              <Link
                href="/auth/register"
                className="focus-ring flex items-center gap-3 rounded-lg border border-white/20 px-5 py-4 font-semibold text-white hover:bg-white/10"
              >
                <Clock3 className="h-5 w-5 text-blue-100" />
                Creer un compte demo
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
