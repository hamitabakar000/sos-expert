"use client";

import { FormEvent, useState } from "react";
import { BellRing, CheckCircle2, Send } from "lucide-react";
import { saveCustomNotifications } from "@/lib/notification-storage";
import type { DemoUser, Notification, UserRole } from "@/lib/types";

type Audience = "all" | UserRole;

export function AdminNotificationComposer({ users }: { users: DemoUser[] }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState<Audience>("all");
  const [actionUrl, setActionUrl] = useState("/dashboard");
  const [sentCount, setSentCount] = useState(0);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const recipients = users.filter((user) => audience === "all" || user.role === audience);
    const timestamp = Date.now();
    const created: Notification[] = recipients.map((user, index) => ({
      id: `not-admin-${timestamp}-${index}`,
      userId: user.id,
      type: "system",
      title: title.trim(),
      body: body.trim(),
      actionUrl: actionUrl.trim() || "/dashboard",
      read: false,
      createdAt: "À l’instant"
    }));

    saveCustomNotifications(created);
    setSentCount(created.length);
    setTitle("");
    setBody("");
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-border bg-white p-6 shadow-card">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-accent-light p-3 text-accent">
          <BellRing className="h-6 w-6" />
        </div>
        <div>
          <p className="font-semibold text-accent">Notification système</p>
          <h1 className="font-display text-3xl font-bold text-primary">Envoyer une notification</h1>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="font-semibold text-primary">
          Destinataires
          <select
            value={audience}
            onChange={(event) => setAudience(event.target.value as Audience)}
            className="focus-ring mt-2 w-full rounded-lg border border-border px-4 py-3 font-normal"
          >
            <option value="all">Tous les utilisateurs</option>
            <option value="client">Clients uniquement</option>
            <option value="expert">Experts uniquement</option>
            <option value="admin">Administrateurs uniquement</option>
          </select>
        </label>
        <label className="font-semibold text-primary">
          Lien d’action
          <input
            value={actionUrl}
            onChange={(event) => setActionUrl(event.target.value)}
            className="focus-ring mt-2 w-full rounded-lg border border-border px-4 py-3 font-normal"
            placeholder="/dashboard"
          />
        </label>
      </div>

      <label className="mt-4 block font-semibold text-primary">
        Titre
        <input
          required
          maxLength={80}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="focus-ring mt-2 w-full rounded-lg border border-border px-4 py-3 font-normal"
          placeholder="Information importante"
        />
      </label>
      <label className="mt-4 block font-semibold text-primary">
        Message
        <textarea
          required
          maxLength={300}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          className="focus-ring mt-2 min-h-32 w-full rounded-lg border border-border p-4 font-normal"
          placeholder="Rédigez un message clair et utile..."
        />
      </label>
      <div className="mt-2 text-right text-xs text-muted">{body.length}/300</div>

      <button
        type="submit"
        className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-white"
      >
        <Send className="h-4 w-4" />
        Envoyer
      </button>

      {sentCount ? (
        <p className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-4 text-sm font-semibold text-success">
          <CheckCircle2 className="h-5 w-5" />
          Notification envoyée à {sentCount} utilisateur{sentCount > 1 ? "s" : ""}.
        </p>
      ) : null}
    </form>
  );
}
