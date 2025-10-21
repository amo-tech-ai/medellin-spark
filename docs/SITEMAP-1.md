# Medellin Spark - Application Sitemap

**Last Updated:** October 20, 2025  
**Platform:** AI-Powered Pitch Deck Generator  
**Focus:** Help founders create professional pitch decks in minutes

---

## 📊 Overview

**Medellin Spark** is a focused pitch deck generation platform with AI-powered assistance.

- **Core Feature:** Conversational AI wizard that generates 10-slide pitch decks
- **Total Pages:** ~10 pages (lean and focused)
- **Tech Stack:** React + TypeScript + Supabase + OpenAI
- **User Journey:** Chat → Generate → Edit → Present

---

## 🗺️ Complete Site Map

### 🌐 PUBLIC PAGES

```
/                           Home Page
├── Hero with demo video
├── Feature highlights
├── Example pitch decks
└── CTA: "Generate Your Deck"

/auth                       Authentication
├── Login (email/password)
├── Sign up
├── Password reset
└── OAuth (Google, GitHub)

/pitch-deck                 Pitch Deck Landing
├── How it works
├── Template examples
├── Pricing (if applicable)
└── CTA: "Start Creating"
```

---

### 🔐 AUTHENTICATED PAGES

#### Main Dashboard
```
/dashboard                  User Dashboard
├── Quick stats
│   ├── Total pitch decks: X
│   ├── Recently edited: X
│   └── Shared decks: X
├── Quick actions
│   ├── Create new deck
│   └── View all decks
└── Recent presentations (last 5)
```

#### Pitch Deck Wizard
```
/pitch-deck-wizard          AI Chat Interface
├── Conversational UI
│   ├── AI assistant messages
│   ├── User input field
│   ├── Progress bar (0-100%)
│   └── Data collected sidebar
├── Information gathering
│   ├── Company name
│   ├── Problem statement
│   ├── Solution description
│   ├── Target market
│   ├── Business model
│   ├── Team info
│   └── Financial projections
└── Generate button (appears at 80%+)
```

#### Presentation Management
```
/dashboard/pitch-decks      My Presentations
├── Grid view of all decks
├── Filters (all, recent, shared, draft)
├── Search functionality
├── Actions (edit, duplicate, delete, share)
└── Create new deck button

/dashboard/settings         Account Settings
├── Profile information
├── Account preferences
└── Delete account
```

#### Presentation Editor
```
/presentations/:id/outline  Slide Grid View
├── 10-slide thumbnail grid
│   ├── Slide 1: Title/Company
│   ├── Slide 2: Problem
│   ├── Slide 3: Solution
│   ├── Slide 4: Market Size
│   ├── Slide 5: Business Model
│   ├── Slide 6: Traction
│   ├── Slide 7: Team
│   ├── Slide 8: Competition
│   ├── Slide 9: Financials
│   └── Slide 10: Ask/Contact
├── Click to edit individual slides
├── Drag to reorder
└── Export options

/presentations/:id/edit     Slide Detail Editor
├── Full slide canvas
├── Content editor (title, body, bullet points)
├── Layout selector
├── Image upload
├── Navigation (prev/next slide)
└── Save/publish buttons

/presentations/:id/view     Presentation Viewer
├── Full-screen mode
├── Slide navigation (keyboard arrows)
├── Speaker notes (optional)
├── Export options (PDF, PPTX)
└── Share link generator
```

---

## 🗄️ Database Schema (Simplified)

```sql
profiles
├── id (UUID, references auth.users)
├── full_name
├── email
├── avatar_url
└── created_at

presentations
├── id (UUID)
├── profile_id (FK → profiles)
├── title
├── status (draft, published, archived)
├── is_public (boolean)
├── slides (JSONB, 10 slides)
└── created_at

pitch_conversations
├── id (UUID)
├── profile_id (FK → profiles)
├── messages (JSONB array)
├── collected_data (JSONB)
├── completeness (0-100)
└── created_at

custom_themes (optional)
├── id (UUID)
├── profile_id (FK → profiles)
├── theme_data (JSONB)
└── created_at

favorite_presentations (optional)
├── id (UUID)
├── profile_id (FK → profiles)
├── presentation_id (FK → presentations)
└── favorited_at
```

**Security:** ✅ Row Level Security (RLS) enabled on all tables

---

## 🔄 Primary User Journey

```
1. Land on homepage → /
2. Click "Generate Your Deck" → /auth (if not logged in)
3. Complete sign up/login
4. Redirect to wizard → /pitch-deck-wizard
5. Chat with AI
   ├── AI asks: "What's your company name?"
   ├── User: "Acme Corp"
   ├── AI asks: "What problem do you solve?"
   ├── User: "We help X do Y faster"
   ├── ... (5-8 exchanges)
   └── Progress: 0% → 100%
6. Click "Generate Deck"
7. AI creates 10-slide presentation (5-10 seconds)
8. Redirect to outline → /presentations/:id/outline
9. Review slide grid
10. Edit slides → /presentations/:id/edit
11. Present or export → /presentations/:id/view
```

**Total time:** 5-10 minutes from signup to finished deck

---

## 🎨 Navigation

### Public Navbar
```
Logo: Medellin Spark
├── Features
├── Examples
├── Pricing (optional)
└── [CTA] Get Started → /auth
```

### Authenticated Navbar
```
Logo: Medellin Spark
├── Dashboard → /dashboard
├── My Decks → /dashboard/pitch-decks
├── Create New → /pitch-deck-wizard
└── [Profile Menu]
    ├── Settings → /dashboard/settings
    └── Sign Out
```

---

## 🚀 Key Features

### AI Wizard
- Conversational interface (Claude/GPT-4)
- Progressive data collection
- Real-time completeness tracking
- Context-aware questions
- Smart content generation

### Presentation Editor
- 10-slide standard structure
- Visual grid editor
- Drag-and-drop reordering
- Individual slide editing
- Export to PDF/PPTX

### Security
- Row Level Security (RLS) on all tables
- API keys server-side only
- JWT authentication
- Protected routes

---

## 📊 Platform Stats

- **Pages:** ~10 focused pages
- **Database Tables:** 5 core tables
- **Slides per Deck:** 10 slides (standard pitch deck)
- **Generation Time:** 5-10 seconds
- **AI Models:** OpenAI GPT-4o-mini + Claude (optional)

---

## 🎯 Future Enhancements (Not Yet Built)

- [ ] Template marketplace
- [ ] Collaboration features
- [ ] Presentation analytics
- [ ] Custom branding/themes
- [ ] AI image generation
- [ ] Multi-language support

---

## 📐 Technical Stack

```
Frontend:
├── React 18 + TypeScript
├── Vite (build tool)
├── React Router v6
├── Tailwind CSS + shadcn/ui
└── React Query (state management)

Backend:
├── Supabase (PostgreSQL + Auth)
├── Edge Functions (Deno runtime)
└── Row Level Security (RLS)

AI:
├── OpenAI API (GPT-4o-mini)
└── Streaming responses (SSE)

Deployment:
├── Vercel/Netlify (frontend)
└── Supabase (backend)
```

---

## 🔐 Security & Permissions

- ✅ RLS enabled on all tables
- ✅ Users can only access their own data
- ✅ Public presentations available via share link
- ✅ API keys server-side only (Edge Functions)
- ✅ No secrets in frontend code

---

## 📱 Responsive Design

- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

---

**Document Version:** 2.0 (Corrected)  
**Last Updated:** October 20, 2025  
**Next Review:** Monthly

---

*This sitemap reflects the **actual** Medellin Spark application as implemented in the codebase.*
