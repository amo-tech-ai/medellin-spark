#!/usr/bin/env node
/**
 * Apply RLS Fix via Supabase Management API
 * Uses service role key to execute SQL directly
 */

require('dotenv').config({ path: '.env' });
const https = require('https');
const fs = require('fs');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

console.log('🔐 Applying RLS Fix via Supabase API');
console.log('==============================================\n');

// Read the SQL file
const sqlContent = fs.readFileSync('FIX_RLS_NOW.sql', 'utf8');

// Split into individual statements
const statements = sqlContent
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'));

console.log(`Found ${statements.length} SQL statements to execute\n`);

let successCount = 0;
let errorCount = 0;

async function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Prefer': 'return=representation'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, data });
        } else {
          resolve({ success: false, error: data, status: res.statusCode });
        }
      });
    });

    req.on('error', (error) => reject(error));
    req.write(JSON.stringify({ sql_query: sql }));
    req.end();
  });
}

async function runStatements() {
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    
    // Skip DO blocks with RAISE NOTICE (they're just messages)
    if (statement.includes('DO $$') && statement.includes('RAISE NOTICE')) {
      console.log(`⏭️  Skipping notice block ${i + 1}/${statements.length}`);
      continue;
    }
    
    console.log(`Executing statement ${i + 1}/${statements.length}...`);
    
    try {
      const result = await executeSQL(statement + ';');
      
      if (result.success) {
        console.log(`✅ Statement ${i + 1}: Success`);
        successCount++;
      } else {
        console.log(`⚠️  Statement ${i + 1}: ${result.error || 'Unknown error'}`);
        errorCount++;
      }
    } catch (error) {
      console.log(`❌ Statement ${i + 1}: ${error.message}`);
      errorCount++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n==============================================');
  console.log('📊 RESULTS:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log('==============================================\n');
  
  if (errorCount === 0 || errorCount === statements.length) {
    console.log('⚠️  API method may not support exec_sql RPC');
    console.log('   Trying alternative method...\n');
    await tryAlternativeMethod();
  }
}

async function tryAlternativeMethod() {
  console.log('🔧 Trying direct ALTER TABLE via REST API');
  console.log('==============================================\n');
  
  const tables = [
    'presentations',
    'presentation_templates',
    'custom_themes',
    'generated_images',
    'favorite_presentations'
  ];
  
  for (const table of tables) {
    console.log(`Attempting to enable RLS on ${table}...`);
    // This won't work via REST API, but worth trying
    console.log(`❌ Cannot execute DDL via REST API directly`);
  }
  
  console.log('\n==============================================');
  console.log('📋 MANUAL ACTION REQUIRED:');
  console.log('   The Supabase REST API cannot execute DDL statements');
  console.log('   Please use one of these methods:');
  console.log('   1. Supabase Dashboard SQL Editor (RECOMMENDED)');
  console.log('   2. Direct psql connection with proper network');
  console.log('   3. Supabase CLI: supabase db push');
  console.log('==============================================');
}

runStatements().catch(console.error);
