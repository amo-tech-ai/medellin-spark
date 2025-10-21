-- =============================================
-- 🚨 CRITICAL SECURITY FIX - RUN IMMEDIATELY
-- =============================================
-- This script re-enables Row Level Security (RLS)
-- Currently RLS is DISABLED - this is a security risk!
--
-- HOW TO RUN:
-- 1. Open Supabase Dashboard: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk
-- 2. Go to SQL Editor
-- 3. Paste this entire script
-- 4. Click "Run"
-- 5. Verify by running scripts/check-public-presentations.cjs
-- =============================================

-- Re-enable RLS on all presentation tables
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE presentation_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_presentations ENABLE ROW LEVEL SECURITY;

-- Drop temporary permissive policies on profiles
DROP POLICY IF EXISTS "profiles_select_all_temporary" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_anon_temporary" ON profiles;
DROP POLICY IF EXISTS "profiles_update_anon_temporary" ON profiles;

-- Restore normal profile policies
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

-- Update table comments to reflect security status
COMMENT ON TABLE presentations IS 'User presentations with content, theme, and metadata - RLS ENABLED';
COMMENT ON TABLE presentation_templates IS 'Pre-built presentation templates - RLS ENABLED';
COMMENT ON TABLE custom_themes IS 'User-created custom themes - RLS ENABLED';
COMMENT ON TABLE generated_images IS 'AI-generated images - RLS ENABLED';
COMMENT ON TABLE favorite_presentations IS 'User favorites - RLS ENABLED';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅  RLS SECURITY FIX APPLIED';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'RLS RE-ENABLED on 5 tables';
  RAISE NOTICE 'Profile policies restored';
  RAISE NOTICE 'Database is now SECURE';
  RAISE NOTICE '========================================';
END $$;
