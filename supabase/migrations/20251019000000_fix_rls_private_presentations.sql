-- Fix RLS Policy for Private Presentations
-- Issue: Private presentations are being exposed to unauthenticated users
-- Test Failure: "should not expose private presentations without auth" - returns 9 instead of 0
--
-- Created: October 19, 2025
-- Priority: CRITICAL SECURITY FIX

-- 1. Ensure RLS is enabled on presentations table
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing SELECT policies that may be too permissive
DROP POLICY IF EXISTS "Public presentations are viewable by everyone" ON presentations;
DROP POLICY IF EXISTS "Allow public read access" ON presentations;
DROP POLICY IF EXISTS "Enable read access for all users" ON presentations;

-- 3. Create strict policy for SELECT operations
-- RULE: Only allow SELECT if:
--   a) Presentation is public (is_public = true), OR
--   b) User is authenticated AND owns the presentation (profile_id matches auth.uid())
CREATE POLICY "Strict read access for presentations"
ON presentations
FOR SELECT
USING (
  is_public = true
  OR
  (auth.uid() IS NOT NULL AND profile_id = auth.uid())
);

-- 4. Verify existing policies for INSERT/UPDATE/DELETE are secure
-- These should only allow authenticated users to modify their own data

-- INSERT: Users can only create presentations for themselves
DROP POLICY IF EXISTS "Users can insert their own presentations" ON presentations;
CREATE POLICY "Users can insert their own presentations"
ON presentations
FOR INSERT
WITH CHECK (auth.uid() = profile_id);

-- UPDATE: Users can only update their own presentations
DROP POLICY IF EXISTS "Users can update their own presentations" ON presentations;
CREATE POLICY "Users can update their own presentations"
ON presentations
FOR UPDATE
USING (auth.uid() = profile_id)
WITH CHECK (auth.uid() = profile_id);

-- DELETE: Users can only delete their own presentations
DROP POLICY IF EXISTS "Users can delete their own presentations" ON presentations;
CREATE POLICY "Users can delete their own presentations"
ON presentations
FOR DELETE
USING (auth.uid() = profile_id);

-- 5. Add comment explaining the security model
COMMENT ON TABLE presentations IS 'Presentations table with RLS enabled. Public presentations (is_public=true) are visible to everyone. Private presentations require authentication and ownership.';

-- 6. Verify RLS is working by testing with psql (manual verification)
-- Test 1: Public presentation should be visible
-- SELECT id, title, is_public FROM presentations WHERE is_public = true LIMIT 1;
-- Expected: Returns d4a27c1c-8b2d-48a9-99c9-2298037e9e81

-- Test 2: Private presentations should be hidden when not authenticated
-- SET ROLE anon;  -- Simulate unauthenticated user
-- SELECT COUNT(*) FROM presentations WHERE is_public = false;
-- Expected: 0 (should return 0 because RLS blocks access)

-- Test 3: Private presentations should be visible to owner
-- (Requires setting auth.uid() to a valid user ID - done via JWT in real app)

NOTIFY pgrst, 'reload schema';
