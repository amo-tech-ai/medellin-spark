# Files to Copy from reference-presentation-ai

## Overview
Reference project is **already using Vite**. These files need to be copied to `/home/sk/medellin-spark/` and adapted for Supabase.

---

## 1. Plate.js Editor (184 files)
**Source:** `reference-presentation-ai/src/components/plate/`
**Destination:** `medellin-spark/src/components/plate/`

### Core Files (2)
editor-base-kit.tsx
editor-kit.tsx

### Hooks (6)
hooks/use-debounce.ts
hooks/use-floating-toolbar.tsx
hooks/use-is-touch-device.ts
hooks/use-mounted.ts
hooks/use-upload-file.ts
hooks/usePlateEditor.ts

### Plugins (60)
plugins/ai-kit.tsx
plugins/align-base-kit.tsx
plugins/align-kit.tsx
plugins/autoformat-kit.tsx
plugins/basic-blocks-base-kit.tsx
plugins/basic-blocks-kit.tsx
plugins/basic-marks-base-kit.tsx
plugins/basic-marks-kit.tsx
plugins/basic-nodes-kit.tsx
plugins/block-menu-kit.tsx
plugins/block-placeholder-kit.tsx
plugins/block-selection-kit.tsx
plugins/callout-base-kit.tsx
plugins/callout-kit.tsx
plugins/code-block-base-kit.tsx
plugins/code-block-kit.tsx
plugins/column-base-kit.tsx
plugins/column-kit.tsx
plugins/comment-base-kit.tsx
plugins/comment-kit.tsx
plugins/copilot-kit.tsx
plugins/cursor-overlay-kit.tsx
plugins/date-base-kit.tsx
plugins/date-kit.tsx
plugins/discussion-kit.tsx
plugins/dnd-kit.tsx
plugins/emoji-kit.tsx
plugins/exit-break-kit.tsx
plugins/fixed-toolbar-kit.tsx
plugins/floating-toolbar-kit.tsx
plugins/font-base-kit.tsx
plugins/font-kit.tsx
plugins/indent-base-kit.tsx
plugins/indent-kit.tsx
plugins/line-height-base-kit.tsx
plugins/line-height-kit.tsx
plugins/link-base-kit.tsx
plugins/link-kit.tsx
plugins/list-base-kit.tsx
plugins/list-kit.tsx
plugins/markdown-kit.tsx
plugins/math-base-kit.tsx
plugins/math-kit.tsx
plugins/media-base-kit.tsx
plugins/media-kit.tsx
plugins/mention-base-kit.tsx
plugins/mention-kit.tsx
plugins/slash-kit.tsx
plugins/suggestion-base-kit.tsx
plugins/suggestion-kit.tsx
plugins/table-base-kit.tsx
plugins/table-kit.tsx
plugins/toc-base-kit.tsx
plugins/toc-kit.tsx
plugins/toggle-base-kit.tsx
plugins/toggle-kit.tsx

### UI Components (112)
ui/ai-chat-editor.tsx
ui/ai-menu.tsx
ui/ai-node.tsx
ui/ai-toolbar-button.tsx
ui/alert-dialog.tsx
ui/align-toolbar-button.tsx
ui/avatar.tsx
ui/block-context-menu.tsx
ui/block-discussion.tsx
ui/block-draggable.tsx
ui/block-list-static.tsx
ui/block-list.tsx
ui/block-selection.tsx
ui/block-suggestion.tsx
ui/blockquote-node-static.tsx
ui/blockquote-node.tsx
ui/button.tsx
ui/calendar.tsx
ui/callout-node-static.tsx
ui/callout-node.tsx
ui/caption.tsx
ui/chart-data-editor-dialog.tsx
ui/checkbox.tsx
ui/code-block-node-static.tsx
ui/code-block-node.tsx
ui/code-node-static.tsx
ui/code-node.tsx
ui/column-node-static.tsx
ui/column-node.tsx
ui/command.tsx
ui/comment-node-static.tsx
ui/comment-node.tsx
ui/comment-toolbar-button.tsx
ui/comment.tsx
ui/context-menu.tsx
ui/cursor-overlay.tsx
ui/date-node-static.tsx
ui/date-node.tsx
ui/dialog.tsx
ui/dropdown-menu.tsx
ui/editor-static.tsx
ui/editor.tsx
ui/emoji-node.tsx
ui/emoji-toolbar-button.tsx
ui/equation-node-static.tsx
ui/equation-node.tsx
ui/equation-toolbar-button.tsx
ui/export-toolbar-button.tsx
ui/fixed-toolbar-buttons.tsx
ui/fixed-toolbar.tsx
ui/floating-toolbar-buttons.tsx
ui/floating-toolbar.tsx
ui/font-color-toolbar-button.tsx
ui/font-family-toolbar-button.tsx
ui/font-size-toolbar-button.tsx
ui/ghost-text.tsx
ui/heading-node-static.tsx
ui/heading-node.tsx
ui/highlight-node-static.tsx
ui/highlight-node.tsx
ui/history-toolbar-button.tsx
ui/hr-node-static.tsx
ui/hr-node.tsx
ui/import-toolbar-button.tsx
ui/indent-toolbar-button.tsx
ui/inline-combobox.tsx
ui/input.tsx
ui/insert-toolbar-button.tsx
ui/kbd-node-static.tsx
ui/kbd-node.tsx
ui/line-height-toolbar-button.tsx
ui/link-node-static.tsx
ui/link-node.tsx
ui/link-toolbar-button.tsx
ui/link-toolbar.tsx
ui/list-toolbar-button.tsx
ui/mark-toolbar-button.tsx
ui/media-audio-node-static.tsx
ui/media-audio-node.tsx
ui/media-embed-node.tsx
ui/media-file-node-static.tsx
ui/media-file-node.tsx
ui/media-image-node-static.tsx
ui/media-image-node.tsx
ui/media-placeholder-node.tsx
ui/media-preview-dialog.tsx
ui/media-toolbar-button.tsx
ui/media-toolbar.tsx
ui/media-upload-toast.tsx
ui/media-video-node-static.tsx
ui/media-video-node.tsx
ui/mention-node-static.tsx
ui/mention-node.tsx
ui/mode-toolbar-button.tsx
ui/more-toolbar-button.tsx
ui/paragraph-node-static.tsx
ui/paragraph-node.tsx
ui/popover.tsx
ui/resize-handle.tsx
ui/separator.tsx
ui/slash-node.tsx
ui/suggestion-node-static.tsx
ui/suggestion-node.tsx
ui/suggestion-toolbar-button.tsx
ui/table-icons.tsx
ui/table-node-static.tsx
ui/table-node.tsx
ui/table-toolbar-button.tsx
ui/toc-node-static.tsx
ui/toc-node.tsx
ui/toggle-node-static.tsx
ui/toggle-node.tsx
ui/toggle-toolbar-button.tsx
ui/toolbar.tsx
ui/tooltip.tsx
ui/turn-into-toolbar-button.tsx

### Utils (4)
utils/extractFontsFromEditor.ts
utils/font-loader.tsx
utils/plate-types.ts
utils/transforms.ts

---

## 2. ProseMirror Outline Editor (3 files)
**Source:** `reference-presentation-ai/src/components/prose-mirror/`
**Destination:** `medellin-spark/src/components/prose-mirror/`

FloatingToolbar.tsx
ProseMirrorEditor.tsx
ProseMirrorSchema.ts

**Purpose:** Simple markdown editor for outline items (separate from Plate.js)

---

## 3. Presentation Components (~195 files)
**Source:** `reference-presentation-ai/src/components/presentation/`
**Destination:** `medellin-spark/src/components/presentations/`

### Dashboard (15 files)
dashboard/ModelPicker.tsx
dashboard/ModelPickerSkeleton.tsx
dashboard/PresentationControls.tsx
dashboard/PresentationDashboard.tsx
dashboard/PresentationExamples.tsx
dashboard/PresentationGenerationManager.tsx
dashboard/PresentationHeader.tsx
dashboard/PresentationInput.tsx
dashboard/PresentationItem.tsx
dashboard/PresentationsSidebar.tsx
dashboard/PresentModeHeader.tsx
dashboard/RecentPresentations.tsx
dashboard/SelectionControls.tsx
dashboard/ThinkingDisplay.tsx
dashboard/WebSearchToggle.tsx

### Editor Components (50+ files)
editor/presentation-editor.tsx
editor/presentation-editor-static.tsx
editor/custom-elements/
editor/dnd/
editor/plugins/

### Outline Components (6 files)
outline/OutlineDisplay.tsx
outline/OutlineEditor.tsx
outline/OutlineGeneration.tsx
outline/OutlineItem.tsx
outline/OutlinePreview.tsx
outline/OutlineSlide.tsx

### Theme Components (11 files)
themes/CustomThemeBuilder.tsx
themes/CustomThemeCard.tsx
themes/CustomThemeModal.tsx
themes/LoadThemeButton.tsx
themes/ThemeColorPicker.tsx
themes/ThemeFontPicker.tsx
themes/ThemeLogoUpload.tsx
themes/ThemePreview.tsx
themes/ThemeSelector.tsx
themes/theme-types.ts

### Viewer Components (15+ files)
view/PresentationDisplay.tsx
view/PresentationNavigation.tsx
view/PresentationPage.tsx
view/PresentationSlide.tsx
view/SlideContent.tsx
view/SlideImage.tsx
view/SlideLayout.tsx
view/SlideText.tsx
view/SlideTitle.tsx

### Utils (3 files)
utils/exportToPPT.ts
utils/parser.ts
utils/types.ts

---

## 4. Presentation Hooks (~7 files)
**Source:** `reference-presentation-ai/src/hooks/presentation/`
**Destination:** `medellin-spark/src/hooks/presentation/`

previewSignature.ts
useDebouncedSave.ts
useLocalModels.ts
usePresentationSlides.tsx
useRootImageActions.ts
useSlideChangeWatcher.ts
useSlideOperations.ts

---

## 5. Presentation Library (~5 files)
**Source:** `reference-presentation-ai/src/lib/presentation/`
**Destination:** `medellin-spark/src/lib/presentation/`

actions.ts
image-actions.ts
model-picker.ts
queries.ts
theme-actions.ts
themes.ts
thinking-extractor.ts

---

## 6. Styles (1 file)
**Source:** `reference-presentation-ai/src/styles/`
**Destination:** `medellin-spark/src/styles/`

presentation.css

---

## 7. API Routes (Convert to Edge Functions)
**Source:** `reference-presentation-ai/src/app/api/presentation/`
**Destination:** `medellin-spark/supabase/functions/`

### These Next.js API routes need to be rewritten as Supabase Edge Functions:

outline/route.ts ’ generate-outline/index.ts
outline-with-search/route.ts ’ generate-outline/index.ts (with search)
generate/route.ts ’ generate-presentation/index.ts
uploadthing/route.ts ’ (Use Supabase Storage instead)

**Changes needed:**
- Next.js Request/Response ’ Deno Request/Response
- Environment variables ’ Supabase secrets
- File uploads ’ Supabase Storage API

---

## 8. Pages (Already exist in medellin-spark)
**Source:** `reference-presentation-ai/src/app/presentation/`
**Destination:** `medellin-spark/src/pages/presentations/`

### Existing pages (enhance with copied components):
MyPresentations.tsx
PresentationEditor.tsx
PresentationGenerate.tsx
PresentationView.tsx

---

## Summary

**Total files to copy:** ~400 files
- Plate.js editor: 184 files
- ProseMirror editor: 3 files
- Presentation components: ~195 files
- Hooks: 7 files
- Library functions: 7 files
- Styles: 1 file
- API routes: 3 files (convert to Edge Functions)

**Major adaptations needed:**
1. Next.js API routes ’ Supabase Edge Functions
2. NextAuth ’ Supabase Auth (already done)
3. Prisma ’ Supabase client (already done)
4. UploadThing ’ Supabase Storage
5. Environment variables ’ Supabase secrets (for AI keys)
