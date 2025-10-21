# 04 - Sitemap & Routes

**Created:** 2025-01-15
**Purpose:** Define all routes, protection, validation, and navigation flow

---

## 🗺️ Complete Route Map

### Public Routes (No Auth Required)

| Route | Component | Purpose | Status |
|-------|-----------|---------|--------|
| `/` | `HomePage` | Landing page with hero, features | ✅ Exists |
| `/about` | `AboutPage` | About Medellin AI | ✅ Exists |
| `/events` | `EventsPage` | Events directory | ✅ Exists |
| `/perks` | `PerksPage` | Perks marketplace | ✅ Exists |
| `/programs` | `ProgramsPage` | Programs listing | ✅ Exists |
| `/founders` | `FoundersPage` | Founders directory | ✅ Exists |
| `/startups` | `StartupsPage` | Startups directory | ✅ Exists |
| `/startup-profile` | `StartupProfilePage` | Individual startup | ✅ Exists |
| `/jobs` | `JobsPage` | Jobs board | ✅ Exists |
| `/contact` | `ContactPage` | Contact form | ✅ Exists |
| `/profile/:id?` | `ProfilePage` | Public member profile | ✅ Exists |

### Protected Routes (Auth Required)

| Route | Component | Purpose | Status |
|-------|-----------|---------|--------|
| `/dashboard` | `DashboardPage` | Main dashboard | ✅ Exists |
| `/dashboard/events` | `EventsManagementPage` | Events management | ✅ Exists |
| `/dashboard/pitch-decks` | `PitchDeckDashboardPage` | Pitch deck dashboard | ✅ Exists |
| `/dashboard/settings` | `SettingsPage` | User settings | ✅ Exists |
| `/pitch-deck` | `PitchDeckInputPage` | Enhanced input form | ⚠️ Needs Enhancement |
| `/pitch-deck-wizard` | `PitchDeckWizardPage` | AI wizard | ✅ Exists |

### New Presentation Routes (To Build)

| Route | Component | Purpose | Auth | Owner Check |
|-------|-----------|---------|------|-------------|
| `/presentations/:id/outline` | `OutlineEditorPage` | Edit outline & select theme | ✅ Required | ✅ Required |
| `/presentations/:id/edit` | `SlideEditorPage` | Edit slide content | ✅ Required | ✅ Required |
| `/presentations/:id/view` | `PresentationViewerPage` | Full-screen viewer | ✅ Required | ✅ Required |

---

## 🔐 Route Protection System

### Authentication Middleware

**Wrap protected routes with authentication check:**

```typescript
// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function ProtectedRoute({
  children,
  requireAuth = true
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to login if auth required but not authenticated
  if (requireAuth && !user) {
    return (
      <Navigate
        to="/auth"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <>{children}</>;
}
```

### Ownership Verification

**Verify user owns the presentation before allowing access:**

```typescript
// src/hooks/usePresentationAccess.ts
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export function usePresentationAccess(presentationId: string) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      if (!user || !presentationId) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('presentations')
          .select('id, profile_id, is_public')
          .eq('id', presentationId)
          .single();

        if (error) throw error;

        // User owns it or it's public
        const canAccess =
          data.profile_id === user.id ||
          data.is_public === true;

        setHasAccess(canAccess);

        if (!canAccess) {
          toast.error('You do not have access to this presentation');
          navigate('/dashboard/pitch-decks');
        }

      } catch (error) {
        console.error('Access check failed:', error);
        toast.error('Presentation not found');
        navigate('/dashboard/pitch-decks');
      } finally {
        setLoading(false);
      }
    }

    checkAccess();
  }, [presentationId, user, navigate]);

  return { loading, hasAccess };
}
```

### Route Configuration

**Define routes with protection in App.tsx or router config:**

```typescript
// src/App.tsx (excerpt)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';

// Presentation pages
import OutlineEditorPage from './pages/presentations/OutlineEditor';
import SlideEditorPage from './pages/presentations/SlideEditor';
import PresentationViewerPage from './pages/presentations/Viewer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        {/* Presentation routes with ownership check */}
        <Route
          path="/presentations/:id/outline"
          element={
            <ProtectedRoute>
              <OutlineEditorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/presentations/:id/edit"
          element={
            <ProtectedRoute>
              <SlideEditorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/presentations/:id/view"
          element={
            <ProtectedRoute>
              <PresentationViewerPage />
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## ✅ Parameter Validation

### URL Parameter Types

```typescript
// src/types/routes.ts
export interface PresentationRouteParams {
  id: string; // UUID format
}

export interface ProfileRouteParams {
  id?: string; // Optional UUID
}

// Validation functions
export function isValidUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

export function validatePresentationId(id: string | undefined): string {
  if (!id) {
    throw new Error('Presentation ID is required');
  }

  if (!isValidUUID(id)) {
    throw new Error('Invalid presentation ID format');
  }

  return id;
}
```

### Using Validation in Components

```typescript
// src/pages/presentations/OutlineEditor.tsx (excerpt)
import { useParams, Navigate } from 'react-router-dom';
import { validatePresentationId } from '@/types/routes';
import { usePresentationAccess } from '@/hooks/usePresentationAccess';

export default function OutlineEditorPage() {
  const params = useParams();

  // Validate ID format
  let presentationId: string;
  try {
    presentationId = validatePresentationId(params.id);
  } catch (error) {
    return <Navigate to="/dashboard/pitch-decks" replace />;
  }

  // Check ownership
  const { loading, hasAccess } = usePresentationAccess(presentationId);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!hasAccess) {
    return null; // Hook already navigates away
  }

  return (
    <div>
      {/* Editor UI */}
    </div>
  );
}
```

---

## 🔄 Navigation Flow & Redirects

### Complete User Journey

```mermaid
graph TD
    A[/dashboard] --> B{Authenticated?}
    B -->|No| C[/auth]
    B -->|Yes| D[/dashboard]
    D --> E[Click Generate Pitch Deck]
    E --> F[/pitch-deck]
    F --> G[Submit Form]
    G --> H[/presentations/:id/outline]
    H --> I[Edit & Select Theme]
    I --> J[Generate Presentation]
    J --> K[/presentations/:id/edit]
    K --> L[Edit Content]
    L --> M[Click View]
    M --> N[/presentations/:id/view]
    N --> O[Press Escape]
    O --> K
    K --> P[Click Back]
    P --> D
```

### Redirect Logic

**1. Unauthenticated Access:**
```typescript
// User tries to access /presentations/:id/edit without auth
// → Redirect to /auth with return URL
<Navigate to="/auth" state={{ from: '/presentations/123/edit' }} />

// After login, redirect back
const location = useLocation();
const from = location.state?.from || '/dashboard';
navigate(from, { replace: true });
```

**2. Invalid Presentation ID:**
```typescript
// User navigates to /presentations/invalid-id/edit
// → Show toast + redirect to dashboard
toast.error('Invalid presentation ID');
navigate('/dashboard/pitch-decks');
```

**3. Presentation Not Found:**
```typescript
// User navigates to /presentations/non-existent-uuid/edit
// → Show toast + redirect to dashboard
toast.error('Presentation not found');
navigate('/dashboard/pitch-decks');
```

**4. Unauthorized Access (Not Owner):**
```typescript
// User tries to access another user's presentation
// → Show toast + redirect to own presentations
toast.error('You do not have access to this presentation');
navigate('/dashboard/pitch-decks');
```

**5. Incomplete Flow:**
```typescript
// User tries to access /presentations/:id/edit before outline is complete
// → Redirect to outline page
if (presentation.status === 'draft') {
  navigate(`/presentations/${presentationId}/outline`);
}

// User tries to access outline after already completed
// → Redirect to edit page
if (presentation.status === 'complete') {
  navigate(`/presentations/${presentationId}/edit`);
}
```

---

## 📍 Breadcrumb Navigation

### Breadcrumb Component

```typescript
// src/components/Breadcrumb.tsx
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <div key={item.path} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
          {index === items.length - 1 ? (
            <span className="text-foreground font-medium">{item.label}</span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

// Usage in OutlineEditor
<Breadcrumb items={[
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Pitch Decks', path: '/dashboard/pitch-decks' },
  { label: 'Edit Outline', path: `/presentations/${id}/outline` }
]} />
```

---

## 🔁 Back Navigation

### Safe Back Navigation

```typescript
// src/hooks/useBackNavigation.ts
import { useNavigate } from 'react-router-dom';

export function useBackNavigation(fallbackPath: string = '/dashboard') {
  const navigate = useNavigate();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      // No history, use fallback
      navigate(fallbackPath);
    }
  };

  return handleBack;
}

// Usage
const handleBack = useBackNavigation('/dashboard/pitch-decks');

<Button variant="ghost" onClick={handleBack}>
  <ArrowLeft className="w-4 h-4 mr-2" />
  Back
</Button>
```

---

## ⚠️ Error Pages

### 404 Not Found

```typescript
// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Page not found
      </p>
      <p className="text-center text-muted-foreground mb-8 max-w-md">
        The page you're looking for doesn't exist or you don't have access to it.
      </p>
      <Button asChild>
        <Link to="/dashboard">
          Return to Dashboard
        </Link>
      </Button>
    </div>
  );
}
```

### 403 Forbidden (No Access)

```typescript
// src/pages/Forbidden.tsx
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <Lock className="w-16 h-16 text-muted-foreground mb-4" />
      <h1 className="text-3xl font-bold text-foreground mb-4">
        Access Denied
      </h1>
      <p className="text-center text-muted-foreground mb-8 max-w-md">
        You don't have permission to access this presentation.
      </p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button asChild>
          <Link to="/dashboard/pitch-decks">
            My Presentations
          </Link>
        </Button>
      </div>
    </div>
  );
}
```

---

## 🔗 Deep Linking

### Share Presentation Links

```typescript
// Generate shareable link
const shareableUrl = `${window.location.origin}/presentations/${presentationId}/view`;

// Copy to clipboard
await navigator.clipboard.writeText(shareableUrl);
toast.success('Link copied to clipboard');

// For public presentations (future feature)
const publicUrl = `${window.location.origin}/p/${shareSlug}`;
```

---

## 📊 Route Analytics

### Track Navigation Events

```typescript
// src/utils/analytics.ts
export function trackPageView(route: string, metadata?: Record<string, any>) {
  // Track with your analytics service
  console.log('Page view:', route, metadata);

  // Example: Posthog, Mixpanel, GA4
  // posthog.capture('$pageview', { $current_url: route, ...metadata });
}

// Usage in components
useEffect(() => {
  trackPageView('/presentations/:id/outline', {
    presentationId,
    status: presentation?.status
  });
}, [presentationId]);
```

---

## 🔗 Next Steps

1. ✅ Understand route structure and protection
2. → Read `05-components.md` for component specifications
3. → Read `06-implementation-plan.md` for build order
4. → Implement `ProtectedRoute` component
5. → Set up route configuration in App.tsx
