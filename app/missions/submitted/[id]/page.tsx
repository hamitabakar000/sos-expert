import { SiteHeader } from "@/components/site-header";
import { SubmittedMissionConfirmation } from "@/components/submitted-mission-confirmation";

export default function SubmittedMissionPage({ params }: { params: { id: string } }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <SubmittedMissionConfirmation missionId={params.id} />
      </main>
    </>
  );
}
