import Link from "next/link";
import {
  Bell,
  BrainCircuit,
  BriefcaseBusiness,
  CircleDollarSign,
  LayoutDashboard,
  LogIn,
  LogOut,
  Search,
  Settings,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { signOut } from "@/app/auth/actions";
import { ProfilePhoto } from "@/components/profile-photo";
import { ThemeControls } from "@/components/theme-controls";
import { getCurrentUser } from "@/lib/auth";
import type { UserRole } from "@/lib/types";

const roleNavItems: Record<UserRole, { href: string; label: string; icon: LucideIcon }[]> = {
  client: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/missions/new", label: "Nouvelle mission", icon: BrainCircuit },
    { href: "/experts", label: "Experts", icon: Search },
    { href: "/network", label: "Reseau", icon: UsersRound },
    { href: "/notifications", label: "Notifications", icon: Bell }
  ],
  expert: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/lots/lot-001", label: "Mes Lots", icon: BriefcaseBusiness },
    { href: "/experts", label: "Experts", icon: Search },
    { href: "/network", label: "Reseau", icon: UsersRound },
    { href: "/earnings", label: "Revenus", icon: CircleDollarSign }
  ],
  admin: [
    { href: "/admin", label: "Admin", icon: ShieldCheck },
    { href: "/admin/experts/pending", label: "Validation", icon: BriefcaseBusiness },
    { href: "/admin/users", label: "Utilisateurs", icon: Search },
    { href: "/network", label: "Reseau", icon: UsersRound },
    { href: "/admin/analytics", label: "Analytics", icon: LayoutDashboard }
  ]
};

export function SiteHeader() {
  const user = getCurrentUser();
  const navItems = roleNavItems[user.role];

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">SX</span>
          SOS Expert
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-primary"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeControls />
          <Link
            href={user.role === "expert" ? "/settings/expert-profile" : "/settings/profile"}
            className="hidden items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-semibold text-primary sm:flex"
          >
            <ProfilePhoto src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} initials={user.avatarInitials} size="xs" />
            <span>{user.firstName}</span>
            <Settings className="h-4 w-4" />
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-card hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sortir</span>
            </button>
          </form>
          <Link
            href="/auth/login"
            className="focus-ring hidden rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-slate-50 xl:inline-flex"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Changer
          </Link>
        </div>
      </div>
    </header>
  );
}
