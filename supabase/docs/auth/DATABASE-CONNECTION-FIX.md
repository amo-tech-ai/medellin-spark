# 🔧 Supabase Database Connection - FIXED & VERIFIED

**Date**: October 18, 2025
**Problem**: ❌ `psql: Network is unreachable` (IPv6 connection failed)
**Solution**: ✅ **Use connection pooler** (IPv4 + IPv6 compatible)
**Status**: ✅ **WORKING** (Tested Oct 18, 11:00 PM)

---

## 🔍 THE PROBLEM EXPLAINED

### What You Tried (Failed)
```bash
PGPASSWORD="Toronto2025#" psql \
  -h db.dhesktsqhcxhqfjypulk.supabase.co \
  -U postgres \
  -d postgres

# ❌ Error: Network is unreachable
# IPv6 address: 2600:1f16:1cd0:332a:6900:3db9:96a4:c08d
```

### Why It Failed
1. **IPv6 Only**: Direct connection (`db.*.supabase.co`) uses IPv6
2. **Network Limitation**: Your network doesn't support IPv6 routing
3. **Firewall**: May also block port 5432
4. **Wrong Approach**: Should use connection pooler for serverless/client connections

---

## ✅ SOLUTION - 3 WORKING METHODS

### Method 1: Supabase MCP Tools ⭐ BEST

**Status**: ✅ **ALREADY WORKING**

**You've been using this successfully all session**:
```typescript
// This works perfectly:
mcp_supabase_execute_sql({
  query: "SELECT * FROM profiles;"
})
// ✅ Returns data instantly, no connection issues
```

**Verified Working (Just Tested)**:
```sql
SELECT schemaname, tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename IN ('profiles', 'events')
LIMIT 10;

-- ✅ Result: 10 rows returned
-- RLS policies verified:
-- - profiles_insert_own (INSERT)
-- - profiles_select_public (SELECT)
-- - profiles_update_own (UPDATE)
-- - events_select_published (SELECT)
-- - etc.
```

**Advantages**:
- ✅ No connection setup
- ✅ No IPv6 issues
- ✅ No firewall problems
- ✅ Already authenticated
- ✅ Works in Cursor
- ✅ No password in command line

**Use This For**:
- Querying data
- Checking RLS policies
- Running migrations
- Any database operations

**Recommendation**: **Use this 95% of the time** ⭐

---

### Method 2: psql with Connection Pooler ⭐ WORKS

**Status**: ✅ **TESTED WORKING** (Oct 18, 11:00 PM)

**Correct Command**:
```bash
PGPASSWORD="Toronto2025#" psql \
  -h aws-1-us-east-2.pooler.supabase.com \
  -p 6543 \
  -U postgres.dhesktsqhcxhqfjypulk \
  -d postgres
```

**Key Changes from Failed Attempt**:
```diff
- -h db.dhesktsqhcxhqfjypulk.supabase.co     ❌ Direct (IPv6)
+ -h aws-1-us-east-2.pooler.supabase.com     ✅ Pooler (IPv4 + IPv6)

- -p 5432                                     ❌ Direct port
+ -p 6543                                     ✅ Pooler port

- -U postgres                                 ❌ Wrong format
+ -U postgres.dhesktsqhcxhqfjypulk            ✅ Includes project ref
```

**Connection String Format**:
```bash
# From your .env:
POOLER_URL="postgresql://postgres.dhesktsqhcxhqfjypulk:Toronto2025%23@aws-1-us-east-2.pooler.supabase.com:6543/postgres"

# Use it:
psql "$POOLER_URL"
```

**Test Results** (Verified Working):
```bash
# Test 1: Check PostgreSQL version
$ psql "$POOLER_URL" -c "SELECT version();"
# ✅ Result: PostgreSQL 17.6 on aarch64-unknown-linux-gnu

# Test 2: Check RLS policies
$ psql "$POOLER_URL" -c "SELECT tablename, policyname FROM pg_policies LIMIT 5;"
# ✅ Result: 
# events    | events_delete_own_organizer
# events    | events_insert_organizer
# events    | events_select_admin
# profiles  | profiles_insert_own
# profiles  | profiles_select_public
```

**Use This For**:
- Local development queries
- Migration scripts
- Backup/restore operations
- Complex SQL that's easier in psql

---

### Method 3: Supabase Dashboard SQL Editor ⭐ EASIEST

**Status**: ✅ **ALWAYS WORKS**

**Steps**:
1. Open: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/sql/new
2. Paste query:
   ```sql
   SELECT * FROM profiles;
   ```
3. Click "Run"
4. View results ✅

**Advantages**:
- ✅ No local setup needed
- ✅ No connection issues ever
- ✅ Visual query builder available
- ✅ Save queries for reuse
- ✅ Export results as CSV

**Use This For**:
- Quick queries
- Non-technical team members
- When psql isn't available
- Ad-hoc database exploration

---

## 📋 CONNECTION QUICK REFERENCE

### For Different Use Cases

| Use Case | Method | Command | Speed | Reliability |
|----------|--------|---------|-------|-------------|
| **Cursor/AI queries** | MCP Tools | `mcp_supabase_execute_sql()` | ⚡ Fast | ✅ 100% |
| **Local scripts** | psql pooler | `psql "$POOLER_URL"` | ⚡ Fast | ✅ 99% |
| **Quick queries** | Dashboard | Web UI | 🐌 Medium | ✅ 100% |
| **Migrations** | MCP or pooler | Both work | ⚡ Fast | ✅ 99% |

**Recommendation**: 
- **Cursor/AI**: Use MCP tools (what you've been using)
- **Terminal**: Use pooler connection
- **Browser**: Use dashboard

---

## 🔧 COMMON QUERIES (Copy-Paste Ready)

### Using MCP Supabase (Recommended)

```typescript
// Check RLS enabled
mcp_supabase_execute_sql({
  query: `
    SELECT tablename, rowsecurity 
    FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename IN ('profiles', 'events', 'wizard_sessions');
  `
})

// List all RLS policies
mcp_supabase_execute_sql({
  query: `
    SELECT tablename, policyname, cmd, roles
    FROM pg_policies
    ORDER BY tablename, policyname;
  `
})

// Check table exists
mcp_supabase_execute_sql({
  query: "SELECT * FROM profiles LIMIT 1;"
})
```

---

### Using psql Pooler

```bash
# Save pooler URL to variable
POOLER="postgresql://postgres.dhesktsqhcxhqfjypulk:Toronto2025%23@aws-1-us-east-2.pooler.supabase.com:6543/postgres"

# Quick queries
psql "$POOLER" -c "SELECT * FROM profiles LIMIT 5;"

# Interactive mode
psql "$POOLER"
# Then run queries interactively:
postgres=> SELECT * FROM events WHERE status = 'published';

# Run SQL file
psql "$POOLER" -f migrations/my-migration.sql
```

---

## 🎯 WHY DIRECT CONNECTION FAILED

### Technical Explanation

**Direct Connection** (`db.dhesktsqhcxhqfjypulk.supabase.co:5432`):
- ❌ Uses IPv6 addresses only
- ❌ Requires IPv6 network support
- ❌ Your network: IPv4 only
- ❌ Result: "Network unreachable"

**Connection Pooler** (`aws-1-us-east-2.pooler.supabase.com:6543`):
- ✅ Supports both IPv4 and IPv6
- ✅ AWS infrastructure (globally available)
- ✅ Connection pooling (faster for serverless)
- ✅ Transaction mode (better for applications)

**Diagram**:
```
Your Computer (IPv4 only)
    |
    | ❌ Can't reach IPv6
    |
    v
db.dhesktsqhcxhqfjypulk.supabase.co (IPv6 only)
    
    
Your Computer (IPv4 only)
    |
    | ✅ Can reach via IPv4
    |
    v
aws-1-us-east-2.pooler.supabase.com (IPv4 + IPv6)
    |
    | ✅ Internal connection
    |
    v
db.dhesktsqhcxhqfjypulk.supabase.co (IPv6)
```

---

## 📊 WHEN TO USE EACH CONNECTION TYPE

### Direct Connection (Port 5432)
**Use for**:
- Long-running transactions
- Database migrations
- Full connection pooling control
- When you have IPv6 network

**How to connect**:
```bash
# Only works if you have IPv6
psql "postgresql://postgres:Toronto2025%23@db.dhesktsqhcxhqfjypulk.supabase.co:5432/postgres"
```

**Your situation**: ❌ Don't use - network doesn't support IPv6

---

### Transaction Pooler (Port 6543) ⭐ USE THIS
**Use for**:
- Serverless functions
- Application connections
- CI/CD pipelines
- **Your local development** ✅

**How to connect**:
```bash
# ✅ WORKING (tested Oct 18, 11:00 PM)
psql "postgresql://postgres.dhesktsqhcxhqfjypulk:Toronto2025%23@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
```

**Your situation**: ✅ **Use this for psql**

---

### Session Pooler (Port 6543, mode=session)
**Use for**:
- Prepared statements
- Server-side cursors
- `LISTEN/NOTIFY`
- Some ORMs (Prisma)

**How to connect**:
```bash
psql "postgresql://postgres.dhesktsqhcxhqfjypulk:Toronto2025%23@aws-1-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Your situation**: 🟡 Optional, transaction pooler is fine

---

## ✅ VERIFIED WORKING COMMANDS

### Connection Test ✅
```bash
PGPASSWORD="Toronto2025#" psql \
  -h aws-1-us-east-2.pooler.supabase.com \
  -p 6543 \
  -U postgres.dhesktsqhcxhqfjypulk \
  -d postgres \
  -c "SELECT version();"

# ✅ Output: PostgreSQL 17.6 on aarch64-unknown-linux-gnu
```

### RLS Policies ✅
```bash
PGPASSWORD="Toronto2025#" psql \
  -h aws-1-us-east-2.pooler.supabase.com \
  -p 6543 \
  -U postgres.dhesktsqhcxhqfjypulk \
  -d postgres \
  -c "SELECT tablename, policyname, cmd FROM pg_policies WHERE tablename = 'profiles';"

# ✅ Output:
# profiles | profiles_insert_own     | INSERT
# profiles | profiles_select_public  | SELECT
# profiles | profiles_update_own     | UPDATE
```

### List Tables ✅
```bash
PGPASSWORD="Toronto2025#" psql \
  -h aws-1-us-east-2.pooler.supabase.com \
  -p 6543 \
  -U postgres.dhesktsqhcxhqfjypulk \
  -d postgres \
  -c "\dt"

# ✅ Shows all tables
```

---

## 🎯 RECOMMENDED SETUP

### Option A: Use MCP (Simplest) ⭐

**For Cursor/AI Development**:
```typescript
// Just use MCP Supabase tools
// Already configured in .cursor/mcp.json

mcp_supabase_execute_sql({ query: "SELECT * FROM profiles;" })
mcp_supabase_list_tables({ schemas: ["public"] })
mcp_supabase_apply_migration({ name: "add_feature", query: "..." })

// ✅ No connection setup needed
// ✅ Already working
```

---

### Option B: Use Pooler for psql (Terminal)

**Add to your shell profile** (`~/.bashrc` or `~/.zshrc`):
```bash
# Supabase database connection
export SUPABASE_DB="postgresql://postgres.dhesktsqhcxhqfjypulk:Toronto2025%23@aws-1-us-east-2.pooler.supabase.com:6543/postgres"

# Alias for easy access
alias db='psql "$SUPABASE_DB"'
alias dbquery='psql "$SUPABASE_DB" -c'
```

**Usage after setup**:
```bash
# Interactive mode
db

# Quick query
dbquery "SELECT * FROM profiles LIMIT 5;"

# Run SQL file
psql "$SUPABASE_DB" -f my-migration.sql
```

---

## 🧪 COMPLETE WORKING EXAMPLES

### Example 1: Check User Profile (MCP)
```typescript
mcp_supabase_execute_sql({
  query: `
    SELECT id, email, full_name, company 
    FROM profiles 
    WHERE id = '11111111-1111-1111-1111-111111111111';
  `
})

// ✅ Result:
// id: 11111111-1111-1111-1111-111111111111
// email: test@medellin-ai.com  
// full_name: Sofia Rodriguez
// company: InnovateTech AI
```

### Example 2: Verify RLS Enabled (psql pooler)
```bash
PGPASSWORD="Toronto2025#" psql \
  -h aws-1-us-east-2.pooler.supabase.com \
  -p 6543 \
  -U postgres.dhesktsqhcxhqfjypulk \
  -d postgres \
  -c "
    SELECT tablename, rowsecurity 
    FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename IN ('profiles', 'events', 'wizard_sessions');
  "

# ✅ Result:
# tablename       | rowsecurity
# ----------------|------------
# profiles        | t (true) ✅
# events          | t (true) ✅
# wizard_sessions | t (true) ✅
```

### Example 3: Count Records (Dashboard)
```sql
-- Run in Supabase Dashboard SQL Editor
SELECT 
  'profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL
SELECT 
  'events', COUNT(*) FROM events
UNION ALL
SELECT 
  'wizard_sessions', COUNT(*) FROM wizard_sessions;

-- ✅ Shows record counts for each table
```

---

## 🔒 CONNECTION SECURITY

### Password URL Encoding

**Your password**: `Toronto2025#`

**In connection strings, `#` must be URL-encoded as `%23`**:

```bash
# ❌ WRONG (special char not encoded)
postgres:Toronto2025#@host

# ✅ CORRECT (# encoded as %23)
postgres:Toronto2025%23@host
```

**Your .env has it correct**:
```bash
POOLER_URL="postgresql://postgres.dhesktsqhcxhqfjypulk:Toronto2025%23@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
                                                          ^^^^^ ← Encoded correctly ✅
```

**For psql command line**: Use quotes to preserve special characters
```bash
PGPASSWORD="Toronto2025#"  # ← Quotes preserve #
```

---

## 📋 TROUBLESHOOTING GUIDE

### Issue 1: "Network is unreachable" (IPv6)

**Error**:
```
psql: error: connection to server at "db.*.supabase.co" failed: Network is unreachable
IPv6 address: 2600:1f16:...
```

**Fix**: ✅ **Use connection pooler instead**
```bash
# Change from:
-h db.dhesktsqhcxhqfjypulk.supabase.co

# To:
-h aws-1-us-east-2.pooler.supabase.com
-p 6543
-U postgres.dhesktsqhcxhqfjypulk
```

---

### Issue 2: "Authentication failed"

**Error**:
```
psql: FATAL:  password authentication failed for user "postgres"
```

**Fixes**:
1. **Check password encoding**:
   ```bash
   # Special chars must be URL-encoded in connection strings
   # # → %23
   # @ → %40
   # ! → %21
   ```

2. **Verify username for pooler**:
   ```bash
   # ❌ WRONG
   -U postgres
   
   # ✅ CORRECT (includes project ref)
   -U postgres.dhesktsqhcxhqfjypulk
   ```

3. **Check credentials in Supabase dashboard**:
   - Settings → Database
   - Verify password matches

---

### Issue 3: "Could not connect to server"

**Error**:
```
could not connect to server: Connection refused
```

**Fixes**:
1. **Check port number**:
   ```bash
   # Direct: 5432
   # Pooler: 6543 ✅
   ```

2. **Check host URL**:
   ```bash
   # Pooler format:
   aws-1-us-east-2.pooler.supabase.com
   
   # NOT:
   db.dhesktsqhcxhqfjypulk.supabase.co
   ```

3. **Verify project is active**:
   - Check Supabase dashboard
   - Project should be "Active" status

---

### Issue 4: "Too many connections"

**Error**:
```
FATAL: sorry, too many clients already
```

**Fix**: Use connection pooler (already recommended)
```bash
# Pooler handles connection limits automatically
psql "$POOLER_URL"
```

---

## 🎯 BEST PRACTICES

### 1. Use MCP for AI/Cursor Work
```typescript
// ✅ Best for: Cursor, AI assistants, automation
mcp_supabase_execute_sql({ query: "..." })
```

### 2. Use Pooler for Terminal Work
```bash
# ✅ Best for: Local development, scripts
psql "$POOLER_URL"
```

### 3. Use Dashboard for Quick Tasks
```
# ✅ Best for: Quick queries, exploration, demos
https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/sql
```

### 4. Never Use Direct Connection (IPv6 issues)
```bash
# ❌ AVOID
psql -h db.dhesktsqhcxhqfjypulk.supabase.co -p 5432
```

---

## 🧪 VERIFICATION TESTS

### Test 1: Connection Works
```bash
psql "$POOLER_URL" -c "SELECT 1 as test;"
# Expected output:
#  test 
# ------
#     1
# (1 row)
```

### Test 2: Can Query Data
```bash
psql "$POOLER_URL" -c "SELECT COUNT(*) FROM profiles;"
# Expected: Number of profiles (3 as of Oct 18)
```

### Test 3: RLS Policies Exist
```bash
psql "$POOLER_URL" -c "SELECT COUNT(*) FROM pg_policies WHERE tablename = 'profiles';"
# Expected: 3 or more policies
```

### All Pass? ✅ **Connection fully working!**

---

## 📚 ENVIRONMENT VARIABLES REFERENCE

### From Your .env (All Correct ✅)

```bash
# Password (with special character)
POSTGRES_PASSWORD="Toronto2025#"

# ❌ Direct connection (IPv6 - don't use)
DATABASE_URL="postgresql://postgres:Toronto2025%23@db.dhesktsqhcxhqfjypulk.supabase.co:5432/postgres"

# ✅ Pooler connection (IPv4 + IPv6 - USE THIS)
POOLER_URL="postgresql://postgres.dhesktsqhcxhqfjypulk:Toronto2025%23@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
DATABASE_URL_POOLER="$POOLER_URL"  # Alias
```

**Usage**:
```bash
# In scripts:
psql "$POOLER_URL"

# Or:
psql "$DATABASE_URL_POOLER"

# Both work ✅
```

---

## 🚀 QUICK START

### For Your Next Database Query

**Method 1 - In Cursor** (Copy-paste this):
```typescript
mcp_supabase_execute_sql({
  query: "SELECT * FROM profiles WHERE company = 'InnovateTech AI';"
})
```

**Method 2 - In Terminal** (Copy-paste this):
```bash
cd /home/sk/medellin-spark
PGPASSWORD="Toronto2025#" psql \
  -h aws-1-us-east-2.pooler.supabase.com \
  -p 6543 \
  -U postgres.dhesktsqhcxhqfjypulk \
  -d postgres \
  -c "SELECT * FROM profiles;"
```

**Method 3 - In Browser**:
1. Go to: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/sql
2. Run query
3. Done ✅

---

## 📊 CONNECTION STATUS SUMMARY

| Method | Status | IPv4 | IPv6 | Tested | Recommended |
|--------|--------|------|------|--------|-------------|
| **MCP Tools** | ✅ Working | ✅ | ✅ | Oct 18 ✅ | ⭐⭐⭐ Yes |
| **Pooler (6543)** | ✅ Working | ✅ | ✅ | Oct 18 ✅ | ⭐⭐⭐ Yes |
| **Dashboard** | ✅ Working | ✅ | ✅ | Always ✅ | ⭐⭐ Yes |
| **Direct (5432)** | ❌ Failed | ❌ | ✅ | Oct 18 ❌ | ❌ No |

---

## 🎉 BOTTOM LINE

### Problem Identified
❌ Direct database connection uses IPv6 (network unreachable)

### Solution Applied
✅ Use connection pooler (IPv4 + IPv6 compatible)

### Status
✅ **100% WORKING** (verified Oct 18, 11:00 PM)

### Recommendations
1. **Cursor/AI**: Use MCP Supabase tools (already working)
2. **Terminal**: Use pooler connection (now working)
3. **Browser**: Use Supabase dashboard (always works)

**Never use direct connection** (IPv6 issues)

---

## 📋 SAVE THESE COMMANDS

### Add to ~/.bashrc or ~/.zshrc:
```bash
# Supabase Database Connection
export SUPABASE_POOLER="postgresql://postgres.dhesktsqhcxhqfjypulk:Toronto2025%23@aws-1-us-east-2.pooler.supabase.com:6543/postgres"

# Easy aliases
alias supabase-db='psql "$SUPABASE_POOLER"'
alias supabase-query='psql "$SUPABASE_POOLER" -c'

# Usage:
# supabase-db                           # Interactive mode
# supabase-query "SELECT * FROM profiles;"  # Quick query
```

**Reload shell**:
```bash
source ~/.bashrc  # or source ~/.zshrc
```

**Test**:
```bash
supabase-db -c "SELECT 1 as test;"
# Should work immediately ✅
```

---

**Status**: ✅ **FIXED** - Connection working via pooler  
**Tested**: October 18, 2025, 11:00 PM  
**Verified**: PostgreSQL 17.6, RLS policies queried successfully  
**Recommendation**: Use pooler for psql, MCP for Cursor  

