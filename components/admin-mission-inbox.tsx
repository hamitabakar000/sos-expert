"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, ClipboardList, Eye, FileText, Search, X } from "lucide-react";
import {
  getSubmittedMissions,
  MISSIONS_UPDATED_EVENT,
  type SubmittedMission,
  type SubmittedMissionStatus,
  updateSubmittedMissionStatus
} from "@/lib/mission-submission-storage";
import { saveCustomNotifications } from "@/lib/notification-storage";
import { formatMad } from "@/lib/utils";

const statusLabels: Record<SubmittedMissionStatus, string> = {
  pending_review: "À examiner",
  reviewing: "En cours d’analyse",
  approved: "Validée",
  needs_information: "Complément demandé"
};

export function AdminMissionInbox() {
  const [missions, setMissions] = useState<SubmittedMission[]>([]);
  const [selected, setSelected] = useState<SubmittedMission>();

  useEffect(() => {
    const refresh = () => {
      const next = getSubmittedMissions();
      setMissions(next);
      setSelected((current) => next.find((mission) => mission.id === current?.id));
    };
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(MISSIONS_UPDATED_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(MISSIONS_UPDATED_EVENT, refresh);
    };
  }, []);

  function changeStatus(mission: SubmittedMission, status: SubmittedMissionStatus) {
    updateSubmittedMissionStatus(mission.id, status);
    const message =
      status === "approved"
        ? "Votre mission a été validée. Le matching avec les experts peut commencer."
        : status === "needs_information"
          ? "L’administration demande des informations complémentaires avant de valider votre mission."
          : "Votre mission est maintenant en cours d’analyse par l’administration.";

    saveCustomNotifications([{
      id: `not-status-${mission.id}-${Date.now()}`,
      userId: mission.clientId,
      type: "system",
      title: statusLabels[status],
      body: message,
      actionUrl: `/missions/submitted/${mission.id}`,
      read: false,
      createdAt: "À l’instant"
    }]);
  }

  const pendingCount = missions.filter((mission) => mission.status === "pending_review").length;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-semibold text-accent">Réception des demandes</p>
          <h1 className="font-display text-3xl font-bold text-primary">Missions soumises</h1>
          <p className="mt-2 text-slate-600">Contrôlez les nouvelles missions avant leur transmission aux experts.</p>
        </div>
        <div className="rounded-lg border border-border bg-white px-4 py-3 shadow-card">
          <p className="font-bold text-primary">{pendingCount} mission{pendingCount > 1 ? "s" : ""} à examiner</p>
          <p className="mt-1 text-sm text-muted">{missions.length} reçue{missions.length > 1 ? "s" : ""} au total</p>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {missions.length ? missions.map((mission) => (
          <article key={mission.id} className="rounded-lg border border-border bg-white p-5 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl font-bold text-primary">{mission.title}</h2>
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-warning">{statusLabels[mission.status]}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">Par {mission.clientName} · {mission.domain} · {formatMad(mission.budget)}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{mission.description}</p>
              </div>
              <button type="button" onClick={() => setSelected(mission)} className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">
                <Eye className="h-4 w-4" /> Examiner
              </button>
            </div>
          </article>
        )) : (
          <div className="rounded-lg border border-dashed border-border bg-white p-10 text-center">
            <ClipboardList className="mx-auto h-10 w-10 text-muted" />
            <h2 className="mt-3 font-display text-xl font-bold text-primary">Aucune mission reçue</h2>
            <p className="mt-2 text-sm text-slate-600">Les missions soumises par les clients apparaîtront ici.</p>
          </div>
        )}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/70 p-4 py-8" role="dialog" aria-modal="true">
          <article className="w-full max-w-3xl rounded-lg bg-white shadow-2xl">
            <header className="flex items-center justify-between border-b border-border p-5">
              <div><p className="text-sm font-semibold text-accent">Dossier mission</p><h2 className="font-display text-2xl font-bold text-primary">{selected.title}</h2></div>
              <button type="button" onClick={() => setSelected(undefined)} className="focus-ring rounded-full border border-border p-2" aria-label="Fermer"><X className="h-5 w-5" /></button>
            </header>
            <div className="p-6">
              <div className="grid gap-3 sm:grid-cols-3">
                <Info label="Client" value={selected.clientName} />
                <Info label="Domaine" value={selected.domain} />
                <Info label="Budget" value={formatMad(selected.budget)} />
                <Info label="Mode" value={selected.mode} />
                <Info label="Urgence" value={selected.urgency} />
                <Info label="Confidentialité" value={selected.confidentiality} />
              </div>
              <div className="mt-5 rounded-lg bg-slate-50 p-4">
                <p className="font-semibold text-primary">Description</p>
                <p className="mt-2 leading-7 text-slate-700">{selected.description}</p>
              </div>
              <div className="mt-5">
                <p className="flex items-center gap-2 font-semibold text-primary"><FileText className="h-5 w-5 text-accent" /> Pièces jointes ({selected.attachments.length})</p>
                <div className="mt-3 space-y-2">
                  {selected.attachments.length ? selected.attachments.map((file) => (
                    <div key={`${file.name}-${file.size}`} className="rounded-lg border border-border p-3 text-sm text-slate-700">{file.name} · {formatSize(file.size)}</div>
                  )) : <p className="text-sm text-muted">Aucune pièce jointe.</p>}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
                <button type="button" onClick={() => changeStatus(selected, "reviewing")} className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-semibold text-primary"><Search className="h-4 w-4" /> Commencer l’analyse</button>
                <button type="button" onClick={() => changeStatus(selected, "needs_information")} className="focus-ring inline-flex items-center gap-2 rounded-full border border-orange-200 px-4 py-2 font-semibold text-warning"><AlertCircle className="h-4 w-4" /> Demander un complément</button>
                <button type="button" onClick={() => changeStatus(selected, "approved")} className="focus-ring inline-flex items-center gap-2 rounded-full bg-success px-4 py-2 font-semibold text-white"><CheckCircle2 className="h-4 w-4" /> Valider la mission</button>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border border-border p-3"><p className="text-xs font-semibold uppercase text-muted">{label}</p><p className="mt-1 font-semibold text-primary">{value}</p></div>;
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} Ko` : `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}
