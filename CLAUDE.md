# Medellin Spark - Project Memory

## Project Overview
**Type**: AI-powered presentation/pitch deck generation platform
**Tech Stack**: React + TypeScript + Vite + Supabase + OpenAI
**Focus**: Security, performance, token efficiency

---

## Code Style & Standards

### TypeScript
- Strict mode enabled
- No `any` types (use `unknown` if needed)
- Prefer interfaces over types for objects
- Max line length: 100 characters

### React
- Functional components only
- Use hooks (useState, useEffect, custom hooks)
- Component files: PascalCase.tsx
- Use shadcn/ui + Radix UI components
- Prefer composition over prop drilling

### File Structure
```
src/
├── components/       # Reusable UI components
├── pages/           # Route components
├── hooks/           # Custom React hooks
├── lib/             # Utilities, config
├── types/           # TypeScript types
└── stores/          # State management
```

---

## Development Commands

```bash
# Development
pnpm dev              # Start dev server (port 8080)
pnpm build            # Production build
pnpm build:dev        # Development build
pnpm lint             # ESLint check
pnpm preview          # Preview build

# Database (Supabase)
supabase status       # Check local instance
npx supabase db push  # Push migrations
npx supabase db reset # Reset local DB

# Testing
pnpm test            # Run tests
pnpm tsc             # Type check only
```

---

## Database (Supabase)

### Key Tables
- `profiles` - User profiles (profile_id references auth.users)
- `presentations` - User presentations
- `presentation_templates` - Public templates
- `custom_themes` - User custom themes
- `generated_images` - AI-generated images
- `favorite_presentations` - User favorites

### Security Rules
- ✅ **RLS enabled on ALL tables**
- ✅ **profile_id** (not user_id) references auth.users
- ✅ **API keys server-side only** (Edge Functions)
- ❌ **Never query auth.users directly** (use profiles table)

### Migrations
- Location: `supabase/migrations/`
- **Always idempotent** (IF NOT EXISTS, DROP IF EXISTS)
- Test locally before pushing
- Use MCP Supabase server for SQL execution

---

## API & Backend

### Supabase Edge Functions
- Location: `supabase/functions/`
- **chat** - OpenAI proxy (secure API key handling)
- Deploy: `supabase functions deploy <name>`
- Secrets: `supabase secrets set KEY=value`

### Environment Variables
- `VITE_SUPABASE_URL` - Public (exposed to browser)
- `VITE_SUPABASE_ANON_KEY` - Public (safe to expose)
- `SUPABASE_SERVICE_ROLE_KEY` - **SERVER ONLY**
- `OPENAI_API_KEY` - **SERVER ONLY** (in Edge Function)

**Rule**: Only `VITE_*` prefix goes in .env for frontend

---

## Security Best Practices

### Critical Rules
1. **Never commit .env** - Already in .gitignore
2. **API keys server-side only** - Use Edge Functions
3. **RLS always enabled** - Verify with `SELECT relrowsecurity FROM pg_class`
4. **Use profile_id** - Not user_id for table references
5. **Review AI code** - Especially auth/security logic

### File Protection
- ❌ Never edit: `.env`, `.env.*`
- ❌ Never commit: API keys, passwords, tokens
- ✅ Always use: `.env.example` for templates

---

## AI Features

### OpenAI Integration
- **Never call OpenAI directly from frontend**
- **Always use Edge Function**: `/functions/v1/chat`
- Default model: `gpt-4o-mini`
- Error handling: User-friendly messages

### Agent SDK (Advanced AI)
- **Use for**: Tool calling, multi-turn conversations, code analysis
- **Setup**: `docs/05-agent-sdk-setup.md` (TypeScript)
- **Quick ref**: `docs/06-agent-sdk-quick-ref.md`
- **Pattern**: `import { query } from 'npm:@anthropic-ai/claude-agent-sdk'`
- **Security**: API key in `Deno.env.get('ANTHROPIC_API_KEY')`, never frontend

### Best Practices
- Keep context focused
- Use system prompts for consistency
- Handle rate limits gracefully
- Log errors to Supabase
- Choose right tool: Simple completion → OpenAI, Tools/conversation → Agent SDK

---

## Working with Claude AI - Best Practices

### Prompt Engineering for Production

**Task Management**
1. **Give one task at a time** - Never mix design, logic, and testing in one message
2. **Be clear and concise** - Short, direct instructions outperform long essays
3. **Keep prompts short (<500 words)** - Clarity beats complexity
4. **Limit scope** - One folder or feature per session

**Planning & Execution**
6. **Plan before doing** - Ask Claude to outline its approach before writing code
7. **Split planning and action prompts** - "Step 1: plan," then "Step 2: implement"
8. **Confirm understanding** - "Summarize your plan in one sentence"
9. **Preview expected results** - "Describe what success looks like before generating code"

**Quality Assurance**
10. **Write tests before code** - Have Claude describe how success will be measured
11. **Add self-checks** - "Review for missing imports before sending"
12. **Ask for reasoning** - Have Claude explain decisions line by line
13. **Add checkpoints** - After each connection, ask: "Did data move correctly? Was the output what I expected?"

**Context & Safety**
14. **Label your context** - Use `[DB_SCHEMA]`, `[API_ROUTES]`, `[UI_COMPONENTS]` so Claude knows what's what
15. **Remind mode** - Start big tasks with "You're in dev mode — use safe commands"
16. **Remind project goals** - "This is for [project] — focus on fast, clean, readable code"
17. **Create restore points** - Tag or snapshot before edits

**Debugging & Iteration**
18. **Compare plan vs. result** - Identify exactly where logic diverged
19. **Keep an AI changelog** - Note what changed and why

**Example Prompt Structure**:
```
[DB_SCHEMA] - pitch_conversations table with RLS
[TASK] - Test end-to-end conversation flow
[EXPECTED] - User sends message → AI responds → Progress updates → Generate button appears
[MODE] - Dev mode, read-only testing first
```

---

## Git Workflow

### Commit Message Format
```
<type>: <subject>

<body>

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types**: feat, fix, refactor, docs, test, chore, security

### Branch Strategy
- `main` - Production
- `develop` - Development
- `feature/*` - New features
- `fix/*` - Bug fixes

### Before Commit Checklist
- [ ] Code compiles (`pnpm tsc`)
- [ ] Linter passes (`pnpm lint`)
- [ ] No console.log statements
- [ ] .env changes documented in .env.example
- [ ] Migrations are idempotent

---

## Testing Strategy

### Testing Approach: Layer-by-Layer

**DON'T**: Test entire system at once
**DO**: Test each layer independently, bottom-up

```
Layer 1: Database ✅ → SQL queries
Layer 2: Backend ✅ → curl/API tests
Layer 3: Frontend ✅ → Browser testing
Layer 4: E2E ✅ → Complete user journey
```

---

### Localhost Testing (Quick Start)

**Development Server**:
```bash
cd /home/sk/medellin-spark

# 1. Check TypeScript compiles
pnpm tsc --noEmit

# 2. Start dev server
pnpm dev

# 3. Navigate to chat interface
# http://localhost:8080/pitch-deck-wizard

# 4. Test slide grid (existing presentation)
# http://localhost:8080/presentations/d4a27c1c-8b2d-48a9-99c9-2298037e9e81/outline
```

**Success Indicators**:
- ✅ Server starts on port 8080
- ✅ No TypeScript errors
- ✅ No console errors in browser
- ✅ Chat interface loads
- ✅ All 10 slides render in grid

---

### Complete User Journey (Manual E2E Test)

**Duration**: 2-3 minutes
**Test Flow**:

```
STEP 1: Start
→ Navigate: http://localhost:8080/pitch-deck-wizard
→ Verify: Page loads, chat interface visible, no console errors

STEP 2: First Message
→ Type: "I want to create a pitch deck for TestCorp, an AI code assistant"
→ Click: Send button
→ Verify: Loading indicator → AI response appears
→ Check: Progress bar shows ~10%

STEP 3: Answer Questions (3-4 exchanges)
→ Message: "We target software developers in enterprise companies"
→ Verify: Progress increases to ~20-30%
→ Message: "The problem is repetitive coding tasks waste developer time"
→ Verify: Progress increases to ~40-50%
→ Message: "Our solution is AI-powered code completion"
→ Verify: Progress increases to ~60-70%
→ Message: "SaaS subscription at $20/month per developer"
→ Verify: Progress reaches 80%+

STEP 4: Generate Deck
→ Verify: "Generate Deck" button appears
→ Click: Generate Deck
→ Verify: Loading state shows
→ Wait: For redirect (5-10 seconds)
→ Verify: Redirected to /presentations/{id}/outline

STEP 5: View Slides
→ Verify: All 10 slides render
→ Verify: No "Loading..." stuck state
→ Verify: No RLS policy errors in console
→ Click: First slide
→ Verify: Slide details load

SUCCESS: ✅ Full user journey complete!
```

**Common Issues**:
- Stuck on "Loading...": Check RLS policies, verify presentation is_public=true
- 401 errors: Check JWT token validity
- No AI response: Check Edge Function logs (`supabase functions logs chat`)

---

### MCP Playwright (Automated E2E Testing)

**Framework**: Playwright (installed and configured)
**Usage**: Browser automation for E2E testing

**Setup**:
```bash
# Install Playwright browsers if needed
npx playwright install chromium

# Run tests
pnpm test:e2e  # or npx playwright test
```

**Example Test Script**:
```typescript
// e2e/pitch-deck-wizard.spec.ts
import { test, expect } from '@playwright/test';

test('complete pitch deck creation flow', async ({ page }) => {
  // Navigate to wizard
  await page.goto('http://localhost:8080/pitch-deck-wizard');

  // Verify chat interface
  await expect(page.locator('input[placeholder*="message"]')).toBeVisible();

  // Send first message
  await page.fill('input', 'I want to create a pitch deck for AI startup');
  await page.click('button[type="submit"]');

  // Wait for AI response
  await page.waitForSelector('text=/Great|Tell me|What/', { timeout: 10000 });

  // Verify progress bar exists
  await expect(page.locator('[role="progressbar"]')).toBeVisible();

  // Continue conversation (simplified - real test needs multiple messages)
  await page.fill('input', 'Software development industry');
  await page.click('button[type="submit"]');

  // Wait for Generate button (after 80% completeness)
  await expect(
    page.locator('button:has-text("Generate")')
  ).toBeVisible({ timeout: 30000 });

  // Click Generate
  await page.click('button:has-text("Generate")');

  // Wait for redirect to outline page
  await page.waitForURL(/\/presentations\/.*\/outline/, { timeout: 20000 });

  // Verify all 10 slides render
  await expect(page.locator('[data-slide-number]')).toHaveCount(10);
});
```

**MCP Playwright Tools** (via Claude Code):
- `browser_navigate` - Navigate to URL
- `browser_click` - Click elements
- `browser_type` - Type text
- `browser_snapshot` - Get accessibility tree
- `browser_take_screenshot` - Capture screenshots
- `browser_wait_for` - Wait for text/conditions
- `browser_console_messages` - Check console errors

**Usage Pattern**:
```typescript
// Use MCP tools for quick testing in conversation
// 1. Navigate to page
mcp__playwright__browser_navigate({ url: "http://localhost:8080/pitch-deck-wizard" })

// 2. Take snapshot to see page structure
mcp__playwright__browser_snapshot()

// 3. Click elements based on snapshot
mcp__playwright__browser_click({ element: "Send button", ref: "button-send" })

// 4. Check for console errors
mcp__playwright__browser_console_messages({ onlyErrors: true })
```

---

### MCP Chrome DevTools (Debugging & Testing)

**Framework**: Chrome DevTools Protocol
**Usage**: Browser inspection, network monitoring, console debugging

**MCP Chrome DevTools Tools** (via Claude Code):
- `list_pages` - List open browser tabs
- `navigate_page` - Navigate to URL
- `take_snapshot` - Get page element tree with UIDs
- `take_screenshot` - Capture page/element screenshots
- `click` - Click element by UID
- `fill` - Fill form fields
- `list_console_messages` - Get console output
- `list_network_requests` - Get network activity
- `get_network_request` - Get specific request details

**Testing Workflow**:

**1. Start Testing Session**:
```typescript
// Navigate to wizard
mcp__chrome-devtools__navigate_page({
  url: "http://localhost:8080/pitch-deck-wizard"
})

// Take snapshot to see page structure
mcp__chrome-devtools__take_snapshot()
// Returns: Element tree with UIDs for interaction
```

**2. Interact with Page**:
```typescript
// Fill chat input (use UID from snapshot)
mcp__chrome-devtools__fill({
  uid: "input-123",
  value: "I want to create a pitch deck"
})

// Click send button
mcp__chrome-devtools__click({ uid: "button-456" })
```

**3. Monitor Network**:
```typescript
// List all network requests
mcp__chrome-devtools__list_network_requests({
  resourceTypes: ["fetch", "xhr"]
})

// Get specific request details
mcp__chrome-devtools__get_network_request({
  url: "/functions/v1/pitch-deck-assistant"
})
// Returns: Full request/response including headers, body, status
```

**4. Check Console**:
```typescript
// Get all console messages
mcp__chrome-devtools__list_console_messages()
// Returns: Console logs, warnings, errors

// Look for specific patterns:
// - "Access denied" → RLS issue
// - "401 Unauthorized" → Auth issue
// - Network errors → CORS/connectivity issue
```

**5. Visual Debugging**:
```typescript
// Take screenshot of entire page
mcp__chrome-devtools__take_screenshot({ fullPage: true })

// Take screenshot of specific element (by UID from snapshot)
mcp__chrome-devtools__take_screenshot({
  uid: "slide-grid-789",
  format: "png"
})
```

**Common Debugging Patterns**:

```typescript
// Pattern 1: Verify API calls
1. Navigate to page
2. Interact with UI
3. List network requests
4. Check request/response data
5. Verify status codes

// Pattern 2: Debug UI issues
1. Take snapshot
2. Identify element UIDs
3. Take screenshot of problem area
4. Check console for errors
5. Verify element exists and is visible

// Pattern 3: Monitor real-time updates
1. Navigate to page
2. Start action (send chat message)
3. Wait for completion
4. Check console messages
5. Verify network activity
6. Take final screenshot
```

---

### Database Testing (Layer 1)

**Quick Verification** (use MCP Supabase tools):
```sql
-- Verify RLS enabled
SELECT tablename, rowsecurity FROM pg_tables
WHERE tablename IN ('presentations', 'pitch_conversations');
-- Expected: Both = true

-- Verify test presentation is public
SELECT id, is_public FROM presentations
WHERE id = 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81';
-- Expected: is_public = true

-- Test data insertion
INSERT INTO pitch_conversations (profile_id, collected_data, completeness)
VALUES ('00000000-0000-0000-0000-000000000000', '{}', 0)
RETURNING id;
-- Expected: Returns new UUID
```

---

### Backend Testing (Layer 2)

**Edge Function Tests** (use curl or Postman):
```bash
# Test 1: Verify auth required (should return 401)
curl -X POST \
  https://dhesktsqhcxhqfjypulk.supabase.co/functions/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": []}'

# Expected: 401 Unauthorized

# Test 2: List deployed functions
supabase functions list

# Expected: chat, pitch-deck-assistant, generate-pitch-deck (all ACTIVE)

# Test 3: Check function logs
supabase functions logs chat --tail
```

---

### Pre-Deployment Checklist

```
Code Quality:
[ ] pnpm tsc --noEmit (0 errors)
[ ] pnpm lint (0 warnings)
[ ] No console.log in production code

Functionality:
[ ] Chat interface works
[ ] AI responds correctly
[ ] Progress tracking updates
[ ] Generate deck creates presentation
[ ] Slide grid renders all 10 slides

Backend:
[ ] All Edge Functions deployed
[ ] Secrets configured (OPENAI_API_KEY, etc.)
[ ] Database migrations applied
[ ] RLS policies active

Build:
[ ] pnpm build (succeeds in < 5 seconds)
[ ] pnpm preview (works correctly)
[ ] Bundle size acceptable (< 2MB)

Security:
[ ] No API keys in frontend code
[ ] .env not in git (git status)
[ ] RLS enabled on all tables
[ ] JWT validation working
```

---

### Testing Resources

- **Daily Checklist**: `lovable-plan/management/903-DAILY-TESTING-CHECKLIST.md`
- **Full Strategy**: `lovable-plan/docs/004-TESTING-STRATEGY-AND-IMPROVEMENTS.md`
- **Playwright Docs**: https://playwright.dev
- **Chrome DevTools Protocol**: https://chromedevtools.github.io/devtools-protocol/

---

## Common Patterns

### Database Queries
```typescript
// ✅ Good - Use profile_id
const { data } = await supabase
  .from('presentations')
  .select('*')
  .eq('profile_id', user.id)

// ❌ Bad - Don't use user_id
.eq('user_id', user.id)  // Column doesn't exist!
```

### Error Handling
```typescript
// ✅ Good
try {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return await response.json()
} catch (error) {
  toast.error('Failed to load data')
  console.error(error)
}
```

### Component Structure
```typescript
// ✅ Good
export function MyComponent({ prop }: Props) {
  const [state, setState] = useState()

  useEffect(() => {
    // Side effects
  }, [dependencies])

  return <div>...</div>
}
```

---

## Performance Optimization

### Frontend
- Use React.memo for expensive components
- Implement code splitting (React.lazy)
- Optimize images (WebP, lazy loading)
- Minimize bundle size

### Database
- Add indexes for common queries
- Use RPC functions for complex operations
- Batch requests when possible
- Monitor query performance

---

## Documentation Rules

### Token Efficiency (Critical)
- ❌ **Never repeat information**
- ❌ **Don't duplicate status across sections**
- ✅ **State each point once**
- ✅ **Use tables/lists over paragraphs**
- ✅ **Be concise - every token counts**

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Styles: `kebab-case.css`
- Tests: `*.test.tsx`

### File Organization & Numbering
- **Always check existing folder structure** before creating files
- **Number docs sequentially**: `001-setup.md`, `002-config.md`, `003-deploy.md`
- **Use correct folders**:
  - Docs → `docs/`
  - Architecture → `docs/main/` or `lovable-plan/`
  - Security → `docs/` (top-level)
  - Scripts → `scripts/`
  - Functions → `supabase/functions/`
- **Check last number**: `ls docs/ | grep -E '^[0-9]+'` before creating new numbered doc
- **Keep numbering consistent** within each folder (don't skip numbers)

---

## Troubleshooting

### Common Issues

**Build fails**:
1. Check TypeScript errors: `pnpm tsc`
2. Clear cache: `rm -rf node_modules/.vite`
3. Reinstall: `pnpm install`

**Database connection fails**:
1. Check Supabase status: `supabase status`
2. Verify environment variables
3. Check RLS policies (might be blocking query)

**Authentication not working**:
1. Check profile_id exists in profiles table
2. Verify RLS policies allow access
3. Check auth token is valid

---

## Key Project Files

### Critical Files (Never Delete)
- `.env.example` - Environment variable template
- `supabase/migrations/` - Database schema history
- `supabase/functions/chat/` - Secure OpenAI proxy
- `.claude/` - Claude Code configuration

### Generated Files (Safe to Rebuild)
- `node_modules/` - Dependencies
- `dist/` - Build output
- `.vite/` - Vite cache

---

## Resources

- **Architecture**: `docs/main/`, `lovable-plan/`
- **Security**: `docs/SECURITY_STATUS.md`, `ENABLE_RLS_NOW.md`
- **Database**: `supabase/docs/`
- **AI/Agent SDK**: `docs/05-agent-sdk-setup.md`, `docs/06-agent-sdk-quick-ref.md`
- **Production Report**: `lovable-plan/pitch-deck/37-PRODUCTION_READINESS_REPORT.md`

---

## Quick Reference

**Project Status**: ✅ Production Ready (98/100)
**Security**: ✅ API keys secure, RLS enabled
**Last Security Audit**: October 16, 2025
**Key Achievement**: Secured OpenAI integration via Edge Functions

---

**Remember**: When in doubt, ask for clarification. Token efficiency matters!
