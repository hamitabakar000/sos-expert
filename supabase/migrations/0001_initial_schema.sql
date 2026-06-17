create extension if not exists "uuid-ossp";

create type public.user_role as enum ('client', 'expert', 'admin');
create type public.validation_status as enum ('pending', 'validated', 'suspended', 'rejected');
create type public.budget_preference as enum ('low', 'medium', 'high');
create type public.confidentiality_level as enum ('standard', 'strict');
create type public.consultation_mode as enum ('immediate', 'scheduled', 'crowdsourcing');
create type public.urgency_level as enum ('immediate', 'within_24h', 'within_week', 'flexible');
create type public.mission_status as enum (
  'draft',
  'pending_ai',
  'recommended',
  'consultation_requested',
  'in_consultation',
  'crowdsourcing_proposed',
  'crowdsourcing_confirmed',
  'swarm_constituted',
  'in_progress',
  'consolidating',
  'pending_validation',
  'revision_requested',
  'completed',
  'cancelled'
);
create type public.consultation_status as enum ('pending', 'accepted', 'declined', 'expired', 'scheduled', 'in_session', 'completed', 'cancelled');
create type public.lot_status as enum ('created', 'assigned', 'accepted', 'in_progress', 'delivered', 'validated', 'late', 'revision_requested');
create type public.payment_status as enum ('pending', 'paid', 'failed', 'refunded', 'disputed');
create type public.notification_type as enum ('consultation', 'payment', 'crowdsourcing', 'system');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null,
  first_name text,
  last_name text,
  email text unique not null,
  profile_photo_url text,
  city text,
  preferred_language text not null default 'fr',
  budget_preference public.budget_preference,
  personality_tags text[] not null default '{}',
  confidentiality_preference public.confidentiality_level not null default 'standard',
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.expert_profiles (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  bio text not null,
  domains text[] not null default '{}',
  certifications jsonb not null default '[]'::jsonb,
  hourly_rate numeric(10, 2) not null check (hourly_rate >= 0),
  flat_rate numeric(10, 2) check (flat_rate is null or flat_rate >= 0),
  availability jsonb not null default '{}'::jsonb,
  is_available_immediately boolean not null default false,
  languages text[] not null default '{fr}',
  validation_status public.validation_status not null default 'pending',
  validation_notes text,
  confidentiality_policy text not null default 'standard',
  average_rating numeric(3, 2) not null default 0,
  total_reviews integer not null default 0,
  total_consultations integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint expert_bio_min_length check (char_length(bio) >= 100)
);

create table public.domain_taxonomy (
  id uuid primary key default uuid_generate_v4(),
  parent_id uuid references public.domain_taxonomy(id) on delete cascade,
  name text not null,
  level integer not null check (level between 1 and 3),
  created_at timestamptz not null default now()
);

create table public.missions (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) <= 100),
  description text not null check (char_length(description) >= 50),
  domain_id uuid references public.domain_taxonomy(id),
  domain_label text not null,
  consultation_mode public.consultation_mode not null,
  budget_amount numeric(10, 2),
  budget_preference public.budget_preference,
  preferred_language text not null default 'fr',
  urgency public.urgency_level not null,
  confidentiality public.confidentiality_level not null default 'standard',
  attachments jsonb not null default '[]'::jsonb,
  scheduled_at timestamptz,
  global_deadline timestamptz,
  total_budget numeric(10, 2),
  complexity_score numeric(4, 2) not null default 0,
  status public.mission_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.recommendations (
  id uuid primary key default uuid_generate_v4(),
  mission_id uuid not null references public.missions(id) on delete cascade,
  expert_id uuid not null references public.expert_profiles(id) on delete cascade,
  compatibility_score integer not null check (compatibility_score between 0 and 100),
  semantic_score integer not null check (semantic_score between 0 and 100),
  rule_score integer not null check (rule_score between 0 and 100),
  match_reasons text[] not null default '{}',
  alerts text[] not null default '{}',
  rank integer not null check (rank > 0),
  created_at timestamptz not null default now(),
  unique (mission_id, expert_id)
);

create table public.consultations (
  id uuid primary key default uuid_generate_v4(),
  mission_id uuid not null references public.missions(id) on delete cascade,
  client_id uuid not null references public.profiles(id),
  expert_id uuid not null references public.expert_profiles(id),
  modality text not null check (modality in ('chat', 'video', 'audio')),
  status public.consultation_status not null default 'pending',
  requested_at timestamptz not null default now(),
  scheduled_at timestamptz,
  accepted_at timestamptz,
  started_at timestamptz,
  ended_at timestamptz,
  duration_seconds integer not null default 0,
  estimated_amount numeric(10, 2) not null default 0
);

create table public.chat_messages (
  id uuid primary key default uuid_generate_v4(),
  consultation_id uuid not null references public.consultations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  body text not null,
  attachment_url text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.crowdsourcing_sessions (
  id uuid primary key default uuid_generate_v4(),
  mission_id uuid not null unique references public.missions(id) on delete cascade,
  eligibility_score numeric(4, 3) not null,
  status public.mission_status not null default 'crowdsourcing_proposed',
  final_deliverable text,
  revision_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.crowdsourcing_lots (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references public.crowdsourcing_sessions(id) on delete cascade,
  lot_number integer not null,
  title text not null,
  description text not null,
  deliverable_criteria text not null,
  domain_label text not null,
  budget numeric(10, 2) not null check (budget >= 0),
  deadline timestamptz not null,
  expert_id uuid references public.expert_profiles(id),
  status public.lot_status not null default 'created',
  delivery_text text,
  delivery_files jsonb not null default '[]'::jsonb,
  delivered_at timestamptz,
  validated_at timestamptz,
  unique (session_id, lot_number)
);

create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.profiles(id),
  expert_id uuid references public.expert_profiles(id),
  consultation_id uuid references public.consultations(id),
  lot_id uuid references public.crowdsourcing_lots(id),
  amount numeric(10, 2) not null check (amount >= 0),
  platform_commission numeric(10, 2) not null default 0,
  expert_payout numeric(10, 2) not null default 0,
  stripe_checkout_id text,
  status public.payment_status not null default 'pending',
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  consultation_id uuid not null unique references public.consultations(id) on delete cascade,
  client_id uuid not null references public.profiles(id),
  expert_id uuid not null references public.expert_profiles(id),
  rating integer not null check (rating between 1 and 5),
  comment text check (comment is null or char_length(comment) <= 500),
  is_flagged boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type public.notification_type not null,
  title text not null,
  body text not null,
  action_url text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.expert_profiles enable row level security;
alter table public.domain_taxonomy enable row level security;
alter table public.missions enable row level security;
alter table public.recommendations enable row level security;
alter table public.consultations enable row level security;
alter table public.chat_messages enable row level security;
alter table public.crowdsourcing_sessions enable row level security;
alter table public.crowdsourcing_lots enable row level security;
alter table public.payments enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;

create policy "Profiles can read own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Profiles can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Validated experts are visible to authenticated users"
on public.expert_profiles for select
using (
  validation_status = 'validated'
  or profile_id = auth.uid()
  or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

create policy "Experts manage own dossier"
on public.expert_profiles for all
using (profile_id = auth.uid())
with check (profile_id = auth.uid());

create policy "Domain taxonomy readable by authenticated users"
on public.domain_taxonomy for select
using (auth.role() = 'authenticated');

create policy "Clients manage own missions"
on public.missions for all
using (client_id = auth.uid())
with check (client_id = auth.uid());

create policy "Admins read all missions"
on public.missions for select
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Recommendations visible to mission owner"
on public.recommendations for select
using (
  exists (
    select 1 from public.missions m
    where m.id = mission_id and m.client_id = auth.uid()
  )
);

create policy "Consultation parties can read"
on public.consultations for select
using (
  client_id = auth.uid()
  or exists (
    select 1 from public.expert_profiles ep
    where ep.id = expert_id and ep.profile_id = auth.uid()
  )
);

create policy "Chat visible to consultation parties"
on public.chat_messages for select
using (
  exists (
    select 1 from public.consultations c
    left join public.expert_profiles ep on ep.id = c.expert_id
    where c.id = consultation_id
    and (c.client_id = auth.uid() or ep.profile_id = auth.uid())
  )
);

create policy "Users can send consultation messages"
on public.chat_messages for insert
with check (
  sender_id = auth.uid()
  and exists (
    select 1 from public.consultations c
    left join public.expert_profiles ep on ep.id = c.expert_id
    where c.id = consultation_id
    and (c.client_id = auth.uid() or ep.profile_id = auth.uid())
  )
);

create policy "Crowdsourcing visible to mission owner"
on public.crowdsourcing_sessions for select
using (
  exists (
    select 1 from public.missions m
    where m.id = mission_id and m.client_id = auth.uid()
  )
);

create policy "Lots visible to client and assigned expert"
on public.crowdsourcing_lots for select
using (
  exists (
    select 1
    from public.crowdsourcing_sessions cs
    join public.missions m on m.id = cs.mission_id
    left join public.expert_profiles ep on ep.id = expert_id
    where cs.id = session_id
    and (m.client_id = auth.uid() or ep.profile_id = auth.uid())
  )
);

create policy "Payments visible to payer or expert"
on public.payments for select
using (
  client_id = auth.uid()
  or exists (
    select 1 from public.expert_profiles ep
    where ep.id = expert_id and ep.profile_id = auth.uid()
  )
);

create policy "Reviews readable by authenticated users"
on public.reviews for select
using (auth.role() = 'authenticated');

create policy "Clients create own reviews"
on public.reviews for insert
with check (client_id = auth.uid());

create policy "Notifications visible to owner"
on public.notifications for select
using (user_id = auth.uid());

create policy "Notifications update by owner"
on public.notifications for update
using (user_id = auth.uid())
with check (user_id = auth.uid());
