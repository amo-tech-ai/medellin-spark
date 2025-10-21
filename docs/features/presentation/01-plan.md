# Presentation AI Integration Plan

## Overview
Integrate the presentation-ai feature from the reference Next.js project into the existing Vite + React project (medellin-spark).

## Key Differences

### Current Project (medellin-spark)
- **Framework**: Vite + React 18
- **Routing**: React Router DOM
- **Structure**: Client-side SPA
- **Build Tool**: Vite
- **Already Has**: Radix UI, Tailwind CSS, shadcn/ui components

### Reference Project (presentation-ai)
- **Framework**: Next.js 15 (App Router)
- **Routing**: Next.js file-based routing
- **Structure**: Full-stack with API routes
- **Build Tool**: Next.js with Turbo
- **Includes**: Server components, API routes, Prisma database

## Simple Integration Approach

### Phase 1: Dependencies Installation
Add required packages for presentation functionality:
- AI SDK: `ai`, `@ai-sdk/openai`, `@ai-sdk/react`
- Rich Text Editor: `platejs` and all `@platejs/*` packages
- Presentation Tools: `pptxgenjs`, `html2canvas-pro`
- State Management: `zustand`
- Drag & Drop: `@dnd-kit/core`, `@dnd-kit/sortable`
- Additional UI: Missing Radix components, `framer-motion`

### Phase 2: Backend Setup (Choose One Option)

#### Option A: Minimal Backend (Recommended for Quick Start)
- Create simple Express.js server alongside Vite
- Handle AI generation API calls server-side
- Use localStorage/IndexedDB for presentation storage (no database)
- Proxy API routes through Vite dev server

#### Option B: Full Backend (Production-Ready)
- Set up Express.js with Prisma
- Implement PostgreSQL database
- Migrate all API routes from Next.js to Express
- Add authentication (NextAuth replacement)

### Phase 3: Core Components Migration
Copy and adapt these directories:
1. `src/components/presentation/` - All presentation UI components
2. `src/lib/presentation/` - Themes and utilities
3. `src/states/presentation-state.ts` - Zustand state management
4. `src/styles/presentation.css` - Presentation-specific styles

### Phase 4: Routing Setup
Create new routes in React Router:
- `/presentation` - Dashboard/list view
- `/presentation/create` - New presentation wizard
- `/presentation/:id` - Edit presentation
- `/presentation/:id/present` - Presentation mode

### Phase 5: API Integration
- Create API client utilities for AI calls
- Set up environment variables for API keys
- Implement proxy or backend routes for:
  - Outline generation
  - Presentation generation
  - Image generation (if using AI images)

### Phase 6: Plate Editor Integration
- Install Plate.js rich text editor
- Copy editor configuration and plugins
- Adapt for Vite/SPA environment
- Remove Next.js-specific editor features

## Simplified File Structure

```
src/
├── components/
│   ├── presentation/           # From reference project
│   │   ├── dashboard/
│   │   ├── editor/
│   │   ├── outline/
│   │   ├── theme/
│   │   └── utils/
│   ├── plate/                  # Rich text editor
│   └── ui/                     # Existing + new components
├── lib/
│   ├── presentation/
│   │   └── themes.ts
│   └── api/                    # NEW: API client utilities
│       └── presentation.ts
├── pages/
│   └── presentation/           # NEW: Presentation routes
│       ├── Dashboard.tsx
│       ├── Create.tsx
│       ├── Edit.tsx
│       └── Present.tsx
├── states/
│   └── presentation-state.ts   # Zustand store
└── styles/
    └── presentation.css
```

## Configuration Changes

### vite.config.ts
```typescript
// Add proxy for API routes (Option A)
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3001' // Your backend server
    }
  }
})
```

### Environment Variables
```env
# .env
VITE_OPENAI_API_KEY=your_key
VITE_TOGETHER_AI_API_KEY=your_key
# Add other API keys as needed
```

## Migration Strategy

### What to Keep from Reference
✅ All UI components
✅ Presentation logic and state management
✅ Themes system
✅ Editor components
✅ Client-side utilities

### What to Replace/Adapt
🔄 Next.js API routes → Express/Vite proxy
🔄 Server Components → Client Components
🔄 NextAuth → Alternative auth or skip initially
🔄 File-based routing → React Router routes
🔄 Prisma/DB → localStorage or separate backend

### What to Skip Initially
❌ Database (use localStorage)
❌ Authentication (add later)
❌ File uploads (use base64 or skip)
❌ Server-side rendering

## Implementation Steps

1. **Install Dependencies** (1-2 hours)
   - Add all required npm packages
   - Update package.json

2. **Setup Basic Backend** (2-3 hours)
   - Create simple Express server OR
   - Configure Vite proxy for API calls

3. **Copy Core Components** (3-4 hours)
   - Copy presentation components
   - Adapt imports and remove Next.js dependencies

4. **Setup Routes** (1-2 hours)
   - Create React Router routes
   - Add navigation

5. **Integrate Editor** (2-3 hours)
   - Setup Plate.js
   - Configure plugins

6. **Connect AI APIs** (2-3 hours)
   - Create API client
   - Test generation

7. **Testing & Polish** (2-3 hours)
   - Test all features
   - Fix styling issues
   - Optimize performance

**Total Estimated Time**: 13-20 hours

## Potential Challenges

1. **Server-Side Features**: Next.js API routes need backend equivalent
2. **Plate.js Complexity**: Rich text editor may have Next.js dependencies
3. **State Management**: May need adjustments for client-only architecture
4. **Build Size**: Large number of dependencies may increase bundle size

## Recommendations

1. **Start with Option A** (minimal backend) to get working prototype quickly
2. **Use localStorage** for presentations initially instead of database
3. **Skip authentication** in first iteration
4. **Focus on core presentation creation and editing** first
5. **Add advanced features** (themes, export, etc.) incrementally

## Success Criteria

- ✅ Can create new presentations with AI
- ✅ Can edit presentations with rich text editor
- ✅ Can view presentations in presentation mode
- ✅ Themes work correctly
- ✅ No console errors
- ✅ Acceptable performance

## Next Steps

1. Review this plan
2. Decide on backend approach (Option A or B)
3. Create detailed task breakdown
4. Begin implementation with Phase 1
