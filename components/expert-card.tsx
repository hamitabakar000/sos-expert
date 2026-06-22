import Link from "next/link";
import { CheckCircle2, Clock, MapPin, Star } from "lucide-react";
import { ProfilePhoto } from "@/components/profile-photo";
import type { Expert, Recommendation } from "@/lib/types";
import { formatMad } from "@/lib/utils";

type ExpertCardProps = {
  expert: Expert;
  recommendation?: Recommendation;
};

export function ExpertCard({ expert, recommendation }: ExpertCardProps) {
  const exchangeHref = `/consultations/new?expertId=${expert.id}`;

  return (
    <article className="rounded-lg border border-border bg-white p-5 shadow-card">
      <div className="flex items-start gap-4">
        <ProfilePhoto
          src={expert.avatarUrl}
          alt={`${expert.firstName} ${expert.lastName}`}
          initials={`${expert.firstName[0]}${expert.lastName[0]}`}
          size="md"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-bold text-primary">
            {expert.firstName} {expert.lastName}
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-600">{expert.title}</p>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted">
            <MapPin className="h-4 w-4" />
            {expert.city}
          </p>
        </div>
        {recommendation ? (
          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-bold text-success">
            {recommendation.compatibilityScore}%
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {expert.domains.slice(0, 2).map((domain) => (
          <span key={domain} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {domain}
          </span>
        ))}
        {expert.verifiedBadges.slice(0, 1).map((badge) => (
          <span key={badge} className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-success">
            {badge}
          </span>
        ))}
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{expert.bio}</p>
      <p className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-950">
        {expert.isAvailableImmediately
          ? "Disponible maintenant pour vous repondre"
          : `Prochain creneau : ${expert.nextAvailableSlot}`}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <span className="flex items-center gap-2 text-slate-700">
          <Star className="h-4 w-4 fill-warning text-warning" />
          {expert.averageRating} ({expert.totalReviews})
        </span>
        <span className="flex items-center gap-2 text-slate-700">
          <Clock className="h-4 w-4 text-accent" />
          {formatMad(expert.hourlyRate)}/h
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-500">
        <span>{expert.yearsExperience} ans experience</span>
        <span>{expert.responseRate}% reponse</span>
      </div>
      <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">{expert.trustSummary}</p>

      {recommendation ? (
        <div className="mt-5 space-y-2">
          {recommendation.matchReasons.slice(0, 3).map((reason) => (
            <p key={reason} className="flex items-center gap-2 text-sm text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-success" />
              {reason}
            </p>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex gap-3">
        <Link href={`/experts/${expert.id}`} className="focus-ring flex-1 rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-white hover:bg-slate-800">
          Voir son profil
        </Link>
        <Link href={exchangeHref} className="focus-ring flex-1 rounded-full border border-border px-4 py-2 text-center text-sm font-semibold text-primary hover:bg-slate-50">
          Demander un echange
        </Link>
      </div>
    </article>
  );
}
