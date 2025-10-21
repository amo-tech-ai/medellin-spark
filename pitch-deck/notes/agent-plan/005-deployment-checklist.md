# Deployment Checklist - MVP to Production

**Time**: 30 minutes
**Final step before going live**

---

## Pre-Deployment Checklist

### 1. Database ✓
- [ ] Migration applied: `20251016210000_create_pitch_conversations.sql`
- [ ] Table exists: `pitch_conversations`
- [ ] RLS enabled: `relrowsecurity = true`
- [ ] 4 policies created (SELECT, INSERT, UPDATE, DELETE)
- [ ] Indexes created

**Verify**:
```bash
supabase db execute "SELECT relrowsecurity FROM pg_class WHERE relname = 'pitch_conversations'"
# Expected: t (true)
```

---

### 2. Edge Function ✓
- [ ] Function created: `pitch-deck-assistant`
- [ ] API key set: `ANTHROPIC_API_KEY`
- [ ] CORS configured: `ALLOWED_ORIGIN`
- [ ] Tool-use loop implemented correctly
- [ ] Error handling in place
- [ ] Tested locally

**Verify**:
```bash
supabase functions list
# Expected: pitch-deck-assistant (deployed)

supabase secrets list
# Expected: ANTHROPIC_API_KEY, ALLOWED_ORIGIN
```

---

### 3. Frontend ✓
- [ ] PitchDeckWizard.tsx updated
- [ ] New endpoint: `/pitch-deck-assistant`
- [ ] State management added
- [ ] Progress indicator working
- [ ] Generate button appears at 80%+
- [ ] Tested in browser

**Verify**:
```bash
# Start dev server
pnpm dev

# Open http://localhost:8080/pitch-deck-wizard
# Test conversation flow
```

---

### 4. Environment Variables ✓

**Local (.env)**:
```bash
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=your-local-anon-key

# DO NOT ADD (server-side only):
# ANTHROPIC_API_KEY
# SUPABASE_SERVICE_ROLE_KEY
```

**Production (Supabase secrets)**:
```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-api03-...
supabase secrets set ALLOWED_ORIGIN=https://your-production-domain.com
```

---

## Deployment Steps

### Step 1: Local Testing (10 min)

```bash
# Start Supabase
supabase start

# Apply migrations
supabase db reset

# Start Edge Function
supabase functions serve pitch-deck-assistant

# In another terminal, start frontend
pnpm dev
```

**Test Flow**:
1. Open http://localhost:8080/pitch-deck-wizard
2. Start conversation: "I need a pitch deck"
3. Provide company info
4. Verify data extraction works
5. Verify completeness updates
6. Verify "Generate" button appears
7. Click generate and verify deck creation

---

### Step 2: Deploy Database (2 min)

```bash
# Push migrations to production
supabase db push

# Verify in production
supabase db execute "SELECT COUNT(*) FROM pitch_conversations" --linked
```

---

### Step 3: Deploy Edge Function (5 min)

```bash
# Deploy function
supabase functions deploy pitch-deck-assistant

# Test production endpoint
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/pitch-deck-assistant \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "test",
    "profile_id": "test-id"
  }'
```

**Expected**: JSON response with `conversation_id`

---

### Step 4: Deploy Frontend (5 min)

```bash
# Build production bundle
pnpm build

# Preview build locally
pnpm preview

# Deploy to hosting (Vercel/Netlify/etc.)
# Or upload dist/ to your hosting service
```

---

### Step 5: Production Smoke Test (5 min)

**Test in production**:
1. Go to https://your-domain.com/pitch-deck-wizard
2. Sign in (if required)
3. Start new conversation
4. Provide company details
5. Verify Claude responds
6. Verify progress updates
7. Complete conversation to 80%+
8. Click "Generate Deck"
9. Verify deck created
10. Check database has conversation record

---

## Post-Deployment Verification

### Check Logs

**Edge Function logs**:
```bash
supabase functions logs pitch-deck-assistant --tail
```

Look for:
- `[pitch-deck-assistant] Function started`
- `[tool] Saving startup data: {...}`
- No error messages

**Database logs**:
```bash
supabase db execute "
  SELECT id, status, created_at
  FROM pitch_conversations
  ORDER BY created_at DESC
  LIMIT 10
"
```

---

### Monitor Metrics

**Check**:
- [ ] Function invocations (Supabase dashboard)
- [ ] Response times (should be < 5s)
- [ ] Error rate (should be < 5%)
- [ ] Database query performance

---

### Security Verification

**Double-check**:
- [ ] No API keys in frontend code
- [ ] CORS restricted to your domain (not `'*'`)
- [ ] RLS enabled on `pitch_conversations`
- [ ] Service role key not exposed

**Test**:
```bash
# Try to access other user's data (should fail)
curl https://YOUR_PROJECT.supabase.co/rest/v1/pitch_conversations \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer ANOTHER_USER_TOKEN"
```

**Expected**: Empty array `[]` (RLS blocks it)

---

## Rollback Plan

**If something goes wrong**:

### Rollback Database:
```bash
# Revert migration
supabase db execute "DROP TABLE IF EXISTS pitch_conversations CASCADE"
```

### Rollback Edge Function:
```bash
# Switch frontend back to /chat endpoint
# In PitchDeckWizard.tsx:
const response = await fetch(`${SUPABASE_URL}/functions/v1/chat`, ...);
```

### Rollback Frontend:
```bash
# Revert to previous commit
git revert HEAD
git push

# Redeploy
pnpm build
# Upload to hosting
```

---

## Common Issues

### Issue: "ANTHROPIC_API_KEY not configured"
**Fix**:
```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-api03-...
supabase functions deploy pitch-deck-assistant
```

### Issue: CORS error in browser
**Fix**:
```bash
supabase secrets set ALLOWED_ORIGIN=https://your-domain.com
supabase functions deploy pitch-deck-assistant
```

### Issue: "permission denied for table"
**Fix**: Check RLS policies and ensure migration applied

### Issue: Function times out
**Fix**: Check tool-use loop has max iterations (currently 5)

### Issue: Completeness stuck at 0%
**Fix**: Verify `save_startup_data` tool is being called

---

## Success Metrics

**Within first 24 hours**:
- [ ] 10+ successful conversations
- [ ] 5+ pitch decks generated
- [ ] < 5% error rate
- [ ] < 5s average response time
- [ ] No security issues reported

---

## Monitoring Setup

### Add to monitoring dashboard:
- API response times
- Error rates per endpoint
- Conversation completion rate
- Token usage (cost tracking)
- Database query performance

### Set up alerts for:
- Error rate > 10%
- Response time > 10s
- API key issues
- Database connection failures

---

## What's Next (Post-MVP)

**Phase 2 Improvements**:
1. Add SSE streaming (better UX)
2. Implement rate limiting (prevent abuse)
3. Add retry logic with exponential backoff
4. Cost tracking and usage analytics
5. Message compaction (summarize old messages)
6. A/B testing different prompts
7. User feedback collection
8. Advanced error recovery

---

## Cost Estimate

**Claude API (Sonnet 3.5)**:
- Input: $3 per 1M tokens
- Output: $15 per 1M tokens

**Per conversation** (~10 messages):
- Tokens: ~3,000 total
- Cost: ~$0.03

**Monthly estimate** (1000 users):
- Conversations: 1,000
- Cost: ~$30/month

**Compare to OpenAI GPT-4**:
- Same usage: ~$90/month
- **Savings**: $60/month (67% cheaper)

---

## Support Resources

**Documentation**:
- Claude API: https://docs.anthropic.com/
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- Tool use guide: https://docs.anthropic.com/en/docs/build-with-claude/tool-use

**Get Help**:
- Anthropic Discord: https://discord.gg/anthropic
- Supabase Discord: https://discord.supabase.com
- GitHub Issues: Your repo

---

## Final Checklist

Before announcing launch:
- [ ] All tests passing
- [ ] Security verified
- [ ] Performance acceptable
- [ ] Error handling works
- [ ] Rollback plan ready
- [ ] Monitoring in place
- [ ] Support docs updated
- [ ] Team trained on new system

---

## 🎉 Congratulations!

Your Claude AI pitch deck agent is live!

**You've built**:
- Intelligent conversation system
- Data extraction with function calling
- Persistent conversation state
- Progress tracking UI
- Automated pitch deck generation

**Time invested**: 6-8 hours
**User value**: Infinite

---

**Questions?** Refer back to:
- `001-mvp-overview.md` - Overall plan
- `002-database-setup.md` - Database help
- `003-edge-function-setup.md` - Function debugging
- `004-frontend-integration.md` - UI issues

**Need help?** Check logs, verify environment variables, test locally first.

---

**End of MVP Deployment Guide** ✅
