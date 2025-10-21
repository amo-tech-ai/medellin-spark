# Setup - Advanced (Production & Deployment)

**Phase**: Production Ready
**Time**: 3-4 hours
**Priority**: 🟡 MEDIUM
**Difficulty**: Advanced
**Prerequisites**: 00-setup/01-core.md and 02-intermediate.md complete

---

## Overview

Prepare for production deployment with CI/CD, monitoring, performance optimization, and security hardening.

**Outcome**: Production-ready deployment pipeline with monitoring and automated testing

---

## Implementation Steps

### Step 1: Production Supabase Project (30 minutes)

**Create separate production project**:
- Go to Supabase Dashboard
- Create new project: `medellin-spark-prod`
- Use strong password (different from dev)
- Choose production region

**Why separate projects**:
- ✅ Isolate production data
- ✅ Test migrations safely in dev
- ✅ Different security settings
- ✅ Prevents accidental data deletion

**Create `.env.production` file**:
```env
VITE_SUPABASE_URL=https://prod-abc.supabase.co
VITE_SUPABASE_ANON_KEY=prod-anon-key-here
NODE_ENV=production
```

**Add to .gitignore**:
```
.env*
!.env.example
```

---

### Step 2: Environment Management (20 minutes)

**Install dotenv-cli** for environment switching:
```bash
pnpm add -D dotenv-cli
```

**Update package.json scripts**:
```json
{
  "scripts": {
    "dev": "vite --port 8080",
    "build": "tsc && vite build",
    "build:dev": "dotenv -e .env -- vite build",
    "build:prod": "dotenv -e .env.production -- vite build",
    "preview": "vite preview",
    "preview:prod": "dotenv -e .env.production -- vite preview"
  }
}
```

**Test builds**:
```bash
# Development build
pnpm build:dev

# Production build
pnpm build:prod
```

---

### Step 3: Vercel Deployment (45 minutes)

**Install Vercel CLI**:
```bash
pnpm add -g vercel
```

**Login to Vercel**:
```bash
vercel login
```

**Initialize project**:
```bash
vercel
```

**Configure vercel.json**:
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_SUPABASE_URL": "@supabase-url-prod",
    "VITE_SUPABASE_ANON_KEY": "@supabase-anon-key-prod"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

**Add environment variables in Vercel Dashboard**:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

**Deploy**:
```bash
vercel --prod
```

---

### Step 4: GitHub Actions CI/CD (1 hour)

**Create `.github/workflows/deploy.yml`**:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Type check
        run: pnpm tsc --noEmit

      - name: Lint
        run: pnpm lint

      - name: Build
        run: pnpm build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

**Add GitHub Secrets**:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID

---

### Step 5: Supabase Edge Functions Deployment (30 minutes)

**Link Supabase project**:
```bash
npx supabase link --project-ref your-prod-project-ref
```

**Set production secrets**:
```bash
# OpenAI API key
npx supabase secrets set OPENAI_API_KEY=sk-prod-key-here

# Service role key
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Deploy all functions**:
```bash
npx supabase functions deploy chat
npx supabase functions deploy generate-pitch-deck
```

**Verify functions**:
```bash
npx supabase functions list
```

---

### Step 6: Database Migrations (20 minutes)

**Apply migrations to production**:
```bash
# Link to production project
npx supabase link --project-ref prod-ref

# Push migrations
npx supabase db push

# Verify migrations
npx supabase migrations list
```

**Create rollback plan** for each migration:
```sql
-- In supabase/rollback_scripts/
-- 20250120000001_rollback_profiles.sql

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS profiles CASCADE;
```

---

### Step 7: Monitoring Setup (45 minutes)

**Option A: Sentry (Error Tracking)**

**Install Sentry**:
```bash
pnpm add @sentry/react @sentry/vite-plugin
```

**Configure** in `src/main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://your-dsn@sentry.io/project-id",
  environment: import.meta.env.MODE,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

**Option B: Supabase Logs**

**Access logs**:
```bash
# Edge Function logs
npx supabase functions logs chat --tail

# Database logs (in Supabase Dashboard)
# → Logs & Reports → API logs
```

---

### Step 8: Performance Optimization (30 minutes)

**Install Lighthouse CI**:
```bash
pnpm add -D @lhci/cli
```

**Create `lighthouserc.js`**:
```javascript
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4173'],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
};
```

**Add script to package.json**:
```json
{
  "scripts": {
    "lighthouse": "lhci autorun"
  }
}
```

**Run Lighthouse**:
```bash
pnpm build
pnpm preview &
pnpm lighthouse
```

**Target scores**:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

---

### Step 9: Security Hardening (20 minutes)

**Content Security Policy** in `index.html`:
```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self';
           script-src 'self' 'unsafe-inline';
           style-src 'self' 'unsafe-inline';
           img-src 'self' data: https:;
           connect-src 'self' https://*.supabase.co https://api.openai.com;">
```

**Environment variable validation**:
```typescript
// src/lib/env.ts
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
] as const;

export function validateEnv() {
  for (const varName of requiredEnvVars) {
    if (!import.meta.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }
}

// Call in main.tsx
validateEnv();
```

**Rate limiting** in Supabase Edge Functions:
```typescript
// Add to Edge Function
const rateLimitKey = `ratelimit:${request.headers.get('x-forwarded-for')}`;
const { data: count } = await supabase
  .from('rate_limits')
  .select('count')
  .eq('key', rateLimitKey)
  .single();

if (count && count.count > 100) {
  return new Response('Too many requests', { status: 429 });
}
```

---

## Success Criteria

### Deployment
- [ ] Production Supabase project created
- [ ] Vercel deployment successful
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active

### CI/CD
- [ ] GitHub Actions workflow working
- [ ] Tests run on every PR
- [ ] Auto-deploy to production on main merge
- [ ] Environment secrets configured

### Edge Functions
- [ ] All functions deployed to production
- [ ] Secrets configured
- [ ] Function logs accessible
- [ ] No errors in production

### Monitoring
- [ ] Error tracking configured (Sentry)
- [ ] Performance monitoring active
- [ ] Database logs accessible
- [ ] Alerts configured for critical errors

### Performance
- [ ] Lighthouse score > 90 (all categories)
- [ ] Bundle size < 500KB
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.9s

### Security
- [ ] CSP headers configured
- [ ] Environment validation working
- [ ] Rate limiting implemented
- [ ] No secrets in client code

---

## Testing Commands

```bash
# 1. Test production build locally
pnpm build:prod
pnpm preview:prod
# Open: http://localhost:4173

# 2. Run Lighthouse audit
pnpm lighthouse
# Expected: All scores > 90

# 3. Check bundle size
pnpm build:prod
du -sh dist/
# Expected: < 2MB total

# 4. Test Edge Functions in production
curl -X POST https://your-project.supabase.co/functions/v1/chat \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "test"}]}'
# Expected: 200 OK

# 5. Verify environment variables
vercel env ls
# Expected: All production vars listed
```

---

## Common Issues & Fixes

### Issue: Build fails in CI/CD

**Fix**: Check environment variables
```bash
# Verify secrets in GitHub
# Settings → Secrets and variables → Actions
```

---

### Issue: Edge Functions not deploying

**Fix**: Check Supabase CLI linked to correct project
```bash
npx supabase projects list
npx supabase link --project-ref correct-ref-here
```

---

### Issue: High Lighthouse scores in dev, low in prod

**Fix**: Check production build optimization
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
      },
    },
  },
});
```

---

## Deployment Checklist

**Pre-Deploy**:
- [ ] All tests passing
- [ ] TypeScript compiles (0 errors)
- [ ] Lighthouse audit passing
- [ ] Security review complete
- [ ] Database migrations tested

**Deploy**:
- [ ] Production env vars set
- [ ] Edge Functions deployed
- [ ] Database migrations applied
- [ ] Domain configured
- [ ] Monitoring active

**Post-Deploy**:
- [ ] Smoke test production URL
- [ ] Check error logs (0 errors)
- [ ] Verify auth flow works
- [ ] Test critical user flows
- [ ] Monitor performance for 24h

---

## Monitoring Dashboard Setup

**Supabase Dashboard**:
- API logs: Monitor Edge Function calls
- Database logs: Track query performance
- Auth logs: Monitor sign-ups and logins

**Vercel Dashboard**:
- Deployments: Track build status
- Analytics: Monitor page views
- Logs: Check runtime errors

**Sentry Dashboard** (if configured):
- Errors: Track exceptions
- Performance: Monitor page load times
- Releases: Tag deployments

---

## Next Steps

After Advanced setup complete:
→ **01-dashboard/01-core.md** - Start building features!

---

**Estimated Time**: 3-4 hours
**Difficulty**: Advanced
**Status**: ✅ Ready for production setup
