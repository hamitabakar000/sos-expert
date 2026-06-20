"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileText,
  GraduationCap,
  Languages,
  MapPin,
  ShieldCheck,
  X,
  XCircle
} from "lucide-react";
import { ProfilePhoto } from "@/components/profile-photo";
import type { Expert, ExpertValidationCase } from "@/lib/types";
import { cn } from "@/lib/utils";

type ExpertValidationBoardProps = {
  cases: ExpertValidationCase[];
  experts: Expert[];
};

type Decision = "approved" | "rejected" | "more_info";

const documentStatusLabel: Record<ExpertValidationCase["documents"][number]["status"], string> = {
  verified: "Verifie",
  pending: "A verifier",
  missing: "Manquant",
  inconsistent: "Incoherent"
};

const stepLabel: Record<ExpertValidationCase["currentStep"], string> = {
  profile_review: "Profil",
  documents_review: "Documents",
  interview: "Entretien",
  decision: "Decision"
};

const recommendationLabel: Record<ExpertValidationCase["aiRecommendation"], string> = {
  approve_with_checks: "Validable apres controles",
  manual_review: "Examen manuel requis",
  reject: "Rejet recommande"
};

export function ExpertValidationBoard({ cases, experts }: ExpertValidationBoardProps) {
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id ?? "");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [reviewedCvs, setReviewedCvs] = useState<Record<string, boolean>>({});
  const [decisionNotes, setDecisionNotes] = useState<Record<string, string>>({});
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const [cvOpen, setCvOpen] = useState(false);

  const expertById = useMemo(() => new Map(experts.map((expert) => [expert.id, expert])), [experts]);
  const selectedCase = cases.find((item) => item.id === selectedCaseId) ?? cases[0];
  const selectedExpert = selectedCase ? expertById.get(selectedCase.expertId) : undefined;

  if (!selectedCase || !selectedExpert) {
    return (
      <div className="rounded-lg border border-border bg-white p-8 text-center shadow-card">
        <h2 className="font-display text-xl font-bold text-primary">Aucun dossier en attente</h2>
        <p className="mt-2 text-slate-600">Tous les experts ont ete traites pour le moment.</p>
      </div>
    );
  }

  const checkedCount = selectedCase.requiredChecks.filter((item) => checkedItems[`${selectedCase.id}:${item.id}`]).length;
  const note = decisionNotes[selectedCase.id] ?? "";
  const hasBlockingDocument = selectedCase.documents.some((document) =>
    ["missing", "inconsistent"].includes(document.status)
  );
  const cvReviewed = Boolean(reviewedCvs[selectedCase.id]);
  const canDecide =
    checkedCount === selectedCase.requiredChecks.length && cvReviewed && note.trim().length >= 30;
  const hasDecision = decisions[selectedCase.id];

  function toggleCheck(checkId: string) {
    const key = `${selectedCase.id}:${checkId}`;
    setCheckedItems((current) => ({ ...current, [key]: !current[key] }));
  }

  function decide(decision: Decision) {
    if (!canDecide) {
      return;
    }

    setDecisions((current) => ({ ...current, [selectedCase.id]: decision }));
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[340px_1fr]">
      <aside className="h-fit rounded-lg border border-border bg-white p-4 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-accent">File de validation</p>
            <h2 className="font-display text-xl font-bold text-primary">{cases.length} dossiers a examiner</h2>
          </div>
          <ClipboardCheck className="h-6 w-6 text-accent" />
        </div>

        <div className="mt-4 space-y-3">
          {cases.map((validationCase) => {
            const expert = expertById.get(validationCase.expertId);
            const decision = decisions[validationCase.id];

            if (!expert) {
              return null;
            }

            return (
              <button
                key={validationCase.id}
                type="button"
                onClick={() => setSelectedCaseId(validationCase.id)}
                className={cn(
                  "focus-ring w-full rounded-lg border p-3 text-left transition hover:bg-slate-50",
                  selectedCase.id === validationCase.id ? "border-accent bg-accent-light" : "border-border bg-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <ProfilePhoto
                    src={expert.avatarUrl}
                    alt={`${expert.firstName} ${expert.lastName}`}
                    initials={`${expert.firstName[0]}${expert.lastName[0]}`}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-primary">
                      {expert.firstName} {expert.lastName}
                    </p>
                    <p className="truncate text-xs text-muted">{expert.title}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">{stepLabel[validationCase.currentStep]}</span>
                  <span className={cn("rounded-full px-2 py-1", riskClass(validationCase.aiRiskScore))}>
                    Risque {validationCase.aiRiskScore}%
                  </span>
                  {decision ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-success">Decision saisie</span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="space-y-5">
        <article className="rounded-lg border border-border bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <ProfilePhoto
                src={selectedExpert.avatarUrl}
                alt={`${selectedExpert.firstName} ${selectedExpert.lastName}`}
                initials={`${selectedExpert.firstName[0]}${selectedExpert.lastName[0]}`}
                size="lg"
              />
              <div>
                <p className="text-sm font-semibold text-accent">Dossier {selectedCase.id}</p>
                <h2 className="font-display text-2xl font-bold text-primary">
                  {selectedExpert.firstName} {selectedExpert.lastName}
                </h2>
                <p className="mt-1 text-slate-600">{selectedExpert.title}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedExpert.domains.map((domain) => (
                    <span key={domain} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 text-sm">
              <p className="font-semibold text-primary">Recommandation IA</p>
              <p className="mt-1 text-slate-600">{recommendationLabel[selectedCase.aiRecommendation]}</p>
              <p className={cn("mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold", riskClass(selectedCase.aiRiskScore))}>
                Score risque {selectedCase.aiRiskScore}%
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Metric label="Experience" value={`${selectedExpert.yearsExperience} ans`} />
            <Metric label="Langues" value={selectedExpert.languages.map((language) => language.toUpperCase()).join(", ")} />
            <Metric label="Soumis le" value={selectedCase.submittedAt} />
          </div>

          <div className="mt-6 rounded-lg bg-slate-50 p-4">
            <p className="font-semibold text-primary">Bio a examiner</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{selectedExpert.bio}</p>
          </div>
        </article>

        <article className="rounded-lg border border-accent/30 bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent-light p-3 text-accent">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-accent">Document principal</p>
                <h3 className="font-display text-xl font-bold text-primary">
                  CV de {selectedExpert.firstName} {selectedExpert.lastName}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  CV-{selectedExpert.firstName.toLowerCase()}-{selectedExpert.lastName.toLowerCase()}.pdf · transmis le{" "}
                  {selectedCase.submittedAt}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCvOpen(true)}
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white"
            >
              <Eye className="h-4 w-4" />
              Voir le CV
            </button>
          </div>

          <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-slate-50 p-3">
            <input
              type="checkbox"
              checked={cvReviewed}
              onChange={(event) =>
                setReviewedCvs((current) => ({ ...current, [selectedCase.id]: event.target.checked }))
              }
              className="mt-1 h-5 w-5 rounded border-border text-accent"
            />
            <span>
              <span className="block font-semibold text-primary">J’ai examiné le CV</span>
              <span className="mt-1 block text-sm text-slate-600">
                L’expérience, les dates, les compétences et les certifications sont cohérentes avec le profil.
              </span>
            </span>
          </label>
        </article>

        <div className="grid gap-5 xl:grid-cols-2">
          <article className="rounded-lg border border-border bg-white p-5 shadow-card">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              <h3 className="font-display text-lg font-bold text-primary">Pieces du dossier</h3>
            </div>
            <div className="mt-4 space-y-3">
              {selectedCase.documents.map((document) => (
                <div key={document.id} className="rounded-lg border border-border p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-primary">{document.label}</p>
                    <span className={cn("rounded-full px-3 py-1 text-xs font-bold", documentStatusClass(document.status))}>
                      {documentStatusLabel[document.status]}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{document.note}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-border bg-white p-5 shadow-card">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <h3 className="font-display text-lg font-bold text-primary">Checklist obligatoire</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              La decision reste bloquee tant que le CV et tous les controles ne sont pas examines et justifies.
            </p>
            <div className="mt-4 space-y-3">
              {selectedCase.requiredChecks.map((check) => {
                const checked = checkedItems[`${selectedCase.id}:${check.id}`];

                return (
                  <label key={check.id} className="flex gap-3 rounded-lg border border-border p-3">
                    <input
                      type="checkbox"
                      checked={Boolean(checked)}
                      onChange={() => toggleCheck(check.id)}
                      className="mt-1 h-5 w-5 rounded border-border text-accent"
                    />
                    <span>
                      <span className="block font-semibold text-primary">{check.label}</span>
                      <span className="mt-1 block text-sm text-slate-600">{check.description}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </article>
        </div>

        <article className="rounded-lg border border-border bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-bold text-primary">Decision admin motivee</h3>
              <p className="mt-1 text-sm text-slate-600">
                Note minimale : 30 caracteres. Cette trace explique pourquoi le profil peut entrer sur la marketplace.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">
              {checkedCount + Number(cvReviewed)}/{selectedCase.requiredChecks.length + 1} controles
            </span>
          </div>

          {selectedCase.redFlags.length ? (
            <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-4">
              <div className="flex items-center gap-2 font-semibold text-warning">
                <AlertTriangle className="h-5 w-5" />
                Points de vigilance
              </div>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {selectedCase.redFlags.map((flag) => (
                  <li key={flag}>- {flag}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <textarea
            value={note}
            onChange={(event) => setDecisionNotes((current) => ({ ...current, [selectedCase.id]: event.target.value }))}
            className="focus-ring mt-4 min-h-28 w-full rounded-lg border border-border p-3 text-sm"
            placeholder="Exemple : identite verifiee, documents suffisants, limites de mission clarifiees, validation possible avec suivi qualite..."
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!canDecide || hasBlockingDocument}
              onClick={() => decide("approved")}
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-success px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <CheckCircle2 className="h-4 w-4" />
              Confirmer l'expert
            </button>
            <button
              type="button"
              disabled={!canDecide}
              onClick={() => decide("more_info")}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold text-primary disabled:cursor-not-allowed disabled:text-slate-400"
            >
              Demander complement
            </button>
            <button
              type="button"
              disabled={!canDecide}
              onClick={() => decide("rejected")}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-red-200 px-5 py-3 text-sm font-bold text-error disabled:cursor-not-allowed disabled:text-slate-400"
            >
              <XCircle className="h-4 w-4" />
              Rejeter
            </button>
          </div>

          {hasBlockingDocument ? (
            <p className="mt-3 text-sm font-semibold text-warning">
              Validation impossible : un document est manquant ou incoherent. L'admin peut seulement demander un complement ou rejeter.
            </p>
          ) : null}

          {hasDecision ? (
            <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-success">
              Decision demo enregistree : {decisionLabel(hasDecision)}.
            </p>
          ) : null}

          <div className="mt-5 border-t border-border pt-4">
            <p className="font-semibold text-primary">Notes precedentes</p>
            <div className="mt-3 space-y-3">
              {selectedCase.adminNotes.map((adminNote) => (
                <div key={`${adminNote.author}-${adminNote.at}`} className="rounded-lg bg-slate-50 p-3 text-sm">
                  <p className="font-semibold text-primary">{adminNote.author}</p>
                  <p className="mt-1 text-slate-600">{adminNote.body}</p>
                  <p className="mt-2 text-xs text-muted">{adminNote.at}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      {cvOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/70 p-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setCvOpen(false);
            }
          }}
        >
          <article className="w-full max-w-4xl rounded-lg bg-white shadow-2xl">
            <header className="sticky top-0 flex items-center justify-between gap-4 rounded-t-lg border-b border-border bg-white p-4">
              <div>
                <p className="text-sm font-semibold text-accent">Aperçu du CV transmis</p>
                <h2 id="cv-title" className="font-display text-xl font-bold text-primary">
                  {selectedExpert.firstName} {selectedExpert.lastName}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCvOpen(false)}
                className="focus-ring rounded-full border border-border p-2 text-primary hover:bg-slate-50"
                aria-label="Fermer le CV"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-center">
                <ProfilePhoto
                  src={selectedExpert.avatarUrl}
                  alt={`${selectedExpert.firstName} ${selectedExpert.lastName}`}
                  initials={`${selectedExpert.firstName[0]}${selectedExpert.lastName[0]}`}
                  size="xl"
                />
                <div>
                  <h3 className="font-display text-3xl font-bold text-primary">
                    {selectedExpert.firstName} {selectedExpert.lastName}
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-accent">{selectedExpert.title}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent" />
                      {selectedExpert.city}
                    </span>
                    <span className="flex items-center gap-2">
                      <Languages className="h-4 w-4 text-accent" />
                      {selectedExpert.languages.map((language) => language.toUpperCase()).join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              <CvSection icon={BriefcaseBusiness} title="Profil et expérience">
                <p className="leading-7 text-slate-700">{selectedExpert.bio}</p>
                <div className="mt-4 rounded-lg border-l-4 border-accent bg-slate-50 p-4">
                  <p className="font-semibold text-primary">{selectedExpert.title}</p>
                  <p className="mt-1 text-sm font-medium text-accent">
                    Expérience professionnelle · {selectedExpert.yearsExperience} ans
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Missions réalisées dans les domaines suivants : {selectedExpert.domains.join(", ")}. Conseil,
                    accompagnement client et production de livrables professionnels.
                  </p>
                </div>
              </CvSection>

              <CvSection icon={GraduationCap} title="Diplômes et certifications">
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedExpert.certifications.map((certification) => (
                    <div key={certification} className="rounded-lg border border-border p-4">
                      <p className="font-semibold text-primary">{certification}</p>
                      <p className="mt-1 text-xs text-success">Justificatif joint au dossier</p>
                    </div>
                  ))}
                </div>
              </CvSection>

              <CvSection icon={ClipboardCheck} title="Compétences principales">
                <div className="flex flex-wrap gap-2">
                  {[...selectedExpert.domains, ...selectedExpert.verifiedBadges].map((skill) => (
                    <span key={skill} className="rounded-full bg-accent-light px-3 py-1 text-sm font-semibold text-accent">
                      {skill}
                    </span>
                  ))}
                </div>
              </CvSection>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-blue-950">
                  Comparez les informations du CV avec les justificatifs du dossier avant de valider l’expert.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setReviewedCvs((current) => ({ ...current, [selectedCase.id]: true }));
                    setCvOpen(false);
                  }}
                  className="focus-ring rounded-full bg-success px-5 py-2 text-sm font-bold text-white"
                >
                  CV examiné
                </button>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </div>
  );
}

function CvSection({
  icon: Icon,
  title,
  children
}: {
  icon: typeof BriefcaseBusiness;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-accent" />
        <h4 className="font-display text-xl font-bold text-primary">{title}</h4>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-white p-4">
      <p className="text-xs font-semibold uppercase text-muted">{label}</p>
      <p className="mt-1 font-semibold text-primary">{value}</p>
    </div>
  );
}

function riskClass(score: number) {
  if (score >= 70) {
    return "bg-red-50 text-error";
  }

  if (score >= 45) {
    return "bg-orange-50 text-warning";
  }

  return "bg-emerald-50 text-success";
}

function documentStatusClass(status: ExpertValidationCase["documents"][number]["status"]) {
  if (status === "verified") {
    return "bg-emerald-50 text-success";
  }

  if (status === "missing" || status === "inconsistent") {
    return "bg-red-50 text-error";
  }

  return "bg-orange-50 text-warning";
}

function decisionLabel(decision: Decision) {
  if (decision === "approved") {
    return "expert confirme";
  }

  if (decision === "more_info") {
    return "complement demande";
  }

  return "dossier rejete";
}
