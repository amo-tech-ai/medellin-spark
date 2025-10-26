# MCP Quick Reference Card

**Fast commands for MCP server management in Claude Code**

---

## 🚀 Essential Commands

```bash
# List all configured servers
claude mcp list

# Get server details
claude mcp get <server-name>

# Remove server
claude mcp remove <server-name> -s <local|project|user>

# Check status in Claude Code
/mcp
```

---

## ➕ Add Servers

### HTTP Server (Cloud Services)
```bash
claude mcp add --transport http --scope project <name> <url>
```

**Examples**:
```bash
claude mcp add --transport http --scope project notion https://mcp.notion.com/mcp
claude mcp add --transport http --scope project sentry https://mcp.sentry.dev/mcp
```

### stdio Server (Local Tools)
```bash
claude mcp add --transport stdio --scope project <name> -- <command> [args]
```

**Examples**:
```bash
# Perplexity AI
claude mcp add --transport stdio --scope project perplexity \
  --env PERPLEXITY_API_KEY=xxx \
  -- npx -y @modelcontextprotocol/server-perplexity

# Supabase
claude mcp add --transport stdio --scope project supabase \
  --env SUPABASE_URL=https://xxx.supabase.co \
  --env SUPABASE_SERVICE_ROLE_KEY=xxx \
  -- npx -y @modelcontextprotocol/server-supabase

# Desktop Commander
claude mcp add --transport stdio --scope project desktop-commander \
  -- npx -y @wonderwhy-er/desktop-commander@latest

# Filesystem
claude mcp add --transport stdio --scope project filesystem \
  -- npx -y @modelcontextprotocol/server-filesystem /home/sk/mde
```

---

## 📁 Configuration Files

### Project Config: `.mcp.json`
**Location**: `/home/sk/mde/.mcp.json`

```json
{
  "mcpServers": {
    "server-name": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@package/name"],
      "env": {
        "API_KEY": "${API_KEY}"
      }
    }
  }
}
```

### Environment Variables: `.env`
**Location**: `/home/sk/mde/.env`

```bash
PERPLEXITY_API_KEY=pplx-xxx
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJxxx
```

---

## 🔍 Configuration Scopes

| Scope | Location | Visibility | Use For |
|-------|----------|------------|---------|
| **local** | `~/.claude.json` | You only (this project) | Testing, personal keys |
| **project** | `.mcp.json` | Team (via git) | Shared tools |
| **user** | User config | You (all projects) | Personal tools |

**Default**: `local` (if `--scope` omitted)

---

## ✅ Verification Steps

```bash
# 1. Validate JSON
python3 -m json.tool .mcp.json > /dev/null && echo "✅ Valid"

# 2. List servers
cat .mcp.json | jq '.mcpServers | keys'

# 3. Check environment
source .env && env | grep -E "API|KEY|URL"

# 4. Test connections
claude mcp list
# Look for: ✓ Connected

# 5. Check logs
tail -50 ~/.config/Claude/logs/mcp.log
```

---

## 🐛 Troubleshooting

### Server Not Listed
```bash
# Validate JSON syntax
python3 -m json.tool .mcp.json

# Check scope
claude mcp get <server-name>

# Reinstall package
npx -y @modelcontextprotocol/server-name --version
```

### "⚠ Needs authentication"
- Use `/mcp` in Claude Code
- Click auth link for OAuth

### "✗ Error"
```bash
# Check logs
tail -100 ~/.config/Claude/logs/mcp.log | grep server-name

# Test command standalone
npx -y @modelcontextprotocol/server-name --help

# Increase timeout
export MCP_TIMEOUT=30000
```

### Env Variables Not Expanding
- Only works in `.mcp.json` (not CLI-added servers)
- Use `--env KEY=value` when adding via CLI
- Source `.env` before Claude Code starts

---

## 📦 Popular Servers

### Official
```bash
@modelcontextprotocol/server-filesystem    # File operations
@modelcontextprotocol/server-github        # GitHub API
@modelcontextprotocol/server-perplexity    # Perplexity AI
@modelcontextprotocol/server-supabase      # Supabase DB
@modelcontextprotocol/server-slack         # Slack
@modelcontextprotocol/server-gdrive        # Google Drive
```

### Community
```bash
@wonderwhy-er/desktop-commander@latest     # Enhanced file ops
claude-mermaid                              # Diagrams
chrome-devtools-mcp@latest                  # Browser DevTools
```

---

## 🔒 Security Checklist

- [ ] `.mcp.json` uses `${VAR}` for secrets
- [ ] Actual keys in `.env` (not `.mcp.json`)
- [ ] `.env` in `.gitignore`
- [ ] Personal keys use `local` scope
- [ ] Team servers use `project` scope

---

## 📚 Resources

- Docs: https://docs.claude.com/en/docs/claude-code/mcp
- Servers: https://github.com/modelcontextprotocol/servers
- Full Guide: `/home/sk/mde/.claude/docs/mcp-setup-guide.md`
