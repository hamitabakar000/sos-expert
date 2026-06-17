import Link from "next/link";
import { GitBranch } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { lots, missions } from "@/lib/demo-data";

export default function AdminCrowdsourcingPage() {
  const mission = missions.find((item) => item.mode === "crowdsourcing") ?? missions[0];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-primary">
          <GitBranch className="h-7 w-7 text-accent" />
          Sessions crowdsourcing
        </h1>
        <section className="mt-6 rounded-lg border border-border bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-primary">{mission.title}</p>
              <p className="mt-1 text-sm text-muted">{lots.length} Lots, consolidation en attente</p>
            </div>
            <Link href={`/missions/${mission.id}/crowdsource`} className="rounded-full bg-accent px-4 py-2 font-semibold text-white">
              Ouvrir
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
