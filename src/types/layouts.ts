export type LayoutType =
  | "title-slide"
  | "two-columns"
  | "image-left"
  | "image-right"
  | "bullet-list"
  | "image-full"
  | "three-columns"
  | "title-content"
  | "comparison"
  | "quote"
  | "image-grid"
  | "blank";

export interface SlideLayout {
  id: LayoutType;
  name: string;
  description: string;
  thumbnail: string;
  category: "basic" | "content" | "visual" | "special";
  structure: {
    hasTitle: boolean;
    hasSubtitle?: boolean;
    hasImage?: boolean;
    imagePosition?: "left" | "right" | "full" | "grid";
    columns?: number;
    hasBullets?: boolean;
  };
}

export const SLIDE_LAYOUTS: SlideLayout[] = [
  {
    id: "title-slide",
    name: "Title Slide",
    description: "Large title with subtitle",
    thumbnail: "📄",
    category: "basic",
    structure: {
      hasTitle: true,
      hasSubtitle: true,
    },
  },
  {
    id: "title-content",
    name: "Title & Content",
    description: "Title with body text",
    thumbnail: "📝",
    category: "basic",
    structure: {
      hasTitle: true,
      hasSubtitle: false,
    },
  },
  {
    id: "two-columns",
    name: "Two Columns",
    description: "Split content in half",
    thumbnail: "📊",
    category: "content",
    structure: {
      hasTitle: true,
      columns: 2,
    },
  },
  {
    id: "image-left",
    name: "Image Left",
    description: "Image on left, text on right",
    thumbnail: "🖼️",
    category: "visual",
    structure: {
      hasTitle: true,
      hasImage: true,
      imagePosition: "left",
    },
  },
  {
    id: "image-right",
    name: "Image Right",
    description: "Text on left, image on right",
    thumbnail: "🖼️",
    category: "visual",
    structure: {
      hasTitle: true,
      hasImage: true,
      imagePosition: "right",
    },
  },
  {
    id: "bullet-list",
    name: "Bullet List",
    description: "Title with bullet points",
    thumbnail: "📋",
    category: "content",
    structure: {
      hasTitle: true,
      hasBullets: true,
    },
  },
  {
    id: "image-full",
    name: "Full Image",
    description: "Full-screen image with caption",
    thumbnail: "🌄",
    category: "visual",
    structure: {
      hasTitle: true,
      hasImage: true,
      imagePosition: "full",
    },
  },
  {
    id: "three-columns",
    name: "Three Columns",
    description: "Split content into thirds",
    thumbnail: "📑",
    category: "content",
    structure: {
      hasTitle: true,
      columns: 3,
    },
  },
  {
    id: "comparison",
    name: "Comparison",
    description: "Compare two items side-by-side",
    thumbnail: "⚖️",
    category: "content",
    structure: {
      hasTitle: true,
      columns: 2,
    },
  },
  {
    id: "quote",
    name: "Quote",
    description: "Large quote with attribution",
    thumbnail: "💬",
    category: "special",
    structure: {
      hasTitle: false,
    },
  },
  {
    id: "image-grid",
    name: "Image Grid",
    description: "Multiple images in grid",
    thumbnail: "🎨",
    category: "visual",
    structure: {
      hasTitle: true,
      hasImage: true,
      imagePosition: "grid",
    },
  },
  {
    id: "blank",
    name: "Blank",
    description: "Empty canvas for custom content",
    thumbnail: "⬜",
    category: "basic",
    structure: {
      hasTitle: false,
    },
  },
];
