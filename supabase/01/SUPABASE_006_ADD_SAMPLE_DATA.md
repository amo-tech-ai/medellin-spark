# 📊 Add Sample Data to Supabase - Step by Step Guide

**Project**: medellinai (dhesktsqhcxhqfjypulk)
**Date**: 2025-10-13
**Status**: Ready to execute

---

## 🎯 QUICK START (5 Minutes)

### Step 1: Create Auth Users (via Dashboard)

Visit: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/users

Click **"Add User" → "Create new user"** for each:

| Email | Password | Metadata |
|-------|----------|----------|
| `sofia.martinez@medellin-spark.local` | `password123` | `{"full_name": "Sofía Martínez"}` |
| `carlos.lopez@medellin-spark.local` | `password123` | `{"full_name": "Carlos López"}` |
| `ana.rodriguez@medellin-spark.local` | `password123` | `{"full_name": "Ana Rodríguez"}` |
| `diego.sanchez@medellin-spark.local` | `password123` | `{"full_name": "Diego Sánchez"}` |
| `maria.garcia@medellin-spark.local` | `password123` | `{"full_name": "María García"}` |

**Important**: Check "Auto Confirm User" when creating each user!

---

### Step 2: Run Seed Data SQL

Once auth users are created, run this command:

```bash
source .env && psql "$SUPABASE_DB_URL_POOLER?sslmode=require" -f supabase/seed-fixed.sql
```

**OR** manually execute via SQL Editor:
https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/sql/new

---

## 📋 WHAT SAMPLE DATA CREATES

### 5 User Profiles
1. **Sofía Martínez** - CEO & Co-founder at GreenTech Solutions
2. **Carlos López** - Community Director at Ruta N
3. **Ana Rodríguez** - Senior Full-Stack Developer
4. **Diego Sánchez** - Founder & CTO at TaskFlow AI
5. **María García** - Product Manager

### 2 Startup Profiles
1. **GreenTech Solutions** (Verified) - Climate Tech / SaaS, Seed stage
2. **TaskFlow AI** (Pending) - AI / Productivity, Pre-seed

### 2 Event Organizers
1. **Ruta N Medellín** - Innovation and business center
2. **Startup Weekend Medellín** - 54-hour entrepreneurship competition

### 2 Job Candidates
1. **Ana Rodríguez** - 5 years experience, open to opportunities
2. **Diego Sánchez** - 7 years experience, looking for co-founder

---

## 🔧 ALTERNATIVE: Manual Dashboard Entry

If you prefer clicking through the Dashboard instead of SQL:

### Create Profiles (via Table Editor)
Visit: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/editor

1. Go to `profiles` table
2. Click "Insert" → "Insert row"
3. Fill in data for each profile (see detailed data below)

### Profile 1: Sofía Martínez
```json
{
  "id": "10000000-0000-0000-0000-000000000001",
  "user_id": "[GET FROM AUTH USERS TABLE]",
  "email": "sofia.martinez@medellin-spark.local",
  "full_name": "Sofía Martínez",
  "bio": "CEO & Co-founder at GreenTech Solutions. Passionate about sustainable technology and climate innovation. Former product lead at Rappi.",
  "company": "GreenTech Solutions",
  "job_title": "CEO & Co-founder",
  "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=sofia",
  "linkedin_url": "https://linkedin.com/in/sofia-martinez-co",
  "twitter_url": "https://twitter.com/sofiagreentec",
  "website_url": "https://greentech.co"
}
```

**Repeat for other profiles** (see seed-fixed.sql for complete data)

---

## 🚀 FASTEST METHOD: Use SQL Editor

### Method A: Via psql (Recommended)
```bash
# 1. Create auth users via Dashboard first (see Step 1 above)

# 2. Run seed file
source .env && psql "$SUPABASE_DB_URL_POOLER?sslmode=require" -f supabase/seed-fixed.sql

# 3. Verify data
source .env && psql "$SUPABASE_DB_URL_POOLER?sslmode=require" -c "
SELECT
  'Profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL SELECT 'Startup Profiles', COUNT(*) FROM startup_profiles
UNION ALL SELECT 'Organizers', COUNT(*) FROM organizers
UNION ALL SELECT 'Candidates', COUNT(*) FROM candidates;
"
```

### Method B: Via Supabase SQL Editor
1. Visit: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/sql/new
2. Copy contents of `supabase/seed-fixed.sql`
3. Click "Run"

---

## ⚠️ IMPORTANT NOTES

### Prerequisites
- ✅ Auth users MUST be created first (via Dashboard)
- ✅ All migrations must be applied (already done)
- ✅ RLS policies enabled (already done)

### Common Issues

**Issue 1: "null value in column user_id violates not-null constraint"**
- **Cause**: Auth users not created yet
- **Fix**: Create auth users via Dashboard first (Step 1)

**Issue 2: "row level security policy for table profiles"**
- **Cause**: RLS blocking insert
- **Fix**: Use service role key or Dashboard with proper auth

**Issue 3: "duplicate key value violates unique constraint"**
- **Cause**: Data already exists
- **Fix**: This is normal on re-run (ON CONFLICT DO NOTHING handles it)

---

## 🧪 VERIFY DATA

### Check Counts
```bash
source .env && psql "$SUPABASE_DB_URL_POOLER?sslmode=require" -c "
SELECT tablename, n_live_tup as row_count
FROM pg_stat_user_tables
WHERE schemaname = 'public'
AND tablename IN ('profiles', 'startup_profiles', 'organizers', 'candidates')
ORDER BY tablename;
"
```

### Expected Output
```
    tablename     | row_count
------------------+-----------
 candidates       |         2
 organizers       |         2
 profiles         |         5
 startup_profiles |         2
```

### View Sample Data
```bash
# View profiles
source .env && psql "$SUPABASE_DB_URL_POOLER?sslmode=require" -c "
SELECT id, email, full_name, company FROM profiles;
"

# View startups
source .env && psql "$SUPABASE_DB_URL_POOLER?sslmode=require" -c "
SELECT company_name, industry, stage, verified FROM startup_profiles;
"
```

---

## 🎯 TEST CREDENTIALS

Once sample data is loaded, you can log in with any of these:

| Email | Password | Role |
|-------|----------|------|
| `sofia.martinez@medellin-spark.local` | `password123` | Startup Founder |
| `carlos.lopez@medellin-spark.local` | `password123` | Event Organizer |
| `ana.rodriguez@medellin-spark.local` | `password123` | Job Candidate |
| `diego.sanchez@medellin-spark.local` | `password123` | Startup + Candidate |
| `maria.garcia@medellin-spark.local` | `password123` | Regular User |

---

## 📊 DATA RELATIONSHIPS

```
auth.users (5)
    ↓ (1:1)
profiles (5)
    ↓ (1:1)
startup_profiles (2) - Sofia, Diego
    ↓ (1:N)
organizers (2) - Carlos has 2 organizer entities
    ↓ (1:1)
candidates (2) - Ana, Diego
```

---

## 🔗 QUICK LINKS

- **Dashboard Home**: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk
- **Auth Users**: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/users
- **Table Editor**: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/editor
- **SQL Editor**: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/sql/new

---

## 🎬 COMPLETE WORKFLOW

### Option 1: CLI (Fastest - 2 minutes)
```bash
# Step 1: Create users via Dashboard (manual click)
# Visit: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/users
# Add 5 users from table above

# Step 2: Run seed file
source .env && psql "$SUPABASE_DB_URL_POOLER?sslmode=require" -f supabase/seed-fixed.sql

# Step 3: Verify
source .env && psql "$SUPABASE_DB_URL_POOLER?sslmode=require" -c "SELECT COUNT(*) FROM profiles;"
```

### Option 2: Dashboard Only (Safest - 5 minutes)
1. Create auth users → Auth → Users → Add User (5x)
2. Copy seed SQL → SQL Editor → Paste → Run
3. Verify → Table Editor → Check each table

### Option 3: MCP Tools (Programmatic)
```javascript
// Note: Can't create auth users via MCP (requires Dashboard)
// But can insert other data after users exist

import { execSync } from 'child_process'

// Step 1: Manual - create users via Dashboard
console.log('Create users at: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/users')

// Step 2: Run seed
execSync('source .env && psql "$SUPABASE_DB_URL_POOLER?sslmode=require" -f supabase/seed-fixed.sql')

// Step 3: Verify via MCP
// Use mcp__supabase__execute_sql to query data
```

---

## ✅ CHECKLIST

Before adding sample data:
- [ ] Migrations applied (run `supabase db push` if needed)
- [ ] RLS policies enabled (already done)
- [ ] Environment variables set (already done)

Add sample data:
- [ ] Create 5 auth users via Dashboard
- [ ] Run `supabase/seed-fixed.sql` via psql
- [ ] Verify data with SELECT queries

After adding sample data:
- [ ] Test login with sample credentials
- [ ] Verify RLS policies work (users see their own data)
- [ ] Check foreign key relationships
- [ ] Test frontend queries

---

*Created: 2025-10-13*
*Next: Create auth users and run seed file*
