// Apply RPC Functions to Supabase
// Run with: node apply-rpc-functions.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // Need service role for DDL

console.log('='.repeat(60));
console.log('APPLYING RPC FUNCTIONS TO SUPABASE');
console.log('='.repeat(60));

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.log('\n❌ ERROR: Missing SUPABASE_SERVICE_ROLE_KEY in .env');
  console.log('   This key is required to create database functions');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Read the migration file
const migrationSQL = readFileSync('./supabase/migrations/20251013150000_add_presentations_metadata.sql', 'utf8');

// Extract just the RPC functions
const functions = `
-- Function to soft delete a presentation
CREATE OR REPLACE FUNCTION soft_delete_presentation(presentation_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  result BOOLEAN;
BEGIN
  UPDATE presentations
  SET deleted_at = NOW(),
      updated_at = NOW()
  WHERE id = presentation_id
    AND profile_id = auth.uid()
    AND deleted_at IS NULL;

  GET DIAGNOSTICS result = ROW_COUNT;
  RETURN result > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to duplicate a presentation
CREATE OR REPLACE FUNCTION duplicate_presentation(source_id UUID)
RETURNS UUID AS $$
DECLARE
  new_id UUID;
  source_presentation presentations%ROWTYPE;
BEGIN
  -- Get source presentation
  SELECT * INTO source_presentation
  FROM presentations
  WHERE id = source_id
    AND profile_id = auth.uid()
    AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Presentation not found or access denied';
  END IF;

  -- Create duplicate
  INSERT INTO presentations (
    profile_id,
    title,
    description,
    content,
    theme,
    image_source,
    presentation_style,
    language,
    outline,
    custom_theme_id,
    status,
    slide_count
  ) VALUES (
    auth.uid(),
    source_presentation.title || ' (Copy)',
    source_presentation.description,
    source_presentation.content,
    source_presentation.theme,
    source_presentation.image_source,
    source_presentation.presentation_style,
    source_presentation.language,
    source_presentation.outline,
    source_presentation.custom_theme_id,
    'draft',
    source_presentation.slide_count
  )
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
`;

console.log('\n1. Applying RPC Functions...\n');
console.log(functions);

// Note: Supabase JS client doesn't support raw DDL execution
// We need to use the SQL API endpoint directly
console.log('\n⚠️  IMPORTANT: Supabase JS client cannot execute DDL statements.');
console.log('   You need to apply these functions via Supabase Dashboard:');
console.log('');
console.log('   1. Go to: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk');
console.log('   2. Navigate to: SQL Editor');
console.log('   3. Copy the migration file content');
console.log('   4. Paste and run in SQL Editor');
console.log('');
console.log('   Or use Supabase CLI:');
console.log('   $ supabase db push');
console.log('');
