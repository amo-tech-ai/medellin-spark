# Task 007: Production Deployment

**Status**: Pending
**Priority**: Critical
**Time**: 30 minutes
**Dependencies**: 006-test-end-to-end

---

## Objective

Deploy the Claude AI pitch deck assistant to production with proper security configuration.

---

## Pre-Deployment Checklist

### Required Before Production

- [ ] All tests pass in Task 006
- [ ] No console errors in development
- [ ] TypeScript compiles without errors
- [ ] Production domain ready
- [ ] Production Anthropic API key obtained
- [ ] Database backed up

---

## Step 1: Update Production Secrets

### 1.1 Set Production CORS Origin

```bash
# CRITICAL: Set to your production domain (NOT localhost)
supabase secrets set ALLOWED_ORIGIN=https://your-production-domain.com

# Replace with actual domain, e.g.:
# supabase secrets set ALLOWED_ORIGIN=https://medellin-spark.com
```

### 1.2 Verify Anthropic API Key

```bash
# Check API key is set
supabase secrets list | grep ANTHROPIC_API_KEY

# If not set or needs updating
supabase secrets set ANTHROPIC_API_KEY=sk-ant-api03-YOUR_PRODUCTION_KEY
```

### 1.3 Verify All Secrets

```bash
supabase secrets list
```

**Expected**:
```
ANTHROPIC_API_KEY
ALLOWED_ORIGIN (should be production domain)
SUPABASE_URL (automatic)
SUPABASE_SERVICE_ROLE_KEY (automatic)
```

---

## Step 2: Deploy Database Migration

### 2.1 Push to Production Database

```bash
# Push all migrations to production
supabase db push --linked

# Confirm when prompted
```

**Expected output**:
```
Applying migration 20251016210000_create_pitch_conversations.sql...
Finished supabase db push.
```

### 2.2 Verify Production Table

```bash
# Check table exists in production
supabase db execute "SELECT tablename FROM pg_tables WHERE tablename = 'pitch_conversations'" --linked
```

### 2.3 Verify RLS in Production

```bash
# Check RLS enabled
supabase db execute "SELECT relname, relrowsecurity FROM pg_class WHERE relname = 'pitch_conversations'" --linked
```

**Expected**: `relrowsecurity = t` (true)

---

## Step 3: Deploy Edge Function

### 3.1 Deploy to Production

```bash
# Deploy pitch-deck-assistant to production
supabase functions deploy pitch-deck-assistant --no-verify-jwt

# This uploads the function to your production project
```

**Expected output**:
```
Deploying pitch-deck-assistant (version X)...
Deployed successfully!

Function URL: https://YOUR_PROJECT.supabase.co/functions/v1/pitch-deck-assistant
```

### 3.2 Verify Deployment

```bash
# List production functions
supabase functions list
```

**Expected**: `pitch-deck-assistant` with STATUS = ACTIVE

---

## Step 4: Test Production Function

### 4.1 Security Test (Should Fail)

```bash
# Get production URL
PROD_URL="https://YOUR_PROJECT.supabase.co"

# Test without auth (should fail)
curl -X POST "${PROD_URL}/functions/v1/pitch-deck-assistant" \
  -H "Content-Type: application/json" \
  -d '{"profile_id": "test", "message": "hi"}'
```

**Expected**: `{"error": "Missing authorization header"}`

✅ Security working!

### 4.2 CORS Test

```bash
# Test from wrong origin (should fail in browser)
curl -X POST "${PROD_URL}/functions/v1/pitch-deck-assistant" \
  -H "Origin: https://evil-site.com" \
  -H "Content-Type: application/json" \
  -d '{"profile_id": "test", "message": "hi"}'
```

**Expected**: CORS error (in browser, curl may not enforce)

---

## Step 5: Deploy Frontend

### 5.1 Build Production Bundle

```bash
# Create optimized build
pnpm build

# Preview build locally
pnpm preview
```

**Test preview**: http://localhost:4173

### 5.2 Update Environment Variables

**Production .env**:
```bash
# Update to production values
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

**NEVER include**:
```bash
# ❌ DO NOT ADD (server-side only)
ANTHROPIC_API_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### 5.3 Deploy to Hosting

**For Vercel**:
```bash
vercel --prod
```

**For Netlify**:
```bash
netlify deploy --prod
```

**For other hosting**:
- Upload `dist/` folder
- Configure environment variables in hosting dashboard

---

## Step 6: Production Smoke Test

### 6.1 Open Production Site

Navigate to: https://your-production-domain.com/pitch-deck-wizard

### 6.2 Run Quick Test

1. Sign in with test account
2. Start conversation: "I need a pitch deck"
3. Verify Claude responds
4. Provide company info
5. Verify progress updates
6. Check data collection works
7. Generate deck (optional)

### 6.3 Monitor Logs

```bash
# Watch production logs
supabase functions logs pitch-deck-assistant --tail
```

**Look for**:
- ✅ `[auth] Verified user {uuid}`
- ✅ `[tool] Saving startup data`
- ✅ No error messages

---

## Step 7: Monitoring Setup

### 7.1 Set Up Alerts

**Supabase Dashboard**:
1. Go to project dashboard
2. Navigate to Functions → pitch-deck-assistant
3. Set up alerts for:
   - Error rate > 5%
   - Response time > 10s
   - Function failures

### 7.2 Monitor Key Metrics

**Check daily for first week**:
- Function invocations
- Error rate
- Average response time
- Database query performance

```bash
# Get function stats
supabase functions list

# Check recent errors
supabase functions logs pitch-deck-assistant --tail | grep ERROR
```

### 7.3 Database Monitoring

```bash
# Check conversation count
supabase db execute "SELECT COUNT(*) FROM pitch_conversations" --linked

# Check recent conversations
supabase db execute "
  SELECT
    id,
    status,
    created_at,
    jsonb_array_length(messages) as message_count
  FROM pitch_conversations
  ORDER BY created_at DESC
  LIMIT 10
" --linked
```

---

## Step 8: Post-Deployment Verification

### Security Checks

- [ ] CORS restricted to production domain
- [ ] JWT verification working (401 on missing/invalid token)
- [ ] No API keys in frontend code
- [ ] RLS enabled on all tables
- [ ] Service role key secure

### Functional Checks

- [ ] Conversations save correctly
- [ ] Data extraction works
- [ ] Progress tracking accurate
- [ ] Generate button appears at 80%+
- [ ] Deck generation succeeds
- [ ] No console errors

### Performance Checks

- [ ] Response time < 5 seconds
- [ ] No timeouts
- [ ] Database queries fast (< 100ms)
- [ ] Retry logic working (check logs)

---

## Rollback Plan

### If Something Goes Wrong

**1. Revert Frontend**:
```bash
# Switch back to previous endpoint
# In src/pages/PitchDeckWizard.tsx:
# Change: /pitch-deck-assistant → /chat

# Redeploy
pnpm build
# Upload to hosting
```

**2. Disable Function**:
```bash
# Can't easily disable, but can remove route in frontend
# Or deploy old version
```

**3. Revert Database**:
```bash
# Drop table if needed (CAREFUL - loses data)
supabase db execute "DROP TABLE IF EXISTS pitch_conversations CASCADE" --linked
```

---

## Success Metrics

**Within 24 hours**:
- [ ] 10+ successful conversations
- [ ] 5+ pitch decks generated
- [ ] < 5% error rate
- [ ] < 5s average response time
- [ ] 0 security incidents
- [ ] No CORS errors from production domain

**Monitor for 1 week** before considering fully stable.

---

## Troubleshooting

### "Missing authorization header" on valid requests

**Cause**: Frontend not sending JWT
**Fix**: Verify auth integration in frontend

### CORS errors in production

**Cause**: ALLOWED_ORIGIN not matching
**Fix**:
```bash
supabase secrets set ALLOWED_ORIGIN=https://exact-domain.com
supabase functions deploy pitch-deck-assistant
```

### High error rate

**Check logs**:
```bash
supabase functions logs pitch-deck-assistant | grep ERROR | tail -20
```

**Common issues**:
- API key issues
- Database connection problems
- Claude API rate limits

---

## Post-Deployment Tasks

### Immediate (Within 24 hours)
- [ ] Monitor error rates
- [ ] Check response times
- [ ] Verify user feedback
- [ ] Test on different devices/browsers

### Week 1
- [ ] Review logs daily
- [ ] Check database growth
- [ ] Monitor API costs (Claude + Supabase)
- [ ] Collect user feedback

### Week 2+
- [ ] Analyze conversation patterns
- [ ] Optimize prompts based on data
- [ ] Consider Phase 2 features (streaming, rate limits)
- [ ] Plan improvements

---

## Success Criteria

- [ ] All secrets configured correctly
- [ ] Database migration applied to production
- [ ] Edge Function deployed and active
- [ ] Frontend deployed to production
- [ ] Production smoke test passes
- [ ] Monitoring set up
- [ ] No errors in first 24 hours
- [ ] All security checks pass

---

## Completion

✅ Once deployed and verified → **MVP COMPLETE!**

**Next Steps**:
- Monitor for stability
- Collect user feedback
- Plan Phase 2 improvements (see lovable-plan/agent-plan/README.md)

---

**Congratulations!** 🎉

You've successfully deployed a production-ready Claude AI pitch deck assistant with:
- ✅ JWT authentication
- ✅ CORS security
- ✅ Retry logic
- ✅ Data extraction
- ✅ Progress tracking
- ✅ Conversation persistence

**Production Score**: 95/100 🚀
