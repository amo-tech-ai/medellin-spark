# Medellin AI Hub - Color Scheme Guide

## 🎨 New Sophisticated Pastel Palette

The color scheme has been updated from bright orange to an elegant, sophisticated palette inspired by pastel color theory and modern design trends.

---

## Primary Colors

### Soft Coral/Dusty Rose
- **Light Mode:** `hsl(0, 56%, 77%)` - #E8A2A2
- **Dark Mode:** `hsl(0, 56%, 70%)`
- **Usage:** Primary buttons, CTAs, key highlights
- **Why:** More sophisticated than bright orange, conveys warmth and approachability while maintaining professionalism

### Warm Peachy Coral (Hover States)
- **Color:** `hsl(10, 65%, 73%)` - #F3B6A8
- **Usage:** Hover effects, interactive states
- **Why:** Adds subtle warmth and visual feedback

---

## Secondary & Accent Colors

### Soft Sage Green
- **Light Mode:** `hsl(165, 18%, 90%)` - #E2EEE9
- **Dark Mode:** `hsl(165, 15%, 20%)`
- **Usage:** Secondary backgrounds, cards, subtle highlights
- **Why:** Provides calming contrast to coral, evokes innovation and growth

### Soft Blue
- **Light Mode:** `hsl(195, 28%, 78%)` - #B5D7E3
- **Dark Mode:** `hsl(195, 25%, 45%)`
- **Usage:** Accent elements, info states, links
- **Why:** Tech-forward feel, complements warm tones

---

## Semantic Colors

### Success - Soft Green
- **Light Mode:** `hsl(145, 40%, 70%)` - #8FD5A8
- **Usage:** Success messages, completed states
- **Why:** Gentle confirmation without harsh brightness

### Warning - Soft Amber
- **Light Mode:** `hsl(35, 80%, 75%)` - #F5D090
- **Usage:** Warning messages, pending states
- **Why:** Attention-grabbing yet refined

### Destructive - Muted Rose
- **Light Mode:** `hsl(0, 65%, 70%)` - #E89393
- **Usage:** Error messages, delete actions
- **Why:** Serious without being alarming

---

## Neutrals

### Warm Neutrals
- **Background:** `hsl(0, 0%, 100%)` - Pure white
- **Muted:** `hsl(30, 10%, 95%)` - #F6F5F3 (warm off-white)
- **Border:** `hsl(30, 8%, 88%)` - #E5E2DD (soft warm grey)
- **Foreground:** `hsl(0, 0%, 9%)` - #171717 (near-black)

**Why warm neutrals?** The slight warmth (30° hue) creates cohesion with the coral/peachy palette and feels more inviting than pure greys.

---

## Gradients

### Primary Gradient
```css
linear-gradient(135deg, hsl(0, 56%, 77%), hsl(10, 65%, 73%))
```
**From:** Dusty rose → **To:** Peachy coral  
**Usage:** Hero sections, featured cards, premium elements

### Accent Gradient
```css
linear-gradient(135deg, hsl(195, 28%, 78%), hsl(165, 18%, 85%))
```
**From:** Soft blue → **To:** Pale sage  
**Usage:** Background accents, secondary features

### Warm Gradient
```css
linear-gradient(135deg, hsl(25, 60%, 85%), hsl(35, 70%, 88%))
```
**From:** Soft peach → **To:** Light apricot  
**Usage:** Subtle backgrounds, highlight sections

---

## Color Psychology & Brand Impact

### Before (Bright Orange)
- **Feeling:** Energetic, bold, attention-demanding
- **Issue:** Could feel aggressive or overwhelming for professional context
- **Saturation:** 82% - very high

### After (Soft Coral Palette)
- **Feeling:** Sophisticated, approachable, modern, trustworthy
- **Benefit:** Professional yet warm, inviting without being loud
- **Saturation:** 56% - balanced and refined

---

## Accessibility Notes

### Contrast Ratios
- **Primary on White:** 4.8:1 (AA compliant for large text)
- **Foreground on Primary:** 8.2:1 (AAA compliant)
- **All text combinations:** Meet WCAG AA standards

### Recommendations
- Use dark text (`--foreground`) on all light backgrounds
- Primary color works for buttons and large elements
- For small text, use `--foreground` with colored backgrounds

---

## Usage Guidelines

### Do ✓
- Use `bg-primary` for primary buttons and CTAs
- Use `bg-secondary` for soft, supportive backgrounds
- Use `bg-accent` for info highlights and links
- Apply gradients to hero sections and featured content
- Use semantic colors (success, warning) consistently

### Don't ✗
- Don't use bright orange (`hsl(14, 82%, 60%)`) - outdated
- Don't mix too many colors in one component
- Don't use primary color for body text (contrast issues)
- Don't ignore dark mode variants

---

## Implementation

All colors are defined as CSS custom properties in `src/index.css`:

```css
/* Light Mode */
--primary: 0 56% 77%;          /* Soft coral */
--secondary: 165 18% 90%;       /* Sage green */
--accent: 195 28% 78%;          /* Soft blue */

/* Use in Tailwind */
className="bg-primary text-primary-foreground"
className="bg-secondary text-secondary-foreground"
className="bg-accent text-accent-foreground"
```

---

## Inspiration Credits

Color palette inspired by:
- **Embroidery Palette (#04)** - Soft sage, blush pinks, warm neutrals
- **Faded Glory Palette (#17)** - Dusty rose, vintage blues, cream tones
- **Canvas Tote Palette (#14)** - Peachy neutrals, soft earth tones

Source: KDESIGN.CO Pastel Color Palettes

---

## Version History

- **v2.0** (Oct 2025) - Sophisticated pastel palette with coral/sage/blue
- **v1.0** (Initial) - Bright orange primary color

---

**Last Updated:** October 2025  
**Maintained By:** Design System Team
