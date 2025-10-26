---
name: commit-helper
description: Generates clear commit messages following project conventions
version: 1.0.0
---

# Commit Helper Skill

## Purpose
Generate commit messages that follow project standards.

## Format

```
<type>: <subject>

<body>

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

## Types
- `feat` - New feature
- `fix` - Bug fix
- `refactor` - Code restructure (no behavior change)
- `docs` - Documentation only
- `test` - Add/update tests
- `chore` - Build/tooling changes
- `security` - Security improvements

## Examples

### Feature Addition
```
feat: Add user authentication flow

- Implement JWT token validation
- Add login/logout endpoints
- Update user profile schema
- Add protected route component

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

### Bug Fix
```
fix: Resolve slide grid loading issue

- Enable RLS policy for public presentations
- Update query to include is_public filter
- Add error handling for missing data

Fixes presentation viewer stuck on loading state.

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

### Security Update
```
security: Move API keys to Edge Functions

- Create OpenAI proxy Edge Function
- Remove VITE_OPENAI_API_KEY from frontend
- Update PitchDeckWizard to use proxy endpoint
- Add server-side key validation

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

## Process

1. **Analyze Changes**
   ```bash
   git diff --staged
   ```

2. **Identify Type**
   - New feature? → `feat`
   - Fixing bug? → `fix`
   - Security? → `security`
   - Cleanup? → `refactor`

3. **Write Subject**
   - Start with verb (Add, Fix, Update, Remove)
   - Keep under 50 characters
   - No period at end

4. **Add Body**
   - Bullet points for key changes
   - Explain WHY not just WHAT
   - Reference issues if applicable

## Usage

Just ask: "Generate commit message" or "What should I commit?"

I'll review staged changes and create a proper message.
