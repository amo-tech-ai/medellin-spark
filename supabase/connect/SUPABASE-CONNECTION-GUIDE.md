# Supabase Connection Guide – MCP, CLI, Postgres & REST API

**Last Updated**: October 2025  
**Difficulty**: Beginner-Friendly  
**Purpose**: Learn all 4 ways to connect to Supabase securely

---

## 📋 Table of Contents

1. [Quick Overview](#quick-overview)
2. [Environment Variables](#environment-variables)
3. [Method 1: Supabase MCP](#method-1-supabase-mcp)
4. [Method 2: Supabase CLI](#method-2-supabase-cli)
5. [Method 3: Postgres (psql)](#method-3-postgres-psql)
6. [Method 4: REST API](#method-4-rest-api)
7. [Common Errors & Fixes](#common-errors--fixes)
8. [Security Best Practices](#security-best-practices)
9. [Real-World Example](#real-world-example)

---

## 🎯 Quick Overview

### What Each Connection Type Does

| Method | What It's For | When to Use |
|--------|---------------|-------------|
| **MCP** | AI assistant database access | Cursor, Claude Code, automated queries |
| **CLI** | Migrations, deployments, Edge Functions | Local development, CI/CD pipelines |
| **psql** | Direct database queries | Database admin, debugging, migrations |
| **REST API** | Application data access | Frontend/backend code, user queries |

### Which One Should I Use?

```
Building an app? → Use REST API (in your code)
Using Cursor/Claude? → Use MCP (already configured)
Managing database? → Use CLI + psql (terminal)
Running migrations? → Use CLI (supabase db push)
```

---

## 🔑 Environment Variables

### What You Need

Create a `.env` file in your project root (never commit this file):

```bash
# ===== SUPABASE PROJECT INFO =====
SUPABASE_PROJECT_ID=dhesktsqhcxhqfjypulk  # Your project reference
SUPABASE_URL=https://dhesktsqhcxhqfjypulk.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # Public key (safe to expose)

# ===== DATABASE CONNECTIONS =====
# Direct connection (IPv6 - may not work on all networks)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.dhesktsqhcxhqfjypulk.supabase.co:5432/postgres

# Connection pooler (IPv4 + IPv6 - RECOMMENDED)
DATABASE_URL_POOLER=postgresql://postgres.dhesktsqhcxhqfjypulk:[PASSWORD]@aws-1-us-east-2.pooler.supabase.com:6543/postgres

# ===== ADMIN ACCESS (KEEP SECRET!) =====
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # Admin key - NEVER expose!
SUPABASE_ACCESS_TOKEN=sbp_abc123...  # CLI access token (from dashboard)

# ===== DATABASE PASSWORD =====
POSTGRES_PASSWORD=YourSecurePassword123  # Database password
```

### Where to Find These Values

**Supabase Dashboard**: https://supabase.com/dashboard/project/YOUR_PROJECT_ID

1. **Project URL & Keys**: Settings → API
   - URL: `https://YOUR_PROJECT_ID.supabase.co`
   - `anon key`: Safe for frontend (respects RLS)
   - `service_role key`: Admin access (backend only!)

2. **Access Token**: Settings → Access Tokens → Generate New Token

3. **Database Password**: Settings → Database → Connection String
   - Click "Show password" to reveal

4. **Connection Pooler**: Settings → Database → Connection Pooler
   - Copy the "Transaction" mode URL

---

## 🤖 Method 1: Supabase MCP

### What is MCP?

**Model Context Protocol** - Lets AI assistants (like Claude in Cursor) connect to your Supabase database directly.

### When to Use

- ✅ Using Cursor or Claude Code
- ✅ Want AI to query/update database
- ✅ Need automated database operations
- ✅ Building features with AI assistance

### Setup (One-Time)

**Step 1**: Get your access token from Supabase Dashboard:
- Go to: Settings → Access Tokens
- Click: "Generate New Token"
- Name: `cursor-mcp` (or any name)
- Copy the token (starts with `sbp_`)

**Step 2**: Configure MCP in Cursor:

Edit `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-supabase"
      ],
      "env": {
        "SUPABASE_URL": "https://dhesktsqhcxhqfjypulk.supabase.co",
        "SUPABASE_ACCESS_TOKEN": "sbp_abc123..."
      }
    }
  }
}
```

**Step 3**: Restart Cursor

### Usage Examples

```typescript
// Query data
mcp_supabase_execute_sql({
  query: "SELECT * FROM users WHERE status = 'active';"
})

// List tables
mcp_supabase_list_tables({
  schemas: ["public"]
})

// Apply migration
mcp_supabase_apply_migration({
  name: "add_users_table",
  query: `
    CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `
})

// Check logs
mcp_supabase_get_logs({
  service: "postgres"
})
```

### Pros & Cons

**Pros**:
- ✅ No connection setup needed
- ✅ AI can help with queries
- ✅ Automatic authentication
- ✅ Works in Cursor IDE

**Cons**:
- ❌ Only works in MCP-compatible tools
- ❌ Requires access token setup
- ❌ Not for production app code

---

## 🛠️ Method 2: Supabase CLI

### What is the CLI?

Command-line tool for managing your Supabase project locally and remotely.

### When to Use

- ✅ Running database migrations
- ✅ Deploying Edge Functions
- ✅ Managing local development
- ✅ CI/CD pipelines
- ✅ Pushing schema changes

### Setup (One-Time)

**Step 1**: Install Supabase CLI:

```bash
# macOS/Linux
brew install supabase/tap/supabase

# Or use npm (any OS)
npm install -g supabase

# Verify installation
supabase --version
```

**Step 2**: Login to Supabase:

```bash
supabase login
# Opens browser → Authenticate → Copy access token → Paste in terminal
```

**Step 3**: Link to your project:

```bash
cd /home/sk/medellin-spark

# Link to remote project
supabase link --project-ref dhesktsqhcxhqfjypulk

# Enter your database password when prompted
```

### Common Commands

```bash
# ===== LOCAL DEVELOPMENT =====
supabase start          # Start local Supabase (Docker required)
supabase stop           # Stop local instance
supabase status         # Check what's running

# ===== DATABASE MIGRATIONS =====
supabase db diff --use-migra  # Generate migration from local changes
supabase db push        # Push migrations to remote
supabase db pull        # Pull schema from remote
supabase db reset       # Reset local database

# ===== EDGE FUNCTIONS =====
supabase functions new my-function    # Create new Edge Function
supabase functions serve             # Run locally
supabase functions deploy my-function  # Deploy to production

# ===== SECRETS (Environment Variables) =====
supabase secrets list                # List secrets
supabase secrets set MY_SECRET=value # Set secret
supabase secrets unset MY_SECRET     # Delete secret

# ===== LOGS & MONITORING =====
supabase functions logs my-function --tail  # Stream function logs
```

### Real-World Workflow

```bash
# 1. Create a new migration
supabase migration new add_profiles_table

# 2. Edit the migration file
# File: supabase/migrations/20240101_add_profiles_table.sql
# Add your SQL here

# 3. Test locally (if using local dev)
supabase db reset

# 4. Push to production
supabase db push

# 5. Verify migration applied
supabase db remote commit
```

### Pros & Cons

**Pros**:
- ✅ Manage everything from terminal
- ✅ Version control migrations
- ✅ Local development support
- ✅ CI/CD friendly

**Cons**:
- ❌ Requires CLI installation
- ❌ Learning curve for commands
- ❌ Docker needed for local dev

---

## 🐘 Method 3: Postgres (psql)

### What is psql?

PostgreSQL command-line interface for direct database access.

### When to Use

- ✅ Running complex SQL queries
- ✅ Database administration
- ✅ Debugging data issues
- ✅ Importing/exporting data
- ✅ Testing queries before adding to code

### Setup (One-Time)

**Step 1**: Install PostgreSQL client:

```bash
# macOS
brew install postgresql

# Ubuntu/Debian
sudo apt-get install postgresql-client

# Windows
# Download from: https://www.postgresql.org/download/windows/
```

**Step 2**: Get connection string:

Use **connection pooler** (recommended, works with IPv4 + IPv6):

```bash
# From your .env:
DATABASE_URL_POOLER=postgresql://postgres.dhesktsqhcxhqfjypulk:YourPassword@aws-1-us-east-2.pooler.supabase.com:6543/postgres
```

### Connection Methods

**Method A: Using connection string** (easiest):

```bash
# Set password in environment
export PGPASSWORD="YourPassword"

# Connect using pooler
psql "postgresql://postgres.dhesktsqhcxhqfjypulk:YourPassword@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
```

**Method B: Using individual parameters**:

```bash
PGPASSWORD="YourPassword" psql \
  -h aws-1-us-east-2.pooler.supabase.com \
  -p 6543 \
  -U postgres.dhesktsqhcxhqfjypulk \
  -d postgres
```

**Method C: Interactive password prompt**:

```bash
psql -h aws-1-us-east-2.pooler.supabase.com \
     -p 6543 \
     -U postgres.dhesktsqhcxhqfjypulk \
     -d postgres
# Will prompt for password
```

### Common psql Commands

```bash
# ===== QUICK QUERIES =====
psql "$DATABASE_URL_POOLER" -c "SELECT * FROM users LIMIT 5;"

# ===== INTERACTIVE MODE =====
psql "$DATABASE_URL_POOLER"
# Then run queries:
postgres=> SELECT * FROM users WHERE email = 'test@example.com';
postgres=> \dt              # List tables
postgres=> \d users         # Describe users table
postgres=> \q               # Quit

# ===== RUN SQL FILE =====
psql "$DATABASE_URL_POOLER" -f migration.sql

# ===== EXPORT DATA =====
psql "$DATABASE_URL_POOLER" -c "COPY users TO STDOUT CSV HEADER" > users.csv

# ===== IMPORT DATA =====
psql "$DATABASE_URL_POOLER" -c "\COPY users FROM 'users.csv' CSV HEADER"
```

### Useful psql Meta-Commands

```sql
-- Inside psql interactive mode:

\l              -- List all databases
\dt             -- List tables in current schema
\dt+            -- List tables with size info
\d table_name   -- Describe table structure
\du             -- List users/roles
\dn             -- List schemas
\df             -- List functions
\dv             -- List views
\x              -- Toggle expanded display (good for wide tables)
\timing         -- Toggle query execution time
\q              -- Quit psql
```

### Pros & Cons

**Pros**:
- ✅ Full PostgreSQL power
- ✅ Fast for complex queries
- ✅ Data import/export
- ✅ Direct database access

**Cons**:
- ❌ Requires PostgreSQL client
- ❌ Manual connection setup
- ❌ Not for application code
- ❌ IPv6 issues (use pooler!)

---

## 🌐 Method 4: REST API

### What is the REST API?

Supabase's auto-generated REST API for database access from application code.

### When to Use

- ✅ **Your application code** (frontend/backend)
- ✅ Fetching data for users
- ✅ Respecting Row Level Security (RLS)
- ✅ Real-time subscriptions
- ✅ 99% of production use cases

### Setup in Your App

**Step 1**: Install Supabase client:

```bash
npm install @supabase/supabase-js
```

**Step 2**: Create Supabase client:

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Environment variables** (`.env.local` for Next.js):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://dhesktsqhcxhqfjypulk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Usage Examples

**Select (Read)**:

```typescript
// Get all active users
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('status', 'active')

if (error) {
  console.error('Error fetching users:', error)
  return
}

console.log('Users:', data)
```

**Insert (Create)**:

```typescript
// Add new user
const { data, error } = await supabase
  .from('users')
  .insert({
    email: 'new@example.com',
    name: 'John Doe',
    status: 'active'
  })
  .select()  // Return inserted row

if (error) {
  console.error('Error inserting user:', error)
  return
}

console.log('Created user:', data)
```

**Update**:

```typescript
// Update user status
const { data, error } = await supabase
  .from('users')
  .update({ status: 'inactive' })
  .eq('email', 'old@example.com')
  .select()

if (error) {
  console.error('Error updating user:', error)
  return
}

console.log('Updated user:', data)
```

**Delete**:

```typescript
// Delete user
const { error } = await supabase
  .from('users')
  .delete()
  .eq('id', 'user-uuid-here')

if (error) {
  console.error('Error deleting user:', error)
  return
}

console.log('User deleted successfully')
```

**Complex Queries**:

```typescript
// Join tables, filter, sort, paginate
const { data, error } = await supabase
  .from('posts')
  .select(`
    *,
    author:users(name, email),
    comments(count)
  `)
  .eq('published', true)
  .order('created_at', { ascending: false })
  .range(0, 9)  // Pagination (first 10 items)

if (error) {
  console.error('Error fetching posts:', error)
  return
}

console.log('Posts with authors:', data)
```

**Real-time Subscriptions**:

```typescript
// Listen for new users
const channel = supabase
  .channel('users-channel')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'users'
    },
    (payload) => {
      console.log('New user created:', payload.new)
    }
  )
  .subscribe()

// Cleanup when component unmounts
return () => {
  supabase.removeChannel(channel)
}
```

**Authentication + RLS**:

```typescript
// Sign in user
const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

if (authError) {
  console.error('Login failed:', authError)
  return
}

// Now queries respect RLS policies for this user
const { data: userPosts, error } = await supabase
  .from('posts')
  .select('*')
  .eq('user_id', authData.user.id)  // Only user's own posts

console.log('User posts:', userPosts)
```

### Using fetch/axios (Alternative)

If you don't want to use `@supabase/supabase-js`:

```typescript
// Using fetch
const response = await fetch(
  'https://dhesktsqhcxhqfjypulk.supabase.co/rest/v1/users?status=eq.active',
  {
    headers: {
      'apikey': process.env.SUPABASE_ANON_KEY!,
      'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY!}`,
      'Content-Type': 'application/json',
    }
  }
)

const data = await response.json()
console.log('Users:', data)

// Using axios
import axios from 'axios'

const { data } = await axios.get(
  'https://dhesktsqhcxhqfjypulk.supabase.co/rest/v1/users',
  {
    params: { status: 'eq.active' },
    headers: {
      'apikey': process.env.SUPABASE_ANON_KEY!,
      'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY!}`,
    }
  }
)

console.log('Users:', data)
```

### Pros & Cons

**Pros**:
- ✅ Auto-generated from schema
- ✅ Respects RLS policies
- ✅ Real-time subscriptions
- ✅ TypeScript support
- ✅ Production-ready

**Cons**:
- ❌ Requires client library
- ❌ Learning curve for complex queries
- ❌ Limited to database operations

---

## ⚠️ Common Errors & Fixes

### Error 1: "Network is unreachable" (psql)

**Error**:
```
psql: error: connection to server at "db.dhesktsqhcxhqfjypulk.supabase.co" failed: Network is unreachable
```

**Cause**: Direct connection uses IPv6, your network uses IPv4 only

**Fix**: Use connection pooler instead:

```bash
# ❌ WRONG (Direct - IPv6 only)
psql -h db.dhesktsqhcxhqfjypulk.supabase.co -p 5432

# ✅ CORRECT (Pooler - IPv4 + IPv6)
psql -h aws-1-us-east-2.pooler.supabase.com -p 6543 -U postgres.dhesktsqhcxhqfjypulk
```

---

### Error 2: "Invalid API key"

**Error**:
```json
{
  "code": "401",
  "message": "Invalid API key"
}
```

**Cause**: Wrong API key or not included in request

**Fix**: Check you're using the correct key:

```typescript
// ✅ Frontend (anon key - safe to expose)
const supabase = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// ✅ Backend (service role key - keep secret!)
const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!)
```

---

### Error 3: "Row Level Security policy violation"

**Error**:
```
new row violates row-level security policy for table "users"
```

**Cause**: RLS is enabled but user doesn't have permission

**Fix**:

**Option A**: Add RLS policy:
```sql
-- Allow users to insert their own row
CREATE POLICY "Users can insert own profile"
ON users FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);
```

**Option B**: Use service role key (bypasses RLS):
```typescript
// Only in backend/Edge Functions!
const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!)
```

---

### Error 4: "supabase: command not found"

**Error**:
```bash
bash: supabase: command not found
```

**Cause**: CLI not installed or not in PATH

**Fix**:

```bash
# Install globally
npm install -g supabase

# Or use via npx (no install needed)
npx supabase status
```

---

### Error 5: "Too many connections"

**Error**:
```
FATAL: sorry, too many clients already
```

**Cause**: Hit connection limit (direct connections)

**Fix**: Use connection pooler:

```bash
# Pooler manages connections automatically
psql "postgresql://postgres.dhesktsqhcxhqfjypulk:password@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
```

---

### Error 6: "Authentication failed for user"

**Error**:
```
FATAL: password authentication failed for user "postgres"
```

**Causes & Fixes**:

1. **Wrong password**:
   ```bash
   # Get password from Supabase Dashboard:
   # Settings → Database → Show password
   ```

2. **Special characters not encoded**:
   ```bash
   # Password: Pass#word123
   
   # ❌ WRONG (# not encoded)
   postgresql://postgres:Pass#word123@host
   
   # ✅ CORRECT (# encoded as %23)
   postgresql://postgres:Pass%23word123@host
   ```

3. **Wrong username format for pooler**:
   ```bash
   # ❌ WRONG
   -U postgres
   
   # ✅ CORRECT (includes project ref)
   -U postgres.dhesktsqhcxhqfjypulk
   ```

---

## 🔒 Security Best Practices

### 1. Never Commit Secrets

**Bad**:
```typescript
// ❌ NEVER DO THIS
const supabase = createClient(
  'https://myproject.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'  // Hardcoded!
)
```

**Good**:
```typescript
// ✅ Use environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

**Add to `.gitignore`**:
```
.env
.env.local
.env.*.local
```

---

### 2. Use Correct Keys for Each Context

| Context | Key to Use | Why |
|---------|-----------|-----|
| **Frontend (browser)** | `anon` key | Respects RLS, safe to expose |
| **Backend (server)** | `service_role` key | Bypasses RLS, full admin access |
| **Edge Functions** | `service_role` key | Server-side, needs full access |
| **CLI** | Access token | Personal authentication |

**Example**:
```typescript
// Frontend (React, Next.js, etc.)
const supabase = createClient(url, ANON_KEY)  // ✅ Safe to expose

// Backend (API routes, serverless functions)
const supabase = createClient(url, SERVICE_ROLE_KEY)  // ⚠️ Keep secret!
```

---

### 3. Enable Row Level Security (RLS)

**Always enable RLS on tables**:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own data"
ON users FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
ON users FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
```

**Verify RLS is enabled**:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

---

### 4. Use Access Token Scopes

When creating CLI access tokens:

- **Migrations**: Give only database access
- **Functions**: Give only functions access
- **Full admin**: Avoid if possible, use specific scopes

**Dashboard**: Settings → Access Tokens → Select minimal scopes needed

---

### 5. Rotate Secrets Regularly

**Update access tokens**:
```bash
# Generate new token in dashboard
# Update .env
SUPABASE_ACCESS_TOKEN=sbp_new_token_here

# Revoke old token in dashboard
```

**Rotate database password**:
```sql
-- In Supabase SQL editor
ALTER ROLE postgres WITH PASSWORD 'NewSecurePassword123!';
```

---

### 6. Use Environment-Specific Variables

```bash
# .env.development
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321  # Local Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key

# .env.production
NEXT_PUBLIC_SUPABASE_URL=https://dhesktsqhcxhqfjypulk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
```

---

## 🚀 Real-World Example

Let's connect to Supabase and query user data using all 4 methods.

### Example Database Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read all active users
CREATE POLICY "Anyone can read active users"
ON users FOR SELECT
TO anon, authenticated
USING (status = 'active');
```

---

### Method 1: Using MCP (in Cursor)

```typescript
// Ask Claude in Cursor:
// "Show me all active users"

mcp_supabase_execute_sql({
  query: "SELECT id, email, name FROM users WHERE status = 'active';"
})

// Claude will execute and show results:
// [
//   { id: "uuid-1", email: "alice@example.com", name: "Alice" },
//   { id: "uuid-2", email: "bob@example.com", name: "Bob" }
// ]
```

---

### Method 2: Using CLI

```bash
# Pull current schema
supabase db pull

# Create new migration
supabase migration new add_users_index

# Edit migration file
echo "CREATE INDEX users_email_idx ON users(email);" > supabase/migrations/20240101_add_users_index.sql

# Push to production
supabase db push

# Verify with logs
supabase db remote commit
```

---

### Method 3: Using psql

```bash
# Connect to database
PGPASSWORD="YourPassword" psql \
  -h aws-1-us-east-2.pooler.supabase.com \
  -p 6543 \
  -U postgres.dhesktsqhcxhqfjypulk \
  -d postgres

# Run queries
postgres=> SELECT id, email, name FROM users WHERE status = 'active';

# Output:
#                  id                  |       email        |  name  
# -------------------------------------+--------------------+--------
#  a1b2c3d4-e5f6-7890-abcd-1234567890ab | alice@example.com  | Alice
#  b2c3d4e5-f6a7-8901-bcde-234567890abc | bob@example.com    | Bob
# (2 rows)

postgres=> \q  # Quit
```

---

### Method 4: Using REST API (in App)

**React Component Example**:

```typescript
// components/UserList.tsx
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface User {
  id: string
  email: string
  name: string
  status: string
  created_at: string
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })

        if (error) throw error

        setUsers(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div>Loading users...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Active Users ({users.length})</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  )
}
```

**Output**:
```
Active Users (2)
• Alice (alice@example.com)
• Bob (bob@example.com)
```

---

## 📚 Quick Reference

### Connection Strings Cheat Sheet

```bash
# MCP (in .cursor/mcp.json)
SUPABASE_URL=https://dhesktsqhcxhqfjypulk.supabase.co
SUPABASE_ACCESS_TOKEN=sbp_abc123...

# CLI (after supabase login)
# No connection string needed, uses access token

# psql (Terminal)
# Connection pooler (RECOMMENDED):
postgresql://postgres.dhesktsqhcxhqfjypulk:[PASSWORD]@aws-1-us-east-2.pooler.supabase.com:6543/postgres

# Direct connection (IPv6 - may not work):
postgresql://postgres:[PASSWORD]@db.dhesktsqhcxhqfjypulk.supabase.co:5432/postgres

# REST API (JavaScript/TypeScript)
SUPABASE_URL=https://dhesktsqhcxhqfjypulk.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Password URL Encoding

If your password has special characters, encode them:

| Character | Encoded |
|-----------|---------|
| `#` | `%23` |
| `@` | `%40` |
| `!` | `%21` |
| `$` | `%24` |
| `&` | `%26` |
| `=` | `%3D` |

**Example**:
```bash
# Password: Pass#word@123!
# Encoded: Pass%23word%40123%21

postgresql://postgres:Pass%23word%40123%21@host:port/db
```

---

## 🎓 Next Steps

1. **Set up your `.env` file** with Supabase credentials
2. **Choose your primary method**:
   - Building an app? → Start with REST API
   - Using Cursor? → Configure MCP
   - Managing database? → Install CLI + psql
3. **Enable RLS** on all your tables
4. **Never commit secrets** to git
5. **Test locally** before deploying

---

## 📖 Additional Resources

- **Supabase Docs**: https://supabase.com/docs
- **MCP Supabase**: https://github.com/modelcontextprotocol/servers/tree/main/src/supabase
- **Supabase CLI**: https://supabase.com/docs/guides/cli
- **JavaScript Client**: https://supabase.com/docs/reference/javascript
- **PostgREST API**: https://postgrest.org/en/stable/

---

**Created**: October 2025  
**Status**: Production-Ready  
**Audience**: Beginners to Intermediate  

