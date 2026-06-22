"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BrainCircuit, Languages, Loader2, WalletCards } from "lucide-react";
import { MissionAttachments } from "@/components/mission-attachments";
import { saveSubmittedMission } from "@/lib/mission-submission-storage";
import { saveCustomNotifications } from "@/lib/notification-storage";
import type { DemoUser } from "@/lib/types";
import { cn } from "@/lib/utils";

const modes = [
  { value: "immediate", title: "Immédiat", icon: BrainCircuit, text: "Demande envoyée à un expert disponible." },
  { value: "scheduled", title: "Rendez-vous", icon: Languages, text: "Choix d’un créneau selon les disponibilités." },
  { value: "crowdsourcing", title: "Mission complexe", icon: WalletCards, text: "Analyse IA et décomposition en Lots." }
];

export function NewMissionForm({ domains, user }: { domains: string[]; user: DemoUser }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState(domains[0] ?? "");
  const [urgency, setUrgency] = useState("within_24h");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState("scheduled");
  const [budget, setBudget] = useState("");
  const [language, setLanguage] = useState("Français");
  const [confidentiality, setConfidentiality] = useState("Standard");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (title.trim().length < 5) {
      setError("Le titre doit contenir au moins 5 caractères.");
      return;
    }

    if (description.trim().length < 50) {
      setError("Décrivez la mission en au moins 50 caractères pour faciliter son évaluation.");
      return;
    }

    const budgetAmount = Number(budget);
    if (!Number.isFinite(budgetAmount) || budgetAmount <= 0) {
      setError("Indiquez un budget valide supérieur à 0.");
      return;
    }

    setSubmitting(true);
    const id = `mission-${Date.now()}`;
    const now = new Date().toISOString();

    saveSubmittedMission({
      id,
      clientId: user.id,
      clientName: `${user.firstName} ${user.lastName}`,
      title: title.trim(),
      domain,
      urgency,
      description: description.trim(),
      mode,
      budget: budgetAmount,
      language,
      confidentiality,
      attachments: files.map((file) => ({ name: file.name, size: file.size, type: file.type })),
      status: "pending_review",
      createdAt: now,
      updatedAt: now
    });

    saveCustomNotifications([
      {
        id: `not-admin-${id}`,
        userId: "usr-admin-001",
        type: "system",
        title: "Nouvelle mission à examiner",
        body: `${user.firstName} ${user.lastName} vient de soumettre « ${title.trim()} ».`,
        actionUrl: "/admin/missions",
        read: false,
        createdAt: "À l’instant"
      },
      {
        id: `not-client-${id}`,
        userId: user.id,
        type: "system",
        title: "Mission bien reçue",
        body: "Votre mission a été transmise à l’administration pour un premier contrôle.",
        actionUrl: `/missions/submitted/${id}`,
        read: false,
        createdAt: "À l’instant"
      }
    ]);

    router.push(`/missions/submitted/${id}`);
  }

  return (
    <form onSubmit={submit} className="mt-8 rounded-lg border border-border bg-white p-6 shadow-card">
      <div className="grid gap-4 border-b border-border pb-6 md:grid-cols-3">
        {["Détails", "Mode et budget", "Confirmation"].map((step, index) => (
          <div key={step} className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              {index + 1}
            </span>
            <span className="font-semibold text-primary">{step}</span>
          </div>
        ))}
      </div>

      <section className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-semibold text-primary md:col-span-2">
          Titre de la mission
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="focus-ring mt-2 w-full rounded-lg border border-border px-4 py-3"
            placeholder="Ex : Audit sécurité de mon application"
          />
        </label>
        <label className="block text-sm font-semibold text-primary">
          Domaine
          <select
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            className="focus-ring mt-2 w-full rounded-lg border border-border bg-white px-4 py-3"
          >
            {domains.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold text-primary">
          Urgence
          <select
            value={urgency}
            onChange={(event) => setUrgency(event.target.value)}
            className="focus-ring mt-2 w-full rounded-lg border border-border bg-white px-4 py-3"
          >
            <option value="immediate">Immédiate</option>
            <option value="within_24h">Dans les 24 h</option>
            <option value="within_week">Dans la semaine</option>
            <option value="flexible">Flexible</option>
          </select>
        </label>
        <label className="block text-sm font-semibold text-primary md:col-span-2">
          Description
          <textarea
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="focus-ring mt-2 min-h-36 w-full rounded-lg border border-border px-4 py-3"
            placeholder="Expliquez le contexte, le livrable attendu et les contraintes."
          />
          <span className="mt-1 block text-right text-xs text-muted">{description.length} caractères</span>
        </label>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {modes.map((item) => (
          <label
            key={item.value}
            className={cn(
              "cursor-pointer rounded-lg border p-4 transition",
              mode === item.value ? "border-accent bg-accent-light" : "border-border hover:border-accent"
            )}
          >
            <input
              name="mode"
              type="radio"
              value={item.value}
              checked={mode === item.value}
              onChange={() => setMode(item.value)}
              className="sr-only"
            />
            <item.icon className="h-6 w-6 text-accent" />
            <strong className="mt-3 block text-primary">{item.title}</strong>
            <span className="mt-2 block text-sm leading-6 text-slate-600">{item.text}</span>
          </label>
        ))}
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        <label className="block text-sm font-semibold text-primary">
          Budget exact
          <input
            required
            type="number"
            min="1"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className="focus-ring mt-2 w-full rounded-lg border border-border px-4 py-3"
            placeholder="8500"
          />
        </label>
        <label className="block text-sm font-semibold text-primary">
          Langue
          <select value={language} onChange={(event) => setLanguage(event.target.value)} className="focus-ring mt-2 w-full rounded-lg border border-border bg-white px-4 py-3">
            <option>Français</option><option>Arabe</option><option>Anglais</option>
          </select>
        </label>
        <label className="block text-sm font-semibold text-primary">
          Confidentialité
          <select value={confidentiality} onChange={(event) => setConfidentiality(event.target.value)} className="focus-ring mt-2 w-full rounded-lg border border-border bg-white px-4 py-3">
            <option>Standard</option><option>Stricte</option>
          </select>
        </label>
      </section>

      <MissionAttachments onFilesChange={setFiles} />

      {error ? <p className="mt-5 rounded-lg bg-red-50 p-4 text-sm font-semibold text-error">{error}</p> : null}

      <div className="mt-8 flex justify-end">
        <button
          disabled={submitting}
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {submitting ? "Transmission..." : "Soumettre la mission"}
        </button>
      </div>
    </form>
  );
}
