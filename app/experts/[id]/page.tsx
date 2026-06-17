import Link from "next/link";
import { BadgeCheck, CalendarClock, Languages, MapPin, MessageSquare, Star, WalletCards } from "lucide-react";
import { ProfilePhoto } from "@/components/profile-photo";
import { SiteHeader } from "@/components/site-header";
import { experts, reviews } from "@/lib/demo-data";
import { formatMad } from "@/lib/utils";

type ExpertProfilePageProps = {
  params: {
    id: string;
  };
};

export default function ExpertProfilePage({ params }: ExpertProfilePageProps) {
  const expert = experts.find((item) => item.id === params.id) ?? experts[0];
  const expertReviews = reviews.filter((review) => review.expertId === expert.id);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="h-fit rounded-lg border border-border bg-white p-6 shadow-card">
            <div className="flex items-center gap-4">
              <ProfilePhoto
                src={expert.avatarUrl}
                alt={`${expert.firstName} ${expert.lastName}`}
                initials={`${expert.firstName[0]}${expert.lastName[0]}`}
                size="lg"
              />
              <div>
                <h1 className="font-display text-3xl font-bold text-primary">
                  {expert.firstName} {expert.lastName}
                </h1>
                <p className="mt-1 text-slate-600">{expert.title}</p>
                <p className="mt-2 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-success">
                  {expert.isAvailableImmediately ? "Disponible maintenant" : expert.nextAvailableSlot}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm">
              <p className="flex items-center gap-2 text-slate-700">
                <MapPin className="h-4 w-4 text-accent" />
                {expert.city}
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <Star className="h-4 w-4 fill-warning text-warning" />
                {expert.averageRating}/5 sur {expert.totalReviews} avis
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <WalletCards className="h-4 w-4 text-accent" />
                {formatMad(expert.hourlyRate)} par heure
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <Languages className="h-4 w-4 text-accent" />
                {expert.languages.join(", ")}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <Link href="/consultations/con-002" className="block rounded-full bg-accent px-5 py-3 text-center font-semibold text-white">
                Consulter maintenant
              </Link>
              <Link href="/missions/new" className="block rounded-full border border-border px-5 py-3 text-center font-semibold text-primary">
                Demander un rendez-vous
              </Link>
            </div>
          </aside>

          <section className="space-y-6">
            <article className="rounded-lg border border-border bg-white p-6 shadow-card">
              <div className="flex flex-wrap items-center gap-2">
                {expert.domains.map((domain) => (
                  <span key={domain} className="rounded-full bg-accent-light px-3 py-1 text-sm font-semibold text-accent">
                    {domain}
                  </span>
                ))}
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-primary">Profil professionnel</h2>
              <p className="mt-3 leading-8 text-slate-600">{expert.bio}</p>
              <p className="mt-4 rounded-lg bg-blue-50 p-4 leading-7 text-blue-950">
                Ce profil a ete verifie par l'equipe SOS Expert. L'objectif est de vous mettre en contact avec une
                personne competente, mais aussi claire, disponible et capable de vous expliquer les choses simplement.
              </p>
            </article>

            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-lg border border-border bg-white p-5 shadow-card">
                <BadgeCheck className="h-6 w-6 text-success" />
                <strong className="mt-3 block text-primary">{expert.completionRate}%</strong>
                <p className="text-sm text-muted">Taux de completion</p>
              </article>
              <article className="rounded-lg border border-border bg-white p-5 shadow-card">
                <MessageSquare className="h-6 w-6 text-accent" />
                <strong className="mt-3 block text-primary">{expert.totalConsultations}</strong>
                <p className="text-sm text-muted">Consultations realisees</p>
              </article>
              <article className="rounded-lg border border-border bg-white p-5 shadow-card">
                <CalendarClock className="h-6 w-6 text-accent" />
                <strong className="mt-3 block text-primary">{expert.nextAvailableSlot}</strong>
                <p className="text-sm text-muted">Prochain creneau</p>
              </article>
            </div>

            <article className="rounded-lg border border-border bg-white p-6 shadow-card">
              <h2 className="font-display text-2xl font-bold text-primary">Certifications</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {expert.certifications.map((certification) => (
                  <p key={certification} className="rounded-lg bg-slate-50 p-4 font-semibold text-slate-700">
                    {certification}
                  </p>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-border bg-white p-6 shadow-card">
              <h2 className="font-display text-2xl font-bold text-primary">Avis clients</h2>
              <div className="mt-4 space-y-3">
                {(expertReviews.length ? expertReviews : reviews.slice(0, 2)).map((review) => (
                  <div key={review.id} className="rounded-lg bg-slate-50 p-4">
                    <p className="font-semibold text-primary">{review.rating}/5</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </section>
      </main>
    </>
  );
}
