# 🔐 TASK 2: SECURITY FIXES - API KEY ROTATION

**Priority**: 🔴 CRITICAL - SECURITY VULNERABILITY
**Estimated Time**: 30-45 minutes
**Dependencies**: None (can run in parallel with Task 1)
**Status**: 🔴 NOT STARTED

---

## 🎯 OBJECTIVE

Rotate all exposed API keys, remove them from Git history, and implement proper secrets management to prevent future exposure.

---

## ⚠️ SEVERITY ASSESSMENT

```mermaid
graph LR
    A[Exposed Keys] --> B[Security Risk]
    B --> C[Unauthorized Usage]
    B --> D[Cost Overruns]
    B --> E[Data Breach]

    C --> F[💰 Financial Impact]
    D --> F
    E --> G[📉 Reputation Damage]

    style A fill:#FF6B6B
    style B fill:#FF6B6B
    style C fill:#FFB6C1
    style D fill:#FFB6C1
    style E fill:#FFB6C1
    style F fill:#FF0000
    style G fill:#FF0000
```

### Exposed Credentials:

| Service | Key Type | Exposed In | Risk Level |
|---------|----------|------------|------------|
| OpenAI | API Key | `.env` (Git) | 🔴 CRITICAL |
| Anthropic | API Key | `.env` (Git) | 🔴 CRITICAL |
| GitHub | Personal Token | `.env` (Git) | 🔴 CRITICAL |
| Perplexity | API Key | `.env` + `.mcp.json` | 🔴 CRITICAL |
| Browserbase | API Key | `.env` (Git) | 🟡 HIGH |
| Supabase | Service Key | `.env` (Git) | 🟡 HIGH |

---

## 🔧 STEP-BY-STEP INSTRUCTIONS

### PHASE 1: GENERATE NEW API KEYS (15 minutes)

#### Step 1.1: OpenAI API Key

**Action**:
1. Go to: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Name: "MDE-Production-Oct2025"
4. Copy the key immediately (starts with `sk-proj-`)
5. Save to password manager or secure note

**Old Key to Revoke**: `sk-proj-XXXXXXXXXXXXXXXXXXXX...` (redacted - already exposed)

**Verification**:
```bash
# Test new key (replace NEW_KEY with your actual key)
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer NEW_KEY" \
  | jq '.data[0].id'

# Expected: Returns a model ID like "gpt-4" or "gpt-3.5-turbo"
```

---

#### Step 1.2: Anthropic API Key

**Action**:
1. Go to: https://console.anthropic.com/settings/keys
2. Click "Create Key"
3. Name: "MDE-Production-Oct2025"
4. Copy the key (starts with `sk-ant-`)
5. Save securely

**Old Key to Revoke**: `sk-ant-api03-XXXXXXXXXXXXXXXXXXXX...` (redacted - already exposed)

**Verification**:
```bash
# Test new key
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: NEW_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-3-sonnet-20240229",
    "max_tokens": 10,
    "messages": [{"role": "user", "content": "Hi"}]
  }'

# Expected: Returns a response with "content" field
```

---

#### Step 1.3: GitHub Personal Access Token

**Action**:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Classic"
3. Name: "MDE-Production-Oct2025"
4. Select scopes: `repo`, `workflow`
5. Generate and copy token (starts with `ghp_`)
6. Save securely

**Old Token to Revoke**: `ghp_XXXXXXXXXXXXXXXXXXXX` (redacted - already exposed)

**Verification**:
```bash
# Test new token
curl -H "Authorization: token NEW_TOKEN" \
  https://api.github.com/user \
  | jq '.login'

# Expected: Returns your GitHub username
```

---

#### Step 1.4: Perplexity API Key

**Action**:
1. Go to: https://www.perplexity.ai/settings/api
2. Click "Generate API Key"
3. Name: "MDE-Production-Oct2025"
4. Copy the key (starts with `pplx-`)
5. Save securely

**Old Key to Revoke**: `pplx-XXXXXXXXXXXXXXXXXXXX` (redacted - already exposed)

**Verification**:
```bash
# Test new key
curl -X POST https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer NEW_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.1-sonar-small-128k-online",
    "messages": [{"role": "user", "content": "Test"}]
  }'

# Expected: Returns a response
```

---

### PHASE 2: UPDATE ENVIRONMENT FILES (10 minutes)

#### Step 2.1: Create New .env File

```bash
cd /home/sk/mde

# Backup old .env
cp .env .env.backup.$(date +%Y%m%d_%H%M%S)

# Create new .env with NEW keys
cat > .env << 'EOF'
# ===============================
# AI API Keys (Server-side only)
# ===============================
ANTHROPIC_API_KEY=sk-ant-YOUR-NEW-KEY-HERE
OPENAI_API_KEY=sk-proj-YOUR-NEW-KEY-HERE
PERPLEXITY_API_KEY=pplx-YOUR-NEW-KEY-HERE
GOOGLE_API_KEY=AIzaSyC19HA8VHT3UvFRdix15MOKWz4JlZ1JAAU

# ===============================
# GitHub & Development
# ===============================
GITHUB_TOKEN=ghp_YOUR-NEW-TOKEN-HERE

# ===============================
# Browserbase (Keep if still valid)
# ===============================
BROWSERBASE_API_KEY=bb_live_xNh1A6nP82Ij-4xauelETiBf8aM

# ===============================
# Ollama Cloud (Keep if still valid)
# ===============================
OLLAMA_API_KEY="fd282544f2c8434abf2bd13a9ceb905d.XVHqHOrmSKgjzVWEj4T41iNI"

# ===============================
# Supabase Configuration
# ===============================
SUPABASE_PROJECT_ID=dhesktsqhcxhqfjypulk
SUPABASE_PROJECT_URL=https://dhesktsqhcxhqfjypulk.supabase.co

# Frontend (VITE_ prefix - safe to expose)
VITE_SUPABASE_URL=https://dhesktsqhcxhqfjypulk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoZXNrdHNxaGN4aHFmanlwdWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzI2MDAsImV4cCI6MjA3NTg0ODYwMH0.QhghX_Q9DldGn4twxetnAL3mPbLEbvBgSx7ZQpWFFr4
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_yASYrPRGycLVpQWdkLroYA_XaKVefBB

# Server-only (NEVER prefix with VITE)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoZXNrdHNxaGN4aHFmanlwdWxrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDI3MjYwMCwiZXhwIjoyMDc1ODQ4NjAwfQ.ot2S4LypqUmGvweP67OnAZNU5q6ou5n3GEzOWEk7Q9g
SUPABASE_JWT_SECRET=c0ql7t3XBHb9H8MqlsHqLhnrFECI35H6uvvzATgNG83CaFxiFUjBMnoAS0WdQs/CotCKjP2ePJhV2YzX/+cu2Q==
SUPABASE_PUBLISHABLE_KEY=sb_publishable_yASYrPRGycLVpQWdkLroYA_XaKVefBB
SUPABASE_SECRET_KEY=sb_secret_r-bp2n8594chaaGSiG-NTw_pvHyFsPQ
SUPABASE_JWT_CURRENT_KID=0a622fde-be7e-43fa-867f-e31241b28f38
SUPABASE_JWT_STANDBY_KID=73f63063-1789-4774-b9f4-87b1db3d569f
SUPABASE_ACCESS_TOKEN=sbp_dab62de9ab83ca53e157a7eb7baabd6c0fc51809

# Database Connections
SUPABASE_DB_URL_DIRECT=postgresql://postgres:Toronto2025%23@db.dhesktsqhcxhqfjypulk.supabase.co:5432/postgres
SUPABASE_DB_URL_POOLER=postgresql://postgres.dhesktsqhcxhqfjypulk:Toronto2025%23@aws-1-us-east-2.pooler.supabase.com:6543/postgres

# ===============================
# Blaxel Configuration
# ===============================
VITE_BLAXEL_ENDPOINT=http://localhost:1339
EOF

# NOW: Replace YOUR-NEW-KEY-HERE with actual new keys
nano .env
```

**Manual Edits Required**:
1. Replace `sk-ant-YOUR-NEW-KEY-HERE` with new Anthropic key
2. Replace `sk-proj-YOUR-NEW-KEY-HERE` with new OpenAI key
3. Replace `pplx-YOUR-NEW-KEY-HERE` with new Perplexity key
4. Replace `ghp_YOUR-NEW-TOKEN-HERE` with new GitHub token

---

#### Step 2.2: Update .mcp.json (Remove Hardcoded Key)

```bash
cd /home/sk/mde

# Backup
cp .mcp.json .mcp.json.backup.$(date +%Y%m%d_%H%M%S)

# Edit to remove hardcoded key
cat > .mcp.json << 'EOF'
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
      "args": [
        "-y",
        "@modelcontextprotocol/server-perplexity"
      ],
      "env": {
        "PERPLEXITY_API_KEY": "${PERPLEXITY_API_KEY}"
      }
    },
    "desktop-commander": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@wonderwhy-er/desktop-commander@latest"
      ],
      "env": {}
    },
    "supabase": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-supabase"
      ],
      "env": {
        "SUPABASE_URL": "${SUPABASE_PROJECT_URL}",
        "SUPABASE_SERVICE_ROLE_KEY": "${SUPABASE_SERVICE_ROLE_KEY}"
      }
    },
    "linear": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.linear.app/sse"]
    }
  }
}
EOF
```

**Key Change**: `"PERPLEXITY_API_KEY": "${PERPLEXITY_API_KEY}"` now references environment variable instead of hardcoded value.

---

### PHASE 3: SECURE GIT REPOSITORY (15 minutes)

#### Step 3.1: Add .env to .gitignore

```bash
cd /home/sk/mde

# Check if .gitignore exists
cat .gitignore | grep "\.env"

# If not present, add it
cat >> .gitignore << 'EOF'

# Environment variables (NEVER commit these)
.env
.env.*
!.env.example
template-copilot-kit-py/.env
template-copilot-kit-py/.env.*

# MCP configuration (may contain secrets)
.mcp.json.backup.*

# Backup files
*.backup.*
EOF
```

**Verification**:
```bash
git check-ignore .env
# Expected: .env (confirms it's ignored)
```

---

#### Step 3.2: Remove .env from Git History

```bash
cd /home/sk/mde

# Stop tracking .env
git rm --cached .env
git rm --cached template-copilot-kit-py/.env 2>/dev/null || true

# Commit the removal
git add .gitignore
git commit -m "security: remove exposed API keys and credentials from Git

- Remove .env from tracking
- Add comprehensive .gitignore rules
- Rotated all exposed API keys (OpenAI, Anthropic, GitHub, Perplexity)
- Updated .mcp.json to use environment variables

BREAKING CHANGE: API keys have been rotated. Update your local .env file.
"
```

**Verification**:
```bash
git ls-files | grep "\.env"
# Expected: No output (file not tracked)
```

---

#### Step 3.3: Create .env.example (Template)

```bash
cd /home/sk/mde

cat > .env.example << 'EOF'
# ===============================
# AI API Keys (Server-side only)
# ===============================
ANTHROPIC_API_KEY=sk-ant-your-key-here
OPENAI_API_KEY=sk-proj-your-key-here
PERPLEXITY_API_KEY=pplx-your-key-here
GOOGLE_API_KEY=your-key-here

# ===============================
# GitHub & Development
# ===============================
GITHUB_TOKEN=ghp_your-token-here

# ===============================
# Browserbase
# ===============================
BROWSERBASE_API_KEY=bb_live_your-key-here

# ===============================
# Ollama Cloud
# ===============================
OLLAMA_API_KEY=your-key-here

# ===============================
# Supabase Configuration
# ===============================
SUPABASE_PROJECT_ID=your-project-id
SUPABASE_PROJECT_URL=https://your-project.supabase.co

# Frontend (VITE_ prefix - safe to expose)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key

# Server-only (NEVER prefix with VITE)
SUPABASE_SERVICE_ROLE_KEY=your-service-key
SUPABASE_JWT_SECRET=your-jwt-secret
SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SECRET_KEY=your-secret-key
SUPABASE_ACCESS_TOKEN=your-access-token

# Database Connections
SUPABASE_DB_URL_DIRECT=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
SUPABASE_DB_URL_POOLER=postgresql://postgres.your-project:password@pooler.supabase.com:6543/postgres

# ===============================
# Blaxel Configuration
# ===============================
VITE_BLAXEL_ENDPOINT=http://localhost:1339
EOF

git add .env.example
git commit -m "docs: add .env.example template for environment variables"
```

---

### PHASE 4: REVOKE OLD KEYS (10 minutes)

#### Step 4.1: Revoke OpenAI Key

1. Go to: https://platform.openai.com/api-keys
2. Find key ending in `...YQkkA`
3. Click "Revoke"
4. Confirm revocation

**Verification**: Try using old key (should fail)
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer OLD_KEY"
# Expected: 401 Unauthorized
```

---

#### Step 4.2: Revoke Anthropic Key

1. Go to: https://console.anthropic.com/settings/keys
2. Find key ending in `...x2qAAA`
3. Click "Delete"
4. Confirm deletion

---

#### Step 4.3: Revoke GitHub Token

1. Go to: https://github.com/settings/tokens
2. Find token ending in `...4PxbJy`
3. Click "Delete"
4. Confirm deletion

---

#### Step 4.4: Revoke Perplexity Key

1. Go to: https://www.perplexity.ai/settings/api
2. Find key ending in `...GWWPzb`
3. Click "Revoke"
4. Confirm revocation

---

## ✅ SUCCESS CRITERIA

### Must Complete ALL:

- [ ] New OpenAI API key generated
- [ ] New Anthropic API key generated
- [ ] New GitHub token generated
- [ ] New Perplexity API key generated
- [ ] All new keys tested and working
- [ ] `.env` file updated with new keys
- [ ] `.mcp.json` updated to use env vars
- [ ] `.env` added to `.gitignore`
- [ ] `.env` removed from Git tracking
- [ ] `.env.example` created and committed
- [ ] Changes committed to Git
- [ ] Old OpenAI key revoked
- [ ] Old Anthropic key revoked
- [ ] Old GitHub token revoked
- [ ] Old Perplexity key revoked

### Final Verification:

```bash
cd /home/sk/mde

echo "🔐 SECURITY VERIFICATION TEST"
echo "=" * 50

# Test 1: .env not tracked
if git ls-files | grep -q "\.env"; then
    echo "❌ .env still tracked in Git"
    exit 1
else
    echo "✅ .env not tracked in Git"
fi

# Test 2: .env.example exists
if [ -f .env.example ]; then
    echo "✅ .env.example exists"
else
    echo "❌ .env.example missing"
    exit 1
fi

# Test 3: .env has new keys
if grep -q "sk-proj-vPw_BRxQ" .env 2>/dev/null; then
    echo "❌ OLD OpenAI key still in .env!"
    exit 1
else
    echo "✅ Old keys removed from .env"
fi

# Test 4: .mcp.json doesn't have hardcoded key
if grep -q "pplx-Zlod6xf" .mcp.json 2>/dev/null; then
    echo "❌ Hardcoded key still in .mcp.json!"
    exit 1
else
    echo "✅ .mcp.json uses environment variables"
fi

# Test 5: New keys work
export $(cat .env | xargs)
if [ -z "$OPENAI_API_KEY" ] || [ -z "$ANTHROPIC_API_KEY" ]; then
    echo "❌ New keys not loaded from .env"
    exit 1
else
    echo "✅ New keys loaded successfully"
fi

echo "=" * 50
echo "🎉 ALL SECURITY CHECKS PASSED!"
echo "✅ TASK 2 COMPLETE"
```

---

## 🚨 CRITICAL WARNINGS

### ⚠️ DO NOT:

- ❌ Commit `.env` file to Git
- ❌ Share API keys in Slack/Discord/Email
- ❌ Use old keys after rotation
- ❌ Store keys in code files
- ❌ Leave keys in screenshots

### ✅ DO:

- ✅ Use password manager for keys
- ✅ Keep `.env` local only
- ✅ Revoke old keys immediately
- ✅ Test new keys before revoking old ones
- ✅ Document key rotation in commits

---

## 📊 SECURITY CHECKLIST

```mermaid
graph TD
    A[Start Security Fixes] --> B{Old Keys Exposed?}
    B -->|Yes| C[Generate New Keys]
    B -->|No| Z[Skip Task]

    C --> D[Test New Keys]
    D --> E{Keys Work?}
    E -->|No| C
    E -->|Yes| F[Update .env]

    F --> G[Update .mcp.json]
    G --> H[Add to .gitignore]
    H --> I[Remove from Git]
    I --> J[Create .env.example]
    J --> K[Commit Changes]
    K --> L[Revoke Old Keys]
    L --> M[Verify Old Keys Invalid]
    M --> N{All Verified?}
    N -->|No| O[Debug Issues]
    O --> M
    N -->|Yes| P[✅ COMPLETE]

    style A fill:#90EE90
    style P fill:#90EE90
    style C fill:#FFD700
    style L fill:#FF6B6B
    style M fill:#FFD700
```

---

## 📝 PROOF OF COMPLETION

### Required Evidence:

1. **Screenshot**: Verification test output showing all ✅
2. **Git Log**: Commit showing .env removal
3. **Service Screenshots**:
   - OpenAI dashboard showing new key
   - Anthropic dashboard showing new key
   - GitHub tokens page showing new token
   - Perplexity settings showing new key

### Verification Log:

```bash
# Save verification output
cd /home/sk/mde
bash -c "$(cat << 'VERIF'
echo '🔐 TASK 2 SECURITY VERIFICATION'
echo '================================'
echo ''
echo 'Test 1: .env not in Git'
! git ls-files | grep -q '\.env' && echo '✅ PASS' || echo '❌ FAIL'
echo ''
echo 'Test 2: .env.example exists'
[ -f .env.example ] && echo '✅ PASS' || echo '❌ FAIL'
echo ''
echo 'Test 3: No hardcoded keys in .mcp.json'
! grep -q 'pplx-' .mcp.json && echo '✅ PASS' || echo '❌ FAIL'
echo ''
echo 'Test 4: .gitignore includes .env'
grep -q '\.env' .gitignore && echo '✅ PASS' || echo '❌ FAIL'
echo ''
echo '================================'
echo '✅ TASK 2 VERIFICATION COMPLETE'
VERIF
)" | tee /home/sk/mde/pitch-deck/tasks/logs/task-02-verification.log
```

---

**Task Created**: October 26, 2025
**Priority**: 🔴 CRITICAL
**Security Impact**: HIGH
**Estimated Time**: 30-45 minutes

---

**⚠️ START THIS TASK IMMEDIATELY** - Exposed keys are a serious security risk!

Once complete, proceed to **TASK-03-DATABASE-MODULE.md**
