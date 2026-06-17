import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  CalendarClock,
  CircleDollarSign,
  GitBranch,
  MessageSquare,
  Plus,
  ToggleRight,
  WalletCards
} from "lucide-react";
import { ProfilePhoto } from "@/components/profile-photo";
import { SiteHeader } from "@/components/site-header";
import { StatCard } from "@/components/stat-card";
import { getCurrentUser } from "@/lib/auth";
import { consultations, experts, lots, missions, networkPosts, notifications, payments } from "@/lib/demo-data";
import { formatMad } from "@/lib/utils";

export default function DashboardPage() {
  const user = getCurrentUser();

  if (user.role === "admin") {
    redirect("/admin");
  }

  return (
    <>
      <SiteHeader />
      {user.role === "expert" ? <ExpertDashboard /> : <ClientDashboard />}
    </>
  );
}

function ClientDashboard() {
  const user = getCurrentUser();
  const clientMissions = missions.filter((mission) => mission.clientId === user.id);
  const clientNotifications = notifications.filter((notification) => notification.userId === user.id);
  const activeMission = clientMissions.find((mission) => mission.mode === "crowdsourcing") ?? clientMissions[0];
  const activeConsultations = consultations.filter(
    (consultation) => consultation.clientId === user.id && consultation.status !== "completed"
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <ProfilePhoto src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} initials={user.avatarInitials} size="lg" />
          <div>
          <p className="font-semibold text-accent">Espace client</p>
          <h1 className="font-display text-3xl font-bold text-primary">Bonjour {user.firstName}</h1>
            <p className="mt-1 text-slate-600">
              On garde vos missions au clair : les experts, les messages et les prochaines etapes au meme endroit.
            </p>
          </div>
        </div>
        <Link
          href="/missions/new"
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Nouvelle mission
        </Link>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <StatCard label="Consultations actives" value={String(activeConsultations.length)} detail="Chat, audio ou video" icon={MessageSquare} />
        <StatCard label="Missions publiees" value={String(clientMissions.length)} detail="Simple et crowdsourcing" icon={CalendarClock} />
        <StatCard label="Paiements" value={formatMad(payments.reduce((total, payment) => total + payment.amount, 0))} detail="Historique demo" icon={CircleDollarSign} />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-lg border border-border bg-white p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold text-primary">Mission crowdsourcing active</h2>
              <p className="mt-1 text-sm text-muted">
                {activeMission.title} - plusieurs experts travaillent en parallele, chacun sur une partie claire.
              </p>
            </div>
            <span className="rounded-full bg-accent-light px-3 py-1 text-sm font-bold text-accent">{lots.length} Lots</span>
          </div>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-1/2 rounded-full bg-accent" />
          </div>
          <div className="mt-5 divide-y divide-border">
            {lots.map((lot) => (
              <Link key={lot.id} href={`/lots/${lot.id}`} className="flex items-center justify-between gap-4 py-4 hover:bg-slate-50">
                <div>
                  <p className="font-semibold text-primary">
                    Lot {lot.number} - {lot.title}
                  </p>
                  <p className="mt-1 text-sm text-muted">Deadline: {lot.deadline}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-600">
                  {lot.status}
                </span>
              </Link>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-border bg-white p-6 shadow-card">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-accent" />
            <h2 className="font-display text-xl font-bold text-primary">Notifications recentes</h2>
          </div>
          <div className="mt-5 space-y-4">
            {clientNotifications.map((item) => (
              <Link key={item.id} href={item.actionUrl} className="block rounded-lg bg-slate-50 p-4 text-sm text-slate-700 hover:bg-blue-50">
                <strong className="block text-primary">{item.title}</strong>
                <span className="mt-1 block">{item.body}</span>
                <span className="mt-2 block text-xs text-muted">{item.createdAt}</span>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-8 rounded-lg border border-border bg-white p-6 shadow-card">
        <div className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-accent" />
          <h2 className="font-display text-xl font-bold text-primary">Prochaines actions</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <Link href="/missions/mis-001" className="rounded-lg border border-border p-4 font-semibold hover:bg-slate-50">
            Voir recommandations IA
          </Link>
          <Link href="/consultations/con-002" className="rounded-lg border border-border p-4 font-semibold hover:bg-slate-50">
            Rejoindre le chat
          </Link>
          <Link href="/history" className="rounded-lg border border-border p-4 font-semibold hover:bg-slate-50">
            Historique
          </Link>
          <Link href="/settings/preferences" className="rounded-lg border border-border p-4 font-semibold hover:bg-slate-50">
            Preferences IA
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-border bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-accent">Vie du reseau</p>
            <h2 className="font-display text-xl font-bold text-primary">Ce que les experts partagent en ce moment</h2>
          </div>
          <Link href="/network" className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-slate-50">
            Ouvrir le reseau
          </Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {networkPosts.slice(0, 2).map((post) => (
            <article key={post.id} className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase text-accent">{post.domain}</p>
              <h3 className="mt-2 font-display text-lg font-bold text-primary">{post.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{post.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ExpertDashboard() {
  const user = getCurrentUser();
  const expert = experts.find((item) => item.id === user.expertId) ?? experts[0];
  const assignedLots = lots.filter((lot) => lot.expertId === expert.id);
  const expertConsultations = consultations.filter((consultation) => consultation.expertId === expert.id);
  const earnings = payments.filter((payment) => payment.expertId === expert.id).reduce((total, payment) => total + payment.payout, 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <ProfilePhoto
            src={expert.avatarUrl}
            alt={`${expert.firstName} ${expert.lastName}`}
            initials={`${expert.firstName[0]}${expert.lastName[0]}`}
            size="lg"
          />
          <div>
          <p className="font-semibold text-accent">Espace expert</p>
          <h1 className="font-display text-3xl font-bold text-primary">Bonjour {expert.firstName}</h1>
            <p className="mt-1 text-slate-600">
              {expert.title} a {expert.city}. Vos demandes importantes sont pretes, sans bruit inutile.
            </p>
          </div>
        </div>
        <button className="focus-ring inline-flex items-center gap-2 rounded-full bg-success px-5 py-3 text-sm font-semibold text-white">
          <ToggleRight className="h-5 w-5" />
          Disponible maintenant
        </button>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <StatCard label="Demandes entrantes" value="3" detail="Avec compte a rebours demo" icon={MessageSquare} />
        <StatCard label="Lots assignes" value={String(assignedLots.length)} detail="Crowdsourcing actif" icon={GitBranch} />
        <StatCard label="Revenus nets" value={formatMad(earnings)} detail="Commission deja retiree" icon={WalletCards} />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-lg border border-border bg-white p-6 shadow-card">
          <h2 className="font-display text-xl font-bold text-primary">Consultations</h2>
          <div className="mt-4 divide-y divide-border">
            {expertConsultations.map((consultation) => {
              const mission = missions.find((item) => item.id === consultation.missionId);
              return (
                <Link key={consultation.id} href={`/consultations/${consultation.id}`} className="block py-4 hover:bg-slate-50">
                  <p className="font-semibold text-primary">{mission?.title}</p>
                  <p className="mt-1 text-sm text-muted">{consultation.modality} - {consultation.status}</p>
                </Link>
              );
            })}
          </div>
        </article>

        <article className="rounded-lg border border-border bg-white p-6 shadow-card">
          <h2 className="font-display text-xl font-bold text-primary">Lots a livrer</h2>
          <div className="mt-4 divide-y divide-border">
            {assignedLots.map((lot) => (
              <Link key={lot.id} href={`/lots/${lot.id}`} className="block py-4 hover:bg-slate-50">
                <p className="font-semibold text-primary">
                  Lot {lot.number} - {lot.title}
                </p>
                <p className="mt-1 text-sm text-muted">{formatMad(lot.budget)} - deadline {lot.deadline}</p>
              </Link>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
