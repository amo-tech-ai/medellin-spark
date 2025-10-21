# Google OAuth Implementation Plan

## Overview
Complete implementation guide for Google social login in Medellin AI platform.

**Provider**: Google OAuth 2.0
**Priority**: High (Most commonly used provider)
**Estimated Time**: 2-3 hours
**Difficulty**: Easy-Medium

---

## Prerequisites Checklist

- [ ] Google Cloud Platform account
- [ ] Supabase project with authentication enabled
- [ ] Access to Supabase Dashboard
- [ ] Local development environment running
- [ ] **Database migration applied** (see Phase 0 below)

---


## Phase 0: Database Schema Setup (REQUIRED FIRST)

⚠️ **CRITICAL**: This phase MUST be completed before implementing Google OAuth. The migration adds required database fields that the OAuth implementation depends on.

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

## Phase 1: Google OAuth App Setup

### Task 1.1: Create Google Cloud Project
**Duration**: 10 minutes
**Location**: https://console.cloud.google.com

#### Steps:
1. Navigate to Google Cloud Console
2. Click "Select a project" → "New Project"
3. Fill in project details:
   - **Project name**: `Medellin AI` (or your preferred name)
   - **Organization**: (optional)
   - **Location**: (optional)
4. Click "Create"
5. Wait for project to be created
6. Select your new project from the dropdown

#### Success Criteria:
- [x] Google Cloud project created
- [x] Project ID noted (format: `medellin-ai-######`)
- [x] Project selected in console

---

### Task 1.2: Enable Google+ API
**Duration**: 5 minutes

#### Steps:
1. In Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on "Google+ API"
4. Click "Enable"
5. Wait for API to be enabled

#### Success Criteria:
- [x] Google+ API enabled
- [x] API appears in "Enabled APIs & services"

---

### Task 1.3: Configure OAuth Consent Screen
**Duration**: 15 minutes
**Location**: APIs & Services → OAuth consent screen

#### Steps:
1. Navigate to "OAuth consent screen"
2. Select **User Type**:
   - **Internal**: For Google Workspace users only
   - **External**: For anyone with a Google account (recommended)
3. Click "Create"

4. Fill in **App Information**:
   - **App name**: `Medellin AI`
   - **User support email**: Your email
   - **App logo**: (optional) Upload your logo (120x120px)

5. Fill in **App Domain**:
   - **Application home page**: `https://medellin-spark.com`
   - **Application privacy policy**: `https://medellin-spark.com/privacy`
   - **Application terms of service**: `https://medellin-spark.com/terms`

6. Fill in **Authorized domains**:
   - Add: `supabase.co`
   - Add: `medellin-spark.com` (your production domain)

7. Fill in **Developer contact information**:
   - Add your email address

8. Click "Save and Continue"

9. **Scopes** (Step 2):
   - Click "Add or Remove Scopes"
   - Select these scopes:
     - `openid`
     - `userinfo.email`
     - `userinfo.profile`
   - Click "Update"
   - Click "Save and Continue"

10. **Test users** (Step 3 - only for External):
    - Add test user emails if app is not published
    - Click "Save and Continue"

11. Review summary and click "Back to Dashboard"

#### Success Criteria:
- [x] Consent screen configured
- [x] Required scopes added (openid, email, profile)
- [x] Authorized domains added
- [x] Test users added (if External and unpublished)

---

### Task 1.4: Create OAuth 2.0 Client ID
**Duration**: 10 minutes
**Location**: APIs & Services → Credentials

#### Steps:
1. Navigate to "Credentials"
2. Click "+ Create Credentials" → "OAuth client ID"
3. Select **Application type**: "Web application"
4. Fill in details:
   - **Name**: `Medellin AI Web Client`

5. **Authorized JavaScript origins**:
   - Add: `http://localhost:8080` (for local testing)
   - Add: `https://medellin-spark.com` (production)

6. **Authorized redirect URIs**:
   - Add: `https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback`
   - Add: `http://localhost:54321/auth/v1/callback` (for local Supabase)

7. Click "Create"

8. **Save credentials** (shown once):
   - Copy **Client ID** (format: `######.apps.googleusercontent.com`)
   - Copy **Client Secret**
   - Store securely (password manager recommended)

#### Success Criteria:
- [x] OAuth client created
- [x] Client ID saved securely
- [x] Client Secret saved securely
- [x] Redirect URIs configured correctly

#### Verification:
```bash
# Verify callback URL format
echo "Production: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback"
echo "Local: http://localhost:54321/auth/v1/callback"
```

---

## Phase 2: Supabase Configuration

### Task 2.1: Enable Google Provider in Dashboard
**Duration**: 10 minutes
**Location**: Supabase Dashboard

#### Steps:
1. Go to https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk
2. Navigate to Authentication → Providers
3. Find **Google** in the provider list
4. Toggle **Google Enabled** to ON
5. Paste **Client ID** from Task 1.4
6. Paste **Client Secret** from Task 1.4
7. (Optional) Enable **Skip nonce check** if needed
8. Click **Save**

#### Success Criteria:
- [x] Google provider enabled
- [x] Client credentials configured
- [x] Changes saved successfully

#### Verification:
```bash
# Check provider status via API
curl https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/settings \
  | jq '.external.google'
```

---

### Task 2.2: Configure for Local Development
**Duration**: 10 minutes
**Location**: Local Supabase config

#### Steps:
1. Create/update `supabase/config.toml`:

```toml
[auth.external.google]
enabled = true
client_id = "env(GOOGLE_CLIENT_ID)"
secret = "env(GOOGLE_CLIENT_SECRET)"
# Optional: Skip nonce verification
skip_nonce_check = false
```

2. Add to `.env.local`:

```bash
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
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

### Task 2.3: Configure Google One-Tap (Optional)
**Duration**: 15 minutes

#### Steps:
1. In your Auth page component, add Google One-Tap configuration:

```typescript
// src/pages/Auth.tsx
import { useEffect } from 'react';

const Auth = () => {
  useEffect(() => {
    // Load Google One-Tap script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google?.accounts.id.initialize({
        client_id: 'your-client-id.apps.googleusercontent.com',
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      window.google?.accounts.id.prompt();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = async (response: any) => {
    const { error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
      nonce: 'NONCE', // Generate proper nonce
    });

    if (error) {
      console.error('Google One-Tap error:', error);
    }
  };

  // ... rest of component
};
```

2. Generate proper nonce for security:

```typescript
// Generate cryptographically secure nonce
const generateNonce = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};
```

#### Success Criteria:
- [x] Google One-Tap script loaded
- [x] One-Tap prompt appears on auth page
- [x] Nonce generation implemented
- [x] Token exchange working

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

2. Verify Google is in providers array:

```typescript
<SupabaseAuth
  supabaseClient={supabase}
  appearance={{ theme: ThemeSupa }}
  providers={['google', 'github']}  // ← Google included
  redirectTo={window.location.origin + '/dashboard'}
/>
```

3. If not present, add 'google' to providers array
4. Save and test

#### Success Criteria:
- [x] Google button appears on auth page
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
3. Click "Continue with Google" button
4. Should redirect to Google consent screen
5. Select Google account
6. Review permissions (email, profile)
7. Click "Allow"
8. Should redirect back to app

#### Expected Flow:
```
User clicks Google button
  ↓
Redirect to: https://accounts.google.com/o/oauth2/v2/auth?
  client_id=...
  redirect_uri=http://localhost:8080/auth/callback
  response_type=code
  scope=openid email profile
  state=...
  ↓
User approves access
  ↓
Redirect to: http://localhost:8080/auth/callback?code=...&state=...
  ↓
Supabase exchanges code for tokens
  ↓
User profile created/updated
  ↓
Redirect to dashboard
```

#### Success Criteria:
- [x] Google consent screen displays
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
1. After successful Google login, check database:

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
WHERE provider = 'google'
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
- [x] Email matches Google email
- [x] Avatar URL populated from Google
- [x] Provider set to 'google'

---

### Task 4.2: Test Profile Data Sync
**Duration**: 15 minutes

#### Steps:
1. Check what data Google provides:

```typescript
// After login, inspect user metadata
const { data: { user } } = await supabase.auth.getUser();
console.log('Google data:', user?.user_metadata);

// Expected structure:
{
  email: "user@gmail.com",
  email_verified: true,
  name: "John Doe",
  picture: "https://lh3.googleusercontent.com/...",
  sub: "google-oauth2|###############"
}
```

2. Verify fields:
   - `full_name` from `user_metadata.name`
   - `avatar_url` from `user_metadata.picture`
   - `email` from `user_metadata.email`

3. Update profile if needed:

```sql
-- Manually update profile if data missing
UPDATE public.profiles
SET
  full_name = auth.users.raw_user_meta_data->>'name',
  avatar_url = auth.users.raw_user_meta_data->>'picture'
FROM auth.users
WHERE profiles.id = auth.users.id
  AND profiles.provider = 'google';
```

#### Success Criteria:
- [x] Full name populated from Google
- [x] Avatar URL populated from Google
- [x] Email correctly stored
- [x] Email verified status stored

---

### Task 4.3: Test Provider Token Extraction
**Duration**: 10 minutes

#### Steps:
1. Extract Google access token for API calls:

```typescript
const { data: { session } } = await supabase.auth.getSession();
const googleAccessToken = session?.provider_token;
const googleRefreshToken = session?.provider_refresh_token;

console.log('Google access token:', googleAccessToken);
console.log('Google refresh token:', googleRefreshToken);
```

2. Use token to call Google APIs:

```typescript
// Example: Get Google Calendar events
const response = await fetch(
  'https://www.googleapis.com/calendar/v3/calendars/primary/events',
  {
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
  }
);
```

3. Store tokens in database:

```sql
-- Update oauth_connections table
INSERT INTO public.oauth_connections (
  user_id,
  provider,
  provider_user_id,
  access_token,
  refresh_token,
  expires_at
) VALUES (
  auth.uid(),
  'google',
  (SELECT raw_user_meta_data->>'sub' FROM auth.users WHERE id = auth.uid()),
  'access_token',
  'refresh_token',
  NOW() + INTERVAL '1 hour'
);
```

#### Success Criteria:
- [x] Access token extracted
- [x] Refresh token stored (if `access_type: 'offline'`)
- [x] Token expiry tracked
- [x] Token refresh working

---

## Phase 5: Testing & Validation

### Task 5.1: End-to-End Testing
**Duration**: 30 minutes

#### Test Cases:

**Test 1: New User Sign Up**
- [ ] Click Google button
- [ ] Complete Google OAuth flow
- [ ] Verify profile created in database
- [ ] Verify session created
- [ ] Verify redirected to dashboard

**Test 2: Existing User Sign In**
- [ ] Sign out
- [ ] Click Google button again
- [ ] Verify existing profile updated (not duplicated)
- [ ] Verify session created
- [ ] Verify last_sign_in_at updated

**Test 3: Email Matching**
- [ ] Sign up with email/password using Google email
- [ ] Try to sign in with Google
- [ ] Verify accounts linked (not duplicate created)

**Test 4: Error Handling**
- [ ] Cancel Google consent screen
- [ ] Verify user redirected back to auth page
- [ ] Verify error message displayed
- [ ] No profile created

**Test 5: Nonce Validation**
- [ ] Verify nonce generated for each request
- [ ] Verify nonce validated in callback
- [ ] Verify replay attacks prevented

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

5. **Nonce security**:
```typescript
// Verify nonce is cryptographically secure
const nonce = generateNonce();
console.log('Nonce length:', nonce.length); // Should be 64 chars (32 bytes hex)
```

#### Success Criteria:
- [x] HTTPS enforced in production
- [x] No secrets in client code
- [x] RLS policies enabled
- [x] Sessions stored securely
- [x] Nonce properly implemented

---

## Phase 6: Production Deployment

### Task 6.1: Update Google OAuth App for Production
**Duration**: 10 minutes

#### Steps:
1. Go to Google Cloud Console → Credentials
2. Click your OAuth client
3. Verify **Authorized JavaScript origins**:
   - Remove: `http://localhost:8080` (if present)
   - Keep: `https://medellin-spark.com`
4. Verify **Authorized redirect URIs**:
   - Remove: `http://localhost:54321/auth/v1/callback`
   - Keep: `https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback`
5. Click "Save"

#### Success Criteria:
- [x] Production origins configured
- [x] Production callback URL configured
- [x] Local URLs removed (optional)
- [x] Changes saved

---

### Task 6.2: Publish OAuth Consent Screen (If External)
**Duration**: Variable (can take days for Google review)

#### Steps:
1. Go to OAuth consent screen
2. Review all information
3. Click "Publish App"
4. Submit for verification if using sensitive/restricted scopes
5. Wait for Google review (1-4 weeks typically)

**Note**: You can use the app with test users while verification is pending

#### Success Criteria:
- [x] App published
- [x] Verification submitted (if required)
- [x] Test users can access while pending

---

### Task 6.3: Deploy to Production
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
- [x] Google login works on production URL

---

### Task 6.4: Production Testing
**Duration**: 20 minutes

#### Test on Production:
1. Navigate to production auth page
2. Click "Continue with Google"
3. Complete OAuth flow
4. Verify successful login
5. Check profile in production database

```sql
-- Check production profiles
SELECT COUNT(*)
FROM public.profiles
WHERE provider = 'google';
```

#### Success Criteria:
- [x] Production Google login works
- [x] Profiles created correctly
- [x] No errors in production logs

---

## Troubleshooting Guide

### Issue 1: "Redirect URI mismatch"
**Cause**: Callback URL in Google doesn't match Supabase callback
**Solution**:
```bash
# Verify exact match
Google OAuth callback: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback
Supabase callback URL: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback
```

### Issue 2: "Invalid client_id"
**Cause**: Wrong client ID in Supabase config
**Solution**: Double-check client ID matches Google OAuth app

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

### Issue 5: "Nonce verification failed"
**Cause**: Nonce mismatch or not properly generated
**Solution**:
```typescript
// Enable skip_nonce_check temporarily for debugging
// In supabase/config.toml:
[auth.external.google]
skip_nonce_check = true  # Only for debugging!
```

### Issue 6: "Access denied" during consent
**Cause**: App not published or user not in test users list
**Solution**: Add user to test users or publish app

---

## Success Criteria Checklist

### Google OAuth App:
- [x] Google Cloud project created
- [x] OAuth consent screen configured
- [x] OAuth client created
- [x] Client ID and secret saved
- [x] Redirect URIs configured
- [x] Production URLs set

### Supabase Configuration:
- [x] Provider enabled in dashboard
- [x] Credentials configured
- [x] Local config updated
- [x] Environment variables set

### Client Implementation:
- [x] Auth page updated with Google button
- [x] OAuth flow tested locally
- [x] Callback handled correctly
- [x] Session management working
- [x] One-Tap implemented (optional)

### Database Integration:
- [x] Profile auto-creation working
- [x] Data sync verified
- [x] Provider tokens stored
- [x] RLS policies active
- [x] No duplicate profiles

### Production:
- [x] Production origins configured
- [x] Consent screen published (if required)
- [x] Deployed successfully
- [x] Production testing complete
- [x] No errors in logs

---

## Monitoring & Maintenance

### Weekly Checks:
1. Monitor Google login success rate
2. Check for authentication errors in logs
3. Verify profile creation rate
4. Monitor token refresh failures

### Monthly Tasks:
1. Review Google OAuth app settings
2. Check for security advisories
3. Verify consent screen information current
4. Review authorized domains

### Queries for Monitoring:

```sql
-- Google login statistics
SELECT
  DATE(created_at) as date,
  COUNT(*) as new_google_users
FROM public.profiles
WHERE provider = 'google'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Recent Google logins
SELECT
  p.email,
  p.full_name,
  s.session_started_at
FROM public.user_sessions s
JOIN public.profiles p ON p.id = s.user_id
WHERE s.provider = 'google'
ORDER BY s.session_started_at DESC
LIMIT 20;

-- Token expiry tracking
SELECT
  user_id,
  provider,
  expires_at,
  CASE
    WHEN expires_at < NOW() THEN 'expired'
    WHEN expires_at < NOW() + INTERVAL '1 day' THEN 'expiring_soon'
    ELSE 'valid'
  END as status
FROM public.oauth_connections
WHERE provider = 'google'
ORDER BY expires_at;
```

---

## Resources

- **Google OAuth Documentation**: https://developers.google.com/identity/protocols/oauth2
- **Google Cloud Console**: https://console.cloud.google.com
- **Supabase Google Auth Docs**: https://supabase.com/docs/guides/auth/social-login/auth-google
- **Google One-Tap Docs**: https://developers.google.com/identity/gsi/web/guides/overview
- **Supabase Dashboard**: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/providers

---

## Next Steps

After completing Google implementation:
1. ✅ **Phase 1 Complete**: Google OAuth fully functional
2. ➡️ **Next**: Implement GitHub OAuth (see `03-github.md`)
3. ➡️ **Then**: Implement Facebook OAuth (see `06-facebook-implementation.md`)
4. ➡️ **Finally**: Implement Apple and LinkedIn

---

**Estimated Total Time**: 2-3 hours
**Complexity**: Easy-Medium
**Dependencies**: Supabase project, Google Cloud account
**Status**: Ready to implement
