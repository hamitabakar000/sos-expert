"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CheckCheck,
  CircleDollarSign,
  Clock3,
  MessageSquare,
  Network,
  Settings,
  Trash2
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  dismissNotification,
  markNotificationRead,
  markNotificationsRead,
  mergeNotifications,
  NOTIFICATIONS_UPDATED_EVENT
} from "@/lib/notification-storage";
import type { Notification } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filter = "all" | "unread" | Notification["type"];

const typeDetails: Record<Notification["type"], { label: string; icon: LucideIcon; className: string }> = {
  consultation: { label: "Consultations", icon: MessageSquare, className: "bg-blue-50 text-blue-700" },
  payment: { label: "Paiements", icon: CircleDollarSign, className: "bg-emerald-50 text-emerald-700" },
  crowdsourcing: { label: "Missions", icon: Network, className: "bg-violet-50 text-violet-700" },
  system: { label: "Système", icon: Settings, className: "bg-slate-100 text-slate-700" }
};

export function NotificationCenter({
  notifications,
  userId
}: {
  notifications: Notification[];
  userId: string;
}) {
  const [items, setItems] = useState(notifications);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const refresh = () => setItems(mergeNotifications(notifications, userId));
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(NOTIFICATIONS_UPDATED_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(NOTIFICATIONS_UPDATED_EVENT, refresh);
    };
  }, [notifications, userId]);

  const unreadCount = items.filter((item) => !item.read).length;
  const visibleItems = useMemo(() => {
    if (filter === "unread") return items.filter((item) => !item.read);
    if (filter === "all") return items;
    return items.filter((item) => item.type === filter);
  }, [filter, items]);

  function markAllRead() {
    markNotificationsRead(items.map((item) => item.id));
  }

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-primary">
            <Bell className="h-7 w-7 text-accent" />
            Notifications
          </h1>
          <p className="mt-2 text-slate-600">
            {unreadCount
              ? `${unreadCount} notification${unreadCount > 1 ? "s" : ""} à consulter`
              : "Vous êtes à jour, aucune notification non lue."}
          </p>
        </div>
        <button
          type="button"
          onClick={markAllRead}
          disabled={!unreadCount}
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCheck className="h-4 w-4" />
          Tout marquer comme lu
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filtrer les notifications">
        {([
          ["all", "Toutes"],
          ["unread", `Non lues (${unreadCount})`],
          ["consultation", "Consultations"],
          ["crowdsourcing", "Missions"],
          ["payment", "Paiements"],
          ["system", "Système"]
        ] as const).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={filter === value}
            onClick={() => setFilter(value)}
            className={cn(
              "focus-ring rounded-full px-4 py-2 text-sm font-semibold transition",
              filter === value ? "bg-primary text-white" : "border border-border bg-white text-slate-600 hover:bg-slate-50"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {visibleItems.length ? (
          visibleItems.map((notification) => {
            const details = typeDetails[notification.type];
            const Icon = details.icon;

            return (
              <article
                key={notification.id}
                className={cn(
                  "relative overflow-hidden rounded-lg border bg-white shadow-card transition",
                  notification.read ? "border-border" : "border-accent/40"
                )}
              >
                {!notification.read ? <span className="absolute inset-y-0 left-0 w-1 bg-accent" /> : null}
                <div className="flex gap-4 p-5">
                  <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full", details.className)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-semibold text-primary">{notification.title}</h2>
                          {!notification.read ? (
                            <span className="rounded-full bg-accent-light px-2 py-0.5 text-[10px] font-bold uppercase text-accent">
                              Nouveau
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-xs font-semibold text-muted">{details.label}</p>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-muted">
                        <Clock3 className="h-3.5 w-3.5" />
                        {notification.createdAt}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{notification.body}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Link
                        href={notification.actionUrl}
                        onClick={() => markNotificationRead(notification.id)}
                        className="focus-ring rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white"
                      >
                        Voir les détails
                      </Link>
                      {!notification.read ? (
                        <button
                          type="button"
                          onClick={() => markNotificationRead(notification.id)}
                          className="focus-ring rounded-full px-3 py-2 text-sm font-semibold text-primary hover:bg-slate-50"
                        >
                          Marquer comme lue
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => dismissNotification(notification.id)}
                        className="focus-ring ml-auto inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-muted hover:bg-red-50 hover:text-error"
                        aria-label={`Supprimer la notification ${notification.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                        Masquer
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-white p-10 text-center">
            <CheckCheck className="mx-auto h-10 w-10 text-success" />
            <h2 className="mt-3 font-display text-xl font-bold text-primary">Rien à afficher</h2>
            <p className="mt-2 text-sm text-slate-600">Aucune notification ne correspond à ce filtre.</p>
          </div>
        )}
      </div>
    </>
  );
}
