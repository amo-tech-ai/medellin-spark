#!/usr/bin/env node
// Creates initial auth users with email_confirmed=true
// Usage: node admin-create-users.js
// Requires: @supabase/supabase-js and dotenv

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env.admin
config({ path: join(__dirname, '.env.admin') })

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE, // admin power
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

const users = [
  {
    email: 'sofia.martinez@medellin-spark.local',
    password: 'password123',
    user_metadata: { full_name: 'Sofía Martínez' }
  },
  {
    email: 'carlos.lopez@medellin-spark.local',
    password: 'password123',
    user_metadata: { full_name: 'Carlos López' }
  },
  {
    email: 'ana.rodriguez@medellin-spark.local',
    password: 'password123',
    user_metadata: { full_name: 'Ana Rodríguez' }
  },
  {
    email: 'diego.sanchez@medellin-spark.local',
    password: 'password123',
    user_metadata: { full_name: 'Diego Sánchez' }
  },
  {
    email: 'maria.garcia@medellin-spark.local',
    password: 'password123',
    user_metadata: { full_name: 'María García' }
  },
]

async function main() {
  console.log('🔧 Creating auth users with service role...\n')

  for (const u of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
      user_metadata: u.user_metadata,
    })

    if (error) {
      console.error('❌', u.email, '→', error.message)
    } else {
      console.log('✅ Created:', data.user.email, '→', data.user.id)
    }
  }

  console.log('\n✅ All auth users created successfully!')
  console.log('\nNext steps:')
  console.log('1. Run: source .env && psql "$SUPABASE_DB_URL_POOLER?sslmode=require" -f supabase/seed-fixed.sql')
  console.log('2. Verify: curl -s "$VITE_SUPABASE_URL/rest/v1/profiles?select=id,email,full_name" -H "apikey: $VITE_SUPABASE_ANON_KEY"')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err)
    process.exit(1)
  })
