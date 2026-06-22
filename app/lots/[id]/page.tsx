import Link from "next/link";
import { CheckCircle2, CircleDashed, Eye, ShieldCheck, UploadCloud } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
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
  const user = getCurrentUser();
  const canDeliver = user.role === "expert" && user.expertId === lot.expertId;
  const progress = getLotProgress(lot.status);

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

        {canDeliver ? (
          <ExpertDeliveryPanel />
        ) : (
          <LotProgressPanel
            progress={progress}
            status={lot.status}
            expertName={expert ? `${expert.firstName} ${expert.lastName}` : "En cours d'assignation"}
            isClient={user.role === "client"}
            missionId={lot.missionId}
          />
        )}
      </main>
    </>
  );
}

function ExpertDeliveryPanel() {
  return (
    <section className="mt-6 rounded-lg border border-border bg-white p-6 shadow-card">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-light text-accent">
          <UploadCloud className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-accent">Espace expert affecte</p>
          <h2 className="font-display text-2xl font-bold text-primary">Livrer ma contribution</h2>
        </div>
      </div>
      <textarea
        className="focus-ring mt-5 min-h-44 w-full rounded-lg border border-border p-4"
        placeholder="Rediger le livrable du Lot..."
      />
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
  );
}

function LotProgressPanel({
  progress,
  status,
  expertName,
  isClient,
  missionId
}: {
  progress: number;
  status: string;
  expertName: string;
  isClient: boolean;
  missionId: string;
}) {
  return (
    <section className="mt-6 rounded-lg border border-border bg-white p-6 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-light text-accent">
            {isClient ? <Eye className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
          </span>
          <div>
            <p className="text-sm font-semibold text-accent">
              {isClient ? "Suivi client en lecture seule" : "Vue de supervision"}
            </p>
            <h2 className="font-display text-2xl font-bold text-primary">Avancement du Lot</h2>
          </div>
        </div>
        <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-bold uppercase text-accent">
          {formatStatus(status)}
        </span>
      </div>

      <p className="mt-5 max-w-3xl leading-7 text-slate-600">
        {isClient
          ? "Vous pouvez suivre ici le travail de l'expert. La rédaction et la livraison de la contribution sont réservées à l'expert affecté."
          : "La contribution est visible en supervision, mais seul l'expert affecté peut modifier ou livrer ce Lot."}
      </p>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-primary">Progression estimée</span>
          <strong className="text-accent">{progress}%</strong>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <ProgressStep label="Lot assigné" done={progress >= 25} />
        <ProgressStep label="Travail en cours" done={progress >= 60} />
        <ProgressStep label="Livrable validé" done={progress >= 100} />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-slate-50 p-4">
        <div>
          <p className="text-xs font-semibold uppercase text-muted">Expert responsable</p>
          <p className="mt-1 font-semibold text-primary">{expertName}</p>
        </div>
        <Link
          href={isClient ? `/missions/${missionId}/crowdsource` : "/dashboard"}
          className="rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-primary hover:bg-slate-100"
        >
          {isClient ? "Voir toute la mission" : "Retour au tableau de bord"}
        </Link>
      </div>
    </section>
  );
}

function ProgressStep({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-4">
      {done ? (
        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
      ) : (
        <CircleDashed className="h-5 w-5 shrink-0 text-muted" />
      )}
      <span className={done ? "font-semibold text-primary" : "text-sm text-muted"}>{label}</span>
    </div>
  );
}

function getLotProgress(status: string) {
  const progressByStatus: Record<string, number> = {
    created: 10,
    assigned: 25,
    accepted: 40,
    in_progress: 65,
    delivered: 90,
    validated: 100
  };

  return progressByStatus[status] ?? 0;
}

function formatStatus(status: string) {
  const labels: Record<string, string> = {
    created: "A assigner",
    assigned: "Assigné",
    accepted: "Accepté",
    in_progress: "En cours",
    delivered: "Livré",
    validated: "Validé"
  };

  return labels[status] ?? status;
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-sm text-muted">{label}</p>
      <strong className="mt-1 block text-primary">{value}</strong>
    </div>
  );
}
