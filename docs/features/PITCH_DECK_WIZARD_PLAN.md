# Pitch Deck Wizard - ChatGPT-Style Conversational Interface

## 🎯 PROJECT OVERVIEW

**Feature:** AI-Powered Pitch Deck Creator with Conversational Chat Interface  
**Target Users:** Startup founders in Medellin AI Hub  
**Primary Goal:** Create professional investor pitch decks through natural conversation  
**Inspiration:** ChatGPT conversational UI + ALLWEONE® presentation generator  
**Timeline:** 3-5 weeks MVP implementation

---

## 📐 ARCHITECTURE

### Route Structure
```
/pitch-deck-wizard          → Main conversational interface
/pitch-deck-wizard/editor   → Slide editor (after generation)
/pitch-deck-wizard/present  → Presentation mode
/pitch-deck-wizard/history  → Past conversations
```

### Component Hierarchy
```
PitchDeckWizard (Main Page)
├── ChatLayout
│   ├── ChatHeader
│   │   ├── Logo
│   │   ├── NewChatButton
│   │   └── HistoryDropdown
│   ├── MessageContainer (Scrollable)
│   │   ├── AIMessage[]
│   │   │   ├── Avatar
│   │   │   ├── MessageContent
│   │   │   ├── QuickActionCards
│   │   │   └── FeedbackButtons
│   │   ├── UserMessage[]
│   │   │   ├── MessageContent
│   │   │   └── Timestamp
│   │   └── TypingIndicator
│   └── ChatInput
│       ├── TextArea (auto-resize)
│       ├── AttachButton
│       └── SendButton
├── ProgressSidebar (Desktop only)
│   ├── StageIndicator (10 stages)
│   ├── DataCompleteness
│   └── QuickActions
└── GenerationModal
    ├── ProgressBar
    ├── StatusMessages
    └── SlidePreview
```

### State Management
```typescript
interface ConversationState {
  conversationId: string;
  currentStage: number; // 1-10
  messages: Message[];
  collectedData: StartupData;
  isGenerating: boolean;
  generatedDeck?: PitchDeck;
}

interface StartupData {
  basics: {
    name?: string;
    tagline?: string;
    problem?: string;
    targetCustomer?: string;
  };
  solution: {
    description?: string;
    keyFeatures?: string[];
    valueProposition?: string;
  };
  market: {
    tam?: string;
    sam?: string;
    som?: string;
    competitors?: string[];
  };
  traction: {
    users?: number;
    revenue?: number;
    partnerships?: string[];
  };
  team: {
    founders?: Founder[];
    advisors?: string[];
  };
  business: {
    model?: string;
    cac?: number;
    ltv?: number;
  };
  fundraising: {
    amount?: string;
    use?: string[];
    milestones?: string[];
  };
}
```

---

## 🎨 DESIGN SPECIFICATIONS

### Color System
```css
/* Message Bubbles */
--ai-bubble-bg: hsl(0, 0%, 96%);        /* Light grey */
--user-bubble-bg: hsl(14, 82%, 60%);    /* Orange */
--ai-bubble-text: hsl(0, 0%, 9%);       /* Near black */
--user-bubble-text: hsl(0, 0%, 100%);   /* White */

/* Actions */
--action-card-bg: hsl(0, 0%, 100%);     /* White */
--action-card-border: hsl(0, 0%, 91%);  /* Light grey */
--action-card-hover: hsl(14, 82%, 60%); /* Orange */
```

### Typography
```css
/* Message Text */
.message-content {
  font-family: Inter;
  font-size: 15px;
  line-height: 1.5;
}

/* Headers in AI messages */
.message-header {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
}

/* Input field */
.chat-input {
  font-family: Inter;
  font-size: 15px;
  line-height: 1.5;
}
```

### Spacing & Layout
```css
/* Message bubbles */
.ai-message {
  max-width: 80%;
  margin: 8px 0;
  padding: 16px 20px;
  border-radius: 12px;
}

.user-message {
  max-width: 80%;
  margin: 8px 0 8px auto;
  padding: 16px 20px;
  border-radius: 12px;
  align-self: flex-end;
}

/* Container */
.message-container {
  padding: 24px;
  gap: 16px;
}
```

---

## 💬 10 CONVERSATION STAGES

### Stage 1: Greeting & Options
**Goal:** Welcome user, offer starting options  
**Duration:** 30 seconds  
**AI Prompt:**
```
"Hi! I'm your AI pitch deck assistant. I'll help you create a professional 
investor presentation in about 10 minutes through natural conversation.

Before we start, choose an option:
[Use Wizard Data] - Pre-fill from your startup wizard (faster)
[Start Fresh] - Tell me everything from scratch
[Upload Deck] - Improve an existing presentation"
```

### Stage 2: Startup Basics
**Goal:** Gather company name, problem, customer  
**Required Fields:** name, problem, targetCustomer  
**AI Prompt:**
```
"Let's start with the basics. Tell me about your startup:
• What's the name?
• What problem are you solving?
• Who's your target customer?

You can answer in a paragraph or bullet points - I'm flexible!"
```

### Stage 3: Solution & Value Prop
**Goal:** Understand product and differentiation  
**Required Fields:** solution, valueProposition  
**AI Prompt:**
```
"Now let's talk about your solution:
1. What's your unique approach to solving this problem?
2. What's the key benefit for customers?
3. Any secret sauce or tech advantage?

💡 Tip: Investors love specifics - mention AI, patents, or unique data!"
```

### Stage 4: Market Opportunity
**Goal:** Market sizing and competitive landscape  
**Required Fields:** tam, competitors  
**AI Prompt:**
```
"Investors always ask about market size:
1. What's the total addressable market (TAM)?
2. Who are your main competitors?
3. What's your market entry strategy?

Not sure about numbers? I can help research or note 'TBD'."
```

### Stage 5: Traction & Validation
**Goal:** Proof of progress  
**Required Fields:** At least one metric  
**AI Prompt:**
```
"Now for the exciting part - traction!
• Users or customers?
• Revenue or bookings?
• Key partnerships?
• Press or awards?

Pre-launch? Mention waitlist size or letters of intent!"
```

### Stage 6: Team
**Goal:** Build credibility through team  
**Required Fields:** founders count  
**AI Prompt:**
```
"Investors bet on teams as much as ideas:
• How many co-founders?
• Relevant backgrounds?
• Notable advisors?

💡 Mention exits, YC alumni, or Fortune 500 experience!"
```

### Stage 7: Business Model
**Goal:** Revenue strategy and unit economics  
**Required Fields:** business model  
**AI Prompt:**
```
"Let's talk money:
1. How do you make money? (SaaS, marketplace, etc.)
2. Unit economics? (CAC, LTV if known)
3. Revenue projections?

Ballpark estimates are totally fine!"
```

### Stage 8: The Ask
**Goal:** Fundraising details  
**Required Fields:** amount, use  
**AI Prompt:**
```
"Final question: What are you raising?
• How much capital?
• What will you use it for?
• What milestones will this achieve?

Be specific - investors like clear plans!"
```

### Stage 9: Generation
**Goal:** Generate pitch deck  
**Duration:** 10-20 seconds  
**UI Display:**
```
🎨 Generating your pitch deck...

Creating 12 professional slides:
✅ Cover
✅ Problem
✅ Solution
✅ Market
⏳ Product...

Progress: ████████░░ 67%
Estimated: 8 seconds...
```

### Stage 10: Preview & Iterate
**Goal:** Show results, enable editing  
**AI Prompt:**
```
"🎉 Your pitch deck is ready!

[Grid of 12 slide thumbnails]

What's next?
[Preview Full Deck] [Edit Slides] [Change Theme] [Export]

💡 Click any slide to edit, or ask me to make changes!"
```

---

## 🔧 IMPLEMENTATION PHASES

### Phase 1: Chat UI Foundation (Week 1)
**Priority:** Critical  
**Deliverables:**
- [ ] ChatLayout component with header/container/input
- [ ] AIMessage and UserMessage components
- [ ] ChatInput with auto-resize textarea
- [ ] TypingIndicator animation
- [ ] QuickActionCard component
- [ ] Message persistence (Supabase)
- [ ] Scroll-to-bottom on new message

**Technical Details:**
```typescript
// components/pitch-deck-wizard/ChatLayout.tsx
// components/pitch-deck-wizard/AIMessage.tsx
// components/pitch-deck-wizard/UserMessage.tsx
// components/pitch-deck-wizard/ChatInput.tsx
// components/pitch-deck-wizard/QuickActionCard.tsx
```

### Phase 2: Conversation Engine (Week 2)
**Priority:** Critical  
**Deliverables:**
- [ ] ConversationState hook
- [ ] Stage progression logic
- [ ] Data extraction from user messages
- [ ] AI prompt generation per stage
- [ ] Wizard data integration
- [ ] Validation per stage
- [ ] Save/resume conversation

**Technical Details:**
```typescript
// hooks/useConversation.ts
// lib/conversation-engine.ts
// lib/data-extraction.ts
```

### Phase 3: Deck Generation (Week 2-3)
**Priority:** Critical  
**Deliverables:**
- [ ] Edge function: generate-pitch-deck
- [ ] 12-slide template system
- [ ] ProgressModal component
- [ ] SlidePreviewGrid component
- [ ] Real-time generation status
- [ ] Error handling and retry

**Technical Details:**
```typescript
// supabase/functions/generate-pitch-deck/index.ts
// components/pitch-deck-wizard/GenerationModal.tsx
// components/pitch-deck-wizard/SlidePreviewGrid.tsx
```

### Phase 4: Editor & Themes (Week 3-4)
**Priority:** High  
**Deliverables:**
- [ ] SlideEditor with Plate.js
- [ ] 5 theme definitions
- [ ] ThemeSelector component
- [ ] Apply theme to all slides
- [ ] Individual slide editing
- [ ] Auto-save changes

**Technical Details:**
```typescript
// components/pitch-deck-wizard/SlideEditor.tsx
// components/pitch-deck-wizard/ThemeSelector.tsx
// lib/themes.ts
```

### Phase 5: Export & Present (Week 4-5)
**Priority:** High  
**Deliverables:**
- [ ] PowerPoint export (pptxgenjs)
- [ ] PresentationMode component
- [ ] ExportModal component
- [ ] Speaker notes support
- [ ] Fullscreen controls

**Technical Details:**
```typescript
// lib/export-pptx.ts
// components/pitch-deck-wizard/PresentationMode.tsx
// components/pitch-deck-wizard/ExportModal.tsx
```

---

## 📊 DATABASE SCHEMA

### Tables

#### pitch_conversations
```sql
CREATE TABLE pitch_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT DEFAULT 'Untitled Conversation',
  current_stage INTEGER DEFAULT 1,
  collected_data JSONB DEFAULT '{}'::JSONB,
  is_completed BOOLEAN DEFAULT FALSE,
  deck_id UUID REFERENCES pitch_decks,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pitch_conversations_user ON pitch_conversations(user_id);
CREATE INDEX idx_pitch_conversations_created ON pitch_conversations(created_at DESC);
```

#### pitch_messages
```sql
CREATE TABLE pitch_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES pitch_conversations NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pitch_messages_conversation ON pitch_messages(conversation_id, created_at);
```

#### pitch_decks (Enhanced)
```sql
ALTER TABLE pitch_decks ADD COLUMN IF NOT EXISTS
  conversation_id UUID REFERENCES pitch_conversations,
  theme_name TEXT DEFAULT 'Modern Professional',
  generated_from TEXT DEFAULT 'conversation';
```

---

## 🎯 AI BEHAVIOR GUIDELINES

### Personality Traits
- **Helpful:** Proactive suggestions, anticipates needs
- **Encouraging:** Celebrates progress, positive reinforcement
- **Patient:** Handles incomplete answers gracefully
- **Smart:** Provides context, educates when appropriate
- **Adaptive:** Matches user's communication style

### Response Patterns

**When user gives short answer:**
```
User: "EventAI. Events."

AI: "Got it! EventAI for events. Can you tell me a bit more?
• Who's your target customer?
• What specific problem do you solve?
Even a quick sentence helps!"
```

**When user gives detailed answer:**
```
User: "We're EventAI, an AI platform for enterprise event planners. 
       We automate 80% of planning tasks..."

AI: "Excellent! I love the specificity:
• Target: Enterprise planners ✓
• Solution: AI automation (80% tasks) ✓
• Benefit: 15+ hours saved ✓

Quick follow-up: How many events does a typical client run per year?"
```

**When user is uncertain:**
```
User: "I'm not sure about market size..."

AI: "No worries! Market sizing is tricky. Based on event management 
     industry research:
     • Global market: $1.1B (2024)
     • Growth: 11% CAGR
     
     I can use these estimates, or note 'TBD'. Your choice!"
```

### Validation Logic
```typescript
function validateStageData(stage: number, data: Partial<StartupData>): boolean {
  switch (stage) {
    case 2:
      return !!(data.basics?.name && data.basics?.problem);
    case 3:
      return !!(data.solution?.description);
    case 4:
      return !!(data.market?.tam);
    case 5:
      return !!(data.traction?.users || data.traction?.revenue);
    case 6:
      return !!(data.team?.founders && data.team.founders.length > 0);
    case 7:
      return !!(data.business?.model);
    case 8:
      return !!(data.fundraising?.amount);
    default:
      return true;
  }
}
```

---

## 🎨 THEME SYSTEM

### Theme Structure
```typescript
interface PitchDeckTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: {
      family: string;
      weight: number;
      size: { min: number; max: number };
    };
    body: {
      family: string;
      weight: number;
      size: { min: number; max: number };
    };
  };
  layout: {
    spacing: 'compact' | 'normal' | 'spacious';
    alignment: 'left' | 'center' | 'right';
  };
  preview: string; // Preview image URL
}
```

### 5 Default Themes

1. **Modern Professional** (Default)
   - Primary: hsl(14, 82%, 60%)
   - Background: hsl(0, 0%, 100%)
   - Font: Inter

2. **Bold & Vibrant**
   - Primary: hsl(14, 100%, 50%)
   - Background: hsl(0, 0%, 12%)
   - Font: Montserrat

3. **Minimalist Clean**
   - Primary: hsl(0, 0%, 0%)
   - Background: hsl(0, 0%, 98%)
   - Font: Helvetica Neue

4. **Corporate Blue**
   - Primary: hsl(210, 80%, 30%)
   - Background: hsl(0, 0%, 100%)
   - Font: Georgia

5. **Startup Gradient**
   - Primary: Purple-pink gradient
   - Background: hsl(0, 0%, 100%)
   - Font: Poppins

---

## 📱 RESPONSIVE DESIGN

### Desktop (> 1024px)
```
┌──────────────────────────────────────────────┐
│ Header                                       │
├────────────┬─────────────────────────────────┤
│            │                                 │
│  Progress  │   Message Container             │
│  Sidebar   │   (Scrollable)                  │
│            │                                 │
│  Stage 3/10│   [Messages]                    │
│  ████░░░░  │                                 │
│            │                                 │
│  Data:     │                                 │
│  ✓ Name    │                                 │
│  ✓ Problem │                                 │
│  ⏳ Solution│                                 │
│            │                                 │
│            ├─────────────────────────────────┤
│            │ Input Bar                       │
└────────────┴─────────────────────────────────┘
```

### Mobile (< 768px)
```
┌──────────────────────┐
│ Header [☰]           │
├──────────────────────┤
│                      │
│  Message Container   │
│  (Full Width)        │
│                      │
│  [Messages]          │
│                      │
│                      │
├──────────────────────┤
│ Input Bar            │
└──────────────────────┘

Progress sidebar → Collapsible drawer
```

---

## ✅ SUCCESS METRICS

### Speed Targets
- Time to first deck: < 10 minutes
- Generation time: < 20 seconds
- Export time: < 3 seconds

### Quality Targets
- Completion rate: > 80%
- Edit rate: < 30%
- Export rate: > 90%

### Satisfaction Targets
- User rating: > 4.5/5
- NPS score: > 50
- Return rate: > 60%

---

## 🔒 SECURITY & PRIVACY

### Data Protection
- Conversations encrypted at rest (AES-256)
- TLS 1.3 for all API calls
- Row-level security (RLS) policies
- Rate limiting: 5 generations/hour per user

### User Rights
- Export all conversation data
- Delete all conversations
- Opt-out of analytics
- Data portability

---

## 📚 TECHNICAL REFERENCES

### Dependencies to Add
```json
{
  "@radix-ui/react-scroll-area": "^1.2.9",
  "pptxgenjs": "^3.12.0",
  "react-markdown": "^9.0.1",
  "remark-gfm": "^4.0.0"
}
```

### API Endpoints
```
POST /functions/v1/generate-pitch-deck
POST /functions/v1/improve-slide-content
POST /functions/v1/extract-deck-content
GET  /functions/v1/conversation-history
```

---

## 🎯 NEXT STEPS

1. ✅ Create this plan document
2. ⏳ Implement ChatLayout and message components
3. ⏳ Build conversation state management
4. ⏳ Create generation modal and progress tracking
5. ⏳ Implement slide editor
6. ⏳ Add theme system
7. ⏳ Build export functionality
8. ⏳ Create presentation mode
9. ⏳ Add analytics tracking
10. ⏳ Test and optimize

---

**Document Version:** 1.0  
**Created:** October 11, 2025  
**Status:** Ready for Implementation  
**Estimated Completion:** 3-5 weeks
