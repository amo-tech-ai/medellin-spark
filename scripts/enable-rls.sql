-- =============================================
-- ENABLE RLS - IDEMPOTENT SCRIPT
-- =============================================

-- Enable RLS on all tables
ALTER TABLE IF EXISTS presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS presentation_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS custom_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS generated_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS favorite_presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;

-- Drop temporary policies
DROP POLICY IF EXISTS "profiles_select_all_temporary" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_anon_temporary" ON profiles;
DROP POLICY IF EXISTS "profiles_update_anon_temporary" ON profiles;

-- Verify
SELECT
  tablename,
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_class WHERE relname = tablename AND relrowsecurity = true
  ) THEN '✅ ENABLED' ELSE '❌ DISABLED' END as rls_status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('presentations', 'presentation_templates', 'custom_themes', 'generated_images', 'favorite_presentations', 'profiles')
ORDER BY tablename;
