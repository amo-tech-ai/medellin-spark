import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Use service role key to create users
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const testUsers = [
  {
    email: 'sofia.martinez@medellin-spark.local',
    password: 'password123',
    full_name: 'Sofía Martínez'
  },
  {
    email: 'carlos.lopez@medellin-spark.local',
    password: 'password123',
    full_name: 'Carlos López'
  },
  {
    email: 'ana.rodriguez@medellin-spark.local',
    password: 'password123',
    full_name: 'Ana Rodríguez'
  },
  {
    email: 'diego.sanchez@medellin-spark.local',
    password: 'password123',
    full_name: 'Diego Sánchez'
  },
  {
    email: 'maria.garcia@medellin-spark.local',
    password: 'password123',
    full_name: 'María García'
  }
]

async function createAuthUsers() {
  console.log('🔐 Creating auth users in Supabase cloud...\n')
  
  for (const user of testUsers) {
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: {
          full_name: user.full_name
        }
      })
      
      if (error) {
        console.log(`⚠️  ${user.email}: ${error.message}`)
      } else {
        console.log(`✅ ${user.email}: Created (ID: ${data.user.id.substring(0, 8)}...)`)
      }
    } catch (err) {
      console.error(`❌ ${user.email}: ${err.message}`)
    }
  }
  
  console.log('\n✅ Auth user creation complete!')
}

createAuthUsers()
