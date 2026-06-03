-- ── Renewa Green — Supabase Schema ──────────────────────────
-- Run this in your Supabase project: Dashboard → SQL Editor

-- Form Submissions
create table if not exists form_submissions (
  id            text primary key,
  form_type     text not null,
  ref_id        text,
  date          text,
  primary_name  text,
  primary_email text,
  data          jsonb default '{}',
  created_at    timestamptz default now()
);

-- Articles (stored as JSONB to preserve nested structure)
create table if not exists articles (
  id         text primary key,
  data       jsonb not null,
  created_at timestamptz default now()
);

-- Jobs (stored as JSONB to preserve nested structure)
create table if not exists jobs (
  id         text primary key,
  data       jsonb not null,
  created_at timestamptz default now()
);

-- Investors
create table if not exists investors (
  id        text primary key,
  name      text,
  company   text,
  type      text,
  round     text,
  amount_m  numeric,
  equity    numeric,
  date      text,
  status    text,
  notes     text,
  created_at timestamptz default now()
);

-- Fund Entries
create table if not exists fund_entries (
  id         text primary key,
  from_name  text,
  amount_m   numeric,
  date       text,
  round      text,
  notes      text,
  created_at timestamptz default now()
);

-- Chart of Accounts
create table if not exists chart_accounts (
  id             text primary key,
  code           text,
  name           text,
  type           text,
  normal_balance text,
  parent_id      text references chart_accounts(id) on delete set null
);

-- Vendors / Customers
create table if not exists vendors (
  id       text primary key,
  code     text,
  name     text not null,
  type     text not null,  -- 'vendor' | 'customer' | 'both'
  phone    text,
  email    text,
  address  text,
  notes    text
);

-- Journal Entries
create table if not exists journal_entries (
  id          text primary key,
  ref         text,
  date        text,
  description text,
  lines       jsonb default '[]',
  contact_id  text references vendors(id) on delete set null,
  created_at  timestamptz default now()
);

-- ── Row Level Security (allow all for now, restrict later) ──
alter table form_submissions enable row level security;
alter table articles         enable row level security;
alter table jobs             enable row level security;
alter table investors        enable row level security;
alter table fund_entries     enable row level security;
alter table chart_accounts   enable row level security;
alter table vendors          enable row level security;
alter table journal_entries  enable row level security;

create policy "public read-write" on form_submissions for all using (true) with check (true);
create policy "public read-write" on articles         for all using (true) with check (true);
create policy "public read-write" on jobs             for all using (true) with check (true);
create policy "public read-write" on investors        for all using (true) with check (true);
create policy "public read-write" on fund_entries     for all using (true) with check (true);
create policy "public read-write" on chart_accounts   for all using (true) with check (true);
create policy "public read-write" on vendors          for all using (true) with check (true);
create policy "public read-write" on journal_entries  for all using (true) with check (true);
