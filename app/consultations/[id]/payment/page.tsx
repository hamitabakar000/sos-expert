import Link from "next/link";
import { CreditCard, FileText } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { consultations, experts } from "@/lib/demo-data";
import { formatMad } from "@/lib/utils";

type PaymentPageProps = {
  params: {
    id: string;
  };
};

export default function PaymentPage({ params }: PaymentPageProps) {
  const consultation = consultations.find((item) => item.id === params.id) ?? consultations[0];
  const expert = experts.find((item) => item.id === consultation.expertId) ?? experts[0];
  const commission = Math.round(consultation.estimatedAmount * 0.15);
  const total = consultation.estimatedAmount;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <section className="rounded-lg border border-border bg-white p-6 shadow-card">
          <p className="font-semibold text-accent">Paiement Stripe demo</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-primary">Resume de paiement</h1>
          <div className="mt-6 space-y-4">
            <Row label="Expert" value={`${expert.firstName} ${expert.lastName}`} />
            <Row label="Duree" value={`${consultation.durationMinutes} minutes`} />
            <Row label="Sous-total" value={formatMad(total - commission)} />
            <Row label="Commission plateforme 15%" value={formatMad(commission)} />
            <Row label="Total a payer" value={formatMad(total)} strong />
          </div>
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-white">
            <CreditCard className="h-5 w-5" />
            Payer en mode test
          </button>
          <Link href={`/consultations/${consultation.id}/review`} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 font-semibold text-primary">
            <FileText className="h-5 w-5" />
            Continuer vers l'avis
          </Link>
        </section>
      </main>
    </>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border pb-3">
      <span className="text-slate-600">{label}</span>
      <span className={strong ? "font-display text-xl font-bold text-primary" : "font-semibold text-primary"}>{value}</span>
    </div>
  );
}
