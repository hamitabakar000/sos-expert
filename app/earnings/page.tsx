import { CircleDollarSign } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { experts, payments } from "@/lib/demo-data";
import { formatMad } from "@/lib/utils";

export default function EarningsPage() {
  const user = getCurrentUser();
  const expert = experts.find((item) => item.id === user.expertId) ?? experts[1];
  const expertPayments = payments.filter((payment) => payment.expertId === expert.id);
  const total = expertPayments.reduce((sum, payment) => sum + payment.payout, 0);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-primary">
          <CircleDollarSign className="h-7 w-7 text-accent" />
          Revenus expert
        </h1>
        <section className="mt-6 rounded-lg border border-border bg-white p-6 shadow-card">
          <p className="text-sm text-muted">Total net demo</p>
          <strong className="mt-2 block font-display text-4xl text-primary">{formatMad(total)}</strong>
          <div className="mt-6 divide-y divide-border">
            {expertPayments.map((payment) => (
              <div key={payment.id} className="grid gap-3 py-4 md:grid-cols-4">
                <span>{payment.createdAt}</span>
                <span>{payment.status}</span>
                <span>Commission {formatMad(payment.commission)}</span>
                <strong>{formatMad(payment.payout)}</strong>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
