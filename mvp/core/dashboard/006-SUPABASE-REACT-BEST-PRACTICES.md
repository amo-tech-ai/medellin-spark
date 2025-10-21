# 🚀 Supabase + React Best Practices Guide

**Project**: Medellin Spark
**Tech Stack**: Vite + React + TypeScript + Supabase
**Date**: January 2025

**CRITICAL**: ❌ **NO AUTH DURING DEVELOPMENT** - Auth patterns documented for future production use

---

## 📚 Table of Contents

1. [Project Setup](#project-setup)
2. [Supabase Client Configuration](#supabase-client-configuration)
3. [Environment Variables](#environment-variables)
4. [Data Fetching Patterns](#data-fetching-patterns)
5. [Type Safety with TypeScript](#type-safety-with-typescript)
6. [Error Handling](#error-handling)
7. [Real-Time Subscriptions](#real-time-subscriptions)
8. [Authentication (Future)](#authentication-future)
9. [Performance Optimization](#performance-optimization)
10. [Security Best Practices](#security-best-practices)
11. [Testing Strategies](#testing-strategies)
12. [Common Patterns](#common-patterns)

---

## 1. Project Setup

### Recommended Dependencies

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "@tanstack/react-query": "^5.17.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

### Installation

```bash
# Install Supabase client
pnpm add @supabase/supabase-js

# Install React Query (recommended for data fetching)
pnpm add @tanstack/react-query

# Install React Query DevTools (development)
pnpm add -D @tanstack/react-query-devtools
```

---

## 2. Supabase Client Configuration

### ✅ Correct Setup

**File**: `src/integrations/supabase/client.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
    'Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file.'
  );
}

// Create client with TypeScript support
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'medellin-spark-web'
    }
  }
});

// Export types for TypeScript
export type { SupabaseClient } from '@supabase/supabase-js';
```

### ❌ Common Mistakes

```typescript
// ❌ BAD: Creating multiple clients
const client1 = createClient(url, key);
const client2 = createClient(url, key);

// ❌ BAD: Hardcoding credentials
const supabase = createClient(
  'https://xyz.supabase.co',
  'eyJhbGc...'
);

// ❌ BAD: Missing validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabase = createClient(supabaseUrl, ''); // No key!

// ❌ BAD: Using process.env (Vite uses import.meta.env)
const url = process.env.VITE_SUPABASE_URL; // Won't work in Vite
```

### ✅ Singleton Pattern

```typescript
// Ensure only one client instance
let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}
```

---

## 3. Environment Variables

### ✅ Correct Setup

**File**: `.env`

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://dhesktsqhcxhqfjypulk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Development Mode (NO AUTH)
VITE_DEV_MODE=true
VITE_MOCK_USER_ID=00000000-0000-0000-0000-000000000000
```

**File**: `.env.example`

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Development Mode
VITE_DEV_MODE=true
VITE_MOCK_USER_ID=test_user_id
```

### Important Rules

**✅ DO**:
- Prefix all variables with `VITE_` for Vite access
- Use `.env.example` for documentation
- Add `.env` to `.gitignore`
- Validate variables at app startup

**❌ DON'T**:
- Commit `.env` files to git
- Use `process.env` in Vite (use `import.meta.env`)
- Hardcode credentials anywhere
- Share `.env` files publicly

### Accessing Variables

```typescript
// ✅ CORRECT (Vite)
const url = import.meta.env.VITE_SUPABASE_URL;

// ❌ WRONG (Node.js pattern, won't work in Vite)
const url = process.env.VITE_SUPABASE_URL;

// ✅ Type-safe access
declare global {
  interface ImportMetaEnv {
    VITE_SUPABASE_URL: string;
    VITE_SUPABASE_ANON_KEY: string;
    VITE_DEV_MODE: string;
  }
}
```

---

## 4. Data Fetching Patterns

### Pattern 1: React Query Integration (Recommended)

**Setup**: `src/App.tsx`

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### Pattern 2: Custom Hooks

**✅ Best Practice Pattern**

```typescript
// src/hooks/useEvents.ts
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  is_virtual: boolean;
  registered_count: number;
  status: string;
}

export function useEvents(): UseQueryResult<Event[], Error> {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data;
    }
  });
}

// Usage in component
function EventsList() {
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!events || events.length === 0) return <EmptyState />;

  return (
    <div>
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
```

### Pattern 3: Filtering and Searching

```typescript
// Dynamic filters with React Query
export function useEvents(filters?: {
  status?: string;
  search?: string;
  dateFrom?: string;
}) {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: async () => {
      let query = supabase
        .from('events')
        .select('*');

      // Apply filters
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }

      if (filters?.dateFrom) {
        query = query.gte('event_date', filters.dateFrom);
      }

      query = query.order('event_date', { ascending: true });

      const { data, error } = await query;

      if (error) throw error;
      return data;
    }
  });
}

// Usage
const { data: events } = useEvents({
  status: 'published',
  search: searchTerm,
  dateFrom: new Date().toISOString()
});
```

### Pattern 4: Joined Queries

```typescript
// Fetch related data in one query
export function useEventRegistrations(userId: string) {
  return useQuery({
    queryKey: ['event-registrations', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          id,
          status,
          created_at,
          events!inner (
            id,
            title,
            event_date,
            location,
            is_virtual
          )
        `)
        .eq('profile_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });
}
```

### Pattern 5: Mutations (Create/Update/Delete)

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Create mutation
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (eventData: Partial<Event>) => {
      const { data, error } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch events query
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });
}

// Update mutation
export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Event> }) => {
      const { data: updated, error } = await supabase
        .from('events')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });
}

// Usage
function CreateEventForm() {
  const createEvent = useCreateEvent();

  const handleSubmit = (formData: Partial<Event>) => {
    createEvent.mutate(formData, {
      onSuccess: (data) => {
        toast.success('Event created!');
        navigate(`/events/${data.id}`);
      },
      onError: (error) => {
        toast.error(`Failed to create event: ${error.message}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={createEvent.isPending}>
        {createEvent.isPending ? 'Creating...' : 'Create Event'}
      </button>
    </form>
  );
}
```

### Pattern 6: Aggregate Queries

```typescript
// Count queries
export function useDashboardMetrics() {
  return useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const [eventsCount, jobsCount, perksCount, decksCount] = await Promise.all([
        supabase.from('registrations').select('*', { count: 'exact', head: true }),
        supabase.from('job_applications').select('*', { count: 'exact', head: true }),
        supabase.from('perk_claims').select('*', { count: 'exact', head: true }),
        supabase.from('presentations').select('*', { count: 'exact', head: true })
      ]);

      return {
        events: eventsCount.count ?? 0,
        jobs: jobsCount.count ?? 0,
        perks: perksCount.count ?? 0,
        decks: decksCount.count ?? 0
      };
    }
  });
}
```

---

## 5. Type Safety with TypeScript

### Pattern 1: Database Types Generation

```bash
# Generate types from Supabase schema
npx supabase gen types typescript --project-id dhesktsqhcxhqfjypulk > src/integrations/supabase/types.ts
```

### Pattern 2: Using Generated Types

```typescript
// src/integrations/supabase/types.ts (auto-generated)
export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          title: string;
          event_date: string;
          // ... all columns
        };
        Insert: {
          id?: string;
          title: string;
          event_date: string;
          // ... required and optional fields for insert
        };
        Update: {
          id?: string;
          title?: string;
          event_date?: string;
          // ... all optional for update
        };
      };
    };
  };
};

// Use types in client
import { Database } from './types';

const supabase = createClient<Database>(url, key);

// Now queries are fully typed
const { data } = await supabase
  .from('events') // ✅ Autocomplete available
  .select('title, event_date') // ✅ Column names validated
  .eq('status', 'published'); // ✅ Type-safe
```

### Pattern 3: Custom Interface Definitions

```typescript
// src/types/events.types.ts
export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  is_virtual: boolean;
  capacity: number | null;
  registered_count: number;
  status: 'draft' | 'published' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface EventWithOrganizer extends Event {
  organizer: {
    id: string;
    name: string;
    logo_url: string | null;
  };
}

export type EventStatus = Event['status'];
```

### Pattern 4: Type-Safe Query Builders

```typescript
// Type-safe query builder helper
type QueryBuilder<T> = {
  filters?: Partial<Record<keyof T, unknown>>;
  orderBy?: keyof T;
  limit?: number;
};

export function useTypedQuery<T>(
  table: string,
  options: QueryBuilder<T>
) {
  return useQuery({
    queryKey: [table, options],
    queryFn: async () => {
      let query = supabase.from(table).select('*');

      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      if (options.orderBy) {
        query = query.order(options.orderBy as string);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as T[];
    }
  });
}

// Usage
const { data } = useTypedQuery<Event>('events', {
  filters: { status: 'published' },
  orderBy: 'event_date',
  limit: 10
});
```

---

## 6. Error Handling

### Pattern 1: Global Error Handler

```typescript
// src/lib/supabaseErrorHandler.ts
export class SupabaseError extends Error {
  code?: string;
  details?: string;
  hint?: string;

  constructor(message: string, code?: string, details?: string) {
    super(message);
    this.name = 'SupabaseError';
    this.code = code;
    this.details = details;
  }
}

export function handleSupabaseError(error: unknown): SupabaseError {
  if (error && typeof error === 'object' && 'code' in error) {
    const pgError = error as { code: string; message: string; details?: string };

    // PostgreSQL error codes
    switch (pgError.code) {
      case '23505': // Unique violation
        return new SupabaseError(
          'This record already exists',
          pgError.code,
          pgError.details
        );

      case '23503': // Foreign key violation
        return new SupabaseError(
          'Related record not found',
          pgError.code,
          pgError.details
        );

      case '42P01': // Table does not exist
        return new SupabaseError(
          'Database table not found',
          pgError.code,
          pgError.details
        );

      default:
        return new SupabaseError(
          pgError.message || 'Database error',
          pgError.code,
          pgError.details
        );
    }
  }

  if (error instanceof Error) {
    return new SupabaseError(error.message);
  }

  return new SupabaseError('Unknown error occurred');
}
```

### Pattern 2: Error Boundaries

```typescript
// src/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Pattern 3: Query Error Handling

```typescript
// Custom hook with error handling
export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*');

      if (error) throw handleSupabaseError(error);
      return data;
    },
    retry: (failureCount, error) => {
      // Don't retry on 404 or auth errors
      if (error instanceof SupabaseError) {
        if (error.code === 'PGRST116' || error.code?.startsWith('42')) {
          return false;
        }
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    }
  });
}

// Component usage
function EventsList() {
  const { data, error, isLoading, refetch } = useEvents();

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error loading events</AlertTitle>
        <AlertDescription>
          {error instanceof SupabaseError ? error.message : 'Unknown error'}
        </AlertDescription>
        <Button onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </Alert>
    );
  }

  // ... rest of component
}
```

---

## 7. Real-Time Subscriptions

### Pattern 1: Basic Subscription

```typescript
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function useRealtimeEvents() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('events_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          console.log('Event change:', payload);

          // Invalidate events query to refetch
          queryClient.invalidateQueries({ queryKey: ['events'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
```

### Pattern 2: Optimistic Updates with Real-Time

```typescript
export function useRealtimeEventsWithOptimistic() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('events_realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'events' },
        (payload) => {
          // Add new event optimistically
          queryClient.setQueryData<Event[]>(['events'], (old = []) => {
            return [payload.new as Event, ...old];
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'events' },
        (payload) => {
          // Update event optimistically
          queryClient.setQueryData<Event[]>(['events'], (old = []) => {
            return old.map(event =>
              event.id === payload.new.id ? (payload.new as Event) : event
            );
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'events' },
        (payload) => {
          // Remove event optimistically
          queryClient.setQueryData<Event[]>(['events'], (old = []) => {
            return old.filter(event => event.id !== payload.old.id);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
```

### Pattern 3: Filtered Real-Time

```typescript
// Only listen to published events
export function useRealtimePublishedEvents() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('published_events')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events',
          filter: 'status=eq.published' // Only published events
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['events'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
```

---

## 8. Authentication (Future)

**Note**: ❌ **NO AUTH DURING DEVELOPMENT** - These patterns are for production implementation

### Pattern 1: Auth Hook

```typescript
// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, session, loading, signOut };
}
```

### Pattern 2: Protected Routes

```typescript
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = '/auth'
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

// Usage in App.tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Pattern 3: Row Level Security (RLS)

```sql
-- Enable RLS on tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read published events
CREATE POLICY "Public can view published events"
ON events FOR SELECT
USING (status = 'published');

-- Policy: Users can only update their own registrations
CREATE POLICY "Users can update own registrations"
ON registrations FOR UPDATE
USING (auth.uid() = profile_id);

-- Policy: Users can insert their own data
CREATE POLICY "Users can insert own data"
ON presentations FOR INSERT
WITH CHECK (auth.uid() = profile_id);
```

---

## 9. Performance Optimization

### Pattern 1: Query Optimization

```typescript
// ❌ BAD: Fetching all columns
const { data } = await supabase
  .from('events')
  .select('*');

// ✅ GOOD: Select only needed columns
const { data } = await supabase
  .from('events')
  .select('id, title, event_date, location');

// ✅ GOOD: Use pagination
const { data } = await supabase
  .from('events')
  .select('*')
  .range(0, 9); // First 10 items

// ✅ GOOD: Limit results
const { data } = await supabase
  .from('events')
  .select('*')
  .limit(10);
```

### Pattern 2: React Query Caching

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
      refetchOnWindowFocus: false, // Don't refetch on window focus
      refetchOnMount: false, // Don't refetch on component mount if data exists
    }
  }
});
```

### Pattern 3: Prefetching

```typescript
// Prefetch data before user navigates
function EventsList() {
  const queryClient = useQueryClient();

  const handleEventHover = (eventId: string) => {
    // Prefetch event details
    queryClient.prefetchQuery({
      queryKey: ['event', eventId],
      queryFn: () => fetchEventDetails(eventId)
    });
  };

  return (
    <div>
      {events.map(event => (
        <div key={event.id} onMouseEnter={() => handleEventHover(event.id)}>
          {event.title}
        </div>
      ))}
    </div>
  );
}
```

### Pattern 4: Virtualization for Long Lists

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualizedEventList({ events }: { events: Event[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: events.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Estimated row height
    overscan: 5 // Render 5 extra items above/below viewport
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`
            }}
          >
            <EventCard event={events[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 10. Security Best Practices

### ✅ DO

**1. Use Environment Variables**
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

**2. Enable RLS (Production)**
```sql
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
```

**3. Validate Input**
```typescript
function validateEventData(data: unknown): Event {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid event data');
  }

  const event = data as Partial<Event>;

  if (!event.title || event.title.trim().length === 0) {
    throw new Error('Event title is required');
  }

  if (!event.event_date) {
    throw new Error('Event date is required');
  }

  return event as Event;
}
```

**4. Sanitize User Input**
```typescript
import DOMPurify from 'isomorphic-dompurify';

function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html);
}
```

### ❌ DON'T

**1. Don't expose sensitive data in frontend**
```typescript
// ❌ BAD: Using service role key in frontend
const supabase = createClient(url, serviceRoleKey); // NEVER!

// ✅ GOOD: Use anon key
const supabase = createClient(url, anonKey);
```

**2. Don't trust client-side validation**
```typescript
// ❌ BAD: Only client-side validation
if (data.title) {
  await supabase.from('events').insert(data);
}

// ✅ GOOD: Database constraints + client validation
// Database: ALTER TABLE events ADD CONSTRAINT title_not_empty CHECK (title != '');
```

**3. Don't log sensitive information**
```typescript
// ❌ BAD
console.log('User data:', user); // May contain tokens

// ✅ GOOD
console.log('User ID:', user.id); // Only log what's needed
```

---

## 11. Testing Strategies

### Pattern 1: Mock Supabase Client

```typescript
// src/__mocks__/supabase.ts
export const mockSupabase = {
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
  }))
};
```

### Pattern 2: Integration Tests

```typescript
// src/hooks/__tests__/useEvents.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEvents } from '../useEvents';

test('fetches events successfully', async () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const { result } = renderHook(() => useEvents(), { wrapper });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toBeDefined();
  expect(Array.isArray(result.current.data)).toBe(true);
});
```

---

## 12. Common Patterns

### Pattern: Loading, Error, Empty States

```typescript
function EventsList() {
  const { data: events, isLoading, error } = useEvents();

  // Loading state
  if (isLoading) {
    return (
      <div className="grid gap-4">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Failed to load events</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'Unknown error'}
        </AlertDescription>
      </Alert>
    );
  }

  // Empty state
  if (!events || events.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No events found"
        description="Be the first to create an event"
        action={{
          label: "Create Event",
          onClick: () => navigate('/events/new')
        }}
      />
    );
  }

  // Success state
  return (
    <div className="grid gap-4">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
```

---

## Quick Reference Checklist

### Setup Checklist
- [ ] Install @supabase/supabase-js
- [ ] Install @tanstack/react-query
- [ ] Create supabase client in src/integrations/supabase/client.ts
- [ ] Set up .env with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- [ ] Add .env to .gitignore
- [ ] Wrap app with QueryClientProvider
- [ ] Add React Query DevTools

### Development Checklist
- [ ] Use import.meta.env (not process.env)
- [ ] Prefix env vars with VITE_
- [ ] Use React Query for all data fetching
- [ ] Define TypeScript interfaces for data
- [ ] Handle loading, error, and empty states
- [ ] Use handleSupabaseError for error handling
- [ ] Implement proper error boundaries

### Performance Checklist
- [ ] Select only needed columns
- [ ] Use pagination for large datasets
- [ ] Set appropriate staleTime and cacheTime
- [ ] Prefetch data when possible
- [ ] Use virtualization for long lists

### Security Checklist
- [ ] Never commit .env files
- [ ] Use anon key (not service role key)
- [ ] Enable RLS in production
- [ ] Validate all user input
- [ ] Sanitize HTML content
- [ ] Don't log sensitive data

---

**Document Version**: 1.0
**Last Updated**: January 2025
**Status**: Production Ready ✅
