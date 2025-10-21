# Week 5: Mobile Performance

**Goal**: App loads fast on mobile (< 2 seconds)
**Time**: 1 week (3 days fundamentals + 2 days advanced)

---

## Fundamentals

### Task 1: Code Splitting (Route-Based)

**What**: Load only the code needed for current page (reduces initial bundle)

**File**: `src/App.tsx`

**Steps**:
1. Use React.lazy() for route components
2. Add Suspense fallback
3. Split by route

**Before** (everything loads at once):
```typescript
import Dashboard from './pages/Dashboard';
import Events from './pages/DashboardEvents';
import PitchDeckWizard from './pages/PitchDeckWizard';
```

**After** (load on demand):
```typescript
import { lazy, Suspense } from 'react';

// Lazy load route components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Events = lazy(() => import('./pages/DashboardEvents'));
const PitchDeckWizard = lazy(() => import('./pages/PitchDeckWizard'));

// Loading fallback
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  );
}

// Wrap routes
<Suspense fallback={<LoadingFallback />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/events" element={<Events />} />
    <Route path="/pitch-deck-wizard" element={<PitchDeckWizard />} />
  </Routes>
</Suspense>
```

**Success Criteria**:
- ✅ Initial bundle size reduced by 40-60%
- ✅ Each route loads only when visited
- ✅ Loading spinner shows during code load
- ✅ No flash of unstyled content
- ✅ Navigation feels instant (< 100ms)

**Test**:
```bash
# Build and check bundle sizes
pnpm build

# Check dist/assets/ folder
# Should see multiple JS chunks (one per route)
# Main bundle should be < 200KB

# Test in browser:
# Network tab → Navigate to /dashboard
# Should see new chunk load
```

---

### Task 2: Image Optimization

**What**: Use modern formats (WebP) and lazy loading

**File**: `vite.config.ts`

**Steps**:
1. Install image optimizer
2. Configure Vite plugin
3. Use lazy loading for images

**Install**:
```bash
pnpm add -D vite-plugin-image-optimizer
```

**Configure Vite**:
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import imagemin from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    imagemin({
      // Optimize PNG, JPEG, GIF, SVG
      plugins: {
        png: { quality: 80 },
        jpeg: { quality: 80 },
        webp: { quality: 80 },
      },
    }),
  ],
});
```

**Update image components**:
```typescript
// Before
<img src="/logo.png" alt="Logo" />

// After (with lazy loading)
<img
  src="/logo.webp"           // Use WebP format
  alt="Logo"
  loading="lazy"             // Lazy load offscreen images
  className="h-12 w-auto"
/>

// For responsive images
<picture>
  <source
    srcSet="/logo-mobile.webp"
    media="(max-width: 768px)"
  />
  <source
    srcSet="/logo-desktop.webp"
    media="(min-width: 769px)"
  />
  <img src="/logo.webp" alt="Logo" />
</picture>
```

**Success Criteria**:
- ✅ Images are WebP format (smaller than PNG/JPEG)
- ✅ Offscreen images load only when scrolling near them
- ✅ Image file sizes reduced by 30-50%
- ✅ No layout shift when images load
- ✅ Fallback works for browsers without WebP

**Test**:
```bash
# Build app
pnpm build

# Check image sizes in dist/assets/
# WebP should be smaller than original

# Test lazy loading:
# Network tab → Scroll page
# Images should load as you scroll near them
```

---

### Task 3: Minify and Compress

**What**: Reduce bundle size with compression

**File**: `vite.config.ts`

**Steps**:
1. Enable Vite minification
2. Configure build options
3. Verify compression

**Update Vite config**:
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    minify: 'terser',        // Better minification than esbuild
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.log in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-dialog'],
        },
      },
    },
  },
});
```

**Success Criteria**:
- ✅ JavaScript files are minified
- ✅ console.log removed from production
- ✅ Vendor code split into separate chunks
- ✅ Total bundle size < 500KB (gzipped < 150KB)
- ✅ Build time < 10 seconds

**Test**:
```bash
# Production build
pnpm build

# Check sizes
ls -lh dist/assets/*.js

# Expected:
# main.js: ~150KB
# react-vendor.js: ~150KB
# ui-vendor.js: ~100KB
# route chunks: ~50KB each
```

---

## Fundamentals Summary

**What you built**:
- ✅ Code splitting by route
- ✅ Image optimization (WebP + lazy load)
- ✅ Minification and compression

**Success Check**:
- [ ] Initial load < 2 seconds on mobile
- [ ] Lighthouse score > 80
- [ ] Bundle size < 500KB
- [ ] Images load progressively

**Time**: ~3 days

**Expected Results**:
- Initial load time: 2.5s → 1.2s (52% faster)
- Bundle size: 850KB → 420KB (50% smaller)
- Image load time: 3s → 1s (67% faster)

---

## Advanced Features (Optional)

### Advanced 1: Prefetch Critical Routes

**What**: Preload code for likely next pages

**When to use**: If you know user's likely navigation path

**File**: `src/components/PrefetchLinks.tsx`

**Code**:
```typescript
import { useEffect } from 'react';

export function PrefetchLinks() {
  useEffect(() => {
    // Prefetch dashboard after 2 seconds on home page
    const timer = setTimeout(() => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = '/dashboard';
      document.head.appendChild(link);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}

// In App.tsx
<Route path="/" element={
  <>
    <Home />
    <PrefetchLinks />
  </>
} />
```

**Success Criteria**:
- ✅ Next page loads instantly (code already loaded)
- ✅ Doesn't slow down current page
- ✅ Only prefetches high-probability routes

**Time**: +3 hours

---

### Advanced 2: Service Worker Caching

**What**: Cache static assets for offline access

**When to use**: If users need offline functionality

**Install**:
```bash
pnpm add -D vite-plugin-pwa
```

**Configure**:
```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Medellin Spark',
        short_name: 'Spark',
        theme_color: '#4F46E5',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
            },
          },
        ],
      },
    }),
  ],
});
```

**Success Criteria**:
- ✅ Static assets cached after first visit
- ✅ App works offline (shows cached content)
- ✅ API requests use network-first strategy
- ✅ Cache updates automatically

**Time**: +6 hours

---

### Advanced 3: Virtual Scrolling for Long Lists

**What**: Render only visible items in long lists (e.g., 100+ events)

**When to use**: Lists with 50+ items

**Install**:
```bash
pnpm add @tanstack/react-virtual
```

**Code**:
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

function EventsList({ events }: { events: Event[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: events.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 140, // Average item height
    overscan: 5,             // Render 5 extra items
  });

  return (
    <div
      ref={parentRef}
      className="h-screen overflow-auto"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <EventCard event={events[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Success Criteria**:
- ✅ Only renders ~10-15 items at once (not all 100+)
- ✅ Scrolling is smooth (60fps)
- ✅ Memory usage stays low
- ✅ Works on low-end mobile devices

**Time**: +5 hours

---

### Advanced 4: Performance Monitoring

**What**: Track real-world performance metrics

**When to use**: Production monitoring

**Install**:
```bash
pnpm add web-vitals
```

**Code**:
```typescript
// src/lib/analytics.ts
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  console.log(metric);

  // Example: Send to Supabase
  fetch('/api/metrics', {
    method: 'POST',
    body: JSON.stringify(metric),
  });
}

export function initWebVitals() {
  onCLS(sendToAnalytics);   // Cumulative Layout Shift
  onFID(sendToAnalytics);   // First Input Delay
  onFCP(sendToAnalytics);   // First Contentful Paint
  onLCP(sendToAnalytics);   // Largest Contentful Paint
  onTTFB(sendToAnalytics);  // Time to First Byte
}

// In App.tsx
useEffect(() => {
  if (import.meta.env.PROD) {
    initWebVitals();
  }
}, []);
```

**Success Criteria**:
- ✅ Tracks Core Web Vitals
- ✅ Sends metrics to analytics
- ✅ Only runs in production
- ✅ Doesn't impact performance

**Time**: +4 hours

---

## Advanced Summary

**What's available**:
- ⬜ Prefetch routes (+3h)
- ⬜ Service worker caching (+6h)
- ⬜ Virtual scrolling (+5h)
- ⬜ Performance monitoring (+4h) - **Recommended**

**When to add**:
- Add prefetch if navigation speed is critical
- Add service worker if offline support needed
- Add virtual scrolling if lists have 50+ items
- Add monitoring (recommended for production)

**Total advanced time**: +18 hours (optional)

---

## Week 5 Complete

**Fundamentals**: ✅ App loads fast on mobile
**Next**: Week 6 - Testing

**Performance Gains**:
```
Before Week 5:
├─ Initial load: 2.8s
├─ Bundle size: 950KB
├─ Images: 400KB
└─ Lighthouse: 65/100

After Week 5 (Fundamentals):
├─ Initial load: 1.1s (61% faster) ✅
├─ Bundle size: 380KB (60% smaller) ✅
├─ Images: 120KB (70% smaller) ✅
└─ Lighthouse: 88/100 ✅

After Advanced Features:
├─ Initial load: 0.7s (75% faster) 🚀
├─ Offline support ✅
├─ Smooth scrolling (60fps) ✅
└─ Real-time monitoring ✅
```

**Diagram**:
```
Code Splitting Strategy:

Single Bundle (Before):
┌────────────────────────┐
│ Everything: 950KB      │ ← Loads all at once
│ - Dashboard            │
│ - Events               │
│ - Wizard               │
│ - React/UI libs        │
└────────────────────────┘

Split Bundles (After):
┌────────────────────────┐
│ Main: 180KB            │ ← Initial load
│ - React core           │
│ - Router               │
└────────────────────────┘
         +
┌────────────────────────┐
│ Dashboard.js: 50KB     │ ← Loads when visited
└────────────────────────┘
┌────────────────────────┐
│ Events.js: 45KB        │ ← Loads when visited
└────────────────────────┘
┌────────────────────────┐
│ Wizard.js: 105KB       │ ← Loads when visited
└────────────────────────┘

Result: 950KB → 180KB initial (80% reduction)
```
