import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
};

export function StatCard({ label, value, detail, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-lg border border-border bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">{label}</p>
          <strong className="mt-2 block font-display text-3xl text-primary">{value}</strong>
        </div>
        <span className="rounded-lg bg-accent-light p-3 text-accent">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-500">{detail}</p>
    </article>
  );
}
