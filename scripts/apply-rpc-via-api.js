#!/usr/bin/env node
/**
 * Apply RPC Functions via Supabase REST API
 * Workaround for direct postgres connection issues
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('🚀 Applying RPC Functions to Supabase\n');

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create admin client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Read SQL from file
const sql = readFileSync('/tmp/apply_rpc_functions.sql', 'utf-8');

console.log('📄 SQL to execute:');
console.log('-'.repeat(60));
console.log(sql);
console.log('-'.repeat(60));

// Try to execute via SQL query (requires service role key)
async function applyViaSQL() {
  try {
    console.log('\n🔧 Method 1: Trying via Supabase SQL query...');
    
    // Split SQL into individual function definitions
    const functions = sql.split('CREATE OR REPLACE FUNCTION').filter(Boolean);
    
    for (let i = 0; i < functions.length; i++) {
      const funcSQL = 'CREATE OR REPLACE FUNCTION' + functions[i];
      console.log(`\n   Applying function ${i + 1}/${functions.length}...`);
      
      // Note: This requires service role key with proper permissions
      const { data, error } = await supabase.rpc('exec', {
        sql: funcSQL
      });
      
      if (error) {
        console.log(`   ⚠️  Error: ${error.message}`);
        return false;
      } else {
        console.log(`   ✅ Function ${i + 1} applied`);
      }
    }
    
    return true;
  } catch (err) {
    console.log(`   ❌ Exception: ${err.message}`);
    return false;
  }
}

// Verify functions exist
async function verifyFunctions() {
  console.log('\n🔍 Verifying RPC functions...\n');
  
  // Test duplicate_presentation
  try {
    const { error } = await supabase.rpc('duplicate_presentation', {
      source_id: '00000000-0000-0000-0000-000000000000'
    });
    
    if (error) {
      if (error.message.includes('does not exist')) {
        console.log('   ❌ duplicate_presentation: NOT FOUND');
        return false;
      } else {
        console.log('   ✅ duplicate_presentation: EXISTS');
      }
    } else {
      console.log('   ✅ duplicate_presentation: EXISTS');
    }
  } catch (err) {
    console.log('   ❌ duplicate_presentation: ERROR -', err.message);
    return false;
  }
  
  // Test soft_delete_presentation
  try {
    const { error } = await supabase.rpc('soft_delete_presentation', {
      presentation_id: '00000000-0000-0000-0000-000000000000'
    });
    
    if (error) {
      if (error.message.includes('does not exist')) {
        console.log('   ❌ soft_delete_presentation: NOT FOUND');
        return false;
      } else {
        console.log('   ✅ soft_delete_presentation: EXISTS');
      }
    } else {
      console.log('   ✅ soft_delete_presentation: EXISTS');
    }
  } catch (err) {
    console.log('   ❌ soft_delete_presentation: ERROR -', err.message);
    return false;
  }
  
  return true;
}

// Main execution
async function main() {
  // First verify if functions already exist
  const alreadyExists = await verifyFunctions();
  
  if (alreadyExists) {
    console.log('\n✅ RPC functions already exist! Nothing to do.\n');
    return;
  }
  
  // Try to apply via SQL
  const success = await applyViaSQL();
  
  if (success) {
    console.log('\n✅ Successfully applied RPC functions!\n');
    await verifyFunctions();
  } else {
    console.log('\n⚠️  Could not apply via API.');
    console.log('\n📋 Manual Steps Required:');
    console.log('   1. Open Supabase Dashboard: https://supabase.com/dashboard');
    console.log('   2. Go to SQL Editor → New Query');
    console.log('   3. Copy the SQL from: /tmp/apply_rpc_functions.sql');
    console.log('   4. Paste and execute in the SQL editor');
    console.log('   5. Run this script again to verify\n');
  }
}

main().catch(console.error);

