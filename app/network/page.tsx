import Link from "next/link";
import { MessageCircle, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { ProfilePhoto } from "@/components/profile-photo";
import { SiteHeader } from "@/components/site-header";
import { expertCollections, experts, networkPosts, successStories } from "@/lib/demo-data";

export default function NetworkPage() {
  const validatedExperts = experts.filter((expert) => expert.validationStatus === "validated");
  const publicStories = successStories.filter((story) => validatedExperts.some((expert) => expert.id === story.expertId));

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <section className="rounded-lg bg-primary p-8 text-white">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 font-semibold text-blue-100">
              <UsersRound className="h-5 w-5" />
              Reseau SOS Expert
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold">Un reseau vivant, pas seulement une liste d'experts.</h1>
            <p className="mt-4 leading-8 text-slate-200">
              Les meilleures plateformes ne vendent pas seulement des profils. Elles montrent l'activite, la confiance,
              les specialites et les resultats. Cette page donne au client une raison de rester, comparer et revenir.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Metric label="Experts verifies" value={String(validatedExperts.length)} />
            <Metric label="Taux moyen reponse" value={`${Math.round(avg(validatedExperts.map((expert) => expert.responseRate)))}%`} />
            <Metric label="Satisfaction" value={`${avg(validatedExperts.map((expert) => expert.averageRating)).toFixed(1)}/5`} />
            <Metric label="Collections" value={String(expertCollections.length)} />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <article className="rounded-lg border border-border bg-white p-6 shadow-card">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-accent">Activite recente</p>
                  <h2 className="font-display text-2xl font-bold text-primary">Ce qui se passe sur la plateforme</h2>
                </div>
                <Sparkles className="h-7 w-7 text-accent" />
              </div>
              <div className="mt-5 space-y-4">
                {networkPosts.map((post) => (
                  <article key={post.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-start gap-3">
                      <ProfilePhoto src={post.avatarUrl} alt={post.authorName} initials={post.initials} size="sm" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="font-semibold text-primary">{post.authorName}</p>
                            <p className="text-xs text-muted">{post.authorRole} - {post.createdAt}</p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-600">
                            {post.type}
                          </span>
                        </div>
                        <h3 className="mt-3 font-display text-lg font-bold text-primary">{post.title}</h3>
                        <p className="mt-2 leading-7 text-slate-600">{post.body}</p>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="rounded-full bg-accent-light px-3 py-1 font-semibold text-accent">{post.domain}</span>
                          <span className="flex items-center gap-1 text-muted">
                            <MessageCircle className="h-4 w-4" />
                            {post.replies} reponses
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-border bg-white p-6 shadow-card">
              <p className="font-semibold text-accent">Histoires de reussite</p>
              <h2 className="font-display text-2xl font-bold text-primary">Preuves sociales concretes</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {publicStories.map((story) => {
                  const expert = validatedExperts.find((item) => item.id === story.expertId);
                  return (
                    <article key={story.id} className="rounded-lg bg-slate-50 p-4">
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
                      <p className="mt-2 text-sm leading-6 text-slate-600">{story.summary}</p>
                      <p className="mt-3 rounded-lg bg-white p-3 text-xs font-semibold leading-5 text-primary">{story.outcome}</p>
                    </article>
                  );
                })}
              </div>
            </article>
          </div>

          <aside className="space-y-6">
            <article className="rounded-lg border border-border bg-white p-6 shadow-card">
              <p className="font-semibold text-accent">Collections intelligentes</p>
              <h2 className="font-display text-2xl font-bold text-primary">Equipes d'experts pretes</h2>
              <div className="mt-5 space-y-4">
                {expertCollections.map((collection) => (
                  <div key={collection.id} className="rounded-lg border border-border p-4">
                    <p className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-accent">{collection.domain}</p>
                    <h3 className="mt-3 font-display text-lg font-bold text-primary">{collection.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{collection.description}</p>
                    <div className="mt-4 flex -space-x-3">
                      {collection.expertIds.map((expertId) => {
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
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-border bg-white p-6 shadow-card">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-success" />
                <h2 className="font-display text-xl font-bold text-primary">Pourquoi c'est competitif</h2>
              </div>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <p>Verification visible des experts, pas seulement une inscription libre.</p>
                <p>Collections par besoin, utiles pour les missions complexes.</p>
                <p>Activite reseau pour montrer que la plateforme vit.</p>
                <p>Preuves sociales et resultats, pas seulement des notes.</p>
                <p>Matching explique pour eviter l'effet boite noire.</p>
              </div>
              <Link href="/experts" className="mt-5 block rounded-full bg-accent px-5 py-3 text-center font-semibold text-white">
                Explorer les experts
              </Link>
            </article>
          </aside>
        </section>
      </main>
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/10 p-4">
      <strong className="font-display text-3xl">{value}</strong>
      <p className="mt-1 text-sm text-blue-100">{label}</p>
    </div>
  );
}

function avg(values: number[]) {
  return values.reduce((total, value) => total + value, 0) / values.length;
}
