import { FileCheck2 } from "lucide-react";
import { ProfilePhoto } from "@/components/profile-photo";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { experts } from "@/lib/demo-data";

export default function CertificationsPage() {
  const user = getCurrentUser();
  const expert = experts.find((item) => item.id === user.expertId) ?? experts[1];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <section className="rounded-lg border border-border bg-white p-6 shadow-card">
          <div className="flex items-center gap-4">
            <ProfilePhoto
              src={expert.avatarUrl}
              alt={`${expert.firstName} ${expert.lastName}`}
              initials={`${expert.firstName[0]}${expert.lastName[0]}`}
              size="lg"
            />
            <div>
              <p className="font-semibold text-accent">Validation expert</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-primary">Certifications</h1>
              <p className="mt-1 text-slate-600">Des preuves simples a verifier, visibles par l'administration.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {expert.certifications.map((certification) => (
              <article key={certification} className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
                <FileCheck2 className="h-5 w-5 text-success" />
                <div>
                  <p className="font-semibold text-primary">{certification}</p>
                  <p className="text-sm text-muted">Document verifie demo</p>
                </div>
              </article>
            ))}
          </div>
          <button className="mt-6 rounded-full bg-accent px-5 py-3 font-semibold text-white">Ajouter un document</button>
        </section>
      </main>
    </>
  );
}
