# Complete Supabase Local Setup Guide

**Date:** 2025-10-13
**Purpose:** End-to-end guide for setting up Supabase local with sample data

---

## Quick Start (3 Steps)

```bash
# 1. Start Supabase (runs migrations, creates schema)
npx supabase start

# 2. Open Supabase Studio
open http://localhost:54323

# 3. Create users manually in Studio:
#    Dashboard → Authentication → Add User
#    Email: sofia.martinez@medellin-spark.local
#    Password: password123
#    Confirm: true
```

---

## Full Setup (Recommended)

### Step 1: Start Supabase

```bash
cd /home/sk/medellin-spark
npx supabase start
```

**What happens:**
- Creates Docker containers (Postgres, GoTrue, PostgREST, etc.)
- Applies all migrations from `supabase/migrations/`
- Creates schema (tables, functions, RLS policies)
- Runs `supabase/seed.sql` (currently minimal)

**Verify:**
```bash
npx supabase status
# Should show: Started supabase local development setup
```

**URLs:**
- Studio: http://localhost:54323
- API: http://localhost:54321
- Database: postgresql://postgres:postgres@localhost:54322/postgres

---

### Step 2: Create Auth Users

**Option A: Via Supabase Studio (Recommended)**

1. Open http://localhost:54323
2. Navigate to: **Authentication** → **Users**
3. Click **Add User**
4. Fill in:
   - Email: `sofia.martinez@medellin-spark.local`
   - Password: `password123`
   - Auto Confirm: `true`
   - User Metadata: `{"full_name": "Sofía Martínez"}`
5. Click **Create User**
6. Repeat for other users:
   - carlos.lopez@medellin-spark.local
   - ana.rodriguez@medellin-spark.local
   - diego.sanchez@medellin-spark.local
   - maria.garcia@medellin-spark.local

**Option B: Via MCP Supabase Tool**

If using Claude Code with Supabase MCP server:

```javascript
// Use mcp__supabase__execute_sql
// Note: Auth user creation via MCP requires cloud project access
```

**Option C: Via SQL (Local Only - Not Recommended)**

```sql
-- Only works on local Supabase
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'sofia.martinez@medellin-spark.local',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Sofía Martínez"}',
  false,
  now(),
  now()
);
```

---

### Step 3: Seed Application Data

Once auth users exist, apply the application seed data:

```bash
psql postgresql://postgres:postgres@localhost:54322/postgres -f supabase/seed-fixed.sql
```

**What this creates:**
- 5 Profiles (linked to auth users via email)
- 2 Startup Profiles (GreenTech verified, TaskFlow pending)
- 2 Organizers (Ruta N, Startup Weekend - both for Carlos)
- 2 Candidates (Ana, Diego)

**Verify in Studio:**
1. Go to: **Table Editor** → `profiles`
2. Should see 5 profiles with full names
3. Check: `startup_profiles`, `organizers`, `candidates`

---

### Step 4: Test Authentication

**Via Supabase Studio:**
1. Navigate to: **Authentication** → **Policies**
2. Click **Run Test Query**
3. Login with:
   - Email: sofia.martinez@medellin-spark.local
   - Password: password123

**Via curl:**
```bash
curl -X POST 'http://localhost:54321/auth/v1/token?grant_type=password' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "sofia.martinez@medellin-spark.local",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "...",
  "user": {
    "id": "...",
    "email": "sofia.martinez@medellin-spark.local",
    "user_metadata": {
      "full_name": "Sofía Martínez"
    }
  }
}
```

---

## Troubleshooting

### Issue: "failed to inspect container health"

**Solution:**
```bash
npx supabase stop
npx supabase start
```

### Issue: "port is already allocated"

**Solution:**
```bash
npx supabase stop --project-id asrzdtpyrdgyggqdfwwl
# Or kill Docker containers manually:
docker ps | grep supabase
docker kill <container_id>
```

### Issue: Profiles not created after running seed-fixed.sql

**Cause:** Auth users don't exist yet

**Solution:**
1. Check auth users: `psql ... -c "SELECT email FROM auth.users;"`
2. If empty, create users via Studio (Step 2)
3. Re-run seed-fixed.sql

### Issue: "violates foreign key constraint profiles_user_id_fkey"

**Cause:** Profile references non-existent auth user

**Solution:**
```sql
-- Check which profiles failed
SELECT * FROM profiles;

-- Check which auth users exist
SELECT id, email FROM auth.users;

-- Manually link or delete orphaned profiles
DELETE FROM profiles WHERE user_id NOT IN (SELECT id FROM auth.users);
```

---

## Reset Everything

```bash
# Stop Supabase
npx supabase stop

# Remove Docker volumes (⚠️  deletes all data)
docker volume ls | grep supabase
docker volume rm $(docker volume ls -q | grep dhesktsqhcxhqfjypulk)

# Restart from scratch
npx supabase start
```

---

## Test Credentials (LOCAL ONLY)

| Email | Password | Role |
|-------|----------|------|
| sofia.martinez@medellin-spark.local | password123 | Startup Founder (GreenTech) |
| carlos.lopez@medellin-spark.local | password123 | Event Organizer (Ruta N, SW Medellín) |
| ana.rodriguez@medellin-spark.local | password123 | Developer Candidate |
| diego.sanchez@medellin-spark.local | password123 | Startup Founder + Candidate |
| maria.garcia@medellin-spark.local | password123 | Regular User |

---

## File Reference

| File | Purpose |
|------|---------|
| `supabase/migrations/*.sql` | Schema changes (DDL) |
| `supabase/seed.sql` | Minimal placeholder (local only) |
| `supabase/seed-fixed.sql` | Full application seed data |
| `scripts/seed-auth.sh` | CLI approach to create auth users (may not work on all CLI versions) |
| `scripts/seed-auth-sql.sql` | SQL approach to create auth users (local only) |

---

## Production Deployment

**Never run seed files in production!**

For cloud Supabase:
1. Apply migrations: `npx supabase db push`
2. Create users via Dashboard → Authentication
3. Manually insert initial data via Dashboard or API

---

## Success Checklist

- [ ] Supabase running (`npx supabase status` shows services)
- [ ] All migrations applied (check Studio → Database → Migrations)
- [ ] Auth users created (Studio → Authentication → Users shows 5 users)
- [ ] Profiles table has 5 rows
- [ ] Startup profiles table has 2 rows (GreenTech, TaskFlow)
- [ ] Organizers table has 2 rows (Ruta N, Startup Weekend)
- [ ] Candidates table has 2 rows (Ana, Diego)
- [ ] Can login with test credentials via API or Studio
- [ ] RLS policies working (test with authenticated user)

---

## Next Steps

Once setup is complete:
1. Test frontend login with sample credentials
2. Verify RLS policies protect user data
3. Check Supabase Studio for any warnings
4. Review security advisor recommendations
5. Start building features!

---

**Need Help?**
- Check logs: `npx supabase logs`
- Debug mode: `npx supabase start --debug`
- Supabase Docs: https://supabase.com/docs/guides/cli/local-development
