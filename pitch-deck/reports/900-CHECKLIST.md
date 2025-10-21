# Implementation Checklist - Claude AI Pitch Deck Assistant

**Print this and check off as you go!**

---

## 📋 Task 001: Verify Prerequisites (10 min)

- [ ] Get Anthropic API key from console.anthropic.com
- [ ] Supabase running: `supabase status`
- [ ] .env file exists with VITE_SUPABASE_URL
- [ ] Dependencies installed: `pnpm install`
- [ ] Database connection works: `supabase db execute "SELECT NOW()"`
- [ ] TypeScript compiles: `pnpm tsc --noEmit`

---

## 🔑 Task 002: Configure Secrets (5 min)

- [ ] Set ANTHROPIC_API_KEY: `supabase secrets set ANTHROPIC_API_KEY=sk-ant-...`
- [ ] Set ALLOWED_ORIGIN: `supabase secrets set ALLOWED_ORIGIN=http://localhost:8080`
- [ ] Verify secrets: `supabase secrets list`
- [ ] Both secrets appear in list

---

## 💾 Task 003: Apply Database Migration (5 min)

- [ ] Migration file exists: `ls supabase/migrations/20251016210000_create_pitch_conversations.sql`
- [ ] Apply migration: `supabase db reset`
- [ ] Verify table: `supabase db execute "SELECT tablename FROM pg_tables WHERE tablename = 'pitch_conversations'"`
- [ ] Verify RLS enabled: `supabase db execute "SELECT relrowsecurity FROM pg_class WHERE relname = 'pitch_conversations'"`
- [ ] Result shows `t` (true)
- [ ] Verify 4 policies created

---

## 🚀 Task 004: Deploy Edge Function (10 min)

- [ ] Function file exists: `ls supabase/functions/pitch-deck-assistant/index.ts`
- [ ] Deploy function: `supabase functions deploy pitch-deck-assistant`
- [ ] Verify deployment: `supabase functions list`
- [ ] Status shows ACTIVE
- [ ] Test missing auth (401): `curl -X POST $SUPABASE_URL/functions/v1/pitch-deck-assistant ...`
- [ ] Test invalid token (401): `curl -X POST ... -H "Authorization: Bearer FAKE"`
- [ ] Monitor logs: `supabase functions logs pitch-deck-assistant --tail`

---

## 🎨 Task 005: Update Frontend (30 min)

### Add State (Line ~43)
- [ ] Add conversationId state
- [ ] Add completeness state
- [ ] Add collectedData state
- [ ] Add readyToGenerate state

### Add Auth Hooks
- [ ] Import useSupabaseClient
- [ ] Import useUser
- [ ] Get supabase client
- [ ] Get current user

### Update API Call (Line ~64-95)
- [ ] Change endpoint to `/pitch-deck-assistant`
- [ ] Get session: `await supabase.auth.getSession()`
- [ ] Pass JWT token in Authorization header
- [ ] Send conversation_id
- [ ] Send profile_id (user?.id)

### Update Response Handling
- [ ] Set conversationId from response
- [ ] Set completeness from response
- [ ] Set collectedData from response
- [ ] Set readyToGenerate from response

### Add Progress Indicator (Line ~154)
- [ ] Add progress bar component
- [ ] Show completeness percentage
- [ ] Add data collection checklist

### Add DataItem Component
- [ ] Create DataItem component
- [ ] Show green dot when filled
- [ ] Show field labels

### Add Generate Button (Line ~239)
- [ ] Add generate button (shows when ready)
- [ ] Add handleGenerateDeck function
- [ ] Call generate-pitch-deck endpoint
- [ ] Navigate to preview on success

### Add Toast Notifications
- [ ] Install sonner: `pnpm add sonner`
- [ ] Import toast
- [ ] Add Toaster to App.tsx
- [ ] Use toast for errors

---

## 🧪 Task 006: Test End-to-End (20 min)

### Environment
- [ ] Supabase running
- [ ] Frontend running: `pnpm dev`
- [ ] Logs monitoring: `supabase functions logs pitch-deck-assistant --tail`

### Test 1: Authentication
- [ ] Open http://localhost:8080/pitch-deck-wizard
- [ ] User authenticated
- [ ] No auth errors

### Test 2: Initial Conversation
- [ ] Send: "I need help creating a pitch deck"
- [ ] Claude responds
- [ ] Progress shows 0%
- [ ] Logs show "[auth] Verified user"

### Test 3: Company Info
- [ ] Send: "My company is EventAI, event technology"
- [ ] Progress increases (~20%)
- [ ] "Company Name" gets green dot
- [ ] "Industry" gets green dot
- [ ] Logs show "[tool] Saving startup data"

### Test 4: Problem/Solution
- [ ] Provide problem and solution
- [ ] Progress increases (~50%)
- [ ] "Problem" gets green dot
- [ ] "Solution" gets green dot

### Test 5: Market/Model
- [ ] Provide target market and business model
- [ ] Progress reaches 80%+
- [ ] "Target Market" gets green dot
- [ ] "Business Model" gets green dot
- [ ] **Generate button appears!**

### Test 6: Generate Deck
- [ ] Click "Generate Deck" button
- [ ] No errors in console
- [ ] Redirects to preview
- [ ] Deck displays

### Test 7: Persistence
- [ ] Refresh page (F5)
- [ ] Conversation persists
- [ ] Progress persists
- [ ] Can continue conversation

### Security Tests
- [ ] Test without auth returns 401
- [ ] No CORS errors in console
- [ ] Logs show no security warnings

---

## 🌐 Task 007: Production Deployment (30 min)

### Update Secrets
- [ ] Set production ALLOWED_ORIGIN: `supabase secrets set ALLOWED_ORIGIN=https://your-domain.com`
- [ ] Verify ANTHROPIC_API_KEY set
- [ ] List all secrets

### Deploy Database
- [ ] Push migration: `supabase db push --linked`
- [ ] Verify table in production
- [ ] Verify RLS enabled in production

### Deploy Function
- [ ] Deploy: `supabase functions deploy pitch-deck-assistant`
- [ ] Verify in function list (ACTIVE)
- [ ] Test security (401 without auth)

### Deploy Frontend
- [ ] Build: `pnpm build`
- [ ] Preview: `pnpm preview`
- [ ] Update production .env
- [ ] Deploy to hosting (Vercel/Netlify)

### Production Test
- [ ] Open production site
- [ ] Sign in
- [ ] Start conversation
- [ ] Verify Claude responds
- [ ] Check progress tracking
- [ ] Generate deck (optional)

### Monitoring
- [ ] Monitor function logs
- [ ] Check error rate < 5%
- [ ] Check response time < 5s
- [ ] No security incidents

---

## ✅ Final Verification

### Security Checklist
- [ ] JWT verification working (401 on invalid)
- [ ] CORS restricted to domain (not '*')
- [ ] RLS enabled on pitch_conversations
- [ ] No API keys in frontend code
- [ ] Profile ID mismatch blocked (403)

### Functional Checklist
- [ ] Conversations save correctly
- [ ] Data extraction works
- [ ] Progress tracking accurate
- [ ] Generate button at 80%+
- [ ] Deck generation succeeds
- [ ] No console errors

### Performance Checklist
- [ ] Response time < 5 seconds
- [ ] No timeouts
- [ ] Database queries fast
- [ ] Retry logic working

---

## 🎉 Success!

**MVP Complete** when all boxes checked ✅

**Production Score**: 95/100

**Time Spent**: _____ hours

**Notes**:
```
[Add any notes, issues encountered, or improvements for next time]




```

---

**Date Completed**: ________________

**Deployed By**: ________________

**Production URL**: ________________

---

**Congratulations!** 🚀

You've built a production-ready Claude AI pitch deck assistant!
