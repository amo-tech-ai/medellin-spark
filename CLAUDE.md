# Pitch Deck Wizard - Project Memory & Development Guide

**Project**: AI-powered pitch deck generation platform
**Architecture**: Blaxel Multi-Agent System + FastAPI + React
**Focus**: Safe development, validation-first, best practices

---

## Quick Start

```bash
# Validate environment before starting work
cd /home/sk/mde/template-copilot-kit-py
bash scripts/validate-environment.sh
bash scripts/validate-dependencies.sh

# Start development (from project root /home/sk/mde)
cd template-copilot-kit-py
bl serve --hotreload  # Backend (port 1339)

cd ..  # Return to /home/sk/mde
npm run dev  # Frontend (port 8080)
```

---

## Project Architecture

### Current System (Blaxel Multi-Agent)

```
Frontend (React + CopilotKit)
    ↓
FastAPI Server (/copilotkit endpoint)
    ↓
Blaxel Multi-Agent System
    ↓
LangGraph Supervisor Agent
    ↓
├── content-agent (gathers startup info)
├── slides-agent (structures presentation)
└── export-agent (generates PPTX) - future
```

**Key Technologies**:
- Backend: FastAPI + Blaxel + LangGraph
- Frontend: React 19 + Vite + CopilotKit
- Database: Supabase PostgreSQL (direct connection)
- Agents: Multi-agent orchestration pattern

**Reference**: `/home/sk/mde/mvp/progrss/08-CRITICAL-ARCHITECTURE-DISCOVERY.md`

---

## Core Development Principles

### 1. Keep It Simple
- Use existing project structure
- Follow patterns already in repo
- No advanced features in first stage
- Safe changes only

### 2. Validate Before Executing
- Run validation scripts before starting work
- Verify each step during execution
- Test at multiple layers
- Always have rollback ready

### 3. Follow Official Documentation
- Reference framework docs
- Follow best practices from official sources
- Use proven patterns

### 4. Safety First
- Backups before changes (with checksums)
- Rollback procedures tested
- Multiple stopping points
- No destructive operations without confirmation

---

## Development Workflow

### Before Starting Work

**Step 1: Validate Environment**
```bash
bash scripts/validate-environment.sh
```
Checks: Node.js, Python, Blaxel CLI, Git, disk space, ports

**Step 2: Validate Dependencies**
```bash
bash scripts/validate-dependencies.sh
```
Checks: Python packages, Node modules, Claude Agent SDK

**Step 3: Check Git Status**
```bash
git status
# Commit or stash changes before major work
```

### During Development

**For each significant change**:
1. Create backup if modifying existing files
2. Make change
3. Run verification command
4. Test locally
5. Commit with descriptive message

**Verification Example**:
```bash
# After modifying agent.py (from template-copilot-kit-py/)
python -c "from src.agent import agent; print('✅ Import successful')"

# After modifying frontend (from /home/sk/mde)
npm run build  # Ensure it builds
```

### After Development

**Before Committing**:
```bash
# Check TypeScript
npx tsc --noEmit

# Check linting
npm run lint

# Check formatting
npm run format:check
```

**Commit Format**:
```
<type>: <subject>

<body>

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

Types: feat, fix, refactor, docs, test, chore, security

---

## File Structure

```
/home/sk/mde/                     # Project root
│
├── src/                          # React frontend source
│   ├── pages/                    # Route components
│   │   ├── PitchDeckWizard.tsx   # Main chat interface
│   │   ├── Dashboard.tsx
│   │   └── presentations/        # Presentation views
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── presentation/
│   │   └── dashboard/
│   ├── lib/                      # Utilities
│   ├── hooks/                    # Custom React hooks
│   ├── integrations/             # Third-party integrations
│   │   └── supabase/
│   ├── stores/                   # State management
│   └── types/                    # TypeScript types
│
├── template-copilot-kit-py/      # Backend (Blaxel + FastAPI)
│   ├── src/                      # Backend source
│   │   ├── main.py               # FastAPI + CopilotKit server
│   │   ├── agent.py              # Supervisor agent
│   │   ├── flight.py             # Flight booking agent
│   │   ├── hotel.py              # Hotel booking agent
│   │   └── server/               # Server utilities
│   ├── explorer-mcp/             # MCP server for tools
│   ├── scripts/                  # Backend automation scripts
│   │   ├── validate-environment.sh
│   │   └── validate-dependencies.sh
│   ├── archive/                  # Archived code
│   │   └── edge-functions-backup-2025-01-25/
│   ├── app-sample/               # Sample CopilotKit app
│   └── .venv/                    # Python virtual environment
│
├── supabase/                     # Database & backend services
│   ├── migrations/               # Database schema
│   │   └── completed/            # Applied migrations
│   ├── functions/                # Edge Functions (archived)
│   ├── seeds/                    # Seed data
│   ├── rollback_scripts/         # Migration rollbacks
│   ├── docs/                     # Database documentation
│   ├── reports/                  # Analysis reports
│   └── connect/                  # Connection utilities
│
├── .claude/                      # Claude Code configuration
│   ├── skills/                   # Custom skills
│   │   ├── plan-validator/
│   │   ├── frontend-dev/
│   │   ├── supabase-migration/
│   │   ├── commit-helper/
│   │   ├── docs-architect/
│   │   └── playwright-e2e/
│   ├── agents/                   # Custom agents
│   ├── archive/                  # Archived skills/agents
│   ├── docs/                     # Claude Code docs
│   └── guides/                   # Development guides
│
├── mvp/                          # MVP planning
│   └── progrss/                  # Planning & documentation
│       ├── 08-CRITICAL-ARCHITECTURE-DISCOVERY.md
│       ├── 09-EDGE-FUNCTIONS-REMOVAL-PLAN.md
│       ├── 10-PLAN-VALIDATION-FRAMEWORK.md
│       ├── 11-PROCESS-IMPROVEMENT-SUMMARY.md
│       └── 12-PLAN-VALIDATOR-SKILL-AGENT.md
│
├── repos/                        # Reference repositories
│   ├── 100-copilotkit-powerpoint/
│   ├── 200-presenton/
│   ├── 250-presentation-ai/
│   ├── mvp/                      # MVP reference docs
│   └── screens/                  # UI screenshots
│
├── docs/                         # Project documentation
├── public/                       # Static assets
├── dist/                         # Build output
│
├── package.json                  # Frontend dependencies
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS config
├── CLAUDE.md                     # This file
└── .env                          # Environment variables
```

---

## Validation Framework

### 5-Layer Validation Pyramid

```
                ┌─────────────────┐
                │  5. Production  │  (Health checks)
                │    Validation   │
                └─────────────────┘
            ┌───────────────────────┐
            │  4. Integration Tests │  (E2E, API)
            └───────────────────────┘
        ┌───────────────────────────────┐
        │   3. Automated Preflight      │  (CI/CD)
        └───────────────────────────────┘
    ┌───────────────────────────────────────┐
    │    2. Smoke & Sanity Checks           │  (Quick tests)
    └───────────────────────────────────────┘
┌───────────────────────────────────────────────┐
│      1. Pre-Execution Validation              │  (Env, deps)
└───────────────────────────────────────────────┘
```

**Reference**: `/home/sk/mde/mvp/progrss/10-PLAN-VALIDATION-FRAMEWORK.md`

### Quick Validation Commands

```bash
# Layer 1: Pre-execution
bash scripts/validate-environment.sh
bash scripts/validate-dependencies.sh

# Layer 2: Smoke tests (after changes)
# - Backend starts: timeout 30s bl serve
# - Frontend builds: npm run build
# - Database connects: Test query

# Layer 3: Automated (before commit)
npm run lint
npx tsc --noEmit
npm test

# Layer 4: Integration (before deploy)
npm run test:e2e

# Layer 5: Production (after deploy)
curl -s https://your-site.com/health
```

---

## Database (Supabase)

### Key Tables
- `profiles` - User profiles (profile_id references auth.users)
- `presentations` - User pitch decks
- `pitch_conversations` - Chat conversation history
- `presentation_templates` - Public templates

### Security Rules
- ✅ **RLS enabled on ALL tables**
- ✅ **profile_id** (not user_id) for foreign keys
- ✅ **API keys server-side only**
- ❌ **Never query auth.users directly**

### Common Queries

```typescript
// ✅ Good - Use profile_id
const { data } = await supabase
  .from('presentations')
  .select('*')
  .eq('profile_id', user.id)

// ❌ Bad - Don't use user_id
.eq('user_id', user.id)  // Column doesn't exist!
```

---

## Code Style & Standards

### TypeScript
- Strict mode enabled
- No `any` types (use `unknown` if needed)
- Prefer interfaces over types
- Max line length: 100 characters

### React
- Functional components only
- Use hooks (useState, useEffect)
- Component files: PascalCase.tsx
- Use shadcn/ui + Radix UI

### Python (Backend)
- FastAPI + Pydantic models
- Type hints required
- Async/await for I/O operations
- Follow PEP 8

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Styles: `kebab-case.css`
- Tests: `*.test.tsx`

---

## Environment Variables

### Frontend (.env in /home/sk/mde/)
```bash
# Public (safe to expose)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Blaxel endpoint (WebSocket)
VITE_BLAXEL_ENDPOINT=http://localhost:1339
```

### Backend (.env in root)
```bash
# Supabase (server-side only)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI APIs (server-side only)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Blaxel
BLAXEL_API_KEY=your_blaxel_key
```

**Rule**: Only `VITE_*` prefix goes in frontend .env

---

## Testing Strategy

### Layer-by-Layer Testing

**DON'T**: Test entire system at once
**DO**: Test each layer independently

```
Layer 1: Database ✅ → SQL queries
Layer 2: Backend ✅ → curl/API tests
Layer 3: Frontend ✅ → Browser testing
Layer 4: E2E ✅ → Complete user journey
```

### Quick Smoke Tests

```bash
# Test 1: Backend starts
cd /home/sk/template-copilot-kit-py
timeout 30s bl serve --hotreload
# Expected: Server starts, no errors

# Test 2: Frontend builds
cd /home/sk/mde
npm run build
# Expected: Build succeeds in < 60s

# Test 3: Database connection
# Run simple query in Supabase dashboard
SELECT COUNT(*) FROM presentations;
# Expected: Returns count, no RLS errors
```

### Complete User Journey

```
STEP 1: Start wizard
→ Navigate: http://localhost:8080/pitch-deck-wizard
→ Verify: Page loads, chat interface visible

STEP 2: Send message
→ Type: "Create pitch deck for TechStartup, an AI assistant"
→ Click: Send
→ Verify: Loading → AI response appears

STEP 3: Continue conversation (3-4 exchanges)
→ Answer questions about industry, problem, solution
→ Verify: Progress bar increases

STEP 4: Generate deck
→ Verify: "Generate Deck" button appears (at 80%+)
→ Click: Generate
→ Verify: Redirect to /presentations/{id}/view

STEP 5: View slides
→ Verify: All 10 slides render
→ Verify: No "Loading..." stuck state
```

---

## Common Development Tasks

### Starting Development Servers

```bash
# Terminal 1: Backend
cd /home/sk/mde/template-copilot-kit-py
bl serve --hotreload
# Runs on: http://localhost:1339 (WebSocket endpoint)

# Terminal 2: Frontend
cd /home/sk/mde
npm run dev
# Runs on: http://localhost:8080
```

### Running Tests

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Unit tests
npm test

# E2E tests
npm run test:e2e
```

### Database Migrations

```bash
# Check Supabase status
supabase status

# Push migrations
supabase db push

# Reset database (caution!)
supabase db reset
```

### Building for Production

```bash
# Frontend build
cd /home/sk/mde
npm run build

# Backend deploy (Blaxel)
cd /home/sk/mde/template-copilot-kit-py
bl deploy
```

---

## Skills & Agents

### Available Skills

Located in `.claude/skills/`:

1. **plan-validator** - Validates development plans
2. **frontend-dev** - React + TypeScript development
3. **supabase-migration** - Database migrations
4. **commit-helper** - Git workflow management
5. **docs-architect** - Documentation generation
6. **playwright-e2e** - End-to-end testing

**Invoke**: Skills are automatically used when relevant

### Available Agents

Located in `.claude/agents/`:

1. **plan-validator** - Comprehensive plan validation
2. **task-checker** - Task verification
3. **task-executor** - Task execution
4. **task-orchestrator** - Task coordination
5. **copilotkit-architect** - CopilotKit integration

**Invoke**: Call agent explicitly when needed

### Using Plan Validator

```markdown
User: "Review my migration plan"

Claude: "I'll use the plan-validator skill to check your plan..."

[Runs validation scripts, checks structure, verifies safety]

Claude: "✅ Plan validated!
- Safety: Good (backup + rollback present)
- Completeness: 92/100
- Suggestion: Add smoke test for API endpoint"
```

---

## Security Best Practices

### Critical Rules
1. **Never commit .env** - Already in .gitignore
2. **API keys server-side only** - Use backend/Edge Functions
3. **RLS always enabled** - Verify on all tables
4. **Use profile_id** - Not user_id for references
5. **Review AI code** - Especially auth/security logic

### File Protection
- ❌ Never edit: `.env`, API key files
- ❌ Never commit: Secrets, passwords, tokens
- ✅ Always use: `.env.example` for templates

### Verification

```sql
-- Verify RLS enabled
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname = 'public';
-- All should be: true

-- Check for exposed secrets
git grep -i "sk-" --cached
-- Should return: nothing
```

---

## Troubleshooting

### Backend Won't Start

```bash
# Check Python version
python3 --version  # Should be 3.10+

# Check Blaxel CLI
bl version

# Check dependencies
cd /home/sk/mde/template-copilot-kit-py
uv pip list | grep -E "fastapi|blaxel"

# View logs
bl serve --hotreload --verbose
```

### Frontend Build Fails

```bash
# Check Node version
node --version  # Should be 18+

# Check TypeScript errors
npx tsc --noEmit

# Clear cache
rm -rf node_modules/.vite
npm install

# Rebuild
npm run build
```

### Database Connection Issues

```bash
# Check Supabase status
supabase status

# Verify environment variables
echo $SUPABASE_URL

# Test connection
# Use Supabase dashboard to run simple query

# Check RLS policies
# May be blocking your query
```

### Agent Not Responding

```bash
# Check backend logs
# Look for errors in terminal running bl serve

# Verify CopilotKit endpoint
curl http://localhost:1339/copilotkit

# Check agent configuration
cat src/agent.py

# Verify tools are loaded
# Check for MCP server errors
```

---

## Common Patterns

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
  throw error  // Re-throw for caller to handle
}
```

### Component Structure

```typescript
// ✅ Good pattern
export function MyComponent({ prop }: Props) {
  const [state, setState] = useState<Type>()

  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    }
  }, [dependencies])

  const handleEvent = () => {
    // Event handlers
  }

  return <div>...</div>
}
```

### Agent Pattern

```python
# ✅ Good pattern
async def agent():
    tools = await bl_tools(["explorer-mcp"])
    model = await bl_model("sandbox-openai")

    prompt = """You are an expert assistant that..."""

    return create_react_agent(
        name="agent-name",
        model=model,
        tools=tools,
        prompt=prompt,
        checkpointer=MemorySaver(),
    )
```

---

## Documentation Guidelines

### Token Efficiency (Critical)
- ❌ **Never repeat information**
- ❌ **Don't duplicate across sections**
- ✅ **State each point once**
- ✅ **Use tables/lists over paragraphs**
- ✅ **Be concise - every token counts**

### File Organization
- **Check existing structure** before creating files
- **Number docs sequentially**: `001-`, `002-`, `003-`
- **Use correct folders**:
  - Plans → `mvp/progrss/`
  - Docs → `docs/`
  - Scripts → `scripts/`
  - Skills → `.claude/skills/`
  - Agents → `.claude/agents/`

### Numbering Convention

```bash
# Before creating new numbered doc
ls mvp/progrss/ | grep -E '^[0-9]+'
# Check last number, increment by 1
```

---

## Key Project Documents

### Architecture & Planning
- `mvp/progrss/08-CRITICAL-ARCHITECTURE-DISCOVERY.md` - System architecture
- `mvp/progrss/09-EDGE-FUNCTIONS-REMOVAL-PLAN.md` - Migration plan example
- `mvp/progrss/10-PLAN-VALIDATION-FRAMEWORK.md` - Validation methodology
- `mvp/progrss/11-PROCESS-IMPROVEMENT-SUMMARY.md` - Process guide
- `mvp/progrss/12-PLAN-VALIDATOR-SKILL-AGENT.md` - Skill/agent docs

### Validation Scripts
- `scripts/validate-environment.sh` - Environment checks
- `scripts/validate-dependencies.sh` - Dependency checks

### Configuration
- `.claude/skills/` - Custom skills
- `.claude/agents/` - Custom agents
- `pyproject.toml` - Python dependencies
- `package.json` - Node dependencies

---

## Working with Claude AI

### Effective Prompting

**DO**:
- Give one task at a time
- Be clear and concise
- Plan before implementing
- Ask for reasoning
- Use validation framework

**DON'T**:
- Mix design, logic, and testing
- Write long essays (< 500 words)
- Skip validation steps
- Assume it worked without verification

### Prompt Structure Example

```markdown
[CONTEXT]
- Project: Pitch Deck Wizard
- Architecture: Blaxel + FastAPI + React
- Current: Edge Functions → Blaxel migration

[TASK]
Update content agent prompt to gather startup information

[VALIDATION]
- Run: bash scripts/validate-environment.sh
- Test: bl serve --hotreload
- Verify: Agent responds to test message

[MODE]
Safe changes only, backup before modifying
```

---

## Quick Reference

### Project Status
- **Architecture**: Blaxel Multi-Agent System
- **Frontend**: React 19 + CopilotKit
- **Backend**: FastAPI + Blaxel + LangGraph
- **Database**: Supabase PostgreSQL
- **Security**: ✅ RLS enabled, API keys secure

### Key Commands

```bash
# Validation
bash scripts/validate-environment.sh
bash scripts/validate-dependencies.sh

# Development
bl serve --hotreload              # Backend
npm run dev                        # Frontend

# Testing
npm run lint                       # Linting
npx tsc --noEmit                  # Type check
npm test                           # Unit tests
npm run test:e2e                  # E2E tests

# Building
npm run build                      # Frontend build
bl deploy                          # Backend deploy
```

### Important Paths

```bash
# Project Root
/home/sk/mde/

# Frontend
/home/sk/mde/src/

# Backend
/home/sk/mde/template-copilot-kit-py/src/

# Validation Scripts
/home/sk/mde/template-copilot-kit-py/scripts/

# Documentation
/home/sk/mde/mvp/progrss/

# Skills & Agents
/home/sk/mde/.claude/

# Supabase
/home/sk/mde/supabase/
```

---

## Resources

- **Blaxel Docs**: https://docs.blaxel.com
- **CopilotKit Docs**: https://docs.copilotkit.ai
- **LangGraph Docs**: https://langchain-ai.github.io/langgraph
- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev

---

## Remember

### Core Principles
1. **Keep It Simple** - Use existing patterns
2. **Validate First** - Run checks before starting
3. **Safety First** - Backups + rollback always
4. **Follow Docs** - Reference official sources
5. **Test Thoroughly** - Multiple layers of validation

### Before Any Major Change
```bash
# 1. Validate environment
bash scripts/validate-environment.sh

# 2. Check git status
git status

# 3. Create backup if needed
cp file.ts file.backup.ts

# 4. Make changes

# 5. Verify changes worked
# Run appropriate tests

# 6. Commit with good message
git add . && git commit -m "feat: description"
```

---

**Last Updated**: January 25, 2025
**Framework Version**: 1.0
**Status**: ✅ Production Ready with Validation Framework

---

**When in doubt**: Run validation scripts, check documentation, ask for clarification.
**Token efficiency matters**: Be concise, avoid repetition, use lists over paragraphs.
