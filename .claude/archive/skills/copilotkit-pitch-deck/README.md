# CopilotKit + LangGraph Pitch Deck Skill

## Overview

This skill provides comprehensive guidance for implementing and troubleshooting the CopilotKit + LangGraph pitch deck wizard with three-tier architecture.

## Components

### Main Skill
**File**: `SKILL.md`
**Purpose**: Complete implementation guide for CopilotKit + LangGraph setup

**Covers**:
- Three-tier architecture (Frontend → Runtime → Agent)
- Runtime service setup (port 4000)
- Configuration fixes (URLs, agent names)
- Feature implementation (progress tracking, data collection)
- Common issues and solutions
- Testing workflows
- Key file references

### Supporting Documentation

**QUICK-START.md** - 30-minute setup guide
- Phase 1: Create runtime service (10 min)
- Phase 2: Fix configuration (5 min)
- Phase 3: Start everything (5 min)
- Phase 4: Test in browser (10 min)

**TROUBLESHOOTING.md** - Comprehensive debugging guide
- Service startup issues
- Connection problems
- State synchronization
- Message flow debugging
- TypeScript errors
- Performance optimization

## Connected Subagent

**Name**: `copilotkit-architect`
**File**: `/home/sk/template-copilot-kit-py/.claude/agents/copilotkit-architect.md`

**When Invoked**:
- Setting up CopilotKit runtime service
- Fixing agent configuration issues
- Debugging shared state synchronization
- Implementing three-tier architecture
- Any CopilotKit + LangGraph task

**Tools Available**:
- Read, Write, Edit
- Bash, Glob, Grep
- WebFetch, WebSearch

**Model**: Sonnet 4.5

## Usage

### Automatic Invocation
The `copilotkit-architect` subagent will be PROACTIVELY invoked when:
- You mention "CopilotKit" or "LangGraph"
- You're working on runtime service setup
- You're debugging agent connections
- You're implementing shared state features

### Manual Invocation
```
"Use the copilotkit-architect subagent to help with runtime setup"
"Have copilotkit-architect debug the connection issues"
```

### Skill Reference
The skill files are automatically loaded by the subagent when invoked. The progressive disclosure means:
- Metadata loaded at startup (~100 tokens)
- SKILL.md loaded when triggered (~2k tokens)
- Supporting files loaded as needed (TROUBLESHOOTING.md, QUICK-START.md)

## Architecture This Skill Implements

```
Frontend (:5173)  →  Runtime (:4000)  →  Agent (:8000)
     Vite             Node.js HTTP        LangGraph TS
  React 19            CopilotRuntime      TypeScript
  CopilotKit SDK      LangGraph Client    ChatOpenAI
  useCoAgent hook     HTTP + CORS         State Graph
```

## Key Features

### Runtime Service Setup
- Node.js HTTP server configuration
- CopilotKit Runtime integration
- LangGraph client connection
- CORS headers for development
- Health check endpoints

### Configuration Fixes
- Runtime URL correction (`:8000` → `:4000/copilotkit`)
- Agent name consistency (`"pitchDeckAgent"` everywhere)
- State type alignment (frontend ↔ backend)
- Dev scripts for all three services

### Feature Implementation
- Progress calculation (0-100%)
- Data collection via frontend actions
- Shared state synchronization
- Generate deck button logic

## Implementation Plan Reference

**Location**: `/home/sk/template-copilot-kit-py/copilotkit-langraph/copilotkit-docsm/plan/`

**Master Plan**: `00-MASTER-PLAN.md` - Overview and timeline
**Task 1**: `01-SETUP-RUNTIME-SERVICE.md` - Runtime creation
**Task 2**: `02-FIX-CONFIGURATION.md` - Config fixes
**Task 3**: `03-IMPLEMENT-FEATURES.md` - Feature implementation

## Testing

### Quick Test
```bash
cd /home/sk/template-copilot-kit-py/copilotkit-langraph
pnpm run dev
# Navigate to http://localhost:5173
# Send test message in chat
```

### Health Checks
```bash
curl http://localhost:4000/health  # Runtime
curl http://localhost:8000/health  # Agent
```

### Type Check
```bash
pnpm tsc --noEmit
```

## Success Criteria

This skill has succeeded when:
- [ ] Runtime service running on port 4000
- [ ] All 3 services start with `pnpm run dev`
- [ ] Frontend connects to runtime (no CORS)
- [ ] Runtime connects to agent
- [ ] Chat interface works
- [ ] Progress tracking updates
- [ ] Generate button appears at 80%+

## Best Practices Applied

### Skill Design
✅ **Gerund naming**: `copilotkit-pitch-deck` (implementing, troubleshooting)
✅ **Specific description**: Mentions when to use and what it covers
✅ **Progressive disclosure**: Main guide + supporting docs
✅ **Under 500 lines**: SKILL.md is ~400 lines
✅ **Third person**: Description written for skill discovery

### Subagent Design
✅ **Single responsibility**: CopilotKit + LangGraph only
✅ **Clear triggers**: "PROACTIVELY" and "MUST BE USED"
✅ **Limited tools**: Only what's needed (no database tools)
✅ **Detailed prompt**: Specific patterns and workflows
✅ **Model choice**: Sonnet for balance of speed/quality

### Documentation
✅ **Token efficient**: Concise, no repetition
✅ **Actionable**: Clear next steps
✅ **Examples**: Code snippets for common patterns
✅ **Troubleshooting**: Solution-focused debugging

## Related Skills

- `pitch-deck-generator` - Original Supabase-based wizard
- `frontend-builder` - React component generation
- `testing-workflow` - E2E testing for CopilotKit

## Related Subagents

- `ui-developer` - Frontend component work
- `task-orchestrator` - Multi-task coordination
- `task-executor` - Specific task implementation

## Version History

**v1.0** (October 22, 2025)
- Initial skill creation
- SKILL.md with complete implementation guide
- QUICK-START.md for 30-minute setup
- TROUBLESHOOTING.md with debugging solutions
- Connected `copilotkit-architect` subagent
- Following best practices from Anthropic docs

## Maintenance

**Update triggers**:
- CopilotKit version updates
- LangGraph API changes
- New troubleshooting patterns discovered
- User feedback on implementation

**Review schedule**: Monthly or after major library updates

## Support

**Documentation**: See SKILL.md for complete guide
**Quick start**: See QUICK-START.md for fast setup
**Troubleshooting**: See TROUBLESHOOTING.md for debugging
**Implementation plan**: `/copilotkit-docsm/plan/` folder
**Invoke subagent**: Use `copilotkit-architect` for hands-on help
