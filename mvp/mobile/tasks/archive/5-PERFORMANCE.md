# Week 5: Performance Optimization

**Status**: ⬜ BLOCKED (awaiting Week 4)
**Hours**: 28
**Budget**: $3,500
**Goal**: Page load <2s, bundle size <800KB

---

## Tasks

### Task 5.1: Image Optimization (12 hours)

**Priority**: P0

**Install Dependencies**:
```bash
pnpm add sharp
pnpm add -D vite-plugin-image-optimizer
```

**Configure Vite**:
```typescript
// vite.config.ts
import imagemin from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      webp: { quality: 80 }
    })
  ]
});
```

**Create ResponsiveImage Component**:
```typescript
// src/components/ResponsiveImage.tsx
interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}

export function ResponsiveImage({
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className
}: ResponsiveImageProps): JSX.Element {
  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      srcSet={`
        ${src}?w=320 320w,
        ${src}?w=640 640w,
        ${src}?w=1024 1024w,
        ${src}?w=1920 1920w
      `}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
```

**Performance Targets**:
- Images <300KB average
- WebP format for all images
- Lazy loading on all images

---

### Task 5.2: Code Splitting (16 hours)

**Priority**: P0

**Route-Based Splitting**:
```typescript
// src/App.tsx
import { lazy, Suspense } from 'react';

// Lazy load pages
const Dashboard = lazy(() =>
  import('./pages/Dashboard').catch(() => ({
    default: () => <ErrorFallback message="Failed to load Dashboard" />
  }))
);

const PitchDeckWizard = lazy(() =>
  import('./pages/PitchDeckWizard').catch(() => ({
    default: () => <ErrorFallback message="Failed to load Wizard" />
  }))
);

const Events = lazy(() => import('./pages/Events'));
const Jobs = lazy(() => import('./pages/Jobs'));

// Loading component
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pitch-deck-wizard" element={<PitchDeckWizard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/jobs" element={<Jobs />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
```

**Component-Level Splitting**:
```typescript
// Split heavy components
const RichTextEditor = lazy(() => import('./components/RichTextEditor'));
const ChartComponent = lazy(() => import('./components/Chart'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <RichTextEditor />
</Suspense>
```

**Bundle Size Targets**:
- Initial bundle: <200KB (gzipped)
- Total bundle: <800KB (gzipped)
- Per-route chunks: <100KB

---

## Performance Testing

### Lighthouse CI
```bash
# Run Lighthouse audit
pnpm lighthouse:mobile

# Target scores:
# Performance: >90
# Accessibility: >95
# Best Practices: >90
# SEO: >90
```

### Core Web Vitals
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| LCP | <2.5s | TBD | ⬜ |
| FID | <100ms | TBD | ⬜ |
| CLS | <0.1 | TBD | ⬜ |
| FCP | <1.5s | TBD | ⬜ |
| TTI | <3.5s | TBD | ⬜ |

---

## Completion Criteria

**Week 5 is DONE when**:
- ✅ Images optimized (WebP format)
- ✅ Lazy loading for images
- ✅ Route-based code splitting
- ✅ Bundle size <800KB
- ✅ Lighthouse score >85
- ✅ Core Web Vitals pass

**Next**: [WEEK-6-TESTING.md](./WEEK-6-TESTING.md)
