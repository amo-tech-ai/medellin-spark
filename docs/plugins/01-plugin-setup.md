# Plugin Setup Guide - Medellin Spark

## What Are Plugins?

Plugins extend Claude Code with specialized capabilities. Think of them like installing apps on your phone - each plugin adds specific tools, commands, and AI agents to help with different tasks.

**For Medellin Spark**, plugins will help you:
- Build features faster with specialized AI agents
- Automate repetitive tasks (formatting, testing, deployment)
- Maintain code quality and security standards
- Generate documentation and diagrams

---

## Quick Start: Install Your First Plugins

### Step 1: Add the Marketplace

A marketplace is like an "app store" for plugins. Add the claude-code-workflows marketplace:

```bash
# Start Claude Code
claude

# Add the marketplace (run this once)
/plugin marketplace add https://github.com/wshobson/agents
```

**What this does:** Gives you access to 36 plugins with 84 specialized AI agents

### Step 2: Install Core Plugins

Install the three essential plugins for daily development:

```bash
# Install all three at once
/plugin install claude-code-essentials
/plugin install full-stack-development
/plugin install testing-quality-suite
```

**Restart Claude Code** after installation to activate the plugins.

### Step 3: Verify Installation

Check that plugins are working:

```bash
# List all available commands (you should see new ones)
/help

# Check installed plugins
/plugin
```

**You're ready!** Skip to [Using Your Plugins](#using-your-plugins-real-examples) to start using them.

---

## Understanding Plugin Components

Plugins provide four types of components:

### 1. Slash Commands (`/command-name`)

**What they are:** Shortcuts for common tasks

**Example commands from plugins:**
```bash
/code-explain               # Explain complex code
/smart-debug                # Debug issues intelligently
/doc-generate               # Auto-generate documentation
/test-python                # Generate Python tests
/security-sast              # Run security analysis
```

**How they work:**
1. You type the command: `/code-explain`
2. Claude executes a pre-written workflow
3. You get consistent, high-quality results

### 2. AI Agents

**What they are:** Specialized AI experts Claude can invoke automatically

**Example agents:**
- `frontend-developer` - React/TypeScript UI expert
- `backend-architect` - API design specialist
- `security-auditor` - OWASP security expert
- `performance-engineer` - Speed optimization expert
- `debugger` - Bug hunting specialist

**How they work:**
1. You describe a task: "Build user authentication"
2. Claude automatically invokes the right agent(s)
3. Agents collaborate to solve complex problems

**No manual selection needed** - Claude picks the right agent for the job.

### 3. Hooks (Automation)

**What they are:** Automatic actions triggered by events

**Example hooks:**
- **After saving code** → Auto-format the file
- **Before commit** → Run tests and linting
- **After deployment** → Send Slack notification
- **When errors occur** → Log to monitoring system

**How they work:** Set-and-forget automation that runs in the background.

### 4. MCP Servers (External Tools)

**What they are:** Connections to external services and databases

**Examples:**
- Database query tools
- API testing tools
- Cloud service integrations
- Custom internal tools

**For most users:** You won't need to configure these directly.

---

## Using Your Plugins: Real Examples

### Example 1: Understanding Existing Code

**Scenario:** You need to understand how the PitchDeckWizard component works.

```bash
# Option 1: Use the command directly
/code-explain src/pages/PitchDeckWizard.tsx

# Option 2: Just ask naturally
"Explain how the PitchDeckWizard state management works"
```

**What happens:**
- Claude analyzes the component structure
- Explains state flow, props, and logic
- Shows you the key functions and their purposes
- Provides a mental model of how it works

### Example 2: Debugging Production Issues

**Scenario:** Contact form submissions aren't working.

```bash
# Option 1: Use debug command
/smart-debug src/pages/Contact.tsx

# Option 2: Natural language
"The contact form isn't submitting. Debug it."
```

**What happens:**
- `debugger` agent traces the code execution
- Checks form validation, event handlers, API calls
- Identifies the issue (e.g., missing form validation)
- Shows exact line numbers with fixes

### Example 3: Building Complete Features

**Scenario:** Add event registration with payments.

```bash
"Use full-stack-development to build event registration with:
- User selects event and number of tickets
- Stripe payment processing
- Email confirmation
- Admin panel to view registrations"
```

**What happens:**
- `backend-architect` designs the API endpoints
- `frontend-developer` creates React components
- `test-automator` writes comprehensive tests
- `security-auditor` checks for vulnerabilities
- `deployment-engineer` prepares deployment strategy

**Result:** Complete, tested, production-ready feature.

### Example 4: Code Review Before Merge

**Scenario:** Review your changes before pushing.

```bash
# Review specific module
/ai-review src/components/dashboard/

# Or full codebase review
"Use code-quality-review to audit the authentication system"
```

**What happens:**
- `code-reviewer` checks code quality and patterns
- `security-auditor` finds security issues
- `performance-engineer` identifies bottlenecks
- `architect-review` validates design decisions

**Result:** Comprehensive review with prioritized fixes.

---

## Plugin Installation Reference

### Essential Plugins (Install Now)

#### 1. claude-code-essentials
```bash
/plugin install claude-code-essentials
```

**What it does:** Daily development tasks
- Code explanation and documentation
- Debugging and troubleshooting
- PR review and enhancement
- Git workflow automation

**Commands added:**
- `/code-explain` - Understand complex code
- `/smart-debug` - Intelligent debugging
- `/doc-generate` - Auto-generate docs
- `/pr-enhance` - Improve pull requests

**Agents added:**
- code-reviewer, debugger, docs-architect, dx-optimizer, tutorial-engineer

#### 2. full-stack-development
```bash
/plugin install full-stack-development
```

**What it does:** Complete feature implementation
- Backend API design and development
- Frontend UI implementation
- Mobile development coordination
- Testing and security review
- Deployment automation

**Workflows added:**
- `/feature-development` - Build complete features
- `/full-stack-feature` - Coordinated development

**Agents added:**
- backend-architect, frontend-developer, mobile-developer, test-automator, security-auditor, performance-engineer, deployment-engineer

#### 3. testing-quality-suite
```bash
/plugin install testing-quality-suite
```

**What it does:** Test automation and quality assurance
- TDD workflow support
- Automated test generation
- Unit, integration, and E2E tests
- Code coverage reporting

**Commands added:**
- `/tdd-cycle` - TDD workflow
- `/test-python` - Python test generation
- `/test-javascript` - JS test generation
- `/test-integration` - Integration tests
- `/test-security` - Security testing

**Agents added:**
- tdd-orchestrator, test-automator, debugger, code-reviewer

### Pre-Launch Plugins (Install Before Production)

#### 4. code-quality-review
```bash
/plugin install code-quality-review
```

**Purpose:** Multi-agent code review
- Architecture validation
- Security vulnerability scanning
- Performance bottleneck detection
- Test coverage analysis

#### 5. security-scanning
```bash
/plugin install security-scanning
```

**Purpose:** Security auditing
- SAST analysis
- Dependency vulnerability scanning
- OWASP Top 10 compliance
- Container security

#### 6. performance-optimization
```bash
/plugin install performance-optimization
```

**Purpose:** Speed and efficiency
- Application profiling
- Database query optimization
- Caching strategies
- Core Web Vitals improvement

### Post-Launch Plugins (Install When Scaling)

#### 7. incident-diagnostics
```bash
/plugin install incident-diagnostics
```

**Purpose:** Production troubleshooting
- Rapid incident response
- Root cause analysis
- Distributed tracing
- Error pattern detection

#### 8. observability-monitoring
```bash
/plugin install observability-monitoring
```

**Purpose:** System monitoring
- Metrics collection
- Logging infrastructure
- Distributed tracing
- SLO implementation

#### 9. deployment-orchestration
```bash
/plugin install deployment-orchestration
```

**Purpose:** Safe deployments
- Pre-flight checks
- Canary and blue-green deployments
- Automated rollback
- Configuration validation

### Advanced Plugins (Install When Needed)

#### Documentation & Content
```bash
/plugin install documentation-generation
/plugin install seo-content-suite
```

**Use for:**
- API documentation generation
- System architecture diagrams
- SEO-optimized blog content
- Technical writing

#### Database Management
```bash
/plugin install database-operations
```

**Use for:**
- Query optimization
- Schema design
- Zero-downtime migrations
- Performance tuning

#### Specialized Features
```bash
/plugin install payment-processing      # Stripe/PayPal integration
/plugin install ai-agent-development    # AI features (chatbots, recommendations)
```

---

## Plugin Management

### Check Installed Plugins
```bash
/plugin
```
Shows all installed plugins with their status.

### View Available Commands
```bash
/help
```
Lists all commands including those from plugins.

### Update Plugins
```bash
# Update all plugins from a marketplace
/plugin marketplace update claude-code-workflows

# Reinstall a specific plugin
/plugin uninstall plugin-name@marketplace-name
/plugin install plugin-name@marketplace-name
```

### Disable/Enable Plugins
```bash
# Temporarily disable without uninstalling
/plugin disable plugin-name@marketplace-name

# Re-enable a disabled plugin
/plugin enable plugin-name@marketplace-name

# Completely remove
/plugin uninstall plugin-name@marketplace-name
```

---

## Team Setup: Repository-Level Plugins

Configure plugins to auto-install for all team members:

### 1. Create Team Settings File

Create `.claude/settings.json` in your repository:

```json
{
  "extraKnownMarketplaces": {
    "claude-code-workflows": {
      "source": {
        "source": "github",
        "repo": "wshobson/agents"
      }
    }
  },
  "enabledPlugins": [
    "claude-code-essentials@claude-code-workflows",
    "full-stack-development@claude-code-workflows",
    "testing-quality-suite@claude-code-workflows"
  ]
}
```

### 2. Commit to Repository

```bash
git add .claude/settings.json
git commit -m "Configure team plugins"
git push
```

### 3. Team Members Setup

When team members clone and trust the repository:
1. Claude Code automatically installs the marketplace
2. Required plugins install automatically
3. Everyone has the same tooling

**Benefits:**
- Consistent development environment
- New team members get set up instantly
- No manual plugin installation needed

---

## Troubleshooting

### Plugin Not Working After Installation

**Solution:** Restart Claude Code
```bash
# Exit Claude Code (Ctrl+C or Cmd+C)
# Start again
claude
```

### Commands Not Appearing

**Check installation:**
```bash
/plugin
# Verify the plugin shows as "Enabled"

/help
# Check if commands are listed
```

**If missing:**
```bash
# Reinstall the plugin
/plugin uninstall plugin-name@marketplace-name
/plugin install plugin-name@marketplace-name
```

### Marketplace Won't Add

**Verify URL:**
```bash
# Correct format for GitHub
/plugin marketplace add owner/repo

# Correct format for Git URL
/plugin marketplace add https://github.com/owner/repo.git
```

**Check connection:**
- Ensure you have internet access
- Verify the repository exists and is accessible
- For private repos, ensure you have access

### Agent Not Being Invoked

**Be specific in your request:**

❌ **Too vague:**
"Fix the bug"

✅ **Better:**
"Use debugger agent to fix the form submission error in Contact.tsx"

✅ **Best:**
"Debug why the contact form submission fails. The form validates correctly but the API call doesn't trigger."

---

## Best Practices

### 1. Start Small
- Install 1-2 plugins first
- Learn their commands and capabilities
- Add more as you understand them

### 2. Be Specific
- Use exact command names when possible
- Provide context in natural language requests
- Specify file paths and line numbers when debugging

### 3. Verify Results
- Always review agent-generated code
- Test changes before committing
- Run tests after modifications

### 4. Build Habits
- Use `/code-explain` when reviewing PRs
- Run `/smart-debug` before asking for help
- Use `/doc-generate` for new features
- Run security scans before deployment

### 5. Leverage Workflows
- Use plugin workflows for complex tasks
- Let agents collaborate on multi-step features
- Review comprehensive reports from multi-agent analysis

---

## Quick Command Reference

### Code Understanding
```bash
/code-explain <file>         # Explain code structure
/doc-generate <path>         # Generate documentation
```

### Debugging & Testing
```bash
/smart-debug <file>          # Intelligent debugging
/test-python <path>          # Generate Python tests
/test-javascript <path>      # Generate JS tests
```

### Code Quality
```bash
/ai-review <path>            # AI-powered code review
/refactor-clean <path>       # Clean up code
```

### Security
```bash
/security-sast               # Static analysis
/security-dependencies       # Check dependencies
```

### Performance
```bash
/test-performance <file>     # Performance testing
```

### Deployment
```bash
/deploy-precheck             # Pre-deployment checks
/deploy-strategies           # Deployment options
```

---

## Next Steps

1. **Install the 3 core plugins** (if you haven't already)
   ```bash
   /plugin install claude-code-essentials
   /plugin install full-stack-development
   /plugin install testing-quality-suite
   ```

2. **Try a command**
   ```bash
   /code-explain src/pages/PitchDeckWizard.tsx
   ```

3. **Use natural language with agents**
   ```
   "Debug why the contact form isn't submitting"
   ```

4. **Review the plugin-docs guide** for using specialized documentation agents
   - See: `docs/plugins/02-plugin-docs.md`

5. **Explore the plugin adoption plan** for strategic rollout
   - See: `docs/plugins/plugin-plan.md`

---

**Questions or Issues?**

- Check `/help` for available commands
- Run `/plugin` to see plugin status
- Use `claude --debug` to see detailed plugin loading info
- Refer to this guide for troubleshooting steps

**Last Updated:** 2025-10-12
**Project:** Medellin Spark (React + TypeScript + Vite)
