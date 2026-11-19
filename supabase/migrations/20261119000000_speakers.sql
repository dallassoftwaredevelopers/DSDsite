-- Meetup speakers shown on the Speakers and Community pages.
--
-- Photos are hosted on Vercel Blob (dsd-assets/speakers/); photo_url holds the
-- link. Like the other tables, row level security is on with no policies, so
-- only the site's server code can read or write.

create table if not exists public.speakers (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  role text,
  company text,
  photo_url text,
  linkedin_url text,
  last_spoke date,
  topics text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.speakers enable row level security;
