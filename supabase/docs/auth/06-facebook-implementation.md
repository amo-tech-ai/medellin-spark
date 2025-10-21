# Facebook OAuth Implementation Plan

## Overview
Complete implementation guide for Facebook social login in Medellin AI platform.

**Provider**: Facebook OAuth 2.0
**Priority**: Medium (Popular with general audience)
**Estimated Time**: 2-3 hours
**Difficulty**: Easy-Medium

---

## Prerequisites Checklist

- [ ] Facebook account
- [ ] Supabase project with authentication enabled
- [ ] Access to Supabase Dashboard
- [ ] Local development environment running
- [ ] Business verification for production (may be required)
- [ ] **Database migration applied** (see Phase 0 below)

---


## Phase 0: Database Schema Setup (REQUIRED FIRST)

⚠️ **CRITICAL**: This phase MUST be completed before implementing Facebook OAuth. The migration adds required database fields that the OAuth implementation depends on.

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

## Phase 1: Facebook OAuth App Setup

### Task 1.1: Create Facebook Developer Account
**Duration**: 10 minutes
**Location**: https://developers.facebook.com

#### Steps:
1. Navigate to Facebook for Developers
2. Click "Get Started" (if first time)
3. Log in with your Facebook account
4. Complete developer registration:
   - Accept Developer Terms
   - Verify email if prompted
   - Complete security check if prompted

#### Success Criteria:
- [x] Developer account created
- [x] Email verified
- [x] Terms accepted

---

### Task 1.2: Create Facebook App
**Duration**: 15 minutes
**Location**: https://developers.facebook.com/apps

#### Steps:
1. Click "Create App"
2. Select app type: **Consumer** (or "None" if no specific type)
3. Click "Next"

4. Fill in app details:
   - **Display Name**: `Medellin AI`
   - **App Contact Email**: Your email
   - **Business Account**: (optional)

5. Click "Create App"
6. Complete security check
7. Note your **App ID** (shown on dashboard)
8. Note your **App Secret** (Settings → Basic)

#### Success Criteria:
- [x] Facebook app created
- [x] App ID saved securely
- [x] App Secret saved securely

#### Verification:
```bash
# Your credentials should look like:
App ID: 1234567890123456
App Secret: abcdef0123456789abcdef0123456789
```

---

### Task 1.3: Add Facebook Login Product
**Duration**: 10 minutes

#### Steps:
1. In your app dashboard, find **Add Products**
2. Locate **Facebook Login**
3. Click "Set Up"
4. Select platform: **Web**
5. Enter Site URL: `https://medellin-spark.com`
6. Click "Save"
7. Click "Continue" through quickstart (can skip for now)

#### Success Criteria:
- [x] Facebook Login product added
- [x] Web platform selected
- [x] Site URL configured

---

### Task 1.4: Configure Facebook Login Settings
**Duration**: 10 minutes
**Location**: Facebook Login → Settings

#### Steps:
1. Go to Products → Facebook Login → Settings

2. **Client OAuth Settings**:
   - **Client OAuth Login**: Yes
   - **Web OAuth Login**: Yes
   - **Force Web OAuth Reauthentication**: No
   - **Use Strict Mode for Redirect URIs**: Yes
   - **Enforce HTTPS**: Yes

3. **Valid OAuth Redirect URIs**:
   - Add: `https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback`
   - Add: `http://localhost:54321/auth/v1/callback` (for local testing)

4. **Deauthorize Callback URL**: (optional)
   - Add: `https://medellin-spark.com/auth/facebook/deauthorize`

5. **Data Deletion Request URL**: (optional but recommended)
   - Add: `https://medellin-spark.com/auth/facebook/delete`

6. Click "Save Changes"

#### Success Criteria:
- [x] OAuth settings configured
- [x] Redirect URIs added
- [x] HTTPS enforced
- [x] Changes saved

---

### Task 1.5: Configure App Domains
**Duration**: 5 minutes
**Location**: Settings → Basic

#### Steps:
1. Go to Settings → Basic
2. Scroll to **App Domains**
3. Add domains:
   - `medellin-spark.com`
   - `supabase.co`
   - `localhost` (for testing)
4. Click "Save Changes"

#### Success Criteria:
- [x] App domains configured
- [x] Production domain added
- [x] Supabase domain added

---

### Task 1.6: Set App to Development Mode
**Duration**: 5 minutes

#### Steps:
1. In app dashboard, check status toggle at top
2. Should show "In Development" initially
3. Keep in development mode for testing
4. **Note**: Only you and test users can access the app in this mode

#### Success Criteria:
- [x] App in development mode
- [x] Status verified

---

## Phase 2: Supabase Configuration

### Task 2.1: Enable Facebook Provider in Dashboard
**Duration**: 10 minutes
**Location**: Supabase Dashboard

#### Steps:
1. Go to https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk
2. Navigate to Authentication → Providers
3. Find **Facebook** in the provider list
4. Toggle **Facebook Enabled** to ON
5. Paste **App ID** from Task 1.2
6. Paste **App Secret** from Task 1.2
7. Click **Save**

#### Success Criteria:
- [x] Facebook provider enabled
- [x] App credentials configured
- [x] Changes saved successfully

#### Verification:
```bash
# Check provider status via API
curl https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/settings \
  | jq '.external.facebook'
```

---

### Task 2.2: Configure for Local Development
**Duration**: 10 minutes
**Location**: Local Supabase config

#### Steps:
1. Create/update `supabase/config.toml`:

```toml
[auth.external.facebook]
enabled = true
client_id = "env(FACEBOOK_APP_ID)"
secret = "env(FACEBOOK_APP_SECRET)"
# Optional: Request specific permissions
# redirect_uri = "http://localhost:54321/auth/v1/callback"
```

2. Add to `.env.local`:

```bash
FACEBOOK_APP_ID="1234567890123456"
FACEBOOK_APP_SECRET="your-app-secret"
```

3. Restart local Supabase:

```bash
npx supabase stop
npx supabase start
```

#### Success Criteria:
- [x] Local config file updated
- [x] Environment variables set
- [x] Local Supabase restarted successfully

---

### Task 2.3: Configure Permissions Scope
**Duration**: 5 minutes

#### Steps:
Default permissions requested:
- `public_profile` - User's name, profile picture
- `email` - User's email address

Additional permissions (require app review):
- `user_birthday`
- `user_location`
- `user_hometown`
- `user_photos`

**Note**: Stick to default permissions unless you need specific data

#### Success Criteria:
- [x] Permissions scope understood
- [x] Default permissions sufficient for initial implementation

---

## Phase 3: Client Implementation

### Task 3.1: Verify Auth Page Component
**Duration**: 10 minutes
**Location**: `src/pages/Auth.tsx`

#### Steps:
1. Read current Auth page:

```bash
cat src/pages/Auth.tsx
```

2. Add Facebook to providers array:

```typescript
<SupabaseAuth
  supabaseClient={supabase}
  appearance={{ theme: ThemeSupa }}
  providers={['google', 'github', 'facebook']}  // ← Add Facebook
  redirectTo={window.location.origin + '/dashboard'}
/>
```

3. Save and test

#### Success Criteria:
- [x] Facebook button appears on auth page
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
3. Click "Continue with Facebook" button
4. Should redirect to Facebook login
5. Enter Facebook credentials
6. Review permissions requested
7. Click "Continue" to approve
8. Should redirect back to app

#### Expected Flow:
```
User clicks Facebook button
  ↓
Redirect to: https://www.facebook.com/v18.0/dialog/oauth?
  client_id=...
  redirect_uri=http://localhost:8080/auth/callback
  response_type=code
  scope=public_profile,email
  state=...
  ↓
User logs in and approves
  ↓
Redirect to: http://localhost:8080/auth/callback?code=...&state=...
  ↓
Supabase exchanges code for token
  ↓
User profile created/updated
  ↓
Redirect to dashboard
```

#### Success Criteria:
- [x] Facebook login screen displays
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
1. After successful Facebook login, check database:

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
WHERE provider = 'facebook'
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
- [x] Email matches Facebook email
- [x] Avatar URL populated from Facebook
- [x] Provider set to 'facebook'

---

### Task 4.2: Test Profile Data Sync
**Duration**: 15 minutes

#### Steps:
1. Check what data Facebook provides:

```typescript
// After login, inspect user metadata
const { data: { user } } = await supabase.auth.getUser();
console.log('Facebook data:', user?.user_metadata);

// Expected structure:
{
  email: "user@example.com",
  name: "John Doe",
  picture: {
    data: {
      url: "https://platform-lookaside.fbsbx.com/platform/profilepic/..."
    }
  },
  sub: "facebook|###############"
}
```

2. Verify fields:
   - `full_name` from `user_metadata.name`
   - `avatar_url` from `user_metadata.picture.data.url`
   - `email` from `user_metadata.email`

3. Update profile if needed:

```sql
-- Manually update profile if data missing
UPDATE public.profiles
SET
  full_name = auth.users.raw_user_meta_data->>'name',
  avatar_url = auth.users.raw_user_meta_data->'picture'->'data'->>'url'
FROM auth.users
WHERE profiles.id = auth.users.id
  AND profiles.provider = 'facebook';
```

#### Success Criteria:
- [x] Full name populated from Facebook
- [x] Avatar URL populated from Facebook
- [x] Email correctly stored

---

### Task 4.3: Handle Missing Email
**Duration**: 10 minutes

**Important**: Some Facebook users don't have email addresses or don't share them

#### Steps:
1. Handle missing email case:

```typescript
// Check if email is present
const { data: { user } } = await supabase.auth.getUser();

if (!user?.email) {
  // Prompt user to provide email
  // Or use Facebook ID as identifier
  console.log('No email from Facebook, using provider ID');
}
```

2. Update profile trigger to handle no email:

```sql
-- Allow null emails from Facebook
ALTER TABLE public.profiles
ALTER COLUMN email DROP NOT NULL;

-- Or require email collection
-- Show UI to collect email if missing
```

#### Success Criteria:
- [x] Missing email handled gracefully
- [x] User can still sign in without email
- [x] Alternative identifier used (Facebook ID)

---

## Phase 5: Testing & Validation

### Task 5.1: End-to-End Testing
**Duration**: 30 minutes

#### Test Cases:

**Test 1: New User Sign Up**
- [ ] Click Facebook button
- [ ] Complete Facebook OAuth flow
- [ ] Verify profile created in database
- [ ] Verify session created
- [ ] Verify redirected to dashboard

**Test 2: Existing User Sign In**
- [ ] Sign out
- [ ] Click Facebook button again
- [ ] Verify existing profile updated (not duplicated)
- [ ] Verify session created
- [ ] Verify last_sign_in_at updated

**Test 3: Email Matching**
- [ ] Sign up with email/password using Facebook email
- [ ] Try to sign in with Facebook
- [ ] Verify accounts linked (not duplicate created)

**Test 4: No Email Case**
- [ ] Use Facebook account without public email
- [ ] Verify sign-in works
- [ ] Verify profile created with Facebook ID

**Test 5: Error Handling**
- [ ] Cancel Facebook login
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

2. **App secret not exposed**:
```bash
# Check source code for hardcoded secrets
grep -r "app_secret" src/
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

### Task 6.1: Add Test Users (Development Mode)
**Duration**: 10 minutes
**Location**: Roles → Test Users

#### Steps:
1. Go to app dashboard → Roles → Test Users
2. Click "Add Testers"
3. Enter Facebook user IDs or names
4. Send invitations
5. Test users must accept invitation

**Note**: While in development mode, only admins, developers, and testers can use the app

#### Success Criteria:
- [x] Test users added
- [x] Invitations sent
- [x] Test users can login

---

### Task 6.2: Submit App for Review
**Duration**: Variable (review can take 1-2 weeks)

#### Steps:
1. **Complete App Review Preparation**:
   - Add app icon (1024x1024px)
   - Add privacy policy URL
   - Add terms of service URL
   - Add data deletion instructions URL
   - Complete business verification (if required)

2. **Request Permissions**:
   - Go to App Review → Permissions and Features
   - Request `email` permission (if not default)
   - Request `public_profile` permission (usually default)

3. **Provide Verification Details**:
   - Screencast showing app usage
   - Test user credentials
   - Detailed description of how you use Facebook Login

4. **Submit for Review**:
   - Click "Submit for Review"
   - Wait for Facebook review team

**Note**: You can continue using the app with test users while review is pending

#### Success Criteria:
- [x] App review submitted
- [x] All required documentation provided
- [x] Can use with test users while pending

---

### Task 6.3: Switch to Live Mode
**Duration**: 5 minutes (after approval)

#### Steps:
1. After app approval, go to app dashboard
2. Toggle status from "In Development" to "Live"
3. Confirm the change
4. App is now public

**Warning**: Only switch to Live after approval and thorough testing

#### Success Criteria:
- [x] App approved by Facebook
- [x] Switched to Live mode
- [x] Public users can sign in

---

### Task 6.4: Update Facebook Login Settings for Production
**Duration**: 10 minutes

#### Steps:
1. Go to Facebook Login → Settings
2. Remove local testing URLs:
   - Remove: `http://localhost:54321/auth/v1/callback`
3. Verify production URL present:
   - Keep: `https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback`
4. Update Site URL in Settings → Basic:
   - Change to: `https://medellin-spark.com`
5. Click "Save Changes"

#### Success Criteria:
- [x] Production callback URL configured
- [x] Local URLs removed
- [x] Site URL updated
- [x] Changes saved

---

### Task 6.5: Deploy to Production
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
- [x] Facebook login works on production URL

---

### Task 6.6: Production Testing
**Duration**: 20 minutes

#### Test on Production:
1. Navigate to production auth page
2. Click "Continue with Facebook"
3. Complete OAuth flow
4. Verify successful login
5. Check profile in production database

```sql
-- Check production profiles
SELECT COUNT(*)
FROM public.profiles
WHERE provider = 'facebook';
```

#### Success Criteria:
- [x] Production Facebook login works
- [x] Profiles created correctly
- [x] No errors in production logs

---

## Troubleshooting Guide

### Issue 1: "URL Blocked: This redirect failed"
**Cause**: Redirect URI not in allowed list
**Solution**:
```bash
# Verify exact match in Facebook Login Settings
Configured: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback
Expected: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback
```

### Issue 2: "App Not Setup: This app is still in development mode"
**Cause**: App in development mode and user not a tester
**Solution**: Add user as tester or switch app to Live mode (after approval)

### Issue 3: "Invalid App ID"
**Cause**: Wrong App ID in Supabase config
**Solution**: Double-check App ID matches Facebook app

### Issue 4: "Profile not created"
**Cause**: Database trigger not working
**Solution**:
```sql
-- Check trigger exists
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Manually create if missing (from 00-auth-plan.md)
```

### Issue 5: "Email is null"
**Cause**: User's Facebook account doesn't have email or didn't grant permission
**Solution**:
```typescript
// Handle missing email
if (!user?.email) {
  // Use Facebook ID as identifier
  // Or prompt user to provide email
}
```

### Issue 6: "Session not persisting"
**Cause**: Cookie settings or RLS issues
**Solution**:
```typescript
// Verify session storage
const { data } = await supabase.auth.getSession();
console.log('Session:', data);
```

---

## Success Criteria Checklist

### Facebook App:
- [x] Developer account created
- [x] Facebook app created
- [x] Facebook Login product added
- [x] App ID and secret saved
- [x] Redirect URIs configured
- [x] App domains configured
- [x] Privacy policy added
- [x] App reviewed and approved (for production)

### Supabase Configuration:
- [x] Provider enabled in dashboard
- [x] Credentials configured
- [x] Local config updated
- [x] Environment variables set

### Client Implementation:
- [x] Auth page updated with Facebook button
- [x] OAuth flow tested locally
- [x] Callback handled correctly
- [x] Session management working

### Database Integration:
- [x] Profile auto-creation working
- [x] Data sync verified
- [x] Missing email handled
- [x] RLS policies active
- [x] No duplicate profiles

### Production:
- [x] Test users added (development)
- [x] App review submitted
- [x] App approved
- [x] Live mode enabled
- [x] Production callback configured
- [x] Deployed successfully
- [x] Production testing complete
- [x] No errors in logs

---

## Monitoring & Maintenance

### Weekly Checks:
1. Monitor Facebook login success rate
2. Check for authentication errors in logs
3. Verify profile creation rate
4. Check for API version deprecations

### Monthly Tasks:
1. Review Facebook app settings
2. Check for security advisories
3. Update Graph API version if needed
4. Review permissions and scopes

### Queries for Monitoring:

```sql
-- Facebook login statistics
SELECT
  DATE(created_at) as date,
  COUNT(*) as new_facebook_users
FROM public.profiles
WHERE provider = 'facebook'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Recent Facebook logins
SELECT
  p.email,
  p.full_name,
  s.session_started_at
FROM public.user_sessions s
JOIN public.profiles p ON p.id = s.user_id
WHERE s.provider = 'facebook'
ORDER BY s.session_started_at DESC
LIMIT 20;

-- Profiles with missing email (Facebook)
SELECT
  id,
  full_name,
  provider_id,
  created_at
FROM public.profiles
WHERE provider = 'facebook'
  AND (email IS NULL OR email = '')
ORDER BY created_at DESC;
```

---

## Resources

- **Facebook Login Documentation**: https://developers.facebook.com/docs/facebook-login
- **Facebook Developers**: https://developers.facebook.com
- **Supabase Facebook Auth Docs**: https://supabase.com/docs/guides/auth/social-login/auth-facebook
- **Graph API Explorer**: https://developers.facebook.com/tools/explorer
- **Supabase Dashboard**: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/providers

---

## Next Steps

After completing Facebook implementation:
1. ✅ **Phase 2 Complete**: Facebook OAuth fully functional
2. ➡️ **Next**: Implement Apple Sign-In (see `07-apple-implementation.md`)
3. ➡️ **Then**: Implement LinkedIn OIDC (see `08-linkedin-implementation.md`)

---

**Estimated Total Time**: 2-3 hours (+ app review time)
**Complexity**: Easy-Medium
**Dependencies**: Supabase project, Facebook developer account, Business verification (for production)
**Status**: Ready to implement
