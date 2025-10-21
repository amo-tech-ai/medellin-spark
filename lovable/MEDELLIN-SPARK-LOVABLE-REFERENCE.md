# 🚀 Medellin Spark - Lovable Deployment Reference

**Project-Specific Guide for AI Startup Accelerator Platform**

**Project:** Medellin Spark
**Tech Stack:** React + TypeScript + Vite + Supabase + OpenAI
**Supabase Project:** `dhesktsqhcxhqfjypulk`

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Architecture](#project-architecture)
3. [Supabase Configuration](#supabase-configuration)
4. [Environment Variables](#environment-variables)
5. [Edge Functions](#edge-functions)
6. [Security & RLS](#security--rls)
7. [Dashboard Pages](#dashboard-pages)
8. [Troubleshooting](#troubleshooting)
9. [Deployment Checklist](#deployment-checklist)

---

## ⚡ Quick Start

### **Current Lovable Setup Status:**

✅ **Working Configuration:**
- Supabase client properly configured
- Edge Functions deployed (chat, pitch-deck-assistant, generate-pitch-deck)
- RLS policies enabled on all tables
- Authentication flow with PKCE
- Dashboard UI responsive and accessible (96/100 WCAG AA)

### **File to Update for Lovable Deployment:**

**Primary File:** `src/lib/supabase.ts`

**Current Configuration (Local Development):**
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

**Lovable-Compatible Configuration:**
```typescript
// Hardcoded for Lovable deployment (safe - public keys only)
const supabaseUrl = 'https://dhesktsqhcxhqfjypulk.supabase.co';
const supabaseAnonKey = 'YOUR_ANON_KEY_HERE'; // Get from Supabase Dashboard
```

---

## 🏗️ Project Architecture

### **File Structure:**
```
medellin-spark/
├── src/
│   ├── components/
│   │   ├── dashboard/        # Dashboard components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── DashboardSidebar.tsx
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── LoadingState.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── ui/               # shadcn/ui components
│   │   └── presentation/     # Pitch deck components
│   ├── pages/
│   │   ├── Dashboard.tsx     # Main dashboard
│   │   ├── DashboardEvents.tsx
│   │   ├── DashboardPitchDecks.tsx
│   │   ├── DashboardJobs.tsx      # TODO: Implement
│   │   ├── PitchDeckWizard.tsx
│   │   └── presentations/
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useDashboardMetrics.ts
│   │   ├── useMyEvents.ts
│   │   └── usePresentationsQuery.ts
│   ├── lib/
│   │   └── supabase.ts       # ⚠️ UPDATE THIS FOR LOVABLE
│   └── types/
│       └── database.ts       # Generated from Supabase
├── supabase/
│   ├── functions/
│   │   ├── chat/             # OpenAI proxy (secure)
│   │   ├── pitch-deck-assistant/
│   │   └── generate-pitch-deck/
│   ├── migrations/           # Database schema
│   └── config.toml
└── .env                      # Local only - NOT used by Lovable
```

---

## 🔧 Supabase Configuration

### **Project Details:**

**Supabase Project Reference:** `dhesktsqhcxhqfjypulk`
**Project URL:** `https://dhesktsqhcxhqfjypulk.supabase.co`
**Region:** Auto (US East)

### **Database Tables:**

**Core Tables:**
- `profiles` - User profiles (linked to auth.users via profile_id)
- `presentations` - AI-generated pitch decks
- `pitch_conversations` - Chat history for deck generation
- `events` - Accelerator events
- `registrations` - Event signups
- `jobs` - Job listings
- `job_applications` - User job applications
- `saved_jobs` - Bookmarked jobs
- `companies` - Company profiles
- `perks` - Partner perks/deals
- `perk_claims` - Activated perks

**All tables have RLS enabled** ✅

### **Auth Configuration:**

```typescript
// src/lib/supabase.ts (Current Setup)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: window.localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Secure PKCE flow
  },
});
```

**Auth Providers Enabled:**
- ✅ Email/Password
- ✅ Magic Link
- ✅ OAuth (Google, GitHub - configured)

---

## 🔐 Environment Variables

### **Current .env Structure:**

```bash
# Supabase (PUBLIC - safe to hardcode)
VITE_SUPABASE_URL=https://dhesktsqhcxhqfjypulk.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# OpenAI (NEVER in frontend - use Edge Functions)
# OPENAI_API_KEY=sk-xxx  # SERVER SIDE ONLY

# Database (NEVER in frontend)
# SUPABASE_SERVICE_ROLE_KEY=xxx  # SERVER SIDE ONLY
# SUPABASE_DB_URL=xxx             # SERVER SIDE ONLY
```

### **✅ Safe to Hardcode (Public Keys):**
- `VITE_SUPABASE_URL` → Project URL
- `VITE_SUPABASE_ANON_KEY` → Anonymous key (RLS-protected)

### **❌ NEVER Hardcode (Secret Keys):**
- `OPENAI_API_KEY` → Keep in Edge Functions only
- `SUPABASE_SERVICE_ROLE_KEY` → Backend/Edge Functions only
- Database credentials → Never in frontend

### **How to Get Anon Key:**
```
1. Open Supabase Dashboard
2. Navigate to: Project Settings → API
3. Copy "anon" / "public" key (NOT service_role)
4. Paste into src/lib/supabase.ts
```

---

## ⚡ Edge Functions

### **Deployed Functions:**

**1. `chat` - OpenAI Proxy**
- **Purpose:** Secure OpenAI API calls (API key hidden from browser)
- **Endpoint:** `https://dhesktsqhcxhqfjypulk.supabase.co/functions/v1/chat`
- **Auth:** Required (JWT token)
- **Usage:** PitchDeckWizard component

**2. `pitch-deck-assistant` - AI Chat Assistant**
- **Purpose:** Conversational pitch deck creation
- **Endpoint:** `https://dhesktsqhcxhqfjypulk.supabase.co/functions/v1/pitch-deck-assistant`
- **Features:** Progress tracking, data collection, completeness validation

**3. `generate-pitch-deck` - Deck Generator**
- **Purpose:** Final pitch deck generation from collected data
- **Endpoint:** `https://dhesktsqhcxhqfjypulk.supabase.co/functions/v1/generate-pitch-deck`
- **Output:** 10-slide presentation structure

### **Edge Function Secrets (Already Configured):**
```bash
# Set via Supabase CLI (already done)
supabase secrets set OPENAI_API_KEY=sk-xxx
```

### **Frontend Usage Example:**
```typescript
// src/pages/PitchDeckWizard.tsx (lines 64-88)
const response = await fetch(
  `${supabaseUrl}/functions/v1/chat`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ messages }),
  }
);
```

---

## 🔒 Security & RLS

### **RLS Policy Pattern:**

**All tables use this pattern:**
```sql
-- Users can view their own data
CREATE POLICY "Users can view own data"
  ON table_name FOR SELECT
  USING (auth.uid() = profile_id);

-- Users can insert their own data
CREATE POLICY "Users can insert own data"
  ON table_name FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

-- Public read for specific data
CREATE POLICY "Public data is viewable"
  ON table_name FOR SELECT
  USING (is_public = true);
```

### **Key Security Features:**

✅ **RLS Enabled on ALL Tables**
- ✅ Users can only access their own data
- ✅ Public presentations marked with `is_public = true`
- ✅ Foreign keys enforce data integrity

✅ **Authentication Security**
- ✅ PKCE flow for OAuth
- ✅ JWT tokens with auto-refresh
- ✅ Session persistence in localStorage

✅ **API Key Security**
- ✅ OpenAI API key in Edge Functions only
- ✅ Service role key never exposed to frontend
- ✅ Anon key protected by RLS policies

### **Testing RLS Policies:**
```sql
-- Test as anonymous user
SET LOCAL role TO anon;
SELECT * FROM presentations;  -- Should only see is_public = true

-- Test as authenticated user (set auth.uid())
SET LOCAL request.jwt.claims.sub TO 'user-uuid';
SELECT * FROM presentations;  -- Should see own + public
```

---

## 📊 Dashboard Pages

### **Implemented Dashboards:**

**1. Main Dashboard** (`/dashboard`)
- **File:** `src/pages/Dashboard.tsx`
- **Features:** Overview, metrics, quick actions
- **Components:** DashboardLayout, MetricCard, LoadingState, EmptyState

**2. Events Dashboard** (`/dashboard/events`)
- **File:** `src/pages/DashboardEvents.tsx`
- **Features:** Event registration, attendance tracking
- **Data Source:** `events` and `registrations` tables

**3. Pitch Decks Dashboard** (`/dashboard/pitch-decks`)
- **File:** `src/pages/DashboardPitchDecks.tsx`
- **Features:** AI-generated presentations, templates
- **Data Source:** `presentations` table

**4. Settings Dashboard** (`/dashboard/settings`)
- **Features:** User preferences, profile management

### **Dashboards to Implement:**

**Priority 1 (Critical):**
- [ ] Jobs Board (`/dashboard/jobs`) - See: `mvp/UI/prompts/jobs-dashboard.md`
- [ ] Perks & Deals (`/dashboard/perks`)
- [ ] Profile (`/dashboard/profile`)

**Priority 2 (High Value):**
- [ ] Mentorship (`/dashboard/mentorship`)
- [ ] Funding (`/dashboard/funding`)
- [ ] Analytics (`/dashboard/analytics`)

**See Full Requirements:** `mvp/UI/DASHBOARD-UI-REQUIREMENTS.md`

---

## 🐛 Troubleshooting

### **Issue 1: Blank Screen on Lovable**

**Symptoms:**
- App works locally
- Blank screen at `*.lovable.app`
- Console error: "Missing environment variable"

**Solution:**
```typescript
// src/lib/supabase.ts
// BEFORE (doesn't work on Lovable):
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// AFTER (works on Lovable):
const supabaseUrl = 'https://dhesktsqhcxhqfjypulk.supabase.co';
```

---

### **Issue 2: Authentication Not Working**

**Symptoms:**
- Login/signup fails
- Session not persisting
- Redirect loops

**Solution:**
1. **Check auth config in `src/lib/supabase.ts`:**
   ```typescript
   auth: {
     storage: window.localStorage,
     persistSession: true,
     autoRefreshToken: true,
     detectSessionInUrl: true,
     flowType: 'pkce',
   }
   ```

2. **Verify redirect URLs in Supabase Dashboard:**
   - Go to: Authentication → URL Configuration
   - Add: `https://your-project.lovable.app/**`
   - Add: `http://localhost:8080/**` (for local dev)

3. **Check RLS policies allow auth operations**

---

### **Issue 3: Edge Function Errors**

**Symptoms:**
- 401 Unauthorized from Edge Functions
- "Missing authorization header"
- AI chat not responding

**Solution:**
```typescript
// Ensure Authorization header is included
const response = await fetch(edgeFunctionUrl, {
  headers: {
    'Authorization': `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
  },
});
```

**Check:**
1. User is authenticated (`session` exists)
2. Token is fresh (auto-refresh enabled)
3. Edge Function expects `Authorization` header

---

### **Issue 4: Data Not Loading**

**Symptoms:**
- Empty states everywhere
- Console errors: "row-level security policy violation"
- 403 errors in Network tab

**Solution:**
1. **Check RLS policies in Supabase Dashboard:**
   - Go to: Authentication → Policies
   - Verify policies exist for the table
   - Test query with `SET LOCAL role TO anon;`

2. **Verify foreign key references:**
   - Use `profile_id` (NOT `user_id`)
   - Ensure `profile_id` matches `auth.uid()`

3. **Check data exists:**
   ```sql
   -- In Supabase SQL Editor
   SELECT * FROM table_name LIMIT 10;
   ```

---

### **Issue 5: TypeScript Errors**

**Symptoms:**
- Build fails with type errors
- `tsc --noEmit` shows errors

**Solution:**
1. **Regenerate Supabase types:**
   ```bash
   npx supabase gen types typescript --project-id dhesktsqhcxhqfjypulk > src/types/database.ts
   ```

2. **Check imports:**
   ```typescript
   import { Database } from '@/types/database';
   type Tables = Database['public']['Tables'];
   ```

3. **Run type check:**
   ```bash
   pnpm tsc --noEmit
   ```

---

## ✅ Deployment Checklist

### **Pre-Deployment:**

**1. Update Supabase Client:**
- [ ] Open `src/lib/supabase.ts`
- [ ] Get anon key from Supabase Dashboard → Project Settings → API
- [ ] Replace `import.meta.env.VITE_SUPABASE_ANON_KEY` with hardcoded key
- [ ] Keep auth config intact

**2. Security Review:**
- [ ] Confirm only anon key hardcoded (not service role)
- [ ] Verify RLS enabled on all tables
- [ ] Check Edge Functions have proper auth
- [ ] No `console.log` statements with sensitive data

**3. Test Locally:**
```bash
# Build production version
pnpm build

# Preview build locally
pnpm preview

# Visit http://localhost:4173 and test:
# - Homepage loads
# - Dashboard works
# - Auth flow works
# - Pitch deck wizard works
```

**4. TypeScript Check:**
```bash
pnpm tsc --noEmit
# Should show 0 errors
```

---

### **Deployment:**

**1. Commit Changes:**
```bash
git add src/lib/supabase.ts
git commit -m "fix: Hardcode Supabase credentials for Lovable deployment"
git push origin main
```

**2. Wait for Build:**
- Lovable auto-deploys on push to `main`
- Build takes 2-3 minutes
- Check Lovable dashboard for status

**3. Verify Deployment:**
- [ ] Visit `https://your-project.lovable.app`
- [ ] Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- [ ] Check console for errors (F12)
- [ ] Test critical paths:
  - [ ] Homepage loads
  - [ ] Sign up/Login works
  - [ ] Dashboard displays metrics
  - [ ] Events page loads
  - [ ] Pitch deck wizard works
  - [ ] AI chat responds

---

### **Post-Deployment:**

**1. Smoke Tests:**
- [ ] All pages load without errors
- [ ] Navigation works (sidebar, navbar)
- [ ] Forms submit successfully
- [ ] Images load
- [ ] No console errors or warnings

**2. Performance Check:**
- [ ] Run Lighthouse audit (aim for >90 score)
- [ ] Check Core Web Vitals
- [ ] Test on mobile devices

**3. Monitor:**
- [ ] Check Supabase logs for errors
- [ ] Monitor Edge Function invocations
- [ ] Watch for authentication issues
- [ ] Track API usage

---

## 📚 Additional Resources

### **Project Documentation:**
- **Main Docs:** `docs/`
- **Security Status:** `docs/SECURITY_STATUS.md`
- **Testing Strategy:** `lovable-plan/docs/004-TESTING-STRATEGY-AND-IMPROVEMENTS.md`
- **Daily Checklist:** `lovable-plan/management/903-DAILY-TESTING-CHECKLIST.md`

### **UI/UX:**
- **Dashboard Requirements:** `mvp/UI/DASHBOARD-UI-REQUIREMENTS.md`
- **Accessibility Report:** `mvp/UI/ACCESSIBILITY-FIXES-COMPLETE.md`
- **25-Point QA Test:** `mvp/UI/UI-UX-25-POINT-TEST-REPORT.md`

### **Implementation Prompts:**
- **Jobs Dashboard:** `mvp/UI/prompts/jobs-dashboard.md`

### **Supabase Resources:**
- **RLS Guide:** https://supabase.com/docs/guides/auth/row-level-security
- **Edge Functions:** https://supabase.com/docs/guides/functions
- **Client Library:** https://supabase.com/docs/reference/javascript

---

## 🎯 Quick Commands

```bash
# Development
pnpm dev                  # Start dev server (port 8080)
pnpm build                # Production build
pnpm preview              # Preview production build

# TypeScript
pnpm tsc --noEmit         # Type check only
pnpm lint                 # ESLint check

# Database
supabase status           # Check local Supabase
npx supabase db push      # Push migrations
npx supabase db reset     # Reset local database

# Edge Functions
supabase functions list   # List deployed functions
supabase functions logs chat --tail  # View function logs

# Git
git status                # Check uncommitted changes
git add .                 # Stage all changes
git commit -m "message"   # Commit changes
git push origin main      # Deploy to Lovable (auto)
```

---

## 🔑 Key Differences from Standard Vite

**Lovable-Specific Behaviors:**

1. **Environment Variables:**
   - ❌ `.env` files NOT read at build time
   - ❌ `vite.config.ts` define option IGNORED
   - ✅ Must hardcode values in source code

2. **Build Process:**
   - Custom build pipeline (not standard Vite)
   - May not respect all Vite plugins
   - Auto-deploys on git push to main

3. **Recommended Pattern:**
   ```typescript
   // Works everywhere (including Lovable)
   const supabaseUrl = 'https://dhesktsqhcxhqfjypulk.supabase.co';

   // Doesn't work on Lovable (works elsewhere)
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   ```

---

## 📝 Document Info

**Version:** 1.0.0
**Last Updated:** October 20, 2025
**Project:** Medellin Spark AI Accelerator
**Supabase Project:** dhesktsqhcxhqfjypulk
**Maintained By:** Development Team

---

## 🆘 Getting Help

**Project Issues:**
- Check: `docs/` folder for architecture docs
- Check: `CLAUDE.md` for project memory and patterns
- Check: GitHub issues for known problems

**Lovable Issues:**
- See: `lovable/lovable-reference.md` (full guide)
- See: `lovable/QUICK-REFERENCE.md` (quick fix)
- Lovable Discord: Search for "environment variables"

**Supabase Issues:**
- Supabase Dashboard → Project Settings → API
- Supabase Dashboard → Database → Logs
- Supabase Docs: https://supabase.com/docs

---

**End of Medellin Spark Lovable Reference**

For universal Lovable deployment patterns, see: `lovable/lovable-reference.md`
