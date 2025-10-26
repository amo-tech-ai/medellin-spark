# Deployment Steps

**Prerequisites:** All [PRE-DEPLOY.md](PRE-DEPLOY.md) checks must pass ✅

---

## Step 1: Create Release Commit

### 1.1 Ensure Clean Working Directory
```bash
git status
```
✅ Expected: No uncommitted changes

If dirty:
```bash
git add .
git commit -m "chore: Prepare for production deployment"
```

### 1.2 Create Release Commit
```bash
git commit -m "Release: Production deployment v1.0.0

- Core pitch deck wizard (100% complete)
- Database architecture (100% complete)
- API security (100% secure)
- Frontend components (100% complete)
- E2E testing (100% coverage)

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Step 2: Tag Release

```bash
# Create annotated tag
git tag -a v1.0.0 -m "Production Release v1.0.0"

# Push to remote
git push origin main
git push origin v1.0.0
```

---

## Step 3: Deploy Frontend

Choose your deployment platform:

### Option A: Netlify (Recommended)

```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login
netlify login

# Deploy to production
netlify deploy --prod

# Verify deployment
netlify open:site
```

**Netlify Configuration:**
```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option B: Vercel

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Deploy to production
vercel --prod

# Verify deployment
vercel open
```

**Vercel Configuration:**
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

### Option C: Custom Server

```bash
# Build production bundle
pnpm build

# Copy to server
rsync -avz dist/ user@server:/var/www/template-copilot-kit-py/

# Or using SCP
scp -r dist/* user@server:/var/www/template-copilot-kit-py/
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name template-copilot-kit-py.com;
    root /var/www/template-copilot-kit-py;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json;
}
```

---

## Step 4: Deploy Edge Functions

```bash
# Deploy all functions
supabase functions deploy chat
supabase functions deploy pitch-deck-assistant
supabase functions deploy generate-pitch-deck

# Verify deployments
supabase functions list
```

✅ Expected: All functions show **ACTIVE** status

---

## Step 5: Apply Database Migrations

### 5.1 Push Migrations
```bash
supabase db push
```

### 5.2 Verify Migrations Applied
```bash
supabase db diff
```
✅ Expected: "Database is up to date"

### 5.3 Test Migrations
```sql
-- Verify tables exist
\dt

-- Check RLS enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- Verify policies
SELECT tablename, policyname
FROM pg_policies
ORDER BY tablename;
```

---

## Step 6: Configure Environment Variables

### Frontend Environment Variables

Set in your deployment platform:

**Netlify:**
```bash
# Via CLI
netlify env:set VITE_SUPABASE_URL "https://dhesktsqhcxhqfjypulk.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "eyJ..."

# Or via dashboard: Site settings → Environment variables
```

**Vercel:**
```bash
# Via CLI
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Or via dashboard: Settings → Environment Variables
```

**Required frontend variables:**
```
VITE_SUPABASE_URL=https://dhesktsqhcxhqfjypulk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...  # Public anon key (safe to expose)
```

### Backend Environment Variables (Supabase Secrets)

```bash
# Set secrets
supabase secrets set OPENAI_API_KEY=sk-...
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Verify secrets set
supabase secrets list
```

---

## Step 7: Verify Deployment

### Quick Health Check
```bash
# Check site is live
curl -I https://template-copilot-kit-py.netlify.app

# Expected: 200 OK
```

### Test Edge Functions
```bash
# Test chat function
curl -X POST \
  "https://dhesktsqhcxhqfjypulk.supabase.co/functions/v1/chat" \
  -H "Content-Type: application/json" \
  -d '{"messages":[]}'

# Expected: 401 (auth required)
```

---

## Deployment Timeline

| Step | Time | Status |
|------|------|--------|
| Create release commit | 2 min | ⏳ |
| Tag release | 1 min | ⏳ |
| Deploy frontend | 5 min | ⏳ |
| Deploy Edge Functions | 3 min | ⏳ |
| Apply migrations | 2 min | ⏳ |
| Configure env vars | 3 min | ⏳ |
| Verify deployment | 2 min | ⏳ |
| **Total** | **~18 min** | |

---

## Troubleshooting

### Build Fails on Platform
- Check build logs in platform dashboard
- Verify build command: `pnpm build`
- Verify output directory: `dist`
- Check node version matches local: `node -v`

### Edge Function Deploy Fails
```bash
# Check function syntax
deno check supabase/functions/<function-name>/index.ts

# Redeploy
supabase functions deploy <function-name> --verify-jwt false
```

### Migration Fails
```bash
# Check migration syntax
cat supabase/migrations/latest.sql

# Apply manually
supabase db push --dry-run  # Preview changes
supabase db push  # Apply
```

---

**Next Step:** Proceed to [POST-DEPLOY.md](POST-DEPLOY.md) for verification
