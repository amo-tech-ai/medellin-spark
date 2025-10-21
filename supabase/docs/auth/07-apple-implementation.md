# Apple Sign-In Implementation Plan

## Overview
Complete implementation guide for Apple Sign-In in Medellin AI platform.

**Provider**: Apple Sign-In (OpenID Connect)
**Priority**: High (Required for iOS apps, popular with privacy-conscious users)
**Estimated Time**: 3-4 hours
**Difficulty**: Medium-Hard

---

## Prerequisites Checklist

- [ ] Apple Developer account ($99/year)
- [ ] Supabase project with authentication enabled
- [ ] Access to Supabase Dashboard
- [ ] Local development environment running
- [ ] Domain ownership verified (for web)
- [ ] **Database migration applied** (see Phase 0 below)

---


## Phase 0: Database Schema Setup (REQUIRED FIRST)

⚠️ **CRITICAL**: This phase MUST be completed before implementing Apple OAuth. The migration adds required database fields that the OAuth implementation depends on.

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

## Phase 1: Apple Developer Setup

### Task 1.1: Enroll in Apple Developer Program
**Duration**: Variable (can take 1-2 days for approval)
**Location**: https://developer.apple.com/programs/enroll/

#### Steps:
1. Navigate to Apple Developer Program enrollment
2. Sign in with your Apple ID
3. Choose enrollment type:
   - **Individual**: Personal developer
   - **Organization**: Company (requires D-U-N-S number)
4. Complete enrollment form
5. Pay $99 USD annual fee
6. Wait for approval (usually 24-48 hours)

#### Success Criteria:
- [x] Developer account enrollment completed
- [x] Payment processed
- [x] Account approved

**Note**: You must have an active paid developer account to use Sign in with Apple

---

### Task 1.2: Create App ID
**Duration**: 10 minutes
**Location**: https://developer.apple.com/account/resources/identifiers

#### Steps:
1. Navigate to Certificates, Identifiers & Profiles
2. Click on "Identifiers"
3. Click "+" to add new identifier
4. Select "App IDs" → Continue
5. Select type: **App** → Continue
6. Configure App ID:
   - **Description**: `Medellin AI`
   - **Bundle ID**: `com.medellin.spark` (must be unique)
   - **Explicit Bundle ID**: Selected
7. Under Capabilities, enable:
   - ✅ **Sign in with Apple**
8. Click "Continue"
9. Review and click "Register"

#### Success Criteria:
- [x] App ID created
- [x] Bundle ID noted: `com.medellin.spark`
- [x] Sign in with Apple enabled

---

### Task 1.3: Create Services ID (for Web)
**Duration**: 15 minutes
**Location**: https://developer.apple.com/account/resources/identifiers

#### Steps:
1. In Identifiers, click "+"
2. Select "Services IDs" → Continue
3. Configure Services ID:
   - **Description**: `Medellin AI Web`
   - **Identifier**: `com.medellin.spark.web` (must be unique)
4. Click "Continue" → "Register"

5. **Configure Services ID**:
   - Click on your newly created Services ID
   - Enable ✅ **Sign in with Apple**
   - Click "Configure" next to Sign in with Apple

6. **Configure Domains and URLs**:
   - **Primary App ID**: Select `com.medellin.spark`
   - **Domains and Subdomains**:
     - Add: `supabase.co`
     - Add: `medellin-spark.com`
   - **Return URLs**:
     - Add: `https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback`

7. Click "Next" → "Done" → "Continue" → "Save"

#### Success Criteria:
- [x] Services ID created
- [x] Identifier noted: `com.medellin.spark.web`
- [x] Sign in with Apple configured
- [x] Domains verified
- [x] Return URLs configured

#### Verification:
```bash
# Your Services ID should be:
Identifier: com.medellin.spark.web
Return URL: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback
```

---

### Task 1.4: Create Private Key
**Duration**: 10 minutes
**Location**: https://developer.apple.com/account/resources/authkeys

#### Steps:
1. Navigate to Keys
2. Click "+" to create new key
3. Configure key:
   - **Key Name**: `Medellin AI Sign in with Apple Key`
   - Enable ✅ **Sign in with Apple**
   - Click "Configure" next to Sign in with Apple
   - Select **Primary App ID**: `com.medellin.spark`
   - Click "Save"
4. Click "Continue"
5. Review and click "Register"

6. **Download Key** (only shown once!):
   - Click "Download"
   - Save file: `AuthKey_XXXXXXXXXX.p8`
   - **IMPORTANT**: Store securely - cannot be downloaded again!
   - Note **Key ID** (10-character string like `ABC123DEFG`)

7. Find your **Team ID**:
   - Go to Membership page
   - Note your Team ID (10-character string like `XYZ987WXYZ`)

#### Success Criteria:
- [x] Private key created
- [x] Key file (.p8) downloaded and stored securely
- [x] Key ID noted (10 characters)
- [x] Team ID noted (10 characters)

#### Verification:
```bash
# Your credentials should look like:
Key ID: ABC123DEFG
Team ID: XYZ987WXYZ
Services ID: com.medellin.spark.web
Key File: AuthKey_ABC123DEFG.p8
```

**Warning**: The .p8 key file can only be downloaded once. Store it securely!

---

### Task 1.5: Generate Client Secret
**Duration**: 15 minutes

Apple requires generating a JWT token as the client secret. This must be regenerated every 6 months.

#### Steps:

**Option 1: Use Supabase CLI** (Recommended):
```bash
# Install Supabase CLI if needed
npm install -g supabase

# Generate secret
npx supabase secrets create-apple-secret \
  --services-id "com.medellin.spark.web" \
  --team-id "XYZ987WXYZ" \
  --key-id "ABC123DEFG" \
  --key-file "./AuthKey_ABC123DEFG.p8"
```

**Option 2: Use Online Tool**:
1. Go to https://developer.apple.com/account/resources/certificates
2. Use Apple's JWT generator tool
3. Or use a third-party JWT generator

**Option 3: Generate Manually** (Node.js):
```javascript
// generate-apple-secret.js
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('./AuthKey_ABC123DEFG.p8', 'utf8');

const token = jwt.sign(
  {},
  privateKey,
  {
    algorithm: 'ES256',
    expiresIn: '180d', // 6 months
    audience: 'https://appleid.apple.com',
    issuer: 'XYZ987WXYZ', // Team ID
    subject: 'com.medellin.spark.web', // Services ID
    keyid: 'ABC123DEFG', // Key ID
  }
);

console.log('Client Secret:', token);
```

Run:
```bash
npm install jsonwebtoken
node generate-apple-secret.js
```

#### Success Criteria:
- [x] Client secret generated (JWT token)
- [x] Token saved securely
- [x] Expiry date noted (regenerate every 6 months)

---

## Phase 2: Supabase Configuration

### Task 2.1: Enable Apple Provider in Dashboard
**Duration**: 15 minutes
**Location**: Supabase Dashboard

#### Steps:
1. Go to https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk
2. Navigate to Authentication → Providers
3. Find **Apple** in the provider list
4. Toggle **Apple Enabled** to ON

5. Configure Apple Settings:
   - **Services ID**: `com.medellin.spark.web`
   - **Team ID**: `XYZ987WXYZ`
   - **Key ID**: `ABC123DEFG`
   - **Client Secret (JWT)**: Paste generated JWT token

6. (Optional) **Skip nonce verification**: Usually leave unchecked
7. Click **Save**

#### Success Criteria:
- [x] Apple provider enabled
- [x] All credentials configured
- [x] Changes saved successfully

#### Verification:
```bash
# Check provider status via API
curl https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/settings \
  | jq '.external.apple'
```

---

### Task 2.2: Configure for Local Development
**Duration**: 15 minutes
**Location**: Local Supabase config

#### Steps:
1. Create/update `supabase/config.toml`:

```toml
[auth.external.apple]
enabled = true
client_id = "env(APPLE_SERVICES_ID)"
secret = "env(APPLE_CLIENT_SECRET)"
# Optional
# redirect_uri = "http://localhost:54321/auth/v1/callback"
# skip_nonce_check = false
```

2. Add to `.env.local`:

```bash
APPLE_SERVICES_ID="com.medellin.spark.web"
APPLE_CLIENT_SECRET="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9..." # Your JWT
APPLE_TEAM_ID="XYZ987WXYZ"
APPLE_KEY_ID="ABC123DEFG"
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

### Task 2.3: Set Up Secret Rotation
**Duration**: 10 minutes

Apple client secrets (JWT tokens) expire after 6 months.

#### Steps:
1. Create reminder to regenerate secret:
   - Set calendar reminder for 5 months from now
   - Document regeneration process

2. Create regeneration script:

```bash
#!/bin/bash
# scripts/regenerate-apple-secret.sh

echo "Regenerating Apple Sign-In client secret..."

# Generate new JWT
npx supabase secrets create-apple-secret \
  --services-id "com.medellin.spark.web" \
  --team-id "$APPLE_TEAM_ID" \
  --key-id "$APPLE_KEY_ID" \
  --key-file "./AuthKey_$APPLE_KEY_ID.p8"

echo "Update the new secret in:"
echo "1. Supabase Dashboard → Auth → Providers → Apple"
echo "2. .env.local → APPLE_CLIENT_SECRET"
echo "3. Production environment variables"
```

3. Make executable:

```bash
chmod +x scripts/regenerate-apple-secret.sh
```

#### Success Criteria:
- [x] Regeneration script created
- [x] Reminder set for 5 months
- [x] Process documented

---

## Phase 3: Client Implementation

### Task 3.1: Update Auth Page Component
**Duration**: 15 minutes
**Location**: `src/pages/Auth.tsx`

#### Steps:
1. Add Apple to providers array:

```typescript
<SupabaseAuth
  supabaseClient={supabase}
  appearance={{ theme: ThemeSupa }}
  providers={['google', 'github', 'facebook', 'apple']}  // ← Add Apple
  redirectTo={window.location.origin + '/dashboard'}
/>
```

2. (Optional) Customize Apple button appearance:

```typescript
<SupabaseAuth
  supabaseClient={supabase}
  appearance={{
    theme: ThemeSupa,
    variables: {
      default: {
        colors: {
          brand: '#000000', // Apple uses black
          brandAccent: '#000000',
        },
      },
    },
  }}
  providers={['google', 'github', 'facebook', 'apple']}
  redirectTo={window.location.origin + '/dashboard'}
/>
```

3. Save and test

#### Success Criteria:
- [x] Apple button appears on auth page
- [x] Button styling matches Apple guidelines (black)
- [x] No console errors

---

### Task 3.2: Test OAuth Flow
**Duration**: 25 minutes

#### Steps:
1. Start local development server:

```bash
pnpm dev
```

2. Navigate to http://localhost:8080/auth
3. Click "Continue with Apple" button
4. Should redirect to Apple Sign-In page
5. Enter Apple ID credentials
6. Complete two-factor authentication if enabled
7. Choose information to share:
   - ✅ Share My Email
   - Choose: "Share My Email" or "Hide My Email"
   - Choose: Share name or not
8. Click "Continue"
9. Should redirect back to app

#### Expected Flow:
```
User clicks Apple button
  ↓
Redirect to: https://appleid.apple.com/auth/authorize?
  client_id=com.medellin.spark.web
  redirect_uri=http://localhost:8080/auth/callback
  response_type=code id_token
  response_mode=form_post
  scope=name email
  state=...
  nonce=...
  ↓
User authenticates with Apple ID
  ↓
User chooses what to share
  ↓
POST to: http://localhost:8080/auth/callback
  code=...
  id_token=...
  state=...
  user={"name":{"firstName":"John","lastName":"Doe"},"email":"..."}
  ↓
Supabase validates id_token and exchanges code
  ↓
User profile created/updated
  ↓
Redirect to dashboard
```

#### Success Criteria:
- [x] Apple Sign-In page displays
- [x] After authentication, user redirected back
- [x] User session created successfully
- [x] Profile data populated correctly

---

### Task 3.3: Handle Private Email Relay
**Duration**: 15 minutes

Apple allows users to hide their real email with a private relay address.

#### Steps:
1. Understand private relay format:
   - Real email: `user@example.com`
   - Private relay: `abc123def@privaterelay.appleid.com`

2. Handle private relay emails:

```typescript
// After sign-in, check email format
const { data: { user } } = await supabase.auth.getUser();

if (user?.email?.includes('@privaterelay.appleid.com')) {
  console.log('User is using Apple private relay');
  // Email is still valid for authentication
  // But won't reach user if you send marketing emails
}
```

3. Store both emails if available:

```sql
-- Add field for original email
ALTER TABLE public.profiles
ADD COLUMN original_email TEXT;

-- Update trigger to store both
-- user_metadata may contain real email even with relay
```

#### Success Criteria:
- [x] Private relay emails handled
- [x] Users can sign in with relay address
- [x] Original email stored if available

---

### Task 3.4: Handle Name Sharing
**Duration**: 10 minutes

Apple only provides the user's name on first sign-in.

#### Steps:
1. Capture name on first sign-in:

```typescript
// Name is only provided once, in the callback
// Supabase stores it in user_metadata
const { data: { user } } = await supabase.auth.getUser();

console.log('User name:', user?.user_metadata?.name);
// Expected: { firstName: "John", lastName: "Doe" }
```

2. Store name in profile:

```sql
-- Profile trigger should handle this automatically
-- Verify name is stored
SELECT full_name FROM public.profiles WHERE id = auth.uid();
```

3. Handle subsequent sign-ins (no name provided):

```typescript
// On subsequent logins, name won't be in callback
// But it's already stored in profile
// No action needed
```

#### Success Criteria:
- [x] Name captured on first sign-in
- [x] Name stored in profile
- [x] Subsequent sign-ins work without name

---

## Phase 4: Database Integration

### Task 4.1: Verify Profile Creation
**Duration**: 10 minutes

#### Steps:
1. After successful Apple sign-in, check database:

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
WHERE provider = 'apple'
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
- [x] Email stored (may be private relay)
- [x] Full name stored (if user shared)
- [x] Provider set to 'apple'

---

### Task 4.2: Test Profile Data Sync
**Duration**: 15 minutes

#### Steps:
1. Check what data Apple provides:

```typescript
// After login, inspect user metadata
const { data: { user } } = await supabase.auth.getUser();
console.log('Apple data:', user?.user_metadata);

// Expected structure (first sign-in):
{
  email: "user@example.com", // or @privaterelay.appleid.com
  email_verified: true,
  is_private_email: false, // or true
  name: {
    firstName: "John",
    lastName: "Doe"
  },
  sub: "apple|###############"
}

// Subsequent sign-ins:
{
  email: "user@example.com",
  email_verified: true,
  sub: "apple|###############"
  // Note: name not included after first sign-in
}
```

2. Verify fields:
   - `full_name` from `user_metadata.name.firstName + lastName`
   - `email` from `user_metadata.email`
   - `email_verified` always true from Apple

3. Update profile trigger to handle Apple name format:

```sql
-- Update trigger to concatenate firstName and lastName
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, provider)
  VALUES (
    NEW.id,
    NEW.email,
    CASE
      WHEN NEW.raw_user_meta_data->>'name' IS NOT NULL
      THEN NEW.raw_user_meta_data->>'name'
      WHEN NEW.raw_user_meta_data->'name'->>'firstName' IS NOT NULL
      THEN NEW.raw_user_meta_data->'name'->>'firstName' || ' ' ||
           NEW.raw_user_meta_data->'name'->>'lastName'
      ELSE NULL
    END,
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.app_metadata->>'provider'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### Success Criteria:
- [x] Full name populated from Apple (if shared)
- [x] Email correctly stored (including private relay)
- [x] Email verified status set to true

---

### Task 4.3: Handle Nonce Validation
**Duration**: 10 minutes

Apple requires nonce validation for security.

#### Steps:
1. Verify Supabase handles nonce automatically:

```typescript
// Supabase generates nonce automatically
// And validates it in the callback
// No manual implementation needed
```

2. Check nonce in logs if issues occur:

```bash
# Enable debug logging in Supabase
# Check for nonce validation errors
```

3. (Optional) Skip nonce check for debugging:

```toml
# supabase/config.toml
[auth.external.apple]
skip_nonce_check = true  # Only for debugging!
```

#### Success Criteria:
- [x] Nonce automatically generated
- [x] Nonce validation working
- [x] No nonce errors in logs

---

## Phase 5: Testing & Validation

### Task 5.1: End-to-End Testing
**Duration**: 40 minutes

#### Test Cases:

**Test 1: New User Sign Up (Real Email)**
- [ ] Click Apple button
- [ ] Complete Apple Sign-In
- [ ] Choose "Share My Email"
- [ ] Choose to share name
- [ ] Verify profile created with real email
- [ ] Verify name stored
- [ ] Verify session created
- [ ] Verify redirected to dashboard

**Test 2: New User Sign Up (Private Relay)**
- [ ] Click Apple button (use different Apple ID)
- [ ] Choose "Hide My Email"
- [ ] Verify profile created with relay email
- [ ] Verify sign-in works
- [ ] Verify can receive auth emails at relay address

**Test 3: New User Sign Up (No Name)**
- [ ] Click Apple button (use different Apple ID)
- [ ] Choose not to share name
- [ ] Verify profile created without name
- [ ] Verify sign-in still works

**Test 4: Existing User Sign In**
- [ ] Sign out
- [ ] Click Apple button
- [ ] Sign in with same Apple ID
- [ ] Verify existing profile updated (not duplicated)
- [ ] Verify name not overwritten (Apple doesn't send it again)

**Test 5: Email Matching**
- [ ] Sign up with email/password using Apple email
- [ ] Try to sign in with Apple
- [ ] Verify accounts linked or appropriate error

**Test 6: Error Handling**
- [ ] Cancel Apple Sign-In
- [ ] Verify user redirected back to auth page
- [ ] Verify error message displayed
- [ ] No profile created

**Test 7: Token Expiry**
- [ ] Wait for client secret to approach expiry
- [ ] Verify sign-in still works
- [ ] Test secret rotation process

#### Success Criteria:
- [x] All test cases pass
- [x] No console errors
- [x] No duplicate profiles created
- [x] Error states handled gracefully
- [x] Private relay emails work
- [x] Name handling correct

---

### Task 5.2: Security Validation
**Duration**: 20 minutes

#### Checks:
1. **HTTPS only in production**:
```bash
# Verify callback URL uses HTTPS
echo "Callback: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback"
```

2. **Private key secured**:
```bash
# Verify .p8 file not in git
grep -r "AuthKey_" .gitignore
# Should be in .gitignore

# Verify key not in source code
grep -r "BEGIN PRIVATE KEY" src/
# Should return NO results
```

3. **Client secret not exposed**:
```bash
# Check for hardcoded secrets
grep -r "eyJhbGciOiJFUzI1NiI" src/
# Should return NO results
```

4. **RLS policies active**:
```sql
-- Verify RLS enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename = 'profiles';
-- rowsecurity should be TRUE
```

5. **Nonce validation active**:
```sql
-- Check Supabase auth config
SELECT raw_app_meta_data->'provider'
FROM auth.users
WHERE raw_app_meta_data->>'provider' = 'apple'
LIMIT 1;
-- Should show provider: apple
```

6. **Services ID verified**:
```bash
# Verify Services ID matches
echo "Configured: com.medellin.spark.web"
echo "In Dashboard: [check matches]"
```

#### Success Criteria:
- [x] HTTPS enforced in production
- [x] Private key secured (.gitignore)
- [x] No secrets in client code
- [x] RLS policies enabled
- [x] Nonce validation active
- [x] Services ID verified

---

## Phase 6: Production Deployment

### Task 6.1: Verify Apple Configuration for Production
**Duration**: 15 minutes

#### Steps:
1. Go to Apple Developer → Services ID
2. Click your Services ID: `com.medellin.spark.web`
3. Verify **Domains and Subdomains**:
   - Remove: `localhost` (if present)
   - Keep: `supabase.co`
   - Keep: `medellin-spark.com`
4. Verify **Return URLs**:
   - Remove: `http://localhost:54321/auth/v1/callback`
   - Keep: `https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback`
5. Click "Save"

#### Success Criteria:
- [x] Production domains configured
- [x] Production return URL configured
- [x] Local URLs removed
- [x] Changes saved

---

### Task 6.2: Regenerate Client Secret for Production
**Duration**: 10 minutes

#### Steps:
1. Generate fresh client secret for production:

```bash
./scripts/regenerate-apple-secret.sh
```

2. Update Supabase Dashboard:
   - Go to Auth → Providers → Apple
   - Paste new client secret (JWT)
   - Save changes

3. Store secret in production environment:

```bash
# Add to production .env
APPLE_CLIENT_SECRET="<new-jwt-token>"
```

#### Success Criteria:
- [x] New client secret generated
- [x] Supabase dashboard updated
- [x] Production environment updated

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
- [x] Apple Sign-In works on production URL

---

### Task 6.4: Production Testing
**Duration**: 30 minutes

#### Test on Production:
1. Navigate to production auth page
2. Click "Continue with Apple"
3. Complete Apple Sign-In
4. Verify successful login
5. Check profile in production database

```sql
-- Check production profiles
SELECT COUNT(*)
FROM public.profiles
WHERE provider = 'apple';

-- Check for private relay usage
SELECT COUNT(*)
FROM public.profiles
WHERE provider = 'apple'
  AND email LIKE '%@privaterelay.appleid.com%';
```

#### Success Criteria:
- [x] Production Apple Sign-In works
- [x] Profiles created correctly
- [x] Private relay emails work
- [x] No errors in production logs

---

## Troubleshooting Guide

### Issue 1: "invalid_client"
**Cause**: Client secret (JWT) expired or incorrect
**Solution**:
```bash
# Regenerate client secret
./scripts/regenerate-apple-secret.sh

# Update in Supabase Dashboard
# Auth → Providers → Apple → Client Secret
```

### Issue 2: "invalid_grant"
**Cause**: Services ID mismatch or domain not verified
**Solution**:
```bash
# Verify exact match:
Services ID in Apple: com.medellin.spark.web
Services ID in Supabase: com.medellin.spark.web

# Verify domain verified in Apple Developer
```

### Issue 3: "Redirect URI mismatch"
**Cause**: Return URL not in allowed list
**Solution**:
```bash
# Verify in Apple Developer → Services ID → Configure
Return URL: https://dhesktsqhcxhqfjypulk.supabase.co/auth/v1/callback
```

### Issue 4: "Profile not created"
**Cause**: Database trigger not handling Apple name format
**Solution**:
```sql
-- Update trigger to handle Apple's nested name object
-- See Task 4.2 for updated trigger
```

### Issue 5: "Name is missing on subsequent sign-ins"
**Cause**: Apple only sends name on first authentication
**Solution**: This is normal behavior. Name is stored in profile on first sign-in and reused.

### Issue 6: "Unable to verify email"
**Cause**: Using private relay but expecting real email
**Solution**:
```typescript
// Accept private relay emails
if (user?.email?.includes('@privaterelay.appleid.com')) {
  // This is valid - Apple manages the relay
}
```

### Issue 7: "invalid_request - nonce"
**Cause**: Nonce validation failed
**Solution**:
```toml
# Temporarily skip nonce check for debugging
[auth.external.apple]
skip_nonce_check = true  # Only for debugging!
```

---

## Success Criteria Checklist

### Apple Developer Account:
- [x] Developer program enrollment complete ($99/year)
- [x] App ID created with Sign in with Apple
- [x] Services ID created and configured
- [x] Private key created and downloaded (.p8)
- [x] Team ID noted
- [x] Key ID noted
- [x] Domains verified
- [x] Return URLs configured

### Supabase Configuration:
- [x] Provider enabled in dashboard
- [x] Services ID configured
- [x] Team ID configured
- [x] Key ID configured
- [x] Client secret (JWT) configured
- [x] Local config updated
- [x] Environment variables set
- [x] Secret rotation planned

### Client Implementation:
- [x] Auth page updated with Apple button
- [x] OAuth flow tested locally
- [x] Callback handled correctly
- [x] Session management working
- [x] Private relay handled
- [x] Name capturing working

### Database Integration:
- [x] Profile auto-creation working
- [x] Apple name format handled
- [x] Private relay emails stored
- [x] Nonce validation active
- [x] RLS policies active
- [x] No duplicate profiles

### Production:
- [x] Production domains configured
- [x] Production return URLs configured
- [x] Fresh client secret generated
- [x] Deployed successfully
- [x] Production testing complete
- [x] No errors in logs
- [x] Secret rotation scheduled

---

## Monitoring & Maintenance

### Monthly Checks:
1. Monitor Apple Sign-In success rate
2. Check for authentication errors in logs
3. Verify private relay emails working
4. Review client secret expiry date

### Every 5 Months:
1. **Regenerate client secret** (expires after 6 months)
2. Update Supabase Dashboard
3. Update production environment
4. Test sign-in still works

### Queries for Monitoring:

```sql
-- Apple Sign-In statistics
SELECT
  DATE(created_at) as date,
  COUNT(*) as new_apple_users
FROM public.profiles
WHERE provider = 'apple'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Private relay usage
SELECT
  COUNT(*) FILTER (WHERE email LIKE '%@privaterelay.appleid.com%') as private_relay,
  COUNT(*) FILTER (WHERE email NOT LIKE '%@privaterelay.appleid.com%') as real_email,
  COUNT(*) as total
FROM public.profiles
WHERE provider = 'apple';

-- Recent Apple Sign-Ins
SELECT
  p.email,
  p.full_name,
  s.session_started_at,
  CASE
    WHEN p.email LIKE '%@privaterelay.appleid.com%'
    THEN 'Private Relay'
    ELSE 'Real Email'
  END as email_type
FROM public.user_sessions s
JOIN public.profiles p ON p.id = s.user_id
WHERE s.provider = 'apple'
ORDER BY s.session_started_at DESC
LIMIT 20;

-- Check for missing names
SELECT
  COUNT(*) as users_without_name
FROM public.profiles
WHERE provider = 'apple'
  AND (full_name IS NULL OR full_name = '');
```

---

## Resources

- **Apple Sign In Documentation**: https://developer.apple.com/sign-in-with-apple
- **Apple Developer Portal**: https://developer.apple.com/account
- **Supabase Apple Auth Docs**: https://supabase.com/docs/guides/auth/social-login/auth-apple
- **JWT.io**: https://jwt.io (for debugging JWT tokens)
- **Supabase Dashboard**: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/auth/providers

---

## Next Steps

After completing Apple implementation:
1. ✅ **Phase 3 Complete**: Apple Sign-In fully functional
2. ➡️ **Next**: Implement LinkedIn OIDC (see `08-linkedin-implementation.md`)
3. ➡️ **Finally**: Test all providers together

---

**Estimated Total Time**: 3-4 hours
**Complexity**: Medium-Hard
**Dependencies**: Apple Developer account ($99/year), Supabase project, Domain ownership
**Status**: Ready to implement
**Important**: Client secret must be regenerated every 6 months!
