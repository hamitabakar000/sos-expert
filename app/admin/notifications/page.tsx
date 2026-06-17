import { SiteHeader } from "@/components/site-header";

export default function AdminNotificationsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <section className="rounded-lg border border-border bg-white p-6 shadow-card">
          <p className="font-semibold text-accent">Notification systeme</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-primary">Envoyer une notification</h1>
          <input className="focus-ring mt-6 w-full rounded-lg border border-border px-4 py-3" placeholder="Titre" />
          <textarea className="focus-ring mt-4 min-h-32 w-full rounded-lg border border-border p-4" placeholder="Message" />
          <button className="mt-5 rounded-full bg-accent px-5 py-3 font-semibold text-white">Envoyer a tous</button>
        </section>
      </main>
    </>
  );
}
