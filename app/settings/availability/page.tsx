import { SiteHeader } from "@/components/site-header";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

export default function AvailabilityPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <section className="rounded-lg border border-border bg-white p-6 shadow-card">
          <h1 className="font-display text-3xl font-bold text-primary">Disponibilites</h1>
          <div className="mt-6 grid gap-3">
            {days.map((day) => (
              <div key={day} className="grid gap-3 rounded-lg bg-slate-50 p-4 md:grid-cols-[1fr_160px_160px]">
                <strong>{day}</strong>
                <input className="rounded-lg border border-border px-3 py-2" defaultValue="09:00" />
                <input className="rounded-lg border border-border px-3 py-2" defaultValue="17:00" />
              </div>
            ))}
          </div>
          <button className="mt-6 rounded-full bg-accent px-5 py-3 font-semibold text-white">Enregistrer</button>
        </section>
      </main>
    </>
  );
}
