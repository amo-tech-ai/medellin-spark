# 🔌 Supabase Connection Documentation

**Location**: `/supabase/connect/`  
**Purpose**: Complete guides for all Supabase connection methods  
**Status**: ✅ All methods tested and verified working

---

## 📚 Documentation Files

### 1. SUPABASE-CONNECTION-GUIDE.md (1,177 lines)
**The main comprehensive guide** - Start here!

**Contents**:
- 📋 Table of Contents
- 🎯 Quick Overview (what each method does)
- 🔑 Environment Variables (complete template)
- 🤖 Method 1: Supabase MCP (AI/Cursor)
- 🛠️ Method 2: Supabase CLI (migrations)
- 🐘 Method 3: Postgres psql (database admin)
- 🌐 Method 4: REST API (production apps)
- ⚠️ Common Errors & Fixes (6 errors)
- 🔒 Security Best Practices (6 tips)
- 🚀 Real-World Example (same query, 4 methods)

**When to read**: First time setting up connections, or as reference

---

### 2. CONNECTION-TEST-RESULTS.md (397 lines)
**Verification that everything works** - Proof of testing!

**Contents**:
- 🧪 Test Results (all 4 methods)
- 📊 Performance Comparison
- 🎯 Connection Details Verified
- 📋 Use Case Recommendations
- 🔧 Connection Strings Reference
- ✅ Final Verification Summary

**When to read**: Want proof methods work, need connection strings

**Test Date**: October 19, 2025, 1:15 AM  
**Status**: ✅ All 4 methods verified 100% working

---

### 3. SUPABASE_CONNECTION_METHODS.md (357 lines)
**Legacy status summary** - Historical reference

**Contents**:
- 📊 Status Summary (working vs blocked)
- ✅ Working Methods (REST API, Edge Functions, etc.)
- ⚠️ Intermittent Methods (CLI, pooler)
- ❌ Blocked Methods (firewall issues)
- 🎯 Recommended Approach
- 🔧 Troubleshooting Guide

**When to read**: Debugging network/firewall issues

---

## 🎯 Quick Start

### New to Supabase Connections?
1. Read: `SUPABASE-CONNECTION-GUIDE.md` (main guide)
2. Set up: `.env` file with credentials
3. Choose: Your primary connection method
4. Test: Using examples from the guide
5. Verify: Check `CONNECTION-TEST-RESULTS.md` for working examples

### Need Connection Strings?
Jump to: `CONNECTION-TEST-RESULTS.md` → "Connection Strings Reference"

### Troubleshooting Connection Issues?
Read: `SUPABASE_CONNECTION_METHODS.md` → "Troubleshooting Guide"

---

## ✅ Verified Working (Oct 19, 2025)

All 4 connection methods tested and confirmed working:

| Method | Status | Speed | Best For |
|--------|--------|-------|----------|
| **MCP Supabase** | ✅ Working | 500ms | AI/Cursor development |
| **Supabase CLI** | ✅ Working | 2s | Migrations & deployments |
| **psql (Pooler)** | ✅ Working | 300ms | Database administration |
| **REST API** | ✅ Working | 200ms | Production applications ⭐ |

---

## 📋 What Each Method Does

### MCP Supabase
- **What**: AI assistant database access
- **When**: Using Cursor or Claude Code
- **Example**: `mcp_supabase_execute_sql({ query: "..." })`

### Supabase CLI
- **What**: Terminal commands for migrations
- **When**: Managing database schema, deploying functions
- **Example**: `supabase db push`

### psql (Postgres)
- **What**: Direct PostgreSQL command-line
- **When**: Running complex SQL, database admin
- **Example**: `psql "$DATABASE_URL_POOLER" -c "SELECT ..."`

### REST API
- **What**: HTTP API for database access
- **When**: Frontend/backend application code (99% of production)
- **Example**: `fetch('https://....supabase.co/rest/v1/table')`

---

## 🔑 Environment Variables

**Required for all methods** (add to `.env`):

```bash
# Supabase Project
SUPABASE_URL=https://dhesktsqhcxhqfjypulk.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database (for psql)
DATABASE_URL_POOLER=postgresql://postgres.dhesktsqhcxhqfjypulk:[PASSWORD]@aws-1-us-east-2.pooler.supabase.com:6543/postgres

# CLI/MCP (admin access)
SUPABASE_ACCESS_TOKEN=sbp_abc123...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database Password
POSTGRES_PASSWORD=YourPassword123
```

**Where to find**:
- Dashboard: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk
- Settings → API (for URL & keys)
- Settings → Database (for connection strings)

---

## 🚀 Common Tasks

### Query Database Data
```typescript
// Method 1: REST API (recommended)
const { data } = await supabase.from('users').select('*')

// Method 2: MCP (in Cursor)
mcp_supabase_execute_sql({ query: "SELECT * FROM users;" })

// Method 3: psql (terminal)
psql "$DATABASE_URL_POOLER" -c "SELECT * FROM users;"
```

### Run Database Migration
```bash
# Method 1: CLI (recommended)
supabase db push

# Method 2: Dashboard SQL Editor
# Go to: https://supabase.com/dashboard/project/.../sql
# Paste SQL and click "Run"

# Method 3: psql (manual)
psql "$DATABASE_URL_POOLER" -f migration.sql
```

### Deploy Edge Function
```bash
# CLI only
supabase functions deploy my-function
```

---

## ⚠️ Common Issues & Fixes

### "Network unreachable" (psql)
**Problem**: Direct connection uses IPv6  
**Fix**: Use connection pooler instead (port 6543)

See: `SUPABASE-CONNECTION-GUIDE.md` → "Common Errors" → Error 1

### "Invalid API key"
**Problem**: Wrong key or not included in request  
**Fix**: Use `anon` key for frontend, `service_role` for backend

See: `SUPABASE-CONNECTION-GUIDE.md` → "Common Errors" → Error 2

### "RLS policy violation"
**Problem**: Row Level Security blocking query  
**Fix**: Add RLS policy or use service role key (backend only)

See: `SUPABASE-CONNECTION-GUIDE.md` → "Common Errors" → Error 3

---

## 🔒 Security Checklist

Before going to production:

- [ ] Never commit `.env` files (add to `.gitignore`)
- [ ] Use `anon` key for frontend (safe to expose)
- [ ] Use `service_role` key for backend only (keep secret!)
- [ ] Enable RLS on all tables
- [ ] Use minimal access token scopes
- [ ] Rotate secrets regularly

See: `SUPABASE-CONNECTION-GUIDE.md` → "Security Best Practices"

---

## 📊 Performance Guide

**Fastest to Slowest**:
1. REST API: 200ms ⚡⚡⚡ (use for 99% of production)
2. psql: 300ms ⚡⚡ (database admin)
3. MCP: 500ms ⚡ (AI assistance)
4. CLI: 2s (migrations)

**Recommendation**: Always use REST API for production application code.

---

## 🔗 External Resources

- **Supabase Docs**: https://supabase.com/docs
- **MCP Supabase**: https://github.com/modelcontextprotocol/servers/tree/main/src/supabase
- **Supabase CLI**: https://supabase.com/docs/guides/cli
- **JavaScript Client**: https://supabase.com/docs/reference/javascript
- **PostgREST API**: https://postgrest.org/en/stable/

---

## 📝 Contributing

Found an issue or want to add an example?

1. Test the connection method
2. Document your findings
3. Update the relevant guide
4. Add entry to test results

---

## 📅 Last Updated

**Date**: October 19, 2025, 1:15 AM  
**Tests**: All 4 methods verified working  
**Status**: ✅ Production-ready  

---

**Need help?** Start with `SUPABASE-CONNECTION-GUIDE.md` - it has everything! 🚀

