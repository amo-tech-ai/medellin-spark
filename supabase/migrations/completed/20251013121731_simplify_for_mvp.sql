-- =====================================================
-- Migration: Simplify Schema for MVP (Pitch Decks Only)
-- =====================================================
-- Description: Remove unused tables and columns, focus solely on startup pitch decks
-- Version: 1.0.0 (MVP)
-- Date: 2025-10-13
-- Author: Claude Code
--
-- CHANGES:
-- 1. Drop unused tables (favorites, images, themes)
-- 2. Rename base_documents → pitch_decks
-- 3. Rename presentations → pitch_deck_slides
-- 4. Remove unused columns (type enum, thumbnail_url)
-- 5. Add MVP-specific columns (company_name, industry)
-- 6. Simplify RLS policies for MVP
-- 7. Update helper functions
--
-- BEFORE: 5 tables, 10 document types, polymorphic pattern
-- AFTER:  2 tables, 1 document type (startup pitch decks)
--
-- =====================================================

-- =====================================================
-- PART 1: DROP UNUSED TABLES
-- =====================================================

-- Drop junction table for favorites (not needed for MVP)
drop table if exists favorite_documents cascade;

-- Drop image caching table (not needed for MVP)
drop table if exists generated_images cascade;

-- Drop custom themes table (use default theme for MVP)
drop table if exists custom_themes cascade;

-- =====================================================
-- PART 2: RENAME TABLES FOR CLARITY
-- =====================================================

-- Rename base_documents → pitch_decks (clearer naming)
alter table base_documents rename to pitch_decks;

-- Rename presentations → pitch_deck_slides (clearer naming)
alter table presentations rename to pitch_deck_slides;

-- =====================================================
-- PART 3: REMOVE UNUSED COLUMNS
-- =====================================================

-- Drop document type column (only pitch decks exist now)
alter table pitch_decks drop column if exists type;

-- Drop thumbnail_url (not needed for MVP)
alter table pitch_decks drop column if exists thumbnail_url;

-- Drop custom_theme_id (no themes table)
alter table pitch_deck_slides drop column if exists custom_theme_id;

-- Drop theme column (use default for MVP)
alter table pitch_deck_slides drop column if exists theme;

-- Drop image_source enum (not using images in MVP)
alter table pitch_deck_slides drop column if exists image_source;

-- Drop presentation_style (use default "professional")
alter table pitch_deck_slides drop column if exists presentation_style;

-- =====================================================
-- PART 4: ADD MVP-SPECIFIC COLUMNS
-- =====================================================

-- Add company name for pitch deck context
alter table pitch_decks add column if not exists company_name text;

-- Add industry for categorization
alter table pitch_decks add column if not exists industry text;

-- Add funding amount requested (useful for analytics)
alter table pitch_decks add column if not exists funding_amount numeric(12, 2);

-- Add pitch deck status (draft, final, archived)
create type pitch_deck_status as enum ('draft', 'final', 'archived');
alter table pitch_decks add column if not exists status pitch_deck_status not null default 'draft';

-- =====================================================
-- PART 5: UPDATE INDEXES
-- =====================================================

-- Drop old indexes referencing renamed columns
drop index if exists idx_base_documents_profile_id;
drop index if exists idx_base_documents_type;
drop index if exists idx_base_documents_is_public;
drop index if exists idx_base_documents_created_at;
drop index if exists idx_base_documents_updated_at;
drop index if exists idx_base_documents_profile_type_updated;
drop index if exists idx_base_documents_deleted_at;

drop index if exists idx_presentations_theme;
drop index if exists idx_presentations_language;
drop index if exists idx_presentations_custom_theme_id;
drop index if exists idx_presentations_presentation_style;

-- Create new indexes for pitch_decks
create index idx_pitch_decks_profile_id on pitch_decks(profile_id);
create index idx_pitch_decks_status on pitch_decks(status);
create index idx_pitch_decks_is_public on pitch_decks(is_public);
create index idx_pitch_decks_created_at on pitch_decks(created_at desc);
create index idx_pitch_decks_updated_at on pitch_decks(updated_at desc);
create index idx_pitch_decks_deleted_at on pitch_decks(deleted_at) where deleted_at is null;

-- Composite index for dashboard queries (user's decks by date)
create index idx_pitch_decks_profile_updated on pitch_decks(profile_id, updated_at desc);

-- Create new indexes for pitch_deck_slides
create index idx_pitch_deck_slides_language on pitch_deck_slides(language);
create index idx_pitch_deck_slides_created_at on pitch_deck_slides(created_at desc);

-- =====================================================
-- PART 6: UPDATE TRIGGERS
-- =====================================================

-- Drop old trigger functions
drop trigger if exists trigger_update_base_documents_updated_at on pitch_decks;
drop trigger if exists trigger_update_presentations_updated_at on pitch_deck_slides;
drop trigger if exists trigger_sync_base_document_updated_at on pitch_deck_slides;
drop trigger if exists trg_presentations_enforce_parent_type on pitch_deck_slides;

-- Recreate triggers with new names
create or replace function update_pitch_decks_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trigger_update_pitch_decks_updated_at
  before update on pitch_decks
  for each row
  execute function update_pitch_decks_updated_at();

create or replace function update_pitch_deck_slides_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trigger_update_pitch_deck_slides_updated_at
  before update on pitch_deck_slides
  for each row
  execute function update_pitch_deck_slides_updated_at();

-- Sync parent table when slides updated
create or replace function sync_pitch_deck_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.updated_at is distinct from new.updated_at then
    update pitch_decks
    set updated_at = new.updated_at
    where id = new.id;
  end if;
  return new;
end;
$$;

create trigger trigger_sync_pitch_deck_updated_at
  after update on pitch_deck_slides
  for each row
  execute function sync_pitch_deck_updated_at();

-- =====================================================
-- PART 7: UPDATE RLS POLICIES
-- =====================================================

-- Drop all existing policies (will recreate with new table names)
drop policy if exists "Users can view own documents" on pitch_decks;
drop policy if exists "Anyone can view public documents" on pitch_decks;
drop policy if exists "Users can insert own documents" on pitch_decks;
drop policy if exists "Users can update own documents" on pitch_decks;
drop policy if exists "Users can delete own documents" on pitch_decks;

drop policy if exists "Users can view own presentations" on pitch_deck_slides;
drop policy if exists "Anyone can view public presentations" on pitch_deck_slides;
drop policy if exists "Users can insert own presentations" on pitch_deck_slides;
drop policy if exists "Users can update own presentations" on pitch_deck_slides;
drop policy if exists "Users can delete own presentations" on pitch_deck_slides;

-- Pitch Decks Policies
create policy "Users can view own pitch decks"
  on pitch_decks for select
  to authenticated
  using (profile_id = current_profile_id());

create policy "Anyone can view public pitch decks"
  on pitch_decks for select
  to authenticated, anon
  using (is_public = true);

create policy "Users can insert own pitch decks"
  on pitch_decks for insert
  to authenticated
  with check (profile_id = current_profile_id());

create policy "Users can update own pitch decks"
  on pitch_decks for update
  to authenticated
  using (profile_id = current_profile_id())
  with check (profile_id = current_profile_id());

create policy "Users can delete own pitch decks"
  on pitch_decks for delete
  to authenticated
  using (profile_id = current_profile_id());

-- Pitch Deck Slides Policies
create policy "Users can view own pitch deck slides"
  on pitch_deck_slides for select
  to authenticated
  using (
    exists (
      select 1 from pitch_decks pd
      where pd.id = pitch_deck_slides.id
        and pd.profile_id = current_profile_id()
    )
  );

create policy "Anyone can view public pitch deck slides"
  on pitch_deck_slides for select
  to authenticated, anon
  using (
    exists (
      select 1 from pitch_decks pd
      where pd.id = pitch_deck_slides.id
        and pd.is_public = true
    )
  );

create policy "Users can insert own pitch deck slides"
  on pitch_deck_slides for insert
  to authenticated
  with check (
    exists (
      select 1 from pitch_decks pd
      where pd.id = pitch_deck_slides.id
        and pd.profile_id = current_profile_id()
    )
  );

create policy "Users can update own pitch deck slides"
  on pitch_deck_slides for update
  to authenticated
  using (
    exists (
      select 1 from pitch_decks pd
      where pd.id = pitch_deck_slides.id
        and pd.profile_id = current_profile_id()
    )
  )
  with check (
    exists (
      select 1 from pitch_decks pd
      where pd.id = pitch_deck_slides.id
        and pd.profile_id = current_profile_id()
    )
  );

create policy "Users can delete own pitch deck slides"
  on pitch_deck_slides for delete
  to authenticated
  using (
    exists (
      select 1 from pitch_decks pd
      where pd.id = pitch_deck_slides.id
        and pd.profile_id = current_profile_id()
    )
  );

-- =====================================================
-- PART 8: UPDATE HELPER FUNCTIONS
-- =====================================================

-- Drop old functions
drop function if exists get_user_presentation_count(uuid);
drop function if exists get_cached_image(uuid, text);
drop function if exists get_user_theme_usage(uuid);
drop function if exists enforce_presentation_parent_type();

-- Function to get user's pitch deck count
create or replace function get_user_pitch_deck_count(user_id uuid)
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*)
  from pitch_decks
  where profile_id = user_id
    and deleted_at is null;
$$;

comment on function get_user_pitch_deck_count is 'Returns total pitch decks for a user (excludes soft-deleted)';

-- Function to get user's recent pitch decks
create or replace function get_user_recent_pitch_decks(user_id uuid, deck_limit int default 10)
returns table(
  id uuid,
  title text,
  company_name text,
  industry text,
  status pitch_deck_status,
  created_at timestamptz,
  updated_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select
    id,
    title,
    company_name,
    industry,
    status,
    created_at,
    updated_at
  from pitch_decks
  where profile_id = user_id
    and deleted_at is null
  order by updated_at desc
  limit deck_limit;
$$;

comment on function get_user_recent_pitch_decks is 'Returns recent pitch decks for a user (default 10)';

-- Function to get pitch deck with slides
create or replace function get_pitch_deck_with_slides(deck_id uuid)
returns json
language sql
security definer
set search_path = public
as $$
  select json_build_object(
    'deck', row_to_json(pd.*),
    'slides', row_to_json(pds.*)
  )
  from pitch_decks pd
  left join pitch_deck_slides pds on pds.id = pd.id
  where pd.id = deck_id
    and pd.deleted_at is null;
$$;

comment on function get_pitch_deck_with_slides is 'Returns complete pitch deck with all slide data as JSON';

-- =====================================================
-- PART 9: DROP UNUSED ENUMS
-- =====================================================

-- Drop document_type enum (no longer needed)
drop type if exists document_type cascade;

-- Drop presentation_style enum (no longer needed)
drop type if exists presentation_style cascade;

-- Drop image_source enum (no longer needed)
drop type if exists image_source cascade;

-- Drop user_role enum (never used)
drop type if exists user_role cascade;

-- =====================================================
-- PART 10: ADD COMMENTS FOR DOCUMENTATION
-- =====================================================

comment on table pitch_decks is 'Startup pitch decks (MVP: single document type only)';
comment on column pitch_decks.company_name is 'Startup company name for this pitch deck';
comment on column pitch_decks.industry is 'Industry/sector (e.g., FinTech, HealthTech, EdTech)';
comment on column pitch_decks.funding_amount is 'Amount of funding requested in USD';
comment on column pitch_decks.status is 'Deck status: draft, final, or archived';
comment on column pitch_decks.is_public is 'If true, pitch deck is shareable via public URL';
comment on column pitch_decks.deleted_at is 'Soft delete timestamp (null = active)';

comment on table pitch_deck_slides is 'Slide content and metadata for pitch decks';
comment on column pitch_deck_slides.content is 'Complete slide structure as JSON (10 slides standard)';
comment on column pitch_deck_slides.outline is 'Array of slide titles in order';
comment on column pitch_deck_slides.prompt is 'Original user prompt/conversation that generated deck';
comment on column pitch_deck_slides.language is 'ISO language code (en-US, es, etc.)';
comment on column pitch_deck_slides.search_results is 'Web research data from Tavily API (if enabled)';

-- =====================================================
-- END OF MIGRATION
-- =====================================================
