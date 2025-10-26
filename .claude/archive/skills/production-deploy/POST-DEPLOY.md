# Post-Deployment Verification

**Quick verification after deployment - keep it simple.**

---

## Smoke Test (5 minutes)

### 1. Site Loads
```bash
curl -I https://your-domain.com
```
✅ Expected: `200 OK`

### 2. Test Critical Path
1. Visit `/pitch-deck-wizard`
2. Send message: "Create pitch deck for TestCorp"
3. Verify AI responds
4. Check progress updates

✅ All features work

### 3. Check Console
- Open browser DevTools
- Navigate app
- No errors in console

---

## E2E Tests (15 minutes)

```bash
# Run against production
BASE_URL=https://your-domain.com npx playwright test

# View report
npx playwright show-report
```
✅ All tests pass

---

## Performance Check

### Lighthouse Audit
1. Open Chrome DevTools
2. Navigate to Lighthouse tab
3. Run audit

✅ Target Scores:
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 90+

### Bundle Size
```bash
ls -lh dist/assets/*.js
```
✅ Target: Main bundle < 500KB

---

## Security Verification

### 1. HTTPS Active
```bash
curl -I https://your-domain.com | grep -i https
```
✅ HTTPS enabled

### 2. No API Keys in Bundle
```bash
curl https://your-domain.com/assets/index.js | grep -i "sk-"
```
❌ Should return nothing

### 3. RLS Working
Try accessing another user's data - should fail with 401

---

## Quick Checklist

- [ ] Site loads (200 OK)
- [ ] Wizard works (AI responds)
- [ ] Slides render
- [ ] No console errors
- [ ] E2E tests pass
- [ ] Lighthouse 90+
- [ ] HTTPS active
- [ ] No secrets exposed

---

**If all pass:** ✅ Deployment successful!

**If any fail:** See [ROLLBACK.md](ROLLBACK.md)
