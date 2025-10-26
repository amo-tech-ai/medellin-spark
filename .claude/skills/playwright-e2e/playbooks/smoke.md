# Smoke Test Playbook

**Purpose**: Verify the app is alive and core functionality works

**Duration**: ~2 minutes

**When to Run**: After every deploy, PR merge, or major change

---

## 🎯 Test Steps

### 1. Homepage Check
```typescript
// Navigate to homepage
await browser_navigate({ url: "http://localhost:8080" });

// Take snapshot
const snapshot = await browser_snapshot();

// Verify key elements exist
await browser_wait_for({ text: "Dashboard" });

// Screenshot for evidence
await browser_take_screenshot({ filename: "01-homepage.png" });

// Check console for errors
const errors = await browser_console_messages({ onlyErrors: true });
if (errors.length > 0) {
  throw new Error(`Console errors found: ${JSON.stringify(errors)}`);
}
```

### 2. Navigation Test
```typescript
// Click main navigation link
await browser_click({
  element: "Pitch Deck Wizard link",
  ref: "nav-pitch-deck"
});

// Wait for page load
await browser_wait_for({ text: "Create Pitch Deck" });

// Verify URL changed
const currentUrl = await browser_evaluate({
  function: "() => window.location.href"
});
console.log(`Current URL: ${currentUrl}`);

// Screenshot
await browser_take_screenshot({ filename: "02-pitch-deck-page.png" });
```

### 3. Network Health Check
```typescript
// Get all network requests
const requests = await browser_network_requests();

// Filter API calls
const apiCalls = requests.filter(r => r.url.includes('/api/') || r.url.includes('/functions/'));

// Verify no failed requests
const failedCalls = apiCalls.filter(r => r.status >= 400);
if (failedCalls.length > 0) {
  console.error(`Failed API calls:`, failedCalls);
  throw new Error(`${failedCalls.length} API calls failed`);
}

console.log(`✅ All ${apiCalls.length} API calls successful`);
```

### 4. Basic Interaction Test
```typescript
// Find and interact with primary CTA
await browser_click({
  element: "Get Started button",
  ref: "btn-get-started"
});

// Wait for modal/page change
await browser_wait_for({ time: 2 });

// Take final screenshot
await browser_take_screenshot({ filename: "03-after-interaction.png" });
```

---

## ✅ Success Criteria

- [x] Homepage loads (HTTP 200)
- [x] Navigation works correctly
- [x] No console errors
- [x] All API calls return 2xx/3xx
- [x] Primary CTA is clickable
- [x] Screenshots captured successfully

---

## 📊 Expected Output

```
✅ Smoke Test Results
==================
Homepage: PASS (loaded in 524ms)
Navigation: PASS (URL changed to /pitch-deck-wizard)
Console: PASS (0 errors)
Network: PASS (8 API calls, all successful)
Interaction: PASS (button clicked, modal appeared)

Artifacts:
- 01-homepage.png
- 02-pitch-deck-page.png
- 03-after-interaction.png
```

---

## 🔧 Troubleshooting

### Issue: Page doesn't load
```bash
# Check dev server is running
pnpm dev

# Verify port 8080 is accessible
curl http://localhost:8080
```

### Issue: Console errors found
- Review error messages in test output
- Check browser console manually
- Fix JavaScript errors before re-running

### Issue: API calls failing
- Verify backend is running
- Check environment variables (.env)
- Review network tab in browser DevTools

---

## 🚀 Quick Run Command

```bash
# Using Claude Skill
claude run playwright-e2e-skill smoke

# Or directly with MCP
npx @playwright/mcp --headless < playbooks/smoke.md
```
