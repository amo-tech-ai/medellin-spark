import sql from '../lib/db.js'
import { readFileSync } from 'fs'

async function applySeedData() {
  try {
    console.log('📊 Applying seed data to cloud database...\n')
    
    // Read seed-fixed.sql file
    const seedSQL = readFileSync('./supabase/seed-fixed.sql', 'utf-8')
    
    // Split by semicolons and filter out comments/empty lines
    const statements = seedSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--') && s.length > 10)
    
    console.log(`Found ${statements.length} SQL statements to execute\n`)
    
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i]
      
      // Show progress
      if (stmt.includes('INSERT INTO profiles')) {
        console.log(`📝 Inserting profile...`)
      } else if (stmt.includes('INSERT INTO startup_profiles')) {
        console.log(`🚀 Inserting startup profile...`)
      } else if (stmt.includes('INSERT INTO organizers')) {
        console.log(`🎉 Inserting organizer...`)
      } else if (stmt.includes('INSERT INTO candidates')) {
        console.log(`💼 Inserting candidate...`)
      }
      
      try {
        await sql.unsafe(stmt + ';')
      } catch (err) {
        // Ignore conflicts (already exists)
        if (!err.message.includes('duplicate key') && !err.message.includes('ON CONFLICT')) {
          console.log(`⚠️  Warning: ${err.message.substring(0, 80)}`)
        }
      }
    }
    
    console.log('\n✅ Seed data applied successfully!')
    
    // Verify results
    console.log('\n📊 Verifying data...')
    const profileCount = await sql`SELECT COUNT(*) FROM profiles`
    const startupCount = await sql`SELECT COUNT(*) FROM startup_profiles`
    const organizerCount = await sql`SELECT COUNT(*) FROM organizers`
    const candidateCount = await sql`SELECT COUNT(*) FROM candidates`
    
    console.log(`✅ Profiles: ${profileCount[0].count}`)
    console.log(`✅ Startup Profiles: ${startupCount[0].count}`)
    console.log(`✅ Organizers: ${organizerCount[0].count}`)
    console.log(`✅ Candidates: ${candidateCount[0].count}`)
    
    await sql.end()
    
  } catch (error) {
    console.error('❌ Failed to apply seed data:', error.message)
    process.exit(1)
  }
}

applySeedData()
