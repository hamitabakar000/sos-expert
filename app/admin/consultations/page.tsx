import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { consultations, experts, missions } from "@/lib/demo-data";

export default function AdminConsultationsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-primary">Consultations</h1>
        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-white shadow-card">
          {consultations.map((consultation) => {
            const mission = missions.find((item) => item.id === consultation.missionId);
            const expert = experts.find((item) => item.id === consultation.expertId);
            return (
              <Link key={consultation.id} href={`/consultations/${consultation.id}`} className="grid gap-3 border-b border-border p-4 hover:bg-slate-50 md:grid-cols-[1fr_180px_140px]">
                <strong>{mission?.title}</strong>
                <span>{expert?.firstName} {expert?.lastName}</span>
                <span>{consultation.status}</span>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
