#!/usr/bin/env node

/**
 * Fix test presentation to use standardized dev UUID
 * Run: node scripts/fix-test-presentation-profile.js
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://dhesktsqhcxhqfjypulk.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY environment variable required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const TEST_PRESENTATION_ID = 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81';
const DEV_PROFILE_ID = '00000000-0000-0000-0000-000000000000';

async function fixProfile() {
  console.log('🔄 Updating test presentation profile_id...');
  console.log(`Presentation ID: ${TEST_PRESENTATION_ID}`);
  console.log(`New Profile ID: ${DEV_PROFILE_ID}`);

  const { data, error } = await supabase
    .from('presentations')
    .update({ profile_id: DEV_PROFILE_ID })
    .eq('id', TEST_PRESENTATION_ID)
    .select();

  if (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.error('⚠️  Presentation not found');
    process.exit(1);
  }

  console.log('✅ Success! Profile ID updated:');
  console.log(`   Title: ${data[0].title}`);
  console.log(`   Profile ID: ${data[0].profile_id}`);
  console.log(`   Is Public: ${data[0].is_public}`);
}

fixProfile();
