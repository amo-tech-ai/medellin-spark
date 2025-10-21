# Supabase Connection Guide - Medellin Spark

## ✅ Connection Status
Your Supabase project is **fully configured and connected**!

## 📋 Project Details
- **Project Name**: medellinai
- **Project ID**: dhesktsqhcxhqfjypulk
- **Region**: us-east-2
- **Project URL**: https://dhesktsqhcxhqfjypulk.supabase.co

## 🔑 Credentials (Already in .env)

### Frontend (Safe for Browser)
```env
VITE_SUPABASE_URL=https://dhesktsqhcxhqfjypulk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Backend (Server-only - NEVER expose in browser)
```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_DB_URL_DIRECT=postgresql://postgres:...
SUPABASE_DB_URL_POOLER=postgresql://postgres.dhesktsqhcxhqfjypulk:...
```

## 🗄️ Database Schema
Your database includes the following tables:
- `profiles` - User profiles
- `events` - Event management
- `organizers` - Event organizers
- `venues` - Event venues
- `tickets` - Ticket types
- `registrations` - Event registrations
- `waitlist` - Waitlist management
- `sponsors` - Event sponsors
- `companies` - Company profiles
- `jobs` - Job listings
- `candidates` - Job candidates
- `applications` - Job applications
- `matches` - Job-candidate matches
- `startup_profiles` - Startup company profiles
- `perks` - Startup perks/benefits
- `perk_claims` - Claimed perks
- `saved_perks` - Saved perks
- `wizard_sessions` - Pitch deck wizard sessions

## 🚀 Quick Start Commands

### CLI Commands
```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref dhesktsqhcxhqfjypulk

# Check project status
supabase projects list

# Run a new migration
supabase migration new migration_name

# Push migrations to remote
supabase db push

# Pull remote schema
supabase db pull

# Generate TypeScript types
supabase gen types typescript --project-id dhesktsqhcxhqfjypulk > src/types/supabase.ts

# Reset local database (if using local dev)
supabase db reset
```

### Using Supabase in Your Code

#### Client-side (React/Vite)
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Query example
const { data, error } = await supabase
  .from('events')
  .select('*')
  .eq('status', 'published')
```

#### Server-side (with service role)
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
```

## 🔧 Local Development

### Note about Docker Desktop
If you want to run Supabase locally, you need to configure Docker Desktop file sharing:
1. Open Docker Desktop
2. Go to Settings → Resources → File Sharing
3. Add `/home/sk` to the shared paths
4. Click "Apply & Restart"

Then you can start local services:
```bash
supabase start
```

### Working with Remote Project (Current Setup)
Since local Docker has file sharing limitations, you're currently working directly with your remote Supabase project, which is perfectly fine for development!

## 📚 Resources
- [Supabase Dashboard](https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk)
- [Supabase CLI Docs](https://supabase.com/docs/guides/local-development/cli/getting-started)
- [Database Migrations](https://supabase.com/docs/guides/local-development/cli/migrations)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🎯 Next Steps
1. Your database schema is already deployed
2. Run migrations from `supabase/migrations/` if needed
3. Start building your frontend with the Vite environment variables
4. Use the MCP Supabase tools for database operations
