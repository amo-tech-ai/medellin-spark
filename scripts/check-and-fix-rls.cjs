#!/usr/bin/env node
/**
 * Check RLS Status and Fix if Needed
 * This script verifies that RLS is enabled on all presentation tables
 */

require('dotenv').config({ path: '.env.admin' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE in .env.admin');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkRLSStatus() {
  console.log('🔍 Checking RLS Status on Presentation Tables');
  console.log('==============================================\n');

  const tables = [
    'presentations',
    'custom_themes',
    'generated_images',
    'favorite_presentations',
    'presentation_templates'
  ];

  const query = `
    SELECT 
      tablename,
      rowsecurity as rls_enabled
    FROM pg_tables 
    WHERE schemaname = 'public' 
      AND tablename = ANY($1)
    ORDER BY tablename;
  `;

  try {
    const { data, error } = await supabase.rpc('exec_sql', { 
      sql_query: query,
      params: [tables]
    });

    if (error) {
      // RPC function might not exist, try direct query
      console.log('⚠️  exec_sql RPC not available, checking via table queries...\n');
      
      for (const table of tables) {
        try {
          // Try to query the table to see if it exists
          const { error: tableError } = await supabase
            .from(table)
            .select('id')
            .limit(1);
          
          if (tableError) {
            if (tableError.code === 'PGRST204' || tableError.code === 'PGRST205') {
              console.log(`❌ ${table}: Table does not exist`);
            } else if (tableError.code === '42501') {
              console.log(`✅ ${table}: RLS is ENABLED (permission denied as expected)`);
            } else {
              console.log(`✅ ${table}: Exists (RLS status unknown - ${tableError.code})`);
            }
          } else {
            console.log(`⚠️  ${table}: Exists and accessible (may need RLS check)`);
          }
        } catch (err) {
          console.log(`❌ ${table}: Error checking - ${err.message}`);
        }
      }
    } else {
      console.log('RLS Status:');
      data.forEach(row => {
        const status = row.rls_enabled ? '✅ ENABLED' : '❌ DISABLED';
        console.log(`  ${row.tablename}: ${status}`);
      });
    }
  } catch (err) {
    console.error('❌ Error checking RLS:', err.message);
    return false;
  }

  console.log('\n==============================================');
  return true;
}

async function checkMigrations() {
  console.log('\n🔍 Checking Applied Migrations');
  console.log('==============================================\n');

  try {
    const { data, error } = await supabase
      .from('supabase_migrations.schema_migrations')
      .select('version')
      .order('version', { ascending: false })
      .limit(10);

    if (error) {
      console.log('⚠️  Cannot query migrations table directly');
      console.log('   Checking if key tables exist instead...\n');
      
      // Check if presentations table has the new columns
      const { error: tableError } = await supabase
        .from('presentations')
        .select('id, title, description, slide_count, deleted_at')
        .limit(1);
      
      if (tableError) {
        console.log('❌ presentations table missing or has errors:', tableError.message);
        console.log('\n📋 RECOMMENDATION: Run migrations manually');
        console.log('   cd /home/sk/medellin-spark');
        console.log('   ls supabase/migrations/');
        return false;
      } else {
        console.log('✅ presentations table exists with expected columns');
        return true;
      }
    }

    console.log('Last 10 migrations applied:');
    data.forEach(row => {
      console.log(`  ✅ ${row.version}`);
    });
    
    return true;
  } catch (err) {
    console.error('❌ Error checking migrations:', err.message);
    return false;
  }

  console.log('\n==============================================');
}

async function main() {
  console.log('🚀 Starting RLS and Migration Check\n');
  
  await checkRLSStatus();
  await checkMigrations();
  
  console.log('\n✅ Check complete!');
  console.log('\n📋 NEXT STEPS:');
  console.log('   1. If RLS is disabled, it means migrations haven\'t been applied');
  console.log('   2. Migrations are in: /home/sk/medellin-spark/supabase/migrations/');
  console.log('   3. Key migration: 20251013140000_create_presentation_tables.sql (enables RLS)');
  console.log('   4. The migrations ALREADY contain ALTER TABLE ... ENABLE ROW LEVEL SECURITY');
}

main().catch(console.error);
