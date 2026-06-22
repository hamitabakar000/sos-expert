import { AdminMissionInbox } from "@/components/admin-mission-inbox";
import { SiteHeader } from "@/components/site-header";

export default function AdminMissionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <AdminMissionInbox />
      </main>
    </>
  );
}
