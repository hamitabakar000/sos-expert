import Link from "next/link";
import { Star } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export default function ReviewPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <section className="rounded-lg border border-border bg-white p-6 shadow-card">
          <p className="font-semibold text-accent">Evaluation</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-primary">Publier votre avis</h1>
          <div className="mt-6 flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-9 w-9 fill-warning text-warning" />
            ))}
          </div>
          <textarea className="focus-ring mt-6 min-h-36 w-full rounded-lg border border-border p-4" defaultValue="Expert clair, rapide et tres professionnel." />
          <Link href="/dashboard" className="mt-5 block rounded-full bg-accent px-5 py-3 text-center font-semibold text-white">
            Publier mon avis
          </Link>
        </section>
      </main>
    </>
  );
}
