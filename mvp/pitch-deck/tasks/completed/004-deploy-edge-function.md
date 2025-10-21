# Task 004: Deploy Edge Function

**Status**: Pending
**Priority**: Critical
**Time**: 10 minutes
**Dependencies**: 003-apply-database-migration

---

## Objective

Deploy the production-ready `pitch-deck-assistant` Edge Function with all security fixes applied.

---

## Pre-Deployment Checks

### 1. Verify Function Code Exists

```bash
# Check Edge Function file
ls -la supabase/functions/pitch-deck-assistant/index.ts
```

**Expected**: File exists (created in previous tasks)

### 2. Verify Secrets Are Set

```bash
# Check required secrets
supabase secrets list
```

**Expected to see**:
- ✅ ANTHROPIC_API_KEY
- ✅ ALLOWED_ORIGIN

---

## Deployment Steps

### 1. Deploy Function

```bash
# Deploy to Supabase
supabase functions deploy pitch-deck-assistant

# This will:
# 1. Bundle the TypeScript code
# 2. Upload to Supabase
# 3. Make function available via API
```

**Expected output**:
```
Bundling pitch-deck-assistant...
Deploying pitch-deck-assistant (version X)...
Deployed successfully!

Function URL: https://YOUR_PROJECT.supabase.co/functions/v1/pitch-deck-assistant
```

### 2. Verify Deployment

```bash
# List all deployed functions
supabase functions list
```

**Expected**: `pitch-deck-assistant` appears in list with STATUS = ACTIVE

---

## Test Deployment

### Test 1: Missing Authorization (Should Fail)

```bash
# Get your Supabase URL
SUPABASE_URL=$(grep VITE_SUPABASE_URL .env | cut -d '=' -f2)

# Test without auth header
curl -X POST \
  "${SUPABASE_URL}/functions/v1/pitch-deck-assistant" \
  -H "Content-Type: application/json" \
  -d '{"profile_id": "test", "message": "hello"}'
```

**Expected response**:
```json
{"error": "Missing authorization header"}
```

✅ This confirms JWT verification is working!

### Test 2: Invalid Token (Should Fail)

```bash
# Test with fake token
curl -X POST \
  "${SUPABASE_URL}/functions/v1/pitch-deck-assistant" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer FAKE_TOKEN_12345" \
  -d '{"profile_id": "test", "message": "hello"}'
```

**Expected response**:
```json
{"error": "Invalid or expired token"}
```

✅ This confirms token validation is working!

### Test 3: Valid Request (Should Succeed)

**Note**: This requires a real authenticated user token. We'll test this in the frontend integration (Task 005).

---

## Monitor Logs

```bash
# Watch function logs in real-time
supabase functions logs pitch-deck-assistant --tail
```

**Look for**:
- ✅ `[pitch-deck-assistant] Function started`
- ✅ `[auth] Verified user {uuid}` (when valid requests come in)
- ❌ No error messages

**Press Ctrl+C to stop log monitoring**

---

## Function Endpoints

### Development (Local)
```
http://localhost:54321/functions/v1/pitch-deck-assistant
```

### Production (After deployment)
```
https://YOUR_PROJECT.supabase.co/functions/v1/pitch-deck-assistant
```

---

## Security Features Deployed

✅ **JWT Verification**: Validates auth token matches profile_id
✅ **CORS Restriction**: Only allows configured origin
✅ **Retry Logic**: Exponential backoff for transient errors
✅ **RLS Integration**: Additional security layer
✅ **Error Logging**: Security event monitoring

---

## Troubleshooting

### Deployment fails with "ANTHROPIC_API_KEY not configured"

```bash
# Set the secret
supabase secrets set ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY

# Redeploy
supabase functions deploy pitch-deck-assistant
```

### Function shows but not accessible

```bash
# Check function status
supabase functions list

# If STATUS is not ACTIVE, redeploy
supabase functions deploy pitch-deck-assistant --no-verify-jwt
```

### CORS errors in browser

```bash
# Verify ALLOWED_ORIGIN is set correctly
supabase secrets list | grep ALLOWED_ORIGIN

# Update if needed
supabase secrets set ALLOWED_ORIGIN=http://localhost:8080

# Redeploy
supabase functions deploy pitch-deck-assistant
```

---

## Success Criteria

- [ ] Function deployed successfully
- [ ] Appears in `supabase functions list`
- [ ] Test 1 (missing auth) returns 401 ✅
- [ ] Test 2 (invalid token) returns 401 ✅
- [ ] Logs show function started
- [ ] No error messages in logs

---

## Next Task

✅ Once complete → Proceed to **005-update-frontend.md**
