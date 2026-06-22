import { AdminNotificationComposer } from "@/components/admin-notification-composer";
import { SiteHeader } from "@/components/site-header";
import { demoUsers } from "@/lib/demo-data";

export default function AdminNotificationsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <AdminNotificationComposer users={demoUsers} />
      </main>
    </>
  );
}
