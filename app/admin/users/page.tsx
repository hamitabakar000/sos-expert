import { AdminUsersManager, type ManagedUser } from "@/components/admin-users-manager";
import { SiteHeader } from "@/components/site-header";
import { demoUsers, experts } from "@/lib/demo-data";

export default function AdminUsersPage() {
  const managedUsers: ManagedUser[] = [
    ...demoUsers.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      city: user.city,
      avatarInitials: user.avatarInitials,
      avatarUrl: user.avatarUrl ?? "",
      status: "active" as const,
      source: user.role
    })),
    ...experts
      .filter((expert) => !demoUsers.some((user) => user.expertId === expert.id))
      .map((expert, index) => ({
        id: expert.profileId,
        firstName: expert.firstName,
        lastName: expert.lastName,
        email: `${expert.firstName.toLowerCase()}.${expert.lastName.toLowerCase()}@sosexpert.ma`,
        role: "expert" as const,
        city: expert.city,
        avatarInitials: `${expert.firstName[0]}${expert.lastName[0]}`,
        avatarUrl: expert.avatarUrl ?? "",
        status: index === 2 ? ("suspended" as const) : ("active" as const),
        source: "expert" as const
      }))
  ];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div>
          <p className="font-semibold text-accent">Administration</p>
          <h1 className="font-display text-3xl font-bold text-primary">Gestion des utilisateurs</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Rechercher, filtrer, suspendre, reactiver ou supprimer un compte en mode demo. Le comportement imite le
            back-office attendu dans la spec.
          </p>
        </div>
        <AdminUsersManager users={managedUsers} />
      </main>
    </>
  );
}
