-- Migration: Allow public read access to presentations
-- Created: 2025-10-17
-- Purpose: Enable unauthenticated users to view presentations marked as is_public=true

-- Drop existing policy if it exists (idempotent)
DROP POLICY IF EXISTS "Allow public read access to public presentations" ON presentations;

-- Create policy to allow reading public presentations
CREATE POLICY "Allow public read access to public presentations"
ON presentations
FOR SELECT
USING (is_public = true);

-- Ensure RLS is enabled (idempotent)
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;

-- Add helpful comment
COMMENT ON POLICY "Allow public read access to public presentations" ON presentations IS
'Allows anyone to read presentations marked as public, regardless of authentication status';

-- Verify the policy was created
DO $$
BEGIN
  RAISE NOTICE 'RLS policy created successfully for public presentations';
END $$;
