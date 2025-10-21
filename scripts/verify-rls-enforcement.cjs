#!/usr/bin/env node
/**
 * Verify RLS is Actually Enforced
 * Tests by trying to access presentations with anon key (should be blocked by RLS)
 */

require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !anonKey) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, anonKey);

async function testRLSEnforcement() {
  console.log('🔐 Testing RLS Enforcement');
  console.log('==============================================\n');
  console.log('Testing with ANON key (not authenticated)...\n');

  // Test 1: Try to read all presentations (should return empty or error)
  console.log('Test 1: Reading presentations without auth');
  const { data, error } = await supabase
    .from('presentations')
    .select('id, title, profile_id')
    .limit(10);

  if (error) {
    if (error.code === '42501') {
      console.log('✅ RLS IS ENABLED: Permission denied (expected)');
    } else {
      console.log(`⚠️  Got error: ${error.message} (code: ${error.code})`);
    }
  } else {
    if (data.length === 0) {
      console.log('✅ RLS IS WORKING: No data returned without auth (expected)');
    } else {
      console.log(`⚠️  RLS MAY NOT BE WORKING: Got ${data.length} presentations without auth`);
      console.log('   This could mean:');
      console.log('   - Some presentations are marked as public (is_public=true)');
      console.log('   - RLS policies allow anonymous access to public presentations');
      console.log('\n   Checking if presentations are public...');
      data.forEach(p => {
        console.log(`   - ${p.title} (id: ${p.id})`);
      });
    }
  }

  // Test 2: Try to insert without auth (should fail)
  console.log('\nTest 2: Trying to insert presentation without auth');
  const { error: insertError } = await supabase
    .from('presentations')
    .insert({
      profile_id: '00000000-0000-0000-0000-000000000000',
      title: 'Unauthorized Test',
      content: {}
    });

  if (insertError) {
    console.log('✅ RLS IS ENABLED: Insert blocked (expected)');
    console.log(`   Error: ${insertError.message}`);
  } else {
    console.log('❌ RLS IS NOT WORKING: Insert succeeded without auth!');
  }

  console.log('\n==============================================');
  console.log('🎯 CONCLUSION:');
  
  if (error && error.code === '42501') {
    console.log('   ✅ RLS IS PROPERLY ENABLED AND ENFORCED');
    console.log('   ✅ The security issue is FIXED');
  } else if (insertError) {
    console.log('   ✅ RLS IS ENABLED (prevents unauthorized writes)');
    console.log('   ⚠️  Some public presentations may be readable (check is_public column)');
  } else {
    console.log('   ❌ RLS MAY NOT BE PROPERLY CONFIGURED');
    console.log('   🚨 SECURITY RISK: Unauthorized access possible');
  }
  
  console.log('==============================================');
}

testRLSEnforcement().catch(console.error);
