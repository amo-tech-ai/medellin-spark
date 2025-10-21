Main Features:
  - 📊 Dashboard Overview: Central hub for all presentations
  - ➕ Create New Presentation: Start with AI-powered generation
  - 📝 Presentation Input Form:
    - Topic input field
    - Language selector (multiple languages supported)
    - Number of slides picker
    - Presentation style selector (Professional/Casual)
    - Web search toggle (enhance with real-time data)
  - 🎨 Model Picker: Choose AI model for generation
  - 🖼️ Recent Presentations: Browse previously created presentations
  - 📑 Presentation Examples: Quick-start templates
  - 📂 Presentations Sidebar: Navigate through saved presentations
  - 🎯 Generation Controls: Configure generation settings

  Key Components:
  - PresentationInput
  - PresentationControls
  - RecentPresentations
  - PresentationExamples
  - ModelPicker
  - WebSearchToggle

  ---
  3. Outline Generator - /presentation/generate/[id]

  This is the AI outline creation screen

  Features:
  - 🤖 AI Thinking Display: Watch AI process your request
  - 📋 Outline Editor:
    - Edit generated outline items
    - Add/remove outline points
    - Reorder outline items
  - 🔍 Tool Call Display: See what AI tools are being used
  - 📊 Search Results Display: View web research results (if enabled)
  - 🎨 Theme Settings Panel:
    - Choose from 9 built-in themes
    - Select custom themes
    - Preview themes
  - 🎭 Style Customization:
    - Image source selector (AI/Stock)
    - Font settings
    - Color schemes
  - 💾 Real-time Save: Auto-saves as you edit
  - ✨ Generate Button: Proceed to full presentation generation

  Key Components:
  - Header
  - PromptInput
  - ThinkingDisplay
  - ToolCallDisplay
  - OutlineList (with OutlineItem components)
  - ThemeSettings
  - ThemeBackground

  ---
  4. Presentation Editor - /presentation/[id]

  The main editor for your completed presentation

  Features:
  - 🎬 Slide Canvas: Main editing area
  - 📑 Slide Preview Sidebar: Thumbnail view of all slides
  - 🔄 Drag & Drop: Reorder slides
  - ✏️ Rich Text Editor (Plate.js powered):
    - Format text (bold, italic, underline)
    - Add images
    - Create lists
    - Insert links
    - Code blocks
    - Tables
    - Callouts
    - Math equations
    - Emojis
    - Media embeds
  - 🎨 Slide Edit Popover:
    - Change slide layout
    - Modify backgrounds
    - Adjust colors
  - 📊 Presentation Header:
    - Title editing
    - Save status indicator
    - Share button
    - Export button (PPTX/PDF)
    - Present button
  - ↩️ Undo/Redo: Global history management
  - 🎯 Slide Container: Individual slide editing
  - 💾 Auto-save: Continuous saving

  Key Components:
  - PresentationLayout
  - PresentationHeader
  - PresentationSlidesView
  - SlidePreview
  - SlidePreviewCard
  - SlideContainer
  - SlideEditPopover
  - Main (editor area)
  - SaveStatus, ShareButton, ExportButton, PresentButton
  - GlobalUndoRedoHandler
  - FontLoader

  ---
  5. Theme Creator - Accessible via Dashboard

  Custom theme creation wizard

  Features:
  - 🎨 5-Step Creation Process:
    a. Base Theme: Choose starting template
    b. Colors: Customize color palette
        - Light mode colors
      - Dark mode colors
      - Primary, secondary, accent colors
      - Background and text colors
    c. Typography: Select fonts
        - Heading fonts
      - Body fonts
      - Font sizes
    d. Logo: Upload custom logo
    e. Preview: See final result
  - 🎭 Color Picker: Visual color selection
  - 🔤 Font Selector: Choose from web fonts
  - 🖼️ Logo Uploader: Upload company/brand logo
  - 👁️ Live Preview: See changes in real-time
  - 💾 Save & Reuse: Save themes for future presentations

  Key Components:
  - ThemeCreator (stepper interface)
  - ColorPicker
  - FontSelector
  - LogoUploader
  - ThemePreview
  - ThemeModal
  - ThemeTabs

  ---
  6. Authentication Pages - /auth/*

  Sign In - /auth/signin
  - 🔐 Google OAuth integration
  - Login form

  Sign Out - /auth/signout
  - 👋 Sign out confirmation
  - Session cleanup

  ---
  Modal/Overlay Screens (Accessible from main pages)

  7. Theme Selector Modal

  - Grid of available themes
  - Theme previews
  - Quick theme switching

  8. Export Dialog

  - Export to PowerPoint (.pptx)
  - Export to PDF
  - Export settings

  9. Share Dialog

  - Get shareable link
  - Set permissions
  - Embed options

  10. Presentation Mode (Fullscreen)

  - Full-screen slide view
  - Navigation controls
  - Presenter notes (if available)

  ---
  API Routes (Backend endpoints)

  - /api/auth/[...nextauth] - Authentication
  - /api/presentation/outline - Generate outline
  - /api/presentation/outline-with-search - Generate with web search
  - /api/presentation/generate - Generate full presentation
  - /api/uploadthing - File uploads

  ---
  Key Features Available Across Pages:

  ✨ AI Capabilities:
  - GPT-4 powered content generation
  - Image generation (multiple models)
  - Web search integration
  - Outline refinement

  🎨 Design System:
  - 9 built-in themes
  - Custom theme creator
  - Responsive layouts
  - Dark/light mode support

  📝 Editor Features:
  - Plate.js rich text editor
  - Drag & drop elements
  - Undo/redo
  - Auto-save

  📤 Export Options:
  - PowerPoint (.pptx)
  - PDF export
  - Presentation mode

  🔐 User Management:
  - Google OAuth
  - User preferences
  - Saved presentations
  - Favorites


  📊 COMPLETE DASHBOARD GUIDE - Presentation AI

  🌐 Main Dashboard URL:

  http://localhost:3001/presentation

  ---
  🎯 DASHBOARD SECTIONS & FEATURES

  The dashboard is a single-page interface with multiple interactive sections:

  ---
  1. 📝 PRESENTATION HEADER

  Location: Top center

  Features:
  - Large hero title: "Create stunning presentations in seconds with AI"
  - Welcome message
  - Branding area

  ---
  2. ✍️ PRESENTATION INPUT SECTION

  Location: Main center area

  Components:

  Topic Input Field

  - Large textarea for presentation topic
  - Placeholder: "Describe your topic or paste your content here..."
  - Keyboard shortcut: Ctrl+Enter to generate
  - Character limit: Unlimited
  - Auto-resize: Yes

  Templates Button

  - Click to open template selector
  - Quick-start with pre-made topics
  - Icon: ✨ Sparkles

  Web Search Toggle

  - Enable/disable web research
  - Enhances presentations with real-time data
  - Located below text area

  ---
  3. 🎛️ PRESENTATION CONTROLS

  Location: Below input field (4-column grid)

  Column 1: Model Picker

  - Select AI model for generation
  - Options include:
    - GPT-4
    - GPT-3.5 Turbo
    - Custom models

  Column 2: Number of Slides

  - Dropdown selector
  - Options: 1, 2, 3, 4, 5, 6, 7, 8, 10, 12 slides
  - Default: 5 slides

  Column 3: Language Selector

  - 12+ languages supported:
    - 🇺🇸 English (US)
    - 🇵🇹 Portuguese
    - 🇪🇸 Spanish
    - 🇫🇷 French
    - 🇩🇪 German
    - 🇮🇹 Italian
    - 🇯🇵 Japanese
    - 🇰🇷 Korean
    - 🇨🇳 Chinese
    - 🇷🇺 Russian
    - 🇮🇳 Hindi
    - 🇸🇦 Arabic

  Column 4: Page Style

  - Layout style selector
  - Icon: 📄 Layout
  - Options for different slide layouts

  ---
  4. 🚀 GENERATE BUTTON

  Location: Right side, below controls

  Features:
  - Primary action button
  - Text: "Generate Presentation"
  - Icon: ⚡ Wand
  - Disabled when: No input or already generating
  - Shows loading state during generation

  ---
  5. 💡 PRESENTATION EXAMPLES

  Location: Middle section

  Pre-built Example Topics:

  1. ⚡ The Future of Artificial Intelligence in Engineering
    - 5 slides
    - Professional style
    - Color: Purple
  2. 🌍 Sustainable Materials for Construction Projects
    - 5 slides
    - Traditional style
    - Color: Red
  3. 🎯 Best Practices for Project Management in Engineering
    - 5 slides
    - Default style
    - Color: Cyan
  4. 🤖 Advancements in Robotics and Automation
    - 5 slides
    - Professional style
    - Color: Red
  5. 🌱 Innovations in Renewable Energy Technology
    - 5 slides
    - Default style
    - Color: Green
  6. 🔒 Cybersecurity Challenges in Engineering Systems
    - 5 slides
    - Professional style

  Interaction:
  - Click any example to auto-fill the input
  - Instantly ready to generate
  - Shuffle button to randomize

  ---
  6. 📚 RECENT PRESENTATIONS

  Location: Bottom section

  Features:

  Presentation Cards

  Each card shows:
  - 📸 Thumbnail preview
  - 📝 Title (editable inline)
  - 📅 Created date
  - 🕐 Last modified time
  - 3-dot menu with options

  Card Actions:

  - Click card → Open editor
  - Edit title (✏️ Pencil icon)
  - Delete (🗑️ Trash icon)
  - More options (⋮ More menu)

  List Features:

  - Infinite scroll (loads more as you scroll)
  - Skeleton loading states
  - Empty state message if no presentations
  - Sort by: Most recent first

  ---
  7. 📂 PRESENTATIONS SIDEBAR

  Location: Left or right side (sheet/drawer)

  Trigger: Click presentations list icon

  Features:

  Header

  - Title: "Your Presentations"
  - Close button
  - Create new button (➕)

  Selection Mode

  - Toggle selection mode
  - Select multiple presentations
  - Bulk actions:
    - Delete selected
    - Export selected
    - Move to folder

  Presentation List

  - Full list of all presentations
  - Filterable/searchable
  - Sortable
  - Pagination with infinite scroll

  Each Item Shows:

  - Thumbnail
  - Title
  - Date created
  - Last modified
  - Quick actions

  ---
  🎨 INTERACTIVE ELEMENTS

  Modals/Dialogs:

  1. Delete Confirmation Dialog
    - Appears when deleting
    - Confirm/Cancel buttons
    - Shows item count if bulk delete
  2. Template Selector Modal
    - Grid of templates
    - Search templates
    - Preview before use
  3. Theme Selector
    - Visual theme picker
    - 9 built-in themes
    - Custom theme option

  ---
  🔄 USER WORKFLOWS

  Workflow 1: Quick Create

  1. Enter topic in text area
  2. Click "Generate Presentation"
  3. → Redirects to outline generator

  Workflow 2: Customized Create

  1. Enter topic
  2. Select model
  3. Choose number of slides
  4. Pick language
  5. Set page style
  6. Toggle web search (optional)
  7. Click "Generate Presentation"
  8. → Redirects to outline generator

  Workflow 3: From Example

  1. Click any example card
  2. Topic auto-fills
  3. Click "Generate Presentation"
  4. → Redirects to outline generator

  Workflow 4: Edit Existing

  1. Find presentation in Recent section
  2. Click card
  3. → Opens in editor

  Workflow 5: Manage Multiple

  1. Open sidebar
  2. Enter selection mode
  3. Select multiple presentations
  4. Perform bulk action (delete/export)

  ---
  📱 RESPONSIVE DESIGN

  - Desktop: Full 4-column layout
  - Tablet: 2-column grid
  - Mobile: Single column stack
  - Sidebar becomes full-screen sheet on mobile

  ---
  🎯 KEY FEATURES SUMMARY

  ✅ Creation Tools:
  - Topic input with AI enhancement
  - 12+ language support
  - Customizable slide count (1-12)
  - Multiple AI models
  - Web search integration
  - Template library

  ✅ Management:
  - Recent presentations view
  - Full presentations sidebar
  - Inline editing
  - Bulk operations
  - Delete with confirmation

  ✅ Examples:
  - 6+ pre-built topics
  - One-click usage
  - Industry-focused

  ✅ Settings:
  - Model selection
  - Language preference
  - Style customization
  - Web search toggle

  ---
  🔗 NAVIGATION FROM DASHBOARD

  From the dashboard you can navigate to:

  1. Outline Generator → After clicking "Generate"
    - URL: /presentation/generate/[id]
  2. Presentation Editor → Click any recent presentation
    - URL: /presentation/[id]
  3. Authentication → If not logged in
    - URL: /auth/signin