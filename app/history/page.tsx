import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { consultations, experts, missions } from "@/lib/demo-data";
import { formatMad } from "@/lib/utils";

export default function HistoryPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-primary">Historique des consultations</h1>
        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-white shadow-card">
          {consultations.map((consultation) => {
            const mission = missions.find((item) => item.id === consultation.missionId);
            const expert = experts.find((item) => item.id === consultation.expertId);
            return (
              <Link key={consultation.id} href={`/consultations/${consultation.id}`} className="grid gap-3 border-b border-border p-5 hover:bg-slate-50 md:grid-cols-[1fr_180px_140px]">
                <div>
                  <p className="font-semibold text-primary">{mission?.title}</p>
                  <p className="mt-1 text-sm text-muted">{expert?.firstName} {expert?.lastName} - {consultation.modality}</p>
                </div>
                <span className="font-semibold text-primary">{consultation.status}</span>
                <span className="font-semibold text-primary">{formatMad(consultation.estimatedAmount)}</span>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
