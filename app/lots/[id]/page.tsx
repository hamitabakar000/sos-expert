import Link from "next/link";
import { UploadCloud } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { experts, lots } from "@/lib/demo-data";
import { formatMad } from "@/lib/utils";

type LotPageProps = {
  params: {
    id: string;
  };
};

export default function LotPage({ params }: LotPageProps) {
  const lot = lots.find((item) => item.id === params.id) ?? lots[0];
  const expert = experts.find((item) => item.id === lot.expertId);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <section className="rounded-lg border border-border bg-white p-6 shadow-card">
          <p className="font-semibold text-accent">Lot {lot.number}</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-primary">{lot.title}</h1>
          <p className="mt-4 leading-7 text-slate-600">{lot.description}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <Info label="Domaine" value={lot.domain} />
            <Info label="Budget" value={formatMad(lot.budget)} />
            <Info label="Deadline" value={lot.deadline} />
            <Info label="Expert" value={expert ? `${expert.firstName} ${expert.lastName}` : "A assigner"} />
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-border bg-white p-6 shadow-card">
          <h2 className="font-display text-2xl font-bold text-primary">Livrer ma contribution</h2>
          <textarea className="focus-ring mt-4 min-h-44 w-full rounded-lg border border-border p-4" placeholder="Rediger le livrable du Lot..." />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-50 p-4">
            <span className="flex items-center gap-2 text-sm text-slate-600">
              <UploadCloud className="h-5 w-5 text-accent" />
              Ajouter PDF, image ou document
            </span>
            <Link href="/dashboard" className="rounded-full bg-accent px-5 py-3 font-semibold text-white">
              Livrer ma contribution
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-sm text-muted">{label}</p>
      <strong className="mt-1 block text-primary">{value}</strong>
    </div>
  );
}
