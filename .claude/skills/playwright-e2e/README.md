# Playwright E2E Testing Skill

**Production-ready E2E testing using Playwright MCP for the Medellin Spark platform**

<p align="center">
  <strong>Simple • Fast • Reliable</strong><br>
  Test your entire user journey in minutes, not hours.
</p>

---

## 🚀 Quick Start

**Run your first test in 60 seconds:**

```bash
# 1. Install Playwright MCP
npm install -g @playwright/mcp@latest

# 2. Start your dev server
pnpm dev

# 3. Run smoke test
npm run test:smoke
```

That's it! Your first E2E test is complete. 🎉

---

## 📋 What You Get

This skill provides:

✅ **3 Ready-to-Run Test Playbooks**
- Smoke test (2 min) - Quick health check
- Auth flow (5 min) - Login/logout testing
- Full journey (10-15 min) - Complete pitch deck creation

✅ **Autonomous Agent**
- Smart test orchestration
- Intelligent error handling
- Automatic screenshot capture
- Network & console monitoring

✅ **Production-Ready CI/CD**
- GitHub Actions workflows
- Automated PR checks
- Daily health monitoring
- Test result artifacts

✅ **Complete Documentation**
- SKILL.md - Core instructions
- RUNBOOK.md - Operations guide
- Examples - TypeScript reference implementations
- Playbooks - Step-by-step test scripts

---

## 🎯 Use Cases

**Before Every Deployment:**
```bash
npm run test:all  # Verify everything works
```

**After Code Changes:**
```bash
npm run test:smoke  # Quick sanity check
```

**Testing New Features:**
```bash
npm run test:pitch-deck  # Full user journey
```

**Debugging Issues:**
```bash
# Run with browser visible (no --headless)
npx @playwright/mcp < playbooks/pitch-deck-wizard.md
```

---

## 📁 Project Structure

```
.claude/skills/playwright-e2e-skill/
├── SKILL.md                    # Main skill instructions
├── README.md                   # This file
├── RUNBOOK.md                  # Operations & troubleshooting
├── package.json                # Dependencies & scripts
│
├── playbooks/                  # Test scenarios
│   ├── smoke.md               # 2-min health check
│   ├── auth.md                # 5-min auth flow
│   └── pitch-deck-wizard.md   # 10-15 min full journey
│
├── examples/                   # TypeScript examples
│   ├── basic-navigation.ts    # Simple test pattern
│   ├── form-submission.ts     # Form testing
│   └── full-journey.ts        # Complete user flow
│
├── .github/workflows/          # CI/CD automation
│   └── e2e-tests.yml          # GitHub Actions config
│
└── .claude/agents/             # Autonomous testing agent
    └── eventos-playwright-agent/
        ├── agent.json         # Agent manifest
        ├── handler.ts         # Test orchestration logic
        └── types.ts           # TypeScript definitions
```

---

## 🛠️ Installation

### Prerequisites

- Node.js 20+
- pnpm or npm
- Chrome/Chromium browser

### Setup

```bash
# 1. Install Playwright MCP globally
npm install -g @playwright/mcp@latest

# 2. Install Playwright browsers
npx playwright install chromium

# 3. Install project dependencies
cd .claude/skills/playwright-e2e-skill
npm install

# 4. Verify installation
npm run test:smoke
```

---

## 📚 Available Tests

### 1. Smoke Test (2 min)

**What it tests:**
- Homepage loads
- Navigation works
- No console errors
- API calls succeed

**When to run:** Before every deployment, after every code change

**Command:**
```bash
npm run test:smoke
```

**Playbook:** [playbooks/smoke.md](playbooks/smoke.md)

---

### 2. Auth Flow (5 min)

**What it tests:**
- Login form works
- Authentication succeeds
- Protected routes accessible
- Session persists
- Logout works

**When to run:** After auth code changes, before production deploy

**Command:**
```bash
npm run test:auth
```

**Playbook:** [playbooks/auth.md](playbooks/auth.md)

---

### 3. Pitch Deck Wizard - Full Journey (10-15 min)

**What it tests:**
- Chat interface works
- AI responds correctly
- Progress tracking updates
- Deck generation completes
- All 10 slides render
- Export functionality works

**When to run:** Before releases, weekly regression testing

**Command:**
```bash
npm run test:pitch-deck
```

**Playbook:** [playbooks/pitch-deck-wizard.md](playbooks/pitch-deck-wizard.md)

---

## 🎬 Example Output

```
🚀 Starting full pitch deck wizard journey...

📍 PHASE 1: Setup & Navigation
  ✅ Wizard loaded

📍 PHASE 2: AI Conversation & Data Collection
  💬 Sending message 1/6...
  💬 Sending message 2/6...
  💬 Sending message 3/6...
  💬 Sending message 4/6...
  💬 Sending message 5/6...
  💬 Sending message 6/6...
  ✅ Conversation: 6 exchanges

📍 PHASE 3: Deck Generation
  ⏳ Waiting for Generate Deck button...
  🔄 Generating deck...
  ⏳ Waiting for generation to complete...
  ✅ Deck generated

📍 PHASE 4: Slide Validation
  📊 Detected 10 slide references
  ✅ Found slide: Problem
  ✅ Found slide: Solution
  ✅ Found slide: Product
  ✅ Found slide: Market
  ✅ Found slide: Business Model
  ✅ Found slide: Team
  ✅ Found slide: Traction
  ✅ Found slide: Ask
  📈 Found 8/8 expected slide types
  🔍 Testing slide interaction...
  ✅ Slide interaction works

📍 PHASE 5: Final Verification
  ✅ No console errors
  📡 Network: 45 total, 12 API calls
  ✅ All API calls successful

============================================================
✅ FULL JOURNEY COMPLETE
============================================================
Phases: ✅ Wizard loaded → ✅ Conversation: 6 exchanges → ✅ Deck generated → ✅ 10 slides generated → ✅ Slide interaction works
Conversation exchanges: 6
Slides generated: 10
Screenshots: 7
Errors: 0
```

---

## 🔧 Configuration

### NPM Scripts

All scripts are defined in [package.json](package.json):

```json
{
  "scripts": {
    "test:smoke": "Quick 2-min health check",
    "test:auth": "5-min authentication flow",
    "test:pitch-deck": "10-15 min full journey with video",
    "test:all": "Run all tests sequentially",
    "test:ci": "Headless mode for CI/CD",
    "examples:basic": "Run basic navigation example",
    "examples:form": "Run form submission example",
    "examples:full": "Run full journey example",
    "clean": "Remove test artifacts",
    "setup": "Install Playwright MCP"
  }
}
```

### Environment Variables

Create `.env` file (optional):

```bash
# Base URL for tests
PLAYWRIGHT_BASE_URL=http://localhost:8080

# Default timeout (ms)
PLAYWRIGHT_TIMEOUT=30000

# Headless mode
PLAYWRIGHT_HEADLESS=true
```

---

## 🤖 Using the Agent

The `eventos-playwright-agent` provides autonomous test execution:

**Trigger phrases:**
- "test the full user journey"
- "run e2e tests"
- "validate pitch deck wizard"
- "run smoke tests"

**Example usage:**

```typescript
import { EventosPlaywrightAgent } from '.claude/agents/eventos-playwright-agent';

const agent = new EventosPlaywrightAgent({
  baseUrl: 'http://localhost:8080',
  timeout: 30000,
  screenshotDir: './test-results'
});

// Run smoke test
const result = await agent.runSmokeTest(context);

// Run full journey
const journeyResult = await agent.runPitchDeckJourney(context);

// Generate report
const report = agent.generateReport([result, journeyResult]);
console.log(report);
```

---

## 🏗️ CI/CD Integration

### GitHub Actions

Tests run automatically on:
- **Push to main/develop** → Smoke tests
- **Pull requests** → Smoke + Auth tests
- **Daily at 6 AM UTC** → Smoke tests
- **Manual trigger** → Choose which suite to run

See [.github/workflows/e2e-tests.yml](.github/workflows/e2e-tests.yml) for configuration.

### Manual CI Run

```bash
# Run CI-mode tests locally
npm run test:ci
```

---

## 📖 Learning Resources

**Start here:**
1. [SKILL.md](SKILL.md) - Core skill instructions and tool reference
2. [playbooks/smoke.md](playbooks/smoke.md) - Simplest test example
3. [examples/basic-navigation.ts](examples/basic-navigation.ts) - Code example

**Go deeper:**
4. [playbooks/pitch-deck-wizard.md](playbooks/pitch-deck-wizard.md) - Complex journey
5. [RUNBOOK.md](RUNBOOK.md) - Operations & troubleshooting
6. [handler.ts](.claude/agents/eventos-playwright-agent/handler.ts) - Agent implementation

---

## 🐛 Troubleshooting

**Tests failing?** Check [RUNBOOK.md](RUNBOOK.md) for solutions to common issues:

- Browser already in use
- Dev server not running
- Flaky tests
- AI not responding
- RLS blocking data
- Slow execution

**Quick fixes:**

```bash
# Reset everything
pkill -f chromium
rm -rf test-results
npm run test:smoke

# View detailed logs
cat test-results/*.log

# Debug visually (no headless)
npx @playwright/mcp < playbooks/smoke.md
```

---

## 📊 Performance Benchmarks

| Test | Expected | Good | Acceptable |
|------|----------|------|------------|
| Smoke Test | <2 min | <1 min | <3 min |
| Auth Test | <5 min | <3 min | <7 min |
| Full Journey | <15 min | <10 min | <20 min |

---

## 🤝 Contributing

**Adding a new test:**

1. Create playbook in `playbooks/my-test.md`
2. Add npm script to `package.json`
3. Test locally: `npm run test:my-test`
4. Update this README
5. Submit PR

**Example playbook template:**

```markdown
# My Test Playbook

**Purpose**: Brief description
**Duration**: X minutes
**When to Run**: When to use this test

## Test Steps

### Step 1: Description
\`\`\`typescript
await browser_navigate({ url: "..." });
\`\`\`

### Step 2: Description
\`\`\`typescript
await browser_click({ element: "...", ref: "..." });
\`\`\`
```

---

## 📜 License

MIT - See project root for license details

---

## 🙋 Support

**Need help?**

1. Check [SKILL.md](SKILL.md) for tool reference
2. Check [RUNBOOK.md](RUNBOOK.md) for troubleshooting
3. Review [examples/](examples/) for code patterns
4. Check [playbooks/](playbooks/) for test scenarios

**Found a bug?**

1. Capture screenshots from `test-results/`
2. Save console logs
3. Document reproduction steps
4. File GitHub issue with evidence

---

<p align="center">
  <strong>Built with ❤️ for the Medellin Spark team</strong><br>
  <em>Simple, fast, and reliable E2E testing</em>
</p>
