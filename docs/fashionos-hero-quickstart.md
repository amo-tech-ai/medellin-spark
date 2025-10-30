# FashionOS Hero - Developer Quick Start

## 🚀 5-Minute Setup

### Step 1: Verify Files Exist
```bash
# Check component exists
ls src/components/FashionHero.tsx

# Check Home page updated
grep "FashionHero" src/pages/Home.tsx
```

### Step 2: Install Dependencies (if needed)
```bash
npm install
# or
bun install
```

### Step 3: Start Dev Server
```bash
npm run dev
# Opens: http://localhost:5173
```

### Step 4: Test Responsive Views
```
Desktop:  Open at 1440px+ width
Tablet:   Resize to 768-1023px
Mobile:   Resize to < 768px (or DevTools mobile view)
```

---

## ✏️ Common Customizations

### Change Headline
```typescript
// src/components/FashionHero.tsx (Line 49)

<h1 className="text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-gray-900 leading-[1.1]">
  Where Fashion Meets{" "}
  <span className="font-serif italic block mt-2">Intelligence.</span>
  {/*                                   ^^^^^^^^^^^^^^^ Change this */}
</h1>
```

### Update Description
```typescript
// src/components/FashionHero.tsx (Line 54)

<p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
  FashionOS is the AI-powered platform... 
  {/* Replace entire paragraph here */}
</p>
```

### Modify Stats
```typescript
// src/components/FashionHero.tsx (Line 80)

<div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-300">
  <div>
    <div className="text-3xl font-light text-gray-900">150+</div>
    {/*                                                ^^^^ Change number */}
    <div className="text-sm text-gray-600 mt-1">Designers</div>
    {/*                                           ^^^^^^^^^ Change label */}
  </div>
  {/* Repeat for other stats */}
</div>
```

### Replace Images
```typescript
// src/components/FashionHero.tsx (Line 5)

const fashionImages = [
  {
    src: "YOUR_IMAGE_URL_HERE",
    alt: "Descriptive alt text",
    className: "row-span-2" // or "" for normal size
  },
  // ... more images
];
```

**Image requirements**:
- **Format**: JPG, PNG, WebP
- **Size**: 800-1200px width recommended
- **Aspect**: 3:4 portrait or 1:1 square
- **Optimization**: Use CDN + `?w=800&auto=format`

### Change Button Links
```typescript
// src/components/FashionHero.tsx (Line 65)

<Button asChild>
  <Link to="/events">  {/* Change route here */}
    Explore Designers  {/* Change label here */}
  </Link>
</Button>
```

### Adjust Background Color
```typescript
// src/components/FashionHero.tsx (Line 49)

<section className="min-h-screen bg-[#F8F6F3] ...">
  {/*                               ^^^^^^^^ Change hex color */}
```

**Suggested alternatives**:
- `#FAFAF9` - Cooler cream
- `#F5F5F5` - Light gray
- `#FFFFFF` - Pure white
- `#FFF9F5` - Warmer cream

---

## 🎨 Style Customizations

### Typography Changes

#### Change Font Family
```typescript
// Headline (serif emphasis)
<span className="font-serif italic">Intelligence.</span>
//              ^^^^^^^^^^^ Change to: font-sans, font-mono, custom font class

// Body text
<p className="text-lg ...">
//           ^^^^^^^ Change to: text-base (smaller), text-xl (larger)
```

#### Adjust Font Weights
```typescript
// Headline
<h1 className="font-light ...">
//            ^^^^^^^^^^^ Options: font-thin, font-light, font-normal, font-medium, font-semibold, font-bold

// Stats
<div className="text-3xl font-light">150+</div>
//                      ^^^^^^^^^^^ Change weight here
```

### Spacing Adjustments

#### Section Padding
```typescript
<div className="container mx-auto px-4 py-16 lg:py-24">
  {/*                                    ^^^^^^ ^^^^^^ Change these */}
```

Options:
- `py-8` - Small (32px)
- `py-12` - Medium (48px)
- `py-16` - Default (64px)
- `py-20` - Large (80px)
- `py-24` - Extra Large (96px)

#### Column Gap
```typescript
<div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
  {/*                                 ^^^^^^^ ^^^^^^^ Change gaps */}
```

### Image Grid Modifications

#### Change Grid Columns (Desktop)
```typescript
// src/components/FashionHero.tsx (Line 97)

<div className="hidden lg:grid grid-cols-3 gap-4 h-[700px]">
  {/*                           ^^^^^^^^^^^ Change to: grid-cols-2, grid-cols-4 */}
```

#### Adjust Grid Height
```typescript
<div className="hidden lg:grid grid-cols-3 gap-4 h-[700px]">
  {/*                                                ^^^^^^^ Change height */}
```

Options:
- `h-[600px]` - Shorter
- `h-[700px]` - Default
- `h-[800px]` - Taller
- `h-auto` - Dynamic (based on content)

#### Modify Image Hover Effect
```typescript
// src/components/FashionHero.tsx (Line 104)

<img className="... hover:scale-105 transition-transform duration-500" />
  {/*                   ^^^^^^^^^^^^ Scale amount (105 = 5% larger) */}
  {/*                                                    ^^^^^^^^^^^^ Speed */}
```

Options:
- `hover:scale-105` - Subtle (5%)
- `hover:scale-110` - Noticeable (10%)
- `hover:scale-[1.02]` - Very subtle (2%)
- Remove entirely for no zoom

---

## 🧩 Component Integration

### Adding to Different Pages

#### Events Page
```typescript
// src/pages/Events.tsx

import FashionHero from "@/components/FashionHero";

const Events = () => {
  return (
    <>
      <FashionHero />
      {/* Rest of events content */}
    </>
  );
};
```

#### About Page (smaller variant)
```typescript
// Create FashionHeroSmall.tsx
import FashionHero from "@/components/FashionHero";

const FashionHeroSmall = () => {
  return (
    <div className="scale-90"> {/* Scale down entire hero */}
      <FashionHero />
    </div>
  );
};
```

### Props-Based Customization

#### Make Component Flexible
```typescript
// src/components/FashionHero.tsx

interface FashionHeroProps {
  headline?: string;
  subheadline?: string;
  description?: string;
  primaryCTA?: { text: string; link: string };
  secondaryCTA?: { text: string; link: string };
  images?: Array<{ src: string; alt: string; className?: string }>;
  stats?: Array<{ value: string; label: string }>;
}

const FashionHero = ({ 
  headline = "Where Fashion Meets",
  subheadline = "Intelligence.",
  description = "FashionOS is...",
  primaryCTA = { text: "Explore Designers", link: "/events" },
  secondaryCTA = { text: "Join FashionOS", link: "/auth" },
  images = defaultImages,
  stats = defaultStats
}: FashionHeroProps) => {
  // Use props instead of hardcoded values
};
```

**Usage**:
```typescript
<FashionHero 
  headline="Custom Headline"
  primaryCTA={{ text: "Get Started", link: "/signup" }}
/>
```

---

## 🔧 Advanced Customizations

### Add Parallax Scroll Effect

1. Install dependency:
```bash
npm install react-scroll-parallax
```

2. Wrap component:
```typescript
import { Parallax } from 'react-scroll-parallax';

<Parallax speed={-10}>
  <div className="absolute top-20 right-10 ...">
    {/* Blur circle */}
  </div>
</Parallax>
```

### Add Animation on Load

1. Install Framer Motion:
```bash
npm install framer-motion
```

2. Add animations:
```typescript
import { motion } from 'framer-motion';

<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="..."
>
  Where Fashion Meets Intelligence.
</motion.h1>
```

### Add Video Background

```typescript
// Replace image grid with video
<div className="relative overflow-hidden rounded-2xl">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
  >
    <source src="/videos/fashion-show.mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 bg-black/30" /> {/* Overlay */}
</div>
```

### Dynamic Stats from API

```typescript
// src/components/FashionHero.tsx

import { useQuery } from '@tanstack/react-query';

const FashionHero = () => {
  const { data: stats } = useQuery({
    queryKey: ['platform-stats'],
    queryFn: async () => {
      const response = await fetch('/api/stats');
      return response.json();
    },
  });

  return (
    <div className="grid grid-cols-3 gap-6">
      <div>
        <div className="text-3xl font-light">
          {stats?.designers || '150+'}
        </div>
        <div className="text-sm text-gray-600 mt-1">Designers</div>
      </div>
      {/* ... */}
    </div>
  );
};
```

---

## 🐛 Troubleshooting

### Images Not Loading

**Problem**: Broken image icons
**Solution**: 
```typescript
// Add error handling
<img
  src={image.src}
  alt={image.alt}
  onError={(e) => {
    e.currentTarget.src = '/placeholder.svg'; // Fallback image
  }}
/>
```

### Layout Breaks on Mobile

**Problem**: Text overflow, images too large
**Solution**:
```typescript
// Force text wrapping
<h1 className="text-5xl ... break-words">

// Force image containment
<div className="overflow-hidden">
  <img className="w-full h-full object-cover" />
</div>
```

### Buttons Not Clickable

**Problem**: Z-index issues, wrong link
**Solution**:
```typescript
// Check Link component
<Button asChild> {/* Required for proper Link rendering */}
  <Link to="/events">Button Text</Link>
</Button>

// Add z-index if needed
<div className="relative z-10">
  <Button>...</Button>
</div>
```

### Grid Not Aligning

**Problem**: Images different sizes, gaps misaligned
**Solution**:
```typescript
// Force consistent aspect ratio
<div className="aspect-[3/4]"> {/* 3:4 portrait */}
  <img className="w-full h-full object-cover" />
</div>

// Or use grid auto-rows
<div className="grid grid-cols-3 auto-rows-[200px]">
```

### Performance Issues

**Problem**: Slow loading, janky animations
**Solutions**:
```typescript
// 1. Optimize images
<img loading="lazy" decoding="async" />

// 2. Use will-change for animations
<img className="hover:scale-105 will-change-transform" />

// 3. Debounce scroll handlers
import { debounce } from 'lodash';
const handleScroll = debounce(() => { ... }, 100);

// 4. Use CSS containment
<div className="contain-layout contain-paint">
```

---

## 📱 Testing Guide

### Manual Testing

#### Desktop (1440px)
- [ ] Headline reads clearly
- [ ] Description not too wide
- [ ] Buttons side-by-side
- [ ] Image grid: 3 columns, masonry layout
- [ ] Stats show 3 columns
- [ ] Hover effects work on images

#### Tablet (768px)
- [ ] Text centered
- [ ] Buttons still side-by-side
- [ ] Image grid: 2×3 uniform
- [ ] Stats show 3 columns (smaller)

#### Mobile (375px)
- [ ] Headline wraps properly
- [ ] Buttons stack vertically
- [ ] Image grid: 2×2
- [ ] Stats show 3 columns (compact)
- [ ] No horizontal scroll

### Automated Testing

```bash
# Install Playwright
npm install -D @playwright/test

# Create test file: tests/fashion-hero.spec.ts
import { test, expect } from '@playwright/test';

test('FashionOS hero displays correctly', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Check headline exists
  await expect(page.locator('h1')).toContainText('Where Fashion Meets');
  
  // Check buttons are visible
  await expect(page.locator('text=Explore Designers')).toBeVisible();
  await expect(page.locator('text=Join FashionOS')).toBeVisible();
  
  // Check images load
  const images = page.locator('img[alt*="Fashion"]');
  await expect(images.first()).toBeVisible();
  
  // Check responsive
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator('h1')).toBeVisible();
});

# Run tests
npx playwright test
```

### Accessibility Testing

```bash
# Install axe-core
npm install -D @axe-core/playwright

# Add to test:
import { injectAxe, checkA11y } from '@axe-core/playwright';

test('Hero is accessible', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await injectAxe(page);
  await checkA11y(page);
});
```

---

## 📊 Analytics Tracking

### Add Event Tracking

```typescript
// src/components/FashionHero.tsx

import { trackEvent } from '@/lib/analytics';

<Button
  onClick={() => trackEvent('hero_cta_click', { button: 'explore' })}
  asChild
>
  <Link to="/events">Explore Designers</Link>
</Button>
```

### Track Image Interactions

```typescript
<img
  onClick={() => trackEvent('hero_image_click', { index })}
  className="cursor-pointer ..."
/>
```

### Track Scroll Depth

```typescript
import { useEffect } from 'react';

useEffect(() => {
  const handleScroll = () => {
    const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
    
    if (scrollPercent > 50) {
      trackEvent('hero_scroll_depth', { percent: 50 });
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All images load correctly
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Mobile view tested
- [ ] Links go to correct routes
- [ ] Accessibility audit passed

### Build Command
```bash
npm run build
# Check dist/ folder for output
```

### Environment Variables
```bash
# .env
VITE_IMAGE_CDN=https://images.fashionos.com
VITE_API_URL=https://api.fashionos.com
```

### CDN Setup (Optional)
```typescript
// Upload images to your CDN
const imageBasePath = import.meta.env.VITE_IMAGE_CDN;

const fashionImages = [
  {
    src: `${imageBasePath}/runway-model.jpg`,
    alt: "...",
  },
];
```

---

## 📚 Additional Resources

### Documentation
- [Implementation Guide](./fashionos-hero-implementation.md)
- [Wireframes](./fashionos-hero-wireframes.md)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Router Docs](https://reactrouter.com)

### Image Sources
- [Unsplash Fashion](https://unsplash.com/s/photos/fashion)
- [Pexels Fashion](https://www.pexels.com/search/fashion/)
- [FashionOS Brand Assets](#) (when available)

### Design Inspiration
- [Vogue](https://www.vogue.com)
- [Dior](https://www.dior.com)
- [Burberry](https://www.burberry.com)
- [Net-a-Porter](https://www.net-a-porter.com)

---

## 🔄 Version History

### v1.0 (2025-10-30)
- Initial implementation
- Desktop + tablet + mobile responsive
- 8 fashion images (Unsplash)
- Hover effects and transitions
- Accessibility compliant

### Planned: v1.1
- [ ] Props-based customization
- [ ] Animation on scroll
- [ ] Video background option
- [ ] Dynamic stats from API

### Planned: v1.2
- [ ] A/B testing setup
- [ ] Advanced analytics
- [ ] Performance optimizations
- [ ] SEO enhancements

---

## 💬 Support

**Need help?**
- Check [troubleshooting](#-troubleshooting) section
- Review [implementation guide](./fashionos-hero-implementation.md)
- Review [wireframes](./fashionos-hero-wireframes.md)

**Questions?**
- Open GitHub issue
- Contact: dev@fashionos.com
- Slack: #fashionos-dev

---

**Last Updated**: 2025-10-30
**Version**: 1.0
**Status**: ✅ Production Ready
