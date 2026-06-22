import { NotificationCenter } from "@/components/notification-center";
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
        <NotificationCenter notifications={userNotifications} userId={user.id} />
      </main>
    </>
  );
}
