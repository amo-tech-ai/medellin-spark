import postgres from 'postgres'

// Use pooler for production (recommended for serverless)
const connectionString = process.env.SUPABASE_DB_URL_POOLER

const sql = postgres(connectionString, {
  max: 10, // Max connections
  idle_timeout: 20,
  connect_timeout: 10,
})

export default sql
