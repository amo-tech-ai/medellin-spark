# Task 001: Verify Prerequisites

**Status**: Pending
**Priority**: Critical
**Time**: 10 minutes
**Dependencies**: None

---

## Objective

Verify all required tools, accounts, and configurations are in place before implementation.

---

## Checklist

### 1. Anthropic API Key
- [ ] Get API key from https://console.anthropic.com/
- [ ] Copy key to clipboard
- [ ] Keep key secure (never commit to git)

### 2. Supabase Local Instance
```bash
# Check Supabase is running
supabase status
```

**Expected output**:
```
API URL: http://localhost:54321
DB URL: postgresql://postgres:postgres@localhost:54322/postgres
Studio URL: http://localhost:54323
...
```

**If not running**:
```bash
supabase start
```

### 3. Environment Variables
```bash
# Check .env file exists
ls -la .env

# Verify required variables (should be set)
cat .env | grep VITE_SUPABASE_URL
cat .env | grep VITE_SUPABASE_ANON_KEY
```

### 4. Dependencies Installed
```bash
# Check pnpm installed
pnpm --version

# Install project dependencies if needed
pnpm install
```

### 5. Database Connectivity
```bash
# Test database connection
supabase db execute "SELECT NOW()"
```

**Expected**: Current timestamp returned

### 6. Build Verification
```bash
# Verify TypeScript compiles
pnpm tsc --noEmit

# Should complete without errors
```

---

## Success Criteria

- [ ] Anthropic API key obtained
- [ ] Supabase running locally
- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Database accessible
- [ ] TypeScript compiles

---

## Next Task

✅ Once complete → Proceed to **002-configure-secrets.md**
