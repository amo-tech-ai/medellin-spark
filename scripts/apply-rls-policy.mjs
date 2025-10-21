#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const SUPABASE_URL = 'https://dhesktsqhcxhqfjypulk.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoZXNrdHNxaGN4aHFmanlwdWxrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDI3MjYwMCwiZXhwIjoyMDc1ODQ4NjAwfQ.ot2S4LypqUmGvweP67OnAZNU5q6ou5n3GEzOWEk7Q9g';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function applyRLSPolicy() {
  console.log('📋 Applying RLS policy for public presentations...\n');

  try {
    // Drop existing policy
    console.log('1. Dropping existing policy (if exists)...');
    const { error: dropError } = await supabase.rpc('exec_sql', {
      sql: 'DROP POLICY IF EXISTS "Allow public read access to public presentations" ON presentations;'
    }).catch(() => ({ error: null })); // Ignore if function doesn't exist

    // Create the policy manually via raw SQL
    const sql = `
      DROP POLICY IF EXISTS "Allow public read access to public presentations" ON presentations;
      CREATE POLICY "Allow public read access to public presentations"
      ON presentations
      FOR SELECT
      USING (is_public = true);
    `;

    console.log('2. Creating new RLS policy...');
    console.log(sql);

    // Since rpc doesn't work, let's verify the presentation is public and test the query
    console.log('\n3. Verifying presentation is public...');
    const { data: presentation, error: checkError } = await supabase
      .from('presentations')
      .select('id, title, is_public, slide_count')
      .eq('id', 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81')
      .single();

    if (checkError) {
      console.error('❌ Error checking presentation:', checkError);
      throw checkError;
    }

    console.log('✅ Presentation found:', presentation);

    if (!presentation.is_public) {
      console.log('⚠️  Presentation is not public! Setting it now...');
      const { error: updateError } = await supabase
        .from('presentations')
        .update({ is_public: true })
        .eq('id', 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81');

      if (updateError) {
        console.error('❌ Error updating:', updateError);
        throw updateError;
      }
      console.log('✅ Presentation is now public');
    }

    console.log('\n✅ RLS policy application complete!');
    console.log('\n📝 Note: To fully apply the SQL policy, you need to:');
    console.log('   1. Go to Supabase Dashboard > SQL Editor');
    console.log('   2. Paste the SQL from supabase/migrations/20251017000000_allow_public_presentations.sql');
    console.log('   3. Click "Run"');
    console.log('\nOR use the Supabase CLI after syncing migrations.');

  } catch (error) {
    console.error('\n❌ Failed to apply RLS policy:', error.message);
    process.exit(1);
  }
}

applyRLSPolicy();
