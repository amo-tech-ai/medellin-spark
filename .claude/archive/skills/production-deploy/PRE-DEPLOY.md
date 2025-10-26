# Pre-Deployment Checklist

Complete all checks before deploying to production. **DO NOT SKIP ANY STEP.**

---

## Code Quality (MUST PASS)

### 1. Type Check
```bash
pnpm tsc --noEmit
```
✅ Expected: **0 errors**

If errors found:
- Fix all TypeScript errors
- Update type definitions
- Check imports are correct

### 2. Lint Check
```bash
pnpm lint
```
✅ Expected: **0 warnings**

If warnings found:
- Fix ESLint warnings
- Remove unused imports
- Fix formatting issues

### 3. Build Test
```bash
pnpm build
```
✅ Expected: **< 5 seconds, no errors**

If build fails:
- Check for missing dependencies
- Clear cache: `rm -rf node_modules/.vite`
- Reinstall: `pnpm install`

### 4. Preview Build
```bash
pnpm preview
```
✅ Expected: **App works correctly**

Test:
- Navigate to main pages
- Check console for errors
- Verify features work

---

## Security Verification (CRITICAL)

### 1. No Secrets in Git
```bash
git status
```
❌ `.env` should **NOT** appear in staged files

If .env appears:
```bash
git reset .env
git rm --cached .env
```

### 2. Environment Template Updated
```bash
cat .env.example
```
✅ All required variables documented

Check:
- All new vars added to .env.example
- No sensitive values in .env.example
- Comments explain each variable

### 3. API Keys Server-Side Only
```bash
grep -r "OPENAI_API_KEY" src/
```
❌ Expected: **No results** (frontend should use Edge Functions)

If found:
- Move API calls to Edge Functions
- Remove API keys from frontend code
- Use proxy pattern

### 4. RLS Enabled
```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```
✅ Expected: **All user tables = true**

If false:
```sql
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
```

---

## Database Verification

### 1. Migrations Applied
```sql
SELECT * FROM supabase_migrations.schema_migrations
ORDER BY version DESC LIMIT 5;
```
✅ Check latest migrations are present

### 2. RLS Policies Exist
```sql
SELECT tablename, COUNT(*) as policy_count
FROM pg_policies
GROUP BY tablename;
```
✅ Each table should have **1+ policies**

If missing:
```sql
CREATE POLICY "policy_name"
  ON table_name
  FOR ALL
  TO authenticated
  USING (profile_id = auth.uid());
```

### 3. Foreign Keys Correct
```sql
SELECT conname, conrelid::regclass, confrelid::regclass
FROM pg_constraint
WHERE contype = 'f';
```
✅ All should reference **profiles**, not auth.users

If incorrect:
- Create new migration
- Fix foreign key references
- Use `profile_id` column

### 4. Test Data Access
```sql
SELECT COUNT(*) FROM presentations WHERE is_public = true;
```
✅ Public presentations accessible

Test query access:
```sql
-- As authenticated user
SELECT * FROM presentations WHERE profile_id = auth.uid();

-- As anonymous
SELECT * FROM presentations WHERE is_public = true;
```

---

## Backend Verification

### 1. Edge Functions Deployed
```bash
supabase functions list
```
✅ Expected: All functions show **ACTIVE** status

Required functions:
- `chat` - OpenAI proxy
- `pitch-deck-assistant` - Conversation handler
- `generate-pitch-deck` - Deck generator

If not active:
```bash
supabase functions deploy <function-name>
```

### 2. Secrets Configured
```bash
supabase secrets list
```
✅ Expected: Required secrets present

Required secrets:
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY` (if using)
- `SUPABASE_SERVICE_ROLE_KEY`

Set missing secrets:
```bash
supabase secrets set OPENAI_API_KEY=sk-...
```

### 3. Function Logs Clean
```bash
supabase functions logs chat --tail
```
✅ Expected: **No uncaught exceptions**

Check for:
- Error messages
- Failed requests
- Performance issues

### 4. Test Edge Function
```bash
curl -X POST \
  "https://dhesktsqhcxhqfjypulk.supabase.co/functions/v1/chat" \
  -H "Content-Type: application/json" \
  -d '{"messages":[]}'
```
✅ Expected: **401** (auth required) or valid response

---

## Final Review

### Code Review Checklist
- [ ] Review recent commits: `git log --oneline -10`
- [ ] No TODO/FIXME comments: `grep -r "TODO\|FIXME" src/`
- [ ] No debug code: `grep -r "console.log\|debugger" src/`
- [ ] No commented code blocks
- [ ] All imports used
- [ ] No hardcoded URLs (use env vars)

### Documentation Check
- [ ] .env.example updated
- [ ] README current
- [ ] API docs current
- [ ] Deployment notes documented

### Performance Check
- [ ] Bundle size checked: `ls -lh dist/assets/`
- [ ] Target: Main bundle < 500KB
- [ ] Images optimized
- [ ] Lazy loading implemented

---

## Pre-Deploy Command

Run all checks at once:
```bash
pnpm tsc --noEmit && \
pnpm lint && \
pnpm build && \
npx playwright test
```

✅ **All must pass before deployment**

---

## Troubleshooting

### TypeScript Errors
```bash
# Find all errors
pnpm tsc --noEmit | grep "error TS"

# Common fixes:
# - Add missing imports
# - Fix type definitions
# - Update function signatures
```

### Build Failures
```bash
# Clear cache
rm -rf node_modules/.vite
rm -rf dist

# Rebuild
pnpm build
```

### Test Failures
```bash
# Run tests with UI
npx playwright test --ui

# Run specific test
npx playwright test e2e/pitch-deck.spec.ts

# Debug mode
npx playwright test --debug
```

---

**Next Step:** Once all checks pass, proceed to [DEPLOY.md](DEPLOY.md)
