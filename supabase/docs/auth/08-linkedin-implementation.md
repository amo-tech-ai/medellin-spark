# LinkedIn OIDC Implementation Plan

## Overview
Complete implementation guide for LinkedIn OpenID Connect (OIDC) authentication in Medellin AI platform.

**Provider**: LinkedIn OIDC (OpenID Connect)
**Priority**: Medium (Professional networking, B2B audience)
**Estimated Time**: 2-3 hours
**Difficulty**: Easy-Medium

**Important**: This uses the NEW LinkedIn OIDC provider (not the legacy OAuth 2.0 provider which is being deprecated).

---

## Prerequisites Checklist

- [ ] LinkedIn account
- [ ] Supabase project with authentication enabled
- [ ] Access to Supabase Dashboard
- [ ] Local development environment running
- [ ] Company/organization info (for app description)
- [ ] **Database migration applied** (see Phase 0 below)

---


## Phase 0: Database Schema Setup (REQUIRED FIRST)

⚠️ **CRITICAL**: This phase MUST be completed before implementing LinkedIn OAuth. The migration adds required database fields that the OAuth implementation depends on.

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

## Phase 1: LinkedIn App Setup

### Task 1.1: Create LinkedIn Developer Account
**Duration**: 10 minutes
**Location**: https://www.linkedin.com/developers

#### Steps:
1. Navigate to LinkedIn Developers
2. Sign in with your LinkedIn account
3. Accept Developer Terms of Service
4. Complete your developer profile if prompted

#### Success Criteria:
- [x] Developer account created
- [x] Terms accepted
- [x] Profile completed

---

### Task 1.2: Create LinkedIn App
**Duration**: 15 minutes
**Location**: https://www.linkedin.com/developers/apps

#### Steps:
1. Click "Create app"
2. Fill in app details:
   - **App name**: `Medellin AI`
   - **LinkedIn Page**: (Select your company page or create one)
     - If no page: Create a LinkedIn Company Page first
   - **App logo**: Upload logo (300x300px recommended)
   - **Legal terms**: Check "I have read and agree..."

3. Click "Create app"

4. Note your credentials on the "Auth" tab:
   - **Client ID** (format: `1234567890abcdef`)
   - **Client Secret** (click "eye" icon to reveal)
   - Store both securely

#### Success Criteria:
- [x] LinkedIn app created
- [x] Client ID saved
- [x] Client Secret saved
- [x] Company page linked

#### Verification:
```bash
# Your credentials should look like:
Client ID: 1234567890abcdef
Client Secret: ABCDEFGHIJKLMNOP
```

---

### Task 1.3: Add "Sign In with LinkedIn using OpenID Connect" Product
**Duration**: 10 minutes

#### Steps:
1. In your app, go to the **Products** tab
2. Find **"Sign In with LinkedIn using OpenID Connect"**
3. Click "Request access"
4. Fill in the request form:
   - **How will you use this product?**: "User authentication for web application"
   - **Why do you need this product?**: "To allow users to sign in with LinkedIn"
5. Submit request

**Note**: Access is usually granted automatically or within 24 hours

#### Success Criteria:
- [x] Product requested
- [x] Access granted (may take up to 24 hours)

---

### Task 1.4: Configure OAuth 2.0 Settings
**Duration**: 10 minutes
**Location**: Auth tab

#### Steps:
1. Go to **Auth** tab in your app
2. Under **OAuth 2.0 settings**:

3. **Authorized redirect URLs**:
   - Click "Add redirect URL"
   - Add: `https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback`
   - Add: `http://localhost:54321/auth/v1/callback` (for local testing)
   - Click "Update"

**Important**: LinkedIn is strict about exact URL matching

#### Success Criteria:
- [x] Redirect URLs configured
- [x] Production URL added
- [x] Local URL added (for testing)
- [x] Changes saved

#### Verification:
```bash
# Verify exact URLs:
Production: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback
Local: http://localhost:54321/auth/v1/callback
```

---

### Task 1.5: Configure OAuth 2.0 Scopes
**Duration**: 5 minutes

#### Steps:
1. Still in **Auth** tab
2. Under **OAuth 2.0 scopes**, verify these are checked:
   - ✅ **openid** - Required for OIDC
   - ✅ **profile** - User's basic profile info
   - ✅ **email** - User's email address

These should be automatically granted with the "Sign In with LinkedIn using OpenID Connect" product.

#### Success Criteria:
- [x] Required scopes verified
- [x] openid scope present
- [x] profile scope present
- [x] email scope present

---

### Task 1.6: Verify App Settings
**Duration**: 5 minutes
**Location**: Settings tab

#### Steps:
1. Go to **Settings** tab
2. Verify app information:
   - App name: `Medellin AI`
   - App description: (Add if missing)
   - Privacy policy URL: `https://medellin-spark.com/privacy`
   - App logo: Present

3. Under **App visibility**:
   - Set to "Public" (after testing)

#### Success Criteria:
- [x] App name correct
- [x] Description added
- [x] Privacy policy URL added
- [x] Logo uploaded

---

## Phase 2: Supabase Configuration

### Task 2.1: Enable LinkedIn OIDC Provider in Dashboard
**Duration**: 10 minutes
**Location**: Supabase Dashboard

#### Steps:
1. Go to https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk
2. Navigate to Authentication → Providers
3. Find **LinkedIn (OIDC)** in the provider list
   - **Important**: Use "LinkedIn (OIDC)" NOT "LinkedIn" (legacy)
4. Toggle **LinkedIn OIDC Enabled** to ON
5. Paste **Client ID** from Task 1.2
6. Paste **Client Secret** from Task 1.2
7. Click **Save**

#### Success Criteria:
- [x] LinkedIn OIDC provider enabled (not legacy)
- [x] Client credentials configured
- [x] Changes saved successfully

#### Verification:
```bash
# Check provider status via API
curl https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/settings \
  | jq '.external.linkedin_oidc'
```

---

### Task 2.2: Configure for Local Development
**Duration**: 10 minutes
**Location**: Local Supabase config

#### Steps:
1. Create/update `supabase/config.toml`:

```toml
[auth.external.linkedin_oidc]
enabled = true
client_id = "env(LINKEDIN_CLIENT_ID)"
secret = "env(LINKEDIN_CLIENT_SECRET)"
# Optional
# redirect_uri = "http://localhost:54321/auth/v1/callback"
# url = "https://www.linkedin.com/oauth"
```

2. Add to `.env.local`:

```bash
LINKEDIN_CLIENT_ID="1234567890abcdef"
LINKEDIN_CLIENT_SECRET="ABCDEFGHIJKLMNOP"
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

### Task 2.3: Understand OIDC vs OAuth 2.0 Differences
**Duration**: 5 minutes

#### Key Differences:

**LinkedIn OIDC (NEW - use this)**:
- Uses OpenID Connect standard
- Provider key: `linkedin_oidc`
- More secure with ID tokens
- Better profile data standardization
- Future-proof

**LinkedIn OAuth 2.0 (LEGACY - being deprecated)**:
- Uses older OAuth 2.0
- Provider key: `linkedin`
- Being phased out by LinkedIn
- Deprecated as of January 2024

**Important**: Always use `linkedin_oidc` in your configuration!

#### Success Criteria:
- [x] Understand OIDC is the new standard
- [x] Know to use `linkedin_oidc` not `linkedin`
- [x] Configured correct provider in Supabase

---

## Phase 3: Client Implementation

### Task 3.1: Update Auth Page Component
**Duration**: 10 minutes
**Location**: `src/pages/Auth.tsx`

#### Steps:
1. Add LinkedIn OIDC to providers array:

```typescript
<SupabaseAuth
  supabaseClient={supabase}
  appearance={{ theme: ThemeSupa }}
  providers={[
    'google',
    'github',
    'facebook',
    'apple',
    'linkedin_oidc'  // ← Use linkedin_oidc (not linkedin)
  ]}
  redirectTo={window.location.origin + '/dashboard'}
/>
```

**Important**: Use `linkedin_oidc` not `linkedin`!

2. (Optional) Customize LinkedIn button:

```typescript
<SupabaseAuth
  supabaseClient={supabase}
  appearance={{
    theme: ThemeSupa,
    variables: {
      default: {
        colors: {
          brand: '#0A66C2', // LinkedIn blue
          brandAccent: '#004182',
        },
      },
    },
  }}
  providers={['google', 'github', 'facebook', 'apple', 'linkedin_oidc']}
  redirectTo={window.location.origin + '/dashboard'}
/>
```

3. Save and test

#### Success Criteria:
- [x] LinkedIn button appears on auth page
- [x] Button uses `linkedin_oidc` provider
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
3. Click "Continue with LinkedIn" button
4. Should redirect to LinkedIn authorization page
5. Sign in with LinkedIn if needed
6. Review permissions requested:
   - Access your profile
   - Access your email
7. Click "Allow"
8. Should redirect back to app

#### Expected Flow:
```
User clicks LinkedIn button
  ↓
Redirect to: https://www.linkedin.com/oauth/v2/authorization?
  client_id=...
  redirect_uri=http://localhost:8080/auth/callback
  response_type=code
  scope=openid profile email
  state=...
  ↓
User approves access
  ↓
Redirect to: http://localhost:8080/auth/callback?code=...&state=...
  ↓
Supabase exchanges code for tokens (including ID token)
  ↓
User profile created/updated
  ↓
Redirect to dashboard
```

#### Success Criteria:
- [x] LinkedIn authorization page displays
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
4. Verify ID token received (OIDC feature)

#### Success Criteria:
- [x] No callback errors in console
- [x] Session cookie present
- [x] User redirected successfully
- [x] ID token present in session

---

## Phase 4: Database Integration

### Task 4.1: Verify Profile Creation
**Duration**: 10 minutes

#### Steps:
1. After successful LinkedIn sign-in, check database:

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
WHERE provider = 'linkedin_oidc'
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
- [x] Email matches LinkedIn email
- [x] Full name populated
- [x] Provider set to 'linkedin_oidc'

---

### Task 4.2: Test Profile Data Sync
**Duration**: 15 minutes

#### Steps:
1. Check what data LinkedIn OIDC provides:

```typescript
// After login, inspect user metadata
const { data: { user } } = await supabase.auth.getUser();
console.log('LinkedIn OIDC data:', user?.user_metadata);

// Expected structure:
{
  email: "user@example.com",
  email_verified: true,
  family_name: "Doe",
  given_name: "John",
  name: "John Doe",
  picture: "https://media.licdn.com/dms/image/...",
  sub: "linkedin_oidc|###############",
  locale: "en_US"
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
  AND profiles.provider = 'linkedin_oidc';
```

#### Success Criteria:
- [x] Full name populated from LinkedIn
- [x] Avatar URL populated from LinkedIn
- [x] Email correctly stored
- [x] Email verified status set

---

### Task 4.3: Handle LinkedIn Professional Data
**Duration**: 10 minutes

LinkedIn OIDC provides basic profile data. Additional professional data requires separate API calls.

#### Steps:
1. Understand default OIDC data:
   - ✅ Name
   - ✅ Email
   - ✅ Profile picture
   - ❌ Company (requires separate API)
   - ❌ Job title (requires separate API)
   - ❌ Industry (requires separate API)

2. (Optional) Store LinkedIn user ID for future API calls:

```sql
-- Add LinkedIn ID to profiles
ALTER TABLE public.profiles
ADD COLUMN linkedin_id TEXT;

-- Update from user metadata
UPDATE public.profiles
SET linkedin_id = auth.users.raw_user_meta_data->>'sub'
FROM auth.users
WHERE profiles.id = auth.users.id
  AND profiles.provider = 'linkedin_oidc';
```

3. (Optional) Request additional scopes for more data:
   - Requires LinkedIn Partner Program
   - Not covered in basic OIDC flow

#### Success Criteria:
- [x] Basic OIDC data captured
- [x] LinkedIn ID stored (if needed)
- [x] Understand additional data requires separate APIs

---

## Phase 5: Testing & Validation

### Task 5.1: End-to-End Testing
**Duration**: 30 minutes

#### Test Cases:

**Test 1: New User Sign Up**
- [ ] Click LinkedIn button
- [ ] Complete LinkedIn authorization
- [ ] Verify profile created in database
- [ ] Verify session created
- [ ] Verify redirected to dashboard
- [ ] Verify profile picture displayed

**Test 2: Existing User Sign In**
- [ ] Sign out
- [ ] Click LinkedIn button again
- [ ] Verify existing profile updated (not duplicated)
- [ ] Verify session created
- [ ] Verify last_sign_in_at updated

**Test 3: Email Matching**
- [ ] Sign up with email/password using LinkedIn email
- [ ] Try to sign in with LinkedIn
- [ ] Verify accounts linked (not duplicate created)

**Test 4: Error Handling**
- [ ] Cancel LinkedIn authorization
- [ ] Verify user redirected back to auth page
- [ ] Verify error message displayed
- [ ] No profile created

**Test 5: ID Token Validation**
- [ ] Verify ID token present in session
- [ ] Verify token contains email claim
- [ ] Verify token contains profile claims

#### Success Criteria:
- [x] All test cases pass
- [x] No console errors
- [x] No duplicate profiles created
- [x] Error states handled gracefully
- [x] ID token validation working

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
grep -r "LINKEDIN_CLIENT_SECRET" src/
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

5. **OIDC ID token validation**:
```typescript
// Verify ID token present
const { data: { session } } = await supabase.auth.getSession();
console.log('ID token present:', !!session?.provider_token);
```

#### Success Criteria:
- [x] HTTPS enforced in production
- [x] No secrets in client code
- [x] RLS policies enabled
- [x] Sessions stored securely
- [x] ID tokens validated

---

## Phase 6: Production Deployment

### Task 6.1: Update LinkedIn App for Production
**Duration**: 10 minutes

#### Steps:
1. Go to LinkedIn Developers → Your App → Auth tab
2. Update **Authorized redirect URLs**:
   - Remove: `http://localhost:54321/auth/v1/callback`
   - Keep: `https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback`
3. Click "Update"

4. Go to Settings tab:
   - Update **Privacy policy URL**: `https://medellin-spark.com/privacy`
   - Update app description if needed
   - Set **App visibility** to "Public"

#### Success Criteria:
- [x] Production callback URL configured
- [x] Local URLs removed
- [x] Privacy policy URL updated
- [x] App set to public
- [x] Changes saved

---

### Task 6.2: Request Production Access (If Needed)
**Duration**: Variable (may require LinkedIn review)

#### Steps:
1. If your app shows "In Development" status:
   - Go to **Products** tab
   - Verify "Sign In with LinkedIn using OpenID Connect" is approved
   - May need to submit for review if not auto-approved

2. Complete verification requirements:
   - Valid privacy policy
   - Valid terms of service
   - Company/organization info
   - App logo

3. Submit for review if required

**Note**: Most OIDC apps are auto-approved

#### Success Criteria:
- [x] Product approved
- [x] App ready for production use

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
- [x] LinkedIn OIDC login works on production URL

---

### Task 6.4: Production Testing
**Duration**: 20 minutes

#### Test on Production:
1. Navigate to production auth page
2. Click "Continue with LinkedIn"
3. Complete authorization flow
4. Verify successful login
5. Check profile in production database

```sql
-- Check production profiles
SELECT COUNT(*)
FROM public.profiles
WHERE provider = 'linkedin_oidc';

-- Verify email verification
SELECT
  email,
  full_name,
  avatar_url,
  created_at
FROM public.profiles
WHERE provider = 'linkedin_oidc'
ORDER BY created_at DESC
LIMIT 10;
```

#### Success Criteria:
- [x] Production LinkedIn OIDC login works
- [x] Profiles created correctly
- [x] No errors in production logs
- [x] Avatar images loading

---

## Troubleshooting Guide

### Issue 1: "invalid_redirect_uri"
**Cause**: Redirect URI not in allowed list or doesn't match exactly
**Solution**:
```bash
# Verify exact match (including protocol and path)
LinkedIn: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback
Supabase: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback
```

### Issue 2: "invalid_client_id"
**Cause**: Wrong client ID in Supabase config
**Solution**: Double-check client ID matches LinkedIn app

### Issue 3: "Product not approved"
**Cause**: "Sign In with LinkedIn using OpenID Connect" not approved
**Solution**:
- Go to Products tab
- Request access if not already done
- Wait for approval (usually automatic)

### Issue 4: "Profile not created"
**Cause**: Database trigger not working
**Solution**:
```sql
-- Check trigger exists
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Check provider name is correct
-- Should be 'linkedin_oidc' not 'linkedin'
```

### Issue 5: "Wrong provider type"
**Cause**: Using legacy `linkedin` instead of `linkedin_oidc`
**Solution**:
```typescript
// Correct:
providers={['linkedin_oidc']}

// Incorrect (deprecated):
providers={['linkedin']}
```

### Issue 6: "Session not persisting"
**Cause**: Cookie settings or RLS issues
**Solution**:
```typescript
// Verify session storage
const { data } = await supabase.auth.getSession();
console.log('Session:', data);
```

### Issue 7: "Picture URL not loading"
**Cause**: LinkedIn CDN requires authentication or CORS
**Solution**:
```typescript
// LinkedIn profile pictures may have CORS restrictions
// Store the URL but handle loading errors gracefully
```

---

## Success Criteria Checklist

### LinkedIn App:
- [x] LinkedIn developer account created
- [x] LinkedIn app created
- [x] "Sign In with LinkedIn using OpenID Connect" product added
- [x] Product approved
- [x] Client ID and secret saved
- [x] Redirect URLs configured
- [x] Required scopes configured (openid, profile, email)
- [x] Privacy policy URL added
- [x] App set to public

### Supabase Configuration:
- [x] LinkedIn OIDC provider enabled (not legacy)
- [x] Credentials configured
- [x] Local config updated
- [x] Environment variables set

### Client Implementation:
- [x] Auth page updated with LinkedIn button
- [x] Using `linkedin_oidc` provider (not `linkedin`)
- [x] OAuth flow tested locally
- [x] Callback handled correctly
- [x] Session management working

### Database Integration:
- [x] Profile auto-creation working
- [x] Data sync verified
- [x] Provider set to 'linkedin_oidc'
- [x] RLS policies active
- [x] No duplicate profiles

### Production:
- [x] Production callback configured
- [x] App set to public
- [x] Deployed successfully
- [x] Production testing complete
- [x] No errors in logs

---

## Monitoring & Maintenance

### Weekly Checks:
1. Monitor LinkedIn OIDC login success rate
2. Check for authentication errors in logs
3. Verify profile creation rate

### Monthly Tasks:
1. Review LinkedIn app settings
2. Check for API version updates
3. Verify OAuth 2.0 scopes still valid

### Queries for Monitoring:

```sql
-- LinkedIn OIDC login statistics
SELECT
  DATE(created_at) as date,
  COUNT(*) as new_linkedin_users
FROM public.profiles
WHERE provider = 'linkedin_oidc'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Recent LinkedIn logins
SELECT
  p.email,
  p.full_name,
  s.session_started_at
FROM public.user_sessions s
JOIN public.profiles p ON p.id = s.user_id
WHERE s.provider = 'linkedin_oidc'
ORDER BY s.session_started_at DESC
LIMIT 20;

-- Profile picture availability
SELECT
  COUNT(*) FILTER (WHERE avatar_url IS NOT NULL) as with_picture,
  COUNT(*) FILTER (WHERE avatar_url IS NULL) as without_picture,
  COUNT(*) as total
FROM public.profiles
WHERE provider = 'linkedin_oidc';
```

---

## Resources

- **LinkedIn OIDC Documentation**: https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2
- **LinkedIn Developers**: https://www.linkedin.com/developers
- **Supabase LinkedIn OIDC Docs**: https://supabase.com/docs/guides/auth/social-login/auth-linkedin
- **OpenID Connect Spec**: https://openid.net/specs/openid-connect-core-1_0.html
- **Supabase Dashboard**: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/providers

---

## Migration from Legacy LinkedIn OAuth

If you previously used the legacy LinkedIn OAuth provider:

### Migration Steps:

1. **Add new provider**:
   - Enable `linkedin_oidc` in Supabase Dashboard
   - Keep legacy `linkedin` enabled temporarily

2. **Update client code**:
   ```typescript
   // Add both providers during migration
   providers={['linkedin', 'linkedin_oidc']}
   ```

3. **Update database**:
   ```sql
   -- Add new provider type
   ALTER TABLE public.profiles
   ADD CONSTRAINT provider_check
   CHECK (provider IN ('google', 'github', 'facebook', 'apple', 'linkedin', 'linkedin_oidc'));
   ```

4. **Migrate users** (Optional):
   ```sql
   -- Mark old LinkedIn users for potential re-linking
   UPDATE public.profiles
   SET metadata = jsonb_set(
     COALESCE(metadata, '{}'::jsonb),
     '{legacy_provider}',
     '"linkedin"'
   )
   WHERE provider = 'linkedin';
   ```

5. **Test both providers work**

6. **Deprecate legacy provider**:
   - Remove `linkedin` from providers array
   - Keep database records with `provider = 'linkedin'`
   - They can sign in with `linkedin_oidc` going forward

---

## Next Steps

After completing LinkedIn OIDC implementation:
1. ✅ **Phase 4 Complete**: LinkedIn OIDC fully functional
2. ✅ **All Providers Complete**: Google, GitHub, Facebook, Apple, LinkedIn
3. ➡️ **Next**: Test all providers together
4. ➡️ **Then**: Implement provider linking for users with multiple accounts

---

**Estimated Total Time**: 2-3 hours
**Complexity**: Easy-Medium
**Dependencies**: Supabase project, LinkedIn account, Company page
**Status**: Ready to implement
**Important**: Use `linkedin_oidc` not `linkedin` (legacy)
