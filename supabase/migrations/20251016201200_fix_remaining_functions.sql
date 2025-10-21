-- =============================================
-- FIX REMAINING DATABASE FUNCTIONS - BEST PRACTICES
-- =============================================
-- Migration: 20251016201200_fix_remaining_functions.sql
-- Created: October 16, 2025
-- Priority: HIGH - Complete security improvements
--
-- This migration completes the function security fixes:
-- 1. get_presentations_with_favorites
-- 2. get_presentation_stats
--
-- Changes:
-- - SECURITY DEFINER → SECURITY INVOKER
-- - Add search_path = ''
-- - Use fully qualified table names
-- - Add volatility declarations
--
-- Reference: .cursor/rules/create-db-functions.mdc
-- =============================================

-- =============================================
-- FUNCTION 1: get_presentations_with_favorites
-- =============================================
-- Gets presentations with favorite status for a user
-- Changed: SECURITY DEFINER → INVOKER, added search_path, fully qualified names

drop function if exists public.get_presentations_with_favorites(uuid);

create or replace function public.get_presentations_with_favorites(user_id uuid)
returns table (
  id uuid,
  profile_id uuid,
  title text,
  content jsonb,
  theme text,
  thumbnail_url text,
  status text,
  is_public boolean,
  is_favorited boolean,
  created_at timestamptz,
  updated_at timestamptz
)
language plpgsql
security invoker  -- ✅ Changed from DEFINER
set search_path = ''  -- ✅ Added for security
stable  -- ✅ Added: Function doesn't modify data
as $$
begin
  return query
  select
    p.id,
    p.profile_id,
    p.title,
    p.content,
    p.theme,
    p.thumbnail_url,
    p.status,
    p.is_public,
    (fp.id is not null) as is_favorited,
    p.created_at,
    p.updated_at
  from public.presentations p  -- ✅ Fully qualified
  left join public.favorite_presentations fp  -- ✅ Fully qualified
    on fp.presentation_id = p.id
    and fp.profile_id = get_presentations_with_favorites.user_id  -- ✅ Fully qualified param
  where p.profile_id = get_presentations_with_favorites.user_id  -- ✅ Fully qualified param
    or p.is_public = true;
end;
$$;

comment on function public.get_presentations_with_favorites(uuid) is 
  'Returns presentations accessible to a user with their favorite status. Includes user''s own presentations and public ones.';

-- =============================================
-- FUNCTION 2: get_presentation_stats
-- =============================================
-- Gets presentation statistics for a user
-- Changed: SECURITY DEFINER → INVOKER, added search_path, fully qualified names

drop function if exists public.get_presentation_stats(uuid);

create or replace function public.get_presentation_stats(user_id uuid)
returns table (
  total_presentations bigint,
  draft_presentations bigint,
  completed_presentations bigint,
  public_presentations bigint,
  total_favorites bigint
)
language plpgsql
security invoker  -- ✅ Changed from DEFINER
set search_path = ''  -- ✅ Added for security
stable  -- ✅ Added: Function doesn't modify data
as $$
begin
  return query
  select
    count(*) filter (where profile_id = get_presentation_stats.user_id) as total_presentations,
    count(*) filter (where profile_id = get_presentation_stats.user_id and status = 'draft') as draft_presentations,
    count(*) filter (where profile_id = get_presentation_stats.user_id and status = 'completed') as completed_presentations,
    count(*) filter (where profile_id = get_presentation_stats.user_id and is_public = true) as public_presentations,
    (select count(*) from public.favorite_presentations where profile_id = get_presentation_stats.user_id) as total_favorites  -- ✅ Fully qualified
  from public.presentations;  -- ✅ Fully qualified
end;
$$;

comment on function public.get_presentation_stats(uuid) is 
  'Returns comprehensive statistics about a user''s presentations including counts by status and favorites.';

-- =============================================
-- MIGRATION COMPLETE
-- =============================================
-- All presentation-related functions now follow best practices:
-- ✅ SECURITY INVOKER (safer default)
-- ✅ search_path = '' (prevents attacks)
-- ✅ Fully qualified table names
-- ✅ Volatility declarations
-- ✅ Comprehensive comments
--
-- Total functions fixed: 7
-- - get_my_presentations_stats ✅
-- - soft_delete_presentation ✅
-- - duplicate_presentation ✅
-- - update_presentation_last_edited ✅
-- - update_presentation_updated_at ✅
-- - get_presentations_with_favorites ✅
-- - get_presentation_stats ✅
-- =============================================


