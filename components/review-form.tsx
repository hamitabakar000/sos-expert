"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { StarRating } from "@/components/star-rating";
import { readStoredReviews, saveStoredReview } from "@/lib/review-storage";
import type { Consultation, DemoUser, Expert, Review } from "@/lib/types";

type ReviewFormProps = {
  consultation: Consultation;
  expert: Expert;
  user: DemoUser;
  existingReview?: Review;
};

export function ReviewForm({ consultation, expert, user, existingReview }: ReviewFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [comment, setComment] = useState(existingReview?.comment ?? "");
  const [storedReview, setStoredReview] = useState<Review>();
  const [error, setError] = useState("");

  useEffect(() => {
    setStoredReview(readStoredReviews().find((review) => review.consultationId === consultation.id));
  }, [consultation.id]);

  const publishedReview = existingReview ?? storedReview;
  const canReview =
    user.role === "client" &&
    consultation.clientId === user.id &&
    consultation.status === "completed" &&
    !publishedReview;

  function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canReview) {
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Choisissez une note entre 1 et 5 étoiles.");
      return;
    }

    const review: Review = {
      id: `rev-local-${consultation.id}`,
      consultationId: consultation.id,
      clientId: user.id,
      expertId: expert.id,
      rating,
      comment: comment.trim(),
      createdAt: new Intl.DateTimeFormat("fr-FR").format(new Date())
    };

    saveStoredReview(review);
    router.push(`/experts/${expert.id}`);
    router.refresh();
  }

  if (publishedReview) {
    return (
      <div className="mt-6 rounded-lg bg-green-50 p-5">
        <div className="flex items-center gap-2 font-semibold text-success">
          <CheckCircle2 className="h-5 w-5" />
          Vous avez déjà noté ce service
        </div>
        <div className="mt-3">
          <StarRating value={publishedReview.rating} />
        </div>
        <p className="mt-3 text-sm text-slate-600">{publishedReview.comment}</p>
      </div>
    );
  }

  if (!canReview) {
    const reason =
      user.role !== "client"
        ? "Seuls les clients peuvent attribuer une note."
        : consultation.clientId !== user.id
          ? "Cette consultation n’appartient pas à votre compte."
          : "Vous pourrez noter l’expert lorsque le service sera terminé.";

    return <p className="mt-6 rounded-lg bg-slate-50 p-5 text-slate-600">{reason}</p>;
  }

  return (
    <form className="mt-6" onSubmit={submitReview}>
      <fieldset>
        <legend className="font-semibold text-primary">Votre note</legend>
        <div className="mt-3">
          <StarRating value={rating} onChange={setRating} size="lg" label="Votre note" />
        </div>
        <p className="mt-2 text-sm text-muted">
          {rating ? `${rating} étoile${rating > 1 ? "s" : ""} sur 5` : "Cliquez sur une étoile"}
        </p>
      </fieldset>

      <label className="mt-6 block font-semibold text-primary" htmlFor="review-comment">
        Votre commentaire
      </label>
      <textarea
        id="review-comment"
        className="focus-ring mt-2 min-h-36 w-full rounded-lg border border-border p-4"
        placeholder="Décrivez la qualité du service reçu..."
        maxLength={500}
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <div className="mt-2 flex justify-between gap-3 text-xs text-muted">
        <span>Votre avis sera marqué comme service vérifié.</span>
        <span>{comment.length}/500</span>
      </div>

      {error ? <p className="mt-3 text-sm font-semibold text-error">{error}</p> : null}

      <button
        type="submit"
        className="focus-ring mt-5 w-full rounded-full bg-accent px-5 py-3 font-semibold text-white hover:opacity-90"
      >
        Publier mon avis
      </button>
    </form>
  );
}
