"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock3, FileText, ShieldCheck } from "lucide-react";
import { getSubmittedMissions, type SubmittedMission } from "@/lib/mission-submission-storage";
import { formatMad } from "@/lib/utils";

export function SubmittedMissionConfirmation({ missionId }: { missionId: string }) {
  const [mission, setMission] = useState<SubmittedMission>();

  useEffect(() => {
    setMission(getSubmittedMissions().find((item) => item.id === missionId));
  }, [missionId]);

  if (!mission) {
    return (
      <div className="rounded-lg border border-border bg-white p-8 text-center shadow-card">
        <p className="text-slate-600">Mission introuvable dans cette démonstration.</p>
        <Link href="/missions/new" className="mt-4 inline-block font-semibold text-accent">Créer une mission</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-green-200 bg-green-50 p-6">
        <CheckCircle2 className="h-10 w-10 text-success" />
        <h1 className="mt-3 font-display text-3xl font-bold text-primary">Mission bien transmise</h1>
        <p className="mt-2 leading-7 text-slate-700">
          L’administration a reçu votre mission. Vous serez notifié après son contrôle et avant la recherche d’experts.
        </p>
      </section>

      <section className="rounded-lg border border-border bg-white p-6 shadow-card">
        <p className="text-sm font-semibold text-accent">Référence {mission.id}</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-primary">{mission.title}</h2>
        <p className="mt-3 leading-7 text-slate-600">{mission.description}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Info label="Domaine" value={mission.domain} />
          <Info label="Budget" value={formatMad(mission.budget)} />
          <Info label="Pièces jointes" value={String(mission.attachments.length)} />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-white p-6 shadow-card">
        <h2 className="font-display text-xl font-bold text-primary">Prochaines étapes</h2>
        <div className="mt-5 space-y-4">
          <Step icon={CheckCircle2} done title="Mission reçue" text="La demande et ses pièces jointes ont été enregistrées." />
          <Step icon={ShieldCheck} title="Contrôle administratif" text="Vérification du contenu, du budget et de la confidentialité." />
          <Step icon={Clock3} title="Matching avec les experts" text="Une sélection d’experts sera proposée après validation." />
          {mission.attachments.length ? (
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="flex items-center gap-2 font-semibold text-primary"><FileText className="h-4 w-4 text-accent" /> Fichiers transmis</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {mission.attachments.map((file) => <li key={`${file.name}-${file.size}`}>• {file.name}</li>)}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/dashboard" className="rounded-full bg-primary px-5 py-3 font-semibold text-white">Retour au tableau de bord</Link>
        <Link href="/notifications" className="rounded-full border border-border bg-white px-5 py-3 font-semibold text-primary">Voir mes notifications</Link>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg bg-slate-50 p-4"><p className="text-xs font-semibold uppercase text-muted">{label}</p><p className="mt-1 font-bold text-primary">{value}</p></div>;
}

function Step({ icon: Icon, title, text, done = false }: { icon: typeof CheckCircle2; title: string; text: string; done?: boolean }) {
  return <div className="flex gap-3"><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${done ? "bg-green-50 text-success" : "bg-slate-100 text-muted"}`}><Icon className="h-5 w-5" /></span><div><p className="font-semibold text-primary">{title}</p><p className="mt-1 text-sm text-slate-600">{text}</p></div></div>;
}
