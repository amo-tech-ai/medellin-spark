# Pitch Deck Wizard - Full Journey Playbook

**Purpose**: Test complete pitch deck creation flow from start to finish

**Duration**: ~10-15 minutes

**When to Run**: Before releases, after wizard changes, weekly smoke test

---

## 🎯 Complete User Journey

```
START → Navigate to Wizard → Chat with AI → Collect Data →
→ Generate Deck → View Slides → Export PDF → COMPLETE
```

---

## 📋 Test Steps

### PHASE 1: Setup & Navigation (2 min)

#### Step 1.1: Navigate to Wizard
```typescript
// Start from homepage
await browser_navigate({ url: "http://localhost:8080" });

// Wait for page load
await browser_wait_for({ text: "Dashboard" });

// Take baseline screenshot
await browser_take_screenshot({ filename: "00-homepage.png" });

// Navigate to Pitch Deck Wizard
await browser_click({
  element: "Pitch Deck Wizard",
  ref: "nav-pitch-deck-wizard"
});

// Wait for wizard to load
await browser_wait_for({ text: "Create Pitch Deck" });

// Screenshot wizard initial state
await browser_take_screenshot({ filename: "01-wizard-loaded.png" });
```

#### Step 1.2: Verify UI Elements
```typescript
// Get page snapshot
const snapshot = await browser_snapshot();

// Verify key elements exist
const hasChat = snapshot.includes("chat") || snapshot.includes("message");
const hasInput = snapshot.includes("input") || snapshot.includes("textarea");
const hasSend = snapshot.includes("Send") || snapshot.includes("Submit");

console.log(`Chat interface present: ${hasChat}`);
console.log(`Input field present: ${hasInput}`);
console.log(`Send button present: ${hasSend}`);

if (!hasChat || !hasInput || !hasSend) {
  throw new Error("Required UI elements missing");
}
```

---

### PHASE 2: AI Conversation & Data Collection (5 min)

#### Step 2.1: Send First Message
```typescript
// Find chat input (textarea or input)
const chatInput = "textarea"; // or "input[type='text']"

// Type startup details
await browser_type({
  element: "Chat input",
  ref: "input-chat",
  text: "I want to create a pitch deck for AI Code Assistant, a developer productivity tool"
});

// Screenshot message typed
await browser_take_screenshot({ filename: "02-message-typed.png" });

// Click Send button
await browser_click({
  element: "Send button",
  ref: "btn-send"
});

// Wait for AI response (this may take 3-10 seconds)
await browser_wait_for({ time: 10 });

// Screenshot AI response
await browser_take_screenshot({ filename: "03-ai-responded.png" });
```

#### Step 2.2: Continue Conversation (Loop)
```typescript
// Define conversation flow (4-5 exchanges typical)
const messages = [
  "We target software developers in enterprise companies",
  "The problem is repetitive coding tasks waste developer time",
  "Our solution uses AI to autocomplete code and suggest improvements",
  "We charge $20 per month per developer, SaaS model",
  "We have 500 beta users and $50K MRR"
];

for (let i = 0; i < messages.length; i++) {
  console.log(`Sending message ${i + 1}/${messages.length}...`);

  // Type message
  await browser_type({
    element: "Chat input",
    ref: "input-chat",
    text: messages[i]
  });

  // Send
  await browser_click({
    element: "Send button",
    ref: "btn-send"
  });

  // Wait for AI response
  await browser_wait_for({ time: 8 });

  // Check progress bar (if visible)
  const snapshot = await browser_snapshot();
  const hasProgress = snapshot.includes("progress") || snapshot.includes("%");
  console.log(`Progress indicator visible: ${hasProgress}`);

  // Screenshot
  await browser_take_screenshot({
    filename: `04-conversation-${i + 1}.png`
  });

  // Small delay between messages
  await browser_wait_for({ time: 2 });
}
```

#### Step 2.3: Monitor Progress
```typescript
// Check if "Generate Deck" button appears
await browser_wait_for({ text: "Generate" });

console.log("✅ Generate button appeared - data collection complete");

// Screenshot ready state
await browser_take_screenshot({ filename: "05-ready-to-generate.png" });

// Check progress indicators
const progressSnapshot = await browser_snapshot();
console.log("Progress UI:", progressSnapshot);
```

---

### PHASE 3: Deck Generation (3 min)

#### Step 3.1: Trigger Generation
```typescript
// Click "Generate Deck" button
await browser_click({
  element: "Generate Deck button",
  ref: "btn-generate"
});

console.log("Clicked Generate Deck...");

// Wait for generation (can take 10-30 seconds)
await browser_wait_for({ text: "Generating", timeout: 5000 });

// Screenshot loading state
await browser_take_screenshot({ filename: "06-generating.png" });

// Wait for completion (redirect to slides view)
await browser_wait_for({ text: "Slide", timeout: 45000 });

console.log("✅ Deck generation complete");
```

#### Step 3.2: Verify Redirect
```typescript
// Check URL changed to /presentations/{id}/outline
const currentUrl = await browser_evaluate({
  function: "() => window.location.href"
});

console.log(`Current URL: ${currentUrl}`);

const isOutlineView = currentUrl.includes("/presentations/") &&
                      currentUrl.includes("/outline");

if (!isOutlineView) {
  throw new Error(`Expected outline view, got: ${currentUrl}`);
}

// Screenshot slide view
await browser_take_screenshot({ filename: "07-slides-view.png" });
```

---

### PHASE 4: Slide Validation (3 min)

#### Step 4.1: Count Slides
```typescript
// Get page snapshot
const slidesSnapshot = await browser_snapshot();

// Count slide elements (look for slide numbers or cards)
const slidePattern = /slide/gi;
const slideMatches = slidesSnapshot.match(slidePattern) || [];

console.log(`Detected ${slideMatches.length} slide references`);

// Verify minimum slides (should have ~10 slides)
const minSlides = 8;
if (slideMatches.length < minSlides) {
  console.warn(`Only ${slideMatches.length} slides found, expected ${minSlides}+`);
}
```

#### Step 4.2: Verify Slide Content
```typescript
// Check for expected slide types
const expectedSlides = [
  "Problem",
  "Solution",
  "Product",
  "Market",
  "Business Model",
  "Team",
  "Traction",
  "Ask"
];

let foundSlides = 0;
for (const slideType of expectedSlides) {
  const found = slidesSnapshot.toLowerCase().includes(slideType.toLowerCase());
  if (found) {
    foundSlides++;
    console.log(`✅ Found slide: ${slideType}`);
  } else {
    console.log(`⚠️  Missing slide: ${slideType}`);
  }
}

console.log(`Found ${foundSlides}/${expectedSlides.length} expected slides`);
```

#### Step 4.3: Interact with Slides
```typescript
// Click first slide
await browser_click({
  element: "First slide",
  ref: "slide-1"
});

// Wait for slide details to load
await browser_wait_for({ time: 2 });

// Screenshot slide detail view
await browser_take_screenshot({ filename: "08-slide-detail.png" });

// Navigate back to grid
await browser_navigate_back();
await browser_wait_for({ time: 1 });
```

---

### PHASE 5: Export & Final Verification (2 min)

#### Step 5.1: Test Export (If Available)
```typescript
// Look for export/download button
const hasExport = await browser_evaluate({
  function: `() => {
    const exportBtn = document.querySelector('[data-export], [aria-label*="Export"], button:has-text("Export")');
    return exportBtn !== null;
  }`
});

if (hasExport) {
  console.log("Export functionality detected");

  await browser_click({
    element: "Export button",
    ref: "btn-export"
  });

  // Wait for download/export modal
  await browser_wait_for({ time: 3 });

  // Screenshot export dialog
  await browser_take_screenshot({ filename: "09-export-dialog.png" });
} else {
  console.log("No export button found (feature not implemented yet)");
}
```

#### Step 5.2: Network & Console Check
```typescript
// Get all network requests
const requests = await browser_network_requests();

// Filter AI/API calls
const aiCalls = requests.filter(r =>
  r.url.includes('/functions/v1/') ||
  r.url.includes('/pitch-deck-assistant') ||
  r.url.includes('/generate-pitch-deck')
);

console.log(`\nNetwork Summary:`);
console.log(`- Total requests: ${requests.length}`);
console.log(`- AI/API calls: ${aiCalls.length}`);

// Check for failures
const failedCalls = aiCalls.filter(r => r.status >= 400);
if (failedCalls.length > 0) {
  console.error(`Failed API calls:`, failedCalls);
}

// Get console errors
const errors = await browser_console_messages({ onlyErrors: true });
if (errors.length > 0) {
  console.warn(`Console errors (${errors.length}):`, errors);
}
```

#### Step 5.3: Final Screenshot
```typescript
// Take full page screenshot
await browser_take_screenshot({
  filename: "10-final-state.png",
  fullPage: true
});

console.log("\n✅ Pitch Deck Wizard journey complete!");
```

---

## ✅ Success Criteria

### Must Have
- [x] Wizard loads without errors
- [x] Chat interface is functional
- [x] Can send messages to AI
- [x] AI responds to messages
- [x] Progress tracking works
- [x] "Generate Deck" button appears
- [x] Deck generation completes
- [x] Redirects to slides view
- [x] At least 8 slides generated

### Nice to Have
- [x] All 10 expected slide types present
- [x] Slide interaction works (click → details)
- [x] Export functionality available
- [x] No console errors
- [x] All API calls successful
- [x] Performance acceptable (<30s total generation time)

---

## 📊 Expected Output

```
✅ Pitch Deck Wizard - Full Journey Test Results
================================================

PHASE 1: Setup & Navigation
  ✅ Homepage loaded (524ms)
  ✅ Wizard opened
  ✅ UI elements verified

PHASE 2: AI Conversation
  ✅ First message sent
  ✅ AI responded (3.2s)
  ✅ 5 conversation exchanges completed
  ✅ Progress tracked: 0% → 25% → 50% → 75% → 85%
  ✅ Generate button appeared

PHASE 3: Deck Generation
  ✅ Generation triggered
  ✅ Loading state shown
  ✅ Generation completed (18.4s)
  ✅ Redirected to slides view

PHASE 4: Slide Validation
  ✅ 10 slides detected
  ✅ Expected slide types: 8/8 found
  ✅ Slide interaction works

PHASE 5: Export & Verification
  ✅ Export available
  ⚠️  Console: 0 errors, 2 warnings
  ✅ Network: 12 API calls, 11 successful, 1 cached

Total Time: 14m 32s

Artifacts:
  - 10 screenshots captured
  - Network log saved
  - Console log saved
```

---

## 🐛 Troubleshooting

### Issue: AI doesn't respond
**Cause**: Edge Function not deployed or API key missing

**Fix**:
```bash
# Check Edge Function status
supabase functions list

# Check secrets
supabase secrets list

# Re-deploy if needed
supabase functions deploy pitch-deck-assistant
```

### Issue: Generate button never appears
**Cause**: Progress not reaching 80% threshold

**Fix**:
- Send more detailed messages (4-5 exchanges minimum)
- Verify progress calculation logic in `PitchDeckWizard.tsx`
- Check `completeness` value in database

### Issue: Deck generation hangs
**Cause**: Database connection timeout or Edge Function timeout

**Fix**:
```bash
# Check function logs
supabase functions logs generate-pitch-deck --tail

# Increase timeout in Edge Function
# (default is 60s, increase to 120s if needed)
```

### Issue: No slides shown after generation
**Cause**: RLS policy blocking access or presentation not created

**Fix**:
```sql
-- Check if presentation was created
SELECT * FROM presentations ORDER BY created_at DESC LIMIT 1;

-- Verify is_public=true for dev mode
UPDATE presentations
SET is_public = true
WHERE id = '<presentation-id>';
```

---

## 🚀 Quick Run Commands

### Manual Test
```bash
# Start dev server (if not running)
pnpm dev

# Run playbook
claude run playwright-e2e-skill pitch-deck-wizard
```

### Automated Test (via npm script)
```bash
# Run full journey test
npm run test:pitch-deck

# Run with video recording
npm run test:pitch-deck -- --save-video=1280x720
```

### CI/CD
```bash
# Headless mode for CI
npx @playwright/mcp --headless --save-trace < playbooks/pitch-deck-wizard.md
```

---

## 📸 Screenshot Reference

| Screenshot | Description |
|------------|-------------|
| `00-homepage.png` | Initial dashboard view |
| `01-wizard-loaded.png` | Wizard first load |
| `02-message-typed.png` | First message entered |
| `03-ai-responded.png` | AI response received |
| `04-conversation-{1-5}.png` | Each conversation exchange |
| `05-ready-to-generate.png` | 80%+ completeness, button visible |
| `06-generating.png` | Loading/generation in progress |
| `07-slides-view.png` | Slide grid after generation |
| `08-slide-detail.png` | Individual slide detail view |
| `09-export-dialog.png` | Export modal (if available) |
| `10-final-state.png` | Full page final state |

---

## 🎯 Performance Benchmarks

| Metric | Expected | Good | Acceptable |
|--------|----------|------|------------|
| Wizard Load | <1s | <500ms | <2s |
| AI Response Time | <5s | <3s | <10s |
| Generation Time | <20s | <15s | <45s |
| Redirect Time | <2s | <1s | <5s |
| Total Journey | <10min | <8min | <15min |

---

**Pro Tip**: Run this test weekly to catch regressions early!
