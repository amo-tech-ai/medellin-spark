#!/usr/bin/env node
/**
 * Apply Missing RPC Functions via Supabase Dashboard SQL Editor
 * This script generates the exact SQL needed and provides dashboard link
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const PROJECT_REF = 'dhesktsqhcxhqfjypulk';

console.log('🔍 Checking RPC Functions Status\n');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Test if functions exist
async function testFunctions() {
  console.log('1. Testing duplicate_presentation function...');
  const { data: d1, error: e1 } = await supabase.rpc('duplicate_presentation', {
    source_id: '00000000-0000-0000-0000-000000000000'
  });
  
  const func1Exists = !e1 || !e1.message.includes('does not exist');
  console.log(func1Exists ? '   ✅ EXISTS' : '   ❌ MISSING');
  
  console.log('\n2. Testing soft_delete_presentation function...');
  const { data: d2, error: e2 } = await supabase.rpc('soft_delete_presentation', {
    presentation_id: '00000000-0000-0000-0000-000000000000'
  });
  
  const func2Exists = !e2 || !e2.message.includes('does not exist');
  console.log(func2Exists ? '   ✅ EXISTS' : '   ❌ MISSING');
  
  return { func1Exists, func2Exists };
}

// Extract RPC functions from migration file
function extractRPCFunctions() {
  const migrationPath = 'supabase/migrations/20251013150000_add_presentations_metadata.sql';
  const sql = readFileSync(migrationPath, 'utf-8');
  
  // Extract the two RPC function definitions
  const softDeleteMatch = sql.match(/CREATE OR REPLACE FUNCTION soft_delete_presentation.*?\$\$ LANGUAGE plpgsql SECURITY DEFINER;/s);
  const duplicateMatch = sql.match(/CREATE OR REPLACE FUNCTION duplicate_presentation.*?\$\$ LANGUAGE plpgsql SECURITY DEFINER;/s);
  
  return {
    softDelete: softDeleteMatch ? softDeleteMatch[0] : null,
    duplicate: duplicateMatch ? duplicateMatch[0] : null
  };
}

// Main execution
async function main() {
  const { func1Exists, func2Exists } = await testFunctions();
  
  if (func1Exists && func2Exists) {
    console.log('\n✅ ALL RPC FUNCTIONS EXIST! Nothing to do.\n');
    return;
  }
  
  console.log('\n❌ SOME RPC FUNCTIONS ARE MISSING\n');
  console.log('Solution: Apply functions via Supabase Dashboard\n');
  console.log('='.repeat(60));
  
  const functions = extractRPCFunctions();
  
  if (!func2Exists && functions.softDelete) {
    console.log('\n📋 SQL for soft_delete_presentation:');
    console.log('='.repeat(60));
    console.log(functions.softDelete);
    console.log('='.repeat(60));
  }
  
  if (!func1Exists && functions.duplicate) {
    console.log('\n📋 SQL for duplicate_presentation:');
    console.log('='.repeat(60));
    console.log(functions.duplicate);
    console.log('='.repeat(60));
  }
  
  console.log('\n📝 MANUAL STEPS:\n');
  console.log(`1. Open: https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new`);
  console.log('2. Copy the SQL above');
  console.log('3. Paste into SQL Editor');
  console.log('4. Click "Run" button');
  console.log('5. Verify: node scripts/apply-missing-rpc.js\n');
  
  // Write SQL to file for easy copy
  const missingSQL = [];
  if (!func2Exists && functions.softDelete) missingSQL.push(functions.softDelete);
  if (!func1Exists && functions.duplicate) missingSQL.push(functions.duplicate);
  
  if (missingSQL.length > 0) {
    const outputFile = '/tmp/missing_rpc_functions.sql';
    const fs = await import('fs');
    fs.writeFileSync(outputFile, missingSQL.join('\n\n'));
    console.log(`💾 SQL also saved to: ${outputFile}\n`);
  }
}

main().catch(console.error);

