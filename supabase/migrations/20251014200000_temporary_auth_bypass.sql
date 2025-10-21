-- =============================================
-- TEMPORARY AUTH BYPASS - FOR DEVELOPMENT ONLY
-- =============================================
-- ⚠️ WARNING: This disables authentication security
-- ⚠️ ONLY use in development environment
-- ⚠️ REVERT before deploying to production
--
-- This migration temporarily bypasses auth requirements
-- to allow testing without provider errors
--
-- Created: October 14, 2025
-- To revert: Run 20251014200001_revert_auth_bypass.sql
-- =============================================

-- =============================================
-- DISABLE RLS ON PRESENTATION TABLES
-- =============================================

-- Temporarily disable RLS (can be re-enabled anytime)
ALTER TABLE presentations DISABLE ROW LEVEL SECURITY;
ALTER TABLE presentation_templates DISABLE ROW LEVEL SECURITY;
ALTER TABLE custom_themes DISABLE ROW LEVEL SECURITY;
ALTER TABLE generated_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_presentations DISABLE ROW LEVEL SECURITY;

-- =============================================
-- ALLOW ANON ACCESS TO PROFILES
-- =============================================

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "profiles_select_public" ON profiles;

-- Create permissive policy for all reads (no auth required)
CREATE POLICY "profiles_select_all_temporary"
  ON profiles FOR SELECT
  TO public
  USING (true);

-- Allow anon inserts (for testing profile creation)
CREATE POLICY "profiles_insert_anon_temporary"
  ON profiles FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anon updates (for testing profile updates)
CREATE POLICY "profiles_update_anon_temporary"
  ON profiles FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- =============================================
-- SUMMARY & WARNINGS
-- =============================================

DO $$
DECLARE
  disabled_tables TEXT[];
BEGIN
  -- Get list of disabled tables
  SELECT array_agg(tablename) INTO disabled_tables
  FROM pg_tables
  WHERE schemaname = 'public'
    AND tablename IN ('presentations', 'presentation_templates', 'custom_themes', 'generated_images', 'favorite_presentations')
    AND NOT EXISTS (
      SELECT 1 FROM pg_class
      WHERE relname = pg_tables.tablename
        AND relrowsecurity = true
    );

  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE '⚠️  TEMPORARY AUTH BYPASS ENABLED  ⚠️';
  RAISE NOTICE '========================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables with RLS DISABLED:';
  RAISE NOTICE '  - presentations';
  RAISE NOTICE '  - presentation_templates';
  RAISE NOTICE '  - custom_themes';
  RAISE NOTICE '  - generated_images';
  RAISE NOTICE '  - favorite_presentations';
  RAISE NOTICE '';
  RAISE NOTICE 'Profiles: ANON access enabled';
  RAISE NOTICE '';
  RAISE NOTICE '⚠️  SECURITY WARNING:';
  RAISE NOTICE '  - All users can access ALL data';
  RAISE NOTICE '  - No authentication required';
  RAISE NOTICE '  - DEVELOPMENT ONLY - DO NOT DEPLOY';
  RAISE NOTICE '';
  RAISE NOTICE 'To revert:';
  RAISE NOTICE '  Run: 20251014200001_revert_auth_bypass.sql';
  RAISE NOTICE '========================================';
END $$;

-- =============================================
-- COMMENTS (Documentation)
-- =============================================

COMMENT ON TABLE presentations IS 'RLS TEMPORARILY DISABLED - Auth bypass active';
COMMENT ON TABLE presentation_templates IS 'RLS TEMPORARILY DISABLED - Auth bypass active';
COMMENT ON TABLE custom_themes IS 'RLS TEMPORARILY DISABLED - Auth bypass active';
COMMENT ON TABLE generated_images IS 'RLS TEMPORARILY DISABLED - Auth bypass active';
COMMENT ON TABLE favorite_presentations IS 'RLS TEMPORARILY DISABLED - Auth bypass active';
