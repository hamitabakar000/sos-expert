"use client";

import { useMemo, useState } from "react";
import { Ban, CheckCircle2, Search, ShieldAlert, Trash2, UserCog } from "lucide-react";
import { ProfilePhoto } from "@/components/profile-photo";
import type { UserRole } from "@/lib/types";

export type ManagedUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  city: string;
  avatarInitials: string;
  avatarUrl?: string;
  status: "active" | "suspended" | "deleted";
  source: "client" | "expert" | "admin";
};

type AdminUsersManagerProps = {
  users: ManagedUser[];
};

type RoleFilter = "all" | UserRole;
type StatusFilter = "all" | ManagedUser["status"];

export function AdminUsersManager({ users }: AdminUsersManagerProps) {
  const [managedUsers, setManagedUsers] = useState(users);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id ?? "");

  const visibleUsers = useMemo(() => {
    const normalizedQuery = normalize(query);

    return managedUsers.filter((user) => {
      const matchesQuery =
        !normalizedQuery ||
        normalize(`${user.firstName} ${user.lastName} ${user.email} ${user.city}`).includes(normalizedQuery);
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;

      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [managedUsers, query, roleFilter, statusFilter]);

  const selectedUser = managedUsers.find((user) => user.id === selectedUserId) ?? visibleUsers[0] ?? managedUsers[0];

  function updateStatus(userId: string, status: ManagedUser["status"]) {
    setManagedUsers((current) => current.map((user) => (user.id === userId ? { ...user, status } : user)));
    setSelectedUserId(userId);
  }

  function updateRole(userId: string, role: UserRole) {
    setManagedUsers((current) => current.map((user) => (user.id === userId ? { ...user, role } : user)));
    setSelectedUserId(userId);
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="rounded-lg border border-border bg-white shadow-card">
        <div className="border-b border-border p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_160px_160px]">
            <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
              <Search className="h-4 w-4 text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                placeholder="Rechercher par nom, email, ville..."
              />
            </div>
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value as RoleFilter)}
              className="focus-ring rounded-lg border border-border bg-white px-3 py-2 text-sm"
            >
              <option value="all">Tous les roles</option>
              <option value="client">Clients</option>
              <option value="expert">Experts</option>
              <option value="admin">Admins</option>
            </select>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
              className="focus-ring rounded-lg border border-border bg-white px-3 py-2 text-sm"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="suspended">Suspendus</option>
              <option value="deleted">Supprimes</option>
            </select>
          </div>
          <p className="mt-3 text-sm text-muted">
            {visibleUsers.length} utilisateur{visibleUsers.length > 1 ? "s" : ""} affiche
            {visibleUsers.length > 1 ? "s" : ""}. Les actions ci-dessous simulent la gestion admin.
          </p>
        </div>

        <div className="divide-y divide-border">
          {visibleUsers.map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => setSelectedUserId(user.id)}
              className={`grid w-full items-center gap-3 p-4 text-left hover:bg-slate-50 md:grid-cols-[1fr_130px_120px_180px] ${
                selectedUser?.id === user.id ? "bg-blue-50" : ""
              } ${user.status === "deleted" ? "opacity-60" : ""}`}
            >
              <div className="flex items-center gap-3">
                <ProfilePhoto src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} initials={user.avatarInitials} size="sm" />
                <div>
                  <strong className="block text-primary">
                    {user.firstName} {user.lastName}
                  </strong>
                  <span className="text-sm text-muted">{user.email}</span>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-center text-xs font-bold uppercase text-slate-700">
                {user.role}
              </span>
              <StatusBadge status={user.status} />
              <span className="text-sm text-muted">{user.city}</span>
            </button>
          ))}
        </div>
      </section>

      <aside className="h-fit rounded-lg border border-border bg-white p-5 shadow-card">
        {selectedUser ? (
          <>
            <div className="flex items-center gap-4">
              <ProfilePhoto
                src={selectedUser.avatarUrl}
                alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                initials={selectedUser.avatarInitials}
                size="lg"
              />
              <div>
                <p className="text-sm font-semibold text-accent">Dossier utilisateur</p>
                <h2 className="font-display text-xl font-bold text-primary">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>
                <p className="mt-1 text-sm text-muted">{selectedUser.email}</p>
              </div>
            </div>

            <dl className="mt-5 grid gap-3 text-sm">
              <Info label="Role" value={selectedUser.role} />
              <Info label="Ville" value={selectedUser.city} />
              <Info label="Statut" value={selectedUser.status} />
              <Info label="Origine demo" value={selectedUser.source} />
            </dl>

            <label className="mt-5 block text-sm font-semibold text-primary">
              Modifier le role
              <select
                value={selectedUser.role}
                onChange={(event) => updateRole(selectedUser.id, event.target.value as UserRole)}
                className="focus-ring mt-2 w-full rounded-lg border border-border bg-white px-3 py-2"
                disabled={selectedUser.status === "deleted"}
              >
                <option value="client">Client</option>
                <option value="expert">Expert</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            <div className="mt-5 grid gap-2">
              <button
                type="button"
                onClick={() => updateStatus(selectedUser.id, "active")}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-success px-4 py-2 text-sm font-semibold text-white"
              >
                <CheckCircle2 className="h-4 w-4" />
                Activer
              </button>
              <button
                type="button"
                onClick={() => updateStatus(selectedUser.id, "suspended")}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900"
              >
                <Ban className="h-4 w-4" />
                Suspendre
              </button>
              <button
                type="button"
                onClick={() => updateStatus(selectedUser.id, "deleted")}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-error"
              >
                <Trash2 className="h-4 w-4" />
                Soft delete
              </button>
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              <p className="flex items-center gap-2 font-semibold text-primary">
                <UserCog className="h-4 w-4 text-accent" />
                Historique admin demo
              </p>
              <p className="mt-2">
                Les changements restent dans l'interface pour la demonstration. Avec Supabase, ces actions iront vers
                les tables `profiles` et `expert_profiles`.
              </p>
            </div>
          </>
        ) : (
          <div className="rounded-lg bg-slate-50 p-5 text-center">
            <ShieldAlert className="mx-auto h-8 w-8 text-muted" />
            <p className="mt-2 text-sm text-muted">Selectionnez un utilisateur.</p>
          </div>
        )}
      </aside>
    </div>
  );
}

function StatusBadge({ status }: { status: ManagedUser["status"] }) {
  if (status === "active") {
    return <span className="rounded-full bg-green-50 px-3 py-1 text-center text-xs font-bold text-success">actif</span>;
  }

  if (status === "suspended") {
    return <span className="rounded-full bg-amber-50 px-3 py-1 text-center text-xs font-bold text-amber-900">suspendu</span>;
  }

  return <span className="rounded-full bg-red-50 px-3 py-1 text-center text-xs font-bold text-error">supprime</span>;
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-3">
      <dt className="text-muted">{label}</dt>
      <dd className="font-semibold text-primary">{value}</dd>
    </div>
  );
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
