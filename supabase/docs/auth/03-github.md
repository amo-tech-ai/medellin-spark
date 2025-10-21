# GitHub OAuth Implementation Plan

## Overview
Complete implementation guide for GitHub social login in Medellin AI platform.

**Provider**: GitHub OAuth
**Priority**: High (Developer-focused audience)
**Estimated Time**: 2-3 hours
**Difficulty**: Easy

---

## Prerequisites Checklist

- [ ] GitHub account with admin access
- [ ] Supabase project with authentication enabled
- [ ] Access to Supabase Dashboard
- [ ] Local development environment running
- [ ] **Database migration applied** (see Phase 0 below)

---

## Phase 0: Database Schema Setup (REQUIRED FIRST)

⚠️ **CRITICAL**: This phase MUST be completed before implementing GitHub OAuth. The migration adds required database fields that the OAuth implementation depends on.

### Task 0.1: Apply Database Migration
**Duration**: 5-10 minutes
**Location**: `/home/sk/medellin-spark`

#### What This Does:
The migration file `20250113000000_add_oauth_fields.sql` will:
- Add `provider`, `provider_id`, and `metadata` columns to the `profiles` table
- Create `user_sessions` table for tracking logins
- Create `oauth_connections` table for storing OAuth tokens
- Set up indexes, triggers, and RLS policies

#### Steps:
```bash
# Navigate to project root
cd /home/sk/medellin-spark

# Review the migration file first
cat supabase/migrations/20250113000000_add_oauth_fields.sql

# Apply migration to local database
npx supabase db push

# Verify migration applied successfully
npx supabase db diff
```

#### Success Criteria:
- [ ] Migration file reviewed and understood
- [ ] Migration applied without errors
- [ ] New columns exist in profiles table
- [ ] New tables created (user_sessions, oauth_connections)
- [ ] RLS policies active on all tables

#### Verification Queries:
```sql
-- Check profiles table has new columns
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'profiles'
AND column_name IN ('provider', 'provider_id', 'metadata');
-- Should return 3 rows

-- Check new tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('user_sessions', 'oauth_connections');
-- Should return 2 rows

-- Verify RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('profiles', 'user_sessions', 'oauth_connections');
-- All should show rowsecurity = true
```

#### Regenerate TypeScript Types:
```bash
# After migration, update TypeScript types
npx supabase gen types typescript --local > src/integrations/supabase/types.ts
```

#### Troubleshooting:
- **Error: "relation profiles already exists"**: Migration is idempotent, this is safe to ignore
- **Error: "permission denied"**: Check Supabase local instance is running: `npx supabase status`
- **Migration won't apply**: Reset local database: `npx supabase db reset` (⚠️ deletes all data)

---

## Phase 1: GitHub OAuth App Setup

### Task 1.1: Create GitHub OAuth Application
**Duration**: 15 minutes
**Location**: https://github.com/settings/developers

#### Steps:
1. Navigate to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in application details:
   - **Application name**: `Medellin AI` (or your preferred name)
   - **Homepage URL**: `https://medellin-spark.com` (your production URL)
   - **Application description**: `AI-powered startup ecosystem platform`
   - **Authorization callback URL**: `https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback`
4. Click "Register application"
5. Save the **Client ID** (displayed immediately)
6. Click "Generate a new client secret"
7. Save the **Client Secret** (only shown once!)

#### Success Criteria:
- [x] GitHub OAuth app created
- [x] Client ID saved securely
- [x] Client Secret saved securely
- [x] Callback URL configured correctly

#### Verification:
```bash
# Verify callback URL format
echo "https://<project-ref>.supabase.co/auth/v1/callback"
# Should match: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback
```

---

### Task 1.2: Configure Local Development Callback
**Duration**: 5 minutes

#### Steps:
1. In GitHub OAuth app settings, click "Update application"
2. Under "Authorization callback URL" section, you can only have ONE URL
3. For local testing, temporarily change to: `http://localhost:54321/auth/v1/callback`
4. **Important**: Change back to production URL before deploying!

#### Alternative: Use Multiple OAuth Apps
Create separate OAuth apps for:
- **Production**: Uses `https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback`
- **Development**: Uses `http://localhost:54321/auth/v1/callback`

#### Success Criteria:
- [x] Local callback URL configured (if needed)
- [x] Production callback URL ready for deployment

---

## Phase 2: Supabase Configuration

### Task 2.1: Enable GitHub Provider in Dashboard
**Duration**: 10 minutes
**Location**: Supabase Dashboard

#### Steps:
1. Go to https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk
2. Navigate to Authentication → Providers
3. Find **GitHub** in the provider list
4. Toggle **GitHub Enabled** to ON
5. Paste **Client ID** from Task 1.1
6. Paste **Client Secret** from Task 1.1
7. Click **Save**

#### Success Criteria:
- [x] GitHub provider enabled
- [x] Client credentials configured
- [x] Changes saved successfully

#### Verification:
```bash
# Using Supabase CLI
npx supabase functions get-config

# Or check via API
curl https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/settings
```

---

### Task 2.2: Configure via Management API (Optional)
**Duration**: 5 minutes

#### Steps:
1. Get your Supabase access token from: https://supabase.com/dashboard/account/tokens
2. Run the following command:

```bash
export SUPABASE_ACCESS_TOKEN="<your-token>"
export PROJECT_REF="dhesktsqhcxhqfjypulk"

curl -X PATCH "https://api.supabase.com/v1/projects/$PROJECT_REF/config/auth" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "external_github_enabled": true,
    "external_github_client_id": "<your-client-id>",
    "external_github_secret": "<your-client-secret>"
  }'
```

#### Success Criteria:
- [x] API returns 200 status
- [x] Configuration confirmed in dashboard

---

### Task 2.3: Configure for Local Development
**Duration**: 10 minutes
**Location**: Local Supabase config

#### Steps:
1. Create/update `supabase/config.toml`:

```toml
[auth.external.github]
enabled = true
client_id = "<your-github-client-id>"
secret = "env(SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_SECRET)"
```

2. Add to `.env.local`:

```bash
SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_SECRET="<your-client-secret>"
```

3. Restart local Supabase:

```bash
npx supabase stop
npx supabase start
```

#### Success Criteria:
- [x] Local config file updated
- [x] Environment variable set
- [x] Local Supabase restarted successfully

---

## Phase 3: Client Implementation

### Task 3.1: Update Auth Page Component
**Duration**: 15 minutes
**Location**: `src/pages/Auth.tsx`

#### Steps:
1. Read current Auth page:

```bash
cat src/pages/Auth.tsx
```

2. Verify GitHub is in providers array:

```typescript
<SupabaseAuth
  supabaseClient={supabase}
  appearance={{ theme: ThemeSupa }}
  providers={['google', 'github']}  // ← GitHub included
  redirectTo={window.location.origin + '/dashboard'}
/>
```

3. If not present, add 'github' to providers array
4. Save and test

#### Success Criteria:
- [x] GitHub button appears on auth page
- [x] Button styling matches theme
- [x] No console errors

---

### Task 3.2: Test OAuth Flow
**Duration**: 20 minutes

#### Steps:
1. Start local development server:

```bash
pnpm dev
```

2. Navigate to http://localhost:8080/auth
3. Click "Continue with GitHub" button
4. Should redirect to GitHub consent screen
5. Approve access
6. Should redirect back to app

#### Expected Flow:
```
User clicks GitHub button
  ↓
Redirect to: https://github.com/login/oauth/authorize?client_id=...
  ↓
User approves access
  ↓
Redirect to: http://localhost:8080/auth/callback?code=...
  ↓
Supabase exchanges code for session
  ↓
User profile created/updated
  ↓
Redirect to dashboard
```

#### Success Criteria:
- [x] GitHub consent screen displays
- [x] After approval, user redirected back
- [x] User session created successfully
- [x] Profile data populated correctly

---

### Task 3.3: Handle OAuth Callback
**Duration**: 10 minutes
**Location**: Already handled by Supabase Auth UI

#### Verification:
The callback is automatically handled by the Supabase Auth UI component. Verify it works:

1. Check browser console for errors
2. Verify session in DevTools → Application → Cookies
3. Check if user redirected to dashboard

#### Success Criteria:
- [x] No callback errors in console
- [x] Session cookie present
- [x] User redirected successfully

---

## Phase 4: Database Integration

### Task 4.1: Verify Profile Creation
**Duration**: 10 minutes

#### Steps:
1. After successful GitHub login, check database:

```sql
-- Run in Supabase SQL Editor
SELECT
  id,
  email,
  full_name,
  avatar_url,
  provider,
  created_at
FROM public.profiles
WHERE provider = 'github'
ORDER BY created_at DESC
LIMIT 5;
```

2. Verify trigger created profile automatically:

```sql
-- Check if trigger exists
SELECT * FROM pg_trigger
WHERE tgname = 'on_auth_user_created';
```

#### Success Criteria:
- [x] Profile created in `profiles` table
- [x] Email matches GitHub email
- [x] Avatar URL populated from GitHub
- [x] Provider set to 'github'

---

### Task 4.2: Test Profile Data Sync
**Duration**: 15 minutes

#### Steps:
1. Check what data GitHub provides:

```typescript
// After login, inspect user metadata
const { data: { user } } = await supabase.auth.getUser();
console.log('GitHub data:', user?.user_metadata);
```

2. Verify fields:
   - `full_name` from `user_metadata.name`
   - `avatar_url` from `user_metadata.avatar_url`
   - `email` from `user_metadata.email`

3. Update profile if needed:

```sql
-- Manually update profile if data missing
UPDATE public.profiles
SET
  full_name = auth.users.raw_user_meta_data->>'name',
  avatar_url = auth.users.raw_user_meta_data->>'avatar_url'
FROM auth.users
WHERE profiles.id = auth.users.id
  AND profiles.provider = 'github';
```

#### Success Criteria:
- [x] Full name populated from GitHub
- [x] Avatar URL populated from GitHub
- [x] Email correctly stored

---

## Phase 5: Testing & Validation

### Task 5.1: End-to-End Testing
**Duration**: 30 minutes

#### Test Cases:

**Test 1: New User Sign Up**
- [ ] Click GitHub button
- [ ] Complete GitHub OAuth flow
- [ ] Verify profile created in database
- [ ] Verify session created
- [ ] Verify redirected to dashboard

**Test 2: Existing User Sign In**
- [ ] Sign out
- [ ] Click GitHub button again
- [ ] Verify existing profile updated (not duplicated)
- [ ] Verify session created
- [ ] Verify last_sign_in_at updated

**Test 3: Email Matching**
- [ ] Sign up with email/password using GitHub email
- [ ] Try to sign in with GitHub
- [ ] Verify accounts linked (not duplicate created)

**Test 4: Error Handling**
- [ ] Cancel GitHub consent screen
- [ ] Verify user redirected back to auth page
- [ ] Verify error message displayed
- [ ] No profile created

#### Success Criteria:
- [x] All test cases pass
- [x] No console errors
- [x] No duplicate profiles created
- [x] Error states handled gracefully

---

### Task 5.2: Security Validation
**Duration**: 15 minutes

#### Checks:
1. **HTTPS only in production**:
```bash
# Verify callback URL uses HTTPS
echo "Callback: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback"
```

2. **Client secret not exposed**:
```bash
# Check source code for hardcoded secrets
grep -r "client_secret" src/
# Should return NO results
```

3. **RLS policies active**:
```sql
-- Verify RLS enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename = 'profiles';
-- rowsecurity should be TRUE
```

4. **Session security**:
```typescript
// Check session stored as httpOnly cookie
const { data } = await supabase.auth.getSession();
console.log('Session secure:', data.session?.access_token.length > 0);
```

#### Success Criteria:
- [x] HTTPS enforced in production
- [x] No secrets in client code
- [x] RLS policies enabled
- [x] Sessions stored securely

---

## Phase 6: Production Deployment

### Task 6.1: Update GitHub OAuth App for Production
**Duration**: 10 minutes

#### Steps:
1. Go to GitHub OAuth app settings
2. Change callback URL from `http://localhost:54321/auth/v1/callback`
3. To: `https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback`
4. Update "Homepage URL" to production domain
5. Save changes

#### Success Criteria:
- [x] Production callback URL configured
- [x] Homepage URL points to production
- [x] Changes saved

---

### Task 6.2: Deploy to Production
**Duration**: 15 minutes

#### Steps:
1. Verify environment variables:

```bash
# Production .env should have:
VITE_SUPABASE_URL=https://dhesktsqhcxhqfjypulk.supabase.co
VITE_SUPABASE_ANON_KEY=<production-anon-key>
```

2. Build production bundle:

```bash
pnpm build
```

3. Deploy to hosting platform:

```bash
# Example for Vercel
vercel --prod

# Example for Netlify
netlify deploy --prod
```

4. Test on production URL

#### Success Criteria:
- [x] Production build successful
- [x] Deployment successful
- [x] GitHub login works on production URL

---

### Task 6.3: Production Testing
**Duration**: 20 minutes

#### Test on Production:
1. Navigate to production auth page
2. Click "Continue with GitHub"
3. Complete OAuth flow
4. Verify successful login
5. Check profile in production database

```sql
-- Check production profiles
SELECT COUNT(*)
FROM public.profiles
WHERE provider = 'github';
```

#### Success Criteria:
- [x] Production GitHub login works
- [x] Profiles created correctly
- [x] No errors in production logs

---

## Troubleshooting Guide

### Issue 1: "Redirect URI mismatch"
**Cause**: Callback URL in GitHub doesn't match Supabase callback
**Solution**:
```bash
# Verify exact match
GitHub OAuth App callback: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback
Supabase callback URL: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback
```

### Issue 2: "Invalid client_id"
**Cause**: Wrong client ID in Supabase config
**Solution**: Double-check client ID matches GitHub OAuth app

### Issue 3: "Profile not created"
**Cause**: Database trigger not working
**Solution**:
```sql
-- Check trigger exists
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Manually create if missing (from 00-auth-plan.md)
```

### Issue 4: "Session not persisting"
**Cause**: Cookie settings or RLS issues
**Solution**:
```typescript
// Verify session storage
const { data } = await supabase.auth.getSession();
console.log('Session:', data);
```

---

## Success Criteria Checklist

### GitHub OAuth App:
- [x] OAuth app created
- [x] Client ID and secret saved
- [x] Callback URL configured
- [x] Production URL set

### Supabase Configuration:
- [x] Provider enabled in dashboard
- [x] Credentials configured
- [x] Local config updated
- [x] Environment variables set

### Client Implementation:
- [x] Auth page updated with GitHub button
- [x] OAuth flow tested locally
- [x] Callback handled correctly
- [x] Session management working

### Database Integration:
- [x] Profile auto-creation working
- [x] Data sync verified
- [x] RLS policies active
- [x] No duplicate profiles

### Production:
- [x] Production callback configured
- [x] Deployed successfully
- [x] Production testing complete
- [x] No errors in logs

---

## Monitoring & Maintenance

### Weekly Checks:
1. Monitor GitHub login success rate
2. Check for authentication errors in logs
3. Verify profile creation rate

### Monthly Tasks:
1. Review GitHub OAuth app settings
2. Update scopes if needed
3. Check for security advisories

### Queries for Monitoring:

```sql
-- GitHub login statistics
SELECT
  DATE(created_at) as date,
  COUNT(*) as new_github_users
FROM public.profiles
WHERE provider = 'github'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Recent GitHub logins
SELECT
  p.email,
  p.full_name,
  s.session_started_at
FROM public.user_sessions s
JOIN public.profiles p ON p.id = s.user_id
WHERE s.provider = 'github'
ORDER BY s.session_started_at DESC
LIMIT 20;
```

---

## Resources

- **GitHub OAuth Documentation**: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps
- **Supabase Auth Docs**: https://supabase.com/docs/guides/auth/social-login/auth-github
- **GitHub Developer Settings**: https://github.com/settings/developers
- **Supabase Dashboard**: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/providers

---

## Next Steps

After completing GitHub implementation:
1. ✅ **Phase 1 Complete**: GitHub OAuth fully functional
2. ➡️ **Next**: Implement Google OAuth (see `02-google.md`)
3. ➡️ **Then**: Implement Facebook OAuth (see `02-facebook.md`)
4. ➡️ **Finally**: Implement Apple and LinkedIn

---

**Estimated Total Time**: 2-3 hours
**Complexity**: Low
**Dependencies**: Supabase project, GitHub account
**Status**: Ready to implement
