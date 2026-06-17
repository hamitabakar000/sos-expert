import { BarChart3 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { StatCard } from "@/components/stat-card";
import { consultations, experts, payments } from "@/lib/demo-data";
import { formatMad } from "@/lib/utils";

export default function AdminAnalyticsPage() {
  const revenue = payments.reduce((total, payment) => total + payment.commission, 0);
  const validatedExperts = experts.filter((expert) => expert.validationStatus === "validated");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-primary">Analytics plateforme</h1>
        <section className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard label="Experts valides" value={String(validatedExperts.length)} detail="Tous domaines confondus" icon={BarChart3} />
          <StatCard label="Consultations" value={String(consultations.length)} detail="Demo active" icon={BarChart3} />
          <StatCard label="Commission" value={formatMad(revenue)} detail="15% plateforme" icon={BarChart3} />
          <StatCard label="Satisfaction" value="4.8/5" detail="Moyenne avis demo" icon={BarChart3} />
        </section>
        <section className="mt-6 rounded-lg border border-border bg-white p-6 shadow-card">
          <h2 className="font-display text-xl font-bold text-primary">Revenu par domaine</h2>
          <div className="mt-5 space-y-3">
            {["IT & Cybersecurite", "Droit", "Finance", "Education"].map((domain, index) => (
              <div key={domain}>
                <div className="flex justify-between text-sm font-semibold">
                  <span>{domain}</span>
                  <span>{40 - index * 7}%</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-accent" style={{ width: `${40 - index * 7}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
