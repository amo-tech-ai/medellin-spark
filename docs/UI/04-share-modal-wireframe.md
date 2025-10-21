# Share Modal - UI/UX Wireframe

**Component**: Presentation Share Modal
**Trigger**: Click "Share" button on presentation card or in editor
**Purpose**: Generate public links and manage presentation sharing settings

---

## Modal Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  BACKDROP (Semi-transparent overlay)                            │
│    ┌──────────────────────────────────────────────────────┐    │
│    │  MODAL HEADER                                  [×]   │    │
│    ├──────────────────────────────────────────────────────┤    │
│    │                                                      │    │
│    │  SHARE CONTENT                                       │    │
│    │                                                      │    │
│    │  (Link generation, settings, social share)          │    │
│    │                                                      │    │
│    ├──────────────────────────────────────────────────────┤    │
│    │  MODAL FOOTER                                        │    │
│    └──────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Modal Structure

### Header

```
┌────────────────────────────────────────────────┐
│  📤 Share "Marketing Strategy Q4"         [×]  │
└────────────────────────────────────────────────┘
```

**Elements**:
- **Icon**: 📤 Share icon
- **Title**: "Share" + presentation name (truncated if long)
- **Close button**: X in top right
- **Styling**: Bottom border, subtle shadow

---

## Section 1: Public Link Toggle

```
┌─────────────────────────────────────────────────┐
│  🌐 Public Access                               │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │  Make this presentation public            │ │
│  │                                    [OFF] │ │ ← Toggle switch
│  └───────────────────────────────────────────┘ │
│                                                 │
│  When enabled, anyone with the link can view   │
│  this presentation                              │
└─────────────────────────────────────────────────┘
```

### Elements:

**Toggle Switch**:
```
Private:  [  O ━━━ ]  OFF
Public:   [ ━━━ O  ]  ON
```
- **Default**: OFF (private)
- **Animation**: Smooth slide (300ms)
- **Colors**:
  - OFF: Gray background
  - ON: Primary color background

**Description Text**:
- Small, muted text
- Explains what happens when enabled
- Updates based on toggle state:
  - OFF: "Only you can view this presentation"
  - ON: "Anyone with the link can view"

---

## Section 2: Share Link (When Public)

**Appears when toggle is ON**:

```
┌─────────────────────────────────────────────────┐
│  🔗 Share Link                                  │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ https://medellin-spark.com/p/abc123def   │ │
│  │                          [📋 Copy]        │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ✅ Link copied to clipboard!                  │ ← Success message
└─────────────────────────────────────────────────┘
```

### Elements:

**Link Input**:
- **Read-only**: Yes (can't edit)
- **Monospace font**: For better readability
- **Select all on focus**: Easy to copy manually

**Copy Button**:
```
[📋 Copy]
```
- **Action**: Copy link to clipboard
- **Feedback**: Button text changes to "✅ Copied!" for 2s
- **Animation**: Checkmark bounce

**Success Message** (Conditional):
- Appears after copying
- Fades out after 3 seconds
- Green text with checkmark icon

---

## Section 3: Share Options (When Public)

```
┌─────────────────────────────────────────────────┐
│  ⚙️ Share Settings                              │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │  ☑️ Allow downloads                       │ │
│  │     Let viewers download the presentation │ │
│  │                                           │ │
│  │  ☑️ Allow embedding                       │ │
│  │     Allow this presentation to be         │ │
│  │     embedded on other websites            │ │
│  │                                           │ │
│  │  ☐ Password protect                       │ │
│  │     Require a password to view            │ │
│  │     [Optional password input field]       │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Checkboxes:

**1. Allow Downloads**:
```
☑️ Allow downloads
   Let viewers download the presentation
```
- **Default**: Checked
- **Description**: Explains functionality
- **When unchecked**: Hides download button on public view

**2. Allow Embedding**:
```
☑️ Allow embedding
   Allow this presentation to be embedded on other websites
```
- **Default**: Checked
- **Shows embed code**: When checked (see Section 5)

**3. Password Protect** (Optional Feature):
```
☐ Password protect
   Require a password to view

   Password:
   ┌─────────────────────────┐
   │ ••••••••••              │
   └─────────────────────────┘
```
- **Default**: Unchecked
- **Reveals input**: When checked
- **Password field**: Hidden by default, show/hide toggle
- **Validation**: Min 6 characters

---

## Section 4: Social Sharing

```
┌─────────────────────────────────────────────────┐
│  📱 Share on Social Media                       │
│                                                 │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  │
│  │  X  │  │ 📘 │  │ 💼 │  │ 📧 │  │ 💬 │  │
│  │     │  │ FB  │  │ In  │  │Email│  │WhatsApp│
│  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  │
└─────────────────────────────────────────────────┘
```

### Social Share Buttons:

**5 Share Options**:

1. **Twitter/X** 🐦
   ```
   Opens: https://twitter.com/intent/tweet?
     text=Check out my presentation: [title]
     &url=[link]
   ```

2. **Facebook** 📘
   ```
   Opens: https://www.facebook.com/sharer/sharer.php?
     u=[link]
   ```

3. **LinkedIn** 💼
   ```
   Opens: https://www.linkedin.com/sharing/share-offsite/?
     url=[link]
   ```

4. **Email** 📧
   ```
   Opens: mailto:?
     subject=[presentation title]
     &body=Check out this presentation: [link]
   ```

5. **WhatsApp** 💬
   ```
   Opens: https://wa.me/?
     text=Check out this presentation: [link]
   ```

**Button Styling**:
- **Size**: 60px × 60px (square)
- **Icons**: Brand icons or emoji
- **Colors**: Brand colors or neutral
- **Hover**: Scale 1.1, shadow increase
- **Action**: Opens in new window

---

## Section 5: Embed Code (Conditional)

**Shows when "Allow embedding" is checked**:

```
┌─────────────────────────────────────────────────┐
│  </> Embed Code                                 │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ <iframe                                   │ │
│  │   src="https://medellin-spark.com/        │ │
│  │   embed/abc123def"                        │ │
│  │   width="960"                             │ │
│  │   height="540"                            │ │
│  │   frameborder="0"                         │ │
│  │   allowfullscreen>                        │ │
│  │ </iframe>                     [📋 Copy]   │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  Customize embed size:                          │
│  ┌────────┐  ×  ┌────────┐                     │
│  │  960   │     │  540   │                     │
│  └────────┘     └────────┘                     │
│   Width px       Height px                      │
└─────────────────────────────────────────────────┘
```

### Elements:

**Embed Code Display**:
- **Format**: HTML iframe code
- **Styling**: Monospace font, code block
- **Syntax highlighting**: Optional
- **Read-only**: Yes

**Copy Button**:
- Same behavior as link copy
- Copies entire embed code

**Size Inputs**:
- **Width input**: Default 960px
- **Height input**: Default 540px (16:9 ratio)
- **Live update**: Code updates as you type
- **Common presets**: Buttons for 1920×1080, 1280×720, 960×540

---

## Section 6: Analytics (Optional Feature)

```
┌─────────────────────────────────────────────────┐
│  📊 Share Analytics                             │
│                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │   247   │  │    42   │  │  3.2m   │         │
│  │  Views  │  │  Shares │  │Avg Time │         │
│  └─────────┘  └─────────┘  └─────────┘         │
│                                                 │
│  [View Detailed Analytics]                      │
└─────────────────────────────────────────────────┘
```

**Metrics**:
- **Views**: Total views count
- **Shares**: Times link was copied or shared
- **Avg Time**: Average viewing duration

**Link to detailed analytics**:
- Opens full analytics page
- Shows graphs, demographics, etc.

---

## Section 7: Danger Zone

**Appears at bottom when public**:

```
┌─────────────────────────────────────────────────┐
│  ⚠️ Danger Zone                                 │
│                                                 │
│  [🔒 Make Private]                              │
│  This will disable the public link and remove   │
│  access for everyone                            │
└─────────────────────────────────────────────────┘
```

**Make Private Button**:
- **Style**: Outline button, red color
- **Action**: Turns off public access
- **Confirmation**: "Are you sure? This will break existing links."

---

## Modal Footer

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  [Close]                          [Save & Done] │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Buttons**:

**Close** (Secondary):
- Ghost/outline style
- Closes modal
- No confirmation needed (changes saved automatically)

**Save & Done** (Primary):
- Solid primary button
- Saves settings and closes modal
- Shows success toast

---

## States

### State 1: Private (Initial State)

```
┌─────────────────────────────────────────────────┐
│  🌐 Public Access                   [OFF]       │
│                                                 │
│  Only you can view this presentation            │
│                                                 │
│  Turn on public access to share this            │
│  presentation with others                       │
│                                                 │
│  [Enable Public Access]  ← Big CTA button      │
└─────────────────────────────────────────────────┘
```

**Features Hidden**:
- Share link section
- Share settings
- Social sharing buttons
- Embed code
- Analytics

### State 2: Public (Enabled)

All sections visible (as shown above)

### State 3: Loading

```
┌─────────────────────────────────────────────────┐
│  🌐 Public Access                   [ON]        │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │  ⏳ Generating share link...              │ │
│  │  [Spinner animation]                      │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

**Shows when**:
- Enabling public access for first time
- Updating settings
- Generating new password

---

## Data Structure

### Share Settings Object:

```typescript
interface ShareSettings {
  presentation_id: string;
  is_public: boolean;
  public_link?: string;  // Generated URL slug
  allow_downloads: boolean;
  allow_embedding: boolean;
  password?: string;
  created_at: string;
  updated_at: string;
}
```

### API Endpoints:

**Enable Public Access**:
```
POST /api/presentations/{id}/share
Body: {
  is_public: true,
  allow_downloads: boolean,
  allow_embedding: boolean,
  password?: string
}
Response: {
  public_link: string,
  share_id: string
}
```

**Update Share Settings**:
```
PUT /api/presentations/{id}/share
Body: ShareSettings
```

**Disable Public Access**:
```
DELETE /api/presentations/{id}/share
```

**Track Share Analytics**:
```
POST /api/presentations/{id}/share/track
Body: {
  event: 'view' | 'copy' | 'social_share',
  platform?: string
}
```

---

## Interactions

### 1. Toggle Public Access

**Turning ON**:
```
User clicks toggle ON
  ↓
Show loading spinner
  ↓
Call API to enable public access
  ↓
Generate unique share link
  ↓
Update database (is_public = true)
  ↓
Hide spinner, show link section
  ↓
Success toast: "Presentation is now public"
```

**Turning OFF**:
```
User clicks toggle OFF
  ↓
Show confirmation dialog
  ↓
If confirmed:
  Call API to disable
  Update database (is_public = false)
  Hide all share sections
  Success toast: "Presentation is now private"
```

### 2. Copy Link

```
User clicks "Copy" button
  ↓
Copy link to clipboard (navigator.clipboard.writeText)
  ↓
Show success message
  ↓
Track analytics (copy event)
  ↓
Button text changes to "Copied!" for 2s
  ↓
Reset button text to "Copy"
```

### 3. Social Share

```
User clicks social button
  ↓
Open share URL in new window (600×400)
  ↓
Track analytics (social_share event)
  ↓
Show brief success toast
```

### 4. Update Settings

```
User changes checkbox/input
  ↓
Auto-save after 500ms debounce
  ↓
Call API to update settings
  ↓
Show subtle success indicator
  ↓
Update embed code if relevant
```

---

## Responsive Design

### Desktop (> 1024px):
- Modal: 600px width × auto height
- Full layout as shown
- All sections visible

### Tablet (768px - 1024px):
- Modal: 500px width × auto height
- Social buttons: 3 columns
- Embed code: Smaller font

### Mobile (< 768px):
- Modal: Full screen or 90% width
- Social buttons: 2 columns
- Embed code: Horizontal scroll
- Sections stack vertically

---

## Validation

1. ✅ **Password**: Min 6 characters when enabled
2. ✅ **Embed dimensions**: Positive integers only
3. ✅ **Public link**: Generated server-side (can't be edited)

---

## Error Handling

### API Errors:

**Failed to enable public access**:
```
┌─────────────────────────────────────┐
│  ❌ Failed to Share                 │
│                                     │
│  Unable to generate public link.    │
│  Please try again.                  │
│                                     │
│  [Try Again]                        │
└─────────────────────────────────────┘
```

**Network error**:
- Show error toast
- Keep modal open
- Allow retry

---

## Security Features

1. **UUID-based links**: Hard to guess
   - Example: `/p/a3f9c8e2-1b5d-4e3a-9f2c-6d8e1a4b7c9f`

2. **Optional password protection**

3. **Referrer checking**: For embeds (optional)

4. **Rate limiting**: Prevent abuse

5. **Analytics tracking**: Monitor suspicious activity

---

## Accessibility

- ✅ Keyboard navigation (Tab, Enter, Esc)
- ✅ Screen reader announcements for state changes
- ✅ ARIA labels for all interactive elements
- ✅ Focus trap in modal
- ✅ High contrast mode support

---

## Loading States

**Enabling public access**: Spinner in toggle area
**Copying link**: Button shows spinner briefly
**Updating settings**: Subtle loading indicator
**Analytics**: Skeleton loaders for metrics

---

## Success Feedback

**Toasts**:
```
✅ Presentation is now public
✅ Link copied to clipboard!
✅ Settings saved
✅ Presentation is now private
```

**Animations**:
- Checkmark bounce
- Fade in/out transitions
- Button state changes

---

## Implementation Notes

**Files to create**:
- `src/features/presentations/components/ShareModal.tsx` - Main modal
- `src/features/presentations/components/ShareSettings.tsx` - Settings section
- `src/features/presentations/components/SocialShare.tsx` - Social buttons
- `src/features/presentations/hooks/useShareSettings.ts` - Share logic
- `src/features/presentations/api/shareApi.ts` - API calls

**Dependencies**:
- `@radix-ui/react-dialog` - Modal component
- `react-copy-to-clipboard` - Copy functionality
- URL generation library for social shares

---

**Ready for Lovable**: ✅ Complete spec ready to design!
