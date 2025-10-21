-- =============================================
-- FIX DATABASE FUNCTION SECURITY - BEST PRACTICES
-- =============================================
-- Migration: 20251016200940_fix_function_security.sql
-- Created: October 16, 2025
-- Priority: HIGH - Security improvements
--
-- This migration updates all database functions to follow Supabase best practices:
-- 1. Change SECURITY DEFINER to SECURITY INVOKER (safer default)
-- 2. Add search_path = '' to prevent schema confusion attacks
-- 3. Use fully qualified table names (schema.table)
-- 4. Add volatility declarations (STABLE, IMMUTABLE, VOLATILE)
--
-- Affected Functions:
-- - get_my_presentations_stats
-- - soft_delete_presentation
-- - duplicate_presentation
-- - update_presentation_last_edited
-- - update_presentation_updated_at
--
-- Reference: .cursor/rules/create-db-functions.mdc
-- =============================================

-- =============================================
-- FUNCTION 1: get_my_presentations_stats
-- =============================================
-- Gets statistics about user's presentations
-- Changed: SECURITY DEFINER → INVOKER, added search_path, fully qualified names

drop function if exists public.get_my_presentations_stats(uuid);

create or replace function public.get_my_presentations_stats(user_profile_id uuid)
returns table (
  total_count bigint,
  draft_count bigint,
  complete_count bigint,
  shared_count bigint,
  last_edited timestamptz
)
language plpgsql
security invoker  -- ✅ Changed from DEFINER
set search_path = ''  -- ✅ Added for security
stable  -- ✅ Added: Function doesn't modify data
as $$
begin
  return query
  select
    count(*) filter (where deleted_at is null) as total_count,
    count(*) filter (where deleted_at is null and (status = 'draft' or status = 'generating')) as draft_count,
    count(*) filter (where deleted_at is null and (status = 'complete' or status = 'completed')) as complete_count,
    count(*) filter (where deleted_at is null and status = 'shared') as shared_count,
    max(last_edited_at) as last_edited
  from public.presentations  -- ✅ Fully qualified
  where profile_id = get_my_presentations_stats.user_profile_id  -- ✅ Fully qualified param
    and deleted_at is null;
end;
$$;

comment on function public.get_my_presentations_stats(uuid) is 
  'Returns presentation statistics for a specific user. Runs with invoker permissions and uses stable function optimization.';

-- =============================================
-- FUNCTION 2: soft_delete_presentation
-- =============================================
-- Marks a presentation as deleted (soft delete)
-- Changed: SECURITY DEFINER → INVOKER, added search_path, fully qualified names

drop function if exists public.soft_delete_presentation(uuid);

create or replace function public.soft_delete_presentation(presentation_id uuid)
returns boolean
language plpgsql
security invoker  -- ✅ Changed from DEFINER
set search_path = ''  -- ✅ Added for security
volatile  -- ✅ Added: Function modifies data
as $$
begin
  update public.presentations  -- ✅ Fully qualified
  set 
    deleted_at = now(),
    updated_at = now()
  where id = soft_delete_presentation.presentation_id
    and profile_id = auth.uid();  -- ✅ Security check
  
  -- Return true if row was updated
  return found;
end;
$$;

comment on function public.soft_delete_presentation(uuid) is 
  'Soft deletes a presentation by setting deleted_at timestamp. Only the owner can delete their presentations.';

-- =============================================
-- FUNCTION 3: duplicate_presentation
-- =============================================
-- Creates a copy of an existing presentation
-- Changed: SECURITY DEFINER → INVOKER, added search_path, fully qualified names

drop function if exists public.duplicate_presentation(uuid);

create or replace function public.duplicate_presentation(source_id uuid)
returns uuid
language plpgsql
security invoker  -- ✅ Changed from DEFINER
set search_path = ''  -- ✅ Added for security
volatile  -- ✅ Added: Function modifies data
as $$
declare
  new_id uuid;
  source_row record;
begin
  -- Get source presentation (must belong to current user)
  select * into source_row
  from public.presentations  -- ✅ Fully qualified
  where id = duplicate_presentation.source_id
    and profile_id = auth.uid()
    and deleted_at is null;
  
  if not found then
    raise exception 'Presentation not found or access denied';
  end if;
  
  -- Create duplicate
  insert into public.presentations (  -- ✅ Fully qualified
    profile_id,
    title,
    description,
    content,
    theme,
    status,
    template_id,
    category,
    cover_image_url,
    slide_count
  ) values (
    auth.uid(),
    source_row.title || ' (Copy)',
    source_row.description,
    source_row.content,
    source_row.theme,
    'draft',
    source_row.template_id,
    source_row.category,
    source_row.cover_image_url,
    source_row.slide_count
  )
  returning id into new_id;
  
  return new_id;
end;
$$;

comment on function public.duplicate_presentation(uuid) is 
  'Creates a duplicate of an existing presentation. Only the owner can duplicate their presentations.';

-- =============================================
-- FUNCTION 4: update_presentation_last_edited
-- =============================================
-- Trigger function to update last_edited_at timestamp
-- Changed: added search_path, fully qualified names

drop function if exists public.update_presentation_last_edited() cascade;

create or replace function public.update_presentation_last_edited()
returns trigger
language plpgsql
security invoker  -- ✅ Explicit (triggers default to invoker)
set search_path = ''  -- ✅ Added for security
as $$
begin
  -- Update last_edited_at on any column change except updated_at
  if (old is distinct from new) and (old.updated_at = new.updated_at or old.updated_at is null) then
    new.last_edited_at := now();
  end if;
  return new;
end;
$$;

comment on function public.update_presentation_last_edited() is 
  'Trigger function that automatically updates last_edited_at timestamp when presentation is modified.';

-- Recreate trigger (dropped by CASCADE)
drop trigger if exists update_presentations_last_edited_trigger on public.presentations;

create trigger update_presentations_last_edited_trigger
  before update on public.presentations
  for each row
  execute function public.update_presentation_last_edited();

-- =============================================
-- FUNCTION 5: update_presentation_updated_at
-- =============================================
-- Trigger function to update updated_at timestamp
-- Changed: added search_path, fully qualified names

drop function if exists public.update_presentation_updated_at() cascade;

create or replace function public.update_presentation_updated_at()
returns trigger
language plpgsql
security invoker  -- ✅ Explicit
set search_path = ''  -- ✅ Added for security
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

comment on function public.update_presentation_updated_at() is 
  'Trigger function that automatically updates updated_at timestamp on any modification.';

-- Recreate trigger for presentation_templates (dropped by CASCADE)
drop trigger if exists update_templates_updated_at on public.presentation_templates;

create trigger update_templates_updated_at
  before update on public.presentation_templates
  for each row
  execute function public.update_presentation_updated_at();

-- =============================================
-- VERIFICATION QUERY
-- =============================================
-- Run this to verify all functions are properly configured:
--
-- SELECT 
--   p.proname as function_name,
--   pg_get_function_arguments(p.oid) as arguments,
--   CASE p.prosecdef 
--     WHEN true THEN 'DEFINER' 
--     ELSE 'INVOKER' 
--   END as security,
--   CASE p.provolatile
--     WHEN 'i' THEN 'IMMUTABLE'
--     WHEN 's' THEN 'STABLE'
--     WHEN 'v' THEN 'VOLATILE'
--   END as volatility,
--   pg_get_function_identity_arguments(p.oid) as identity_args
-- FROM pg_proc p
-- JOIN pg_namespace n ON p.pronamespace = n.oid
-- WHERE n.nspname = 'public'
--   AND p.proname LIKE '%presentation%'
-- ORDER BY p.proname;

-- =============================================
-- MIGRATION COMPLETE
-- =============================================
-- All functions now follow Supabase best practices:
-- ✅ SECURITY INVOKER (safer default)
-- ✅ search_path = '' (prevents attacks)
-- ✅ Fully qualified table names
-- ✅ Volatility declarations
-- ✅ Comprehensive comments
--
-- Security improved: Functions now run with user permissions,
-- preventing privilege escalation attacks.
-- =============================================

