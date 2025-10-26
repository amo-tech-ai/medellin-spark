# Playwright E2E Testing - Runbook

**Quick reference for operating, troubleshooting, and maintaining E2E tests**

---

## Daily Operations

### Running Tests Locally

**Quick smoke test (2 min)**:
```bash
pnpm dev              # Terminal 1: Start dev server
npm run test:smoke    # Terminal 2: Run smoke test
```

**Full test suite**:
```bash
npm run test:all      # Runs smoke + auth + pitch-deck
```

**Individual tests**:
```bash
npm run test:smoke        # Quick health check
npm run test:auth         # Authentication flow
npm run test:pitch-deck   # Full journey (10-15 min)
```

---

## Pre-Deployment Checklist

**Before merging to main**:
```bash
# 1. Run full test suite
npm run test:all

# 2. Check for screenshots (verify visual state)
ls -la test-results/*.png

# 3. Review console output for warnings
grep -i "warn\|error" test-output.log

# 4. Verify no flaky tests (run 3 times)
for i in {1..3}; do npm run test:smoke; done
```

---

## Monitoring & Health Checks

### Test Success Metrics

**Target SLAs**:
- Smoke test pass rate: **100%** (must always pass)
- Auth test pass rate: **>95%**
- Full journey pass rate: **>90%**
- Execution time (smoke): **<2 min**
- Execution time (full journey): **<15 min**

**Check test health**:
```bash
# View recent test runs
ls -lt test-results/ | head -10

# Count failures in last 24 hours
find test-results/ -name "*.log" -mtime -1 -exec grep -l "FAILED" {} \;
```

---

## Common Issues & Solutions

### Issue 1: Dev Server Not Running

**Symptom**: Tests fail with connection errors

**Solution**:
```bash
# Check if dev server is running
curl http://localhost:8080

# Start dev server if not running
pnpm dev

# Wait for server to be ready
npx wait-on http://localhost:8080 -t 30000
```

---

### Issue 2: Browser Instance Already in Use

**Symptom**: `Browser is already in use for /home/...`

**Solution**:
```bash
# Kill all Chrome processes
pkill -f chromium

# Clear Playwright cache
rm -rf /home/$USER/.cache/ms-playwright/mcp-chrome-*

# Retry test
npm run test:smoke
```

---

### Issue 3: Flaky Tests (Intermittent Failures)

**Symptom**: Tests pass sometimes, fail other times

**Root Causes**:
- Network timing issues
- AI response delays
- Database state inconsistency

**Solutions**:

**1. Increase timeouts** (temporary):
```typescript
// In playbook
await browser_wait_for({ text: "Success", timeout: 15000 }); // Was 10000
```

**2. Add explicit waits**:
```typescript
// Wait for loading state to disappear
await browser_wait_for({ text: "Loading", timeout: 5000 });
await browser_wait_for({ time: 2000 }); // Extra buffer
```

**3. Reset database state**:
```bash
# Reset to clean state before test
npx supabase db reset
npm run test:pitch-deck
```

---

### Issue 4: AI Not Responding

**Symptom**: Chat messages sent, but no AI response

**Check**:
```bash
# 1. Verify Edge Function is deployed
supabase functions list

# 2. Check secrets are set
supabase secrets list

# 3. View function logs
supabase functions logs chat --tail

# 4. Test function directly
curl -X POST \
  https://dhesktsqhcxhqfjypulk.supabase.co/functions/v1/chat \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'
```

**Fix**:
```bash
# Re-deploy Edge Function
supabase functions deploy chat

# Re-set API key
supabase secrets set OPENAI_API_KEY=sk-...
```

---

### Issue 5: RLS Blocking Data Access

**Symptom**: 401 errors, empty results when data should exist

**Check**:
```sql
-- Verify RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables
WHERE tablename = 'presentations';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'presentations';
```

**Fix for dev mode**:
```sql
-- Temporarily make test presentation public
UPDATE presentations
SET is_public = true
WHERE id = 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81';
```

---

### Issue 6: Slow Test Execution

**Symptom**: Tests taking >2x expected time

**Diagnosis**:
```bash
# Profile test execution
time npm run test:smoke

# Check database query performance
psql $SUPABASE_DB_URL -c "
  SELECT query, calls, mean_exec_time
  FROM pg_stat_statements
  WHERE query LIKE '%presentations%'
  ORDER BY mean_exec_time DESC
  LIMIT 10;
"
```

**Solutions**:
- Add database indexes (see migrations/20251019000001_add_performance_indexes.sql)
- Use `--headless` mode (faster than headed)
- Run tests in parallel when possible
- Cache static assets

---

## Emergency Procedures

### Complete Test Failure (All Tests Failing)

**Step 1: Check infrastructure**:
```bash
# Verify dev server
curl -I http://localhost:8080

# Verify database
psql $SUPABASE_DB_URL -c "SELECT 1"

# Verify Supabase
supabase status
```

**Step 2: Reset environment**:
```bash
# Stop all services
pkill -f "pnpm dev"
pkill -f chromium

# Clear cache
rm -rf node_modules/.vite
rm -rf /home/$USER/.cache/ms-playwright

# Reinstall
pnpm install
npx playwright install chromium

# Restart
pnpm dev
```

**Step 3: Run minimal test**:
```bash
# Try simplest possible test
npx @playwright/mcp --headless <<EOF
await browser_navigate({ url: "http://localhost:8080" });
await browser_snapshot();
EOF
```

---

### Production Incident (User Reports Issue)

**Step 1: Reproduce locally**:
```bash
# Run full journey test to reproduce
npm run test:pitch-deck

# Check screenshots for visual state
open test-results/*.png
```

**Step 2: Check logs**:
```bash
# Frontend errors
cat test-results/console.log | grep -i error

# Backend errors
supabase functions logs pitch-deck-assistant --tail

# Database errors
psql $SUPABASE_DB_URL -c "
  SELECT * FROM pg_stat_database_conflicts
  WHERE datname = 'postgres';
"
```

**Step 3: Rollback if needed**:
```bash
# Revert to last known good commit
git log --oneline -10
git revert <commit-hash>
git push
```

---

## Maintenance Tasks

### Weekly

**Monday**:
```bash
# Run full test suite on fresh database
npx supabase db reset
npm run test:all
```

**Wednesday**:
```bash
# Update Playwright MCP
npm install -g @playwright/mcp@latest
npm run test:smoke  # Verify compatibility
```

**Friday**:
```bash
# Review test execution times
find test-results/ -name "*.log" -mtime -7 -exec grep "Duration" {} \;

# Update test data if needed
psql $SUPABASE_DB_URL -f scripts/seed-test-data.sql
```

### Monthly

**First Monday**:
```bash
# Update all dependencies
npm update
npx playwright install chromium
npm run test:all

# Review and archive old test results
mv test-results/ test-results-archive-$(date +%Y%m)
mkdir test-results
```

**Third Friday**:
```bash
# Review and update playbooks
# Check if user journey has changed
# Update expected slide counts
# Update timing expectations
```

---

## Performance Tuning

### Speed Up Tests

**Use headless mode**:
```bash
npx @playwright/mcp --headless < playbooks/smoke.md  # 30% faster
```

**Run in parallel** (if tests are independent):
```bash
# Run smoke and auth in parallel
npm run test:smoke & npm run test:auth
wait
```

**Skip screenshots** (for non-visual tests):
```typescript
// Comment out screenshot calls in non-critical sections
// await browser_screenshot({ filename: "step1.png" });
```

---

## Alerts & Notifications

### Set Up Alerts

**Email on failure** (cron job):
```bash
# Add to crontab
0 6 * * * cd /path/to/project && npm run test:smoke || mail -s "E2E Test Failed" you@example.com < test-results/latest.log
```

**Slack webhook**:
```bash
# After test run
if [ $? -ne 0 ]; then
  curl -X POST https://hooks.slack.com/services/YOUR/WEBHOOK/URL \
    -d '{"text": "E2E tests failed! Check CI for details."}'
fi
```

---

## Useful Commands

```bash
# View all available npm scripts
npm run

# Clean test artifacts
npm run clean

# Install Playwright browsers
npx playwright install chromium

# Run specific playbook
npx @playwright/mcp --headless < playbooks/smoke.md

# Debug mode (with browser visible)
npx @playwright/mcp < playbooks/auth.md

# Save video trace
npx @playwright/mcp --save-video=1280x720 --output-dir=./traces < playbooks/pitch-deck-wizard.md

# Run with custom timeout
timeout 300 npm run test:pitch-deck
```

---

## Support & Escalation

**For test issues**:
1. Check this runbook first
2. Review SKILL.md for tool reference
3. Check playbooks for example usage
4. Review GitHub Actions logs for CI failures

**For product issues** (tests reveal bugs):
1. Create screenshot evidence
2. Save console logs
3. Document reproduction steps
4. File GitHub issue with evidence

**For infrastructure issues**:
1. Check Supabase dashboard
2. Verify Edge Functions are deployed
3. Check database connectivity
4. Review RLS policies

---

**Last Updated**: 2025-10-19
**Maintained By**: DevOps Team
**Review Schedule**: Monthly
