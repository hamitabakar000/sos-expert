import Link from "next/link";
import { FileText, Mic, Paperclip, Send, Video } from "lucide-react";
import { ProfilePhoto } from "@/components/profile-photo";
import { SiteHeader } from "@/components/site-header";
import { consultations, experts, missions } from "@/lib/demo-data";
import { formatMad } from "@/lib/utils";

type ConsultationPageProps = {
  params: {
    id: string;
  };
};

export default function ConsultationPage({ params }: ConsultationPageProps) {
  const consultation = consultations.find((item) => item.id === params.id) ?? consultations[0];
  const mission = missions.find((item) => item.id === consultation.missionId) ?? missions[0];
  const expert = experts.find((item) => item.id === consultation.expertId) ?? experts[0];

  return (
    <>
      <SiteHeader />
      <main className="grid min-h-[calc(100vh-65px)] gap-0 lg:grid-cols-[320px_1fr_320px]">
        <aside className="border-r border-border bg-white p-5">
          <p className="font-semibold text-accent">Consultation {consultation.modality}</p>
          <h1 className="mt-2 font-display text-2xl font-bold text-primary">{mission.title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{mission.description}</p>
          <div className="mt-6 space-y-3 rounded-lg bg-slate-50 p-4 text-sm">
            <div className="flex items-center gap-3">
              <ProfilePhoto
                src={expert.avatarUrl}
                alt={`${expert.firstName} ${expert.lastName}`}
                initials={`${expert.firstName[0]}${expert.lastName[0]}`}
                size="sm"
              />
              <p><strong>Expert:</strong> {expert.firstName} {expert.lastName}</p>
            </div>
            <p><strong>Statut:</strong> {consultation.status}</p>
            <p><strong>Duree:</strong> {consultation.durationMinutes} min</p>
            <p><strong>Montant estime:</strong> {formatMad(consultation.estimatedAmount)}</p>
          </div>
          <Link href={`/consultations/${consultation.id}/payment`} className="mt-5 block rounded-full bg-accent px-4 py-3 text-center font-semibold text-white">
            Terminer et payer
          </Link>
        </aside>

        <section className="flex flex-col bg-slate-50">
          <header className="flex items-center justify-between border-b border-border bg-white p-4">
            <div className="flex items-center gap-3">
              <ProfilePhoto
                src={expert.avatarUrl}
                alt={`${expert.firstName} ${expert.lastName}`}
                initials={`${expert.firstName[0]}${expert.lastName[0]}`}
                size="sm"
              />
              <div>
              <p className="font-semibold text-primary">{expert.firstName} {expert.lastName}</p>
                <p className="text-sm text-success">Connecte - session securisee</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="rounded-full bg-white p-3 text-primary shadow-card"><Mic className="h-5 w-5" /></button>
              <button className="rounded-full bg-white p-3 text-primary shadow-card"><Video className="h-5 w-5" /></button>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-auto p-5">
            {consultation.messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "client" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xl rounded-lg p-4 text-sm shadow-card ${message.sender === "client" ? "bg-accent text-white" : "bg-white text-slate-700"}`}>
                  <p>{message.body}</p>
                  <span className="mt-2 block text-xs opacity-75">{message.at}</span>
                </div>
              </div>
            ))}
          </div>

          <form className="flex items-center gap-3 border-t border-border bg-white p-4">
            <button type="button" className="rounded-full border border-border p-3 text-primary"><Paperclip className="h-5 w-5" /></button>
            <input className="focus-ring min-w-0 flex-1 rounded-full border border-border px-4 py-3" placeholder="Ecrire un message..." />
            <button className="rounded-full bg-accent p-3 text-white"><Send className="h-5 w-5" /></button>
          </form>
        </section>

        <aside className="border-l border-border bg-white p-5">
          <h2 className="font-display text-xl font-bold text-primary">Documents</h2>
          <div className="mt-4 space-y-3">
            {["contrat-commercial.pdf", "brief-mission.docx", "notes-session.txt"].map((file) => (
              <p key={file} className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                <FileText className="h-4 w-4 text-accent" />
                {file}
              </p>
            ))}
          </div>
        </aside>
      </main>
    </>
  );
}
