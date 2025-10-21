# Setup - Core (Environment & Server)

**Phase**: Foundation Setup
**Time**: 1-2 hours
**Priority**: 🔴 CRITICAL - DO THIS FIRST
**Difficulty**: Beginner

---

## Overview

Complete environment setup for Medellin AI platform. This establishes your development environment, starts the dev server, and verifies everything works before building features.

**Outcome**: Dev server running on localhost:8080 with hot reload ready

---

## Prerequisites

- **Operating System**: Linux, macOS, or Windows WSL2
- **Node.js**: 18+ installed
- **Package Manager**: pnpm (recommended) or npm
- **Git**: Installed and configured
- **Code Editor**: VS Code or similar
- **Terminal Access**: Bash or Zsh

---

## Implementation Steps

### Step 1: Verify Node.js and pnpm (10 minutes)

**Check Node.js version**:
```bash
node --version
# Expected: v18.0.0 or higher
```

**Install pnpm (if not installed)**:
```bash
npm install -g pnpm

# Verify installation
pnpm --version
# Expected: 8.0.0 or higher
```

---

### Step 2: Clone and Install Dependencies (15 minutes)

**Navigate to project**:
```bash
cd /home/sk/medellin-spark
```

**Install dependencies**:
```bash
pnpm install
```

**Expected output**:
- ✅ All dependencies installed
- ✅ No errors or warnings
- ✅ `node_modules/` folder created

---

### Step 3: Environment Variables Setup (10 minutes)

**Check .env.example**:
```bash
cat .env.example
```

**Create .env file**:
```bash
cp .env.example .env
```

**Edit .env with your values**:
```env
# Supabase (from dashboard: https://app.supabase.com/)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Development Settings
VITE_DEV_MODE=true
NODE_ENV=development
```

**Important**:
- ⚠️ Never commit `.env` to git
- ✅ Only `VITE_*` variables are exposed to frontend
- ✅ API keys stay server-side (Edge Functions)

---

### Step 4: Start Development Server (5 minutes)

**Start server**:
```bash
pnpm dev
```

**Expected output**:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:8080/
➜  Network: http://192.168.x.x:8080/
➜  press h + enter to show help
```

✅ **Server Status**: Running on port 8080

---

### Step 5: Verify Server Works (10 minutes)

**Open browser and test these URLs**:

**1. Homepage**:
```
http://localhost:8080/
```
✅ Should load homepage with navigation

**2. Pitch Deck Wizard** (Main feature):
```
http://localhost:8080/pitch-deck-wizard
```
✅ Should show AI chat interface

**3. Dashboard** (No auth in dev):
```
http://localhost:8080/dashboard
```
✅ Should load immediately (no login required)

**4. Startup Profile**:
```
http://localhost:8080/startup-profile
```
✅ Should show startup submission form

**5. Auth (Should redirect)**:
```
http://localhost:8080/auth
```
✅ Should instantly redirect to homepage (no auth page shown)

---

### Step 6: Development Mode Features (5 minutes)

**What's Different in Dev Mode**:

1. **Auth Bypassed**: No login required
   - `ProtectedRoute` components allow access
   - `/auth` redirects to homepage
   - User object auto-created for testing

2. **Hot Reload**: Changes reflect instantly
   - Edit any file → Browser updates
   - No manual refresh needed

3. **Console Warnings**: Helpful debug info
   - Shows component renders
   - Displays state changes
   - Logs API calls

**Files with Dev Mode Logic**:
- `src/components/ProtectedRoute.tsx` - Auth bypass
- `src/components/DevModeRedirect.tsx` - Auth redirect
- `src/App.tsx` - Route wrapping

---

## Success Criteria

### Environment
- [ ] Node.js 18+ installed
- [ ] pnpm installed and working
- [ ] Dependencies installed (0 errors)
- [ ] `.env` file created with Supabase credentials

### Server
- [ ] Dev server starts successfully
- [ ] Runs on http://localhost:8080/
- [ ] No error messages in terminal
- [ ] Hot reload working (edit file → see changes)

### URLs Accessible
- [ ] Homepage loads
- [ ] Pitch Deck Wizard shows chat
- [ ] Dashboard accessible (no auth)
- [ ] Startup Profile form works
- [ ] Auth redirects to homepage

### Browser Console
- [ ] No red errors
- [ ] Yellow warnings acceptable (dev mode)
- [ ] Vite connected message shown

---

## Testing Commands

```bash
# 1. Check TypeScript compiles
pnpm tsc --noEmit
# Expected: 0 errors (warnings acceptable)

# 2. Check linting
pnpm lint
# Expected: No critical errors

# 3. Check build works
pnpm build
# Expected: Build completes in 3-10 seconds

# 4. Test production preview
pnpm preview
# Expected: Server starts on http://localhost:4173
```

---

## Common Issues & Fixes

### Issue: "Port 8080 already in use"

**Fix**: Kill existing process or use different port
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# OR use different port
pnpm dev --port 3000
```

---

### Issue: "Module not found" errors

**Fix**: Reinstall dependencies
```bash
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

---

### Issue: .env variables not loading

**Fix**: Restart dev server
```bash
# Stop server (Ctrl+C)
# Restart
pnpm dev
```

**Remember**: Only `VITE_*` prefix variables work in frontend

---

### Issue: TypeScript errors on start

**Fix**: Check node_modules and types
```bash
# Reinstall
pnpm install

# Generate types if using Supabase CLI
npx supabase gen types typescript --local > src/types/supabase.ts
```

---

## Project Structure Reference

```
medellin-spark/
├── .env                    ← Your local config (gitignored)
├── .env.example           ← Template (committed to git)
├── package.json           ← Dependencies and scripts
├── pnpm-lock.yaml        ← Lock file
├── tsconfig.json         ← TypeScript config
├── vite.config.ts        ← Vite bundler config
├── src/
│   ├── App.tsx           ← Main app component
│   ├── main.tsx          ← Entry point
│   ├── components/       ← Reusable components
│   ├── pages/            ← Route pages
│   ├── hooks/            ← Custom hooks
│   └── lib/              ← Utilities
└── supabase/
    ├── config.toml       ← Supabase config
    ├── migrations/       ← Database migrations
    └── functions/        ← Edge Functions
```

---

## Key Development Commands

```bash
# Start dev server
pnpm dev

# Type check
pnpm tsc --noEmit

# Lint code
pnpm lint

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests (if configured)
pnpm test
```

---

## Next Steps

After Core setup complete:
→ **00-setup/02-intermediate.md** - Supabase setup, authentication, database

---

**Estimated Time**: 1-2 hours
**Difficulty**: Beginner
**Status**: ✅ Ready to start
