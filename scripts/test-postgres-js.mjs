#!/usr/bin/env node
/**
 * Test postgres.js connection to Supabase
 * Based on: https://github.com/porsager/postgres
 * 
 * Run with: source .env && node scripts/test-postgres-js.mjs
 */
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error('❌ DATABASE_URL not found in .env')
  process.exit(1)
}

console.log('🔌 Testing postgres.js connection...\n')

// Create connection with transaction mode settings
// Per Supabase docs: Transaction mode doesn't support prepared statements
const sql = postgres(connectionString, {
  prepare: false,  // Required for Supabase transaction pooler
  ssl: 'require',
  max: 1,  // Single connection for testing
  idle_timeout: 20,
  connect_timeout: 10
})

async function testConnection() {
  try {
    // Test 1: Simple query
    console.log('📊 Test 1: Simple query')
    const [result] = await sql`SELECT current_database(), version()`
    console.log('  ✅ Database:', result.current_database)
    console.log('  ✅ Version:', result.version.split(' ')[0], result.version.split(' ')[1])
    console.log()

    // Test 2: Check RLS status
    console.log('📊 Test 2: Check RLS status')
    const tables = await sql`
      SELECT tablename, rowsecurity 
      FROM pg_tables 
      WHERE schemaname = 'public' 
        AND tablename IN ('presentations', 'presentation_templates', 'custom_themes', 'generated_images', 'favorite_presentations')
      ORDER BY tablename
    `
    console.log('  Tables:')
    tables.forEach(t => {
      const status = t.rowsecurity ? '🔒 ENABLED' : '🔓 DISABLED'
      console.log(`    ${status} ${t.tablename}`)
    })
    console.log()

    // Test 3: Count presentations
    console.log('📊 Test 3: Count presentations')
    const [count] = await sql`SELECT COUNT(*) as count FROM presentations`
    console.log(`  ✅ Total presentations: ${count.count}`)
    console.log()

    // Test 4: Query presentation templates (should work - public access)
    console.log('📊 Test 4: Query presentation templates')
    const templates = await sql`
      SELECT id, name, category 
      FROM presentation_templates 
      LIMIT 3
    `
    console.log(`  ✅ Found ${templates.length} templates:`)
    templates.forEach(t => console.log(`    - ${t.name} (${t.category})`))
    console.log()

    console.log('✅ All tests passed!')
    console.log('🎉 postgres.js is working correctly!')

  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.code) console.error('   Code:', error.code)
    if (error.detail) console.error('   Detail:', error.detail)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

testConnection()

