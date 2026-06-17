import { BarChart3, ShieldCheck, Users, WalletCards } from "lucide-react";
import Link from "next/link";
import { ProfilePhoto } from "@/components/profile-photo";
import { SiteHeader } from "@/components/site-header";
import { StatCard } from "@/components/stat-card";
import { consultations, expertValidationCases, experts } from "@/lib/demo-data";

export default function AdminPage() {
  const pendingExperts = experts.filter((expert) => expert.validationStatus === "pending");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div>
          <p className="font-semibold text-accent">Back-office</p>
          <h1 className="font-display text-3xl font-bold text-primary">Administration SOS Expert</h1>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard label="Dossiers experts" value={String(pendingExperts.length)} detail="En attente d'examen" icon={ShieldCheck} />
          <StatCard label="Utilisateurs" value="248" detail="Clients, experts et admins" icon={Users} />
          <StatCard label="Consultations" value={String(consultations.length)} detail="Actives aujourd'hui" icon={BarChart3} />
          <StatCard label="Revenu plateforme" value="12 750 MAD" detail="Commission 15%" icon={WalletCards} />
        </section>

        <section className="mt-8 grid gap-3 md:grid-cols-5">
          {[
            ["/admin/experts/pending", "Validation experts"],
            ["/admin/users", "Utilisateurs"],
            ["/admin/consultations", "Consultations"],
            ["/admin/crowdsourcing", "Crowdsourcing"],
            ["/admin/analytics", "Analytics"]
          ].map(([href, label]) => (
            <Link key={href} href={href} className="rounded-lg border border-border bg-white p-4 text-center font-semibold text-primary shadow-card hover:bg-slate-50">
              {label}
            </Link>
          ))}
        </section>

        <section className="mt-8 rounded-lg border border-border bg-white p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-xl font-bold text-primary">File de validation experts</h2>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-warning">
              {expertValidationCases.length} dossiers a examiner
            </span>
          </div>
          <div className="mt-6 divide-y divide-border">
            {pendingExperts.map((expert) => (
              <div key={expert.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
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
                    <p className="mt-1 text-sm text-muted">{expert.title}</p>
                    <p className="mt-1 text-xs font-semibold text-warning">Validation bloquee tant que le dossier n'est pas examine.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href="/admin/experts/pending" className="focus-ring rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">
                    Examiner
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
