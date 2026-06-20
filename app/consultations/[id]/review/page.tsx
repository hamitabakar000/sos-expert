import { notFound } from "next/navigation";
import { ProfilePhoto } from "@/components/profile-photo";
import { ReviewForm } from "@/components/review-form";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { consultations, experts, reviews } from "@/lib/demo-data";

type ReviewPageProps = {
  params: {
    id: string;
  };
};

export default function ReviewPage({ params }: ReviewPageProps) {
  const user = getCurrentUser();
  const consultation = consultations.find((item) => item.id === params.id);

  if (!consultation) {
    notFound();
  }

  const expert = experts.find((item) => item.id === consultation.expertId);

  if (!expert) {
    notFound();
  }

  const existingReview = reviews.find(
    (review) =>
      review.consultationId === consultation.id &&
      review.clientId === consultation.clientId &&
      review.expertId === consultation.expertId
  );

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <section className="rounded-lg border border-border bg-white p-6 shadow-card">
          <p className="font-semibold text-accent">Evaluation</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-primary">Publier votre avis</h1>
          <div className="mt-5 flex items-center gap-3 rounded-lg bg-slate-50 p-4">
            <ProfilePhoto
              src={expert.avatarUrl}
              alt={`${expert.firstName} ${expert.lastName}`}
              initials={`${expert.firstName[0]}${expert.lastName[0]}`}
              size="sm"
            />
            <div>
              <p className="font-semibold text-primary">
                {expert.firstName} {expert.lastName}
              </p>
              <p className="text-sm text-muted">Consultation {consultation.modality}</p>
            </div>
          </div>
          <ReviewForm consultation={consultation} expert={expert} user={user} existingReview={existingReview} />
        </section>
      </main>
    </>
  );
}
