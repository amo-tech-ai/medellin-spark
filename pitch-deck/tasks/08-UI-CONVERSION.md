# 📦 TASK 8: CONVERT WIZARD UI TO LANDING PAGE STYLE

**Priority**: 🟡 MEDIUM
**Estimated Time**: 20-30 minutes
**Dependencies**: None (UI change only)
**Status**: 🔴 NOT STARTED

---

## 🎯 OBJECTIVE

Convert `/pitch-deck-wizard` from chat-style to landing page style like `/pitch-deck`, keeping the progress tracker on the left.

---

## 📊 CURRENT vs PREFERRED LAYOUT

### Current: `/pitch-deck-wizard` (Chat Interface)
```
┌─────────────────────────────────────────────────┐
│  Left Sidebar           │  Chat Area            │
│                         │                       │
│  Progress               │  Messages:            │
│  ├─ 0% complete         │  ┌─────────────────┐ │
│                         │  │ AI: Hi! I'm...  │ │
│  Data Collected:        │  └─────────────────┘ │
│  - Company Name         │  ┌─────────────────┐ │
│  - Industry             │  │ User: ...       │ │
│  - Problem              │  └─────────────────┘ │
│  - Solution             │                       │
│  - Target Market        │  [Input field]        │
│  - Business Model       │  [Send Button]        │
└─────────────────────────────────────────────────┘
```

### Preferred: `/pitch-deck` (Clean Landing Page)
```
┌─────────────────────────────────────────────────┐
│              Hero Section                       │
│  "Create stunning presentations"                │
│  "Transform your ideas into professional..."    │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ Describe your topic or paste content     │ │
│  │                                           │ │
│  │ [Large Textarea - 6 rows]                │ │
│  │                                           │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  [Number of Slides] [Language] [Web Search]     │
│                                                 │
│  [Generate Presentation Button - Full Width]    │
│                                                 │
│  ✨ Try these examples                          │
│  [Example Cards Grid - 2 columns]               │
└─────────────────────────────────────────────────┘
```

### Target: Wizard with Landing Page Style + Progress Sidebar
```
┌─────────────────────────────────────────────────┐
│  Progress (Left) │  Landing Page Style          │
│                  │                              │
│  0% complete     │  "Create stunning..."        │
│                  │                              │
│  Data Collected: │  ┌────────────────────────┐ │
│  - Company Name  │  │ Large Textarea       │  │
│  - Industry      │  │ (6 rows height)      │  │
│  - Problem       │  │                      │  │
│  - Solution      │  └────────────────────────┘ │
│  - Target Market │                              │
│  - Business Model│  [Options: Slides, Language] │
│                  │                              │
│                  │  [Generate Button]           │
│                  │                              │
│                  │  ✨ Examples (optional)      │
└─────────────────────────────────────────────────┘
```

---

## 🔧 STEP-BY-STEP INSTRUCTIONS

### Step 1: Read Current Pitch Deck Page

```bash
# Examine the preferred layout
cat /home/sk/mde/src/pages/PitchDeck.tsx
```

Identify key components:
- Hero section structure
- Large textarea input
- Generate button styling
- Example cards (optional)

---

### Step 2: Backup Current Wizard

```bash
cd /home/sk/mde/src/pages
cp PitchDeckWizard.tsx PitchDeckWizard.backup.tsx
```

---

### Step 3: Update PitchDeckWizard Layout

Edit `/home/sk/mde/src/pages/PitchDeckWizard.tsx`

**Keep**:
- Left sidebar with Progress
- Data Collected list
- Completeness percentage
- State management logic

**Replace**:
- Chat message interface → Hero section
- Message bubbles → Large textarea
- Chat input → Description textarea
- Send button → Generate Presentation button

**Key Changes**:

1. **Replace chat messages section** with hero section:
```tsx
{/* Hero Section - Replace chat messages */}
<div className="flex-1 flex flex-col items-center justify-center p-8">
  <div className="max-w-2xl w-full space-y-6">
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold">
        Create stunning presentations
      </h1>
      <p className="text-muted-foreground">
        Transform your ideas into professional presentations instantly.
        Just describe your topic and let AI do the rest.
      </p>
    </div>

    <Textarea
      placeholder="Describe your topic or paste your content here

Example: Create a pitch deck for an event management system for businesses"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="min-h-[200px] resize-none"
    />

    <Button
      onClick={handleSend}
      disabled={!inputValue.trim() || isTyping}
      className="w-full"
      size="lg"
    >
      <Sparkles className="mr-2 h-5 w-5" />
      {isTyping ? "Processing..." : "Generate Presentation"}
    </Button>
  </div>
</div>
```

2. **Update handleSend** to show AI response in dialog or toast:
```tsx
const handleSend = async () => {
  if (!inputValue.trim()) return;

  setIsTyping(true);

  try {
    const data = await apiClient.post<PitchDeckAssistantResponse>('/pitch-deck-assistant', {
      message: inputValue,
      conversation_id: conversationId,
      profile_id: user?.id || '00000000-0000-0000-0000-000000000000',
    });

    // Update state
    setConversationId(data.conversation_id);
    setCompleteness(data.completeness);
    setCollectedData(data.collected_data);
    setReadyToGenerate(data.ready_to_generate);

    // Show AI response as toast or dialog
    toast.success(data.message);

    // If ready, auto-generate
    if (data.ready_to_generate) {
      await handleGenerate();
    }

  } catch (error) {
    toast.error("Failed to process request");
  } finally {
    setIsTyping(false);
  }
};
```

3. **Keep Progress Sidebar** (no changes needed):
```tsx
{/* Left Sidebar - Keep as is */}
<div className="hidden md:block w-64 border-r bg-card">
  {/* Progress and Data Collected */}
</div>
```

---

### Step 4: Test the New Layout

```bash
# Start frontend
cd /home/sk/mde
npm run dev
```

Visit: http://localhost:8080/pitch-deck-wizard

**Verify**:
- [ ] Left sidebar shows progress
- [ ] Center shows hero section
- [ ] Large textarea for input
- [ ] Generate button visible
- [ ] No chat messages
- [ ] Clean landing page feel

---

### Step 5: Optional - Add Example Cards

Below the hero section, add example cards like `/pitch-deck`:

```tsx
<div className="max-w-6xl mx-auto px-4 py-12">
  <div className="text-center mb-8">
    <h2 className="text-2xl font-semibold mb-2">
      ✨ Try these examples
    </h2>
    <p className="text-muted-foreground">
      Click any example to get started instantly
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-4">
    {/* Example cards */}
  </div>
</div>
```

---

## ✅ SUCCESS CRITERIA

**Layout**:
- [ ] Progress sidebar on left (unchanged)
- [ ] Hero section in center
- [ ] Large textarea input (200px+ height)
- [ ] Generate button (full width)
- [ ] No chat message bubbles
- [ ] Clean landing page aesthetic

**Functionality**:
- [ ] Input value captured
- [ ] Generate button triggers AI
- [ ] Progress updates on response
- [ ] Data collected updates
- [ ] Ready to generate works
- [ ] Redirects to outline when ready

**Polish**:
- [ ] Responsive design works
- [ ] Loading states clear
- [ ] Error handling present
- [ ] Matches `/pitch-deck` style

---

## 🚨 TROUBLESHOOTING

### Layout Breaks on Mobile
```tsx
// Ensure responsive classes
<div className="flex flex-col md:flex-row">
  <div className="hidden md:block w-64">
    {/* Sidebar - hide on mobile */}
  </div>
  <div className="flex-1">
    {/* Main content */}
  </div>
</div>
```

### Textarea Too Small
```tsx
// Increase min-height
<Textarea className="min-h-[250px]" />
```

### Button Not Full Width
```tsx
// Add w-full class
<Button className="w-full" size="lg">
```

---

## 📝 ALTERNATIVE: Keep Both Layouts

**Option A**: Keep chat as alternate route
```bash
# Create new route for landing style
/pitch-deck-wizard      → Landing page style (new)
/pitch-deck-chat        → Chat style (current)
```

**Option B**: Toggle between styles
```tsx
const [viewMode, setViewMode] = useState<'landing' | 'chat'>('landing');

// Show toggle button
<Button onClick={() => setViewMode(prev => prev === 'landing' ? 'chat' : 'landing')}>
  {viewMode === 'landing' ? 'Chat View' : 'Landing View'}
</Button>
```

---

## 📝 PROOF OF COMPLETION

**Screenshot showing**:
1. Left sidebar with progress
2. Hero section with title
3. Large textarea
4. Generate button
5. No chat bubbles

**Verification**:
```bash
# Check component structure
grep -n "Hero Section" /home/sk/mde/src/pages/PitchDeckWizard.tsx
# Should show hero section code

grep -n "min-h-\[200px\]" /home/sk/mde/src/pages/PitchDeckWizard.tsx
# Should show textarea with proper height
```

**Expected**: Clean landing page UI with progress sidebar

---

**Created**: October 26, 2025
**Estimated Time**: 20-30 minutes
**Difficulty**: ⭐⭐ Medium (UI restructuring)
**Impact**: HIGH (Better UX, cleaner interface)
