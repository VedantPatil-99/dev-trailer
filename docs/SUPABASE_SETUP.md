# Supabase setup for DevTrailer

Use this when you want **persistent projects** and **saved trailer data** (so opening or reloading a project does not regenerate the video).

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. In **Project Settings → API**, copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Publishable key** (Supabase may show `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` or **anon public**) → use as below
3. Add both to `.env.local`.

## 2. Create the `projects` table

In Supabase **SQL Editor**, run:

```sql
-- Projects table (one row per video project)
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  repo_url text not null default '',
  live_url text,
  description text default '',
  duration text default '60',
  status text not null default 'processing' check (status in ('processing', 'completed', 'failed')),
  script text,
  trailer_data jsonb,
  video_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for listing by user
create index if not exists projects_user_id_idx on public.projects(user_id);
create index if not exists projects_created_at_idx on public.projects(created_at desc);

-- RLS: users can only read/write their own projects
alter table public.projects enable row level security;

create policy "Users can read own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can insert own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update own projects"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "Users can delete own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- Optional: keep updated_at in sync
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();
```

## 3. Storage bucket (optional, for exported video files)

1. In Supabase go to **Storage** and create a bucket named **`videos`**.
2. Set it to **Public** (or configure RLS if you prefer private).
3. The app uses this bucket when you upload an exported video via the upload API.

## 4. Environment variables

In `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJhbGc...
```

(Or `NEXT_PUBLIC_SUPABASE_ANON_KEY` if your dashboard still shows that name.)

After this, the app will:

- Persist projects in Supabase (per user).
- Save generated trailer data when a video is ready, so opening or reloading the project **does not** regenerate the video.

## 5. Auth

Sign up / sign in is handled by Supabase Auth (email/password). The middleware protects `/dashboard` when Supabase is configured; unauthenticated users are redirected to `/auth/login`.

## Summary checklist

- [ ] Supabase project created
- [ ] `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
- [ ] `projects` table created (SQL above) with RLS
- [ ] (Optional) Storage bucket `videos` created and public
