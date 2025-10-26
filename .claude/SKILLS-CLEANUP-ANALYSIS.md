# Skills & Agents Cleanup Analysis

**Project**: Blaxel Travel Copilot → Pitch Deck Wizard Conversion
**Date**: January 25, 2025

---

## Current Architecture

### What We're Actually Building

```
Frontend (React + CopilotKit) → FastAPI Server → Blaxel Multi-Agent System
                                                    ↓
                                         LangGraph Supervisor Agent
                                                    ↓
                                    ┌──────────────┼──────────────┐
                                    ↓              ↓              ↓
                            Content Agent   Slides Agent   Export Agent (future)
                                    ↓              ↓              ↓
                                OpenAI GPT-4   Template System   python-pptx
```

**Key Technologies**:
- Backend: FastAPI + Blaxel + LangGraph
- Agents: Multi-agent orchestration with supervisor
- Database: Supabase PostgreSQL (direct connection, not Edge Functions)
- Frontend: React + CopilotKit (connects to FastAPI backend)

---

## Skills Analysis

### ✅ KEEP - Relevant to Current Project

#### 1. **supabase-migration** ✅
- **Why**: We're using Supabase PostgreSQL database
- **Status**: Relevant - need database migrations
- **Action**: KEEP

#### 2. **frontend-dev** ✅
- **Why**: React + TypeScript frontend
- **Status**: Relevant - building UI
- **Action**: KEEP, might need minor updates

#### 3. **commit-helper** ✅
- **Why**: Git workflow management
- **Status**: Relevant - general development
- **Action**: KEEP

#### 4. **docs-architect** ✅
- **Why**: Documentation generation
- **Status**: Relevant - general development
- **Action**: KEEP

#### 5. **playwright-e2e** ✅
- **Why**: E2E testing
- **Status**: Relevant - testing our wizard
- **Action**: KEEP, update test scenarios

#### 6. **planning-architect** ✅
- **Why**: Project planning
- **Status**: Relevant - general development
- **Action**: KEEP

---

### ⚠️ UPDATE NEEDED - Wrong Architecture

#### 7. **copilotkit-pitch-deck** ⚠️
- **Current**: Describes Supabase Edge Functions + CopilotKit Cloud API
- **Should Be**: FastAPI + Blaxel + LangGraph
- **Action**: REPLACE with new skill for Blaxel architecture

#### 8. **pitch-deck-generator** ⚠️
- **Current**: Edge Functions workflow
- **Should Be**: Multi-agent LangGraph workflow
- **Action**: REPLACE with Blaxel multi-agent workflow

---

### ❌ REMOVE - Not Relevant

#### 9. **chrome-dev-skill** ❌
- **Why**: Not using Chrome DevTools automation
- **Action**: REMOVE

#### 10. **dev-checker** ❌
- **Why**: Generic - covered by other skills
- **Action**: REMOVE unless specific to project

#### 11. **frontend-builder** ❌
- **Why**: Overlaps with frontend-dev
- **Action**: REMOVE or merge into frontend-dev

#### 12. **production-deploy** ❌
- **Why**: Deployment is handled by Blaxel CLI, not custom deploy scripts
- **Action**: REMOVE or update for Blaxel deployment

#### 13. **prompt-engineer** ❌
- **Why**: Generic skill, not project-specific
- **Action**: REMOVE unless actively used

#### 14. **testing-workflow** ❌
- **Why**: Covered by playwright-e2e
- **Action**: REMOVE or merge

#### 15. **ui-design** ❌
- **Why**: Design system already established
- **Action**: REMOVE unless actively maintained

---

## Agents Analysis

### ✅ KEEP - Relevant

#### 1. **planning-architect.md** ✅
- **Why**: General planning agent
- **Action**: KEEP

#### 2. **task-orchestrator.md** ✅
- **Why**: Task management
- **Action**: KEEP

#### 3. **task-executor.md** ✅
- **Why**: Task execution
- **Action**: KEEP

#### 4. **task-checker.md** ✅
- **Why**: Task validation
- **Action**: KEEP

---

### ⚠️ UPDATE NEEDED

#### 5. **copilotkit-architect.md** ⚠️
- **Current**: Likely describes old architecture
- **Should Be**: Blaxel + LangGraph architecture
- **Action**: UPDATE for new architecture

#### 6. **prompt-engineer.md** ⚠️
- **Current**: Generic prompting
- **Should Be**: Specific to LangGraph agent prompts
- **Action**: UPDATE or REMOVE

---

### ❌ REMOVE - Not Relevant

#### 7. **database-architect.md** ❌
- **Why**: Database schema already exists (Supabase)
- **Action**: REMOVE (schema is fixed)

#### 8. **security-reviewer.md** ❌
- **Why**: Generic security, not project-specific
- **Action**: REMOVE unless actively used

#### 9. **ui-developer.md** ❌
- **Why**: Overlaps with frontend-dev skill
- **Action**: REMOVE

---

## Recommended Actions

### Phase 1: Remove Irrelevant (Now)

```bash
# Remove skills that don't apply
rm -rf /home/sk/template-copilot-kit-py/.claude/skills/chrome-dev-skill
rm -rf /home/sk/template-copilot-kit-py/.claude/skills/dev-checker
rm -rf /home/sk/template-copilot-kit-py/.claude/skills/frontend-builder
rm -rf /home/sk/template-copilot-kit-py/.claude/skills/prompt-engineer
rm -rf /home/sk/template-copilot-kit-py/.claude/skills/testing-workflow
rm -rf /home/sk/template-copilot-kit-py/.claude/skills/ui-design

# Remove agents that don't apply
rm /home/sk/template-copilot-kit-py/.claude/agents/database-architect.md
rm /home/sk/template-copilot-kit-py/.claude/agents/security-reviewer.md
rm /home/sk/template-copilot-kit-py/.claude/agents/ui-developer.md
rm /home/sk/template-copilot-kit-py/.claude/agents/prompt-engineer.md
```

### Phase 2: Create New Blaxel Skills (After MVP works)

**New Skills Needed**:

1. **blaxel-agent-dev** - Working with Blaxel multi-agent system
   - Creating agents
   - LangGraph workflows
   - Supervisor patterns
   - Testing agents locally

2. **langgraph-workflow** - LangGraph state machines
   - Graph creation
   - State management
   - Agent coordination

3. **fastapi-copilotkit** - FastAPI + CopilotKit integration
   - Endpoint setup
   - Message handling
   - Streaming responses

### Phase 3: Update Existing Skills

**Update copilotkit-pitch-deck**:
```markdown
---
name: blaxel-pitch-deck
description: Blaxel multi-agent pitch deck wizard. Use for LangGraph agent development, supervisor coordination, and FastAPI CopilotKit integration.
---

# Blaxel Pitch Deck Wizard

## Architecture

Frontend (React) → FastAPI (/copilotkit) → Blaxel Supervisor Agent
                                                ↓
                                    Content + Slides + Export Agents
```

---

## Summary

### Current State
- **Total Skills**: 16
- **Total Agents**: 9
- **Architecture Mismatch**: 2 skills describe wrong system (Edge Functions)
- **Irrelevant**: 7 skills + 4 agents

### Recommended Final State
- **Keep**: 7 skills + 4 agents
- **Remove**: 7 skills + 4 agents
- **Update**: 2 skills (copilotkit-pitch-deck, pitch-deck-generator)
- **Create New**: 3 skills (blaxel-agent-dev, langgraph-workflow, fastapi-copilotkit)

---

## Action Plan

1. **Immediate** (Now):
   - Remove 7 irrelevant skills
   - Remove 4 irrelevant agents
   - Clean up validation reports

2. **After MVP Works** (Week 2):
   - Replace copilotkit-pitch-deck with blaxel-pitch-deck
   - Replace pitch-deck-generator with blaxel-workflow
   - Create 3 new Blaxel-specific skills

3. **Update Documentation** (Week 3):
   - Update README.md
   - Update VALIDATION-REPORT.md
   - Create new skill validation

---

**Status**: Analysis complete, ready for cleanup
**Risk**: LOW - Only removing unused files
**Benefit**: Cleaner, more focused skill library
