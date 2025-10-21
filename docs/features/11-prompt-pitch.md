# 🚀 PITCH DECK GENERATOR - ALIGNED WITH PRESENTATION-AI

**Project:** Medellin AI Hub - AI-Powered Pitch Deck Generator  
**Reference:** `/home/sk/medellin-spark/presentation-ai` (Next.js app)  
**Goal:** Build similar functionality in Lovable (React/Vite)  
**Database:** Supabase (already set up)

---

## 📐 ARCHITECTURE ALIGNMENT

We're following the **presentation-ai** structure but adapting it for Lovable/Supabase:

### Presentation-AI Structure (Reference)
```
presentation-ai/
├── src/app/presentation/
│   ├── page.tsx                    → Dashboard/List
│   ├── generate/[id]/page.tsx      → Outline + Theme + Generate
│   └── [id]/page.tsx               → Editor/Viewer
├── src/components/presentation/
│   ├── dashboard/                  → List, Input, Examples
│   ├── outline/                    → Outline editing
│   ├── theme/                      → Theme selection
│   ├── editor/                     → Slide editor
│   └── presentation-page/          → Viewer/Present mode
└── src/states/presentation-state.ts → Global state
```

### Our Lovable Structure (To Build)
```
src/
├── pages/
│   ├── PitchDeck.tsx              → Input form (maps to /pitch-deck)
│   ├── PitchDeckGenerate.tsx      → Outline + Theme (maps to /pitch-deck/:id/generate)
│   └── PresentationView.tsx       → Editor + Viewer (maps to /presentations/:id)
├── components/presentations/
│   ├── PresentationList.tsx       → Dashboard list
│   ├── OutlineEditor.tsx          → Outline editing
│   ├── ThemeSelector.tsx          → Theme picker
│   ├── SlideEditor.tsx            → Slide content editor
│   └── PresentationViewer.tsx     → Full-screen viewer
└── hooks/
    └── usePresentationState.ts    → Manage presentation state
```

---

## 🗺️ ROUTE MAPPING

### Existing Pages (Keep As-Is)
✅ `/dashboard` - Main dashboard with "Generate Pitch Deck" button  
✅ `/startup-profile` - 5-step wizard (data source)  
✅ `/dashboard/pitch-decks` - Presentation library  

### New Pages (To Build)

**Page 1:** `/pitch-deck`  
**Reference:** `presentation-ai/src/app/page.tsx` (initial input)  
**Components:** PresentationInput, PresentationExamples, WebSearchToggle

**Page 2:** `/pitch-deck/:id/generate`  
**Reference:** `presentation-ai/src/app/presentation/generate/[id]/page.tsx`  
**Components:** OutlineList, ThemeSettings, GenerationManager

**Page 3:** `/presentations/:id`  
**Reference:** `presentation-ai/src/app/presentation/[id]/page.tsx`  
**Components:** SlideEditor, PresentationViewer (combined)

---

## 📊 DATA FLOW (Like Presentation-AI)

### Step 1: Initial Input (`/pitch-deck`)
```typescript
// User enters topic, slides, style
// Similar to presentation-ai dashboard input

const handleGenerate = async () => {
  // Create presentation in Supabase
  const { data: presentation } = await supabase
    .from('presentations')
    .insert({
      title: topic,
      profile_id: user.id,
      status: 'draft',
      presentation_style: style,
      content: { slides: [] },
      outline: []
    })
    .select()
    .single()
  
  // Redirect to generate page with ID
  navigate(`/pitch-deck/${presentation.id}/generate`)
}
```

### Step 2: Generate Page (`/pitch-deck/:id/generate`)
```typescript
// Load presentation by ID (like presentation-ai)
const { data: presentation } = await supabase
  .from('presentations')
  .select('*')
  .eq('id', params.id)
  .single()

// Phase A: Generate Outline (AI call)
const outline = await generateOutline({
  topic: presentation.title,
  slideCount: 10,
  style: presentation.presentation_style
})

// Save outline
await supabase
  .from('presentations')
  .update({ outline })
  .eq('id', params.id)

// Phase B: Select Theme
// User picks from 3 themes (purple, blue, dark)

await supabase
  .from('presentations')
  .update({ theme: selectedTheme })
  .eq('id', params.id)

// Phase C: Generate Content
// For each slide in outline, generate content
for (const slideTitle of outline) {
  const content = await generateSlideContent(slideTitle, style)
  slides.push({ id, title: slideTitle, content, layout: 'content' })
}

await supabase
  .from('presentations')
  .update({ 
    content: { slides, slideCount: slides.length },
    status: 'completed'
  })
  .eq('id', params.id)

// Redirect to editor/viewer
navigate(`/presentations/${params.id}`)
```

### Step 3: Presentation Page (`/presentations/:id`)
```typescript
// Load full presentation (like presentation-ai)
const { data: presentation } = await supabase
  .from('presentations')
  .select('*')
  .eq('id', params.id)
  .single()

// Show slides with editor OR viewer mode
const [mode, setMode] = useState<'edit' | 'present'>('edit')

// Auto-save edits (like presentation-ai)
const debouncedSave = useMemo(
  () => debounce(async (content) => {
    await supabase
      .from('presentations')
      .update({ 
        content,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
  }, 2000),
  [params.id]
)
```

---

## 🎨 COMPONENT STRUCTURE (Mirroring Presentation-AI)

### 1. PresentationInput Component
**Reference:** `presentation-ai/src/components/presentation/dashboard/PresentationInput.tsx`

```tsx
// components/presentations/PresentationInput.tsx
export function PresentationInput() {
  const [topic, setTopic] = useState('')
  const [slideCount, setSlideCount] = useState(10)
  const [style, setStyle] = useState('professional')
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1>Create stunning presentations</h1>
      <p>Transform your ideas into professional presentations instantly</p>
      
      {/* Large textarea like presentation-ai */}
      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Describe your topic or paste your content here"
        className="w-full h-48 p-4 border rounded-lg"
      />
      
      <div className="flex gap-4 mt-4">
        {/* Number of slides dropdown */}
        <select value={slideCount} onChange={e => setSlideCount(Number(e.target.value))}>
          <option value={5}>5 slides</option>
          <option value={10}>10 slides</option>
          <option value={15}>15 slides</option>
        </select>
        
        {/* Language selector */}
        <select>
          <option>🇺🇸 English</option>
        </select>
        
        {/* Web Search toggle (future) */}
        <label>
          <input type="checkbox" /> Web Search
        </label>
      </div>
      
      <button 
        onClick={handleGenerate}
        className="w-full py-3 bg-purple-600 text-white rounded-lg mt-4"
      >
        Generate Presentation
      </button>
      
      {/* Example topics (like presentation-ai) */}
      <ExampleTopics onSelect={(topic) => setTopic(topic)} />
    </div>
  )
}
```

### 2. OutlineEditor Component
**Reference:** `presentation-ai/src/components/presentation/outline/OutlineList.tsx`

```tsx
// components/presentations/OutlineEditor.tsx
export function OutlineEditor({ outline, onChange }) {
  // Drag and drop for reordering (use @dnd-kit like presentation-ai)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )
  
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={outline}>
        {outline.map((slide, index) => (
          <SortableItem key={slide.id} id={slide.id}>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              {/* Drag handle */}
              <DragHandle />
              
              {/* Slide number */}
              <span className="text-gray-500">{index + 1}.</span>
              
              {/* Editable title */}
              <input
                value={slide.title}
                onChange={(e) => handleTitleChange(index, e.target.value)}
                className="flex-1 border-none focus:outline-none"
              />
              
              {/* Actions */}
              <button onClick={() => handleEdit(index)}>✏️</button>
              <button onClick={() => handleDelete(index)}>🗑️</button>
            </div>
          </SortableItem>
        ))}
      </SortableContext>
      
      <button onClick={handleAddSlide} className="mt-4">
        + Add Slide
      </button>
    </DndContext>
  )
}
```

### 3. ThemeSelector Component
**Reference:** `presentation-ai/src/components/presentation/theme/ThemeSettings.tsx`

```tsx
// components/presentations/ThemeSelector.tsx
export function ThemeSelector({ selectedTheme, onSelect }) {
  const themes = [
    {
      id: 'purple',
      name: 'Purple',
      colors: {
        primary: '#8B5CF6',
        background: '#FFFFFF',
        text: '#1F2937'
      }
    },
    {
      id: 'blue',
      name: 'Blue',
      colors: {
        primary: '#3B82F6',
        background: '#FFFFFF',
        text: '#1F2937'
      }
    },
    {
      id: 'dark',
      name: 'Dark',
      colors: {
        primary: '#8B5CF6',
        background: '#1F2937',
        text: '#FFFFFF'
      }
    }
  ]
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {themes.map(theme => (
        <div
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          className={`p-6 border rounded-lg cursor-pointer ${
            selectedTheme === theme.id ? 'border-purple-600 ring-2 ring-purple-600' : ''
          }`}
        >
          <h3 className="font-bold mb-2">{theme.name}</h3>
          
          {/* Color dots */}
          <div className="flex gap-2">
            <div 
              className="w-6 h-6 rounded-full" 
              style={{ backgroundColor: theme.colors.primary }}
            />
            <div 
              className="w-6 h-6 rounded-full" 
              style={{ backgroundColor: theme.colors.background }}
            />
            <div 
              className="w-6 h-6 rounded-full" 
              style={{ backgroundColor: theme.colors.text }}
            />
          </div>
          
          {selectedTheme === theme.id && (
            <div className="mt-2 text-purple-600">✓ Selected</div>
          )}
        </div>
      ))}
    </div>
  )
}
```

### 4. SlideEditor Component
**Reference:** `presentation-ai/src/components/presentation/editor/`

```tsx
// components/presentations/SlideEditor.tsx
export function SlideEditor({ presentation, onSave }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [slides, setSlides] = useState(presentation.content.slides)
  const currentSlide = slides[currentSlideIndex]
  
  // Auto-save (like presentation-ai)
  const debouncedSave = useMemo(
    () => debounce((updatedSlides) => {
      onSave({ slides: updatedSlides, slideCount: updatedSlides.length })
    }, 2000),
    [onSave]
  )
  
  const handleContentChange = (newContent) => {
    const updated = slides.map((s, i) => 
      i === currentSlideIndex ? { ...s, content: newContent } : s
    )
    setSlides(updated)
    debouncedSave(updated)
  }
  
  return (
    <div className="flex h-screen">
      {/* Left sidebar - Thumbnails */}
      <div className="w-64 bg-gray-50 overflow-y-auto">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => setCurrentSlideIndex(index)}
            className={`p-4 border-b cursor-pointer ${
              index === currentSlideIndex ? 'bg-purple-100 border-l-4 border-purple-600' : ''
            }`}
          >
            <div className="text-sm font-medium">{index + 1}. {slide.title}</div>
            <div className="text-xs text-gray-500 mt-1 truncate">
              {slide.content}
            </div>
          </div>
        ))}
      </div>
      
      {/* Main editor */}
      <div className="flex-1 p-8">
        {/* Title */}
        <input
          value={currentSlide.title}
          onChange={(e) => {
            const updated = slides.map((s, i) => 
              i === currentSlideIndex ? { ...s, title: e.target.value } : s
            )
            setSlides(updated)
            debouncedSave(updated)
          }}
          className="text-3xl font-bold w-full border-none focus:outline-none mb-4"
        />
        
        {/* Content - Simple textarea for MVP */}
        <textarea
          value={currentSlide.content}
          onChange={(e) => handleContentChange(e.target.value)}
          className="w-full h-96 p-4 border rounded-lg"
        />
        
        {/* Formatting toolbar */}
        <div className="flex gap-2 mt-4">
          <button className="px-3 py-1 border rounded">B</button>
          <button className="px-3 py-1 border rounded">I</button>
          <button className="px-3 py-1 border rounded">U</button>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button 
            onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
            disabled={currentSlideIndex === 0}
            className="px-4 py-2 border rounded"
          >
            ◀ Previous
          </button>
          <span>{currentSlideIndex + 1} / {slides.length}</span>
          <button 
            onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
            disabled={currentSlideIndex === slides.length - 1}
            className="px-4 py-2 border rounded"
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  )
}
```

### 5. PresentationViewer Component
**Reference:** `presentation-ai/src/components/presentation/presentation-page/Main.tsx`

```tsx
// components/presentations/PresentationViewer.tsx
export function PresentationViewer({ presentation }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const slides = presentation.content.slides
  const theme = getTheme(presentation.theme)
  
  // Keyboard navigation (like presentation-ai)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))
      if (e.key === 'ArrowLeft') setCurrentSlide(prev => Math.max(0, prev - 1))
      if (e.key === 'Escape') handleExit()
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [slides.length])
  
  // Auto-hide controls
  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000)
    return () => clearTimeout(timer)
  }, [currentSlide])
  
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ 
        backgroundColor: theme.colors.background,
        color: theme.colors.text
      }}
      onMouseMove={() => setShowControls(true)}
    >
      {/* Slide content */}
      <div className="max-w-4xl w-full px-12">
        <h1 
          className="text-5xl font-bold mb-8"
          style={{ color: theme.colors.primary }}
        >
          {slides[currentSlide].title}
        </h1>
        
        <div className="text-2xl leading-relaxed">
          {slides[currentSlide].content}
        </div>
      </div>
      
      {/* Controls (auto-hide) */}
      {showControls && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              className="px-4 py-2 bg-white/20 rounded hover:bg-white/30"
            >
              ◀ Prev
            </button>
            
            <span className="text-white">
              {currentSlide + 1} / {slides.length}
            </span>
            
            <button 
              onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
              className="px-4 py-2 bg-white/20 rounded hover:bg-white/30"
            >
              Next ▶
            </button>
            
            <button 
              onClick={handleExit}
              className="px-4 py-2 bg-white/20 rounded hover:bg-white/30"
            >
              ✕ Exit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## 🔄 STATE MANAGEMENT (Like Presentation-AI)

### Create usePresentationState Hook
**Reference:** `presentation-ai/src/states/presentation-state.ts`

```typescript
// hooks/usePresentationState.ts
import { create } from 'zustand'

interface PresentationState {
  // Current presentation data
  currentPresentation: Presentation | null
  
  // Generation state
  isGeneratingOutline: boolean
  isGeneratingContent: boolean
  generationProgress: { current: number, total: number }
  
  // Actions
  setCurrentPresentation: (presentation: Presentation) => void
  startOutlineGeneration: () => void
  startContentGeneration: () => void
  updateProgress: (current: number, total: number) => void
}

export const usePresentationState = create<PresentationState>((set) => ({
  currentPresentation: null,
  isGeneratingOutline: false,
  isGeneratingContent: false,
  generationProgress: { current: 0, total: 0 },
  
  setCurrentPresentation: (presentation) => 
    set({ currentPresentation: presentation }),
    
  startOutlineGeneration: () => 
    set({ isGeneratingOutline: true }),
    
  startContentGeneration: () => 
    set({ isGeneratingContent: true }),
    
  updateProgress: (current, total) => 
    set({ generationProgress: { current, total } })
}))
```

---

## 🤖 AI INTEGRATION (Like Presentation-AI)

### generateOutline Function
**Reference:** Similar to presentation-ai AI calls

```typescript
// lib/ai/generateOutline.ts
import Anthropic from '@anthropic-ai/sdk'

export async function generateOutline({
  topic,
  slideCount,
  style
}: {
  topic: string
  slideCount: number
  style: 'professional' | 'casual'
}) {
  const anthropic = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY
  })
  
  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 500,
    messages: [{
      role: 'user',
      content: `Create a ${slideCount} slide ${style} pitch deck outline for: ${topic}.

Return only slide titles as a numbered list, no descriptions.

Example format:
1. Company Name - Startup Pitch
2. The Problem We Solve
3. Our Solution
...

Topic: ${topic}
Slides: ${slideCount}
Style: ${style}`
    }]
  })
  
  // Parse response
  const text = message.content[0].text
  const outline = text
    .split('\n')
    .filter(line => line.match(/^\d+\./))
    .map(line => line.replace(/^\d+\.\s*/, '').trim())
  
  return outline
}
```

### generateSlideContent Function

```typescript
// lib/ai/generateSlideContent.ts
export async function generateSlideContent({
  title,
  topic,
  style
}: {
  title: string
  topic: string
  style: string
}) {
  const anthropic = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY
  })
  
  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 300,
    messages: [{
      role: 'user',
      content: `Write content for a pitch deck slide titled "${title}".

Topic: ${topic}
Style: ${style}

Write 2-3 sentences. Be concise and impactful. Focus on key points only.`
    }]
  })
  
  return message.content[0].text
}
```

---

## 📁 FILE STRUCTURE TO CREATE

```
src/
├── pages/
│   ├── PitchDeck.tsx              NEW - Input form
│   ├── PitchDeckGenerate.tsx      NEW - Outline + Theme + Generate
│   └── PresentationView.tsx       NEW - Editor + Viewer combined
│
├── components/presentations/
│   ├── PresentationInput.tsx      NEW - Topic input form
│   ├── PresentationList.tsx       NEW - List presentations
│   ├── OutlineEditor.tsx          NEW - Edit outline
│   ├── ThemeSelector.tsx          NEW - Pick theme
│   ├── SlideEditor.tsx            NEW - Edit slides
│   ├── PresentationViewer.tsx     NEW - Present mode
│   └── GenerationProgress.tsx     NEW - Show AI progress
│
├── hooks/
│   ├── usePresentationState.ts    NEW - Global state
│   └── usePresentation.ts         NEW - Load from Supabase
│
└── lib/
    ├── ai/
    │   ├── generateOutline.ts     NEW - AI outline generation
    │   └── generateContent.ts     NEW - AI content generation
    └── themes.ts                  NEW - Theme definitions
```

---

## 🔌 SUPABASE INTEGRATION

**Same as before** - Use exact table structure from `/home/sk/medellin-spark/main/lovable/10-supabase.md`

Key points:
- Table: `presentations`
- Fields: `id`, `profile_id`, `title`, `outline`, `content`, `theme`, `presentation_style`, `status`
- Content JSON: `{ slides: [{ id, title, content, layout }], slideCount }`

---

## ✅ BUILD ORDER (5 Days)

### Day 1: Setup + Input Page
- [ ] Create `/pitch-deck` page with input form
- [ ] Add Supabase connection for creating presentation
- [ ] Test: Create presentation, get ID

### Day 2: Generate Page - Outline
- [ ] Create `/pitch-deck/:id/generate` page
- [ ] Implement AI outline generation
- [ ] Add OutlineEditor component with drag-and-drop
- [ ] Test: Generate outline, edit titles

### Day 3: Generate Page - Theme + Content
- [ ] Add ThemeSelector component
- [ ] Implement AI content generation (with progress)
- [ ] Save slides to Supabase
- [ ] Test: Select theme, generate all slides

### Day 4: Presentation Page - Editor
- [ ] Create `/presentations/:id` page
- [ ] Add SlideEditor component
- [ ] Implement auto-save
- [ ] Test: Edit slides, verify saves

### Day 5: Presentation Page - Viewer
- [ ] Add PresentationViewer component
- [ ] Add mode toggle (edit/present)
- [ ] Add keyboard navigation
- [ ] Test: Full flow end-to-end

---

## 🎯 SUCCESS CRITERIA

MVP is done when:
✅ Follows presentation-ai structure patterns
✅ User can create presentation from topic
✅ AI generates 10-slide outline
✅ User can edit outline (reorder, delete, add)
✅ User can select theme (3 options)
✅ AI generates content for all slides
✅ User can edit slide content with auto-save
✅ User can present full-screen with keyboard navigation
✅ All data persists in Supabase

---

That's it! Now you have a structure that aligns with presentation-ai but works in Lovable with Supabase! 🚀
