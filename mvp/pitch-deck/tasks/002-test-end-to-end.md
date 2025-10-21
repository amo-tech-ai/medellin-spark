# Task 006: Test End-to-End

**Status**: Pending
**Priority**: High
**Time**: 20 minutes
**Dependencies**: 005-update-frontend

---

## Objective

Perform comprehensive end-to-end testing of the complete Claude AI pitch deck assistant flow.

---

## Test Environment Setup

### 1. Ensure All Services Running

```bash
# Terminal 1: Supabase
supabase status

# Terminal 2: Frontend
pnpm dev

# Terminal 3: Monitor logs
supabase functions logs pitch-deck-assistant --tail
```

### 2. Open Application

**URL**: http://localhost:8080/pitch-deck-wizard

---

## Test Cases

### Test 1: Authentication Check

**Steps**:
1. Open pitch deck wizard
2. If not signed in, should redirect to auth or show sign-in prompt

**Expected**:
- ✅ User is authenticated
- ✅ No auth errors in console

**If fails**: Sign in first at `/auth` or create account

---

### Test 2: Initial Conversation

**Input**: "I need help creating a pitch deck for my startup"

**Expected Response**:
- ✅ Claude responds (not OpenAI generic response)
- ✅ Asks focused question about your company
- ✅ Response appears in conversation
- ✅ Progress bar shows 0%

**Check logs**:
```
[auth] Verified user {uuid}
[pitch-deck-assistant] Function started
```

---

### Test 3: Data Extraction - Company Info

**Input**: "My company is EventAI, we're in the event technology industry"

**Expected**:
- ✅ Claude acknowledges and asks next question
- ✅ Progress bar increases (maybe 15-20%)
- ✅ "Company Name" gets green dot
- ✅ "Industry" gets green dot

**Check logs**:
```
[tool] Saving startup data: {"company_name": "EventAI", "industry": "Event Technology"}
```

---

### Test 4: Data Extraction - Problem/Solution

**Input**: "We help event organizers manage attendees more efficiently. Our solution uses AI to automate check-ins and networking."

**Expected**:
- ✅ Progress increases to ~40-50%
- ✅ "Problem" gets green dot
- ✅ "Solution" gets green dot
- ✅ Claude asks about target market

---

### Test 5: Data Extraction - Market/Business Model

**Input**: "Our target market is corporate event organizers with 500+ attendees. We charge $5 per attendee per event."

**Expected**:
- ✅ Progress increases to 80%+
- ✅ "Target Market" gets green dot
- ✅ "Business Model" gets green dot
- ✅ **"Generate Deck" button appears** 🎉

---

### Test 6: Generate Pitch Deck

**Steps**:
1. Click "Generate Deck →" button
2. Wait for generation

**Expected**:
- ✅ Loading indicator shows
- ✅ No errors in console
- ✅ Redirects to `/pitch-deck/{id}/preview`
- ✅ Generated deck displays

**Check logs**:
```
Calling generate-pitch-deck function
Deck created with ID: {uuid}
```

---

### Test 7: Conversation Persistence

**Steps**:
1. Refresh page (F5)
2. Continue conversation

**Expected**:
- ✅ Conversation ID maintained
- ✅ Previous messages still visible
- ✅ Progress persists
- ✅ Can continue where left off

**Check database**:
```bash
supabase db execute "
  SELECT id, status,
         jsonb_array_length(messages) as message_count,
         collected_data->>'company_name' as company
  FROM pitch_conversations
  ORDER BY created_at DESC
  LIMIT 1
"
```

---

### Test 8: Multiple Conversations

**Steps**:
1. Complete one conversation
2. Start fresh conversation (refresh or new session)

**Expected**:
- ✅ New conversation_id created
- ✅ Progress resets to 0%
- ✅ Data collection starts fresh
- ✅ Previous conversation not affected

---

## Edge Case Testing

### Edge Case 1: Network Error

**Steps**:
1. Stop Supabase: `supabase stop`
2. Try to send message

**Expected**:
- ✅ User-friendly error message
- ✅ No app crash
- ✅ Can retry after Supabase restart

### Edge Case 2: Invalid/Incomplete Data

**Steps**:
1. Provide vague or incomplete information
2. Try to generate deck

**Expected**:
- ✅ Claude asks clarifying questions
- ✅ Generate button only appears at 80%+
- ✅ Data validation works

### Edge Case 3: Long Conversation

**Steps**:
1. Have extended conversation (15+ messages)

**Expected**:
- ✅ No timeouts
- ✅ All messages saved
- ✅ Response time stays reasonable (< 5s)

---

## Performance Checks

### Response Time

**Acceptable**:
- Initial response: < 3 seconds
- Subsequent responses: < 5 seconds
- Tool execution: < 2 seconds

**Monitor logs**:
```
[retry] Attempt 1 succeeded (should see this, not retry attempts)
```

### Database Operations

```bash
# Check conversation count
supabase db execute "SELECT COUNT(*) FROM pitch_conversations"

# Check message volume
supabase db execute "
  SELECT
    id,
    jsonb_array_length(messages) as msgs,
    status
  FROM pitch_conversations
"
```

---

## Security Verification

### Check 1: JWT Validation

**Test**: Try to access API without auth token

```bash
SUPABASE_URL=$(grep VITE_SUPABASE_URL .env | cut -d '=' -f2)

curl -X POST "${SUPABASE_URL}/functions/v1/pitch-deck-assistant" \
  -H "Content-Type: application/json" \
  -d '{"profile_id": "test", "message": "hi"}'
```

**Expected**: `401 Missing authorization header`

### Check 2: Profile ID Mismatch

**Cannot easily test in browser** - would need to manipulate JWT
- Trust that Edge Function validation is working
- Monitor logs for any `[auth] profile_id mismatch` warnings

### Check 3: CORS

**Test**: Check browser network tab
- ✅ No CORS errors
- ✅ Requests complete successfully

---

## Troubleshooting Guide

### Issue: "Please sign in to continue"
**Fix**: Sign in at `/auth`

### Issue: No response from Claude
**Check**:
```bash
# Edge Function deployed?
supabase functions list | grep pitch-deck-assistant

# Secrets set?
supabase secrets list | grep ANTHROPIC_API_KEY
```

### Issue: Progress bar stuck at 0%
**Check**:
- Edge Function returning `completeness` field?
- Check browser console for errors
- Check logs: `supabase functions logs pitch-deck-assistant`

### Issue: Generate button never appears
**Check**:
- Provide ALL required data (company, industry, problem, solution, market, model)
- Completeness must reach 80%+

---

## Test Results Template

```
TEST RESULTS - [DATE]
====================

Test 1 - Authentication:           [ ] PASS  [ ] FAIL
Test 2 - Initial Conversation:     [ ] PASS  [ ] FAIL
Test 3 - Company Info Extraction:  [ ] PASS  [ ] FAIL
Test 4 - Problem/Solution:         [ ] PASS  [ ] FAIL
Test 5 - Market/Business Model:    [ ] PASS  [ ] FAIL
Test 6 - Generate Deck:            [ ] PASS  [ ] FAIL
Test 7 - Persistence:              [ ] PASS  [ ] FAIL
Test 8 - Multiple Conversations:   [ ] PASS  [ ] FAIL

Edge Case 1 - Network Error:       [ ] PASS  [ ] FAIL
Edge Case 2 - Invalid Data:        [ ] PASS  [ ] FAIL
Edge Case 3 - Long Conversation:   [ ] PASS  [ ] FAIL

Security Check 1 - JWT:            [ ] PASS  [ ] FAIL
Security Check 2 - CORS:           [ ] PASS  [ ] FAIL

Performance:
- Avg Response Time: ___ seconds
- Database Queries:  ___ ms
- No errors:         [ ] YES  [ ] NO

OVERALL STATUS:  [ ] READY FOR PRODUCTION  [ ] NEEDS FIXES
```

---

## Success Criteria

- [ ] All 8 main tests pass
- [ ] All 3 edge cases handled gracefully
- [ ] Security checks pass
- [ ] Response times acceptable (< 5s)
- [ ] No console errors
- [ ] Conversation persists correctly
- [ ] Data extraction works accurately
- [ ] Generate button appears at 80%+
- [ ] Deck generation succeeds

---

## Next Task

✅ Once all tests pass → Proceed to **007-production-deployment.md**

If any tests fail → Go back to **005-update-frontend.md** to fix issues
