-- =============================================
-- REVERT TEMPORARY AUTH BYPASS
-- =============================================
-- This migration reverts the temporary auth bypass
-- and restores normal authentication security
--
-- Created: October 14, 2025
-- Reverts: 20251014200000_temporary_auth_bypass.sql
-- =============================================

-- =============================================
-- RE-ENABLE RLS ON PRESENTATION TABLES
-- =============================================

-- Re-enable RLS (restores security)
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE presentation_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_presentations ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RESTORE NORMAL PROFILE POLICIES
-- =============================================

-- Drop temporary permissive policies
DROP POLICY IF EXISTS "profiles_select_all_temporary" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_anon_temporary" ON profiles;
DROP POLICY IF EXISTS "profiles_update_anon_temporary" ON profiles;

-- Drop normal policies (for idempotency)
DROP POLICY IF EXISTS "profiles_select_public" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;

-- Restore original policies
CREATE POLICY "profiles_select_public"
  ON profiles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- =============================================
-- RESTORE TABLE COMMENTS
-- =============================================

COMMENT ON TABLE presentations IS 'User presentations with content, theme, and metadata';
COMMENT ON TABLE presentation_templates IS 'Pre-built presentation templates for users to start with';
COMMENT ON TABLE custom_themes IS 'User-created custom themes for presentations';
COMMENT ON TABLE generated_images IS 'AI-generated images for presentations';
COMMENT ON TABLE favorite_presentations IS 'User favorites/bookmarks for presentations';

-- =============================================
-- SUMMARY
-- =============================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅  AUTHENTICATION SECURITY RESTORED  ✅';
  RAISE NOTICE '========================================';
  RAISE NOTICE '';
  RAISE NOTICE 'RLS RE-ENABLED on:';
  RAISE NOTICE '  - presentations';
  RAISE NOTICE '  - presentation_templates';
  RAISE NOTICE '  - custom_themes';
  RAISE NOTICE '  - generated_images';
  RAISE NOTICE '  - favorite_presentations';
  RAISE NOTICE '';
  RAISE NOTICE 'Profiles: Normal auth policies restored';
  RAISE NOTICE '';
  RAISE NOTICE '✅  Security: ENABLED';
  RAISE NOTICE '✅  Authentication: REQUIRED';
  RAISE NOTICE '✅  Safe for production';
  RAISE NOTICE '========================================';
END $$;
