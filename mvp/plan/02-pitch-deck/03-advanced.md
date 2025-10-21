# Pitch Deck - Advanced Implementation

**Phase**: Professional Features
**Time**: 1-2 weeks
**Priority**: 🟡 MEDIUM
**Difficulty**: Advanced
**Prerequisites**: 01-core.md and 02-intermediate.md must be complete

---

## Overview

Add professional-grade features: rich text editing, template system, PDF export, custom themes, analytics, collaboration, and advanced AI capabilities.

**Outcome**: Enterprise-ready pitch deck platform with production features.

---

## Feature Implementation

### Feature 1: Rich Text Editing with Plate.js (Week 1: Days 1-3)

**Install Dependencies**:
```bash
pnpm add @udecode/plate-common @udecode/plate-basic-marks @udecode/plate-list @udecode/plate-core @udecode/plate-heading @udecode/plate-paragraph
```

**Create**: `src/components/editor/RichTextEditor.tsx`

```typescript
import { Plate, PlateContent, usePlateEditor } from '@udecode/plate-common';
import { createParagraphPlugin } from '@udecode/plate-paragraph';
import { createBoldPlugin, createItalicPlugin } from '@udecode/plate-basic-marks';
import { createHeadingPlugin } from '@udecode/plate-heading';
import { createListPlugin } from '@udecode/plate-list';

const plugins = [
  createParagraphPlugin(),
  createHeadingPlugin(),
  createBoldPlugin(),
  createItalicPlugin(),
  createListPlugin(),
];

interface RichTextEditorProps {
  value: any[];
  onChange: (value: any[]) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = usePlateEditor({
    plugins,
    value,
    onChange,
  });

  return (
    <Plate editor={editor}>
      <PlateContent
        className="min-h-[200px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </Plate>
  );
}
```

**Update Slide Editor** to use Rich Text:
```typescript
// src/pages/presentations/SlideEditor.tsx
import { RichTextEditor } from '@/components/editor/RichTextEditor';

// Replace textarea with:
<RichTextEditor
  value={slideContent}
  onChange={handleContentChange}
/>
```

**Success Criteria**:
- [ ] Rich text editor renders
- [ ] Bold, italic formatting works
- [ ] Headings work (H1, H2, H3)
- [ ] Lists work (bullet, numbered)
- [ ] Content saves to database as JSON

---

### Feature 2: Template System (Week 1: Days 4-5)

**Database Migration**: `supabase/migrations/20250125000000_templates.sql`

```sql
CREATE TABLE IF NOT EXISTS presentation_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  slide_count INTEGER DEFAULT 10,
  structure JSONB NOT NULL, -- Array of slide templates
  theme JSONB DEFAULT '{}'::jsonb,
  is_public BOOLEAN DEFAULT true,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_templates_public ON presentation_templates(is_public);

-- Insert default templates
INSERT INTO presentation_templates (name, description, slide_count, structure, is_public) VALUES
('Startup Pitch', 'Classic startup pitch deck format', 10, '[
  {"title": "Problem", "type": "text-heavy"},
  {"title": "Solution", "type": "feature-showcase"},
  {"title": "Market Opportunity", "type": "data-viz"},
  {"title": "Business Model", "type": "diagram"},
  {"title": "Traction", "type": "metrics"},
  {"title": "Competition", "type": "comparison"},
  {"title": "Go-to-Market", "type": "timeline"},
  {"title": "Team", "type": "people-grid"},
  {"title": "Financials", "type": "charts"},
  {"title": "Ask", "type": "call-to-action"}
]'::jsonb, true),

('Product Launch', 'Product launch presentation', 8, '[
  {"title": "Vision", "type": "hero"},
  {"title": "Product Overview", "type": "feature-showcase"},
  {"title": "Key Features", "type": "grid"},
  {"title": "Demo", "type": "video-embed"},
  {"title": "Pricing", "type": "pricing-table"},
  {"title": "Launch Plan", "type": "timeline"},
  {"title": "Success Metrics", "type": "kpis"},
  {"title": "Next Steps", "type": "call-to-action"}
]'::jsonb, true);
```

**Create Template Selector**:
```typescript
// src/components/templates/TemplateGallery.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

export function TemplateGallery({ onSelect }: { onSelect: (template: any) => void }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const loadTemplates = async () => {
      const { data } = await supabase
        .from('presentation_templates')
        .select('*')
        .eq('is_public', true);

      setTemplates(data || []);
    };
    loadTemplates();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card
          key={template.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelect(template)}
        >
          <CardHeader>
            <CardTitle>{template.name}</CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge>{template.slide_count} slides</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

**Success Criteria**:
- [ ] Templates table created
- [ ] Default templates inserted
- [ ] Template gallery displays
- [ ] Can select template for new presentation
- [ ] Presentation created from template structure

---

### Feature 3: PDF Export (Week 2: Days 1-2)

**Install Dependencies**:
```bash
pnpm add jspdf html2canvas
```

**Create Export Function**:
```typescript
// src/utils/exportPDF.ts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportPresentationToPDF(presentationId: string) {
  const pdf = new jsPDF('landscape', 'mm', 'a4');
  const slides = document.querySelectorAll('[data-slide]');

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i] as HTMLElement;

    const canvas = await html2canvas(slide, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 297; // A4 landscape width
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  }

  pdf.save(`presentation-${presentationId}.pdf`);
}
```

**Add Export Button**:
```typescript
// In PresentationViewer.tsx
import { exportPresentationToPDF } from '@/utils/exportPDF';

<Button
  variant="outline"
  onClick={() => exportPresentationToPDF(presentation.id)}
>
  📥 Export PDF
</Button>
```

**Success Criteria**:
- [ ] Export button renders
- [ ] Clicking generates PDF
- [ ] All slides included in PDF
- [ ] PDF maintains formatting
- [ ] File downloads successfully

---

### Feature 4: Custom Themes (Week 2: Days 3-4)

**Database Migration**: `supabase/migrations/20250126000000_custom_themes.sql`

```sql
CREATE TABLE IF NOT EXISTS custom_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  colors JSONB NOT NULL,
  fonts JSONB NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Example theme structure:
-- {
--   "primary": "#6366f1",
--   "secondary": "#8b5cf6",
--   "background": "#ffffff",
--   "text": "#1f2937"
-- }
```

**Create Theme Editor**:
```typescript
// src/components/themes/ThemeEditor.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';

export function ThemeEditor({ onSave }: { onSave: (theme: any) => void }) {
  const [theme, setTheme] = useState({
    name: 'Custom Theme',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      background: '#ffffff',
      text: '#1f2937',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  });

  const saveTheme = async () => {
    const { user } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('custom_themes')
      .insert({
        profile_id: user.id,
        ...theme,
      })
      .select()
      .single();

    if (!error) onSave(data);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Theme Name</Label>
        <Input
          value={theme.name}
          onChange={(e) => setTheme({ ...theme, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Primary Color</Label>
          <Input
            type="color"
            value={theme.colors.primary}
            onChange={(e) =>
              setTheme({
                ...theme,
                colors: { ...theme.colors, primary: e.target.value },
              })
            }
          />
        </div>

        <div>
          <Label>Secondary Color</Label>
          <Input
            type="color"
            value={theme.colors.secondary}
            onChange={(e) =>
              setTheme({
                ...theme,
                colors: { ...theme.colors, secondary: e.target.value },
              })
            }
          />
        </div>
      </div>

      <Button onClick={saveTheme} className="w-full">
        Save Theme
      </Button>
    </div>
  );
}
```

**Success Criteria**:
- [ ] Theme editor opens
- [ ] Can customize colors
- [ ] Can select fonts
- [ ] Theme saves to database
- [ ] Can apply theme to presentation
- [ ] Live preview shows changes

---

### Feature 5: Analytics & Tracking (Week 2: Day 5)

**Database Migration**: `supabase/migrations/20250127000000_analytics.sql`

```sql
CREATE TABLE IF NOT EXISTS presentation_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  presentation_id UUID NOT NULL REFERENCES presentations(id) ON DELETE CASCADE,
  viewer_ip TEXT,
  viewer_location TEXT,
  duration_seconds INTEGER,
  slides_viewed INTEGER[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_views_presentation ON presentation_views(presentation_id);
CREATE INDEX idx_views_date ON presentation_views(created_at);

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_presentation_views(presentation_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE presentations
  SET view_count = view_count + 1
  WHERE id = presentation_id;
END;
$$ LANGUAGE plpgsql;
```

**Implement Tracking**:
```typescript
// src/utils/analytics.ts
import { supabase } from '@/integrations/supabase/client';

export async function trackPresentationView(presentationId: string) {
  // Increment view count
  await supabase.rpc('increment_presentation_views', { presentation_id: presentationId });

  // Record detailed view
  await supabase.from('presentation_views').insert({
    presentation_id: presentationId,
    viewer_ip: await getClientIP(),
    slides_viewed: [],
    duration_seconds: 0,
  });
}

export async function trackSlideView(presentationId: string, slideIndex: number) {
  // Track which slides users spend time on
  // Implementation depends on tracking strategy
}

async function getClientIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return 'unknown';
  }
}
```

**Add Analytics Dashboard**:
```typescript
// src/components/analytics/PresentationAnalytics.tsx
export function PresentationAnalytics({ presentationId }: { presentationId: string }) {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      const { data } = await supabase
        .from('presentation_views')
        .select('*')
        .eq('presentation_id', presentationId);

      setAnalytics({
        totalViews: data?.length || 0,
        uniqueViewers: new Set(data?.map(v => v.viewer_ip)).size,
        avgDuration: data?.reduce((sum, v) => sum + v.duration_seconds, 0) / (data?.length || 1),
      });
    };

    loadAnalytics();
  }, [presentationId]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>{analytics?.totalViews || 0}</CardTitle>
          <CardDescription>Total Views</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{analytics?.uniqueViewers || 0}</CardTitle>
          <CardDescription>Unique Viewers</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{Math.round(analytics?.avgDuration || 0)}s</CardTitle>
          <CardDescription>Avg. Duration</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
```

**Success Criteria**:
- [ ] View tracking works
- [ ] View count increments
- [ ] Analytics dashboard displays
- [ ] Shows total views, unique viewers
- [ ] Tracks slide-level engagement

---

### Feature 6: Collaboration (Optional - Week 3)

**Real-time Editing with Supabase Realtime**:
```typescript
// src/hooks/useCollaboration.ts
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useCollaboration(presentationId: string, onUpdate: (payload: any) => void) {
  useEffect(() => {
    const channel = supabase
      .channel(`presentation:${presentationId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'presentations',
          filter: `id=eq.${presentationId}`,
        },
        (payload) => {
          onUpdate(payload.new);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [presentationId]);
}
```

---

## Summary

### All Advanced Features

| Feature | Time | Priority | Status |
|---------|------|----------|--------|
| Rich Text Editing | 2-3 days | High | Core |
| Template System | 2 days | High | Core |
| PDF Export | 1-2 days | Medium | Important |
| Custom Themes | 2 days | Medium | Nice-to-have |
| Analytics | 1 day | Medium | Important |
| Collaboration | 3-5 days | Low | Optional |

**Total Time**: 1-2 weeks (depending on features chosen)

---

## Success Criteria

### Professional Features
- [ ] Rich text editing works
- [ ] Multiple templates available
- [ ] PDF export functional
- [ ] Custom themes save and apply
- [ ] Analytics track views
- [ ] Share links work

### Production Ready
- [ ] Performance optimized
- [ ] Mobile responsive
- [ ] Error handling comprehensive
- [ ] Loading states polished
- [ ] Lighthouse score > 90

---

## Deployment Checklist

```bash
# 1. Final build test
pnpm build
pnpm preview

# 2. Run all migrations
npx supabase db push

# 3. Deploy Edge Functions
supabase functions deploy chat
supabase functions deploy generate-pitch-deck

# 4. Set production secrets
supabase secrets set OPENAI_API_KEY=...

# 5. Configure RLS policies
# Verify all tables have RLS enabled

# 6. Test complete user flow
# - Sign up
# - Create presentation
# - Edit slides
# - Export PDF
# - Share link

# 7. Monitor performance
# - Check Lighthouse
# - Test on mobile
# - Verify load times
```

---

**Estimated Total Time**: 1-2 weeks
**Difficulty**: Advanced
**Status**: ✅ Ready for production features
