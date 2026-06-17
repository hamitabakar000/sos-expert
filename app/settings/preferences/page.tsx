import { SiteHeader } from "@/components/site-header";

export default function PreferencesPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <section className="rounded-lg border border-border bg-white p-6 shadow-card">
          <p className="font-semibold text-accent">Preferences IA</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-primary">Personnalisation client</h1>
          <div className="mt-6 grid gap-4">
            <Select label="Budget prefere" values={["low", "medium", "high"]} />
            <Select label="Confidentialite" values={["standard", "strict"]} />
            <Select label="Langue preferee" values={["fr", "ar", "en"]} />
            <label className="block text-sm font-semibold text-primary">
              Tags de personnalite
              <input className="focus-ring mt-2 w-full rounded-lg border border-border px-4 py-3" defaultValue="analytical, pragmatic, methodical" />
            </label>
          </div>
          <button className="mt-6 rounded-full bg-accent px-5 py-3 font-semibold text-white">Mettre a jour</button>
        </section>
      </main>
    </>
  );
}

function Select({ label, values }: { label: string; values: string[] }) {
  return (
    <label className="block text-sm font-semibold text-primary">
      {label}
      <select className="focus-ring mt-2 w-full rounded-lg border border-border bg-white px-4 py-3">
        {values.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
    </label>
  );
}
