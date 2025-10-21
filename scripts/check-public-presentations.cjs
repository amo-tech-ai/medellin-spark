#!/usr/bin/env node
/**
 * Check if presentations that are readable are actually marked as public
 */

require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, anonKey);

async function checkPublicStatus() {
  console.log('🔍 Checking Public Status of Readable Presentations');
  console.log('==============================================\n');

  const { data, error } = await supabase
    .from('presentations')
    .select('id, title, is_public, profile_id')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log(`Found ${data.length} readable presentations:\n`);
  
  const publicCount = data.filter(p => p.is_public).length;
  const privateCount = data.filter(p => !p.is_public).length;
  
  data.forEach(p => {
    const status = p.is_public ? '🌍 PUBLIC' : '🔒 PRIVATE';
    console.log(`${status} - ${p.title}`);
    console.log(`   ID: ${p.id}, Profile: ${p.profile_id}\n`);
  });

  console.log('==============================================');
  console.log('📊 SUMMARY:');
  console.log(`   🌍 Public presentations: ${publicCount}`);
  console.log(`   🔒 Private presentations: ${privateCount}`);
  
  if (privateCount > 0) {
    console.log('\n❌ SECURITY ISSUE: Private presentations are readable!');
    console.log('   RLS is NOT properly enforced');
  } else {
    console.log('\n✅ RLS IS WORKING CORRECTLY');
    console.log('   Only public presentations are readable without auth');
    console.log('   This is the EXPECTED behavior per the RLS policy:');
    console.log('   "Users can view own presentations or public ones"');
  }
  console.log('==============================================');
}

checkPublicStatus().catch(console.error);
