# Business Plan AI - Advanced (Financial Modeling & Export)

**Phase**: Professional Features
**Time**: 5-7 days
**Priority**: 🟢 LOW
**Difficulty**: Advanced
**Prerequisites**: 05-business-plan-ai/02-intermediate.md complete

---

## Overview

Add financial modeling, charts, PDF/DOCX export, and collaboration features.

**Outcome**: Complete business plan platform with exports

---

## Implementation Steps

### Step 1: Financial Modeling (3 days)

```typescript
// Financial projections table
CREATE TABLE IF NOT EXISTS financial_projections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES business_plans(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  revenue DECIMAL(12,2),
  costs DECIMAL(12,2),
  profit DECIMAL(12,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

// Add financial calculator component
// src/components/FinancialCalculator.tsx
export function FinancialCalculator() {
  const [projections, setProjections] = useState([
    { year: 1, revenue: 0, costs: 0 },
    { year: 2, revenue: 0, costs: 0 },
    { year: 3, revenue: 0, costs: 0 },
  ]);

  const calculateProfit = (year: any) => year.revenue - year.costs;

  return (
    <div className="space-y-4">
      {projections.map((year, idx) => (
        <div key={idx} className="grid grid-cols-4 gap-4">
          <span>Year {year.year}</span>
          <Input
            type="number"
            placeholder="Revenue"
            onChange={(e) => updateYear(idx, 'revenue', e.target.value)}
          />
          <Input
            type="number"
            placeholder="Costs"
            onChange={(e) => updateYear(idx, 'costs', e.target.value)}
          />
          <span>Profit: ${calculateProfit(year).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
```

---

### Step 2: PDF Export (2 days)

```typescript
// Install jsPDF
pnpm add jspdf

// src/utils/exportBusinessPlan.ts
import jsPDF from 'jspdf';

export function exportToPDF(plan: any) {
  const doc = new jsPDF();
  let yPos = 20;

  // Title page
  doc.setFontSize(20);
  doc.text(plan.title, 20, yPos);
  yPos += 10;

  doc.setFontSize(14);
  doc.text(plan.company_name, 20, yPos);
  yPos += 20;

  // Sections
  Object.values(plan.sections).forEach((section: any) => {
    doc.setFontSize(16);
    doc.text(section.title, 20, yPos);
    yPos += 10;

    doc.setFontSize(12);
    const lines = doc.splitTextToSize(section.content, 170);
    doc.text(lines, 20, yPos);
    yPos += lines.length * 7;

    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
  });

  doc.save(`${plan.company_name}_business_plan.pdf`);
}

// Add export button
<Button onClick={() => exportToPDF(plan)}>
  Download PDF
</Button>
```

---

### Step 3: Charts (1 day)

```typescript
// Install recharts
pnpm add recharts

// Financial chart component
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export function FinancialChart({ projections }: any) {
  return (
    <LineChart width={600} height={300} data={projections}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      <Line type="monotone" dataKey="costs" stroke="#82ca9d" />
      <Line type="monotone" dataKey="profit" stroke="#ffc658" />
    </LineChart>
  );
}
```

---

## Success Criteria

- [ ] Financial modeling works
- [ ] Charts display correctly
- [ ] PDF export generates
- [ ] All sections included
- [ ] Professional formatting

---

## Testing

```bash
# Test financial calculator
# Add projections, verify calculations

# Test PDF export
# Click export, check generated PDF
```

---

## Completion

After all 5 features complete (Setup, Dashboard, Pitch Deck, Jobs, Perks, Business Plan):
✅ **Medellin AI Platform Complete!**

---

**Time**: 5-7 days
**Status**: ✅ Ready to implement
