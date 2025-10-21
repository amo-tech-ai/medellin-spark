# Playwright MCP: Setup Best Practices Guide

**Last Updated:** October 15, 2025  
**Target Audience:** Developers, QA Engineers, AI Agent Developers

---

## 🎯 Quick Start Checklist

Before diving into setup, ensure you have:

- ✅ **Node.js**: v18, v20, v22, or v24.x LTS
- ✅ **Operating System**: Windows 11+, macOS 14+, or Ubuntu 22.04+
- ✅ **IDE/AI Tool**: VS Code, Cursor, Claude Desktop, or Windsurf
- ✅ **Git** (optional but recommended for CI/CD)
- ✅ **10 minutes** for initial setup

---

## 🚀 Installation: Choose Your Path

### **Path 1: AI-First Setup (Recommended for MCP Integration)**

**Best For:** Cursor, Claude, VS Code with Copilot, AI agents

#### Step 1: Install Playwright Globally
```bash
npm install -g @playwright/test@latest
npx playwright install --with-deps chromium  # Install only what you need
```

#### Step 2: Configure Your MCP Client

**For Cursor:**
```bash
# One-click install
# Click: https://cursor.com/en/install-mcp?name=Playwright

# OR Manual: Settings → MCP → Add Server
{
  "name": "playwright",
  "command": "npx",
  "args": ["@playwright/mcp@latest"]
}
```

**For VS Code:**
```bash
# CLI installation (VS Code v1.105+ required)
code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'

# OR use VS Code extension
# Search: "Playwright Test for VSCode"
```

**For Claude Desktop:**
```bash
# Edit: ~/Library/Application Support/Claude/claude_desktop_config.json (macOS)
# Edit: %APPDATA%\Claude\claude_desktop_config.json (Windows)
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

#### Step 3: Initialize AI Agents
```bash
# For VS Code
npx playwright init-agents --loop=vscode

# For Claude Code
npx playwright init-agents --loop=claude

# For OpenCode
npx playwright init-agents --loop=opencode
```

**What This Creates:**
```
.github/
  agents/                    # AI agent definitions
    planner.yml             # 🎭 Exploration agent
    generator.yml           # 🎭 Test creation agent
    healer.yml              # 🎭 Self-healing agent
specs/                      # Test plans (Markdown)
tests/
  seed.spec.ts             # Bootstrap test
playwright.config.ts       # Configuration
```

---

### **Path 2: Traditional Setup (Manual Testing Focus)**

**Best For:** Manual test writing, migrating from Selenium/Cypress

```bash
# Initialize new project
npm init playwright@latest

# Follow prompts:
# ✅ TypeScript (recommended)
# ✅ tests/ folder
# ✅ Add GitHub Actions workflow
# ✅ Install browsers (yes)
```

**What This Creates:**
```
playwright.config.ts
tests/
  example.spec.ts
tests-examples/
  demo-todo-app.spec.ts
package.json
.github/workflows/playwright.yml
```

---

### **Path 3: Docker Setup (CI/CD or Headless Environments)**

**Best For:** CI/CD pipelines, remote servers, containerized workflows

```bash
# Quick ephemeral run
docker run -i --rm --init --pull=always \
  mcr.microsoft.com/playwright/mcp

# Long-lived service (HTTP transport)
docker run -d -i --rm --init --pull=always \
  --entrypoint node \
  --name playwright-mcp \
  -p 8931:8931 \
  mcr.microsoft.com/playwright/mcp \
  cli.js --headless --browser chromium --no-sandbox --port 8931
```

**MCP Client Config for Docker:**
```json
{
  "mcpServers": {
    "playwright": {
      "url": "http://localhost:8931/mcp"
    }
  }
}
```

---

## ⚙️ Configuration Best Practices

### **1. Browser Selection (Optimize for Speed)**

❌ **Don't Install All Browsers:**
```bash
# Bad: Wastes 2GB+ disk space
npx playwright install --with-deps
```

✅ **Install Only What You Need:**
```bash
# Good: Install only Chromium for CI
npx playwright install chromium --with-deps

# Development: Install all locally, only Chromium on CI
if [ "$CI" = "true" ]; then
  npx playwright install chromium --with-deps
else
  npx playwright install --with-deps
fi
```

**playwright.config.ts:**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    // ✅ Always test Chromium (fastest)
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // ✅ Test Firefox/WebKit only on pre-merge or release
    ...(process.env.FULL_BROWSER_TEST ? [
      { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
      { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ] : []),
  ],
});
```

---

### **2. Trace Configuration (Balance Cost vs. Debugging)**

❌ **Don't Record All Traces:**
```typescript
// Bad: Slows tests by 30%, fills disk
use: {
  trace: 'on',  // ❌ Records every test
}
```

✅ **Record on First Retry Only:**
```typescript
// Good: Only records failing tests
export default defineConfig({
  retries: process.env.CI ? 2 : 0,  // 2 retries on CI, 0 locally
  use: {
    trace: 'on-first-retry',  // ✅ Traces only first retry
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

**Why This Works:**
- Passing tests: No trace (fast)
- Flaky tests: Trace on retry (captured for debugging)
- Consistently failing tests: Trace on first retry (enough to debug)

---

### **3. User Profile Strategy**

Choose based on your testing needs:

#### **A. Persistent Profile (Default - Best for Development)**
```bash
# Profile persists between runs (stays logged in)
npx @playwright/mcp@latest

# Profile location:
# macOS/Linux: ~/.cache/ms-playwright/mcp-chrome-profile
# Windows: %USERPROFILE%\AppData\Local\ms-playwright\mcp-chrome-profile
```

**When to Use:**
- Local development
- Testing logged-in user flows
- Debugging with real user state

#### **B. Isolated Profile (Best for CI/CD)**
```bash
# Each test run starts fresh
npx @playwright/mcp@latest --isolated

# With pre-saved auth state
npx @playwright/mcp@latest --isolated --storage-state=./auth/logged-in.json
```

**When to Use:**
- CI/CD pipelines
- Parallel test execution
- Testing signup/login flows

**Generate Storage State:**
```typescript
// tests/setup/save-auth.ts
import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('https://app.example.com/login');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  
  // Wait for auth to complete
  await page.waitForURL('**/dashboard');
  
  // Save signed-in state
  await page.context().storageState({ path: './auth/logged-in.json' });
});
```

**Use Saved State:**
```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    storageState: './auth/logged-in.json',  // All tests start logged in
  },
});
```

#### **C. Browser Extension Mode (Best for Testing Real Sessions)**
```bash
# Connect to existing browser with extension installed
npx @playwright/mcp@latest --extension

# Install extension: https://github.com/microsoft/playwright-mcp/tree/main/extension
```

**When to Use:**
- Testing with real OAuth tokens
- Debugging with DevTools
- Testing browser extensions

---

### **4. Network Configuration**

**Block Analytics & Ads (Faster Tests):**
```bash
npx @playwright/mcp@latest \
  --blocked-origins="*.google-analytics.com;*.doubleclick.net;*.facebook.com/tr"
```

**Or via config.json:**
```json
{
  "network": {
    "blockedOrigins": [
      "*.google-analytics.com",
      "*.doubleclick.net", 
      "*.hotjar.com"
    ],
    "allowedOrigins": ["*"]  // Allow everything else
  }
}
```

**Benefits:**
- 20-30% faster test execution
- Fewer flaky tests (no tracking script delays)
- Lower network costs on CI

---

### **5. Capability Flags (Enable Only What You Need)**

```bash
# ❌ Don't enable everything
npx @playwright/mcp@latest --caps=tabs,install,pdf,vision,tracing

# ✅ Enable specific capabilities
npx @playwright/mcp@latest --caps=tabs,pdf  # Only tab management + PDF
```

**Capability Reference:**

| Flag | Description | When to Enable |
|------|-------------|----------------|
| `tabs` | Multi-tab management | Testing SPAs with popups/new tabs |
| `install` | Browser installation | CI/CD setup scripts |
| `pdf` | PDF generation | Testing print/export features |
| `vision` | Coordinate-based interactions | Canvas/drawing apps, pixel-perfect tests |
| `tracing` | Performance traces | Debugging slow pages |

---

### **6. Timeout Configuration**

**playwright.config.ts:**
```typescript
export default defineConfig({
  // ✅ Global timeout (entire test suite)
  globalTimeout: 60_000 * 60,  // 1 hour

  // ✅ Per-test timeout
  timeout: 30_000,  // 30 seconds per test

  // ✅ Expect timeout (assertions)
  expect: {
    timeout: 5_000,  // 5 seconds for assertions
  },

  use: {
    // ✅ Action timeout (clicks, fills, etc.)
    actionTimeout: 5_000,

    // ✅ Navigation timeout
    navigationTimeout: 30_000,
  },
});
```

**Increase Timeouts for Slow Apps:**
```typescript
// For specific slow tests
test('slow API call', async ({ page }) => {
  test.setTimeout(60_000);  // 60s for this test only
  
  await expect(page.getByText('Data loaded')).toBeVisible({ 
    timeout: 30_000  // 30s for this assertion only
  });
});
```

---

## 🏗️ Project Structure Best Practices

### **Recommended Layout:**
```
project-root/
├── .github/
│   ├── agents/                    # AI agent definitions
│   │   ├── planner.yml
│   │   ├── generator.yml
│   │   └── healer.yml
│   └── workflows/
│       └── playwright.yml         # CI/CD workflow
├── specs/                         # Test plans (Markdown)
│   ├── user-onboarding.md
│   └── checkout-flow.md
├── tests/
│   ├── fixtures/                  # Custom fixtures
│   │   └── auth.fixture.ts
│   ├── setup/                     # Setup tests
│   │   └── save-auth.ts
│   ├── e2e/                       # End-to-end tests
│   │   ├── login.spec.ts
│   │   └── checkout.spec.ts
│   └── seed.spec.ts              # Bootstrap test
├── auth/                          # Saved auth states
│   └── logged-in.json
├── config/                        # MCP configurations
│   └── playwright-mcp.json
├── playwright.config.ts
└── package.json
```

### **Naming Conventions:**
```typescript
// ✅ Good: Descriptive, grouped by feature
tests/e2e/auth/login.spec.ts
tests/e2e/auth/signup.spec.ts
tests/e2e/checkout/add-to-cart.spec.ts

// ❌ Bad: Flat structure, unclear naming
tests/test1.spec.ts
tests/test2.spec.ts
```

---

## 🧪 Seed Test Best Practices

**Create a Seed Test for AI Agents:**

```typescript
// tests/seed.spec.ts
import { test, expect } from './fixtures';

test('seed', async ({ page, authenticatedUser }) => {
  // ✅ Navigate to app
  await page.goto('https://app.example.com');
  
  // ✅ Verify core UI is loaded
  await expect(page.getByRole('navigation')).toBeVisible();
  
  // ✅ Check authenticated state
  await expect(page.getByText(`Welcome, ${authenticatedUser.name}`)).toBeVisible();
  
  // ✅ Test critical functionality
  await page.getByRole('button', { name: 'New Project' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});
```

**Why This Matters for AI Agents:**
- Planner uses this to understand your app structure
- Generator copies patterns (fixtures, waits, assertions)
- Healer references this as "known working state"

---

## 🔐 Environment Variables & Secrets

### **Local Development (.env file):**
```bash
# .env (DO NOT COMMIT)
PLAYWRIGHT_HEADLESS=false
PLAYWRIGHT_SLOWMO=500
BASE_URL=http://localhost:3000
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=password123
```

**Load in playwright.config.ts:**
```typescript
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: process.env.PLAYWRIGHT_HEADLESS !== 'false',
  },
});
```

### **CI/CD (GitHub Actions Secrets):**
```yaml
# .github/workflows/playwright.yml
env:
  BASE_URL: ${{ secrets.STAGING_URL }}
  TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
  TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
```

**Configure in GitHub:**
1. Repo Settings → Secrets and variables → Actions
2. Add: `STAGING_URL`, `TEST_USER_EMAIL`, `TEST_USER_PASSWORD`

---

## 🎭 AI Agent Configuration Best Practices

### **1. Planner Optimization**

**Provide Context via PRD (Product Requirements Document):**
```markdown
<!-- specs/prd.md -->
# Application: E-Commerce Platform

## Tech Stack
- Frontend: React 18 + TypeScript
- Backend: Node.js + Express
- Auth: OAuth 2.0 (Google, GitHub)
- Payment: Stripe

## Critical User Flows
1. Guest Checkout (no account required)
2. User Registration → Email Verification → First Purchase
3. Add to Cart → Apply Discount Code → Checkout

## Known Issues
- Cart sometimes flashes during add (visual bug, not functional)
- Checkout requires 2-3s for payment provider load
```

**Prompt Planner with PRD:**
```
"Generate test plan for guest checkout flow using specs/prd.md as context"
```

### **2. Generator Optimization**

**Use Descriptive Element Names:**
```typescript
// ✅ Good: Generator creates readable tests
await page.getByRole('button', { name: 'Add to Cart' }).click();
await page.getByLabel('Quantity').fill('3');

// ❌ Bad: Generator struggles with vague selectors
await page.locator('button.btn-primary').click();
await page.locator('input[name="qty"]').fill('3');
```

**Tag Your UI with data-testid:**
```html
<!-- Add to critical elements -->
<button data-testid="checkout-button">Proceed to Checkout</button>
<input data-testid="discount-code-input" placeholder="Promo code" />
```

**Configure in playwright.config.ts:**
```typescript
export default defineConfig({
  use: {
    testIdAttribute: 'data-testid',  // Default, but explicit is better
  },
});
```

### **3. Healer Optimization**

**Enable Verbose Logging for Healer:**
```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    trace: 'retain-on-failure',  // More data for Healer
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  
  // ✅ Enable detailed error messages
  reporter: [
    ['html'],
    ['list', { printSteps: true }],  // Show step-by-step logs
  ],
});
```

---

## 📊 CI/CD Best Practices

### **GitHub Actions Workflow (Optimized):**
```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 30
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        shard: [1, 2, 3, 4]  # ✅ Run 4 shards in parallel
    
    steps:
      - uses: actions/checkout@v5
      
      - uses: actions/setup-node@v5
        with:
          node-version: 20
          cache: 'npm'  # ✅ Cache dependencies
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright (Chromium only)
        run: npx playwright install chromium --with-deps
      
      - name: Run Playwright tests
        run: npx playwright test --shard=${{ matrix.shard }}/4
        env:
          BASE_URL: ${{ secrets.STAGING_URL }}
      
      - name: Upload HTML report
        if: failure()  # ✅ Only upload on failure
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report-shard-${{ matrix.shard }}
          path: playwright-report/
          retention-days: 7  # ✅ Auto-delete after 7 days
      
      - name: Upload trace
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-traces-shard-${{ matrix.shard }}
          path: test-results/
          retention-days: 7
```

**Benefits:**
- 4x faster (parallel shards)
- 80% cheaper (Chromium only, upload only failures)
- 70% less storage (7-day retention)

---

## 🐛 Debugging Setup Best Practices

### **Local Debugging (VS Code):**
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Playwright Test",
      "program": "${workspaceFolder}/node_modules/@playwright/test/cli.js",
      "args": [
        "test",
        "${file}",  // Current file
        "--debug",
        "--headed"
      ],
      "console": "integratedTerminal"
    }
  ]
}
```

**Usage:**
1. Open test file
2. Set breakpoint
3. Press F5 → Select "Debug Playwright Test"

### **UI Mode (Interactive Debugging):**
```bash
# Start UI Mode
npx playwright test --ui

# Features:
# - Watch mode (auto-rerun on save)
# - Time-travel debugging
# - Pick locator tool
# - Network inspector
# - Console logs
```

### **Trace Viewer (Post-Mortem Debugging):**
```bash
# Generate traces locally
npx playwright test --trace on

# Open HTML report
npx playwright show-report

# Or open trace directly
npx playwright show-trace test-results/example-spec-chromium/trace.zip
```

---

## 🚨 Common Setup Mistakes & Fixes

| Mistake | Problem | Fix |
|---------|---------|-----|
| **Installing all browsers on CI** | Wastes 5+ minutes, 2GB+ disk | `npx playwright install chromium --with-deps` |
| **Recording all traces** | Fills disk, slows tests 30% | `trace: 'on-first-retry'` |
| **Using headed mode on CI** | Tests fail (no display) | `headless: true` in config |
| **Hard-coding URLs** | Tests break across environments | Use `baseURL` + `page.goto('/')` |
| **No seed test** | AI agents generate poor tests | Create `tests/seed.spec.ts` |
| **Mixing test types** | E2E + unit tests conflict | Separate folders: `tests/e2e/`, `tests/unit/` |
| **Ignoring linter** | Async bugs (missing await) | Use `@typescript-eslint/no-floating-promises` |
| **No parallelism** | Tests take 10x longer | Enable `fullyParallel: true` |

---

## ✅ Setup Validation Checklist

Run these commands to verify your setup:

```bash
# 1. Check Playwright version
npx playwright --version
# Expected: Version 1.50.0+

# 2. Check installed browsers
npx playwright install --dry-run
# Expected: Lists installed browsers

# 3. Run example test
npx playwright test tests/example.spec.ts
# Expected: 1 test passes

# 4. Verify MCP server
# In your AI tool (Cursor/Claude), prompt:
# "Can you navigate to https://playwright.dev and take a snapshot?"
# Expected: AI returns accessibility tree

# 5. Test AI agents (if installed)
# Prompt Planner: "Generate test plan for a login form"
# Expected: Markdown test plan generated

# 6. Run UI Mode
npx playwright test --ui
# Expected: Browser opens with test list

# 7. Generate trace
npx playwright test --trace on
# Expected: trace.zip created in test-results/

# 8. Open HTML report
npx playwright show-report
# Expected: Browser opens with test results
```

---

## 📚 Next Steps

### **After Setup:**
1. **Create Seed Test** - Define your app's baseline state
2. **Add Fixtures** - Abstract common setup (auth, test data)
3. **Configure CI/CD** - Add GitHub Actions workflow
4. **Train Team** - Share this guide, run test generation session
5. **Monitor Flakiness** - Use `--repeat-each=10` to find flaky tests

### **Resources:**
- [Official Setup Guide](https://playwright.dev/docs/intro)
- [Best Practices Doc](https://playwright.dev/docs/best-practices)
- [CI/CD Guide](https://playwright.dev/docs/ci)
- [MCP GitHub Repo](https://github.com/microsoft/playwright-mcp)

---

## 🎯 Summary: The Golden Setup

```bash
# 1. Install Playwright MCP
npm install -g @playwright/test@latest
npx playwright install chromium --with-deps

# 2. Configure your AI tool (Cursor example)
# Add to Cursor MCP settings:
{
  "name": "playwright",
  "command": "npx",
  "args": ["@playwright/mcp@latest", "--caps=tabs,pdf"]
}

# 3. Initialize AI agents
npx playwright init-agents --loop=vscode

# 4. Create seed test
cat > tests/seed.spec.ts << 'EOF'
import { test, expect } from '@playwright/test';

test('seed', async ({ page }) => {
  await page.goto('https://app.example.com');
  await expect(page.getByRole('navigation')).toBeVisible();
});
EOF

# 5. Run your first AI-generated test
# Prompt: "Generate test plan for user login"
# Prompt: "Generate tests from specs/user-login.md"

# 6. Set up CI/CD
# Copy .github/workflows/playwright.yml from this guide

# Done! 🎉
```

---

**Setup Time:** ~10 minutes  
**Maintenance Time:** ~5 minutes/month (updates)  
**ROI:** 70% faster test writing, 80% less maintenance

**Questions?** Check the [troubleshooting section](#-common-setup-mistakes--fixes) or visit [Playwright Discord](https://aka.ms/playwright/discord).

