import Link from "next/link";
import { Bell } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { notifications } from "@/lib/demo-data";

export default function NotificationsPage() {
  const user = getCurrentUser();
  const userNotifications = notifications.filter((notification) => notification.userId === user.id);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-primary">
          <Bell className="h-7 w-7 text-accent" />
          Notifications
        </h1>
        <div className="mt-6 space-y-3">
          {userNotifications.map((notification) => (
            <Link key={notification.id} href={notification.actionUrl} className="block rounded-lg border border-border bg-white p-5 shadow-card hover:bg-blue-50">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-primary">{notification.title}</p>
                <span className="text-xs text-muted">{notification.createdAt}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{notification.body}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
