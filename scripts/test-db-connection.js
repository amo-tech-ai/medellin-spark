import sql from '../lib/db.js'

async function testConnection() {
  try {
    console.log('🔌 Testing database connection...')
    
    // Test basic connection
    const result = await sql`SELECT version()`
    console.log('✅ Database connected successfully!')
    console.log('📌 PostgreSQL version:', result[0].version)
    
    // Check tables exist
    console.log('\n📋 Checking tables in public schema...')
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
    
    if (tables.length > 0) {
      console.log(`✅ Found ${tables.length} tables:`)
      tables.forEach(t => console.log(`   - ${t.table_name}`))
    } else {
      console.log('⚠️  No tables found in public schema')
    }
    
    // Check auth users
    console.log('\n👥 Checking auth users...')
    const users = await sql`SELECT email FROM auth.users ORDER BY email`
    
    if (users.length > 0) {
      console.log(`✅ Found ${users.length} auth users:`)
      users.forEach(u => console.log(`   - ${u.email}`))
    } else {
      console.log('⚠️  No auth users found - create via Supabase Dashboard')
    }
    
    await sql.end()
    console.log('\n✅ Connection test complete!')
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    process.exit(1)
  }
}

testConnection()
