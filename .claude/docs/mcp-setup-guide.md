# MCP Setup Guide for Claude Code CLI

**Official Documentation Reference**: https://docs.claude.com/en/docs/claude-code/mcp

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Configuration Scopes](#configuration-scopes)
4. [Adding MCP Servers](#adding-mcp-servers)
5. [Configuration Files](#configuration-files)
6. [Environment Variables](#environment-variables)
7. [Management Commands](#management-commands)
8. [Verification Steps](#verification-steps)
9. [Troubleshooting](#troubleshooting)
10. [Setup Checklist](#setup-checklist)

---

## Overview

**What is MCP?**
Model Context Protocol (MCP) enables Claude Code to connect to external tools and services, extending its capabilities beyond the built-in tools.

**Transport Types**:
- **HTTP**: Cloud-based services (recommended)
- **SSE**: Server-Sent Events (deprecated, use HTTP instead)
- **stdio**: Local processes and scripts

**Configuration Hierarchy**:
```
User Config (global) → Project Config (.mcp.json) → Local Config (project-private)
```

---

## Quick Start

### 1. Check Current MCP Servers

```bash
cd /home/sk/mde
claude mcp list
```

### 2. Add Your First Server (HTTP Example)

```bash
claude mcp add --transport http --scope project notion https://mcp.notion.com/mcp
```

### 3. Add Local Server (stdio Example)

```bash
claude mcp add --transport stdio --scope project filesystem -- npx -y @modelcontextprotocol/server-filesystem /home/sk/mde
```

### 4. Verify Connection

```bash
claude mcp list
# Look for ✓ Connected status
```

---

## Configuration Scopes

### 1. **Local** (Default)
- **Location**: `~/.claude.json` (per-project section)
- **Visibility**: Private to you in current project only
- **Use Case**: Testing, personal tools, API keys
- **Command**: `--scope local` (or omit scope flag)

### 2. **Project**
- **Location**: `/home/sk/mde/.mcp.json`
- **Visibility**: Shared with team via version control
- **Use Case**: Team-wide tools, shared services
- **Command**: `--scope project`
- **Note**: Requires user approval before first use

### 3. **User**
- **Location**: User-level config
- **Visibility**: Available across all your projects
- **Use Case**: Personal tools used in multiple projects
- **Command**: `--scope user`

**Recommendation**: Use `project` scope for team tools, `local` for sensitive credentials.

---

## Adding MCP Servers

### HTTP Servers (Recommended for Cloud Services)

```bash
# Format
claude mcp add --transport http --scope <scope> <name> <url>

# Examples
claude mcp add --transport http --scope project sentry https://mcp.sentry.dev/mcp
claude mcp add --transport http --scope project asana https://mcp.asana.com/mcp
claude mcp add --transport http --scope project notion https://mcp.notion.com/mcp
```

### stdio Servers (Local Processes)

```bash
# Format
claude mcp add --transport stdio --scope <scope> <name> -- <command> [args...]

# Examples - Filesystem Access
claude mcp add --transport stdio --scope project filesystem -- npx -y @modelcontextprotocol/server-filesystem /home/sk/mde

# Examples - Perplexity AI
claude mcp add --transport stdio --scope project perplexity --env PERPLEXITY_API_KEY=your_key -- npx -y @modelcontextprotocol/server-perplexity

# Examples - Supabase
claude mcp add --transport stdio --scope project supabase --env SUPABASE_URL=https://your-project.supabase.co --env SUPABASE_SERVICE_ROLE_KEY=your_key -- npx -y @modelcontextprotocol/server-supabase

# Examples - Desktop Commander
claude mcp add --transport stdio --scope project desktop-commander -- npx -y @wonderwhy-er/desktop-commander@latest

# Examples - Mermaid Diagrams
claude mcp add --transport stdio --scope project mermaid -- claude-mermaid
```

**Important**:
- Use `--` separator before the command
- Everything after `--` is passed to the server
- Use `--env KEY=VALUE` to set environment variables

---

## Configuration Files

### Project Config: `.mcp.json`

**Location**: `/home/sk/mde/.mcp.json`

**Format**:
```json
{
  "mcpServers": {
    "server-name": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-name"],
      "env": {
        "API_KEY": "${API_KEY}",
        "URL": "${URL:-https://default.com}"
      }
    }
  }
}
```

**Environment Variable Expansion**:
- `${VAR}` - Expand from environment
- `${VAR:-default}` - Expand with fallback value
- Works in: `command`, `args`, `env`, `headers` fields

**Example - Complete .mcp.json**:
```json
{
  "mcpServers": {
    "mermaid": {
      "type": "stdio",
      "command": "claude-mermaid",
      "args": [],
      "env": {}
    },
    "perplexity": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-perplexity"],
      "env": {
        "PERPLEXITY_API_KEY": "${PERPLEXITY_API_KEY}"
      }
    },
    "desktop-commander": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@wonderwhy-er/desktop-commander@latest"],
      "env": {}
    },
    "supabase": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-supabase"],
      "env": {
        "SUPABASE_URL": "${VITE_SUPABASE_URL}",
        "SUPABASE_SERVICE_ROLE_KEY": "${SUPABASE_SERVICE_ROLE_KEY}"
      }
    }
  }
}
```

### Security Best Practices

**For Sensitive Data**:
1. Add `.mcp.json` to `.gitignore` if it contains API keys
2. Use environment variable expansion: `"API_KEY": "${API_KEY}"`
3. Store actual keys in `/home/sk/mde/.env`
4. Use `local` scope for personal credentials

**For Team Sharing**:
1. Use `project` scope with `.mcp.json` in version control
2. Use environment variable placeholders only
3. Team members set actual values in their local `.env`

---

## Environment Variables

### Setting Environment Variables

**Option 1: .env File** (Recommended)
```bash
# /home/sk/mde/.env
PERPLEXITY_API_KEY=pplx-xxx
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJxxx
```

**Option 2: Inline with --env Flag**
```bash
claude mcp add --transport stdio --scope project myserver \
  --env API_KEY=xxx \
  --env URL=https://api.example.com \
  -- npx -y server-package
```

**Option 3: System Environment**
```bash
export API_KEY=xxx
claude mcp add --transport stdio --scope project myserver -- npx -y server-package
```

### Special Environment Variables

**MCP_TIMEOUT**
- Default: Server startup timeout
- Usage: `export MCP_TIMEOUT=30000` (30 seconds)

**MAX_MCP_OUTPUT_TOKENS**
- Default: 25,000 tokens
- Usage: Configure for servers with large outputs
- Set in server env: `"MAX_MCP_OUTPUT_TOKENS": "50000"`

---

## Management Commands

### List All Servers
```bash
claude mcp list
```
Output shows:
- Server name
- Command
- Status (✓ Connected / ⚠ Needs authentication / ✗ Error)

### Get Server Details
```bash
claude mcp get <server-name>
```
Shows:
- Scope (local/project/user)
- Transport type
- Command and args
- Environment variables
- Connection status

### Remove Server
```bash
# Remove from local config
claude mcp remove <server-name> -s local

# Remove from project config
claude mcp remove <server-name> -s project

# Remove from user config
claude mcp remove <server-name> -s user
```

### Reset Project Approvals
```bash
claude mcp reset-project-choices
```
Clears all approved/rejected project-scoped servers.

### Import from Claude Desktop (Mac/WSL only)
```bash
claude mcp add-from-claude-desktop
```

### Check Status in Claude Code
```
/mcp
```
Use this command within Claude Code chat to:
- Check server status
- Authenticate OAuth 2.0 servers
- Debug connection issues

---

## Verification Steps

### Step 1: Validate Configuration Files

```bash
# Check .mcp.json syntax
python3 -m json.tool /home/sk/mde/.mcp.json > /dev/null && echo "✅ Valid JSON"

# List configured servers
cat /home/sk/mde/.mcp.json | jq '.mcpServers | keys'
```

### Step 2: Verify Environment Variables

```bash
# Source .env file
source /home/sk/mde/.env

# Check variables are set
echo "PERPLEXITY_API_KEY: ${PERPLEXITY_API_KEY:0:20}..."
echo "SUPABASE_URL: $SUPABASE_URL"
```

### Step 3: Test Server Connections

```bash
# List all servers
claude mcp list

# Expected output:
# mermaid: claude-mermaid - ✓ Connected
# perplexity: npx -y @modelcontextprotocol/server-perplexity - ✓ Connected
# desktop-commander: npx -y @wonderwhy-er/desktop-commander@latest - ✓ Connected
# supabase: npx -y @modelcontextprotocol/server-supabase - ✓ Connected
```

### Step 4: Check Logs

```bash
# View MCP logs (for Claude Desktop servers)
tail -50 ~/.config/Claude/logs/mcp.log

# Look for errors or disconnections
grep -i error ~/.config/Claude/logs/mcp.log | tail -10
```

### Step 5: Test Server Functionality

**In Claude Code chat**:
```
/mcp
```
Then test each server's tools.

---

## Troubleshooting

### Server Not Appearing in `claude mcp list`

**Possible Causes**:
1. Invalid JSON syntax in `.mcp.json`
2. Environment variables not set
3. Server not installed (for npx packages)
4. Wrong scope specified

**Solutions**:
```bash
# 1. Validate JSON
python3 -m json.tool /home/sk/mde/.mcp.json

# 2. Check environment
source /home/sk/mde/.env
env | grep -E "PERPLEXITY|SUPABASE"

# 3. Install server manually
npx -y @modelcontextprotocol/server-perplexity --version

# 4. Check which config files exist
ls -la /home/sk/mde/.mcp.json
ls -la ~/.claude.json
```

### Server Shows "⚠ Needs authentication"

**For HTTP/OAuth2 servers**:
1. Use `/mcp` command in Claude Code chat
2. Click authentication link
3. Complete OAuth flow

**For stdio servers with API keys**:
1. Verify environment variable is set
2. Check `.mcp.json` uses correct variable name
3. Ensure `.env` file is sourced

### Server Shows "✗ Error" or Not Connected

**Check logs**:
```bash
# Claude Desktop logs
tail -100 ~/.config/Claude/logs/mcp.log | grep -A 5 server-name

# Check if server command works standalone
npx -y @modelcontextprotocol/server-name --help
```

**Common Issues**:
- Network connectivity (for HTTP servers)
- Missing dependencies (for stdio servers)
- Invalid API credentials
- Server startup timeout (increase `MCP_TIMEOUT`)

### Environment Variable Not Expanding

**Symptom**: `${VAR}` appears literally instead of value

**Cause**: Variable expansion only works in:
- `.mcp.json` file (project config)
- `command`, `args`, `env`, `headers` fields

**Solution**:
```bash
# DON'T use in local config added via CLI
# Use --env flag instead:
claude mcp add --transport stdio --scope local server \
  --env API_KEY=actual_value \
  -- npx -y server-package
```

### Windows-Specific Issues

**Problem**: npx commands fail on Windows

**Solution**: Wrap with `cmd /c`:
```json
{
  "mcpServers": {
    "server": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-name"],
      "env": {}
    }
  }
}
```

### Project Server Requires Approval

**Symptom**: Server in `.mcp.json` not loading

**Solution**:
1. Claude Code shows approval prompt on first use
2. User must approve project-scoped servers
3. Use `claude mcp reset-project-choices` to clear approvals

---

## Setup Checklist

### Initial Setup

- [ ] Create `.mcp.json` in project root
- [ ] Add `.mcp.json` to `.gitignore` (if storing API keys)
- [ ] Create `.env` file for sensitive variables
- [ ] Add `.env` to `.gitignore`

### For Each Server

- [ ] Choose appropriate scope (local/project/user)
- [ ] Determine transport type (HTTP vs stdio)
- [ ] Install any required dependencies
- [ ] Set environment variables (if needed)
- [ ] Add server configuration
- [ ] Validate JSON syntax
- [ ] Test connection with `claude mcp list`
- [ ] Verify functionality in Claude Code

### Project-Scoped Setup (.mcp.json)

- [ ] Define all team-shared servers
- [ ] Use environment variable placeholders
- [ ] Document required environment variables
- [ ] Commit `.mcp.json` to version control
- [ ] Update `.env.example` with variable names
- [ ] Test server approval flow

### Security Review

- [ ] No hardcoded API keys in `.mcp.json`
- [ ] `.mcp.json` in `.gitignore` (if needed)
- [ ] `.env` in `.gitignore`
- [ ] Environment variables documented
- [ ] Sensitive servers use `local` scope

### Validation

- [ ] `claude mcp list` shows all servers
- [ ] All servers show ✓ Connected
- [ ] `/mcp` command works in Claude Code
- [ ] Each server's tools are accessible
- [ ] Team members can approve/use servers

---

## Common MCP Server Packages

### Official MCP Servers

```bash
# Filesystem access
@modelcontextprotocol/server-filesystem

# GitHub integration
@modelcontextprotocol/server-github

# Google Drive
@modelcontextprotocol/server-gdrive

# Slack
@modelcontextprotocol/server-slack

# Perplexity AI
@modelcontextprotocol/server-perplexity

# Supabase
@modelcontextprotocol/server-supabase
```

### Community Servers

```bash
# Desktop Commander (enhanced file operations)
@wonderwhy-er/desktop-commander

# Mermaid diagrams
claude-mermaid

# Chrome DevTools
chrome-devtools-mcp
```

---

## Example Configurations

### Minimal Setup (Single Server)

```json
{
  "mcpServers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/sk/mde"],
      "env": {}
    }
  }
}
```

### Production Setup (Multiple Servers with Env Vars)

```json
{
  "mcpServers": {
    "perplexity": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-perplexity"],
      "env": {
        "PERPLEXITY_API_KEY": "${PERPLEXITY_API_KEY}"
      }
    },
    "supabase": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-supabase"],
      "env": {
        "SUPABASE_URL": "${SUPABASE_URL}",
        "SUPABASE_SERVICE_ROLE_KEY": "${SUPABASE_SERVICE_ROLE_KEY}"
      }
    },
    "desktop-commander": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@wonderwhy-er/desktop-commander@latest"],
      "env": {}
    }
  }
}
```

### Team Setup with .env.example

**.mcp.json**:
```json
{
  "mcpServers": {
    "notion": {
      "type": "http",
      "url": "https://mcp.notion.com/mcp"
    },
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

**.env.example**:
```bash
# GitHub Personal Access Token
# Create at: https://github.com/settings/tokens
GITHUB_TOKEN=ghp_xxx

# Other required variables...
```

---

## Resources

- **Official Docs**: https://docs.claude.com/en/docs/claude-code/mcp
- **MCP Specification**: https://modelcontextprotocol.io
- **Available Servers**: https://github.com/modelcontextprotocol/servers
- **Debugging Guide**: https://modelcontextprotocol.io/docs/tools/debugging

---

**Last Updated**: October 25, 2025
**Project**: Medellin Spark Platform
**Location**: `/home/sk/mde/.claude/docs/mcp-setup-guide.md`
