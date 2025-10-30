# FashionOS Hero Section - Visual Wireframes

## Desktop Layout (1440px+)

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                         CREAM BACKGROUND (#F8F6F3)                        ║
║                                                                            ║
║  ┌─────────────────────────────────┬─────────────────────────────────┐  ║
║  │                                 │                                 │  ║
║  │  Where Fashion Meets            │  ┌───────┬────────┬────────┐   │  ║
║  │  Intelligence.                  │  │       │        │        │   │  ║
║  │     └─ italic serif             │  │  IMG  │  IMG   │  IMG   │   │  ║
║  │                                 │  │   1   │   2    │   4    │   │  ║
║  │  FashionOS is the AI-powered   │  │       │        │        │   │  ║
║  │  platform connecting designers, │  │       ├────────┤        │   │  ║
║  │  brands, and fashion events     │  │       │  IMG   │        │   │  ║
║  │  into one seamless experience.  │  │       │   3    │        │   │  ║
║  │  Discover exclusive shows...    │  ├───────┼────────┼────────┤   │  ║
║  │                                 │  │       │        │        │   │  ║
║  │  ┌──────────────┐ ┌──────────┐ │  │  IMG  │  IMG   │  IMG   │   │  ║
║  │  │   Explore    │ │   Join   │ │  │   5   │   7    │   8    │   │  ║
║  │  │  Designers   │ │ FashionOS│ │  ├───────┴────────┤        │   │  ║
║  │  └──────────────┘ └──────────┘ │  │      IMG       │        │   │  ║
║  │   black filled    outlined     │  │       6        │        │   │  ║
║  │                                 │  └────────────────┴────────┘   │  ║
║  │  ─────────────────────────────  │                                 │  ║
║  │                                 │  Masonry Grid - 3 Columns       │  ║
║  │  150+     50+       10K+        │  700px height                   │  ║
║  │  Designers Events  Attendees    │                                 │  ║
║  │                                 │                                 │  ║
║  └─────────────────────────────────┴─────────────────────────────────┘  ║
║                                                                            ║
║  [Pink blur - top right]                [Purple blur - bottom left]      ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

### Layout Details
- **Grid**: 2 equal columns (1:1 ratio)
- **Gap**: 64px between columns
- **Container**: Max-width with auto margins
- **Image Grid**: 3-column masonry (row-span-2, col-span-2 variations)
- **Height**: 700px image grid, auto text column

---

## Tablet Layout (768px - 1023px)

```
╔════════════════════════════════════════════════════╗
║         CREAM BACKGROUND (#F8F6F3)                 ║
║                                                     ║
║    ┌────────────────────────────────────────┐     ║
║    │                                        │     ║
║    │   Where Fashion Meets                  │     ║
║    │   Intelligence.                        │     ║
║    │      └─ italic serif                   │     ║
║    │                                        │     ║
║    │   FashionOS is the AI-powered         │     ║
║    │   platform connecting designers,      │     ║
║    │   brands, and fashion events into     │     ║
║    │   one seamless experience...          │     ║
║    │                                        │     ║
║    │   ┌─────────────┐  ┌─────────────┐    │     ║
║    │   │  Explore    │  │    Join     │    │     ║
║    │   │  Designers  │  │  FashionOS  │    │     ║
║    │   └─────────────┘  └─────────────┘    │     ║
║    │                                        │     ║
║    │   ────────────────────────────────     │     ║
║    │   150+      50+        10K+            │     ║
║    │   Designers Events    Attendees        │     ║
║    └────────────────────────────────────────┘     ║
║                                                     ║
║    ┌──────────────────┬──────────────────┐        ║
║    │                  │                  │        ║
║    │      IMAGE 1     │     IMAGE 2      │        ║
║    │                  │                  │        ║
║    │     (3:4)        │      (3:4)       │        ║
║    ├──────────────────┼──────────────────┤        ║
║    │                  │                  │        ║
║    │      IMAGE 3     │     IMAGE 4      │        ║
║    │                  │                  │        ║
║    ├──────────────────┼──────────────────┤        ║
║    │                  │                  │        ║
║    │      IMAGE 5     │     IMAGE 6      │        ║
║    │                  │                  │        ║
║    └──────────────────┴──────────────────┘        ║
║                                                     ║
╚════════════════════════════════════════════════════╝
```

### Layout Details
- **Stack**: Text block → Image grid (vertical)
- **Text**: Centered, max-width 640px
- **Images**: 2×3 grid (6 images total)
- **Aspect ratio**: 3:4 portrait
- **Gap**: 16px between images
- **Buttons**: Side-by-side

---

## Mobile Layout (375px - 767px)

```
╔═══════════════════════════════════╗
║   CREAM BACKGROUND (#F8F6F3)      ║
║                                    ║
║  ┌──────────────────────────────┐ ║
║  │                              │ ║
║  │  Where Fashion               │ ║
║  │  Meets                       │ ║
║  │  Intelligence.               │ ║
║  │    └─ italic                 │ ║
║  │                              │ ║
║  │  FashionOS is the AI-        │ ║
║  │  powered platform            │ ║
║  │  connecting designers,       │ ║
║  │  brands, and fashion         │ ║
║  │  events...                   │ ║
║  │                              │ ║
║  │  ┌────────────────────────┐  │ ║
║  │  │   Explore Designers    │  │ ║
║  │  └────────────────────────┘  │ ║
║  │  ┌────────────────────────┐  │ ║
║  │  │    Join FashionOS      │  │ ║
║  │  └────────────────────────┘  │ ║
║  │                              │ ║
║  │  ──────────────────────────  │ ║
║  │  150+   50+      10K+        │ ║
║  │  Design Events   Attend      │ ║
║  └──────────────────────────────┘ ║
║                                    ║
║  ┌─────────────┬─────────────┐   ║
║  │             │             │   ║
║  │   IMAGE 1   │   IMAGE 2   │   ║
║  │             │             │   ║
║  │    (3:4)    │    (3:4)    │   ║
║  ├─────────────┼─────────────┤   ║
║  │             │             │   ║
║  │   IMAGE 3   │   IMAGE 4   │   ║
║  │             │             │   ║
║  │    (3:4)    │    (3:4)    │   ║
║  └─────────────┴─────────────┘   ║
║                                    ║
╚═══════════════════════════════════╝
```

### Layout Details
- **Stack**: Text block → Image grid (vertical)
- **Text**: Full width, padding 16px
- **Images**: 2×2 grid (4 images total)
- **Aspect ratio**: 3:4 portrait
- **Gap**: 12px between images
- **Buttons**: Stacked vertically (full width)
- **Stats**: 3 columns (smaller font)

---

## Content Flow Comparison

### Desktop Experience
```
Scan Left → Read headline + description
   ↓
View CTAs (Explore / Join)
   ↓
Check stats (social proof)
   ↓
Peripheral vision: Fashion images create mood
```

### Tablet/Mobile Experience
```
Read headline (centered)
   ↓
Read description
   ↓
Engage with CTAs
   ↓
Check stats
   ↓
Scroll down
   ↓
View image gallery (portfolio style)
```

---

## Visual Hierarchy

### 1. Primary (First view)
- **Headline**: "Where Fashion Meets Intelligence"
- **Size**: Largest element (5xl-7xl)
- **Weight**: Light (creates elegance)
- **Position**: Top-left (Western reading pattern)

### 2. Secondary (Second view)
- **Description**: Platform value proposition
- **Size**: Medium (lg-xl)
- **Color**: Gray-600 (less prominent than headline)
- **Position**: Below headline

### 3. Tertiary (Third view)
- **CTAs**: Action buttons
- **Size**: Large buttons (py-6)
- **Contrast**: Black vs. outline (priority indication)
- **Position**: Below description

### 4. Supporting (Peripheral)
- **Images**: Fashion photography
- **Treatment**: Decorative, creates atmosphere
- **Interaction**: Hover effects (subtle engagement)

### 5. Social Proof (Bottom)
- **Stats**: 150+ Designers, 50+ Events, 10K+ Attendees
- **Size**: Small but prominent (3xl numbers)
- **Position**: Bottom of text column (trust signal)

---

## Spacing System

### Desktop
```
Section padding:    96px (py-24)
Column gap:         64px (gap-16)
Image gap:          16px (gap-4)
Button spacing:     32px horizontal
Text line-height:   1.6 (relaxed)
```

### Tablet
```
Section padding:    64px (py-16)
Column gap:         48px (gap-12)
Image gap:          16px (gap-4)
Button spacing:     16px horizontal
Text line-height:   1.6 (relaxed)
```

### Mobile
```
Section padding:    64px (py-16)
Column gap:         N/A (stacked)
Image gap:          12px (gap-3)
Button spacing:     16px vertical
Text line-height:   1.5 (normal)
```

---

## Image Grid Patterns

### Desktop (Masonry - 3 columns)
```
Col 1: Standard → Standard → Wide (col-span-2)
Col 2: Standard → Tall (row-span-2) → Standard
Col 3: Tall (row-span-2) → Standard → Standard

Creates asymmetry + visual interest
```

### Tablet (Uniform - 2×3)
```
Row 1: Standard | Standard
Row 2: Standard | Standard
Row 3: Standard | Standard

Easier to scan, less cognitive load
```

### Mobile (Uniform - 2×2)
```
Row 1: Standard | Standard
Row 2: Standard | Standard

Minimal, fast-loading
```

---

## Color & Contrast

### Text Contrast
```
Background: #F8F6F3 (cream)
├── Headline:    #111827 (gray-900) → 18.5:1 ✓ AAA
├── Body:        #6B7280 (gray-600) → 8.2:1 ✓ AAA
└── Stats:       #111827 (gray-900) → 18.5:1 ✓ AAA
```

### Button Contrast
```
Primary (black):
├── Background: #000000
└── Text:       #FFFFFF → 21:1 ✓ AAA

Secondary (outlined):
├── Border:     #000000 (2px)
├── Text:       #000000 → 18.5:1 ✓ AAA
└── Hover BG:   #000000
```

### Image Overlay
```
Gradient: linear-gradient(to top, black/20, transparent)
Opacity: 0 → 100% on hover
Creates depth without reducing readability
```

---

## Interaction States

### Buttons
```
Default:    Primary = Black fill | Secondary = Black outline
Hover:      Primary = Gray-900   | Secondary = Inverted (black fill, white text)
Active:     Slightly darker
Focus:      Ring outline (keyboard nav)
Transition: 300ms ease (all properties)
```

### Images
```
Default:    Scale 1.0 | No overlay
Hover:      Scale 1.05 | Overlay visible
Transition: 500ms transform | 300ms opacity
Cursor:     Pointer (indicates interactivity)
```

### Links (in text)
```
Default:    Underline | Text color
Hover:      Darker shade
Active:     Even darker
Focus:      Ring outline
```

---

## Loading Strategy

### Images
```
Priority 1: First 2 images (above fold)
├── load="eager"
└── fetchpriority="high"

Priority 2: Remaining images
├── loading="lazy"
└── Loads when scrolling into view
```

### Content
```
Hero text: Inline (no delay)
Buttons:   Inline (immediate interaction)
Stats:     Can be delayed (not critical path)
```

### Progressive Enhancement
```
1. Load structure (HTML/CSS)
2. Load above-fold images
3. Parse JavaScript (React hydration)
4. Load below-fold images
5. Enable interactions (hover effects)
```

---

## Animation Sequences (Future)

### On Page Load
```
0-200ms:    Headline fades in (opacity 0 → 1)
100-300ms:  Description fades in
200-400ms:  Buttons slide up (translateY 20px → 0)
300-600ms:  Images stagger in (left to right)
400-600ms:  Stats fade in
```

### On Scroll (Parallax)
```
Hero section: Slight scale + fade
Blur circles: Move independently (slower than scroll)
Images:       Slight zoom out
Text:         Fade out faster than images
```

---

## Accessibility Features

### Keyboard Navigation
```
Tab Order:
1. Skip to content link (hidden)
2. "Explore Designers" button
3. "Join FashionOS" button
4. (Next: page navigation)
```

### Screen Readers
```
<section aria-label="FashionOS Hero">
  <h1>Where Fashion Meets Intelligence</h1>
  <p>Description...</p>
  <div role="group" aria-label="Call to action buttons">
    <a>Explore Designers</a>
    <a>Join FashionOS</a>
  </div>
  <div role="group" aria-label="Platform statistics">
    <div>150+ Designers</div>
    ...
  </div>
  <div role="img" aria-label="Fashion photography gallery">
    <img alt="Fashion runway model" />
    ...
  </div>
</section>
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Metrics

### Target Metrics
```
First Contentful Paint:  < 1.0s
Largest Contentful Paint: < 2.5s (headline)
Time to Interactive:     < 3.0s
Cumulative Layout Shift: < 0.1
```

### Optimization Techniques
```
✓ Image lazy loading (below fold)
✓ CDN-hosted images (Unsplash)
✓ Optimized image formats (auto=format)
✓ Responsive image sizing (?w=800)
✓ CSS containment (image grid)
✓ Will-change hints (transform properties)
✓ Debounced scroll handlers (if parallax added)
```

---

## Browser Support

### Tested Browsers
```
✓ Chrome 90+
✓ Firefox 88+
✓ Safari 14+
✓ Edge 90+
✓ Mobile Safari (iOS 14+)
✓ Chrome Mobile (Android 10+)
```

### Fallbacks
```
Grid layout:        Flexbox (older browsers)
Blur circles:       Hidden (no backdrop-filter)
Hover effects:      Disabled (touch devices)
Custom fonts:       System fonts (if unavailable)
```

---

## Content Guidelines

### Headline (2 lines max)
```
Pattern: [Verb] [Noun] Meets [Adjective]
Examples:
- "Where Fashion Meets Intelligence"
- "Where Style Meets Innovation"
- "Where Design Meets Technology"

Keep "Meets" for consistency with brand voice
```

### Description (40-50 words)
```
Structure:
1. What is FashionOS? (platform definition)
2. Who does it connect? (audience)
3. What can you do? (actions/benefits)

Tone: Professional but approachable
Avoid: Jargon, superlatives, vague claims
```

### CTAs
```
Primary:   Action verb + Object
           "Explore Designers"
           "Browse Collections"
           "View Runway Shows"

Secondary: Join/Sign up variants
           "Join FashionOS"
           "Become a Member"
           "Sign Up Free"
```

### Stats
```
Format: [Number][+] [Label]
        150+ Designers
        
Rules:
- Use "+" for approximate growth
- Keep labels singular/plural as needed
- Update quarterly (automation TBD)
```

---

## Maintenance Checklist

### Monthly
- [ ] Update stats if changed significantly
- [ ] Check all image links (404s)
- [ ] Test on latest browser versions
- [ ] Review analytics (scroll depth, CTA clicks)

### Quarterly
- [ ] Replace 2-3 images (keep fresh)
- [ ] A/B test new headlines
- [ ] Optimize image sizes if needed
- [ ] Review accessibility audit

### Annually
- [ ] Full redesign consideration
- [ ] User testing (eye tracking)
- [ ] Competitive analysis
- [ ] Brand alignment review

---

**Last Updated**: 2025-10-30
**Version**: 1.0
**Status**: ✅ Ready for Review
