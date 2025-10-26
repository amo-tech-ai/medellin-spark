# Claude Code – Full Capability & Use-Case Guide

**Version:** 2025 Edition  
**Last Updated:** January 2025  
**Model:** Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

---

## Table of Contents

1. [Overview & Architecture](#1-overview--architecture)
2. [Setup & Installation](#2-setup--installation)
3. [Core Workflows](#3-core-workflows)
4. [Advanced Features](#4-advanced-features)
5. [Automation & DevOps](#5-automation--devops)
6. [Context Engineering](#6-context-engineering)
7. [Troubleshooting](#7-troubleshooting)
8. [Best Practices](#8-best-practices)
9. [Real-World Examples](#9-real-world-examples)

---

## 1. Overview & Architecture

### What is Claude Code?

Claude Code is Anthropic's official CLI tool that brings Claude's AI capabilities directly into your development workflow. It enables:
- **Interactive coding sessions** with AI assistance
- **Autonomous code generation** and refactoring
- **Automated workflows** via CI/CD integration
- **Multi-agent orchestration** for complex tasks

### Model Family (2025)

| Model | Context Window | Best For | Pricing (per MTok) |
|-------|---------------|----------|-------------------|
| **Opus 4.1/4** | 200K (1M beta) | Complex reasoning, architecture design | $15 input / $75 output |
| **Sonnet 4.5** | 200K (1M beta) | Daily coding, agents, balanced tasks | $3 input / $15 output |
| **Haiku 3.5/3** | 200K | Fast, simple tasks, high throughput | $0.25 input / $1.25 output |

**Key Model: Sonnet 4.5**
- Advanced state-of-the-art coding performance
- Enhanced agent capabilities for autonomous work
- Improved context awareness and token management
- Better parallel tool usage
- Concise, fact-based communication style

### Architecture Components

**1. Core CLI**
- Interactive REPL mode
- Non-interactive (headless) mode
- Piped input/output support
- Session management & resumption

**2. Model Context Protocol (MCP)**
- Open-source standard for AI-tool integrations
- Connects to external tools, databases, APIs
- Supports HTTP, SSE, and stdio transports
- Enables resource referencing with @ mentions

**3. Sub-Agents**
- Specialized AI assistants for specific tasks
- Operate in separate context windows
- Configurable tool access and permissions
- Project-level, user-level, or CLI-defined

**4. Plugin System**
- Custom collections of commands, agents, hooks
- Installable via marketplaces
- Shareable across teams and projects
- Includes slash commands, MCP servers, hooks

**5. Context Management**
- Memory tool for persistent storage
- Context editing for automatic optimization
- Prompt caching for efficiency
- Checkpointing for session recovery

---

## 2. Setup & Installation

### System Requirements

- **Operating Systems:** macOS 10.15+, Ubuntu 20.04+/Debian 10+, Windows 10+ (WSL/Git Bash)
- **Hardware:** 4GB+ RAM
- **Software:** Node.js 18+
- **Network:** Internet connection required
- **Shells:** Bash, Zsh, Fish

### Installation Methods

**Method 1: Standard NPM Installation**
```bash
npm install -g @anthropic-ai/claude-code
```

> **Note:** Avoid `sudo npm install` to prevent permission issues.

**Method 2: Native Binary (Beta) - Recommended**
```bash
# macOS, Linux, WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```


### Authentication Options

1. **Claude Console** (default)
2. **Claude App** (Pro/Max plan)
3. **Enterprise platforms:**
   - Amazon Bedrock
   - Google Vertex AI

### Verification

After installation, verify setup:
```bash
claude doctor
```

### Updating

```bash
# Manual update
claude update

# Disable auto-updates
export DISABLE_AUTOUPDATER=1
```


---

## 3. Core Workflows

### CLI Commands Reference

| Command | Purpose | Example |
|---------|---------|---------|
| `claude` | Start interactive REPL | `claude` |
| `claude "query"` | Start with initial prompt | `claude "explain this project"` |
| `claude -p "query"` | Query via SDK, then exit | `claude -p "explain function"` |
| `cat file \| claude -p` | Process piped content | `cat logs.txt \| claude -p "analyze"` |
| `claude -c` | Continue most recent conversation | `claude -c` |
| `claude -c -p "query"` | Continue via SDK | `claude -c -p "Check for type errors"` |
| `claude -r "<id>" "query"` | Resume session by ID | `claude -r "abc123" "Finish PR"` |
| `claude update` | Update to latest version | `claude update` |
| `claude mcp` | Configure MCP servers | `claude mcp add --transport http sentry` |

### Common Development Workflows

**1. Understanding New Codebases**
```bash
claude "Explain the overall architecture of this project"
claude "What are the key data models?"
claude "How is authentication handled?"
```

**Strategy:**
- Start with broad overview questions
- Progressively narrow scope
- Use specialized tools/subagents
- Trace execution flows


**2. Explore-Plan-Code-Commit Workflow** (Recommended)

```
Step 1: Read relevant files
Step 2: Have Claude create a detailed plan
Step 3: Implement solution incrementally
Step 4: Verify solution reasonableness
Step 5: Commit and document changes
```

**Real Example:**
```bash
claude
> Read the authentication module files
> Create a plan to add OAuth support
> Implement the OAuth provider
> Write tests for the OAuth flow
> /commit "Add OAuth authentication support"
```

**3. Test-Driven Development**
```bash
claude
> Write tests for the new feature first
> Confirm tests initially fail
> Implement code to pass tests
> Use code-reviewer subagent to verify
```

**4. Visual Iteration Approach**
- Provide screenshots or design mocks
- Have Claude implement and screenshot results
- Iterate 2-3 times for improved output

### Built-in Slash Commands

| Command | Purpose |
|---------|---------|
| `/clear` | Clear conversation history |
| `/help` | Get usage help |
| `/init` | Initialize project |
| `/review` | Request code review |
| `/model <name>` | Select or change AI model |
| `/status` | Show current session status |
| `/compact` | Reduce context size |
| `/logout` | Log out of current session |
| `/permissions` | Manage tool permissions |

| `/memory` | Open memory file in editor |
| `/hooks` | Configure event hooks |
| `/output-style` | Change output style |
| `/agents` | Manage sub-agents |
| `/plugin` | Manage plugins |
| `/rewind` | Access checkpoint rewind menu |

### Creating Custom Slash Commands

**Project Commands** (Team-shared)
- Location: `.claude/commands/`
- Shared via source control

**Personal Commands** (Individual use)
- Location: `~/.claude/commands/`

**Example: Create `/optimize` command**

`.claude/commands/optimize.md`:
```markdown
---
description: Optimize code for performance
argument-hint: [file-path]
allowed-tools: ["Read", "Edit", "Bash"]
model: sonnet
---

Analyze @$1 for performance bottlenecks and optimize:
1. Identify inefficient algorithms
2. Suggest caching strategies
3. Recommend database query optimizations
4. Apply changes and run benchmarks
```

**Using the command:**
```bash
claude
> /optimize src/api/users.ts
```

### Model Selection

**Change model during session:**
```bash
/model sonnet      # Latest Sonnet (recommended)
/model opus        # Complex reasoning
/model haiku       # Fast, simple tasks
/model sonnet[1m]  # 1M token context window
/model opusplan    # Opus planning + Sonnet execution
```


**At startup:**
```bash
claude --model opus
export ANTHROPIC_MODEL=sonnet
```

---

## 4. Advanced Features

### 4.1 Sub-Agents

**Purpose:** Specialized AI assistants for specific tasks, each with:
- Dedicated expertise area
- Separate context window
- Custom system prompt
- Configurable tool access

**Benefits:**
- ✅ Context preservation (no main conversation pollution)
- ✅ Specialized expertise
- ✅ Reusability across projects
- ✅ Flexible permissions

**Configuration Levels:**
1. **Project-level:** `.claude/agents/` (highest priority)
2. **User-level:** `~/.claude/agents/` (lower priority)
3. **CLI-defined:** Temporary/dynamic

**Creating a Sub-Agent Interactively:**
```bash
claude
> /agents
# Select "Create new agent"
# Name: data-scientist
# Description: SQL and data analysis expert
# Tools: Bash, Read, Write
# System prompt: Specialized data analysis agent...
```


**Manual Creation:**

`.claude/agents/code-reviewer.json`:
```json
{
  "name": "code-reviewer",
  "description": "Proactively checks code quality",
  "systemPrompt": "You are a code review expert. Check for:\n- Security vulnerabilities\n- Performance issues\n- Code style violations\n- Best practices",
  "allowedTools": ["Read", "Grep", "Glob"],
  "triggerConditions": "after significant code changes"
}
```

**Invocation Strategies:**

1. **Automatic Delegation:** Claude proactively assigns tasks
   ```bash
   > "Review the authentication changes I just made"
   # Claude automatically uses code-reviewer subagent
   ```

2. **Explicit Invocation:**
   ```bash
   > "Use the data-scientist agent to analyze the CSV"
   ```

**Example Sub-Agents:**
- **Code Reviewer:** Security, performance, style checks
- **Debugger:** Analyzes and resolves technical issues
- **Data Scientist:** SQL queries, statistical analysis
- **Documentation Writer:** Creates/updates docs
- **Test Engineer:** Writes comprehensive test suites


**Best Practices for Sub-Agents:**
- Create focused, single-purpose agents
- Write detailed system prompts
- Limit tool access to necessary only
- Version control project sub-agents
- Chain sub-agents for complex workflows

### 4.2 Model Context Protocol (MCP)

**What is MCP?**
Open-source standard for AI-tool integrations. Allows Claude Code to connect to:
- External tools and services
- Databases (PostgreSQL, MySQL, MongoDB)
- APIs and web services
- Issue trackers (GitHub, Jira, Linear)
- Monitoring tools (Sentry, Datadog)
- Design tools (Figma)

**MCP Server Types:**

1. **HTTP Servers** (Recommended)
   ```bash
   claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
   ```

2. **SSE (Server-Sent Events) Servers**
   ```bash
   claude mcp add --transport sse analytics https://analytics.example.com/sse
   ```

3. **Local stdio Servers**
   ```bash
   claude mcp add --transport stdio airtable \
     --env AIRTABLE_API_KEY=YOUR_KEY \
     -- npx -y airtable-mcp-server
   ```


**MCP Server Scopes:**

| Scope | Location | Purpose |
|-------|----------|---------|
| **Local** | `.claude/mcp.json` | Project-specific, private config |
| **Project** | `.claude/mcp.json` (shared) | Team-shared configuration |
| **User** | `~/.claude/mcp.json` | Cross-project accessibility |

**Authentication:**
```bash
# OAuth 2.0 authentication for remote servers
claude
> /mcp
# Select server to authenticate
```

**Resource Referencing:**
Use @ mentions to reference MCP resources:
```bash
> Implement the feature from @github:issue/123
> Query the data from @postgres:customers_table
```

**MCP Slash Commands:**
MCP servers can provide custom slash commands:
```bash
> /github-create-pr "Add new feature"
> /sentry-analyze-errors --last-24h
```

**Popular MCP Servers:**
- **GitHub:** Code reviews, PR creation, issue tracking
- **PostgreSQL:** Database queries and schema analysis
- **Sentry:** Error monitoring and analysis
- **Figma:** Design integration and asset extraction
- **Asana/Jira:** Project management


### 4.3 Plugin System

**What are Plugins?**
Custom collections of extension points that extend Claude Code functionality:
- Slash commands
- Specialized agents
- Event handling hooks
- MCP servers

**Plugin Structure:**
```
my-plugin/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── commands/
│   └── custom-command.md    # Custom slash commands
├── agents/
│   └── specialist.json      # Specialized sub-agents
├── hooks/
│   └── pre-commit.sh        # Event hooks
└── mcp/
    └── server-config.json   # MCP server definitions
```

**Installing Plugins:**

1. **Add a marketplace:**
   ```bash
   claude
   > /plugin marketplace add anthropics/claude-code
   ```

2. **Install a plugin:**
   ```bash
   > /plugin install feature-dev
   ```

3. **List installed plugins:**
   ```bash
   > /plugin list
   ```

**Creating a Plugin:**

`.claude-plugin/plugin.json`:
```json
{
  "name": "my-workflow-plugin",
  "version": "1.0.0",
  "description": "Custom team workflows",
  "author": "Your Team",
  "components": {
    "commands": true,
    "agents": true,
    "hooks": true
  }
}
```


**Example Plugin Marketplaces:**
- **Anthropic Official:** `anthropics/claude-code`
- **Dan Ávila's:** DevOps, docs, project management
- **Seth Hobson's:** 80+ specialized sub-agents

### 4.4 Hooks

**What are Hooks?**
User-defined shell commands that execute at various points in Claude Code's lifecycle.

**Available Hook Events:**

| Hook Event | When It Fires |
|------------|---------------|
| `PreToolUse` | Before any tool call |
| `PostToolUse` | After any tool call |
| `UserPromptSubmit` | When user submits a prompt |
| `Notification` | On notification events |
| `Stop` | When session stops |
| `SubagentStop` | When sub-agent completes |
| `PreCompact` | Before context compaction |
| `SessionStart` | At session start |
| `SessionEnd` | At session end |

**Use Cases:**
- 🔔 Desktop notifications
- 📝 Automatic code formatting
- 📊 Logging and monitoring
- 🔒 File protection
- ✅ Custom validation


**Configuring Hooks:**
```bash
claude
> /hooks
# Select hook event: PostToolUse
# Add matcher: Bash
# Define command: ./scripts/log-command.sh
```

**Example: Auto-format TypeScript on Edit**

`.claude/settings.json`:
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "command": "jq -r '.tool_input.file_path | select(test(\"\\\\.tsx?$\"))' | xargs -r npx prettier --write"
      }
    ]
  }
}
```

**Example: Log All Bash Commands**
```bash
# Hook command:
jq -r '"\(.tool_input.command) - \(.tool_input.description // "No description")"' >> ~/.claude/bash-log.txt
```

**Example: Block Sensitive File Edits**
```bash
# PreToolUse hook that blocks .env edits
jq -r 'select(.tool_name == "Edit" and (.tool_input.file_path | test(".env$"))) | "ERROR: Cannot edit .env files"' && exit 1
```

**⚠️ Security Warning:**
Always review hook implementations before registering them. Hooks run with your current environment's credentials.


### 4.5 Memory Management

**Memory Hierarchy:**

1. **Enterprise Policy** (Organization-wide)
   - Location: System-level `CLAUDE.md`
   - Purpose: Company coding standards, security policies

2. **Project Memory** (Team-shared)
   - Location: `./CLAUDE.md` or `./.claude/CLAUDE.md`
   - Purpose: Team instructions, project conventions

3. **User Memory** (Personal)
   - Location: `~/.claude/CLAUDE.md`
   - Purpose: Personal preferences across all projects

**Quick Memory Addition:**

**Method 1: "#" Shortcut**
```bash
claude
> # Remember to use TypeScript strict mode for all new files
# Claude prompts to select memory file (project/user)
```

**Method 2: /memory Command**
```bash
> /memory
# Opens memory file in system editor
```

**Example Project Memory:**

`.claude/CLAUDE.md`:
```markdown
# Project Guidelines

## Code Style
- Use ESLint and Prettier
- TypeScript strict mode enabled
- Max line length: 100 characters

## Testing
- Write tests for all new features
- Minimum 80% code coverage
- Use Jest for unit tests


## Commit Messages
- Use conventional commits format
- Reference issue numbers
- Keep first line under 50 characters

## API Conventions
- RESTful endpoints
- Use camelCase for JSON keys
- Include OpenAPI documentation
```

**Memory File Imports:**
```markdown
# Main CLAUDE.md
@./docs/api-guidelines.md
@./docs/security-policy.md
```
> Maximum recursive import depth: 5 hops

### 4.6 Checkpointing

**What is Checkpointing?**
Automatically tracks Claude's file edits during a session, creating a safety net for recovery.

**How It Works:**
- Every user prompt creates a new checkpoint
- Checkpoints persist across sessions
- Automatically cleaned up after 30 days (configurable)

**Rewinding Changes:**
```bash
# Press Esc twice, or use /rewind
> /rewind
```

**Restoration Options:**
1. Conversation only
2. Code only
3. Both code and conversation

**Common Use Cases:**
- ✅ Exploring alternative implementations
- ✅ Recovering from mistakes
- ✅ Iterating while maintaining working states


**Limitations:**
- ❌ Does not track Bash command changes
- ❌ Does not track external file modifications
- ❌ Does not track changes from other sessions

**Best Practice:**
Think of checkpoints as "local undo" and Git as "permanent history".

### 4.7 Output Styles

**What are Output Styles?**
Ways to modify Claude Code's system prompt to adapt behavior beyond software engineering.

**Built-in Styles:**

1. **Default:** Standard software engineering mode
2. **Explanatory:** Provides educational "Insights" during tasks
3. **Learning:** Collaborative mode with `TODO(human)` markers

**Changing Output Style:**
```bash
> /output-style explanatory
> /output-style learning
> /output-style default
```

**Creating Custom Output Style:**
```bash
> /output-style:new
# Name: technical-writer
# Description: Focus on documentation and clarity
# Instructions: Provide detailed explanations with examples...
```

### 4.8 Headless Mode

**What is Headless Mode?**
Run Claude Code programmatically without interactive UI for automation and scripting.

**Basic Usage:**
```bash
claude -p "Stage changes and write commits" \
  --allowedTools "Bash,Read" \
  --permission-mode acceptEdits
```


**Output Formats:**

1. **Text** (default):
   ```bash
   claude -p "Analyze this code"
   ```

2. **JSON** with metadata:
   ```bash
   claude -p "Analyze this code" --output-format json
   ```

3. **Streaming JSON**:
   ```bash
   claude -p "Analyze this code" --output-format streaming-json
   ```

**Use Cases:**
- SRE incident response automation
- Automated security reviews
- Code generation pipelines
- Multi-turn legal/compliance assistants

---

## 5. Automation & DevOps

### 5.1 GitHub Actions Integration

**Setup:**

1. Install Claude GitHub App with permissions:
   - Contents (read/write)
   - Issues (read/write)
   - Pull requests (read/write)

2. Add `ANTHROPIC_API_KEY` to repository secrets

3. Create workflow file:

`.github/workflows/claude-code.yml`:
```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]

jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```


**Triggering Claude:**
```bash
# Comment on an issue:
@claude implement this feature

# Or use workflow dispatch manually
```

**Use Cases:**
- ✅ Implement features from issues
- ✅ Create PRs automatically
- ✅ Review code changes
- ✅ Fix bugs reported in issues
- ✅ Generate daily reports

**Best Practices:**
- Use GitHub Secrets for API keys
- Create `CLAUDE.md` for coding standards
- Configure appropriate timeouts
- Review AI-generated code before merging

### 5.2 GitLab CI/CD Integration

**Setup:**

1. Add masked CI/CD variable for API key
2. Configure `.gitlab-ci.yml`

`.gitlab-ci.yml`:
```yaml
stages:
  - ai

claude:
  stage: ai
  image: node:24-alpine3.21
  script:
    - npm install -g @anthropic-ai/claude-code
    - claude -p "Review and implement changes"
  rules:
    - if: '$CI_MERGE_REQUEST_IID'
      when: manual
```

**Trigger Patterns:**
- Manual pipeline runs
- Merge request events
- Comment-triggered jobs (`@claude`)


**Provider Options:**
- Claude API (SaaS)
- AWS Bedrock (IAM-based)
- Google Vertex AI (GCP-native)

---

## 6. Context Engineering

### 6.1 Understanding Context Windows

**Context Window = Working Memory**

| Model | Standard | Extended (Beta) |
|-------|----------|-----------------|
| Opus 4.1/4 | 200K tokens | 1M tokens |
| Sonnet 4.5/4 | 200K tokens | 1M tokens |
| Haiku 3.5/3 | 200K tokens | - |

**Key Concepts:**
- Context accumulates tokens across conversation turns
- When limit approached, use context management strategies
- Long context requests have premium pricing

### 6.2 Context Management Strategies

**1. Context Editing (Beta)**
- Automatically removes oldest tool results when context exceeds threshold
- Default trigger: 100,000 input tokens
- Keeps 3 most recent tool uses
- Requires beta header: `context-management-2025-06-27`

**2. Memory Tool (Beta)**
- Stores information outside context window
- File-based system for persistent knowledge
- Enables knowledge bases across sessions
- 39% performance improvement when combined with context editing

**3. Prompt Caching**
- Caches prompt prefixes for reuse
- Default cache lifetime: 5 minutes
- Optional 1-hour cache available

- Cache writes: 25% more than base tokens
- Cache hits: 10% of base token price

**Implementation:**
```json
{
  "system": [
    {
      "type": "text",
      "text": "System prompt...",
      "cache_control": {"type": "ephemeral"}
    }
  ]
}
```

**4. Manual Context Management**
```bash
> /compact  # Summarize and reduce context
> /clear    # Clear conversation history
```

### 6.3 Context Engineering Best Practices

**Guiding Principle:** Treat context as a "precious, finite resource"

**System Prompts:**
- Use clear, direct language
- Strike balance between detailed and general
- Organize into distinct sections
- Aim for minimal yet sufficient guidance

**Just-in-Time Context Loading:**
- Use lightweight identifiers
- Load context dynamically as needed
- Enable progressive disclosure
- Combine pre-computed and runtime data

**Long-Horizon Task Techniques:**

1. **Compaction:** Summarize conversation history periodically
2. **Structured Note-Taking:** Maintain external memory
3. **Sub-Agent Architectures:** Use specialized agents for focused tasks

**Tool Design:**
- Self-contained functionality
- Robust error handling
- Clear intended use
- Avoid overlapping toolsets


### 6.4 Extended Thinking

**What is Extended Thinking?**
Enhanced reasoning feature that generates step-by-step thinking blocks before final answers.

**Available in:**
- Claude Opus 4.1/4
- Claude Sonnet 4.x

**Usage:**
```json
{
  "model": "claude-sonnet-4-5-20250929",
  "thinking": {
    "type": "enabled",
    "budget_tokens": 16000
  },
  "messages": [...]
}
```

**Best For:**
- Complex mathematical problems
- Detailed code analysis
- In-depth research tasks
- Multi-step reasoning

**Thinking Budget Recommendations:**
- Start with 16k tokens for complex tasks
- Monitor usage and adjust
- Thinking tokens are subset of max_tokens

**Features:**
- Supports streaming responses
- Compatible with tool use
- Offers "interleaved thinking" between tool calls
- Thinking blocks auto-stripped from future context

---

## 7. Troubleshooting

### Common Issues & Solutions

**Installation Problems:**

**Issue: Windows WSL npm/Node.js detection errors**
```bash
# Solution 1:
npm config set os linux

# Solution 2:
npm install -g @anthropic-ai/claude-code --force --no-os-check

# Solution 3: Use native installer (recommended)
curl -fsSL https://claude.ai/install.sh | bash
```


**Issue: Permission errors on Linux/Mac**
```bash
# Use native installer instead
curl -fsSL https://claude.ai/install.sh | bash
```

**Authentication Issues:**

**Issue: Login problems or expired tokens**
```bash
# Solution:
claude
> /logout
# Close Claude Code, restart, complete authentication

# Or manually remove:
rm ~/.config/claude-code/auth.json
```

**Performance Issues:**

**Issue: High resource usage**
```bash
# Solution 1: Reduce context
> /compact

# Solution 2: Restart between major tasks
> /clear

# Solution 3: Add large directories to .gitignore
echo "node_modules/" >> .gitignore
echo "dist/" >> .gitignore
```

**Search & Discovery Issues:**

**Issue: Slow search performance**
```bash
# Install ripgrep system-wide
sudo apt install ripgrep  # Ubuntu/Debian
brew install ripgrep      # macOS

# Set environment variable
export USE_BUILTIN_RIPGREP=0
```

**Debugging Commands:**

```bash
# Check installation health
claude doctor

# Report bugs directly
claude
> /bug
```


---

## 8. Best Practices

### 8.1 Project Setup Best Practices

**Create CLAUDE.md files:**
```markdown
# .claude/CLAUDE.md

## Development Environment
- Node.js 18+
- Use pnpm for package management
- Run `pnpm install` before starting

## Code Style
- Use ESLint + Prettier
- TypeScript strict mode
- Max line length: 100 chars
- Use functional components in React

## Testing
- Jest for unit tests
- Playwright for E2E tests
- Minimum 80% coverage
- Run `pnpm test` before commits

## Bash Commands
- Build: `pnpm build`
- Dev server: `pnpm dev`
- Lint: `pnpm lint:fix`
- Test: `pnpm test`

## Repository Etiquette
- Create feature branches from `main`
- Use conventional commits
- Request review before merging
- Squash commits on merge
```

### 8.2 Workflow Best Practices

**1. Explore-Plan-Code-Commit Pattern**
```bash
# Phase 1: Explore
claude "Analyze the authentication system"
```

# Phase 2: Plan
> "Create a detailed plan to add OAuth support"

# Phase 3: Code (incrementally)
> "Implement step 1 of the plan"
> "Now implement step 2"

# Phase 4: Verify
> "Run the tests and verify functionality"

# Phase 5: Commit
> "Create a commit with descriptive message"
```

**2. Use Multiple Claude Instances for Parallel Tasks**
```bash
# Terminal 1: Feature development
cd ~/project && claude

# Terminal 2: Bug fixes (use git worktree)
git worktree add ../project-bugfix bugfix-branch
cd ../project-bugfix && claude

# Terminal 3: Documentation
cd ~/project && claude --model opus "Update all README files"
```

**3. Course Correct Early and Often**
```bash
# Don't wait if Claude is going wrong direction
> "Stop - let's reconsider this approach"
> "Actually, let's use a different strategy"
```

**4. Use Visual References**
```bash
# Provide screenshots or design mocks
> "Implement this design @screenshot.png"
> "Make the UI match this mockup"
# Claude will implement and provide screenshot
# Iterate 2-3 times for refinement
```

### 8.3 Tool Permission Management

**Configure Permissions:**
```bash
claude
> /permissions
```


**Settings Configuration:**

`.claude/settings.json`:
```json
{
  "permissions": {
    "allow": [
      "Bash(npm run test:*)",
      "Bash(git status)",
      "Bash(git diff)",
      "Read(src/**)",
      "Edit(src/**)"
    ],
    "deny": [
      "Read(.env)",
      "Edit(.env)",
      "Bash(rm -rf *)"
    ]
  }
}
```

**Permission Modes:**
- `allow`: Explicitly allow specific patterns
- `deny`: Block dangerous operations
- `ask`: Prompt for confirmation

### 8.4 Documentation & Reports Best Practices

**Token Efficiency:**
- ❌ **Never repeat information** in reports/documentation
- ❌ **Avoid saying the same thing multiple ways**
- ❌ **Don't duplicate status updates** across sections
- ✅ **State each point once** and move on
- ✅ **Use tables/lists** instead of paragraphs when possible
- ✅ **Be concise** - every token counts

**Example - Bad (Repetitive):**
```markdown
## Status
System is production ready.

## Conclusion
All work complete, system production ready.

## Summary
The system has been tested and is now production ready.
```

**Example - Good (Concise):**
```markdown
## Status
✅ Production ready - All tests passing (5/5)
```

### 8.5 Settings Hierarchy

**Precedence (Highest to Lowest):**
1. Enterprise managed policies
2. Command line arguments
3. Local project settings (`.claude/settings.local.json`)
4. Shared project settings (`.claude/settings.json`)
5. User settings (`~/.claude/settings.json`)

**Example User Settings:**

`~/.claude/settings.json`:
```json
{
  "model": "sonnet",
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1"
  },
  "enabledPlugins": [
    "feature-dev",
    "code-reviewer"
  ]
}
```


### 8.6 Context Management Best Practices

**DO:**
- ✅ Use `/compact` when context grows large
- ✅ Use `/clear` to start fresh on new tasks
- ✅ Leverage memory files for persistent knowledge
- ✅ Use sub-agents for isolated tasks
- ✅ Enable prompt caching for repeated patterns
- ✅ **Write concise reports** - avoid repetition (see 8.4)

**DON'T:**
- ❌ Keep all conversation history indefinitely
- ❌ Process entire large codebases at once
- ❌ Ignore context window warnings
- ❌ Mix unrelated tasks in one session
- ❌ **Repeat the same information** in documentation

---

## 9. Real-World Examples

### 9.1 Building a Full-Stack Feature

**Scenario:** Add a new "comments" feature to a web app

```bash
claude

# Step 1: Explore existing architecture
> "Analyze the current database schema and API structure"

# Step 2: Plan the implementation
> "Create a detailed plan to add a comments feature:
   - Database schema changes
   - API endpoints
   - Frontend components
   - Tests"

# Step 3: Implement database migration
> "Implement the database migration from the plan"
> "Run the migration and verify"

# Step 4: Create API endpoints
> "Implement the API endpoints for comments CRUD"
> "Add input validation and error handling"

# Step 5: Build frontend components
> "Create the Comment component"

> "Add the CommentList to display comments"

# Step 6: Write comprehensive tests
> "Write unit tests for the API endpoints"
> "Write E2E tests for the comment feature"

# Step 7: Review and commit
> "Review all changes for security and performance"
> "/commit 'Add comments feature with full CRUD support'"
```

### 9.2 Database Migration with Sub-Agents

**Scenario:** Complex multi-database migration

```bash
claude

# Use specialized database-architect sub-agent
> "Use the database-architect agent to:
   1. Analyze current PostgreSQL schema
   2. Design migration strategy for new tables
   3. Create rollback plan"

# Switch to database-optimizer for performance
> "Use database-optimizer to:
   1. Review the migration queries
   2. Add appropriate indexes
   3. Optimize for minimal downtime"

# Execute with monitoring
> "Run the migration with progress monitoring"
```

### 9.3 Automated Code Review in CI/CD

**Scenario:** GitHub Actions code review on every PR

`.github/workflows/code-review.yml`:
```yaml
name: AI Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          claude_args: |
            -p "Review this PR for:

            - Security vulnerabilities
            - Performance issues
            - Code style violations
            - Best practices
            Post findings as PR comment"
```

### 9.4 Multi-Agent Workflow for Complex Refactoring

**Scenario:** Refactor a large legacy codebase

```bash
claude

# Agent 1: Architecture review
> "Use architect-review agent to analyze the current architecture
   and propose refactoring strategy"

# Agent 2: Code exploration
> "Use code-explorer to map all dependencies and identify
   coupling points"

# Agent 3: Test coverage analysis
> "Use test-automator to identify untested code paths"

# Agent 4: Incremental refactoring
> "Use legacy-modernizer to refactor module by module:
   1. Extract interfaces
   2. Add tests
   3. Modernize code
   4. Verify functionality"

# Agent 5: Final review
> "Use code-reviewer to verify all changes maintain
   backward compatibility"
```

### 9.5 Research and Documentation Generation

**Scenario:** Generate comprehensive API documentation

```bash
claude --model opus

> "Analyze the entire API codebase and create:
   1. OpenAPI 3.1 specification
   2. API reference documentation
   3. Integration guide with examples
   4. Common use case tutorials
   5. Error handling guide"


# Save to docs/
> "Save the OpenAPI spec to docs/api-spec.yaml"
> "Save the reference docs to docs/api-reference.md"
```

### 9.6 Supabase Integration with MCP

**Scenario:** Build features using Supabase MCP server

```bash
# Add Supabase MCP server
claude mcp add --transport stdio supabase \
  --env SUPABASE_URL=https://your-project.supabase.co \
  --env SUPABASE_SERVICE_KEY=your-key \
  -- npx -y @anthropic-ai/supabase-mcp-server

# Use Supabase resources
claude
> "List all tables in the database using @supabase"
> "Create a new migration to add user profiles table"
> "Query the events table and show recent records"
> "Execute SQL to create RLS policies"
```

### 9.7 Data Analysis with Local Files

**Scenario:** Analyze a CSV file with statistics

```bash
# Process local file (Claude Code can access files)
claude -p "Analyze sales-data.csv and provide:
1. Summary statistics
2. Top 10 products by revenue
3. Monthly trends
4. Visualizations (save as PNG)
5. Recommendations"

# Or interactively:
claude
> "Read and analyze @sales-data.csv"
> "Create a pivot table by region and product category"
> "Generate a matplotlib chart showing trends"
> "Save the analysis report to reports/sales-analysis.md"
```

### 9.8 Security Audit Automation

**Scenario:** Regular security scanning


```bash
# Create custom slash command for security audit
# .claude/commands/security-audit.md
---
description: Run comprehensive security audit
allowed-tools: ["Read", "Grep", "Bash"]
model: opus
---

Perform a comprehensive security audit:
1. Scan for hardcoded secrets and API keys
2. Check for SQL injection vulnerabilities
3. Review authentication and authorization
4. Identify outdated dependencies
5. Check for XSS vulnerabilities
6. Review CORS and CSP configurations
7. Generate security report

# Usage:
claude
> /security-audit
```

### 9.9 PRD to Implementation Pipeline

**Scenario:** Convert Product Requirements Document to working code

```bash
# Start with PRD
claude --model opusplan

> "Read @product-requirements.md and create:
   1. Technical architecture document
   2. Database schema design
   3. API endpoint specifications
   4. Component hierarchy
   5. Implementation task breakdown"

# Then implement incrementally
> "Start implementing the core database models"
> "Create the authentication service"
> "Build the main UI components"
> "Add integration tests"
> "Create deployment configuration"
```

---

## 10. Quick Reference Cheat Sheet

### Essential Commands

```bash
# Start Claude Code
claude

# Continue last conversation
claude -c

# Non-interactive query
claude -p "query"

# Resume specific session
claude -r "session-id"

# Update Claude Code
claude update

# Check installation
claude doctor
```

### Key Slash Commands

```bash
/help          # Show available commands
/clear         # Clear conversation
/compact       # Reduce context size
/model opus    # Switch to Opus model
/memory        # Open memory file
/agents        # Manage sub-agents
/plugin        # Manage plugins
/hooks         # Configure hooks
/permissions   # Manage tool access
/rewind        # Access checkpoints
/status        # Show session info
/logout        # Log out
```

### Model Selection Quick Reference

```bash
sonnet         # Best for daily coding
opus           # Complex reasoning
haiku          # Fast & efficient
sonnet[1m]     # 1M token context
opusplan       # Opus plan + Sonnet code
```

### MCP Quick Setup

```bash
# Add HTTP MCP server
claude mcp add --transport http name url

# Add stdio MCP server
claude mcp add --transport stdio name --env KEY=value -- command


# List MCP servers
claude mcp list

# Authenticate with MCP
> /mcp
```

### File Organization

```
project/
├── .claude/
│   ├── CLAUDE.md              # Project memory
│   ├── settings.json          # Shared settings
│   ├── settings.local.json    # Personal settings
│   ├── commands/              # Custom slash commands
│   ├── agents/                # Project sub-agents
│   └── mcp.json              # MCP configuration
├── .github/workflows/
│   └── claude-code.yml       # GitHub Actions
└── .gitlab-ci.yml            # GitLab CI/CD
```

---

## 11. Best Practices Optimization Checklist

### ✅ Project Initialization

- [ ] Create `.claude/CLAUDE.md` with project guidelines
- [ ] Define coding standards and conventions
- [ ] Document bash commands for common tasks
- [ ] Set up appropriate `.gitignore` rules
- [ ] Configure `.claude/settings.json` permissions

### ✅ Development Workflow

- [ ] Use Explore-Plan-Code-Commit pattern
- [ ] Start broad, progressively narrow scope
- [ ] Course correct early when needed
- [ ] Use `/compact` when context grows
- [ ] Clear context between unrelated tasks

### ✅ Sub-Agents & Specialization

- [ ] Create focused, single-purpose sub-agents
- [ ] Write detailed system prompts
- [ ] Limit tool access to necessary only
- [ ] Version control project sub-agents
- [ ] Test sub-agent performance


### ✅ MCP & Integrations

- [ ] Review MCP servers before adding (trust verification)
- [ ] Use environment variables for secrets
- [ ] Set appropriate output token limits
- [ ] Test MCP integrations thoroughly
- [ ] Document MCP setup for team

### ✅ Context Management

- [ ] Enable prompt caching for repeated patterns
- [ ] Use memory files for persistent knowledge
- [ ] Structure memory hierarchically (enterprise > project > user)
- [ ] Implement just-in-time context loading
- [ ] Monitor context window usage

### ✅ Security

- [ ] Review hook implementations before registering
- [ ] Use permission controls in settings.json
- [ ] Protect sensitive files (.env, secrets)
- [ ] Review AI-generated code before merging
- [ ] Use GitHub Secrets for API keys in CI/CD

### ✅ CI/CD Integration

- [ ] Create CLAUDE.md for coding standards
- [ ] Configure appropriate timeouts
- [ ] Use least-privilege service accounts
- [ ] Set up proper authentication (AWS/GCP/Claude API)
- [ ] Review AI-generated changes like any other code

### ✅ Performance Optimization

- [ ] Use appropriate model for task (Sonnet for daily work)
- [ ] Leverage sub-agents for parallel work
- [ ] Use headless mode for automation
- [ ] Monitor token usage and costs
- [ ] Implement caching strategies

---

## 12. Additional Resources

### Official Documentation


- Claude Code Setup: https://docs.claude.com/en/docs/claude-code/setup
- Common Workflows: https://docs.claude.com/en/docs/claude-code/common-workflows
- Sub-Agents Guide: https://docs.claude.com/en/docs/claude-code/sub-agents
- Plugins System: https://docs.claude.com/en/docs/claude-code/plugins
- MCP Documentation: https://docs.claude.com/en/docs/claude-code/mcp
- GitHub Actions: https://docs.claude.com/en/docs/claude-code/github-actions
- GitLab CI/CD: https://docs.claude.com/en/docs/claude-code/gitlab-ci-cd
- Troubleshooting: https://docs.claude.com/en/docs/claude-code/troubleshooting

### Engineering Blogs

- Best Practices: https://www.anthropic.com/engineering/claude-code-best-practices
- Context Management: https://www.anthropic.com/news/context-management
- Effective Context Engineering: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Plugin Announcement: https://www.anthropic.com/news/claude-code-plugins

### Model Documentation

- Sonnet 4.5 Features: https://docs.claude.com/en/docs/about-claude/models/whats-new-sonnet-4-5
- Context Windows: https://docs.claude.com/en/docs/build-with-claude/context-windows
- Extended Thinking: https://docs.claude.com/en/docs/build-with-claude/extended-thinking
- Prompt Caching: https://docs.claude.com/en/docs/build-with-claude/prompt-caching

### Tool Integration

- Tool Use Implementation: https://docs.claude.com/en/docs/agents-and-tools/tool-use/implement-tool-use
- Code Execution Tool: https://docs.claude.com/en/docs/agents-and-tools/tool-use/code-execution-tool

### Community Resources

- GitHub Issues: https://github.com/anthropics/claude-code/issues
- Plugin Marketplaces:
  - Anthropic Official: anthropics/claude-code
  - Community plugins and examples


---

## 13. Conclusion

Claude Code represents a paradigm shift in software development, bringing powerful AI capabilities directly into your development workflow. This guide has covered:

**Core Capabilities:**
- Interactive and headless modes for versatile usage
- Multiple model options optimized for different tasks
- Comprehensive CLI with powerful commands

**Advanced Features:**
- Sub-agents for specialized, focused tasks
- Plugin ecosystem for extensibility
- MCP integration for external tool connectivity
- Sophisticated memory and context management
- Hooks for workflow customization

**Production Integration:**
- CI/CD support via GitHub Actions and GitLab
- Automated code review and feature implementation
- Security and permission controls
- Enterprise-grade configuration management

**Best Practices:**
- Explore-Plan-Code-Commit workflow
- Context engineering for optimal performance
- Multi-agent orchestration for complex tasks
- Proper security and permission management

### Getting Started Recommendations

**Day 1: Installation & Setup**
1. Install Claude Code using native installer
2. Run `claude doctor` to verify
3. Create first `CLAUDE.md` in your project
4. Try basic commands and workflows

**Week 1: Core Workflows**
1. Master the Explore-Plan-Code-Commit pattern
2. Create custom slash commands for common tasks
3. Configure permissions and settings
4. Experiment with different models


**Month 1: Advanced Features**
1. Create specialized sub-agents for your workflow
2. Install and configure MCP servers (GitHub, databases, etc.)
3. Set up hooks for automation
4. Integrate with CI/CD pipelines

**Month 2+: Optimization & Scale**
1. Implement context management strategies
2. Build custom plugins for team workflows
3. Optimize performance with caching and memory
4. Share knowledge and best practices with team

### Final Tips

**Maximize Productivity:**
- Be specific in your instructions
- Provide visual references when possible
- Use appropriate models for tasks (Sonnet for daily work)
- Course correct early if Claude goes wrong direction
- Leverage parallel work with multiple instances

**Avoid Common Pitfalls:**
- Don't ignore context window warnings
- Don't mix unrelated tasks in one session
- Don't skip the planning phase for complex work
- Don't forget to review AI-generated code
- Don't hardcode secrets in CLAUDE.md files

**Keep Learning:**
- Experiment with different workflows
- Try new plugins and MCP servers
- Share insights with the community
- Stay updated with new releases
- Contribute to the ecosystem

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Maintained by:** Your Development Team  

For questions, issues, or contributions:
- GitHub: https://github.com/anthropics/claude-code/issues
- Documentation: https://docs.claude.com/en/docs/claude-code

---

*Happy coding with Claude!* 🚀
