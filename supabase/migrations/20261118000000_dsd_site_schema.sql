-- Dallas Software Developers site schema.
--
-- Every table has row level security enabled with no policies, so nothing is
-- readable or writable through the public (publishable/anon) key. The site
-- reads and writes only from its server routes with the secret key.

create table if not exists public.people (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  full_name text not null,
  is_admin boolean not null default false,
  x_url text,
  linkedin_url text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.action_links (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  link_name text not null,
  link text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.cohort_status (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  status_type text not null,
  message text not null,
  active boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.cohort_waitlist (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  name text not null,
  email text not null,
  notified boolean not null default false,
  created_at timestamptz not null default now()
);

-- One signup per email address, ignoring case.
create unique index if not exists cohort_waitlist_email_key
  on public.cohort_waitlist (lower(email));

create table if not exists public.speaker_requests (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  full_name text not null,
  email text not null,
  linkedin_url text not null,
  topic text not null,
  brief_description text not null,
  created_at timestamptz not null default now()
);

alter table public.people enable row level security;
alter table public.action_links enable row level security;
alter table public.cohort_status enable row level security;
alter table public.cohort_waitlist enable row level security;
alter table public.speaker_requests enable row level security;

-- Public bucket for team headshots (readable by URL, writable only with the secret key).
insert into storage.buckets (id, name, public)
values ('headshots', 'headshots', true)
on conflict (id) do nothing;
