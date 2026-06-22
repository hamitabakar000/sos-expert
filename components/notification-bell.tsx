"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import {
  mergeNotifications,
  NOTIFICATIONS_UPDATED_EVENT
} from "@/lib/notification-storage";
import type { Notification } from "@/lib/types";

export function NotificationBell({
  notifications,
  userId
}: {
  notifications: Notification[];
  userId: string;
}) {
  const [unreadCount, setUnreadCount] = useState(notifications.filter((item) => !item.read).length);

  useEffect(() => {
    const refresh = () => {
      setUnreadCount(mergeNotifications(notifications, userId).filter((item) => !item.read).length);
    };

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(NOTIFICATIONS_UPDATED_EVENT, refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(NOTIFICATIONS_UPDATED_EVENT, refresh);
    };
  }, [notifications, userId]);

  return (
    <Link
      href="/notifications"
      className="focus-ring relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary hover:bg-slate-50"
      aria-label={`${unreadCount} notification${unreadCount > 1 ? "s" : ""} non lue${unreadCount > 1 ? "s" : ""}`}
    >
      <Bell className="h-5 w-5" />
      {unreadCount ? (
        <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold text-white">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      ) : null}
    </Link>
  );
}
