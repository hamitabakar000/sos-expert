import { Star } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { experts, reviews } from "@/lib/demo-data";

export default function AdminReviewsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-primary">Moderation des avis</h1>
        <div className="mt-6 grid gap-4">
          {reviews.map((review) => {
            const expert = experts.find((item) => item.id === review.expertId);
            return (
              <article key={review.id} className="rounded-lg border border-border bg-white p-5 shadow-card">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-primary">{expert?.firstName} {expert?.lastName}</p>
                  <span className="flex items-center gap-1 text-warning">
                    <Star className="h-4 w-4 fill-warning" />
                    {review.rating}/5
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{review.comment}</p>
              </article>
            );
          })}
        </div>
      </main>
    </>
  );
}
