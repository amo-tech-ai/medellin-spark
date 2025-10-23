# Best Practices Checklist
**Medellín AI Hub - Implementation Guidelines**  
**Last Updated:** October 23, 2025

---

## 📋 Comprehensive Checklist

This checklist covers all critical best practices for implementing the Medellín AI Hub site, dashboard, and pitch deck wizard. Use this as a review guide before launching each feature.

---

## 🎨 Design System & Styling

### Semantic Tokens ✅ Critical
- [ ] All colors use CSS variables from `index.css` (no hardcoded hex/rgb)
- [ ] Dark mode works correctly (uses semantic tokens)
- [ ] Consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- [ ] Typography scale defined and used (h1, h2, h3, body, small)
- [ ] Consistent border radius (4px, 8px, 12px, 16px)
- [ ] Consistent shadows (sm, md, lg, xl)

**Example:**
```css
/* ✅ Good */
.card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--card-foreground));
}

/* ❌ Bad */
.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #000000;
}
```

### Component Library
- [ ] Use shadcn/ui components consistently
- [ ] Customize variants in component files (not with inline styles)
- [ ] Create reusable components for repeated patterns
- [ ] Keep components small and focused (< 200 lines)

---

## 📱 Responsive Design

### Breakpoints ✅ Critical
- [ ] Mobile-first approach (design for mobile, enhance for desktop)
- [ ] Test on all breakpoints: 375px, 640px, 768px, 1024px, 1280px, 1440px
- [ ] Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- [ ] No horizontal scroll on any device
- [ ] Touch targets minimum 44x44px on mobile

### Mobile Optimization
- [ ] Bottom navigation on mobile (< 768px)
- [ ] Hamburger menu for secondary navigation
- [ ] Stack columns on mobile (use `flex-col` or `grid-cols-1`)
- [ ] Reduce padding/margins on mobile (use `p-4 md:p-8`)
- [ ] Hide non-essential elements on mobile (use `hidden md:block`)

### Tablet & Desktop
- [ ] Sidebar navigation on desktop (> 768px)
- [ ] Multi-column grids (2-4 columns)
- [ ] Larger images and typography
- [ ] Hover states (not on mobile)

**Example:**
```tsx
{/* ✅ Good: Responsive grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

{/* ❌ Bad: Fixed columns */}
<div className="grid grid-cols-4 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

---

## ♿ Accessibility (WCAG 2.1 AA)

### Color Contrast ✅ Critical
- [ ] Text contrast: 4.5:1 minimum (normal text)
- [ ] Large text contrast: 3:1 minimum (18px+ or 14px+ bold)
- [ ] UI component contrast: 3:1 minimum (buttons, borders)
- [ ] Test with browser tools (DevTools > Accessibility)

### Keyboard Navigation ✅ Critical
- [ ] All interactive elements keyboard accessible (Tab, Enter, Space)
- [ ] Visible focus indicators (outline or ring)
- [ ] Logical tab order (top-to-bottom, left-to-right)
- [ ] Escape closes modals/dropdowns
- [ ] Arrow keys for navigation (where appropriate)

### Screen Readers ✅ Critical
- [ ] Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`)
- [ ] ARIA labels on icons (`aria-label="Search"`)
- [ ] ARIA landmarks (`role="navigation"`, `role="main"`)
- [ ] ARIA live regions for dynamic content (`aria-live="polite"`)
- [ ] Alt text on all images (descriptive, not "image of X")

### Forms
- [ ] Labels associated with inputs (`<label htmlFor="email">`)
- [ ] Error messages linked to fields (`aria-describedby="email-error"`)
- [ ] Required fields marked (`aria-required="true"`)
- [ ] Validation messages announced to screen readers

**Example:**
```tsx
{/* ✅ Good: Accessible button */}
<button
  aria-label="Close modal"
  className="focus:ring-2 focus:ring-primary focus:outline-none"
  onClick={onClose}
>
  <XIcon className="w-6 h-6" />
</button>

{/* ❌ Bad: No label, no focus indicator */}
<button onClick={onClose}>
  <XIcon />
</button>
```

---

## 🚀 Performance

### Loading Performance ✅ Critical
- [ ] Initial load < 3s (target: < 2s)
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Time to Interactive (TTI) < 3.5s
- [ ] Lighthouse score > 90

### Code Splitting
- [ ] Lazy load routes with `React.lazy()`
- [ ] Split large components (editor, charts)
- [ ] Dynamic imports for heavy libraries
- [ ] Defer non-critical JavaScript

**Example:**
```tsx
// ✅ Good: Lazy loaded route
const SlideEditor = React.lazy(() => import('./pages/presentations/SlideEditor'));

<Route path="/presentations/:id/edit" element={
  <Suspense fallback={<LoadingSpinner />}>
    <SlideEditor />
  </Suspense>
} />

// ❌ Bad: Eager loaded
import SlideEditor from './pages/presentations/SlideEditor';
<Route path="/presentations/:id/edit" element={<SlideEditor />} />
```

### Image Optimization
- [ ] Use WebP format with fallback
- [ ] Lazy load images below the fold
- [ ] Use responsive images (`srcset`, `sizes`)
- [ ] Compress images (< 200KB for thumbnails, < 1MB for full-size)
- [ ] Resize images server-side (max 1920x1080)

### Data Fetching
- [ ] Use React Query for caching
- [ ] Stale-while-revalidate pattern
- [ ] Prefetch on hover (job/event cards)
- [ ] Paginate long lists (> 20 items)
- [ ] Debounce search input (300ms)

**Example:**
```tsx
// ✅ Good: React Query with caching
const { data, isLoading } = useQuery({
  queryKey: ['events', filters],
  queryFn: () => fetchEvents(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// ❌ Bad: Fetch on every render
const [events, setEvents] = useState([]);
useEffect(() => {
  fetchEvents().then(setEvents);
}, []); // No caching, no loading state
```

---

## 🔐 Security

### Authentication
- [ ] Protect dashboard routes (redirect to login if not authenticated)
- [ ] Validate JWT tokens on protected routes
- [ ] Implement refresh token logic
- [ ] Log out on token expiry

### Data Validation
- [ ] Validate all user input (client & server)
- [ ] Sanitize HTML input (prevent XSS)
- [ ] Use Zod schemas for validation
- [ ] Validate file uploads (type, size)

### API Security
- [ ] Use HTTPS only (no HTTP)
- [ ] Include CSRF tokens (if using cookies)
- [ ] Rate limit API calls (prevent abuse)
- [ ] Validate all Supabase RLS policies

---

## 🗺️ Navigation & Routing

### URL Structure ✅ Critical
- [ ] Use kebab-case for URLs (`/pitch-deck-wizard`, not `/pitchDeckWizard`)
- [ ] Plural for collections (`/events`, `/jobs`, `/perks`)
- [ ] Singular for resources (`/event/:id`, `/job/:id`)
- [ ] Logical nesting (`/dashboard/events`, not `/events-dashboard`)

### Navigation Patterns
- [ ] Breadcrumbs on detail pages (Home > Events > Event Title)
- [ ] Back buttons where appropriate
- [ ] Active state on current page (sidebar, navbar)
- [ ] Smooth scroll to top on route change

### Link Best Practices
- [ ] Use `<Link>` from react-router-dom (not `<a>`)
- [ ] Use `to` prop (not `href`)
- [ ] Open external links in new tab (`target="_blank" rel="noopener noreferrer"`)

**Example:**
```tsx
{/* ✅ Good: Internal link */}
<Link to="/events" className="text-primary hover:underline">
  View all events
</Link>

{/* ❌ Bad: External link behavior on internal route */}
<a href="/events">View all events</a>
```

---

## 📊 State Management

### React Query ✅ Recommended
- [ ] Use for server state (API data)
- [ ] Use for caching and automatic refetching
- [ ] Use for loading/error states
- [ ] Invalidate queries after mutations

### Local State
- [ ] Use `useState` for component state
- [ ] Use `useReducer` for complex state logic
- [ ] Use Context for global UI state (theme, sidebar)
- [ ] Avoid prop drilling (use Context or React Query)

### Zustand (Optional)
- [ ] Use for global app state (if needed)
- [ ] Use for persistent state (localStorage sync)
- [ ] Keep stores small and focused

---

## 🧪 Testing & Error Handling

### Error Boundaries ✅ Critical
- [ ] Wrap app in error boundary
- [ ] Catch errors in async code (try/catch)
- [ ] Show user-friendly error messages
- [ ] Log errors to console (or monitoring service)

### Loading States
- [ ] Show skeleton loaders while data loads
- [ ] Show spinner for button actions
- [ ] Disable buttons during loading
- [ ] Show progress for long operations (file uploads)

### Empty States
- [ ] Show friendly message when no data
- [ ] Include CTA to add first item
- [ ] Use illustrations or icons
- [ ] Provide context (why is it empty?)

**Example:**
```tsx
// ✅ Good: Loading, error, and empty states
if (isLoading) return <SkeletonLoader />;
if (error) return <ErrorMessage error={error} />;
if (!data || data.length === 0) return (
  <EmptyState
    title="No events yet"
    description="Be the first to register for an event!"
    action={{ label: "Browse Events", to: "/events" }}
  />
);

return <EventsList events={data} />;
```

---

## 🔍 SEO Optimization

### Meta Tags ✅ Critical
- [ ] Unique `<title>` on every page (< 60 characters)
- [ ] Meta description on every page (< 160 characters)
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags

### Semantic HTML
- [ ] Single `<h1>` per page (page title)
- [ ] Hierarchical headings (h1 > h2 > h3)
- [ ] Use `<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`, `<section>`

### URLs
- [ ] Descriptive URLs (`/events/ai-hackathon-2025`, not `/events/123`)
- [ ] Canonical tags (prevent duplicates)
- [ ] No trailing slashes (or consistent usage)
- [ ] Hyphens not underscores (`ai-hackathon`, not `ai_hackathon`)

### Performance for SEO
- [ ] Fast load times (< 2s)
- [ ] Mobile-friendly (responsive)
- [ ] HTTPS enabled
- [ ] No 404 errors on linked pages

---

## 💻 Code Quality

### TypeScript ✅ Critical
- [ ] All components typed (no `any` types)
- [ ] Props interfaces defined
- [ ] API responses typed (from Supabase types)
- [ ] Strict mode enabled

### Component Organization
- [ ] One component per file
- [ ] Logical folder structure (`components/`, `pages/`, `hooks/`, `utils/`)
- [ ] Group related components in folders
- [ ] Keep components small (< 200 lines)

### Naming Conventions
- [ ] PascalCase for components (`EventCard.tsx`)
- [ ] camelCase for functions (`handleClick`)
- [ ] UPPER_CASE for constants (`API_BASE_URL`)
- [ ] Descriptive names (not `data`, `item`, `thing`)

### Code Style
- [ ] Consistent formatting (use Prettier)
- [ ] Consistent imports (group by type: React, libraries, local)
- [ ] Remove console.logs before production
- [ ] Remove unused imports/variables

**Example:**
```tsx
// ✅ Good: Typed component
interface EventCardProps {
  title: string;
  date: Date;
  location: string;
  onRegister: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  location,
  onRegister,
}) => {
  // Component code
};

// ❌ Bad: Untyped component
export const EventCard = ({ title, date, location, onRegister }) => {
  // Component code
};
```

---

## 📝 Content Guidelines

### Copy & Messaging
- [ ] Clear, concise copy (avoid jargon)
- [ ] Action-oriented CTAs ("Create Pitch Deck", not "Click Here")
- [ ] Friendly tone (but professional)
- [ ] No Lorem Ipsum in production

### Error Messages
- [ ] User-friendly (not technical)
- [ ] Actionable ("Try again" button)
- [ ] Explain what went wrong and how to fix it

### Success Messages
- [ ] Confirm user action ("Event registered successfully!")
- [ ] Use toasts for non-blocking feedback
- [ ] Auto-dismiss after 3-5 seconds

---

## 📱 Mobile-Specific

### Touch Interactions
- [ ] Touch targets minimum 44x44px
- [ ] Swipe gestures for carousels
- [ ] Pull-to-refresh (where appropriate)
- [ ] Long-press for context menus

### Mobile UX
- [ ] Bottom navigation (fixed)
- [ ] Hamburger menu for secondary nav
- [ ] Larger text (16px minimum body text)
- [ ] No hover states (use `:active` instead)

### Mobile Performance
- [ ] Reduce bundle size (code splitting)
- [ ] Lazy load images
- [ ] Minimize network requests
- [ ] Cache data aggressively

---

## 🔧 Maintenance & Scalability

### Documentation
- [ ] README with setup instructions
- [ ] Component documentation (Storybook or comments)
- [ ] API endpoint documentation
- [ ] Environment variables documented

### Version Control
- [ ] Meaningful commit messages
- [ ] Feature branches (not committing to main)
- [ ] Pull request reviews
- [ ] Changelog maintained

### Monitoring
- [ ] Error tracking (e.g., Sentry)
- [ ] Analytics (e.g., Google Analytics, Plausible)
- [ ] Performance monitoring (e.g., Lighthouse CI)
- [ ] Uptime monitoring (e.g., UptimeRobot)

---

## ✅ Pre-Launch Checklist

### Functionality
- [ ] All pages load without errors
- [ ] All links work (no 404s)
- [ ] All forms submit successfully
- [ ] All buttons/CTAs work
- [ ] Authentication flow works (login, signup, logout, password reset)

### Design
- [ ] Consistent styling across all pages
- [ ] Responsive on all devices (mobile, tablet, desktop)
- [ ] Dark mode works (if implemented)
- [ ] No layout shifts (CLS < 0.1)
- [ ] Animations smooth (60fps)

### Content
- [ ] No Lorem Ipsum
- [ ] All images have alt text
- [ ] All pages have meta tags
- [ ] Spelling and grammar checked
- [ ] Legal pages (Terms, Privacy) reviewed

### Performance
- [ ] Lighthouse score > 90 (all pages)
- [ ] Images optimized (< 200KB thumbnails, < 1MB full-size)
- [ ] Code split and lazy loaded
- [ ] API responses cached (React Query)

### Security
- [ ] HTTPS enabled
- [ ] Protected routes require authentication
- [ ] No sensitive data in client code
- [ ] RLS policies tested (Supabase)

### Testing
- [ ] Manual testing on Chrome, Firefox, Safari
- [ ] Manual testing on iOS and Android
- [ ] Cross-browser testing
- [ ] Load testing (if high traffic expected)

---

## 🎯 Post-Launch

### Monitoring
- [ ] Set up error tracking
- [ ] Set up analytics
- [ ] Set up uptime monitoring
- [ ] Set up performance monitoring

### User Feedback
- [ ] Collect user feedback (in-app survey, email)
- [ ] Monitor support tickets
- [ ] Track feature usage (analytics)
- [ ] Iterate based on feedback

### Continuous Improvement
- [ ] Weekly performance reviews
- [ ] Monthly accessibility audits
- [ ] Quarterly UX reviews
- [ ] A/B testing for key features

---

## 📚 Resources

### Design System
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

### Performance
- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [React Query Docs](https://tanstack.com/query/latest)

### SEO
- [Google Search Central](https://developers.google.com/search)
- [Moz SEO Guide](https://moz.com/beginners-guide-to-seo)

---

## 🎉 Summary

**Top 10 Critical Items:**

1. ✅ **Semantic Tokens:** Use CSS variables, no hardcoded colors
2. ✅ **Mobile-First:** Design for mobile, enhance for desktop
3. ✅ **Accessibility:** WCAG 2.1 AA compliance (contrast, keyboard, screen readers)
4. ✅ **Performance:** < 3s initial load, lazy load images, code splitting
5. ✅ **TypeScript:** Type all components and API responses
6. ✅ **Error Handling:** Error boundaries, loading states, empty states
7. ✅ **React Query:** Use for server state and caching
8. ✅ **Responsive:** Test on 375px, 768px, 1024px, 1440px
9. ✅ **SEO:** Meta tags, semantic HTML, descriptive URLs
10. ✅ **Security:** Protected routes, validated input, HTTPS

---

**Ready to launch? Review this checklist for each feature before release!**

**Related Documents:**
- [Comprehensive Sitemap](./COMPREHENSIVE-SITEMAP.md)
- [Dashboard Structure Recommendations](./DASHBOARD-STRUCTURE-RECOMMENDATIONS.md)
- [Wizard Flow Recommendations](./WIZARD-FLOW-RECOMMENDATIONS.md)
