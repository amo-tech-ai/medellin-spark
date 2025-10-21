# Presentation-AI Local Setup Guide

## Status: ✅ Running Successfully

**URL**: http://localhost:3000
**Date**: 2025-10-13
**Location**: `/home/sk/medellin-spark/reference-presentation-ai`

---

## What Was Done

### 1. Initial Setup
- ✅ Cloned repository from https://github.com/allweonedev/presentation-ai
- ✅ Installed dependencies with `pnpm install` (890 packages)
- ✅ Generated Prisma client

### 2. Authentication Bypass (Temporary)
Since Google OAuth requires proper client credentials, authentication was temporarily disabled for local development.

**Changes Made:**

#### File: `src/middleware.ts`
```typescript
// TEMPORARY: Authentication disabled for local development
// Commented out session checks to allow access without login
```

#### File: `src/server/auth.ts`
```typescript
// Added mock authentication that returns a fake admin session
const mockAuth = async () => {
  return {
    user: {
      id: "local-dev-user",
      name: "Local Dev User",
      email: "dev@localhost",
      hasAccess: true,
      role: "ADMIN",
      isAdmin: true,
    },
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  } as Session;
};

// Use mock for development
export const auth = process.env.NODE_ENV === 'development' ? mockAuth : nextAuthConfig.auth;
```

### 3. Environment Configuration

**File**: `.env`
```env
# Database - PostgreSQL (configured but optional for UI testing)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/presentation_ai?schema=public"

# Next Auth
NEXTAUTH_SECRET="local-development-secret-change-in-production-12345678"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (dummy values for env validation)
GOOGLE_CLIENT_ID="dummy-client-id-for-local-dev"
GOOGLE_CLIENT_SECRET="dummy-client-secret-for-local-dev"

# AI APIs
OPENAI_API_KEY="sk-proj-..." # Real key from main project
TOGETHER_AI_API_KEY="dummy-together-ai-key"

# Optional Services (dummy values)
UPLOADTHING_TOKEN="dummy-uploadthing-token"
UNSPLASH_ACCESS_KEY="dummy-unsplash-key"
TAVILY_API_KEY="dummy-tavily-key"
```

---

## Database Schema

The application uses PostgreSQL with the following tables:

### Core Tables

1. **User** - User profiles
   - id, name, email, password, emailVerified
   - headline, bio, interests, location, website
   - role (ADMIN/USER), hasAccess

2. **Account** - NextAuth authentication
   - OAuth provider accounts (Google)
   - Token management

3. **BaseDocument** - Parent document entity
   - id, title, type, userId
   - thumbnailUrl, isPublic
   - Created/updated timestamps

4. **Presentation** - Core presentation data
   - content (JSON) - slides, theme, layout
   - theme (default/custom)
   - imageSource - AI model for images
   - prompt - original generation prompt
   - presentationStyle - professional/casual
   - language - en-US, es, etc.
   - outline[] - array of topics
   - searchResults (JSON) - research context
   - templateId, customThemeId

5. **CustomTheme** - User-created themes
   - name, description, userId
   - logoUrl, isPublic
   - themeData (JSON) - complete config

6. **FavoriteDocument** - User favorites

7. **GeneratedImage** - AI image history
   - url, prompt, userId

### Document Types Enum
- NOTE, DOCUMENT, DRAWING, DESIGN
- STICKY_NOTES, MIND_MAP, RAG
- RESEARCH_PAPER, FLIPBOOK
- **PRESENTATION**

---

## Key Features Available

### ✅ Working (with OpenAI API key)
- AI-powered presentation generation
- Content generation with OpenAI GPT models
- Multiple layout components:
  - TEXT (paragraphs)
  - BULLETS (lists)
  - HEADING, QUOTE, CALLOUT
  - STEP-BY-STEP, TIMELINE
  - COMPARISON, PROS-CONS
  - TABLE, CHART (bar, pie, line, scatter)
- Customizable slides
- Theme system (9 built-in themes)
- Rich text editing (Plate Editor)
- Drag-and-drop slide reordering

### ⚠️ Limited (dummy keys)
- Together AI image generation
- Unsplash image search
- Tavily web search
- UploadThing file uploads

### ❌ Not Working
- Google OAuth login (bypassed)
- Database persistence (no DB connection)

---

## How to Use

### Access the Application
1. Open browser to: http://localhost:3000
2. You'll be automatically logged in as "Local Dev User" (admin)
3. Navigate to `/presentation` to start

### Create a Presentation
1. Click "New Presentation"
2. Enter a topic/prompt
3. Select number of slides
4. Choose language and style
5. AI will generate outline and slides
6. Edit using the rich text editor
7. Present or export (PDF/PPTX)

### Explore Features
- **Themes**: Try different visual styles
- **Layouts**: Each slide can use different components
- **Editing**: Rich text with images, charts, tables
- **Presentation Mode**: Full-screen presenting

---

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.5.4 with Turbopack
- **Language**: TypeScript
- **UI**: React 19, Radix UI, Tailwind CSS
- **Editor**: Plate Editor (rich text)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js (bypassed for dev)
- **AI**: OpenAI SDK, AI SDK by Vercel
- **Drag & Drop**: DND Kit

### Key Directories
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth endpoints
│   │   └── presentation/  # Generation endpoints
│   ├── presentation/      # Main app UI
│   └── auth/             # Login pages
├── components/            # React components
├── lib/                  # Utilities, helpers
├── server/               # Server-side code
│   ├── auth.ts          # Authentication (modified)
│   └── db.ts            # Prisma client
└── middleware.ts         # Route protection (modified)

prisma/
└── schema.prisma         # Database schema
```

---

## Next Steps for Production

### To Re-enable Full Authentication:
1. Get real Google OAuth credentials from Google Cloud Console
2. Update `.env` with real `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
3. Revert changes to `src/server/auth.ts` (remove mock auth)
4. Revert changes to `src/middleware.ts` (uncomment auth checks)

### To Connect Database:
1. Setup PostgreSQL database
2. Update `DATABASE_URL` in `.env`
3. Run: `pnpm db:push` to create tables
4. Data will persist across sessions

### To Enable Full AI Features:
1. Get Together AI API key (for image generation)
2. Get Tavily API key (for web search)
3. Get Unsplash API key (for stock photos)
4. Get UploadThing token (for file uploads)
5. Update `.env` with real keys

---

## Stopping the Server

```bash
# Find the process
ps aux | grep "next dev"

# Kill by PID or use Ctrl+C in the terminal
```

Or use Claude Code's `KillShell` tool if running in background.

---

## Comparison with Presenton

| Feature | Presentation-AI | Presenton |
|---------|----------------|-----------|
| **Ease of Setup** | ✅ Web app, simpler | ⚠️ Docker required |
| **UI/UX** | ✅ Modern, polished | ⚠️ Basic |
| **Editing** | ✅ Rich editor | ⚠️ Limited |
| **Database** | ✅ Built-in | ⚠️ External |
| **AI Providers** | ⚠️ OpenAI, Together AI | ✅ Multiple (OpenAI, Google, Anthropic, Ollama) |
| **Web Search** | ⚠️ Tavily only | ✅ Built-in |
| **Image Gen** | ⚠️ Together AI | ✅ DALL-E, Gemini |
| **Privacy** | ⚠️ Cloud-first | ✅ Local-first |
| **Export** | ⚠️ PDF (PPTX partial) | ✅ PPTX, PDF |

**Verdict**: Presentation-AI is better for quick UI exploration and understanding modern presentation app architecture. Presenton is better for the Medellin AI project due to superior AI features and privacy control.

---

## Troubleshooting

### Port Already in Use
```bash
# Find what's using port 3000
lsof -ti:3000 | xargs kill -9
```

### Turbopack Warnings
The lockfile warnings are harmless and can be ignored for local development.

### Environment Variable Errors
Ensure all required variables in `.env` have values (even dummy ones).

### Database Connection Errors
The app can run without a database for UI testing. API operations will fail gracefully.

---

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Database operations
pnpm db:push        # Push schema to database
pnpm db:studio      # Open Prisma Studio GUI

# Code quality
pnpm lint           # Lint code
pnpm lint:fix       # Fix linting issues
pnpm check          # Check code with Biome
pnpm check:fix      # Fix code issues
pnpm type           # TypeScript type checking
```

---

## Resources

- **GitHub**: https://github.com/allweonedev/presentation-ai
- **Live Demo**: http://presentation.allweone.com
- **Discord**: https://discord.gg/fsMHMhAHRV
- **Comparison**: See `/docs/presentation/03-compare.md`

---

**Status**: Ready for local development and UI exploration!
**Authentication**: Bypassed with mock admin user
**Server**: Running on http://localhost:3000
