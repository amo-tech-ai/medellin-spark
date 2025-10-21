# Pitch Deck AI - Visual Diagrams

**Purpose**: Visual architecture and flow documentation using Mermaid
**Folder**: `diagrams/` (renamed from `mermaid/`)
**Last Updated**: January 2025

---

## 📊 Available Diagrams

### 1. [User Journey Sequence](./01-user-journey-sequence.md)
**Type**: Sequence Diagram
**Shows**: Complete end-to-end user flow from chat interface to viewing generated slides

**Key Points**:
- Multi-turn conversational AI interaction
- Progressive data collection (0% → 100%)
- OpenAI function calling integration
- Database storage and retrieval
- React UI rendering

**Best for**: Understanding the complete user experience

---

### 2. [System Architecture](./02-system-architecture.md)
**Type**: Architecture Flowchart
**Shows**: Complete tech stack and component relationships

**Key Points**:
- Frontend: React + TypeScript + Vite
- Backend: Supabase Edge Functions (Deno)
- AI Layer: OpenAI GPT-4o
- Database: PostgreSQL with RLS
- Security: Auth + API key management

**Best for**: Understanding system structure and technologies

---

### 3. [Conversation State Machine](./03-conversation-state-machine.md)
**Type**: State Diagram
**Shows**: AI conversation states and transitions

**Key Points**:
- States: Welcome → Collecting → Ready → Generating → Viewing
- Required fields: 6 core data points
- Progress tracking: 17% increments to 100%
- Error handling and recovery states

**Best for**: Understanding AI conversation logic

---

### 4. [Data Flow Diagram](./04-data-flow-diagram.md)
**Type**: Data Flow Flowchart
**Shows**: How data transforms from user input to rendered slides

**Key Points**:
- Natural language → Structured JSONB
- Structured data → AI-generated slides (10 slides)
- Database storage → React components
- JSON schema validation
- Performance optimization

**Best for**: Understanding data transformations

---

### 5. [OpenAI Integration](./05-openai-integration.md)
**Type**: Sequence Diagram (API Integration)
**Shows**: Detailed OpenAI API calls for conversation and generation

**Key Points**:
- Function calling: `save_startup_data` tool
- JSON mode for structured output
- System prompts for both conversation and generation
- Request/response examples
- Cost metrics: $0.20-0.36 per deck

**Best for**: Understanding AI integration details

---

## 🎯 Quick Reference

### System Flow Overview
```
User Input
  ↓
Chat UI (React)
  ↓
Edge Functions (Supabase)
  ↓
OpenAI GPT-4o (AI)
  ↓
PostgreSQL Database
  ↓
React Components
  ↓
Rendered Slides (UI)
```

### Key Technologies

| Layer | Technology |
|-------|-----------|
| **Frontend** | React, TypeScript, Vite, shadcn/ui |
| **Backend** | Supabase Edge Functions (Deno) |
| **AI** | OpenAI GPT-4o (function calling + JSON mode) |
| **Database** | Supabase PostgreSQL with RLS |
| **Security** | JWT authentication, server-side API keys |
| **Deployment** | Vercel (frontend) + Supabase (backend) |

### Performance Metrics

| Metric | Time | Notes |
|--------|------|-------|
| **Conversation Turn** | 2-3s | AI response time |
| **Deck Generation** | 10-15s | 10 slides generation |
| **Total E2E** | 3-5 min | Full conversation + generation |
| **Cost per Deck** | $0.20-0.36 | OpenAI API costs |

### Database Schema

```
pitch_conversations
├── id (UUID) - Primary key
├── profile_id (UUID) - User reference
├── collected_data (JSONB) - 6 required fields
├── completeness (INTEGER) - 0-100%
├── messages (JSONB[]) - Conversation history
└── created_at (TIMESTAMPTZ)

presentations
├── id (UUID) - Primary key
├── profile_id (UUID) - User reference
├── title (TEXT) - Deck title
├── content (JSONB) - 10 slides with bullets
├── outline (TEXT[]) - Slide titles
├── slide_count (INTEGER) - Default: 10
├── status (TEXT) - draft | published
└── is_public (BOOLEAN) - Visibility
```

---

## 📖 Reading Guide

### For New Developers (Start Here)
1. **01-user-journey-sequence.md** - Understand the user flow
2. **02-system-architecture.md** - See all components
3. **03-conversation-state-machine.md** - Understand AI logic
4. **04-data-flow-diagram.md** - See data transformations

### For Backend Developers
1. **05-openai-integration.md** - API integration details
2. **04-data-flow-diagram.md** - Data processing
3. **02-system-architecture.md** - Backend architecture

### For Frontend Developers
1. **01-user-journey-sequence.md** - UI flows
2. **03-conversation-state-machine.md** - UI state management
3. **04-data-flow-diagram.md** - Data for components

### For QA/Testers
1. **01-user-journey-sequence.md** - What to test
2. **03-conversation-state-machine.md** - States to verify
3. **04-data-flow-diagram.md** - Data validation points

---

## 🔧 Viewing Mermaid Diagrams

### In VS Code
Install extension: **Markdown Preview Mermaid Support**
```
code --install-extension bierner.markdown-mermaid
```

### Online Editors
- **Mermaid Live**: https://mermaid.live/
- **Official Editor**: https://mermaid-js.github.io/mermaid-live-editor/

### In GitHub/GitLab
Mermaid renders natively in Markdown files (no setup needed)

### In Documentation Sites
Most platforms (Notion, Confluence, GitBook) support Mermaid rendering

---

## 📚 Related Documentation

### Implementation Docs
- **Main Docs**: `../docs/` - Complete implementation guide (01-08)
- **START-HERE**: `../docs/START-HERE.md` - Entry point for developers

### Research
- **Research**: `../research/` - AI solutions analysis
- **Quick Ref**: `../research/QUICK_REFERENCE.md` - Decision matrix

### Tasks
- **Tasks**: `../tasks/` - Active implementation tasks
- **Progress**: `../tasks/000-PRODUCTION-PROGRESS-TRACKER.md`

---

## 🎨 Diagram Conventions

### Colors (if rendered)
- **Blue**: User actions
- **Green**: Successful operations
- **Orange**: AI/LLM operations
- **Red**: Error states
- **Gray**: Database/storage

### Shapes
- **Rectangles**: Processes/Functions
- **Diamonds**: Decisions
- **Circles**: States
- **Cylinders**: Databases
- **Actors**: Users/Systems

---

## 📝 Maintenance Notes

**Adding New Diagrams**:
1. Create file: `06-new-diagram-name.md`
2. Use Mermaid syntax (see existing files)
3. Add entry to this README
4. Link from relevant docs

**Updating Diagrams**:
1. Edit the `.md` file directly
2. Test in Mermaid Live Editor
3. Update "Last Updated" date
4. Commit changes

**Best Practices**:
- Keep diagrams focused (one concept per diagram)
- Use clear, descriptive labels
- Add comments in Mermaid code for complex sections
- Include key metrics where relevant

---

## 🚀 Quick Start

### View All Diagrams
```bash
cd /home/sk/medellin-spark/mvp/pitch-deck/diagrams

# List all diagrams
ls -la *.md

# View in terminal (if you have glow or similar)
glow 01-user-journey-sequence.md

# Or open in VS Code
code .
```

### Generate Images (Optional)
```bash
# Install mermaid-cli
npm install -g @mermaid-js/mermaid-cli

# Generate PNG
mmdc -i 01-user-journey-sequence.md -o 01-user-journey.png

# Generate SVG
mmdc -i 02-system-architecture.md -o 02-architecture.svg
```

---

**Total Diagrams**: 5
**Coverage**: Full system (user journey, architecture, states, data, AI)
**Format**: Mermaid markdown
**Status**: ✅ Complete and up-to-date

---

**Note**: This folder will be renamed from `mermaid/` to `diagrams/` for better clarity.

**Last Updated**: January 2025
**Maintained By**: Medellin Spark Development Team
