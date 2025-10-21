-- Add Performance Indexes
-- Issue: Query performance tests failing (6321ms vs <1000ms expected)
-- Test Failures:
--   - "presentation query should respond quickly"
--   - "should handle complex queries efficiently"
--
-- Created: October 19, 2025
-- Priority: HIGH (Performance Optimization)

-- 1. Add index on profile_id for user-specific queries
-- Most common query pattern: WHERE profile_id = auth.uid()
CREATE INDEX IF NOT EXISTS idx_presentations_profile_id
ON presentations(profile_id);

-- 2. Add index on is_public for public presentation queries
-- Used in: WHERE is_public = true
CREATE INDEX IF NOT EXISTS idx_presentations_is_public
ON presentations(is_public);

-- 3. Add composite index for public + created_at (most recent public presentations)
-- Used in: WHERE is_public = true ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_presentations_public_created
ON presentations(is_public, created_at DESC)
WHERE is_public = true;

-- 4. Add index on status for filtering by presentation state
-- Used in: WHERE status = 'published'
CREATE INDEX IF NOT EXISTS idx_presentations_status
ON presentations(status);

-- 5. Add composite index for user's presentations ordered by creation
-- Used in: WHERE profile_id = X ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_presentations_profile_created
ON presentations(profile_id, created_at DESC);

-- 6. Add index on pitch_conversations for faster lookups
CREATE INDEX IF NOT EXISTS idx_pitch_conversations_profile_id
ON pitch_conversations(profile_id);

CREATE INDEX IF NOT EXISTS idx_pitch_conversations_completeness
ON pitch_conversations(completeness)
WHERE completeness >= 80;  -- For finding ready-to-generate conversations

-- 7. Add index on generated_images (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'generated_images') THEN
    CREATE INDEX IF NOT EXISTS idx_generated_images_presentation_id
    ON generated_images(presentation_id);

    CREATE INDEX IF NOT EXISTS idx_generated_images_profile_id
    ON generated_images(profile_id);
  END IF;
END $$;

-- 8. Analyze tables to update statistics for query planner
ANALYZE presentations;
ANALYZE pitch_conversations;

-- 9. Add comments explaining index usage
COMMENT ON INDEX idx_presentations_profile_id IS 'Speeds up user-specific presentation queries';
COMMENT ON INDEX idx_presentations_is_public IS 'Speeds up public presentation filtering';
COMMENT ON INDEX idx_presentations_public_created IS 'Optimizes recent public presentations query';
COMMENT ON INDEX idx_presentations_status IS 'Speeds up status-based filtering';
COMMENT ON INDEX idx_presentations_profile_created IS 'Optimizes user timeline queries';

-- Expected Performance Improvements:
--   - User's presentations query: 6321ms → <500ms (12x faster)
--   - Public presentations query: 5221ms → <1000ms (5x faster)
--   - Complex filtered queries: 3000ms → <1000ms (3x faster)

-- Verification Queries (run manually to verify performance):
--
-- Test 1: User's presentations (should be <500ms)
-- EXPLAIN ANALYZE
-- SELECT * FROM presentations
-- WHERE profile_id = '00000000-0000-0000-0000-000000000000'
-- ORDER BY created_at DESC
-- LIMIT 10;
--
-- Test 2: Public presentations (should be <1000ms)
-- EXPLAIN ANALYZE
-- SELECT * FROM presentations
-- WHERE is_public = true
-- ORDER BY created_at DESC
-- LIMIT 10;
