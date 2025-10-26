# Context Management & Memory Tool Guide

**Manage long-running Claude sessions with persistent memory and automatic context optimization**

---

## Table of Contents

1. [Overview](#overview)
2. [Memory Tool - Core Features](#memory-tool---core-features)
3. [Context Editing](#context-editing)
4. [Setup Instructions](#setup-instructions)
5. [When to Use](#when-to-use)
6. [Code Examples](#code-examples)
7. [Security Best Practices](#security-best-practices)
8. [Real-World Examples](#real-world-examples)
9. [Troubleshooting](#troubleshooting)

---

## Overview

### The Problem

Long-running Claude sessions face two challenges:
- **Context window fills up** - Eventually you hit the token limit
- **Important information gets lost** - When context clears, Claude forgets everything

### The Solution

**Two complementary features:**

| Feature | Purpose | How It Helps |
|---------|---------|--------------|
| **Memory Tool** | Long-term storage across sessions | Claude "remembers" key information in files |
| **Context Editing** | Automatic context cleanup | Claude summarizes old content before clearing it |

**Together**: Claude can work on long projects by saving progress to memory before clearing old conversation history.

---

## Memory Tool - Core Features

### What It Is

**Memory Tool** = Claude's long-term notebook

- Stores information in `/memories` folder
- Data persists across sessions
- You (developer) control where files are stored
- Claude can create, read, update, and delete memory files

### How It Works

```
Session 1:
User: "Remember that we're using TypeScript strict mode"
Claude: Creates /memories/project_preferences.md
        "- TypeScript: strict mode enabled"

[Session ends, context clears]

Session 2:
User: "What TypeScript settings are we using?"
Claude: Reads /memories/project_preferences.md
        "We're using TypeScript strict mode"
```

### Core Operations

**4 main operations:**

1. **create** - Create new memory file
   ```json
   {
     "operation": "create",
     "path": "/memories/project_notes.md",
     "content": "# Project Notes\n\n- Using React 18..."
   }
   ```

2. **view** - Read existing memory
   ```json
   {
     "operation": "view",
     "path": "/memories/project_notes.md"
   }
   ```

3. **str_replace** - Update specific content
   ```json
   {
     "operation": "str_replace",
     "path": "/memories/project_notes.md",
     "old_str": "React 17",
     "new_str": "React 18"
   }
   ```

4. **delete** - Remove memory file
   ```json
   {
     "operation": "delete",
     "path": "/memories/old_notes.md"
   }
   ```

---

## Context Editing

### What It Is

**Context Editing** = Automatic context window management

When context gets full, Claude can:
1. **Summarize** old conversation parts
2. **Save** important info to memory files
3. **Clear** old content from context
4. **Continue** working with clean context

### How It Works

```
Context at 90% full:
- Messages 1-50: Feature planning (completed)
- Messages 51-100: Current implementation (active)

Claude automatically:
1. Summarizes messages 1-50
2. Saves summary to /memories/feature_plan.md
3. Removes messages 1-50 from context
4. Continues with messages 51-100 + summary

Result: Context drops to 50%, important info preserved
```

### Key Benefits

- **Never lose progress** - Important decisions saved before clearing
- **Work longer** - Sessions can continue indefinitely
- **Stay focused** - Only relevant context remains
- **Automatic** - Claude manages it for you

---

## Setup Instructions

### Prerequisites

- Claude API access
- Beta feature access
- Client-side storage for `/memories` folder

### Step 1: Enable Beta Header

Add this header to ALL API requests:

```python
headers = {
    "anthropic-version": "2023-06-01",
    "anthropic-beta": "context-management-2025-06-27"
}
```

### Step 2: Add Memory Tool

Include in your tools array:

```python
tools = [
    {
        "type": "memory_20250818",
        "name": "memory"
    }
]
```

### Step 3: Setup Storage Directory

Create `/memories` folder in your project:

```bash
mkdir -p /memories
chmod 700 /memories  # Restrict access
```

### Step 4: Implement Tool Handler

**Python Example:**

```python
import anthropic
import os
import json

client = anthropic.Anthropic(api_key="your-api-key")

MEMORIES_DIR = "./memories"
os.makedirs(MEMORIES_DIR, exist_ok=True)

def handle_memory_tool(operation, path, **kwargs):
    """Handle Memory Tool operations"""

    # Security: Only allow /memories paths
    if not path.startswith("/memories/"):
        return {"error": "Invalid path - must start with /memories/"}

    # Convert to local path
    local_path = path.replace("/memories/", f"{MEMORIES_DIR}/")

    # Prevent path traversal
    if ".." in path:
        return {"error": "Path traversal not allowed"}

    try:
        if operation == "create":
            content = kwargs.get("content", "")
            os.makedirs(os.path.dirname(local_path), exist_ok=True)
            with open(local_path, "w") as f:
                f.write(content)
            return {"success": True, "path": path}

        elif operation == "view":
            if not os.path.exists(local_path):
                return {"error": f"File not found: {path}"}
            with open(local_path, "r") as f:
                content = f.read()
            return {"content": content}

        elif operation == "str_replace":
            if not os.path.exists(local_path):
                return {"error": f"File not found: {path}"}
            with open(local_path, "r") as f:
                content = f.read()
            old_str = kwargs.get("old_str", "")
            new_str = kwargs.get("new_str", "")
            updated_content = content.replace(old_str, new_str)
            with open(local_path, "w") as f:
                f.write(updated_content)
            return {"success": True}

        elif operation == "delete":
            if os.path.exists(local_path):
                os.remove(local_path)
            return {"success": True}

    except Exception as e:
        return {"error": str(e)}

# Usage in API call
messages = [{"role": "user", "content": "Remember we're using React 18"}]

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=4096,
    tools=[{"type": "memory_20250818", "name": "memory"}],
    messages=messages,
    extra_headers={
        "anthropic-beta": "context-management-2025-06-27"
    }
)

# Handle tool use
for block in response.content:
    if block.type == "tool_use" and block.name == "memory":
        tool_input = block.input
        result = handle_memory_tool(**tool_input)
        # Send result back to Claude...
```

**TypeScript Example:**

```typescript
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs/promises";
import path from "path";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MEMORIES_DIR = "./memories";

async function handleMemoryTool(
  operation: string,
  memoryPath: string,
  options: any = {}
): Promise<any> {
  // Security: Only allow /memories paths
  if (!memoryPath.startsWith("/memories/")) {
    return { error: "Invalid path - must start with /memories/" };
  }

  // Prevent path traversal
  if (memoryPath.includes("..")) {
    return { error: "Path traversal not allowed" };
  }

  // Convert to local path
  const localPath = memoryPath.replace("/memories/", `${MEMORIES_DIR}/`);

  try {
    switch (operation) {
      case "create":
        await fs.mkdir(path.dirname(localPath), { recursive: true });
        await fs.writeFile(localPath, options.content || "");
        return { success: true, path: memoryPath };

      case "view":
        const content = await fs.readFile(localPath, "utf-8");
        return { content };

      case "str_replace":
        let fileContent = await fs.readFile(localPath, "utf-8");
        fileContent = fileContent.replace(options.old_str, options.new_str);
        await fs.writeFile(localPath, fileContent);
        return { success: true };

      case "delete":
        await fs.unlink(localPath);
        return { success: true };

      default:
        return { error: "Unknown operation" };
    }
  } catch (error) {
    return { error: (error as Error).message };
  }
}

// Usage
const response = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 4096,
  tools: [{ type: "memory_20250818", name: "memory" }],
  messages: [{ role: "user", content: "Remember we use TypeScript strict mode" }],
  extra_headers: {
    "anthropic-beta": "context-management-2025-06-27",
  },
});

// Handle tool use
for (const block of response.content) {
  if (block.type === "tool_use" && block.name === "memory") {
    const result = await handleMemoryTool(
      block.input.operation,
      block.input.path,
      block.input
    );
    // Send result back to Claude...
  }
}
```

---

## When to Use

### Use Memory Tool When:

| Scenario | Example |
|----------|---------|
| **Multi-session projects** | Building a feature over several days |
| **Tracking progress** | Code review checklist, testing status |
| **Remembering preferences** | "Always use TypeScript strict mode" |
| **Storing reference data** | API endpoints, database schemas |
| **Long-running agents** | Event planning bot tracking tasks |

### Use Context Editing When:

| Scenario | Example |
|----------|---------|
| **Long conversations** | 100+ message debugging session |
| **Context approaching limit** | 180K tokens used of 200K |
| **Repetitive workflows** | Multiple feature implementations |
| **Automated agents** | Long-running background tasks |

### Use Both Together When:

| Scenario | How They Work Together |
|----------|------------------------|
| **Multi-day coding project** | Context editing clears old code discussions � Memory saves architecture decisions |
| **Research synthesis** | Context editing archives old sources � Memory keeps running summary |
| **Event planning** | Context editing removes completed tasks � Memory tracks overall progress |

---

## Code Examples

### Example 1: Simple Memory Storage

```python
# Claude saves project info to memory
message = "Remember: We're building a React app with TypeScript, using Vite as bundler"

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=4096,
    tools=[{"type": "memory_20250818", "name": "memory"}],
    messages=[{"role": "user", "content": message}],
    extra_headers={"anthropic-beta": "context-management-2025-06-27"}
)

# Claude will use memory tool to create:
# /memories/project_setup.md with tech stack info
```

### Example 2: Retrieving Memory

```python
# In a new session, Claude can recall
message = "What tech stack are we using?"

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=4096,
    tools=[{"type": "memory_20250818", "name": "memory"}],
    messages=[{"role": "user", "content": message}],
    extra_headers={"anthropic-beta": "context-management-2025-06-27"}
)

# Claude will:
# 1. Use memory tool to view /memories/project_setup.md
# 2. Respond: "React + TypeScript + Vite"
```

### Example 3: Context Editing + Memory

```python
# Long session reaching context limit
messages = [
    # ... 100+ messages of conversation
]

# Tell Claude to clean up context
messages.append({
    "role": "user",
    "content": "We've covered a lot. Please summarize our progress and clean up the context."
})

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens="4096",
    tools=[{"type": "memory_20250818", "name": "memory"}],
    messages=messages,
    extra_headers={"anthropic-beta": "context-management-2025-06-27"}
)

# Claude will:
# 1. Summarize old messages
# 2. Save summary to /memories/session_summary.md
# 3. You can then clear old messages from array
# 4. Continue with clean context + memory
```

### Example 4: EventOS Use Case

```python
# Event planning agent tracking tasks
message = """
Update event progress:
- Venue: Confirmed (Ruta N)
- Sponsors: 3/5 confirmed
- Speakers: 2/5 confirmed
- Marketing: Landing page live
"""

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=4096,
    tools=[{"type": "memory_20250818", "name": "memory"}],
    messages=[{"role": "user", "content": message}],
    extra_headers={"anthropic-beta": "context-management-2025-06-27"}
)

# Claude creates: /memories/event_progress.md
# Next session can pick up where you left off
```

---

## Security Best Practices

### 3 Simple Security Rules

**Rule 1: Only Use `/memories/` Paths**

```python
# ✅ GOOD
path = "/memories/project_notes.md"

# ❌ BAD
path = "/notes.md"                    # Wrong prefix
path = "memories/notes.md"            # No leading slash
path = "/memories/../secrets.txt"    # Path traversal
```

**Quick Check Function:**
```python
def is_safe_memory_path(path):
    """Simple security check"""
    # Must start with /memories/
    if not path.startswith("/memories/"):
        return False
    # No path traversal
    if ".." in path:
        return False
    return True
```

**Rule 2: Lock Down the Folder**

```bash
# Set strict permissions (owner read/write only)
chmod 700 /memories
```

**Rule 3: No Secrets, Ever**

```python
# ❌ NEVER store secrets
bad_examples = [
    "API_KEY=sk-1234",
    "password: mySecretPass",
    "credit_card: 1234-5678-9012-3456"
]

# ✅ SAFE to store
good_examples = [
    "Project uses React + TypeScript",
    "API endpoint: https://api.example.com/v1/users",
    "Task: Implement user authentication (Status: In Progress)"
]
```

**That's it - just 3 simple rules!**

### Quick Security Checklist

```
Before using Memory Tool:
✅ Paths start with /memories/
✅ Folder has chmod 700 permissions
✅ Never storing passwords/keys/secrets
✅ Tested path validation function
```

---

## Real-World Examples

### Example 1: Multi-Day Coding Project

**Scenario**: Building authentication system over 3 days

**Day 1** (Session 1):
```
User: "Let's build JWT authentication"
Claude: [Discusses approach, creates files]
        Saves to /memories/auth_architecture.md:
        - Using JWT tokens
        - Refresh token strategy: 7-day expiry
        - Token stored in httpOnly cookies
```

**Day 2** (Session 2):
```
User: "Continue with auth implementation"
Claude: Reads /memories/auth_architecture.md
        "I see we're using JWT with 7-day refresh tokens..."
        [Continues from where you left off]
```

**Day 3** (Session 3):
```
User: "What's our token expiry strategy?"
Claude: Reads /memories/auth_architecture.md
        "We're using 7-day expiry for refresh tokens"
```

---

### Example 2: EventOS - Event Planning Agent

**Scenario**: Planning TechCon 2025 over several weeks

**Week 1**:
```
User: "Track TechCon 2025 planning"
Claude: Creates /memories/techcon2025.md

Progress:
- Venue: Searching (target: Ruta N)
- Budget: $50,000 approved
- Date: June 15, 2025
- Expected attendance: 500
```

**Week 2** (Context cleared):
```
User: "Venue confirmed: Ruta N for $5,000"
Claude: Reads /memories/techcon2025.md
        Updates: Venue:  Confirmed (Ruta N, $5,000)
        Remaining budget: $45,000
```

**Week 3** (Context cleared again):
```
User: "What's our budget status?"
Claude: Reads /memories/techcon2025.md
        "Budget: $50K approved, $5K spent (venue)
        Remaining: $45,000"
```

**Benefits**:
- Progress never lost across weeks
- Claude always has current context
- Team can pause/resume planning anytime

---

### Example 3: Research Synthesis

**Scenario**: Analyzing 50 research papers over multiple sessions

**Session 1** (Papers 1-10):
```
User: Uploads 10 papers on AI safety
Claude: Analyzes, discusses
        Saves to /memories/ai_safety_research.md:

        Key Themes:
        - Alignment problem appears in 8/10 papers
        - Most cite Amodei et al. (2016)
        - Common concern: reward hacking
```

**Session 2** (Papers 11-20):
```
User: Uploads 10 more papers
Claude: Reads /memories/ai_safety_research.md
        "I see alignment was a key theme before..."
        Updates memory with new findings
```

**Session 5** (Papers 41-50):
```
User: "What are the main themes across all papers?"
Claude: Reads /memories/ai_safety_research.md
        "Across all 50 papers:
        1. Alignment problem (45/50 papers)
        2. Reward hacking (38/50)
        3. Interpretability (32/50)..."
```

---

### Example 4: Code Review Workflow

**Scenario**: Reviewing large codebase over time

**Memory Structure**:
```
/memories/
  code_review/
    progress.md           # Overall progress
    issues_found.md       # List of issues
    patterns.md           # Code patterns observed
    recommendations.md    # Suggested improvements
```

**Usage**:
```
Session 1:
- Review auth module (20 files)
- Save issues to /memories/code_review/issues_found.md

Session 2:
- Review API module (30 files)
- Read previous issues
- Add new issues to same file

Session 3:
- Review database module
- Cross-reference patterns
- Update recommendations

Final Session:
- Read all memory files
- Generate comprehensive report
- No information lost despite context clears
```

---

## Troubleshooting

### Common Issues

**Issue 1: Tool Not Found**

```
Error: "Tool 'memory' not found"
```

**Solution**:
```python
# Make sure beta header is set
extra_headers = {
    "anthropic-beta": "context-management-2025-06-27"
}

# And tool is properly defined
tools = [
    {"type": "memory_20250818", "name": "memory"}
]
```

---

**Issue 2: Path Errors**

```
Error: "Invalid path"
```

**Solution**:
```python
# Paths MUST start with /memories/
 Correct: "/memories/notes.md"
 Wrong: "memories/notes.md"
 Wrong: "/notes.md"
```

---

**Issue 3: File Not Found**

```
Error: "File not found: /memories/missing.md"
```

**Solution**:
```python
# Claude tried to read non-existent file
# Either:
# 1. Create it first
# 2. Check if exists before reading

# Example check:
import os

memory_path = "./memories/notes.md"
if not os.path.exists(memory_path):
    # Handle missing file
    print("File doesn't exist yet")
```

---

**Issue 4: Context Still Filling Up**

```
Problem: Even with Memory Tool, context fills up
```

**Solution**:
```python
# Combine with context editing
# Periodically ask Claude to summarize and clear

if len(messages) > 100:
    messages.append({
        "role": "user",
        "content": "Summarize our progress to memory and help me clean up context"
    })
```

---

**Issue 5: Memory Files Growing Too Large**

```
Problem: /memories files become huge
```

**Solution**:
```python
# Use multiple organized files

Bad:
/memories/everything.md (5000 lines)

Good:
/memories/
  architecture/decisions.md
  architecture/patterns.md
  progress/completed_tasks.md
  progress/current_tasks.md
  reference/api_endpoints.md
```

---

## Quick Reference

### Memory Tool Operations

| Operation | Purpose | Example |
|-----------|---------|---------|
| `create` | Make new file | Project setup notes |
| `view` | Read file | Check task status |
| `str_replace` | Update content | Mark task complete |
| `delete` | Remove file | Clean old notes |

### When to Use What

```
Short session (< 50 messages):
� Just use normal conversation

Medium session (50-150 messages):
� Use Memory Tool to save key points

Long session (> 150 messages):
� Use Memory Tool + Context Editing together

Multi-session project:
� Always use Memory Tool
```

### File Organization

```
/memories/
   project/
      architecture.md
      decisions.md
      tech_stack.md
   tasks/
      completed.md
      in_progress.md
      backlog.md
   reference/
      api_docs.md
      database_schema.md
   sessions/
       2025-01-15_summary.md
       2025-01-20_summary.md
```

---

## Summary

### Key Takeaways

**Memory Tool**:
-  Stores info across sessions in `/memories`
-  Claude can create, read, update, delete
-  You control storage and security
-  Perfect for long projects

**Context Editing**:
-  Automatically manages context window
-  Summarizes before clearing
-  Works with Memory Tool
-  Enables infinite sessions

**Together**:
-  Never lose progress
-  Work on projects for weeks/months
-  Claude always has relevant context
-  Clean, organized memory

### Getting Started

1. **Enable beta header** (`context-management-2025-06-27`)
2. **Add Memory Tool** to your tools array
3. **Create `/memories` folder** with restricted permissions
4. **Implement tool handler** (Python/TypeScript examples above)
5. **Start using** - Ask Claude to remember things!

---

## Resources

**Official Documentation**:
- Anthropic Context Management: https://www.anthropic.com/news/context-management
- Context Editing Guide: https://docs.claude.com/en/docs/build-with-claude/context-editing
- Memory Tool API: https://docs.claude.com/en/docs/agents-and-tools/tool-use/memory-tool

**Project Integration**:
- Location: `/home/sk/template-copilot-kit-py/.claude/docs/08-context.md`
- Related: Claude Code workflows, agent patterns

---

**Last Updated**: January 2025
**Project**: Medellin Spark
**Status**: Production Ready 
