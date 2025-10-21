# ✅ Daily Testing Checklist - Pitch Deck System

**Purpose**: Quick reference for daily testing
**Duration**: 15-20 minutes
**Frequency**: Before each deployment

---

## 🚀 QUICK START (5 min)

```bash
cd /home/sk/medellin-spark

# 1. Pull latest code
git pull

# 2. Install dependencies
pnpm install

# 3. Check TypeScript
pnpm tsc --noEmit

# 4. Start dev server
pnpm dev
```

**✅ Success**: Server running on http://localhost:8080

---

## 🔍 DATABASE CHECKS (2 min)

### Quick Verification
```sql
-- 1. Test presentation is public
SELECT id, is_public FROM presentations
WHERE id = 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81';
-- Expected: is_public = true

-- 2. RLS enabled
SELECT tablename, rowsecurity FROM pg_tables
WHERE tablename IN ('presentations', 'pitch_conversations');
-- Expected: Both = true
```

**✅ Success**: Both checks pass

---

## 🔧 BACKEND CHECKS (3 min)

### Edge Functions Status
```bash
# Check all functions deployed
supabase functions list

# Expected:
# ✅ chat
# ✅ pitch-deck-assistant
# ✅ generate-pitch-deck
```

### Quick API Test
```bash
# Test chat function (should return 401)
curl -X POST \
  https://dhesktsqhcxhqfjypulk.supabase.co/functions/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": []}'

# Expected: 401 Unauthorized
```

**✅ Success**: All functions active, auth working

---

## 🎨 FRONTEND CHECKS (10 min)

### Test 1: Chat Interface (3 min)
1. Navigate: http://localhost:8080/pitch-deck-wizard
2. Verify: Page loads, no console errors
3. Type: "I want to create a pitch deck for an AI startup"
4. Click: Send
5. Verify: AI responds

**✅ Success**: Chat working

### Test 2: Progress Tracking (2 min)
1. Continue conversation (2-3 messages)
2. Verify: Progress bar updates
3. Verify: Sidebar shows collected data

**✅ Success**: Progress tracking working

### Test 3: Slide Grid (3 min)
1. Navigate: http://localhost:8080/presentations/d4a27c1c-8b2d-48a9-99c9-2298037e9e81/outline
2. Verify: All 10 slides render
3. Verify: No "Loading..." stuck
4. Click: First slide
5. Verify: Slide details load

**✅ Success**: Slide grid working

### Test 4: Console Check (2 min)
1. Open DevTools → Console
2. Verify: No red errors
3. Verify: No RLS policy violations
4. Check: Network tab shows 200 responses

**✅ Success**: No errors

---

## 🏗️ BUILD CHECKS (5 min)

### Production Build
```bash
# Build for production
pnpm build

# Expected: ✅ Build succeeds in < 5 seconds
```

### Preview Test
```bash
# Test production build
pnpm preview

# Navigate to preview URL
# Test: Chat interface loads
# Test: Slide grid loads
```

**✅ Success**: Production build works

---

## 🔒 SECURITY CHECKS (Quick)

```
[ ] No API keys in frontend code
[ ] .env not in git (git status)
[ ] CORS configured (not wildcard *)
[ ] RLS enabled on all tables
[ ] JWT validation working (401 test)
```

**✅ Success**: All security checks pass

---

## 📊 PERFORMANCE CHECKS (Optional)

### Response Times
```
Chat response: < 3 seconds
Generate deck: < 15 seconds
Slide grid load: < 2 seconds
```

### Bundle Size
```bash
# Check dist/ folder size
du -sh dist/

# Expected: < 2MB
```

**✅ Success**: Performance acceptable

---

## 🐛 COMMON ISSUES & QUICK FIXES

### Issue: "Loading..." stuck
**Fix**: Check RLS policies, mark presentation public

### Issue: 401 Unauthorized
**Fix**: Check JWT token, re-authenticate

### Issue: TypeScript errors
**Fix**: Run `pnpm install`, check imports

### Issue: Blank page
**Fix**: Check console errors, verify API endpoints

---

## 📋 PRE-DEPLOYMENT CHECKLIST

```
Code Quality:
[ ] TypeScript compiles
[ ] No console errors
[ ] No lint warnings

Functionality:
[ ] Chat works
[ ] Progress tracking works
[ ] Generate deck works
[ ] Slide grid renders

Backend:
[ ] All Edge Functions deployed
[ ] Secrets configured
[ ] Database migrations applied

Build:
[ ] Production build succeeds
[ ] Preview tested
[ ] Bundle size acceptable

Security:
[ ] No secrets exposed
[ ] RLS active
[ ] JWT validation working
```

**✅ ALL CHECKS PASS** → Ready to deploy

---

## 🎯 SEVERITY LEVELS

### 🔴 CRITICAL (Block Deployment)
- Production build fails
- Chat doesn't work
- Database errors
- Security vulnerabilities

### 🟡 HIGH (Fix Before Deploy)
- TypeScript errors
- Console errors
- Missing features
- Performance issues

### 🟢 LOW (Can Deploy)
- Minor UI issues
- Non-critical warnings
- Optimization opportunities

---

## 📞 EMERGENCY ROLLBACK

If production breaks:

```bash
# 1. Rollback git
git reset --hard HEAD~1
git push --force

# 2. Redeploy previous version
pnpm build
# Deploy via Lovable/Vercel

# 3. Check Edge Functions
supabase functions deploy --all

# 4. Verify
# Test all critical paths
```

---

## ✅ DAILY ROUTINE

### Morning (Before Development)
1. Run Quick Start (5 min)
2. Run Frontend Checks (10 min)
3. Fix any issues found

### Evening (Before Committing)
1. Run Build Checks (5 min)
2. Run Security Checks (2 min)
3. Complete Pre-Deployment Checklist

### Before Production Deploy
1. Complete ALL checklists
2. Run E2E test manually
3. Get approval from team
4. Deploy during low-traffic hours

---

**Last Updated**: 2025-10-17
**Estimated Time**: 15-20 minutes
**Frequency**: Daily before commits
**Status**: Ready to use
