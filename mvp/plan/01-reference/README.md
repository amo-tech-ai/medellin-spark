# Reference Documentation

**Purpose**: Quick lookup for design standards, technical decisions, and project navigation

---

## 📚 Files (Clean Sequential Order)

| # | File | Contents | Use When |
|---|------|----------|----------|
| 01 | `01-design-system.md` | UI/UX standards, typography, spacing | Building UI components |
| 02 | `02-color-scheme.md` | Color palette, HSL values, usage | Styling components |
| 03 | `03-file-structure.md` | Codebase organization | Finding files |
| 04 | `04-decision-matrix.md` | Technical decisions, architecture | Understanding choices |
| 05 | `05-url-reference.md` | All routes, localhost URLs, testing URLs | Navigation & testing |

---

## 🎯 Quick Lookup

**Need Colors?** → `02-color-scheme.md`
**Need Typography?** → `01-design-system.md`
**Can't Find a File?** → `03-file-structure.md`
**Why Was X Chosen?** → `04-decision-matrix.md`
**What's the URL?** → `05-url-reference.md`

---

## 📖 Usage Examples

### Scenario 1: Building a New UI Component
1. Check `01-design-system.md` for standards
2. Use colors from `02-color-scheme.md`
3. Follow file organization from `03-file-structure.md`

### Scenario 2: Testing a Feature
1. Find route in `05-url-reference.md`
2. Navigate to localhost URL
3. Verify functionality

### Scenario 3: Onboarding New Team Member
1. Start with this README
2. Read `04-decision-matrix.md` for context
3. Browse other references as needed

---

## 🗂️ Archived Files (Moved to `/mvp/archive/`)

**Removed for clarity:**
- `00-master-reference.md` - Actually an implementation plan for "My Presentations Dashboard" (not a general reference)
- `06-urls-quick.md` - Quick summary of `05-url-reference.md` (redundant)
- `07-pages-list.md` - Simple page list (covered in `05-url-reference.md`)

---

## 📝 Reference Standards

**Design System:**
- Based on shadcn/ui + Radix UI
- Tailwind CSS for styling
- Responsive design (mobile-first)

**Color Palette:**
- Soft, sophisticated pastels
- Dark mode support
- WCAG AA accessibility compliant

**File Structure:**
- `src/` for source code
- Component-based architecture
- Clear naming conventions

---

**Tip:** Bookmark this folder for quick reference during development!
