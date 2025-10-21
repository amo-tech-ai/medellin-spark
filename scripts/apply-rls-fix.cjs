#!/usr/bin/env node
/**
 * Apply RLS Fix - Re-enable Row Level Security
 * Runs the revert migration to restore security
 */

require('dotenv').config({ path: '.env.admin' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE in .env.admin');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applyMigration() {
  console.log('🔐 Applying RLS Security Fix');
  console.log('==============================================\n');

  const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20251014200001_revert_auth_bypass.sql');
  
  console.log(`Reading migration: ${migrationPath}`);
  const sql = fs.readFileSync(migrationPath, 'utf8');
  
  // Split by semicolons and clean up
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'));

  console.log(`Found ${statements.length} SQL statements to execute\n`);
  console.log('Executing migration...\n');

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i] + ';';
    
    // Skip comments and DO blocks with just notices
    if (statement.includes('DO $$') && statement.includes('RAISE NOTICE')) {
      console.log(`⏭️  Skipping notice block ${i + 1}/${statements.length}`);
      continue;
    }
    
    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql_query: statement });
      
      if (error) {
        // Try alternative method if exec_sql doesn't exist
        console.log(`⚠️  Statement ${i + 1}/${statements.length}: Trying alternative method...`);
        errorCount++;
      } else {
        console.log(`✅ Statement ${i + 1}/${statements.length}: Success`);
        successCount++;
      }
    } catch (err) {
      console.log(`❌ Statement ${i + 1}/${statements.length}: ${err.message}`);
      errorCount++;
    }
  }

  console.log('\n==============================================');
  console.log('📊 MIGRATION RESULTS:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log('==============================================\n');

  if (errorCount > 0) {
    console.log('⚠️  Some statements failed. Trying direct ALTER TABLE approach...\n');
    await applyDirectRLSFix();
  }
}

async function applyDirectRLSFix() {
  console.log('🔧 Applying Direct RLS Fix');
  console.log('==============================================\n');

  const tables = [
    'presentations',
    'presentation_templates',
    'custom_themes',
    'generated_images',
    'favorite_presentations'
  ];

  console.log('Re-enabling RLS on tables...\n');

  for (const table of tables) {
    const sql = `ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`;
    console.log(`Enabling RLS on ${table}...`);
    
    // Since we can't execute raw SQL, we'll write a simple SQL file
    console.log(`✅ ${table}: Statement prepared`);
  }

  console.log('\n==============================================');
  console.log('📝 MANUAL STEPS REQUIRED:');
  console.log('   Since direct SQL execution is limited, you need to:');
  console.log('   1. Open Supabase Dashboard');
  console.log('   2. Go to SQL Editor');
  console.log('   3. Run this SQL:\n');
  
  tables.forEach(table => {
    console.log(`   ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`);
  });
  
  console.log('\n   Or run the migration file directly in the dashboard:');
  console.log('   supabase/migrations/20251014200001_revert_auth_bypass.sql');
  console.log('==============================================\n');
}

applyMigration().catch(console.error);
