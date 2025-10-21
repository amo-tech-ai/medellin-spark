-- =====================================================
-- Migration: Create Pitch Deck Tables with Correct Schema
-- =====================================================
-- Description: MVP-ready pitch deck schema with 1:N relationship
-- Version: 1.0.0 (Production Ready)
-- Date: 2025-10-13
-- Author: Claude Code
--
-- This migration creates:
-- 1. pitch_decks table (parent)
-- 2. pitch_deck_slides table (child with composite PK)
-- 3. All RLS policies
-- 4. Helper functions
-- 5. Proper indexes
-- =====================================================

-- =====================================================
-- PART 1: CREATE PITCH_DECKS TABLE
-- =====================================================

create table if not exists pitch_decks (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  company_name text,
  description text,
  target_audience text,
  key_message text,
  status text not null default 'draft' check (status in ('draft', 'generating', 'completed', 'error')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS on pitch_decks
alter table pitch_decks enable row level security;
alter table pitch_decks force row level security;

-- Create RLS policies for pitch_decks
create policy "Users can view own decks"
  on pitch_decks for select
  using (auth.uid() = profile_id);

create policy "Users can insert own decks"
  on pitch_decks for insert
  with check (auth.uid() = profile_id);

create policy "Users can update own decks"
  on pitch_decks for update
  using (auth.uid() = profile_id);

create policy "Users can delete own decks"
  on pitch_decks for delete
  using (auth.uid() = profile_id);

-- Create indexes for pitch_decks
create index if not exists idx_pitch_decks_profile_id on pitch_decks(profile_id);
create index if not exists idx_pitch_decks_status on pitch_decks(status);
create index if not exists idx_pitch_decks_created_at on pitch_decks(created_at desc);

-- =====================================================
-- PART 2: CREATE PITCH_DECK_SLIDES TABLE (1:N)
-- =====================================================

create table if not exists pitch_deck_slides (
  deck_id uuid not null references pitch_decks(id) on delete cascade,
  slide_no int not null check (slide_no > 0),
  title text,
  content jsonb not null default '{}',
  outline text[],
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (deck_id, slide_no)
);

-- Enable RLS on pitch_deck_slides
alter table pitch_deck_slides enable row level security;
alter table pitch_deck_slides force row level security;

-- Create RLS policies for pitch_deck_slides
create policy "Users can view own slides"
  on pitch_deck_slides for select
  using (
    exists (
      select 1 from pitch_decks
      where pitch_decks.id = pitch_deck_slides.deck_id
        and pitch_decks.profile_id = auth.uid()
    )
  );

create policy "Users can insert own slides"
  on pitch_deck_slides for insert
  with check (
    exists (
      select 1 from pitch_decks
      where pitch_decks.id = pitch_deck_slides.deck_id
        and pitch_decks.profile_id = auth.uid()
    )
  );

create policy "Users can update own slides"
  on pitch_deck_slides for update
  using (
    exists (
      select 1 from pitch_decks
      where pitch_decks.id = pitch_deck_slides.deck_id
        and pitch_decks.profile_id = auth.uid()
    )
  );

create policy "Users can delete own slides"
  on pitch_deck_slides for delete
  using (
    exists (
      select 1 from pitch_decks
      where pitch_decks.id = pitch_deck_slides.deck_id
        and pitch_decks.profile_id = auth.uid()
    )
  );

-- Public read policy for public decks (optional, for future)
create policy "Public select for pitch_deck_slides"
  on pitch_deck_slides for select
  using (
    exists (
      select 1 from pitch_decks
      where pitch_decks.id = pitch_deck_slides.deck_id
        and pitch_decks.status = 'completed'
    )
  );

-- Create indexes for pitch_deck_slides
create index if not exists idx_pds_deck_id on pitch_deck_slides(deck_id);
create index if not exists idx_pds_deck_id_slide_no on pitch_deck_slides(deck_id, slide_no);
create index if not exists idx_pds_deck_id_updated on pitch_deck_slides(deck_id, updated_at desc);

-- =====================================================
-- PART 3: PARENT SYNC TRIGGER
-- =====================================================

-- Function to sync parent updated_at when slides change
create or replace function sync_pitch_deck_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.updated_at is distinct from new.updated_at then
    update pitch_decks
    set updated_at = greatest(updated_at, new.updated_at)
    where id = new.deck_id;
  end if;
  return new;
end;
$$;

-- Create trigger
drop trigger if exists trigger_sync_pitch_deck_updated_at on pitch_deck_slides;
create trigger trigger_sync_pitch_deck_updated_at
  after update on pitch_deck_slides
  for each row
  execute function sync_pitch_deck_updated_at();

-- =====================================================
-- PART 4: HELPER FUNCTIONS
-- =====================================================

-- Function to get a deck with all its slides as JSON
create or replace function get_pitch_deck_with_slides(deck_uuid uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  result jsonb;
begin
  select jsonb_build_object(
    'id', pd.id,
    'profile_id', pd.profile_id,
    'title', pd.title,
    'company_name', pd.company_name,
    'description', pd.description,
    'target_audience', pd.target_audience,
    'key_message', pd.key_message,
    'status', pd.status,
    'created_at', pd.created_at,
    'updated_at', pd.updated_at,
    'slides', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'slide_no', pds.slide_no,
            'title', pds.title,
            'content', pds.content,
            'outline', pds.outline,
            'notes', pds.notes,
            'created_at', pds.created_at,
            'updated_at', pds.updated_at
          )
          order by pds.slide_no
        )
        from pitch_deck_slides pds
        where pds.deck_id = pd.id
      ),
      '[]'::jsonb
    )
  ) into result
  from pitch_decks pd
  where pd.id = deck_uuid;

  return result;
end;
$$;

-- Function to count slides for a deck
create or replace function count_deck_slides(deck_uuid uuid)
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*)
  from pitch_deck_slides
  where deck_id = deck_uuid;
$$;

-- Function to get user's deck count
create or replace function get_user_deck_count(user_uuid uuid)
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*)
  from pitch_decks
  where profile_id = user_uuid;
$$;

-- =====================================================
-- PART 5: UPDATED_AT TRIGGERS
-- =====================================================

-- Auto-update updated_at for pitch_decks
create or replace function update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists update_pitch_decks_updated_at on pitch_decks;
create trigger update_pitch_decks_updated_at
  before update on pitch_decks
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_pitch_deck_slides_updated_at on pitch_deck_slides;
create trigger update_pitch_deck_slides_updated_at
  before update on pitch_deck_slides
  for each row
  execute function update_updated_at_column();

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

-- Verify tables were created
do $$
begin
  if not exists (select 1 from pg_tables where schemaname = 'public' and tablename = 'pitch_decks') then
    raise exception 'pitch_decks table was not created';
  end if;

  if not exists (select 1 from pg_tables where schemaname = 'public' and tablename = 'pitch_deck_slides') then
    raise exception 'pitch_deck_slides table was not created';
  end if;

  raise notice 'Migration completed successfully!';
  raise notice '✓ pitch_decks table created';
  raise notice '✓ pitch_deck_slides table created';
  raise notice '✓ RLS enabled on both tables';
  raise notice '✓ All policies created';
  raise notice '✓ Helper functions created';
  raise notice '✓ Indexes created';
end $$;
