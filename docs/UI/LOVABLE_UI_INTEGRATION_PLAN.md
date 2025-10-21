# Lovable UI Integration Plan for Presentation AI

## 1) Overview

This plan outlines how to use **Lovable** to generate polished, production-ready UI components for our AI Presentation Generator, then integrate them with our existing Next.js/React codebase. We'll build marketing pages (landing, pricing, about) and app shell components (dashboard, chat, editor views) in Lovable using mock data, then import them page-by-page into our repo. The goal is to speed up UI development while maintaining our existing data layer (Supabase + Prisma), authentication (NextAuth), and AI streaming (Edge Functions). This approach lets us leverage Lovable's design system and rapid prototyping while keeping full control over business logic and data integration.

---

## 2) Route Map

| Path | Type | Purpose | Auth Required |
|------|------|---------|---------------|
| `/` | Public | Marketing landing page with hero, features, CTA | No |
| `/pricing` | Public | Pricing tiers and plan comparison | No |
| `/about` | Public | Team info, mission, story | No |
| `/help` | Public | Documentation, FAQ, tutorials | No |
| `/auth/signin` | Public | Sign in page (Google OAuth) | No |
| `/auth/signup` | Public | Sign up page | No |
| `/app` | Protected | Main dashboard - presentations list, stats | Yes |
| `/app/chat` | Protected | AI chat interface for presentation planning | Yes |
| `/app/presentation/generate` | Protected | Outline generation wizard | Yes |
| `/app/presentation/:id` | Protected | Presentation editor (main workspace) | Yes |
| `/app/presentation/:id/preview` | Protected | Full-screen presentation viewer | Yes |
| `/app/presentation/:id/present` | Protected | Presentation mode with controls | Yes |
| `/app/settings` | Protected | User settings, API keys, preferences | Yes |
| `/app/themes` | Protected | Theme library and custom theme creator | Yes |

---

## 3) Page Plan

### **Landing Page** (`/`)

**Goal:** Convert visitors into users with clear value prop and social proof

**Key Sections:**
- Hero: headline, subheading, CTA button, hero image/video
- Features grid: 6-8 key features with icons
- How it works: 3-step process with visuals
- Testimonials: 3-4 user quotes with avatars
- CTA section: "Start creating for free" with email capture
- Footer: links, social, legal

**Components Used:** `HeroSection`, `FeatureCard`, `ProcessStep`, `TestimonialCard`, `CTABanner`, `Footer`

**Mock Data:**
```json
{
  "hero": {
    "headline": "Create stunning presentations in minutes with AI",
    "subheading": "Transform ideas into professional slides using artificial intelligence",
    "ctaText": "Get Started Free",
    "imageUrl": "/hero-demo.png"
  },
  "features": [
    {"icon": "✨", "title": "AI-Powered", "desc": "Generate complete presentations from a topic"},
    {"icon": "🎨", "title": "9+ Themes", "desc": "Beautiful pre-built themes or create your own"}
  ]
}
```

**Acceptance:**
- [ ] Hero section renders with image and CTA
- [ ] Features display in responsive grid (3 cols desktop, 1 col mobile)
- [ ] All links navigate correctly
- [ ] Page loads under 2s, Lighthouse score ≥90

---

### **Pricing Page** (`/pricing`)

**Goal:** Display pricing tiers clearly with conversion-focused design

**Key Sections:**
- Header: "Simple, transparent pricing"
- Pricing cards: 3 tiers (Free, Pro, Enterprise)
- Feature comparison table
- FAQ accordion
- CTA: "Start your free trial"

**Components Used:** `PricingCard`, `FeatureTable`, `FAQItem`, `CTABanner`

**Mock Data:**
```json
{
  "plans": [
    {
      "name": "Free",
      "price": "$0",
      "features": ["5 presentations/month", "Basic themes", "Community support"],
      "cta": "Get Started"
    },
    {
      "name": "Pro",
      "price": "$19/mo",
      "features": ["Unlimited presentations", "All themes", "Priority support", "Custom themes"],
      "cta": "Start Free Trial",
      "popular": true
    }
  ]
}
```

**Acceptance:**
- [ ] Three pricing cards display side-by-side on desktop
- [ ] "Popular" badge shows on middle tier
- [ ] FAQ accordion expands/collapses smoothly
- [ ] Mobile: cards stack vertically

---

### **Dashboard** (`/app`)

**Goal:** Show user their presentations and quick stats

**Key Sections:**
- Top stats row: total presentations, views, shared count
- Recent presentations grid (thumbnails + metadata)
- "Create New" CTA button (prominent)
- Filter/sort controls: by date, by title
- Pagination controls

**Components Used:** `StatCard`, `PresentationCard`, `FilterBar`, `PaginationControls`, `EmptyState`

**Mock Data:**
```json
{
  "stats": {
    "totalPresentations": 12,
    "totalViews": 340,
    "totalShared": 8
  },
  "presentations": [
    {
      "id": "pres-001",
      "title": "Q4 Business Review",
      "thumbnail": "/thumb-1.jpg",
      "updatedAt": "2025-10-10T14:30:00Z",
      "slideCount": 15,
      "theme": "Modern Blue"
    }
  ]
}
```

**Acceptance:**
- [ ] Stats cards show numbers clearly
- [ ] Presentations grid is responsive (4 cols → 2 → 1)
- [ ] Empty state shows when no presentations exist
- [ ] Filter and pagination work with mock data

---

### **Chat Page** (`/app/chat`)

**Goal:** Let users brainstorm presentation ideas via AI chat

**Key Sections:**
- Sidebar: conversation history list, "New chat" button
- Main area: messages list (user + AI)
- Composer: textarea, send button, attachment button
- Message states: sending indicator, error state, streaming animation

**Components Used:** `ConversationList`, `MessageBubble`, `MessageComposer`, `StreamingIndicator`, `ErrorAlert`

**Mock Data:**
```json
{
  "conversations": [
    {"id": "conv-1", "title": "Marketing Strategy 2025", "updatedAt": "2025-10-14"},
    {"id": "conv-2", "title": "Product Launch Ideas", "updatedAt": "2025-10-12"}
  ],
  "messages": [
    {"id": "msg-1", "role": "user", "content": "Help me create a pitch deck for investors", "timestamp": "14:25"},
    {"id": "msg-2", "role": "assistant", "content": "I'll help you create an investor pitch deck. What's your company about?", "timestamp": "14:25"}
  ]
}
```

**Acceptance:**
- [ ] Conversation list scrolls, shows timestamps
- [ ] Messages display user/AI styling correctly
- [ ] Composer textarea auto-grows
- [ ] Streaming animation renders for AI responses
- [ ] Error state shows retry button

---

### **Outline Generation** (`/app/presentation/generate`)

**Goal:** Multi-step wizard for creating presentation outline

**Key Sections:**
- Progress indicator: steps 1-4
- Step 1: Topic input, slide count selector (5-20), language picker
- Step 2: Page style selector (Professional / Casual)
- Step 3: Web search toggle, model picker
- Step 4: Review outline (editable list), theme picker
- Navigation: Back/Next buttons, "Generate" CTA

**Components Used:** `StepIndicator`, `FormInput`, `SlideCountSlider`, `StyleCard`, `OutlineEditor`, `ThemePicker`

**Mock Data:**
```json
{
  "currentStep": 1,
  "formData": {
    "topic": "Sustainable Energy Solutions",
    "slideCount": 10,
    "language": "en",
    "style": "professional",
    "webSearch": true
  },
  "outline": [
    {"order": 1, "title": "Title Slide", "content": "Sustainable Energy Solutions"},
    {"order": 2, "title": "The Energy Crisis", "content": "Current challenges and statistics"}
  ],
  "themes": [
    {"id": "theme-1", "name": "Modern Blue", "preview": "/theme-blue.jpg"},
    {"id": "theme-2", "name": "Dark Mode", "preview": "/theme-dark.jpg"}
  ]
}
```

**Acceptance:**
- [ ] Progress indicator updates as user navigates steps
- [ ] Form validation shows errors inline
- [ ] Outline items are editable (drag to reorder, edit text)
- [ ] Theme picker shows preview images
- [ ] "Generate" button disabled until all fields valid

---

### **Presentation Editor** (`/app/presentation/:id`)

**Goal:** Main workspace for editing slides and content

**Key Sections:**
- Left sidebar: slide thumbnails, reorderable
- Center canvas: current slide editor (Plate Editor for rich text)
- Right sidebar: theme controls, slide settings
- Top toolbar: save status, undo/redo, present button, share, export
- Bottom: slide navigation (prev/next arrows)

**Components Used:** `SlidePreviewList`, `EditorCanvas`, `ThemePanel`, `Toolbar`, `SlideNavigation`

**Mock Data:**
```json
{
  "presentation": {
    "id": "pres-001",
    "title": "Q4 Business Review",
    "theme": "theme-1",
    "slides": [
      {
        "id": "slide-1",
        "order": 1,
        "layout": "title",
        "content": {
          "title": "Q4 Business Review",
          "subtitle": "October 2025"
        },
        "thumbnail": "/slide-1-thumb.jpg"
      }
    ]
  },
  "currentSlideIndex": 0
}
```

**Acceptance:**
- [ ] Slide thumbnails scroll vertically, show current selection
- [ ] Drag and drop reorders slides
- [ ] Editor canvas renders rich text with formatting toolbar
- [ ] Theme panel updates preview in real-time
- [ ] Auto-save indicator shows "Saving..." then "Saved"
- [ ] Undo/redo buttons enable after edits

---

### **Presentation Viewer** (`/app/presentation/:id/preview`)

**Goal:** Full-screen slide viewer for reviewing before presenting

**Key Sections:**
- Full-screen slide display
- Bottom controls: prev/next arrows, slide counter (3/15), exit button
- Keyboard navigation: arrow keys for slides

**Components Used:** `SlideViewer`, `NavigationControls`

**Mock Data:** (Same slide data as editor)

**Acceptance:**
- [ ] Slides display full-screen without chrome
- [ ] Navigation arrows work (click + keyboard)
- [ ] Slide counter updates correctly
- [ ] Exit button returns to editor
- [ ] Escape key closes viewer

---

### **Settings Page** (`/app/settings`)

**Goal:** User preferences and account management

**Key Sections:**
- Tabs: Profile, API Keys, Preferences, Billing
- Profile: name, email (read-only), avatar upload
- API Keys: OpenAI key, Together AI key (masked input)
- Preferences: language, theme, default slide count
- Billing: current plan, upgrade button, usage stats

**Components Used:** `SettingsTabs`, `FormField`, `MaskedInput`, `PlanCard`, `UsageChart`

**Mock Data:**
```json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "/avatar.jpg",
    "plan": "Pro"
  },
  "apiKeys": {
    "openai": "sk-••••••••••••1234",
    "togetherAi": "••••••••••••5678"
  },
  "preferences": {
    "language": "en",
    "defaultSlideCount": 10,
    "theme": "light"
  },
  "usage": {
    "presentationsThisMonth": 8,
    "limit": 50
  }
}
```

**Acceptance:**
- [ ] Tabs switch content areas
- [ ] Avatar upload shows preview
- [ ] API keys masked except last 4 chars
- [ ] Save button shows loading state
- [ ] Usage chart renders with mock data

---

## 4) Components List

| Component | Props | Used On | Notes |
|-----------|-------|---------|-------|
| `HeroSection` | headline, subheading, ctaText, imageUrl | Landing | Full-width hero with CTA |
| `FeatureCard` | icon, title, description | Landing, About | Icon + text card |
| `PricingCard` | name, price, features[], cta, popular? | Pricing | Card with badge support |
| `StatCard` | label, value, icon, trend? | Dashboard | Shows metric with optional trend arrow |
| `PresentationCard` | id, title, thumbnail, updatedAt, slideCount | Dashboard | Clickable thumbnail card |
| `FilterBar` | options[], onFilterChange | Dashboard | Dropdown filters + sort |
| `ConversationList` | conversations[], activeId, onSelect | Chat | Scrollable sidebar list |
| `MessageBubble` | role, content, timestamp, streaming? | Chat | User/AI message styling |
| `MessageComposer` | onSend, disabled?, attachments? | Chat | Auto-growing textarea + send button |
| `StepIndicator` | currentStep, totalSteps | Outline Gen | Progress dots/numbers |
| `OutlineEditor` | items[], onReorder, onEdit | Outline Gen | Drag-drop editable list |
| `ThemePicker` | themes[], selectedId, onSelect | Outline Gen, Editor | Grid of theme preview cards |
| `SlidePreviewList` | slides[], currentIndex, onSelect | Editor | Vertical thumbnail strip |
| `EditorCanvas` | slideContent, onUpdate | Editor | Plate Editor wrapper for rich text |
| `ThemePanel` | currentTheme, onThemeChange | Editor | Color/font pickers |
| `Toolbar` | saveStatus, onUndo, onRedo, onPresent, onShare, onExport | Editor | Top action bar |
| `SlideViewer` | slide, fullscreen | Viewer | Full-screen slide display |
| `NavigationControls` | currentSlide, totalSlides, onPrev, onNext | Viewer | Bottom nav bar |
| `SettingsTabs` | tabs[], activeTab, onTabChange | Settings | Tab switcher |
| `FormField` | label, type, value, onChange, error? | Settings, Outline Gen | Standard input with label + error |
| `MaskedInput` | value, mask, onChange | Settings | Input with •••• masking |
| `EmptyState` | icon, heading, message, cta? | Dashboard, Chat | Centered empty UI |
| `LoadingSpinner` | size?, color? | All | Loading indicator |
| `ErrorAlert` | message, onRetry? | Chat, Editor | Red alert box with retry |
| `CTABanner` | heading, subheading, buttonText, onCTA | Landing, Pricing | Full-width conversion section |

---

## 5) Data Shapes (Minimal)

### Presentation
```json
{
  "id": "pres-001",
  "title": "Presentation Title",
  "userId": "user-123",
  "theme": "theme-modern-blue",
  "slideCount": 10,
  "thumbnail": "/thumb.jpg",
  "createdAt": "2025-10-01T10:00:00Z",
  "updatedAt": "2025-10-14T15:30:00Z",
  "status": "draft" // draft | published
}
```

### Slide
```json
{
  "id": "slide-001",
  "presentationId": "pres-001",
  "order": 1,
  "layout": "title", // title | content | image-left | image-right | full-image
  "content": {
    "title": "Slide Title",
    "subtitle": "Optional subtitle",
    "body": "Rich text content (Plate JSON)",
    "imageUrl": "/slide-img.jpg"
  },
  "thumbnail": "/slide-thumb.jpg"
}
```

### User
```json
{
  "id": "user-123",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "/avatar.jpg",
  "plan": "pro", // free | pro | enterprise
  "apiKeys": {
    "openai": "sk-...",
    "togetherAi": "..."
  },
  "preferences": {
    "language": "en",
    "defaultSlideCount": 10,
    "theme": "light" // light | dark
  }
}
```

### Message (Chat)
```json
{
  "id": "msg-001",
  "conversationId": "conv-001",
  "role": "user", // user | assistant
  "content": "Message text",
  "timestamp": "2025-10-14T14:25:00Z",
  "streaming": false // true while AI is generating
}
```

### Conversation
```json
{
  "id": "conv-001",
  "userId": "user-123",
  "title": "Conversation Title",
  "updatedAt": "2025-10-14T14:30:00Z",
  "messages": ["msg-001", "msg-002"] // message IDs
}
```

### Theme
```json
{
  "id": "theme-001",
  "name": "Modern Blue",
  "userId": "user-123", // null for built-in themes
  "colors": {
    "primary": "#3B82F6",
    "secondary": "#1E40AF",
    "background": "#FFFFFF",
    "text": "#1F2937"
  },
  "fonts": {
    "heading": "Inter",
    "body": "Inter"
  },
  "preview": "/theme-preview.jpg"
}
```

---

## 6) Style Guide

### Colors
```css
/* Primary Palette */
--primary-500: #3B82F6;
--primary-600: #2563EB;
--primary-700: #1D4ED8;

/* Neutral Palette */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-700: #374151;
--gray-900: #111827;

/* Semantic Colors */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;

/* Dark Mode Overrides */
[data-theme="dark"] {
  --background: #0F172A;
  --text: #F1F5F9;
}
```

### Typography Scale
```css
--font-heading: "Inter", sans-serif;
--font-body: "Inter", sans-serif;
--font-mono: "JetBrains Mono", monospace;

--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Spacing (Tailwind scale)
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
```

### Elevation (Box Shadows)
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### Border Radius
```css
--radius-sm: 0.25rem;  /* 4px */
--radius-md: 0.5rem;   /* 8px */
--radius-lg: 0.75rem;  /* 12px */
--radius-full: 9999px;
```

### Accessibility
- All interactive elements must have `:focus-visible` outline (2px solid primary-500)
- Color contrast ≥4.5:1 for normal text, ≥3:1 for large text (WCAG AA)
- Headings follow logical order (h1 → h2 → h3, no skips)
- All images have alt text (decorative images: alt="")
- Form inputs have associated `<label>` elements
- Keyboard navigation: Tab order matches visual order, Escape closes modals/dropdowns

---

## 7) Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Mixing UI frameworks** (Lovable uses X, we use Y) | Medium | Before generating, check Lovable's defaults. Prefer Radix UI + Tailwind (matches our stack). |
| **Over-installing packages** (Lovable adds 20 deps we don't need) | Low | Review `package.json` after import. Remove unused deps. Use aliases for shared packages. |
| **Big-bang import** (import all pages at once, nothing works) | High | Import pages **one at a time**. Test each page fully before moving to next. Use feature flags if needed. |
| **Auth guards missing** (protected routes accessible without login) | High | Document exact guard logic for each protected route (`/app/*`). Add middleware check after import. |
| **SSE/CORS issues** (streaming AI responses fail in production) | Medium | Test chat streaming early with mock SSE endpoint. Add CORS headers to Edge Functions. Use fallback (polling) for MVP. |
| **Theme conflicts** (Lovable theme vs our existing design tokens) | Medium | Export Lovable CSS variables to separate file. Namespace Lovable tokens (`--lov-primary`) or merge carefully. |
| **Data shape mismatch** (Lovable expects `authorId`, we have `userId`) | Low | Map data shapes in adapter layer. Document all prop renames in "Integration Notes" doc. |
| **Performance regressions** (Lovable bundles heavy libs, LCP spikes) | Medium | Lazy-load Editor and Viewer pages. Analyze bundle size after each import. Set Lighthouse budget (LCP ≤2.5s). |

---

## 8) Quick Checklist (DoD per page)

Use this checklist for each page you import from Lovable:

**Visual & Functional**
- [ ] Page renders correctly on desktop (1920px), tablet (768px), mobile (375px)
- [ ] All interactive elements work (buttons, forms, modals, dropdowns)
- [ ] Loading states display correctly (spinners, skeletons)
- [ ] Empty states render when no data available
- [ ] Error states show actionable messages (with retry button if applicable)

**Data & Integration**
- [ ] Mock data replaced with real data hooks (or clearly marked TODOs)
- [ ] API endpoints/Edge Functions stubbed or connected
- [ ] Data shapes match our schema (adapt if needed)
- [ ] Auth guards applied to protected routes (middleware check)

**Performance**
- [ ] Lighthouse Desktop score ≥90 (Performance, Accessibility, Best Practices)
- [ ] No console errors or warnings
- [ ] Images optimized (WebP, lazy-loaded, responsive)
- [ ] Critical CSS inlined or loaded first

**Accessibility**
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible on all interactive elements
- [ ] Screen reader tested (basic flow with NVDA/VoiceOver)
- [ ] Color contrast ≥4.5:1 (use WebAIM Contrast Checker)
- [ ] Headings in logical order (h1 → h2 → h3)

**Code Quality**
- [ ] No unused imports or dead code
- [ ] TypeScript types added (no `any` types except external libs)
- [ ] Components follow our naming conventions (PascalCase, descriptive)
- [ ] File structure matches existing patterns (`src/components/`, `src/pages/`, etc.)

**Documentation**
- [ ] Props documented for reusable components (JSDoc or README)
- [ ] Integration notes added if data mapping required
- [ ] Route added to route map (if new route)

---

## 9) Next Steps

**Phase 0: Prep (Before Lovable)**
1. Export current style guide tokens (colors, typography, spacing) to Lovable-compatible format
2. Create mock data files for each page (JSON files in `/src/mocks/`)
3. Set up Lovable project with our color palette + font stack (Inter)
4. Document existing component structure (what we keep vs replace)

**Phase 1: Marketing Pages (1 week)**
1. Generate Landing page (`/`) in Lovable
2. Test locally, import into `/src/pages/index.tsx` (or App Router `app/page.tsx`)
3. Replace mock data with CMS content (if applicable) or hardcode
4. Deploy to staging, QA checklist
5. Repeat for Pricing (`/pricing`) and About (`/about`) pages

**Phase 2: App Shell (1 week)**
6. Generate Dashboard (`/app`) in Lovable
7. Connect to Supabase `presentations` table (replace mock data)
8. Add auth guard middleware for `/app/*` routes
9. Test empty state, loading state, error state
10. Generate Settings page (`/app/settings`) and integrate

**Phase 3: Chat & Generation (2 weeks)**
11. Generate Chat page (`/app/chat`) shell in Lovable
12. Integrate streaming AI (Edge Function + SSE or Vercel AI SDK)
13. Test conversation persistence (Supabase `conversations`, `messages` tables)
14. Generate Outline wizard (`/app/presentation/generate`) in Lovable
15. Connect wizard to presentation creation API

**Phase 4: Editor (2 weeks)**
16. Generate Editor page (`/app/presentation/:id`) layout in Lovable
17. Integrate existing Plate Editor components (keep rich text logic, replace shell)
18. Add theme panel (connect to existing theme system)
19. Test auto-save, undo/redo, slide reordering
20. Generate Viewer/Present modes (`/app/presentation/:id/preview`, `/app/presentation/:id/present`)

**Phase 5: Polish & Launch (1 week)**
21. Run Lighthouse audits on all pages, optimize assets
22. Accessibility audit with screen reader (NVDA/VoiceOver)
23. Cross-browser testing (Chrome, Safari, Firefox)
24. Mobile testing on real devices (iOS, Android)
25. Deploy to production, monitor errors (Sentry)

---

## Acceptance Criteria (Project-Level)

**All pages imported and functional:**
- [ ] All routes in Route Map (#2) render without errors
- [ ] Protected routes require authentication (redirect to `/auth/signin` if not logged in)
- [ ] Mock data replaced with real data or clearly marked TODOs

**Performance targets met:**
- [ ] Lighthouse Desktop ≥90 (Performance, Accessibility, Best Practices, SEO)
- [ ] First Contentful Paint (FCP) ≤1.5s
- [ ] Largest Contentful Paint (LCP) ≤2.5s
- [ ] Total Blocking Time (TBT) ≤200ms

**Accessibility standards met:**
- [ ] WCAG 2.1 AA compliance (color contrast, keyboard nav, screen reader)
- [ ] All forms have proper labels and error messages
- [ ] Focus order matches visual order

**Integration complete:**
- [ ] Supabase connected (auth + CRUD for presentations, slides, users)
- [ ] Edge Functions integrated (AI chat, outline generation, slide generation)
- [ ] Theme system functional (9 built-in themes + custom theme creator)
- [ ] File upload works (UploadThing for images)

**Quality checks passed:**
- [ ] No console errors in production build
- [ ] TypeScript build passes (`pnpm type`)
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1920px+)
- [ ] Dark mode toggle works (if applicable)

---

## Conclusion

This plan provides a **clear, step-by-step roadmap** for using Lovable to accelerate UI development while maintaining our existing architecture. By generating pages in Lovable with mock data and importing them incrementally, we reduce risk and ensure each page is production-ready before moving to the next. The key is to **build, test, integrate, repeat** – not to import everything at once.

**Quick Win Strategy:** Start with the Landing page (highest impact, lowest complexity) to validate the workflow, then tackle Dashboard (core app experience), then Editor (most complex). This builds confidence and catches integration issues early.

**Success Metrics:**
- UI development time reduced by 50% (vs building from scratch)
- All pages meet Lighthouse ≥90 target
- Zero critical accessibility issues
- User onboarding to first presentation created ≤5 minutes

Ready to start? Begin with **Phase 0: Prep** and create mock data files. Once you have mocks, generate the Landing page in Lovable and test the import workflow.
