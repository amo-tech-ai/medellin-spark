# 🔌 SUPABASE CONNECTION FOR PITCH DECK GENERATOR

**Purpose:** Connect Lovable to existing Supabase tables for presentations
**Database:** Supabase PostgreSQL (already set up)
**Tables:** Already created and ready to use

---

## ✅ EXISTING SUPABASE TABLES

Your Medellin AI Hub Supabase database already has these tables set up:

### 1. `presentations` table
### 2. `custom_themes` table  
### 3. `favorite_presentations` table
### 4. `generated_images` table
### 5. `profiles` table (user data)

**No database setup needed!** Just connect to these existing tables.

---

## 📋 TABLE STRUCTURES (EXACT FIELD NAMES)

### `presentations` Table

**Purpose:** Store all presentation data

```typescript
{
  // Primary key
  id: string (uuid, auto-generated)
  
  // Required fields
  profile_id: string (uuid, references profiles.id)
  title: string
  
  // Content storage (JSON)
  content: Json  // Slide data: {slides: [{id, title, content, layout}]}
  outline: string[]  // Array of slide titles
  
  // Presentation settings
  theme: string | null  // e.g., "purple", "blue", "dark"
  custom_theme_id: string | null  // references custom_themes.id
  presentation_style: string | null  // "professional" or "casual"
  language: string | null  // e.g., "en-US"
  
  // AI generation data
  prompt: string | null  // Original user prompt
  image_source: string | null  // "ai", "stock", "unsplash"
  search_results: Json | null  // Web search data if used
  
  // Status & metadata
  status: string | null  // "draft", "completed", "archived"
  is_public: boolean | null  // Share with others?
  thumbnail_url: string | null  // Preview image
  
  // Timestamps
  created_at: string | null
  updated_at: string | null
}
```

**Content JSON Structure Example:**
```json
{
  "slides": [
    {
      "id": "slide-1",
      "title": "EventOS Startup Pitch",
      "content": "Welcome to our investor pitch...",
      "layout": "title",
      "notes": "Remember to emphasize the problem"
    },
    {
      "id": "slide-2", 
      "title": "The Problem We Solve",
      "content": "Event organizers struggle with...",
      "layout": "content",
      "notes": "Show the pain point clearly"
    }
  ],
  "slideCount": 10,
  "generatedAt": "2025-10-15T10:30:00Z"
}
```

**Outline Array Example:**
```json
[
  "EventOS Startup Pitch",
  "The Problem We Solve",
  "Our Solution",
  "How It Works",
  "Market Opportunity",
  "Business Model",
  "Traction & Metrics",
  "The Team",
  "Investment Ask",
  "Thank You"
]
```

---

### `custom_themes` Table

**Purpose:** User-created custom presentation themes

```typescript
{
  // Primary key
  id: string (uuid, auto-generated)
  
  // Required fields
  profile_id: string (uuid, references profiles.id)
  name: string
  
  // Theme configuration (JSON)
  colors: Json  // {primary, secondary, background, text, accent}
  fonts: Json  // {heading, body, size}
  
  // Metadata
  is_default: boolean | null  // Built-in theme?
  
  // Timestamps
  created_at: string | null
  updated_at: string | null
}
```

**Colors JSON Structure:**
```json
{
  "primary": "#8B5CF6",
  "secondary": "#F3F4F6",
  "background": "#FFFFFF",
  "text": "#1F2937",
  "accent": "#6366F1"
}
```

**Fonts JSON Structure:**
```json
{
  "heading": "Inter",
  "body": "Inter",
  "headingSize": "32px",
  "bodySize": "16px"
}
```

---

### `profiles` Table

**Purpose:** User profile data (already exists)

```typescript
{
  id: string (uuid)
  user_id: string (references auth.users)
  email: string
  full_name: string
  avatar_url: string | null
  bio: string | null
  company: string | null
  job_title: string | null
  linkedin_url: string | null
  twitter_url: string | null
  website_url: string | null
  created_at: string
  updated_at: string
}
```

---

### `favorite_presentations` Table

**Purpose:** User's favorited presentations

```typescript
{
  profile_id: string (references profiles.id)
  presentation_id: string (references presentations.id)
  created_at: string
}
```

---

### `generated_images` Table

**Purpose:** AI-generated images for presentations

```typescript
{
  id: string (uuid)
  presentation_id: string (references presentations.id)
  url: string
  prompt: string
  provider: string | null  // "dall-e", "stable-diffusion", etc.
  created_at: string
  updated_at: string
}
```

---

## 🎯 LOVABLE SUPABASE CONNECTION PROMPT

```
Hey Lovable! Connect to our existing Supabase database for the pitch deck generator.

IMPORTANT: All tables already exist in Supabase. Do NOT create new tables. Use the exact table and field names below.

SUPABASE CONFIGURATION
----------------------

The Supabase client is already configured at:
- File: src/integrations/supabase/client.ts
- Already imported and ready to use

TABLES TO USE
-------------

1. PRIMARY TABLE: `presentations`
   - Stores all presentation data
   - Key fields:
     * id (uuid, auto-generated)
     * profile_id (current user's profile ID)
     * title (presentation title)
     * content (JSON with slides array)
     * outline (array of slide titles)
     * theme (string: "purple", "blue", "dark")
     * presentation_style (string: "professional" or "casual")
     * status (string: "draft" or "completed")
     * created_at, updated_at (timestamps)

2. THEME TABLE: `custom_themes`
   - For custom user themes
   - Key fields:
     * id, profile_id, name
     * colors (JSON), fonts (JSON)

3. USER TABLE: `profiles`
   - Already exists with user data
   - Use profile_id for all foreign keys

SUPABASE QUERIES TO IMPLEMENT
------------------------------

### 1. CREATE PRESENTATION (Insert)

```typescript
import { supabase } from '@/integrations/supabase/client'

async function createPresentation(title: string, style: string) {
  const { data: profile } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('presentations')
    .insert({
      title: title,
      profile_id: profile.user.id,
      presentation_style: style,
      status: 'draft',
      content: { slides: [] },
      outline: []
    })
    .select()
    .single()
  
  return { data, error }
}
```

### 2. UPDATE OUTLINE

```typescript
async function updateOutline(presentationId: string, outline: string[]) {
  const { data, error } = await supabase
    .from('presentations')
    .update({ outline: outline })
    .eq('id', presentationId)
    .select()
    .single()
  
  return { data, error }
}
```

### 3. SAVE PRESENTATION CONTENT

```typescript
async function saveContent(presentationId: string, slides: any[]) {
  const content = {
    slides: slides,
    slideCount: slides.length,
    generatedAt: new Date().toISOString()
  }
  
  const { data, error } = await supabase
    .from('presentations')
    .update({ 
      content: content,
      status: 'completed',
      updated_at: new Date().toISOString()
    })
    .eq('id', presentationId)
    .select()
    .single()
  
  return { data, error }
}
```

### 4. GET USER'S PRESENTATIONS (List)

```typescript
async function getUserPresentations() {
  const { data: profile } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('presentations')
    .select('*')
    .eq('profile_id', profile.user.id)
    .order('created_at', { ascending: false })
  
  return { data, error }
}
```

### 5. GET SINGLE PRESENTATION (Read)

```typescript
async function getPresentation(id: string) {
  const { data, error } = await supabase
    .from('presentations')
    .select('*')
    .eq('id', id)
    .single()
  
  return { data, error }
}
```

### 6. UPDATE PRESENTATION (Edit)

```typescript
async function updatePresentation(id: string, updates: any) {
  const { data, error } = await supabase
    .from('presentations')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()
  
  return { data, error }
}
```

### 7. DELETE PRESENTATION

```typescript
async function deletePresentation(id: string) {
  const { error } = await supabase
    .from('presentations')
    .delete()
    .eq('id', id)
  
  return { error }
}
```

ROW LEVEL SECURITY (Already Configured)
----------------------------------------

The presentations table has RLS policies:
- Users can only see their own presentations (profile_id = auth.uid())
- Users can insert/update/delete their own presentations

No additional security setup needed!

REAL-TIME SUBSCRIPTIONS (Optional)
-----------------------------------

For live auto-save updates:

```typescript
const channel = supabase
  .channel('presentations')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'presentations',
      filter: `id=eq.${presentationId}`
    },
    (payload) => {
      console.log('Presentation updated:', payload.new)
      // Update UI with new data
    }
  )
  .subscribe()
```

USAGE IN COMPONENTS
-------------------

Example React component:

```typescript
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

function PresentationList() {
  const [presentations, setPresentations] = useState([])
  
  useEffect(() => {
    async function fetchPresentations() {
      const { data: profile } = await supabase.auth.getUser()
      
      const { data, error } = await supabase
        .from('presentations')
        .select('*')
        .eq('profile_id', profile.user.id)
        .order('created_at', { ascending: false })
      
      if (data) setPresentations(data)
    }
    
    fetchPresentations()
  }, [])
  
  return (
    <div>
      {presentations.map(p => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.status}</p>
        </div>
      ))}
    </div>
  )
}
```

KEY POINTS
----------

✅ Use `profile_id` not `userId` (that's the field name in Supabase)
✅ Use `presentations` table (singular is the actual table name)
✅ Content field is JSON type - store slide data as JSON
✅ Outline field is text[] array - store slide titles as array
✅ Always use supabase.auth.getUser() to get current profile_id
✅ RLS is enabled - queries automatically filter by user
✅ Use .select() to return data after insert/update
✅ Use .single() when expecting one result
✅ Use .eq() for WHERE clauses

That's it! Use these exact table names, field names, and query patterns in your code.
```

---

## 🧪 TESTING QUERIES

Test these in Supabase SQL Editor to verify tables exist:

```sql
-- Check presentations table structure
SELECT * FROM presentations LIMIT 1;

-- Check custom_themes table
SELECT * FROM custom_themes LIMIT 1;

-- Check profiles table
SELECT * FROM profiles LIMIT 1;

-- Count user's presentations
SELECT COUNT(*) FROM presentations WHERE profile_id = 'YOUR_PROFILE_ID';
```

---

## 🔍 TYPE CHECKING

Lovable should use TypeScript types from:
`src/integrations/supabase/types.ts`

Example import:
```typescript
import { Database } from '@/integrations/supabase/types'

type Presentation = Database['public']['Tables']['presentations']['Row']
type PresentationInsert = Database['public']['Tables']['presentations']['Insert']
type PresentationUpdate = Database['public']['Tables']['presentations']['Update']
```

---

## ✅ CONNECTION CHECKLIST

Before building features, verify:

- [ ] Supabase client is imported: `import { supabase } from '@/integrations/supabase/client'`
- [ ] Can query presentations table: `supabase.from('presentations').select('*')`
- [ ] Can get current user: `supabase.auth.getUser()`
- [ ] RLS policies work (users see only their data)
- [ ] Can insert/update/delete presentations
- [ ] Types are imported from types.ts file

---

## 🚀 READY TO BUILD

Now you can build the pitch deck generator using these existing Supabase tables!

Key files to use:
- `/src/integrations/supabase/client.ts` - Supabase client
- `/src/integrations/supabase/types.ts` - TypeScript types
- All queries use `supabase.from('presentations')` 
- All user IDs come from `profile_id` field

Simple, clean, and works with your existing database! 🎉
