import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Clock3,
  GitBranch,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
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
        <section className="home-photo-hero">
          <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:py-24">
            <div className="max-w-2xl">
              <span className="home-photo-hero__badge inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Expertise vérifiée et matching explicable
              </span>
              <h1 className="home-photo-hero__title mt-7 font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
                Le bon expert.
                <span className="home-photo-hero__accent block">Au bon moment.</span>
              </h1>
              <p className="home-photo-hero__description mt-6 max-w-xl text-lg leading-8 sm:text-xl">
                Décrivez votre besoin et recevez une sélection claire d’experts qualifiés, disponibles et adaptés à
                votre situation.
              </p>

              <div className="home-photo-hero__search mt-8 flex max-w-xl items-center rounded-2xl p-2">
                <Search className="ml-3 h-5 w-5 shrink-0 text-slate-400" />
                <p className="min-w-0 flex-1 px-3 text-sm text-slate-500 sm:text-base">
                  Droit, finance, cybersécurité, santé…
                </p>
                <Link
                  href="/experts"
                  className="home-photo-hero__button focus-ring inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition sm:px-5"
                >
                  Trouver un expert
                  <ArrowRight className="hidden h-4 w-4 sm:block" />
                </Link>
              </div>

              <div className="home-photo-hero__trust mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5" />
                  Profils contrôlés
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Échanges confidentiels
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-5 w-5" />
                  Réponse rapide
                </span>
              </div>
            </div>

            <div className="home-photo-hero__expert-card absolute bottom-8 right-6 hidden w-72 rounded-2xl p-4 shadow-2xl backdrop-blur lg:block">
              <div className="flex items-center gap-3">
                <ProfilePhoto
                  src={validatedExperts[0]?.avatarUrl}
                  alt="Experte recommandée"
                  initials="NA"
                  size="md"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">Experte recommandée</p>
                  <p className="text-xs text-slate-500">Disponible aujourd’hui</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-success">98%</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                <span className="flex items-center gap-1 font-semibold text-slate-600">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  4,9/5
                </span>
                <span className="flex items-center gap-1 font-semibold text-slate-600">
                  <BadgeCheck className="h-4 w-4 text-accent" />
                  Identité vérifiée
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:grid-cols-3 sm:px-6">
            <div className="flex items-center gap-4 sm:border-r sm:border-border">
              <UsersRound className="h-9 w-9 text-accent" />
              <div>
                <p className="font-display text-2xl font-bold text-primary">{validatedExperts.length}+</p>
                <p className="text-sm text-slate-500">experts multidisciplinaires</p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:border-r sm:border-border">
              <BadgeCheck className="h-9 w-9 text-accent" />
              <div>
                <p className="font-display text-2xl font-bold text-primary">100%</p>
                <p className="text-sm text-slate-500">profils vérifiés</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock3 className="h-9 w-9 text-accent" />
              <div>
                <p className="font-display text-2xl font-bold text-primary">&lt; 10 min</p>
                <p className="text-sm text-slate-500">pour recevoir une recommandation</p>
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
