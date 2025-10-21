# 🔐 Create Auth Users - Dashboard Method

Since the programmatic approach hit a database error (likely because triggers on `auth.users` cannot be created in hosted Supabase), use the Dashboard method:

## ✅ Step 1: Create Auth Users via Dashboard

Visit: **https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/users**

Click **"Add User" → "Create new user"** for each user below.

**IMPORTANT**: Check ✅ **"Auto Confirm User"** when creating each!

### User 1: Sofía Martínez
- **Email**: `sofia.martinez@medellin-spark.local`
- **Password**: `password123`
- **User Metadata** (Optional):
  ```json
  {"full_name": "Sofía Martínez"}
  ```
- ✅ **Auto Confirm User**: YES

### User 2: Carlos López
- **Email**: `carlos.lopez@medellin-spark.local`
- **Password**: `password123`
- **User Metadata**:
  ```json
  {"full_name": "Carlos López"}
  ```
- ✅ **Auto Confirm User**: YES

### User 3: Ana Rodríguez
- **Email**: `ana.rodriguez@medellin-spark.local`
- **Password**: `password123`
- **User Metadata**:
  ```json
  {"full_name": "Ana Rodríguez"}
  ```
- ✅ **Auto Confirm User**: YES

### User 4: Diego Sánchez
- **Email**: `diego.sanchez@medellin-spark.local`
- **Password**: `password123`
- **User Metadata**:
  ```json
  {"full_name": "Diego Sánchez"}
  ```
- ✅ **Auto Confirm User**: YES

### User 5: María García
- **Email**: `maria.garcia@medellin-spark.local`
- **Password**: `password123`
- **User Metadata**:
  ```json
  {"full_name": "María García"}
  ```
- ✅ **Auto Confirm User**: YES

---

## 📋 Step 2: Create Profiles Manually (Since Trigger May Not Work)

After creating auth users, create their profiles via SQL Editor:

Visit: **https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/sql/new**

Run this SQL:

```sql
-- Create profiles for auth users
-- This is needed because the auth.users trigger doesn't work in hosted Supabase

DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Profile 1: Sofía Martínez
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'sofia.martinez@medellin-spark.local';
  IF v_user_id IS NOT NULL THEN
    INSERT INTO profiles (user_id, email, full_name)
    VALUES (v_user_id, 'sofia.martinez@medellin-spark.local', 'Sofía Martínez')
    ON CONFLICT (user_id) DO NOTHING;
  END IF;

  -- Profile 2: Carlos López
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'carlos.lopez@medellin-spark.local';
  IF v_user_id IS NOT NULL THEN
    INSERT INTO profiles (user_id, email, full_name)
    VALUES (v_user_id, 'carlos.lopez@medellin-spark.local', 'Carlos López')
    ON CONFLICT (user_id) DO NOTHING;
  END IF;

  -- Profile 3: Ana Rodríguez
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'ana.rodriguez@medellin-spark.local';
  IF v_user_id IS NOT NULL THEN
    INSERT INTO profiles (user_id, email, full_name)
    VALUES (v_user_id, 'ana.rodriguez@medellin-spark.local', 'Ana Rodríguez')
    ON CONFLICT (user_id) DO NOTHING;
  END IF;

  -- Profile 4: Diego Sánchez
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'diego.sanchez@medellin-spark.local';
  IF v_user_id IS NOT NULL THEN
    INSERT INTO profiles (user_id, email, full_name)
    VALUES (v_user_id, 'diego.sanchez@medellin-spark.local', 'Diego Sánchez')
    ON CONFLICT (user_id) DO NOTHING;
  END IF;

  -- Profile 5: María García
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'maria.garcia@medellin-spark.local';
  IF v_user_id IS NOT NULL THEN
    INSERT INTO profiles (user_id, email, full_name)
    VALUES (v_user_id, 'maria.garcia@medellin-spark.local', 'María García')
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
END $$;

-- Verify profiles created
SELECT id, email, full_name FROM profiles ORDER BY created_at;
```

---

## 🚀 Step 3: Run Seed Data

After profiles are created, run the full seed file:

```bash
source .env && psql "$SUPABASE_DB_URL_POOLER?sslmode=require" -f supabase/seed-fixed.sql
```

---

## ✅ Step 4: Verify Everything

```bash
# Check auth users
source .env
curl -s "$VITE_SUPABASE_URL/rest/v1/profiles?select=id,email,full_name" \
  -H "apikey: $VITE_SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $VITE_SUPABASE_ANON_KEY"

# Check startups
curl -s "$VITE_SUPABASE_URL/rest/v1/startup_profiles?select=company_name,industry,verified" \
  -H "apikey: $VITE_SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $VITE_SUPABASE_ANON_KEY"

# Check organizers
curl -s "$VITE_SUPABASE_URL/rest/v1/organizers?select=name,website_url" \
  -H "apikey: $VITE_SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $VITE_SUPABASE_ANON_KEY"
```

---

## ⚠️ Why Programmatic Creation Failed

The `admin-create-users.js` script failed with "Database error creating new user" because:

1. **Trigger on `auth.users` Cannot Be Created in Hosted Supabase**
   - The migration tries to create `on_auth_user_created` trigger on `auth.users`
   - Hosted Supabase doesn't allow custom triggers on `auth.*` schema
   - This is a security restriction

2. **Solution**:
   - Create users via Dashboard (which uses internal Supabase auth API)
   - Manually create profiles via SQL Editor
   - Then run seed-fixed.sql for remaining data

---

## 🎯 Quick Summary

1. **Dashboard → Auth → Users**: Create 5 users (with Auto Confirm checked)
2. **Dashboard → SQL Editor**: Run profile creation SQL above
3. **Terminal**: Run `psql ... -f supabase/seed-fixed.sql`
4. **Terminal**: Verify with curl commands above

Total time: ~5 minutes

---

*Created: 2025-10-13*
*Next: Follow steps 1-4 above*
