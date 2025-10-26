# Playwright MCP - Complete Guide

**Last Updated**: October 19, 2025
**Version**: Based on @playwright/mcp@latest

---

## 📖 What is Playwright MCP?

**Playwright MCP** is a Model Context Protocol (MCP) server that provides browser automation capabilities using Playwright. It enables LLMs (like Claude) to interact with web pages through **structured accessibility snapshots** instead of screenshots.

### Key Advantages

✅ **No Vision Models Needed** - Uses accessibility tree, not pixels
✅ **More Accurate** - Structured data eliminates screenshot ambiguity
✅ **Faster** - No image processing overhead
✅ **Better for Testing** - Direct access to DOM elements via accessible names

---

## 🎯 Core Features vs Advanced Features

### **Core Features** (Essential for 90% of E2E tests)

| Feature | Tool | Event-Tech Example |
|---------|------|-------------------|
| **Navigation** | `browser_navigate` | Navigate to `/pitch-deck-wizard` |
| **Page Snapshot** | `browser_snapshot` | Get accessibility tree of event form |
| **Click** | `browser_click` | Click "Create Event" button |
| **Type Text** | `browser_type` | Enter event title "Tech Summit 2025" |
| **Fill Form** | `browser_fill_form` | Fill event details (title, date, venue) |
| **Screenshots** | `browser_take_screenshot` | Capture dashboard before/after |
| **Console Logs** | `browser_console_messages` | Check for JavaScript errors |
| **Network** | `browser_network_requests` | Verify API calls to `/api/events` |
| **Wait** | `browser_wait_for` | Wait for "Event created" message |
| **Tab Mgmt** | `browser_tabs` | Open event in new tab |

### **Advanced Features** (For Complex Scenarios)

| Feature | Tool | Event-Tech Example |
|---------|------|-------------------|
| **File Upload** | `browser_file_upload` | Upload event banner image |
| **Drag & Drop** | `browser_drag` | Reorder sessions in event schedule |
| **JavaScript Eval** | `browser_evaluate` | Check `window.eventData` state |
| **Dialog Handling** | `browser_handle_dialog` | Confirm "Delete event?" alert |
| **Keyboard** | `browser_press_key` | Press Escape to close modal |
| **Hover** | `browser_hover` | Hover over attendee card for tooltip |
| **Select Dropdown** | `browser_select_option` | Choose event category "Conference" |
| **Resize Window** | `browser_resize` | Test responsive design (375x667) |

### **Opt-In Capabilities** (Via `--caps` flag)

| Capability | Tools | Use Case |
|------------|-------|----------|
| `vision` | `browser_mouse_click_xy`<br>`browser_mouse_drag_xy` | Coordinate-based interactions (rare) |
| `testing` | `browser_verify_element_visible`<br>`browser_generate_locator` | Test assertions, code generation |
| `tracing` | `browser_start_tracing`<br>`browser_stop_tracing` | Performance debugging |

---

## 🏗️ Event-Tech Workflow Examples

### Example 1: Create Event (Smoke Test)
```
1. Navigate to http://localhost:3000/dashboard
2. Take snapshot → Verify "Create Event" button exists
3. Click "Create Event"
4. Fill form: title="AI Summit", date="2025-12-15", venue="Convention Center"
5. Click "Submit"
6. Wait for "Event created successfully"
7. Take screenshot → Save as "event-created.png"
8. Check console → No errors
```

### Example 2: Auth Flow
```
1. Navigate to /auth
2. Type email: "test@eventos.com"
3. Type password: "SecurePass123!"
4. Click "Login"
5. Wait for redirect to /dashboard
6. Verify "Welcome back" text visible
7. Check network → POST /api/auth/login returns 200
```

### Example 3: Multi-Session Event (Advanced)
```
1. Create event
2. Click "Add Session"
3. Fill session details (modal form)
4. Upload speaker photo (browser_file_upload)
5. Drag session to reorder (browser_drag)
6. Hover over session card → Verify edit tooltip
7. Take full-page screenshot
```

---

## 🚀 Installation & Setup

### Quick Start

```bash
# Install globally
npm install -g @playwright/mcp@latest

# Or use npx (no install)
npx @playwright/mcp@latest
```

### Common Options

```bash
# Headless mode (default is headed)
npx @playwright/mcp --headless

# Specific browser
npx @playwright/mcp --browser firefox

# Save session artifacts
npx @playwright/mcp --save-trace --save-video=1280x720 --output-dir=./test-results

# Device emulation
npx @playwright/mcp --device "iPhone 15"

# Ignore HTTPS errors (dev environments)
npx @playwright/mcp --ignore-https-errors
```

---

## 🎭 Best Practices

### 1. **Always Use Snapshots First**
```typescript
// ✅ GOOD: Get snapshot to find elements
const snapshot = await browser_snapshot();
// Then use element refs from snapshot
await browser_click({ element: "Create Event button", ref: "btn-create" });

// ❌ BAD: Guessing element selectors
await browser_evaluate({ function: "document.querySelector('#unknown').click()" });
```

### 2. **Use Semantic Element Descriptions**
```typescript
// ✅ GOOD: Human-readable descriptions
await browser_click({ element: "Submit button", ref: "button-submit" });

// ❌ BAD: Technical jargon
await browser_click({ element: "btn#id_123", ref: "xyz" });
```

### 3. **Wait for State Changes**
```typescript
// ✅ GOOD: Wait for confirmation
await browser_click({ element: "Save", ref: "btn-save" });
await browser_wait_for({ text: "Saved successfully" });

// ❌ BAD: Assume immediate success
await browser_click({ element: "Save", ref: "btn-save" });
await browser_take_screenshot({ filename: "saved.png" }); // Might be too early!
```

### 4. **Capture Evidence**
```typescript
// ✅ GOOD: Screenshots before/after critical actions
await browser_take_screenshot({ filename: "before-submit.png" });
await browser_click({ element: "Submit", ref: "btn-submit" });
await browser_wait_for({ text: "Success" });
await browser_take_screenshot({ filename: "after-submit.png" });
```

### 5. **Check Console & Network**
```typescript
// ✅ GOOD: Verify no errors
const logs = await browser_console_messages({ onlyErrors: true });
if (logs.length > 0) throw new Error(`Console errors: ${logs}`);

const requests = await browser_network_requests();
const apiCalls = requests.filter(r => r.url.includes('/api/'));
console.log(`API calls made: ${apiCalls.length}`);
```

---

## ⚠️ Common Pitfalls

### 1. **Not Waiting for Elements**
```typescript
// ❌ PROBLEM: Element not loaded yet
await browser_navigate({ url: "/dashboard" });
await browser_click({ element: "Button", ref: "btn-1" }); // Fails!

// ✅ SOLUTION: Wait for page load
await browser_navigate({ url: "/dashboard" });
await browser_wait_for({ text: "Dashboard" }); // Wait for indicator
await browser_click({ element: "Button", ref: "btn-1" });
```

### 2. **Ignoring Dialogs**
```typescript
// ❌ PROBLEM: Confirmation dialog blocks execution
await browser_click({ element: "Delete", ref: "btn-delete" });
// Dialog appears, test hangs!

// ✅ SOLUTION: Handle dialog
await browser_click({ element: "Delete", ref: "btn-delete" });
await browser_handle_dialog({ accept: true }); // Confirm deletion
```

### 3. **Using Coordinates Instead of Accessibility**
```typescript
// ❌ AVOID: Coordinate-based (fragile, requires --caps=vision)
await browser_mouse_click_xy({ x: 150, y: 200 });

// ✅ PREFER: Accessibility-based (robust)
await browser_click({ element: "Submit button", ref: "btn-submit" });
```

---

## 📊 Performance Tips

### Optimize Test Speed

```bash
# 1. Use headless mode (faster)
npx @playwright/mcp --headless

# 2. Reuse browser context (faster)
npx @playwright/mcp --shared-browser-context

# 3. Disable unnecessary features
npx @playwright/mcp --headless --no-sandbox

# 4. Set lower timeouts for fast tests
npx @playwright/mcp --timeout-action 3000 --timeout-navigation 15000
```

### Save Artifacts Selectively

```bash
# Only save on failure (faster)
# (Implement conditional save in your test logic)

# Or save everything (slower, but better for debugging)
npx @playwright/mcp --save-trace --save-video=1280x720 --save-session
```

---

## 🔒 Security Considerations

### Secrets Management

```bash
# Store credentials in .env file
npx @playwright/mcp --secrets ./.env

# .env file example:
# TEST_USER_EMAIL=test@example.com
# TEST_USER_PASSWORD=SecurePass123!
```

### Allowed/Blocked Origins

```bash
# Only allow specific domains
npx @playwright/mcp --allowed-origins "https://eventos.com;https://api.eventos.com"

# Block analytics/tracking
npx @playwright/mcp --blocked-origins "https://analytics.google.com;https://facebook.com"
```

---

## 🧪 Testing Patterns

### Pattern 1: Smoke Test (Basic Functionality)
```
✅ Navigate to homepage → 200 OK
✅ Click main CTA → Modal opens
✅ Submit form → Success message
✅ No console errors
```

### Pattern 2: Auth Flow
```
✅ Navigate to /login
✅ Enter credentials
✅ Submit → Redirect to /dashboard
✅ Verify user name displayed
✅ Check JWT token in localStorage
```

### Pattern 3: Full User Journey
```
✅ Sign up → Confirm email → Log in
✅ Create event → Add sessions → Publish
✅ View public page → Register attendee
✅ Export PDF → Download ticket
✅ Verify all network calls successful
```

---

## 📚 Resources

- **Official Repo**: https://github.com/microsoft/playwright-mcp
- **Playwright Docs**: https://playwright.dev/docs/intro
- **MCP Specification**: https://modelcontextprotocol.io/
- **VS Code Extension**: Search "Playwright MCP Bridge" in VS Code

---

## 🎯 Next Steps

1. **Read the Skill scaffold** → `playwright-e2e-skill/README.md`
2. **Try the playbooks** → `playbooks/smoke.md`, `playbooks/auth.md`
3. **Run examples** → `npm run test:smoke`, `npm run test:auth`
4. **Integrate CI** → See `.github/workflows/e2e.yml` template

---

**Quick Reference Cheat Sheet** → See next section for all available tools
