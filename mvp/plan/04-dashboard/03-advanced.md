# Dashboard - Advanced Implementation

**Phase**: Professional Features
**Time**: 10-13 hours (Week 3-4)
**Priority**: 🟡 MEDIUM
**Difficulty**: Advanced
**Prerequisites**: 01-core.md and 02-intermediate.md must be complete

---

## Overview

Add professional features: charts and analytics, advanced filtering, performance optimization, testing coverage, and production polish.

**Outcome**: Production-ready dashboard with analytics, optimized performance, and comprehensive testing.

---

## Implementation Steps

### Step 1: Charts & Analytics (5-6 hours)

**Install Dependencies**:
```bash
pnpm add recharts
```

**Create**: `src/components/dashboard/charts/MetricsChart.tsx`

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MetricsChartProps {
  data: Array<{
    date: string;
    events: number;
    jobs: number;
    decks: number;
  }>;
}

export function MetricsChart({ data }: MetricsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="events" stroke="#8b5cf6" name="Events" />
        <Line type="monotone" dataKey="jobs" stroke="#6366f1" name="Jobs" />
        <Line type="monotone" dataKey="decks" stroke="#ec4899" name="Pitch Decks" />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

**Create**: `src/pages/DashboardAnalytics.tsx`

```typescript
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricsChart } from '@/components/dashboard/charts/MetricsChart';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function DashboardAnalytics() {
  const { data: analytics, isLoading } = useAnalytics();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track your engagement and progress
          </p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="decks">Pitch Decks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Over Time</CardTitle>
                <CardDescription>Your engagement over the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                {!isLoading && analytics && (
                  <MetricsChart data={analytics.timeSeriesData} />
                )}
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Total Events</CardTitle>
                  <CardDescription>Registered events</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analytics?.totals.events || 0}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Job Applications</CardTitle>
                  <CardDescription>Total applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analytics?.totals.jobs || 0}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pitch Decks</CardTitle>
                  <CardDescription>Created presentations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analytics?.totals.decks || 0}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs for detailed analytics */}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
```

**Create**: `src/hooks/useAnalytics.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      // Fetch data for the past 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const [registrations, applications, presentations] = await Promise.all([
        supabase.from('registrations')
          .select('created_at')
          .gte('created_at', thirtyDaysAgo.toISOString()),
        supabase.from('job_applications')
          .select('created_at')
          .gte('created_at', thirtyDaysAgo.toISOString()),
        supabase.from('presentations')
          .select('created_at')
          .gte('created_at', thirtyDaysAgo.toISOString())
      ]);

      // Group by day
      const timeSeriesData = generateTimeSeriesData(
        registrations.data || [],
        applications.data || [],
        presentations.data || []
      );

      return {
        timeSeriesData,
        totals: {
          events: registrations.data?.length || 0,
          jobs: applications.data?.length || 0,
          decks: presentations.data?.length || 0,
        },
      };
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

function generateTimeSeriesData(registrations: any[], applications: any[], presentations: any[]) {
  const data: any[] = [];
  const days = 30;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    data.push({
      date: dateStr,
      events: registrations.filter(r => r.created_at.startsWith(dateStr)).length,
      jobs: applications.filter(a => a.created_at.startsWith(dateStr)).length,
      decks: presentations.filter(p => p.created_at.startsWith(dateStr)).length,
    });
  }

  return data;
}
```

---

### Step 2: Advanced Filters & Search (2-3 hours)

**Create**: `src/components/dashboard/AdvancedFilters.tsx`

```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Filter } from 'lucide-react';

interface AdvancedFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function AdvancedFilters({ onFilterChange }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    location: 'all',
    remote: 'all',
    dateRange: 'all',
  });

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Search</Label>
            <Input
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={filters.type} onValueChange={(v) => setFilters({ ...filters, type: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-Time</SelectItem>
                <SelectItem value="part-time">Part-Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Select value={filters.location} onValueChange={(v) => setFilters({ ...filters, location: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="medellin">Medellín</SelectItem>
                <SelectItem value="bogota">Bogotá</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Remote Work</Label>
            <Select value={filters.remote} onValueChange={(v) => setFilters({ ...filters, remote: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="yes">Remote Only</SelectItem>
                <SelectItem value="no">On-Site Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

---

### Step 3: Performance Optimization (2-3 hours)

**Create**: `src/utils/queryCache.ts`

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
```

**Implement Pagination**:

```typescript
// src/hooks/useJobsPaginated.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useJobsPaginated(page: number, pageSize: number = 20) {
  return useQuery({
    queryKey: ['jobs', page, pageSize],
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await supabase
        .from('jobs')
        .select('*', { count: 'exact' })
        .eq('status', 'published')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      return {
        jobs: data,
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
      };
    },
    staleTime: 10 * 60 * 1000,
  });
}
```

**Add Virtual Scrolling for Large Lists**:

```bash
pnpm add react-window
```

```typescript
// src/components/dashboard/VirtualJobList.tsx
import { FixedSizeList as List } from 'react-window';
import { JobCard } from './JobCard';

interface VirtualJobListProps {
  jobs: any[];
  height: number;
}

export function VirtualJobList({ jobs, height }: VirtualJobListProps) {
  const Row = ({ index, style }: any) => (
    <div style={style}>
      <JobCard job={jobs[index]} />
    </div>
  );

  return (
    <List
      height={height}
      itemCount={jobs.length}
      itemSize={200}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

---

### Step 4: Testing Coverage (3-4 hours)

**Install Testing Dependencies**:
```bash
pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest
```

**Create**: `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Create**: `src/test/setup.ts`

```typescript
import '@testing-library/jest-dom';
```

**Create**: `src/hooks/__tests__/useDashboardMetrics.test.ts`

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDashboardMetrics } from '../useDashboardMetrics';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useDashboardMetrics', () => {
  it('fetches dashboard metrics', async () => {
    const { result } = renderHook(() => useDashboardMetrics(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toHaveProperty('events');
    expect(result.current.data).toHaveProperty('jobs');
    expect(result.current.data).toHaveProperty('decks');
  });
});
```

**Create**: `src/components/__tests__/MetricCard.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { MetricCard } from '../dashboard/MetricCard';
import { Calendar } from 'lucide-react';

describe('MetricCard', () => {
  it('renders metric value and title', () => {
    render(
      <MetricCard
        title="Events"
        value={42}
        icon={Calendar}
      />
    );

    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders trend when provided', () => {
    render(
      <MetricCard
        title="Events"
        value={42}
        icon={Calendar}
        trend={{ value: '+5 this month', positive: true }}
      />
    );

    expect(screen.getByText('+5 this month')).toBeInTheDocument();
  });
});
```

**Add Test Scripts** to `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

### Step 5: Production Polish (2-3 hours)

**Error Boundary**:

```typescript
// src/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
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

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <Button onClick={() => window.location.reload()}>
                Reload Page
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Loading Skeleton Improvements**:

```typescript
// src/components/dashboard/SkeletonCard.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  );
}
```

**Performance Monitoring**:

```typescript
// src/utils/performance.ts
export function measureComponentRender(componentName: string) {
  if (typeof window !== 'undefined' && window.performance) {
    const start = performance.now();

    return () => {
      const end = performance.now();
      console.log(`${componentName} render time: ${(end - start).toFixed(2)}ms`);
    };
  }

  return () => {};
}
```

---

## Success Criteria

### Charts & Analytics
- [ ] Metrics chart displays correctly
- [ ] Time series data accurate
- [ ] Analytics page shows totals
- [ ] Recharts responsive on mobile

### Filtering & Search
- [ ] Advanced filters popover works
- [ ] All filter options functional
- [ ] Filters combine correctly
- [ ] Search is performant

### Performance
- [ ] Pagination working
- [ ] Virtual scrolling for large lists
- [ ] Query caching configured
- [ ] Lighthouse score > 90

### Testing
- [ ] Hooks have unit tests
- [ ] Components have tests
- [ ] Test coverage > 70%
- [ ] All tests pass

### Production
- [ ] Error boundary catches errors
- [ ] Loading states polished
- [ ] No console errors/warnings
- [ ] Mobile responsive

---

## Production Checklist

```bash
# 1. Run all tests
pnpm test

# 2. Check TypeScript
pnpm tsc --noEmit

# 3. Build production bundle
pnpm build

# 4. Check bundle size
du -sh dist

# 5. Run Lighthouse audit
# Open Chrome DevTools → Lighthouse → Run

# 6. Test on mobile device
# Use Chrome DevTools → Toggle device toolbar

# 7. Check accessibility
# Run axe DevTools extension

# 8. Verify all features
# - Dashboard loads
# - Jobs page works
# - Events page works
# - Pitch decks page works
# - Analytics shows charts
# - Filters work
# - Settings save

# 9. Monitor performance
# Check React DevTools Profiler

# 10. Deploy to staging
# Test end-to-end user flows
```

---

## Summary

### Total Implementation Time

| Phase | Time | Status |
|-------|------|--------|
| Core (Week 1) | 9-13 hours | Foundation |
| Intermediate (Week 2) | 10-14 hours | Core Pages |
| Advanced (Week 3-4) | 10-13 hours | Professional Features |
| **Total** | **29-40 hours** | **1-2 weeks** |

### Features Delivered

**Core**: Database, hooks, components, main dashboard
**Intermediate**: Jobs, events, pitch decks, settings pages
**Advanced**: Charts, analytics, filters, testing, production polish

---

**Estimated Total Time**: 29-40 hours (1-2 weeks with 1 developer)
**Difficulty**: Beginner → Intermediate → Advanced progression
**Status**: ✅ Complete implementation guide ready
