import { BrainCircuit, FileUp, Languages, WalletCards } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { domains } from "@/lib/demo-data";

export default function NewMissionPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div>
          <p className="font-semibold text-accent">Publication de mission</p>
          <h1 className="font-display text-3xl font-bold text-primary">Nouvelle mission</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Ce formulaire suit le parcours en 3 etapes de la spec : details, mode & budget, confirmation.
          </p>
        </div>

        <form className="mt-8 rounded-lg border border-border bg-white p-6 shadow-card">
          <div className="grid gap-4 border-b border-border pb-6 md:grid-cols-3">
            {["Details", "Mode & budget", "Confirmation"].map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="font-semibold text-primary">{step}</span>
              </div>
            ))}
          </div>

          <section className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="block text-sm font-semibold text-primary md:col-span-2">
              Titre de la mission
              <input
                className="focus-ring mt-2 w-full rounded-lg border border-border px-4 py-3"
                placeholder="Ex: Audit securite de mon application"
              />
            </label>

            <label className="block text-sm font-semibold text-primary">
              Domaine
              <select className="focus-ring mt-2 w-full rounded-lg border border-border bg-white px-4 py-3">
                {domains.map((domain) => (
                  <option key={domain}>{domain}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-semibold text-primary">
              Urgence
              <select className="focus-ring mt-2 w-full rounded-lg border border-border bg-white px-4 py-3">
                <option>Immediate</option>
                <option>Dans les 24h</option>
                <option>Dans la semaine</option>
                <option>Flexible</option>
              </select>
            </label>

            <label className="block text-sm font-semibold text-primary md:col-span-2">
              Description
              <textarea
                className="focus-ring mt-2 min-h-36 w-full rounded-lg border border-border px-4 py-3"
                placeholder="Expliquez le contexte, le livrable attendu, les contraintes et les fichiers disponibles."
              />
            </label>
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { title: "Immediat", icon: BrainCircuit, text: "Demande envoyee a un expert disponible." },
              { title: "Rendez-vous", icon: Languages, text: "Choix d'un creneau selon disponibilites." },
              { title: "Mission complexe", icon: WalletCards, text: "Analyse IA et decomposition en Lots." }
            ].map((mode) => (
              <label key={mode.title} className="rounded-lg border border-border p-4 hover:border-accent">
                <input name="mode" type="radio" className="sr-only" />
                <mode.icon className="h-6 w-6 text-accent" />
                <strong className="mt-3 block text-primary">{mode.title}</strong>
                <span className="mt-2 block text-sm leading-6 text-slate-600">{mode.text}</span>
              </label>
            ))}
          </section>

          <section className="mt-8 grid gap-5 md:grid-cols-3">
            <label className="block text-sm font-semibold text-primary">
              Budget exact
              <input className="focus-ring mt-2 w-full rounded-lg border border-border px-4 py-3" placeholder="8500" />
            </label>
            <label className="block text-sm font-semibold text-primary">
              Langue
              <select className="focus-ring mt-2 w-full rounded-lg border border-border bg-white px-4 py-3">
                <option>Francais</option>
                <option>Arabe</option>
                <option>Anglais</option>
              </select>
            </label>
            <label className="block text-sm font-semibold text-primary">
              Confidentialite
              <select className="focus-ring mt-2 w-full rounded-lg border border-border bg-white px-4 py-3">
                <option>Standard</option>
                <option>Stricte</option>
              </select>
            </label>
          </section>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-slate-50 p-4">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FileUp className="h-4 w-4 text-accent" />
              Pieces jointes : PDF, JPG ou PNG, 5 fichiers max
            </span>
            <button type="button" className="focus-ring rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold">
              Ajouter un fichier
            </button>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="focus-ring rounded-full bg-accent px-6 py-3 font-semibold text-white hover:bg-blue-700">
              Soumettre et trouver un expert
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
