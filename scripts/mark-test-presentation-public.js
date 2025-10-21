#!/usr/bin/env node

/**
 * Mark test presentation as public
 * Run: node scripts/mark-test-presentation-public.js
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://dhesktsqhcxhqfjypulk.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY environment variable required');
  console.log('Set it in your .env file or run:');
  console.log('SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/mark-test-presentation-public.js');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const TEST_PRESENTATION_ID = 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81';

async function markPublic() {
  console.log('🔄 Marking test presentation as public...');
  console.log(`ID: ${TEST_PRESENTATION_ID}`);

  const { data, error } = await supabase
    .from('presentations')
    .update({ is_public: true })
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

  console.log('✅ Success! Presentation marked as public:');
  console.log(`   Title: ${data[0].title}`);
  console.log(`   Profile ID: ${data[0].profile_id}`);
  console.log(`   Is Public: ${data[0].is_public}`);
  console.log(`   Slide Count: ${data[0].slide_count}`);
}

markPublic();
