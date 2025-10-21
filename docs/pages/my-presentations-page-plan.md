# My Presentations Page - Implementation Plan

**Date**: January 13, 2025
**Reference**: Slidebean "My Presentations" interface
**Location**: `/home/sk/medellin-spark/main/pages`
**Design System**: Medellin AI (Soft Intelligence)

---

## 📸 Screenshot Analysis: Slidebean "My Presentations"

### Key UI Patterns Identified:

1. **Greeting Header**: "Good morning, You're ready to start your first presentation"
2. **Creation Options (4 cards)**:
   - Pitch deck with AI (Beta badge)
   - Use a template
   - Blank presentation
   - Startup budgeting
3. **Template Library Section**: "Here are some recommended templates to get you started"
4. **Grid Layout**: 4 columns of presentation cards (desktop)
5. **Presentation Cards** with:
   - Large thumbnail/cover image
   - Title
   - Creator/source attribution
   - Usage stats (585.1k uses)
   - Like count (4.2k likes)
   - Lock icon (premium templates)
6. **Sidebar Navigation**: Dashboard, My Presentations, Presentation Templates, Investor Finder, etc.
7. **Browse More** button at the end

---

## 🎯 Medellin AI Adaptation

### Page Structure for Medellin AI

```
┌─────────────────────────────────────────────────────────┐
│ Header: Good [morning/afternoon/evening], [Name]!      │
│         You have 3 presentations. Last edited 2h ago.   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ CREATE NEW                                               │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────┐│
│ │ 🤖 AI      │ │ 📋 Template│ │ ⬜ Blank  │ │ 📊 Budget││
│ │ Generate   │ │ Library    │ │ Start     │ │ Forecast ││
│ │ Pitch Deck │ │            │ │ Fresh     │ │          ││
│ └────────────┘ └────────────┘ └────────────┘ └────────┘│
│                                                          │
│ MY PRESENTATIONS (3)              [Sort: Recent ▼]      │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│ │ Cover img  │ │ Cover img  │ │ Cover img  │          │
│ │            │ │            │ │            │          │
│ │ Q1 Inv...  │ │ Seed Deck  │ │ Product... │          │
│ │ Edited 2h  │ │ Edited 3d  │ │ Created 1w │          │
│ │ 12 slides  │ │ 10 slides  │ │ 8 slides   │          │
│ │ [•••]      │ │ [•••]      │ │ [•••]      │          │
│ └────────────┘ └────────────┘ └────────────┘          │
│                                                          │
│ RECOMMENDED TEMPLATES                                    │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────┐│
│ │ Airbnb     │ │ Uber       │ │ Sequoia    │ │ 500 S. ││
│ │ Pitch Deck │ │ Pitch Deck │ │ Capital    │ │ Investor││
│ │ 1m uses 🔒 │ │ 848k uses  │ │ Template   │ │ Deck    ││
│ └────────────┘ └────────────┘ └────────────┘ └────────┘│
│                                                          │
│ [Browse More Templates]                                  │
└─────────────────────────────────────────────────────────┘
```

---

## 🧩 Component Architecture

### 1. `MyPresentationsPage` (Main Container)
**Purpose**: User's presentation dashboard and library

**Structure**:
```tsx
<MyPresentationsPage>
  <PageHeader greeting={greeting} stats={userStats} />
  <CreateNewSection />
  <MyPresentationsGrid presentations={userPresentations} />
  <RecommendedTemplatesSection templates={templates} />
</MyPresentationsPage>
```

---

### 2. `PageHeader` (Greeting & Stats)
**Purpose**: Personalized welcome message with quick stats

**Features**:
- Time-based greeting (Good morning/afternoon/evening)
- User first name
- Quick stats: Total presentations, last edited time
- Optional: Weekly activity summary

**Example**:
```
Good morning, Sarah!
You have 3 presentations. Last edited 2 hours ago.
```

**Props**:
```typescript
interface PageHeaderProps {
  userName: string;
  presentationCount: number;
  lastEditedAt?: Date;
  weeklyActivity?: {
    created: number;
    edited: number;
    presented: number;
  };
}
```

---

### 3. `CreateNewSection` (4 Creation Options)
**Purpose**: Quick access to create new presentations

**4 Options**:

#### Option 1: 🤖 **AI Generate Pitch Deck** (Primary CTA)
- Icon: Magic wand/AI sparkle
- Title: "Generate with AI"
- Subtitle: "Answer 5 questions, get complete deck"
- Badge: "Beta" or "Most Popular"
- Action: Opens AI generation wizard

#### Option 2: 📋 **Use Template**
- Icon: Document grid
- Title: "Use a Template"
- Subtitle: "Browse 50+ proven pitch deck templates"
- Action: Opens template library modal

#### Option 3: ⬜ **Blank Presentation**
- Icon: Empty canvas
- Title: "Start from Scratch"
- Subtitle: "Create your own slides"
- Action: Creates blank deck, opens editor

#### Option 4: 📊 **Startup Budgeting**
- Icon: Chart/spreadsheet
- Title: "Financial Forecast"
- Subtitle: "Budget planner & revenue projections"
- Action: Opens financial forecast tool (separate feature)

**Card Design**:
```
┌─────────────────────┐
│      Icon (48px)    │
│                     │
│   Title (H3)        │
│   Subtitle (small)  │
│                     │
│   [Badge] (opt)     │
└─────────────────────┘
```

**Props**:
```typescript
interface CreateNewSectionProps {
  onAIGenerate: () => void;
  onTemplateSelect: () => void;
  onBlankCreate: () => void;
  onBudgetingCreate: () => void;
}
```

---

### 4. `MyPresentationsGrid` (User's Decks)
**Purpose**: Display user's existing presentations

**Features**:
- Grid layout (4 cols → 3 cols → 2 cols → 1 col responsive)
- Sort options: Recent, Name, Date Created, Most Edited
- Filter options: All, Drafts, Complete, Shared
- Empty state: "You haven't created any presentations yet"
- Hover actions: Edit, Duplicate, Delete, Share, Export

**Card Structure**:
```
┌─────────────────────┐
│                     │
│   Cover Image       │ ← Thumbnail (16:9)
│   (slide 1 preview) │
│                     │
├─────────────────────┤
│ Deck Title          │ ← Truncate if long
│ 12 slides • Draft   │ ← Metadata
│ Edited 2 hours ago  │
│                     │
│ [Edit] [•••]        │ ← Actions (hover)
└─────────────────────┘
```

**Props**:
```typescript
interface PresentationCard {
  id: string;
  title: string;
  coverImageUrl?: string;
  slideCount: number;
  status: 'draft' | 'complete' | 'shared';
  lastEditedAt: Date;
  createdAt: Date;
  thumbnailUrl?: string;
}

interface MyPresentationsGridProps {
  presentations: PresentationCard[];
  sortBy: 'recent' | 'name' | 'created' | 'edited';
  filterBy: 'all' | 'drafts' | 'complete' | 'shared';
  onSort: (sortBy: string) => void;
  onFilter: (filterBy: string) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
}
```

**Actions Menu** (three dots):
- Edit
- Duplicate
- Rename
- Share link
- Download PDF
- Download PPTX
- Delete

---

### 5. `RecommendedTemplatesSection` (Template Library)
**Purpose**: Showcase popular templates to inspire users

**Features**:
- Grid of 8-12 template cards (4 cols desktop)
- Each card shows: Cover image, title, usage stats, likes
- Premium badge for paid templates
- "Browse More" button at the end
- Categories: Pitch Decks, Investor Decks, Product Launches, Sales Decks

**Card Structure** (matches Slidebean):
```
┌─────────────────────┐
│                     │
│   Template Cover    │ ← Large image
│   (screenshot)      │
│                     │
│   [🔒 Premium]      │ ← Badge overlay
├─────────────────────┤
│ Airbnb Pitch Deck   │ ← Template name
│ By Airbnb           │ ← Attribution
│                     │
│ 👁 1m uses ❤️ 42k  │ ← Stats
│                     │
│ [Use Template]      │ ← Hover CTA
└─────────────────────┘
```

**Props**:
```typescript
interface TemplateCard {
  id: string;
  name: string;
  coverImageUrl: string;
  attribution: string; // "By Airbnb", "By Y Combinator"
  category: 'pitch-deck' | 'investor-deck' | 'product-launch' | 'sales-deck';
  usageCount: number; // 1000000 → "1m uses"
  likeCount: number;
  isPremium: boolean;
  previewUrl?: string;
}

interface RecommendedTemplatesSectionProps {
  templates: TemplateCard[];
  onTemplateSelect: (templateId: string) => void;
  onBrowseMore: () => void;
}
```

---

## 🎨 Design Specifications

### Color Palette (Soft Intelligence)
```
Primary:        #9ABAC6 (Soft Steel Blue) - CTA buttons
Primary Hover:  #85AAB8 (Cool Ocean Blue)
Accent:         #F5A623 (Warm Amber) - "AI Generate" card
Background:     #FFFFFF (Pure White)
Surface:        #FAFBFC (Cloud White) - card backgrounds
Border:         #E1E8EB (Silver Mist) - card borders
Text Primary:   #1F1F1F (Charcoal Black)
Text Muted:     #6A737D (Ash Gray)
Success:        #34C759 (Complete status)
Warning:        #FFCC00 (Draft status)
Premium Badge:  #9ABAC6 with lock icon
```

### Typography
```
Page Title (H1):       32px / 700 (Good morning, Name!)
Section Heading (H2):  24px / 600 (MY PRESENTATIONS)
Card Title (H3):       18px / 600
Card Subtitle:         14px / 400 (muted)
Stats:                 13px / 400 (muted)
Button:                16px / 500
```

### Card Specifications

**Create New Cards** (4 options):
```
Width: 260px (desktop), 100% (mobile)
Height: 200px
Padding: 24px
Border-radius: 12px
Border: 2px solid #E1E8EB
Background: #FAFBFC
Hover: border-color #9ABAC6, shadow 0 8px 16px rgba(0,0,0,0.08)
Transition: 200ms ease-out
```

**Presentation Cards** (user's decks):
```
Aspect ratio: 16:9 (cover image)
Card width: 280px (desktop)
Border-radius: 10px
Border: 1px solid #E1E8EB
Shadow default: 0 1px 3px rgba(0,0,0,0.04)
Shadow hover: 0 8px 16px rgba(0,0,0,0.12)
Thumbnail: Fill container, object-fit: cover
```

**Template Cards** (recommended):
```
Same as Presentation Cards
Premium badge: top-right corner, 32px × 32px, pink background with lock icon
```

### Spacing
```
Section gap: 48px
Card grid gap: 24px
Card padding: 16px
Button padding: 12px 24px
Icon size: 48px (creation options), 20px (metadata icons)
```

---

## 📊 Data Model

### User Presentations
```typescript
interface UserPresentation {
  id: string;
  userId: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  slides: Slide[];
  status: 'draft' | 'complete' | 'shared';
  slideCount: number;
  theme: PresentationTheme;
  createdAt: Date;
  updatedAt: Date;
  lastEditedAt: Date;
  lastPresentedAt?: Date;
  viewCount: number;
  shareLink?: string;
  isPublic: boolean;
}

interface PresentationTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  logoUrl?: string;
}

interface Slide {
  id: string;
  number: number;
  title: string;
  content: any;
  thumbnailUrl?: string;
}
```

### Template Library
```typescript
interface PresentationTemplate {
  id: string;
  name: string;
  description: string;
  coverImageUrl: string;
  attribution: string;
  category: TemplateCategory;
  slides: TemplateSlide[];
  usageCount: number;
  likeCount: number;
  isPremium: boolean;
  price?: number; // USD cents
  tags: string[];
  createdAt: Date;
}

enum TemplateCategory {
  PITCH_DECK = 'pitch-deck',
  INVESTOR_DECK = 'investor-deck',
  PRODUCT_LAUNCH = 'product-launch',
  SALES_DECK = 'sales-deck',
  TEAM_UPDATE = 'team-update',
  QUARTERLY_REVIEW = 'quarterly-review'
}

interface TemplateSlide {
  number: number;
  title: string;
  layout: SlideLayout;
  placeholders: Placeholder[];
}
```

---

## ✨ Core Features

### 1. Page Load & Greeting
- [x] Time-based greeting (Good morning/afternoon/evening)
- [x] Fetch user's presentations from database
- [x] Display presentation count and last edited time
- [x] Load recommended templates

### 2. Create New Presentation

**Option A: AI Generate**
```
User clicks "Generate with AI"
  ↓
Modal opens: "Create Your Pitch Deck"
  - Company name
  - One-line description
  - Industry
  - Stage (idea, MVP, growth)
  - Target audience (investors, customers, partners)
  ↓
User submits form
  ↓
AI generates 10-12 slides (15 seconds)
  ↓
New presentation created, redirects to editor
```

**Option B: Use Template**
```
User clicks "Use a Template"
  ↓
Template library modal opens (full screen)
  - Category filter (All, Pitch Deck, Sales, etc.)
  - Search bar
  - Grid of 50+ templates
  ↓
User clicks template card
  ↓
Preview modal shows all slides
  ↓
User clicks "Use This Template"
  ↓
New presentation created from template
  ↓
Redirects to editor
```

**Option C: Blank Presentation**
```
User clicks "Start from Scratch"
  ↓
New blank presentation created
  ↓
Redirects to slide editor (empty canvas)
```

**Option D: Startup Budgeting**
```
User clicks "Financial Forecast"
  ↓
Redirects to budgeting tool (separate page)
  ↓
Creates financial model with revenue projections
  ↓
Can export to presentation slides
```

### 3. My Presentations Grid

**Sorting**:
- Recent (default) - by lastEditedAt DESC
- Name (A-Z) - by title ASC
- Date Created - by createdAt DESC
- Most Edited - by edit count DESC

**Filtering**:
- All (default)
- Drafts (status = 'draft')
- Complete (status = 'complete')
- Shared (isPublic = true)

**Actions per Card**:
- **Edit**: Opens slide editor
- **Duplicate**: Creates copy with "(Copy)" suffix
- **Rename**: Inline edit
- **Share**: Generates shareable link with optional password
- **Download PDF**: Exports to PDF
- **Download PPTX**: Exports to PowerPoint
- **Delete**: Confirmation modal → soft delete

### 4. Recommended Templates

**Template Display**:
- Show 8 templates by default
- Categories: Pitch Deck, Investor Deck, Product Launch, Sales Deck
- Premium templates have lock icon + "Premium" badge
- Stats: Usage count (1m uses), Like count (42k likes)

**Template Selection**:
```
User clicks template card
  ↓
Full preview modal opens
  - Shows all slides as thumbnails
  - "Use Template" CTA
  - "Preview Full Deck" button
  ↓
User clicks "Use Template"
  ↓
If premium and user not subscribed:
  → Upgrade modal
  → "Unlock 50+ Premium Templates"
Else:
  → Creates new presentation from template
  → Redirects to editor
```

**Browse More**:
```
User clicks "Browse More Templates"
  ↓
Redirects to full template library page
  - Category navigation
  - Search
  - Filters (industry, slide count, style)
  - Infinite scroll
```

---

## 🎬 User Flows

### Flow 1: First-Time User (Empty State)
```
1. User signs up and verifies email
   → Redirects to "My Presentations" page

2. Empty state appears
   → "Welcome! Let's create your first presentation"
   → Only "Create New" section visible

3. User clicks "Generate with AI"
   → AI wizard opens

4. User fills in company details
   → Submits

5. AI generates deck (progress indicator)
   → "Creating your pitch deck... 10 seconds remaining"

6. Deck created successfully
   → Redirects to slide editor

7. User sees 12 slides in grid view
   → Clicks "Slide 1: Cover" to edit

8. User edits company name and logo
   → Saves

9. User returns to "My Presentations"
   → Now sees 1 presentation card

10. Success! User has first pitch deck
```

### Flow 2: Returning User Creating Second Deck
```
1. User logs in
   → Lands on "My Presentations" page

2. Sees existing presentation
   → "Q1 Investor Pitch" (edited 3 days ago)

3. User wants to create sales deck
   → Clicks "Use a Template"

4. Template library opens
   → Filters by "Sales Deck" category

5. User finds "Enterprise Sales Deck by Salesforce"
   → Clicks card

6. Preview modal shows 15 slides
   → User clicks "Use This Template"

7. New deck created: "Enterprise Sales Deck (Copy)"
   → Redirects to editor

8. User customizes slides 1-5
   → Changes company name, product screenshots

9. User returns to "My Presentations"
   → Now sees 2 presentation cards

10. User sorts by "Recent"
    → New sales deck appears first
```

### Flow 3: Power User Managing Multiple Decks
```
1. User has 12 presentations
   → "My Presentations" shows all 12 in grid

2. User wants to find Q4 board deck
   → Uses search: "Q4 board"

3. Results filter to 2 matches
   → "Q4 Board Update" and "Q4 Financial Review"

4. User clicks three-dot menu on "Q4 Board Update"
   → Clicks "Duplicate"

5. New deck created: "Q4 Board Update (Copy)"
   → User renames to "Q1 Board Update"

6. User clicks "Edit"
   → Opens slide editor

7. User updates Q4 data to Q1 projections
   → Saves

8. User clicks "Share"
   → Generates share link

9. User copies link and sends to board via email
   → Recipients can view (but not edit)

10. User tracks views via analytics (future feature)
```

---

## 🌍 Real-World Use Cases

### Use Case 1: Solo Founder Creating Investor Deck
**Scenario**: Alex is a solo founder applying to seed funds. Needs professional deck fast.

**Journey**:
1. Signs up for Medellin AI
2. Lands on "My Presentations" (empty state)
3. Clicks "Generate with AI"
4. Fills in: "FinTech app for freelancers, marketplace stage"
5. AI generates 10-slide deck in 12 seconds
6. Reviews slides, edits 3-4 slides (team, traction, ask)
7. Exports PDF
8. Sends to 10 VCs
9. **Result**: Professional deck in 20 minutes

---

### Use Case 2: Startup Team Collaborating on Demo Day Pitch
**Scenario**: 3 co-founders preparing for accelerator demo day (5-minute pitch).

**Journey**:
1. CEO creates blank deck
2. Invites CTO and CMO as collaborators
3. CEO works on Problem + Solution slides
4. CMO creates Traction slide with growth charts
5. CTO builds Product Demo slide with screenshots
6. Team reviews together via "Present Mode"
7. Iterates based on feedback
8. Exports to PPTX for final polish
9. **Result**: Team-built deck in 2 hours

---

### Use Case 3: Corporate Innovation Lead Using Templates
**Scenario**: Sarah leads innovation at Fortune 500, pitching new AI initiative to C-suite.

**Journey**:
1. Logs into Medellin AI
2. Clicks "Use a Template"
3. Filters by "Corporate Strategy"
4. Selects "McKinsey Strategy Deck Template"
5. Customizes with company branding (colors, logo, fonts)
6. Replaces placeholder text with AI initiative details
7. Adds financial projections from Excel (copy-paste)
8. Exports to PPTX for offline review
9. **Result**: Board-ready deck in 45 minutes

---

### Use Case 4: Non-Technical Founder Explaining Tech Product
**Scenario**: David is pitching blockchain supply chain solution to non-technical investors.

**Journey**:
1. Opens "My Presentations"
2. Clicks existing deck: "Blockchain Supply Chain Pitch"
3. Goes to Slide 4 (Technical Architecture)
4. Text is too technical: "Distributed ledger with cryptographic hashing..."
5. Clicks "Simplify for Non-Technical Audience" (AI tool)
6. AI rewrites: "Tamper-proof digital record, like a receipt that can't be faked"
7. Adds visual diagram (AI suggests flowchart)
8. Reviews with mentor
9. **Result**: Clear explanation investors understand

---

### Use Case 5: Accelerator Cohort Creating Demo Day Decks
**Scenario**: 25 startups in accelerator need decks for Demo Day. All use Medellin AI.

**Journey**:
1. Accelerator admin creates "Demo Day Template"
2. Sets rules: 10 slides max, 5-minute pitch, standard format
3. All founders clone template
4. Each founder uses "Generate with AI" to populate slides
5. Mentors review and provide feedback via comments (future feature)
6. All decks exported as PDFs for investor booklet
7. Startups present using "Present Mode"
8. **Result**: 25 consistent, professional decks ready for investors

---

## 🚀 Implementation Phases

### Phase 1: Page Structure & Empty State (Week 1)
**Goal**: Basic page layout with greeting and creation options

**Tasks**:
- [ ] Set up routing `/presentations`
- [ ] Create `MyPresentationsPage` component
- [ ] Implement `PageHeader` with greeting
- [ ] Build `CreateNewSection` (4 option cards)
- [ ] Add empty state: "You haven't created any presentations yet"
- [ ] Connect to Supabase `pitch_decks` table

**Deliverables**:
- Page loads with personalized greeting
- 4 creation options visible (click handlers as placeholders)
- Empty state for new users

---

### Phase 2: My Presentations Grid (Week 2)
**Goal**: Display user's existing presentations in grid

**Tasks**:
- [ ] Implement `MyPresentationsGrid` component
- [ ] Create `PresentationCard` component
- [ ] Fetch presentations from database
- [ ] Add sorting (Recent, Name, Created)
- [ ] Add filtering (All, Drafts, Complete, Shared)
- [ ] Implement card hover actions (Edit, Duplicate, Delete)
- [ ] Add thumbnail generation for cover images
- [ ] Implement responsive grid (4→3→2→1 columns)

**Deliverables**:
- Grid displays all user presentations
- Sorting and filtering work
- Cards link to slide editor

---

### Phase 3: Template Library (Week 3)
**Goal**: Showcase recommended templates

**Tasks**:
- [ ] Create `RecommendedTemplatesSection` component
- [ ] Build template database (seed 20 templates)
- [ ] Implement template preview modal
- [ ] Add "Use Template" flow (creates new deck from template)
- [ ] Add "Browse More" link to full template library page
- [ ] Implement premium badge for paid templates
- [ ] Add usage/like stats display

**Deliverables**:
- 8 templates displayed on page
- Template preview works
- Can create deck from template

---

### Phase 4: AI Generation Integration (Week 4)
**Goal**: Wire up "Generate with AI" creation option

**Tasks**:
- [ ] Create AI generation wizard modal
- [ ] Build 5-field form (company name, description, industry, stage, audience)
- [ ] Connect to OpenAI API for deck generation
- [ ] Implement loading state with progress indicator
- [ ] Generate 10-12 slides based on user input
- [ ] Create new presentation in database
- [ ] Redirect to slide editor after generation

**Deliverables**:
- Full AI generation flow works end-to-end
- Generated decks populate in "My Presentations"

---

### Phase 5: Actions & Polish (Week 5)
**Goal**: Implement card actions and UX improvements

**Tasks**:
- [ ] Implement duplicate presentation
- [ ] Implement rename (inline edit)
- [ ] Implement share link generation
- [ ] Implement delete (with confirmation)
- [ ] Add export to PDF/PPTX
- [ ] Add search bar for presentations
- [ ] Add keyboard shortcuts
- [ ] Optimize thumbnail loading (lazy load, WebP)
- [ ] Add skeleton loaders
- [ ] Mobile responsive testing

**Deliverables**:
- All card actions functional
- Performance optimized (<2s page load)
- Mobile-friendly

---

## 🛠️ Technical Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Routing**: React Router v6
- **State**: Zustand (global state) + React Query (API calls)
- **UI**: Tailwind CSS + shadcn/ui components
- **Grid**: CSS Grid with `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
- **Animations**: Framer Motion for card hover effects
- **Image Optimization**: Next.js Image or Cloudinary

### Backend
- **Database**: Supabase (PostgreSQL)
- **API**: Supabase Edge Functions
- **AI**: OpenAI GPT-4 for deck generation
- **Storage**: Supabase Storage for thumbnails/cover images
- **Export**: Puppeteer (PDF), pptxgenjs (PPTX)

### Database Schema
```sql
-- presentations table
CREATE TABLE presentations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  thumbnail_url TEXT,
  status TEXT DEFAULT 'draft',
  slide_count INT DEFAULT 0,
  theme JSONB DEFAULT '{}',
  is_public BOOLEAN DEFAULT false,
  share_link TEXT,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_edited_at TIMESTAMPTZ DEFAULT NOW(),
  last_presented_at TIMESTAMPTZ
);

-- template library
CREATE TABLE presentation_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT NOT NULL,
  attribution TEXT, -- "By Airbnb"
  category TEXT NOT NULL,
  usage_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  is_premium BOOLEAN DEFAULT false,
  price_cents INT, -- 999 = $9.99
  slides JSONB NOT NULL,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- template usage tracking
CREATE TABLE template_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES presentation_templates(id),
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🎨 Design System Components

### Card Variants

**CreateOptionCard**:
```tsx
<Card
  icon={<AISparkle size={48} />}
  title="Generate with AI"
  subtitle="Answer 5 questions, get complete deck"
  badge="Beta"
  accentColor="#F5A623"
  onClick={handleAIGenerate}
/>
```

**PresentationCard**:
```tsx
<Card
  coverImage={presentation.thumbnailUrl}
  title={presentation.title}
  slideCount={presentation.slideCount}
  status={presentation.status}
  lastEdited={presentation.lastEditedAt}
  actions={[
    { label: 'Edit', onClick: handleEdit },
    { label: 'Duplicate', onClick: handleDuplicate },
    { label: 'Share', onClick: handleShare },
    { label: 'Delete', onClick: handleDelete, variant: 'danger' }
  ]}
/>
```

**TemplateCard**:
```tsx
<Card
  coverImage={template.coverImageUrl}
  title={template.name}
  attribution={template.attribution}
  usageCount={template.usageCount}
  likeCount={template.likeCount}
  isPremium={template.isPremium}
  onClick={handleTemplateSelect}
/>
```

---

## 📊 Success Metrics

### User Engagement
- **Presentation creation rate**: % of users who create ≥1 presentation
- **Creation method distribution**: AI (60%) vs Template (30%) vs Blank (10%)
- **Avg presentations per user**: Target 3-5
- **Return rate**: % of users who return within 7 days

### Feature Adoption
- **AI generation usage**: % of decks created with AI (target >60%)
- **Template usage**: % of template-based decks (target 30%)
- **Export rate**: % of presentations exported (target >70%)
- **Share rate**: % of presentations shared via link (target >40%)

### Performance
- **Page load time**: <2s
- **Time to first interaction**: <1s
- **AI generation time**: <15s

---

## 🔐 Security & Privacy

- [ ] Row-level security (users can only see their presentations)
- [ ] Secure share links (optional password protection)
- [ ] Rate limiting on AI generation (prevent abuse)
- [ ] Image upload validation (file type, size, virus scan)
- [ ] Export logs (audit trail)

---

## ✅ Launch Checklist

### Pre-Launch
- [ ] All 4 creation options functional
- [ ] Grid displays presentations correctly
- [ ] Template library populated (20 templates minimum)
- [ ] AI generation works end-to-end
- [ ] Mobile responsive
- [ ] Performance optimized
- [ ] Security audit passed

### Post-Launch
- [ ] Monitor creation rates
- [ ] Track AI vs Template vs Blank usage
- [ ] Collect user feedback
- [ ] Iterate on template library

---

**Document Status**: Draft v1.0
**Last Updated**: January 13, 2025
**Next Review**: February 1, 2025

---

**Ready to build the best presentation creation experience!** 🚀
