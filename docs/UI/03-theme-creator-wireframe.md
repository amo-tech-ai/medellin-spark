# Theme Creator - UI/UX Wireframe

**Component**: Custom Theme Creator Modal
**Trigger**: Click "+ Custom Theme" button in wizard or dashboard
**Purpose**: Create custom color schemes and font pairs for presentations

---

## Modal Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  BACKDROP (Semi-transparent overlay)                            │
│    ┌──────────────────────────────────────────────────────┐    │
│    │  MODAL HEADER                                  [×]   │    │
│    ├──────────────────────────────────────────────────────┤    │
│    │                                                      │    │
│    │  LEFT PANEL          │  RIGHT PANEL                 │    │
│    │  (Controls)          │  (Live Preview)              │    │
│    │                      │                               │    │
│    │                      │                               │    │
│    │                      │                               │    │
│    ├──────────────────────────────────────────────────────┤    │
│    │  MODAL FOOTER (Save/Cancel buttons)                 │    │
│    └──────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Modal Structure

### Header
```
┌────────────────────────────────────────────────┐
│  🎨 Create Custom Theme                   [×]  │
└────────────────────────────────────────────────┘
```

**Elements**:
- **Icon**: 🎨 Palette icon
- **Title**: "Create Custom Theme"
- **Close button**: X in top right corner
- **Styling**: Bottom border

---

## Left Panel: Theme Controls

```
┌─────────────────────────────────┐
│  THEME NAME                     │
│  ┌───────────────────────────┐  │
│  │ My Custom Theme           │  │
│  └───────────────────────────┘  │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  COLOR SCHEME                   │
│  ┌───────────────────────────┐  │
│  │ Primary Color             │  │
│  │ [████] #8B5CF6            │  │
│  │                           │  │
│  │ Secondary Color           │  │
│  │ [████] #06B6D4            │  │
│  │                           │  │
│  │ Background Color          │  │
│  │ [████] #FFFFFF            │  │
│  │                           │  │
│  │ Text Color                │  │
│  │ [████] #1F2937            │  │
│  │                           │  │
│  │ Accent Color              │  │
│  │ [████] #F59E0B            │  │
│  └───────────────────────────┘  │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  TYPOGRAPHY                     │
│  ┌───────────────────────────┐  │
│  │ Heading Font              │  │
│  │ [Montserrat        ▼]     │  │
│  │                           │  │
│  │ Body Font                 │  │
│  │ [Inter             ▼]     │  │
│  └───────────────────────────┘  │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  PRESETS                        │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐           │
│  │██│ │██│ │██│ │██│           │
│  └──┘ └──┘ └──┘ └──┘           │
│  Bold Soft Dark Mini           │
│                                 │
└─────────────────────────────────┘
```

### Section 1: Theme Name

```
┌───────────────────────────┐
│ My Custom Theme           │
└───────────────────────────┘
```

**Input Field**:
- **Placeholder**: "My Custom Theme"
- **Required**: Yes
- **Max length**: 50 characters
- **Validation**: Must be unique per user

---

### Section 2: Color Scheme

Each color picker follows this pattern:

```
Primary Color
┌──────────────────────────┐
│ [████]  #8B5CF6         │
└──────────────────────────┘
```

**Color Input Components**:

**5 Color Pickers**:

1. **Primary Color**
   - **Default**: #8B5CF6 (Purple)
   - **Usage**: Main brand color, buttons, highlights

2. **Secondary Color**
   - **Default**: #06B6D4 (Cyan)
   - **Usage**: Secondary elements, links

3. **Background Color**
   - **Default**: #FFFFFF (White)
   - **Usage**: Slide backgrounds

4. **Text Color**
   - **Default**: #1F2937 (Dark Gray)
   - **Usage**: Body text

5. **Accent Color**
   - **Default**: #F59E0B (Orange)
   - **Usage**: Highlights, borders

**Color Picker Interaction**:
```
Click color swatch:
┌────────────────────────┐
│  Color Picker Popover  │
│  ┌──────────────────┐  │
│  │  [Color Wheel]   │  │
│  │                  │  │
│  │  Hue Slider      │  │
│  │  Opacity Slider  │  │
│  │                  │  │
│  │  #8B5CF6         │  │
│  │  RGB(139,92,246) │  │
│  │  HSL(258,91,66)  │  │
│  └──────────────────┘  │
│                        │
│  Recent Colors:        │
│  [██][██][██][██]      │
│                        │
│  [Cancel] [Apply]      │
└────────────────────────┘
```

**Color Picker Features**:
- Visual color wheel
- Hue slider
- Opacity slider
- Hex input
- RGB/HSL display
- Recent colors history
- Preset palette

---

### Section 3: Typography

**Font Dropdowns**:

```
Heading Font
┌────────────────────────┐
│ Montserrat         ▼  │
└────────────────────────┘
  ↓
┌────────────────────────┐
│ Montserrat             │
│ Poppins                │
│ Playfair Display       │
│ Raleway                │
│ Lato                   │
│ Open Sans              │
│ Roboto                 │
└────────────────────────┘
```

**Heading Font Options**:
- Montserrat (Default)
- Poppins
- Playfair Display
- Raleway
- Oswald
- Bebas Neue

**Body Font Options**:
- Inter (Default)
- Lato
- Open Sans
- Roboto
- Nunito
- Source Sans Pro

**Font Preview**:
- Live preview in right panel
- Show sample text in selected fonts

---

### Section 4: Color Presets

```
Quick Presets:
┌────┐ ┌────┐ ┌────┐ ┌────┐
│ ██ │ │ ~~ │ │ ▓▓ │ │ ·· │
│Bold│ │Soft│ │Dark│ │Mini│
└────┘ └────┘ └────┘ └────┘
```

**Preset Buttons**:

1. **Bold** 🔥
   - Primary: #EF4444 (Red)
   - Secondary: #F97316 (Orange)
   - Background: #FEF2F2
   - Text: #7F1D1D
   - Accent: #FCD34D

2. **Soft** 🌸
   - Primary: #EC4899 (Pink)
   - Secondary: #A78BFA (Purple)
   - Background: #FDF2F8
   - Text: #831843
   - Accent: #FBCFE8

3. **Dark** 🌑
   - Primary: #3B82F6 (Blue)
   - Secondary: #06B6D4 (Cyan)
   - Background: #1F2937
   - Text: #F9FAFB
   - Accent: #10B981

4. **Minimal** ⚪
   - Primary: #6B7280 (Gray)
   - Secondary: #9CA3AF
   - Background: #FFFFFF
   - Text: #111827
   - Accent: #D1D5DB

**Preset Interaction**:
- Click to apply preset colors
- Overrides current color selections
- Shows confirmation toast

---

## Right Panel: Live Preview

```
┌───────────────────────────────────┐
│  PREVIEW SLIDE                    │
│  ┌─────────────────────────────┐  │
│  │                             │  │
│  │   Marketing Strategy        │  │ ← Heading font
│  │   =====================     │  │ ← Primary color
│  │                             │  │
│  │   Our comprehensive         │  │ ← Body font
│  │   approach to growth        │  │ ← Text color
│  │                             │  │
│  │   • Key Point 1             │  │
│  │   • Key Point 2             │  │
│  │   • Key Point 3             │  │
│  │                             │  │
│  │   [Call to Action]          │  │ ← Primary background
│  │                             │  │
│  └─────────────────────────────┘  │
│                                   │
│  [◄ Previous]    [Next ►]         │
│                                   │
└───────────────────────────────────┘
```

### Preview Elements:

**Sample Slide**:
- Shows real presentation layout
- Updates in real-time as colors/fonts change
- Displays all selected colors
- Shows font hierarchy

**Preview Content**:
1. **Slide title** - Uses heading font + primary color
2. **Body text** - Uses body font + text color
3. **Bullet points** - Shows text hierarchy
4. **Button** - Uses primary color background
5. **Accents** - Shows accent color usage

**Navigation Arrows**:
```
[◄ Previous]    [Next ►]
```
- Cycle through 3 sample slides:
  1. Title slide
  2. Content slide
  3. Closing slide
- Shows theme versatility

---

## Modal Footer

```
┌─────────────────────────────────────────────┐
│  ☑️ Set as default theme                   │
│                                             │
│  [Cancel]                    [Save Theme]   │
└─────────────────────────────────────────────┘
```

**Elements**:

**1. Default Checkbox**:
```
☑️ Set as default theme
```
- Optional checkbox
- Makes this theme default for new presentations

**2. Cancel Button** (Secondary):
- Ghost/outline style
- Closes modal without saving
- No confirmation needed

**3. Save Button** (Primary):
- Solid primary color
- Saves theme to database
- Disabled if name is empty
- Shows success toast on save

---

## Data Structure

### Theme Object:

```typescript
interface CustomTheme {
  id: string;
  profile_id: string;
  name: string;
  colors: {
    primary: string;       // #8B5CF6
    secondary: string;     // #06B6D4
    background: string;    // #FFFFFF
    text: string;          // #1F2937
    accent: string;        // #F59E0B
  };
  fonts: {
    heading: string;       // "Montserrat"
    body: string;          // "Inter"
  };
  is_default: boolean;
  created_at: string;
  updated_at: string;
}
```

### API Endpoints:

**Create Theme**:
```
POST /api/themes
Body: CustomTheme
Response: { theme_id: string }
```

**Update Theme**:
```
PUT /api/themes/{id}
Body: Partial<CustomTheme>
```

**Delete Theme**:
```
DELETE /api/themes/{id}
```

---

## Validation Rules

1. ✅ **Theme name required** (min 3 chars)
2. ✅ **All colors must be valid hex** (#RRGGBB)
3. ✅ **Fonts must be from predefined list**
4. ✅ **Theme name must be unique per user**
5. ✅ **At least one font must be selected**

---

## Interactive Features

### 1. Live Preview Updates
- Real-time preview as colors change
- Debounced updates (100ms)
- Smooth transitions

### 2. Color Harmony Suggestions
```
┌──────────────────────────┐
│  💡 Suggested Palettes   │
│                          │
│  Based on Primary Color: │
│  [██] [██] [██] [██]     │
│  Analogous               │
│                          │
│  [██] [██] [██] [██]     │
│  Complementary           │
│                          │
│  [██] [██] [██] [██]     │
│  Triadic                 │
└──────────────────────────┘
```
- Optional color theory suggestions
- Click to apply palette
- Based on primary color selection

### 3. Accessibility Check
```
┌──────────────────────────┐
│  ♿ Contrast Check        │
│                          │
│  Text on Background:     │
│  ✓ WCAG AA (4.5:1)       │
│                          │
│  Primary on Background:  │
│  ✓ WCAG AAA (7.2:1)      │
└──────────────────────────┘
```
- Real-time contrast ratio calculation
- WCAG compliance indicators
- Warnings for poor contrast

### 4. Export/Import Theme
```
┌──────────────────────────┐
│  [📤 Export Theme]       │
│  [📥 Import Theme]       │
└──────────────────────────┘
```
- Export as JSON file
- Import theme from JSON
- Share themes between users

---

## Modal Behavior

### Opening:
- Fade in animation (200ms)
- Focus on theme name input
- Load default values

### Closing:
- Click X button
- Click outside modal (backdrop)
- Press Esc key
- Confirm if changes unsaved

### Saving:
```
┌──────────────────────────┐
│  ✅ Theme Saved!         │
│  "My Custom Theme"       │
│  has been created        │
└──────────────────────────┘
```
- Success toast notification
- Modal stays open (allows edit)
- Or closes automatically (option)

---

## Responsive Design

### Desktop (> 1024px):
- Modal: 900px width × 600px height
- Two-panel layout (50/50)
- Full feature set

### Tablet (768px - 1024px):
- Modal: 700px width × 500px height
- Panels stack vertically
- Preview below controls

### Mobile (< 768px):
- Modal: Full screen
- Single column layout
- Tabbed interface (Controls / Preview)
- Simplified color picker

---

## Loading States

### Creating Theme:
- Disable save button
- Show spinner in button
- "Saving theme..."

### Deleting Theme:
- Confirmation dialog
- Loading spinner
- Success/error feedback

---

## Error Handling

### Validation Errors:
```
Theme name is required
❌ Please enter a theme name

Color format invalid
❌ Primary color must be a valid hex code
```
- Inline error messages
- Red border on invalid fields
- Prevent save until fixed

### Save Errors:
```
┌──────────────────────────┐
│  ❌ Failed to Save       │
│  Theme name already      │
│  exists. Please choose   │
│  a different name.       │
│                          │
│  [Try Again]             │
└──────────────────────────┘
```
- Error toast notification
- Keep modal open
- Preserve user input

---

## Accessibility

- ✅ Modal trap focus
- ✅ Esc to close
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Color contrast warnings
- ✅ Screen reader announcements

---

## Implementation Notes

**Files to create**:
- `src/features/presentations/components/ThemeCreator.tsx` - Main modal
- `src/features/presentations/components/ColorPicker.tsx` - Color picker component
- `src/features/presentations/components/ThemePreview.tsx` - Live preview
- `src/features/presentations/hooks/useThemeCreator.ts` - Theme logic
- `src/features/presentations/api/themeApi.ts` - API calls

**Dependencies**:
- `react-colorful` - Color picker component
- `@radix-ui/react-dialog` - Modal/dialog component
- `tinycolor2` - Color manipulation library

---

**Ready for Lovable**: ✅ Complete spec ready to design!
