---
name: Medellin Spark Code Standards and Conventions
description: Follow coding standards, file structure, and best practices for the Medellin Spark React + TypeScript + Supabase project. Use when writing code, creating components, or following project conventions. Enforces security and quality standards.
---

# Medellin Spark Code Standards and Conventions

## Purpose

This Skill ensures all code follows Medellin Spark's established patterns for React, TypeScript, Supabase, and project organization.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: shadcn/ui + Radix UI + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **State**: React Query (TanStack Query)
- **Routing**: React Router v6
- **AI**: OpenAI API (via Edge Functions)

## TypeScript Standards

### Strict Mode Rules

```typescript
// ✅ GOOD - Explicit types
interface PresentationData {
  id: string
  title: string
  content: SlideContent[]
  category: 'pitch_deck' | 'business' | 'educational' | 'marketing'
}

const fetchPresentation = async (id: string): Promise<PresentationData> => {
  const { data, error } = await supabase
    .from('presentations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// ❌ BAD - No any types allowed
const getData = async (id: any): Promise<any> => {  // Never use any!
  // ...
}
```

### Type Organization

```typescript
// types/database.ts - Database types
export type Database = {
  public: {
    Tables: {
      presentations: {
        Row: {
          id: string
          profile_id: string
          title: string
          // ...
        }
        Insert: Omit<Row, 'id' | 'created_at'>
        Update: Partial<Insert>
      }
    }
  }
}

// types/presentations.ts - Domain types
export interface Slide {
  id: string
  type: 'cover' | 'content' | 'closing'
  content: string
  layout: 'title' | 'bullets' | 'image'
}
```

## React Component Patterns

### Functional Components Only

```tsx
// ✅ GOOD - Functional component with hooks
interface PitchDeckWizardProps {
  onComplete: (presentationId: string) => void
}

export function PitchDeckWizard({ onComplete }: PitchDeckWizardProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const { user } = useAuth()

  return (
    <div className="container mx-auto p-4">
      {/* Component content */}
    </div>
  )
}

// ❌ BAD - Class components not allowed
class OldComponent extends React.Component {  // Don't use classes!
  // ...
}
```

### Custom Hooks Pattern

```typescript
// hooks/usePresentationQuery.ts
export function usePresentationQuery(id: string) {
  return useQuery({
    queryKey: ['presentation', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('presentations')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!id
  })
}

// Usage in component
const { data, isLoading, error } = usePresentationQuery(presentationId)
```

### Composition Over Props Drilling

```tsx
// ✅ GOOD - Use Context or React Query
// contexts/AuthContext.tsx
const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

// ❌ BAD - Props drilling through multiple levels
<Parent user={user}>
  <Child user={user}>
    <GrandChild user={user}>
      <GreatGrandChild user={user} />  // Too deep!
    </GrandChild>
  </Child>
</Parent>
```

## File Structure

```
src/
├── components/           # Reusable UI components
│   ├── presentation/    # Domain-specific components
│   │   ├── SlideEditor.tsx
│   │   └── ThumbnailPanel.tsx
│   └── ui/              # shadcn/ui components
│       ├── button.tsx
│       └── card.tsx
├── pages/               # Route components (PascalCase.tsx)
│   ├── Dashboard.tsx
│   ├── PitchDeckWizard.tsx
│   └── presentations/
│       └── SlideEditor.tsx
├── hooks/               # Custom React hooks (use*.ts)
│   ├── usePresentationQuery.ts
│   └── useAuth.ts
├── lib/                 # Utilities, config, clients
│   ├── supabase.ts
│   └── utils.ts
├── types/               # TypeScript type definitions
│   ├── database.ts
│   └── presentations.ts
└── stores/              # State management (if needed)
```

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **Components** | PascalCase | `PitchDeckWizard.tsx` |
| **Hooks** | camelCase with `use` prefix | `usePresentationQuery.ts` |
| **Utilities** | camelCase | `formatDate.ts` |
| **Types/Interfaces** | PascalCase | `interface PresentationData` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| **CSS Modules** | kebab-case | `pitch-deck.module.css` |

## Supabase Integration

### Client Initialization

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
```

### Query Patterns

```typescript
// ✅ GOOD - Use React Query for caching
const { data: presentations } = useQuery({
  queryKey: ['presentations', user?.id],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('presentations')
      .select('*')
      .eq('profile_id', user!.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },
  enabled: !!user
})

// ✅ GOOD - Use Mutations for writes
const createPresentation = useMutation({
  mutationFn: async (newPresentation: NewPresentation) => {
    const { data, error } = await supabase
      .from('presentations')
      .insert({
        profile_id: user!.id,
        ...newPresentation
      })
      .select()
      .single()

    if (error) throw error
    return data
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['presentations'] })
    toast.success('Presentation created!')
  }
})
```

## UI/UX Standards

### Tailwind CSS Usage

```tsx
// ✅ GOOD - Utility classes with responsive design
<div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
    Title
  </h1>
</div>

// ✅ GOOD - Use cn() for conditional classes
import { cn } from '@/lib/utils'

<Button
  className={cn(
    "w-full",
    isLoading && "opacity-50 cursor-not-allowed",
    variant === "primary" && "bg-blue-600"
  )}
>
  Submit
</Button>
```

### shadcn/ui Components

```tsx
// ✅ GOOD - Use shadcn/ui components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { toast } from 'sonner'

<Card>
  <CardHeader>
    <h2>Presentation</h2>
  </CardHeader>
  <CardContent>
    <Button onClick={() => toast.success('Saved!')}>
      Save
    </Button>
  </CardContent>
</Card>
```

## Error Handling

### Standard Pattern

```typescript
// ✅ GOOD - Comprehensive error handling
try {
  const response = await fetch(edgeFunctionUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const result = await response.json()
  return result
} catch (error) {
  // User-friendly message
  toast.error('Failed to save presentation. Please try again.')

  // Developer debugging
  console.error('Save presentation error:', {
    error,
    url: edgeFunctionUrl,
    data
  })

  // Re-throw or handle
  throw error
}
```

## Security Standards

### Environment Variables

```typescript
// ✅ GOOD - Only VITE_* in frontend
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// ❌ BAD - Never expose service role key in frontend
const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY  // NEVER!
```

### API Keys in Edge Functions

```typescript
// ✅ GOOD - Server-side only
// supabase/functions/chat/index.ts
const openaiKey = Deno.env.get('OPENAI_API_KEY')

// ❌ BAD - Never in frontend
const key = import.meta.env.VITE_OPENAI_API_KEY  // Security risk!
```

## Git Workflow

### Commit Message Format

```
<type>: <subject>

<body>

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `security`

**Example:**
```
feat: Add pitch deck generation workflow

- Implement multi-turn AI conversation
- Add progress tracking (0-100%)
- Create presentation generation endpoint
- Store conversation history in database

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

### Pre-Commit Checklist

```bash
# 1. Type check
pnpm tsc --noEmit

# 2. Lint
pnpm lint

# 3. No console.log
grep -r "console.log" src/  # Should be empty

# 4. .env.example updated
diff .env .env.example  # Document new variables

# 5. Migrations are idempotent
cat supabase/migrations/latest.sql  # Check IF NOT EXISTS
```

## Performance Best Practices

### React Optimization

```tsx
// ✅ GOOD - Memoize expensive components
const SlidePreview = React.memo(({ slide }: { slide: Slide }) => {
  return <div>{slide.content}</div>
})

// ✅ GOOD - Code splitting
const PitchDeckWizard = lazy(() => import('./pages/PitchDeckWizard'))

<Suspense fallback={<LoadingSpinner />}>
  <PitchDeckWizard />
</Suspense>
```

### Database Optimization

```typescript
// ✅ GOOD - Select only needed columns
.select('id, title, created_at')

// ✅ GOOD - Use indexes
CREATE INDEX idx_presentations_profile_id ON presentations(profile_id);

// ✅ GOOD - Limit results
.limit(20)
.order('created_at', { ascending: false })
```

## Testing Strategy

### Component Testing (Recommended)

```typescript
// TODO: Set up Vitest + React Testing Library
import { render, screen } from '@testing-library/react'
import { PitchDeckWizard } from './PitchDeckWizard'

test('renders chat interface', () => {
  render(<PitchDeckWizard />)
  expect(screen.getByRole('textbox')).toBeInTheDocument()
})
```

### E2E Testing (Playwright)

```typescript
// e2e/pitch-deck.spec.ts
test('complete pitch deck flow', async ({ page }) => {
  await page.goto('/pitch-deck-wizard')
  await page.fill('input', 'I want to create a pitch deck')
  await page.click('button:has-text("Send")')
  await expect(page.locator('text=/Great|Tell me/')).toBeVisible()
})
```

## Common Patterns

### Loading States

```tsx
if (isLoading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />
if (!data) return null

return <Content data={data} />
```

### Form Handling

```tsx
const [formData, setFormData] = useState<FormData>({})

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    await mutation.mutateAsync(formData)
    toast.success('Saved!')
  } catch (error) {
    toast.error('Failed to save')
  }
}
```

## Resources

- React Docs: https://react.dev
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/
- Supabase Docs: https://supabase.com/docs
- shadcn/ui: https://ui.shadcn.com
- TanStack Query: https://tanstack.com/query/latest
