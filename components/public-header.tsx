import Link from "next/link";
import { ArrowRight, LogIn, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeControls } from "@/components/theme-controls";

export function PublicHeader() {
  return (
    <header className="site-header sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="focus-ring rounded-md" aria-label="Accueil SOS Expert">
          <BrandLogo priority />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          <a href="/#concept" className="focus-ring rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
            Concept
          </a>
          <a href="/#confiance" className="focus-ring rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
            Confiance
          </a>
          <a href="/#domaines" className="focus-ring rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
            Domaines
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeControls />
          <Link
            href="/auth/login"
            className="focus-ring hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-slate-50 sm:inline-flex"
          >
            <LogIn className="h-4 w-4" />
            Connexion
          </Link>
          <Link
            href="/auth/register"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-card hover:bg-blue-700"
          >
            <ShieldCheck className="h-4 w-4" />
            Commencer
            <ArrowRight className="hidden h-4 w-4 sm:block" />
          </Link>
        </div>
      </div>
    </header>
  );
}
