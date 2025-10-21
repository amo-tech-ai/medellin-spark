# Generation Wizard - UI/UX Wireframe

**Component**: Presentation Generation Wizard
**Route**: `/presentations/create` or `/presentations/generate`
**Purpose**: Multi-step form to create AI-powered presentations

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER (with back button)                                      │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  PROGRESS INDICATOR (Steps 1-4)                                 │
│  ●━━━━○━━━━○━━━━○                                              │
│  Topic  Options  Review  Generate                               │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  STEP CONTENT (Changes based on current step)                  │
│                                                                 │
│  [Dynamic form content here]                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  NAVIGATION BUTTONS                                             │
│  [← Back]                               [Next →] or [Generate]  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Progress Indicator

### Visual Design:
```
Step 1 (Active):
●━━━━○━━━━○━━━━○
Topic  Options  Review  Generate

Step 2 (Active):
●━━━━●━━━━○━━━━○
Topic  Options  Review  Generate

Step 3 (Active):
●━━━━●━━━━●━━━━○
Topic  Options  Review  Generate

Step 4 (Active):
●━━━━●━━━━●━━━━●
Topic  Options  Review  Generate
```

### Elements:
- **Circles**: Filled for completed/current, outline for upcoming
- **Lines**: Solid for completed, dashed for upcoming
- **Labels**: Below each step
- **Colors**:
  - Completed: Primary color (#8B5CF6)
  - Current: Primary with pulse animation
  - Upcoming: Gray (#9CA3AF)

### Steps:
1. **Topic** - Enter presentation topic/prompt
2. **Options** - Select theme, language, style
3. **Review** - Review outline and customize
4. **Generate** - AI generation in progress

---

## Step 1: Topic Input

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                  🎨 Create Your Presentation                    │
│                                                                 │
│           What would you like to present about?                 │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │  Describe your presentation topic...                     │ │
│  │                                                           │ │
│  │  Example: "Marketing strategy for Q4 2025"              │ │
│  │  "Introduction to Machine Learning"                      │ │
│  │  "Sustainable Energy Solutions"                          │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ☑️ Include web research for current information         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ────────────── or ──────────────                             │
│                                                                 │
│  📋 Start from a template:                                     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│  │Business │ │Education│ │Pitch    │ │Marketing│            │
│  │Plan     │ │         │ │Deck     │ │         │            │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Elements:

**1. Title Section**
- **Icon**: 🎨 Presentation icon
- **Title**: "Create Your Presentation"
- **Subtitle**: "What would you like to present about?"
- **Alignment**: Center
- **Spacing**: 2rem margin bottom

**2. Prompt Input (Auto-resize Textarea)**
```
┌───────────────────────────────────────┐
│                                       │
│  Describe your presentation topic... │  ← Placeholder text
│                                       │
│  Examples shown as gray text          │
│                                       │
└───────────────────────────────────────┘
```
- **Type**: Textarea with auto-resize
- **Min height**: 120px
- **Max height**: 400px
- **Placeholder**: Examples shown
- **Character count**: Show count (max 1000 chars)
- **Border**: 2px border, focus highlight

**3. Web Research Checkbox**
```
☑️ Include web research for current information
```
- **Label**: Explain what web research does
- **Default**: Checked
- **Tooltip**: "Uses Tavily to search for latest information"

**4. Template Quick Start**
- **Divider**: "or" with lines
- **Title**: "📋 Start from a template:"
- **Cards**: 4 template cards in a row

**Template Card**:
```
┌─────────────┐
│  📊         │  ← Icon
│  Business   │  ← Type
│  Plan       │
│             │
│  Click to   │  ← Hover text
│  use        │
└─────────────┘
```

**Templates**:
1. **Business Plan** 📊
   - Pre-fills: "Create a business plan for [company name]"
2. **Education** 🎓
   - Pre-fills: "Educational presentation about [topic]"
3. **Pitch Deck** 🚀
   - Pre-fills: "Investor pitch deck for [startup name]"
4. **Marketing** 📈
   - Pre-fills: "Marketing strategy for [campaign name]"

**Template Card Styling**:
- **Border**: 1px
- **Padding**: 1.5rem
- **Hover**: Shadow, scale 1.05
- **Click**: Fills prompt with template

---

## Step 2: Options Selection

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│              Customize Your Presentation                        │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  📝 Presentation Length                                  │  │
│  │  ┌──────┐  ┌──────┐  ┌──────┐                          │  │
│  │  │ 5-7  │  │ 8-12 │  │13-20 │                          │  │
│  │  │Slides│  │Slides│  │Slides│                          │  │
│  │  └──────┘  └──────┘  └──────┘                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🎨 Theme Selection                                      │  │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                │  │
│  │  │[Myst]│  │[Ocean]│ │[Forest]│ │[Coral]│                │  │
│  │  │ique  │  │       │ │       │ │       │                │  │
│  │  └──────┘  └──────┘  └──────┘  └──────┘                │  │
│  │                                    [+ Custom Theme]      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🌍 Language                                             │  │
│  │  ┌────────────────────────────┐                         │  │
│  │  │  English (US)          ▼  │                         │  │
│  │  └────────────────────────────┘                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🖼️ Image Generation                                     │  │
│  │  ○ AI Generated (Together.ai)                           │  │
│  │  ○ Stock Photos (Unsplash)                              │  │
│  │  ○ No Images                                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  📊 Presentation Style                                   │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐               │  │
│  │  │Professional│ │ Creative │ │ Minimal  │               │  │
│  │  └──────────┘ └──────────┘ └──────────┘               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Section 1: Presentation Length

**Card with 3 options**:
```
┌─────────┐  ┌─────────┐  ┌─────────┐
│  5-7    │  │  8-12   │  │ 13-20   │
│  Slides │  │  Slides │  │  Slides │
│         │  │         │  │         │
│  Quick  │  │Standard │  │In-depth │
└─────────┘  └─────────┘  └─────────┘
```
- **Options**: 5-7, 8-12, 13-20 slides
- **Labels**: Quick, Standard, In-depth
- **Default**: 8-12 (middle option)
- **Selection**: Radio button behavior (single select)
- **Styling**: Border highlight on selected

### Section 2: Theme Selection

**Theme Preview Cards**:
```
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ ████    │  │ ~~~~    │  │ ▓▓▓▓    │  │ ....    │
│ ████    │  │ ~~~~    │  │ ▓▓▓▓    │  │ ....    │
│Mystique │  │ Ocean   │  │ Forest  │  │ Coral   │
└─────────┘  └─────────┘  └─────────┘  └─────────┘
```

**Built-in Themes**:
1. **Mystique** - Dark purple/blue gradient
2. **Ocean** - Blue gradient
3. **Forest** - Green/earth tones
4. **Coral** - Coral/pink tones

**Theme Card**:
- **Preview**: Color gradient sample
- **Name**: Below preview
- **Checkmark**: When selected
- **Hover**: Scale 1.05, shadow

**Custom Theme Button**:
```
┌──────────────────┐
│ + Custom Theme   │
└──────────────────┘
```
- Opens theme creator modal
- Saves to custom_themes table

### Section 3: Language Dropdown

```
┌────────────────────────────┐
│  English (US)          ▼  │
└────────────────────────────┘
  ↓
┌────────────────────────────┐
│ English (US)               │
│ Spanish                    │
│ French                     │
│ German                     │
│ Portuguese                 │
│ Chinese                    │
│ Japanese                   │
└────────────────────────────┘
```

**Languages**:
- English (US)
- Spanish
- French
- German
- Portuguese
- Chinese (Simplified)
- Japanese

### Section 4: Image Generation

**Radio Group**:
```
○ AI Generated (Together.ai)
  Generate unique images with AI

○ Stock Photos (Unsplash)
  Use high-quality stock photos

○ No Images
  Text-only slides
```

- **Default**: AI Generated
- **Description**: Below each option
- **Icon**: Next to each option

### Section 5: Presentation Style

**Style Cards**:
```
┌────────────┐ ┌────────────┐ ┌────────────┐
│Professional│ │  Creative  │ │  Minimal   │
│            │ │            │ │            │
│ Clean &    │ │ Bold &     │ │ Simple &   │
│ Corporate  │ │ Colorful   │ │ Elegant    │
└────────────┘ └────────────┘ └────────────┘
```

**Styles**:
1. **Professional** - Clean, corporate, data-focused
2. **Creative** - Bold colors, graphics, engaging
3. **Minimal** - Simple, elegant, text-focused

---

## Step 3: Review Outline

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│          Review Your Presentation Outline                       │
│                                                                 │
│  We've generated an outline based on your input.                │
│  Feel free to edit before generating slides.                    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  📋 Presentation Outline                                 │  │
│  │                                                          │  │
│  │  1. Introduction                               [Edit]   │  │
│  │     Welcome and Overview                                │  │
│  │                                                          │  │
│  │  2. Problem Statement                          [Edit]   │  │
│  │     Current challenges in the industry                  │  │
│  │                                                          │  │
│  │  3. Our Solution                               [Edit]   │  │
│  │     How we solve the problem                            │  │
│  │                                                          │  │
│  │  4. Key Benefits                               [Edit]   │  │
│  │     - Benefit 1                                         │  │
│  │     - Benefit 2                                         │  │
│  │                                                          │  │
│  │  5. Implementation                             [Edit]   │  │
│  │     Step-by-step process                                │  │
│  │                                                          │  │
│  │  6. Conclusion                                 [Edit]   │  │
│  │     Summary and next steps                              │  │
│  │                                                          │  │
│  │  [+ Add Slide]                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🔄 Regenerate Outline     ⚙️ Adjust Settings           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Outline Section

**Outline Item**:
```
┌───────────────────────────────────────────┐
│  1. Introduction               [Edit] [x] │
│     Welcome and Overview                  │
│                                           │
│     ┌─────────────────────────────────┐  │
│     │ ↑ Move up    ↓ Move down       │  │
│     └─────────────────────────────────┘  │
└───────────────────────────────────────────┘
```

**Elements per item**:
- **Number**: Slide sequence number
- **Title**: Editable on click
- **Description**: Sub-points (editable)
- **Edit button**: Opens edit modal
- **Delete button**: Removes slide
- **Drag handle**: Reorder slides
- **Move up/down arrows**: Alternative reordering

**Edit Modal**:
```
┌─────────────────────────────────────┐
│  Edit Slide                     [×] │
│                                     │
│  Title:                             │
│  ┌─────────────────────────────┐   │
│  │ Introduction                │   │
│  └─────────────────────────────┘   │
│                                     │
│  Content:                           │
│  ┌─────────────────────────────┐   │
│  │ Welcome and Overview        │   │
│  │                             │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Cancel]           [Save Changes]  │
└─────────────────────────────────────┘
```

**Add Slide Button**:
```
┌──────────────┐
│ + Add Slide  │
└──────────────┘
```
- Adds new blank slide at end
- Opens edit modal immediately

### Action Buttons

**Regenerate Outline**:
```
┌──────────────────────┐
│ 🔄 Regenerate Outline│
└──────────────────────┘
```
- Calls AI again with same prompt
- Confirmation dialog before regenerating

**Adjust Settings**:
```
┌─────────────────┐
│ ⚙️ Adjust Settings│
└─────────────────┘
```
- Goes back to Step 2
- Preserves current outline

---

## Step 4: Generation Progress

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│           🤖 Generating Your Presentation                       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                          │  │
│  │        [=========>                    ] 45%             │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Currently generating slide 3 of 12...                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  ✓ Generated outline                                    │  │
│  │  ✓ Created slide structure                              │  │
│  │  ⏳ Generating content...                                │  │
│  │  ⏳ Generating images...                                 │  │
│  │  ⏳ Finalizing presentation...                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  This may take 1-2 minutes...                                  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │             [Cancel Generation]                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Elements:

**1. Title**
- **Icon**: 🤖 Robot/AI icon
- **Text**: "Generating Your Presentation"

**2. Progress Bar**
```
[=========>                    ] 45%
```
- **Width**: 100% of container
- **Height**: 20px
- **Fill color**: Primary gradient
- **Animation**: Smooth fill animation
- **Percentage**: Displayed on right

**3. Status Text**
- "Currently generating slide X of Y..."
- Updates in real-time

**4. Step Checklist**
```
✓ Generated outline            ← Completed (green)
✓ Created slide structure      ← Completed (green)
⏳ Generating content...        ← In progress (blue, animated)
⏳ Generating images...         ← Pending (gray)
⏳ Finalizing presentation...   ← Pending (gray)
```

**Icons**:
- ✓ Checkmark for completed
- ⏳ Hourglass (animated) for in progress
- ⏳ Hourglass (static) for pending

**5. Time Estimate**
- "This may take 1-2 minutes..."
- Small, muted text

**6. Cancel Button**
- Secondary/ghost button
- Confirmation dialog before canceling
- "Are you sure? Progress will be lost."

### Completion State

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│           ✅ Presentation Generated!                            │
│                                                                 │
│  Your presentation "Marketing Strategy Q4" is ready.            │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  [Thumbnail Preview]                                     │  │
│  │                                                          │  │
│  │  12 slides created                                       │  │
│  │  Theme: Mystique                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         [🎨 Edit Presentation]                          │   │
│  │         [👁️ Preview]                                    │   │
│  │         [📊 View Dashboard]                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Success Elements**:
- **Icon**: ✅ Success checkmark
- **Title**: "Presentation Generated!"
- **Presentation name**: From user input
- **Preview card**: Thumbnail + metadata
- **Action buttons**: Edit, Preview, Dashboard

---

## Navigation Buttons

### Bottom Navigation Bar

```
┌─────────────────────────────────────────┐
│  [← Back]               [Next →]       │
└─────────────────────────────────────────┘
```

**Back Button** (Secondary):
- **Icon**: ← Arrow
- **Text**: "Back"
- **Style**: Ghost/outline button
- **Action**: Previous step
- **Disabled**: On step 1

**Next Button** (Primary):
- **Icon**: → Arrow
- **Text**: Changes per step:
  - Step 1: "Next"
  - Step 2: "Next"
  - Step 3: "Generate Presentation"
  - Step 4: "View Presentation"
- **Style**: Primary solid button
- **Validation**: Disabled if required fields empty

---

## Data Requirements

### API Endpoints:

**1. Generate Outline**
```
POST /api/presentations/generate-outline
Body: {
  prompt: string;
  includeWebSearch: boolean;
  slideCount: number;
}
Response: {
  outline: Array<{
    title: string;
    content: string;
  }>;
}
```

**2. Generate Presentation**
```
POST /api/presentations/generate
Body: {
  prompt: string;
  outline: Array<{title, content}>;
  theme: string;
  language: string;
  imageSource: 'ai' | 'stock' | 'none';
  presentationStyle: string;
}
Response: {
  presentation_id: string;
  status: 'generating';
}
```

**3. Check Generation Status**
```
GET /api/presentations/{id}/status
Response: {
  status: 'generating' | 'completed' | 'error';
  progress: number; // 0-100
  current_step: string;
}
```

### Form State Management

```typescript
interface WizardState {
  step: 1 | 2 | 3 | 4;

  // Step 1
  prompt: string;
  includeWebSearch: boolean;

  // Step 2
  slideCount: number;
  theme: string;
  customThemeId?: string;
  language: string;
  imageSource: 'ai' | 'stock' | 'none';
  presentationStyle: string;

  // Step 3
  outline: Array<{
    title: string;
    content: string;
  }>;

  // Step 4
  presentationId?: string;
  generationStatus?: {
    progress: number;
    currentStep: string;
  };
}
```

---

## Responsive Behavior

### Desktop (> 1024px):
- Full width form (max 800px centered)
- All options visible
- Side-by-side layouts

### Tablet (768px - 1024px):
- Narrower form (max 600px)
- 2-column grids where applicable
- Stacked on smaller screens

### Mobile (< 768px):
- Full width
- Single column
- Larger touch targets
- Simplified navigation

---

## Validation Rules

### Step 1:
- ✅ Prompt required (min 10 characters)
- ✅ Max 1000 characters

### Step 2:
- ✅ All fields have defaults
- ✅ No validation needed

### Step 3:
- ✅ At least 3 slides required
- ✅ Each slide must have a title

### Step 4:
- ✅ Wait for generation to complete
- ✅ Handle errors gracefully

---

## Error Handling

### Generation Errors:
```
┌─────────────────────────────────────┐
│  ❌ Generation Failed               │
│                                     │
│  We couldn't generate your          │
│  presentation. Please try again.    │
│                                     │
│  Error: API rate limit exceeded     │
│                                     │
│  [Try Again]    [Edit Settings]    │
└─────────────────────────────────────┘
```

### Network Errors:
- Show error toast
- Allow retry
- Don't lose form data

---

## Loading States

- **Step transitions**: Fade in/out
- **Outline generation**: Skeleton loader
- **Button states**: Spinner in button

---

## Accessibility

- ✅ Keyboard navigation (Tab, Enter, Esc)
- ✅ Screen reader announcements for step changes
- ✅ Focus management
- ✅ ARIA labels for all interactive elements
- ✅ Color contrast compliant

---

## Implementation Notes

**Files to create**:
- `src/pages/PresentationWizard.tsx` - Main wizard
- `src/features/presentations/components/wizard/Step1Topic.tsx`
- `src/features/presentations/components/wizard/Step2Options.tsx`
- `src/features/presentations/components/wizard/Step3Review.tsx`
- `src/features/presentations/components/wizard/Step4Generate.tsx`
- `src/features/presentations/hooks/useWizardState.ts`

---

**Ready for Lovable**: ✅ Complete and ready to design!
