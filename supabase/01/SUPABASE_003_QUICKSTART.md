# 🚀 Supabase Quick Start - Medellin Spark

## ✅ TL;DR - You're Ready!

Your Supabase is **95% production ready**. Just need 4 hours of optimization before high-traffic launch.

**Status**:
- ✅ Database: WORKING
- ✅ Security: ENABLED
- ✅ Connectivity: VERIFIED
- ⚠️  Performance: NEEDS TUNING

---

## 📋 5-Minute Quick Start

### 1. Verify Everything Works
```bash
# Test database connection
node scripts/test-db-connection.js

# Should see: "✅ Database connected successfully!"
```

### 2. Create Your First User
Visit: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/users
- Click "Add User"
- Create an admin account

### 3. Start Building
```typescript
// src/lib/supabase.ts (already configured!)
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Example: Fetch events
const { data, error } = await supabase
  .from('events')
  .select('*')
  .eq('status', 'published')
```

---

## 🔧 Fix Critical Issues (30 mins)

### Priority 1: Function Security

Create migration:
```bash
supabase migration new fix_function_search_paths
```

Add to migration file:
```sql
-- Fix: update_updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
$$ LANGUAGE plpgsql;

-- Fix: upsert_profile
CREATE OR REPLACE FUNCTION upsert_profile()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
-- (copy existing function body)
$$;

-- Fix: has_role
CREATE OR REPLACE FUNCTION has_role(role_name text)
RETURNS boolean
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
-- (copy existing function body)
$$;

-- Fix: current_profile_id
CREATE OR REPLACE FUNCTION current_profile_id()
RETURNS uuid
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
-- (copy existing function body)
$$;
```

Push changes:
```bash
supabase db push
```

---

## ⚡ Optimize Performance (2 hours)

### Fix RLS Policy Performance

Create migration:
```bash
supabase migration new optimize_rls_policies
```

Fix profiles policies:
```sql
-- Drop old policies
DROP POLICY IF EXISTS profiles_insert_own ON profiles;
DROP POLICY IF EXISTS profiles_update_own ON profiles;

-- Create optimized policies
CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));
```

Push changes:
```bash
supabase db push
```

---

## 🎯 Common Operations

### Generate TypeScript Types
```bash
supabase gen types typescript --project-id dhesktsqhcxhqfjypulk > src/types/supabase.ts
```

### Create New Migration
```bash
supabase migration new add_new_feature
# Edit: supabase/migrations/TIMESTAMP_add_new_feature.sql
supabase db push
```

### Check Database Status
```bash
supabase projects list
```

### View Logs
```bash
# Via MCP tool or Dashboard
# Dashboard: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/logs
```

---

## 📊 Current Stats

- **Tables**: 21
- **RLS Policies**: 101
- **Indexes**: 89
- **Functions**: 54
- **Foreign Keys**: 28
- **Migrations**: 8

---

## 🐛 Troubleshooting

### "Permission Denied" Errors
- Check RLS policies are enabled
- Verify user is authenticated
- Check user_id matches in policies

### Slow Queries
- Check EXPLAIN ANALYZE output
- Verify indexes are being used
- Optimize RLS policies (see above)

### Local Docker Issues
```bash
# Error: Docker socket not shared
# Fix: Docker Desktop → Settings → Resources → File Sharing
# Add: /home/sk

# Then:
supabase stop --no-backup || true
supabase start
```

### Migration Conflicts
```bash
# Pull remote schema
supabase db pull

# Reset local (DESTROYS LOCAL DATA!)
supabase db reset

# Or push with --include-all
supabase db push --include-all
```

---

## 📚 Key Files

- `supabase/config.toml` - Local development config
- `supabase/migrations/` - Schema version history
- `supabase/seed.sql` - Minimal seed file (see seed-fixed.sql)
- `.env` - Environment variables (NEVER commit!)
- `scripts/test-db-connection.js` - Connection tester

---

## 🔗 Quick Links

- [Dashboard](https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk)
- [Auth Users](https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/users)
- [Database](https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/database/tables)
- [API Docs](https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/api)
- [Logs](https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/logs)

---

## ✅ Pre-Launch Checklist

- [ ] Fix function search_path (30 mins)
- [ ] Optimize RLS policies (2 hours)
- [ ] Create admin user
- [ ] Test all CRUD operations
- [ ] Load test with realistic data
- [ ] Configure backups
- [ ] Set up monitoring
- [ ] Review security advisors
- [ ] Generate TypeScript types
- [ ] Document API

**See SUPABASE_AUDIT_REPORT.md for detailed findings**

---

*Last Updated: 2025-10-13*
