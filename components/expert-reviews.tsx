"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { StarRating } from "@/components/star-rating";
import { readStoredReviews } from "@/lib/review-storage";
import type { Consultation, Expert, Review } from "@/lib/types";

type ExpertReviewsProps = {
  expert: Expert;
  reviews: Review[];
  consultations: Consultation[];
  currentUserId: string;
  currentUserRole: "client" | "expert" | "admin";
};

export function ExpertReviews({
  expert,
  reviews,
  consultations,
  currentUserId,
  currentUserRole
}: ExpertReviewsProps) {
  const [storedReviews, setStoredReviews] = useState<Review[]>([]);

  useEffect(() => {
    const refresh = () => setStoredReviews(readStoredReviews());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("sos-expert-reviews-updated", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("sos-expert-reviews-updated", refresh);
    };
  }, []);

  const allReviews = useMemo(() => {
    const storedForExpert = storedReviews.filter((review) => review.expertId === expert.id);
    const storedConsultationIds = new Set(storedForExpert.map((review) => review.consultationId));
    return [...storedForExpert, ...reviews.filter((review) => !storedConsultationIds.has(review.consultationId))];
  }, [expert.id, reviews, storedReviews]);

  const storedRatings = storedReviews.filter((review) => review.expertId === expert.id);
  const totalReviews = expert.totalReviews + storedRatings.length;
  const averageRating = totalReviews
    ? (expert.averageRating * expert.totalReviews + storedRatings.reduce((sum, review) => sum + review.rating, 0)) /
      totalReviews
    : 0;

  const reviewedConsultationIds = new Set(
    [...reviews, ...storedReviews]
      .filter((review) => review.clientId === currentUserId && review.expertId === expert.id)
      .map((review) => review.consultationId)
  );
  const eligibleConsultation = consultations.find(
    (consultation) =>
      consultation.expertId === expert.id &&
      consultation.clientId === currentUserId &&
      consultation.status === "completed" &&
      !reviewedConsultationIds.has(consultation.id)
  );

  return (
    <article className="rounded-lg border border-border bg-white p-6 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-primary">Notes et avis clients</h2>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <StarRating value={averageRating} label={`Note de ${expert.firstName}`} />
            <strong className="text-lg text-primary">{averageRating.toFixed(1)}/5</strong>
            <span className="text-sm text-muted">
              {totalReviews} avis vérifié{totalReviews > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {currentUserRole === "client" && eligibleConsultation ? (
          <Link
            href={`/consultations/${eligibleConsultation.id}/review`}
            className="focus-ring rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
          >
            Noter ce service
          </Link>
        ) : null}
      </div>

      {currentUserRole === "client" && !eligibleConsultation ? (
        <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
          La notation est disponible après une consultation terminée, à raison d’un avis par service.
        </p>
      ) : null}

      <div className="mt-5 space-y-3">
        {allReviews.length ? (
          allReviews.map((review) => (
            <div key={review.id} className="rounded-lg bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <StarRating value={review.rating} size="sm" label="Avis client" />
                <span className="text-xs text-muted">{review.createdAt}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{review.comment}</p>
              <p className="mt-2 text-xs font-semibold text-success">Service vérifié</p>
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-slate-50 p-5 text-center">
            <MessageSquareText className="mx-auto h-6 w-6 text-muted" />
            <p className="mt-2 text-sm text-slate-600">Aucun avis publié pour le moment.</p>
          </div>
        )}
      </div>
    </article>
  );
}
