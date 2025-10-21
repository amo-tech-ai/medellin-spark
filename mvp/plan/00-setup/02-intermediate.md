# Setup - Intermediate (Supabase & Database)

**Phase**: Backend Foundation
**Time**: 2-3 hours
**Priority**: 🔴 CRITICAL
**Difficulty**: Intermediate
**Prerequisites**: 00-setup/01-core.md complete

---

## Overview

Set up Supabase backend, configure authentication, create the profiles table, and establish Row Level Security (RLS) foundation.

**Outcome**: Supabase connected, profiles table created, auth working, RLS enabled

---

## Prerequisites

- Core setup complete (dev server running)
- Supabase account created
- `.env` file exists with placeholders

---

## Implementation Steps

### Step 1: Create Supabase Project (15 minutes)

**1. Go to Supabase Dashboard**:
```
https://app.supabase.com/
```

**2. Create New Project**:
- **Name**: medellin-spark (or your choice)
- **Database Password**: Generate strong password (save it!)
- **Region**: Choose closest to your users
- **Pricing**: Free tier is fine for development

**3. Wait for project to provision** (2-3 minutes)

---

### Step 2: Get Supabase Credentials (5 minutes)

**Navigate to Project Settings → API**:

**Copy these values**:
- **Project URL**: `https://abc123xyz.supabase.co`
- **Anon (public) key**: `eyJhbGc...` (long string)
- **Service Role key**: `eyJhbGc...` (KEEP PRIVATE - server only)

**Update .env file**:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key

# DON'T add service role key to .env - use Supabase secrets for Edge Functions
```

**Restart dev server** to load new env variables:
```bash
# Stop server (Ctrl+C)
pnpm dev
```

---

### Step 3: Database Connection Verification (10 minutes)

**Get Database Connection String**:

Project Settings → Database → Connection String → URI

**Format**:
```
postgresql://postgres.abc:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

**Test connection**:
```bash
PGPASSWORD='your-password' psql -h abc.supabase.co -U postgres -d postgres -c "SELECT version();"
```

**Expected output**:
```
PostgreSQL 15.x on x86_64...
```

✅ **Database Status**: Connected

---

### Step 4: Enable Auth Providers (10 minutes)

**Navigate to**: Authentication → Providers

**Enable Email Provider**:
- ✅ Enable Email provider
- ✅ Confirm email: Optional (disable for dev)
- ✅ Save

**Configure Auth Settings**:
- Site URL: `http://localhost:8080`
- Redirect URLs: `http://localhost:8080/**`

**Disable email confirmation** (dev only):
```sql
-- Run in SQL Editor
UPDATE auth.config SET email_confirmation_required = false;
```

---

### Step 5: Create Profiles Table (30 minutes)

**Create Migration**: `supabase/migrations/20250120000001_create_profiles.sql`

```sql
-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  company_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'partner')),
  bio TEXT,
  website TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Public profiles are viewable by everyone (when implementing public profiles later)
CREATE POLICY "Public profiles are viewable"
  ON profiles
  FOR SELECT
  USING (true);

-- 5. Create indexes for performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_created_at ON profiles(created_at);

-- 6. Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create trigger to call function on new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Create trigger for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Apply Migration**:

**Option A: Using Supabase CLI** (recommended):
```bash
npx supabase db push
```

**Option B: Using SQL Editor**:
- Go to Supabase Dashboard → SQL Editor
- Paste the migration SQL
- Click Run

---

### Step 6: Verify Database Setup (10 minutes)

**Check table created**:
```sql
-- Run in SQL Editor or psql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'profiles';
```

**Expected output**:
```
tablename | rowsecurity
----------|------------
profiles  | t
```

✅ RLS is enabled (`t` = true)

**Check RLS policies**:
```sql
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'profiles';
```

**Expected output**: 4 policies shown

---

### Step 7: Test Auth Flow (20 minutes)

**Create test user**:

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Email: `test@medellin.ai`
4. Password: `Test1234!`
5. Auto-confirm email: ✅
6. Click "Create user"

**Verify profile auto-created**:
```sql
SELECT id, email, full_name FROM profiles;
```

**Expected**: Row exists with test user's email

**Test in browser**:
```
http://localhost:8080/auth
```

**Try to sign in with test credentials**:
- Email: `test@medellin.ai`
- Password: `Test1234!`

**Expected**:
- ✅ Successfully logs in
- ✅ Redirects to dashboard
- ✅ Profile data accessible

---

### Step 8: Supabase Client Configuration (15 minutes)

**Verify client setup** in `src/integrations/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Test connection**:
```typescript
// In browser console:
const { data, error } = await supabase.from('profiles').select('count');
console.log('Profile count:', data);
```

✅ Should return count without errors

---

## Success Criteria

### Supabase Project
- [ ] Project created and running
- [ ] Project URL and keys obtained
- [ ] `.env` updated with credentials
- [ ] Database connection verified

### Profiles Table
- [ ] Table created successfully
- [ ] RLS enabled (`rowsecurity = true`)
- [ ] 4 RLS policies active
- [ ] Indexes created
- [ ] Trigger function working

### Authentication
- [ ] Email provider enabled
- [ ] Test user created
- [ ] Auto-profile creation works
- [ ] Can sign in successfully
- [ ] Profile data accessible

### Frontend Integration
- [ ] Supabase client configured
- [ ] No console errors
- [ ] Can query profiles table
- [ ] Auth state persists

---

## Testing Commands

```bash
# 1. Test database connection
PGPASSWORD='your-password' psql -h your-project.supabase.co -U postgres -d postgres -c "\dt"
# Expected: profiles table listed

# 2. Check RLS enabled
PGPASSWORD='your-password' psql -h your-project.supabase.co -U postgres -d postgres -c "SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'profiles';"
# Expected: rowsecurity = t

# 3. Count profiles
PGPASSWORD='your-password' psql -h your-project.supabase.co -U postgres -d postgres -c "SELECT COUNT(*) FROM profiles;"
# Expected: Number of users

# 4. Verify trigger works
# Sign up a new user in UI, then check:
PGPASSWORD='your-password' psql -h your-project.supabase.co -U postgres -d postgres -c "SELECT id, email FROM profiles ORDER BY created_at DESC LIMIT 5;"
# Expected: New profile created automatically
```

---

## Common Issues & Fixes

### Issue: "Missing environment variables"

**Fix**: Ensure .env has correct values
```bash
# Check env loaded
echo $VITE_SUPABASE_URL
# If empty, restart dev server
```

---

### Issue: RLS policy denies access

**Fix**: Check user is authenticated
```typescript
const { data: { user } } = await supabase.auth.getUser();
console.log('Current user:', user);
// If null, user not authenticated
```

---

### Issue: Profile not auto-created

**Fix**: Check trigger exists
```sql
SELECT tgname FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```

If missing, rerun Step 5 migration.

---

### Issue: Can't connect to database

**Fix**: Check connection string and password
```bash
# Test with correct password
PGPASSWORD='exact-password-from-dashboard' psql -h your-project.supabase.co -U postgres -d postgres -c "SELECT version();"
```

---

## Security Checklist

- [ ] Service role key NOT in .env
- [ ] RLS enabled on profiles table
- [ ] RLS policies tested
- [ ] Auth tokens validated
- [ ] CORS configured correctly
- [ ] Database password is strong (20+ characters)

---

## Next Steps

After Intermediate setup complete:
→ **00-setup/03-advanced.md** - Production deployment, monitoring, Edge Functions setup

---

**Estimated Time**: 2-3 hours
**Difficulty**: Intermediate
**Status**: ✅ Ready to implement
