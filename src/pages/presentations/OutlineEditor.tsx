import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Wand2, Palette, Loader2, LayoutGrid, List } from "lucide-react";
import { OutlineSlideRow } from "@/components/presentation/outline/OutlineSlideRow";
import { SlideGridView } from "@/components/presentation/outline/SlideGridView";
import { ThemeSelector } from "@/components/presentation/outline/ThemeSelector";
import { useToast } from "@/hooks/use-toast";
import { usePresentationQuery } from "@/hooks/usePresentationQuery";
import { useUpdatePresentation } from "@/hooks/usePresentationMutations";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Slide {
  id: string;
  title: string;
  order: number;
  layout?: string;
  content?: any;
}

export default function OutlineEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Database hooks
  const { data: presentation, isLoading, error } = usePresentationQuery(id);
  const { mutate: updatePresentation, isPending: isSaving } = useUpdatePresentation();

  // Local state for slides
  const [slides, setSlides] = useState<Slide[]>([]);
  const [selectedTheme, setSelectedTheme] = useState("mystique");
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid"); // Default to grid view

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Initialize slides from presentation data
  useEffect(() => {
    if (presentation) {
      // If presentation has generated slides with layout data, use those
      if (presentation.content?.slides && Array.isArray(presentation.content.slides)) {
        const loadedSlides = presentation.content.slides.map((slide: any, index: number) => ({
          id: `slide-${index}`,
          title: slide.title,
          order: index,
          layout: slide.layout,
          content: slide.content,
        }));
        setSlides(loadedSlides);
      }
      // Otherwise load from outline
      else if (presentation.outline && Array.isArray(presentation.outline)) {
        const loadedSlides = presentation.outline.map((title: string, index: number) => ({
          id: `slide-${index}`,
          title,
          order: index,
          layout: index === 0 ? "cover" : "title_content", // Assume first is cover
        }));
        setSlides(loadedSlides);
      }
      // Create default outline if none exists
      else {
        const defaultSlides = [
          { id: "slide-0", title: "Title Slide", order: 0, layout: "cover" },
          { id: "slide-1", title: "The Problem", order: 1, layout: "title_content" },
          { id: "slide-2", title: "Our Solution", order: 2, layout: "title_content" },
          { id: "slide-3", title: "Market Opportunity", order: 3, layout: "title_content" },
          { id: "slide-4", title: "Business Model", order: 4, layout: "title_content" },
          { id: "slide-5", title: "Traction", order: 5, layout: "title_content" },
          { id: "slide-6", title: "Team", order: 6, layout: "title_content" },
          { id: "slide-7", title: "Ask & Use of Funds", order: 7, layout: "title_content" },
        ];
        setSlides(defaultSlides);
      }
    }
  }, [presentation]);

  // Initialize theme from presentation
  useEffect(() => {
    if (presentation?.theme) {
      setSelectedTheme(presentation.theme);
    }
  }, [presentation?.theme]);

  // Save outline to database
  const saveOutline = (updatedSlides: Slide[]) => {
    if (!id) return;

    const outline = updatedSlides.map(slide => slide.title);
    updatePresentation({
      id,
      outline,
      slide_count: updatedSlides.length,
    });
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSlides((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const reorderedSlides = arrayMove(items, oldIndex, newIndex).map((slide, idx) => ({
          ...slide,
          order: idx,
        }));

        // Save to database
        saveOutline(reorderedSlides);

        toast({ description: "Slide reordered" });
        return reorderedSlides;
      });
    }
  };

  // Handle delete slide
  const handleDeleteSlide = (slideId: string) => {
    const updatedSlides = slides
      .filter(s => s.id !== slideId)
      .map((slide, idx) => ({ ...slide, order: idx }));

    setSlides(updatedSlides);
    saveOutline(updatedSlides);
    toast({ description: "Slide deleted" });
  };

  // Handle add slide
  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      title: "New Slide",
      order: slides.length,
    };
    const updatedSlides = [...slides, newSlide];
    setSlides(updatedSlides);
    saveOutline(updatedSlides);
    toast({ description: "Slide added" });
  };

  // Handle update slide title
  const handleUpdateSlideTitle = (slideId: string, newTitle: string) => {
    const updatedSlides = slides.map(slide =>
      slide.id === slideId ? { ...slide, title: newTitle } : slide
    );
    setSlides(updatedSlides);
    saveOutline(updatedSlides);
  };

  // Handle theme change
  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    if (id) {
      updatePresentation({
        id,
        theme,
      });
      toast({ description: `Theme changed to ${theme}` });
    }
  };

  // Handle generate content
  const handleGenerateContent = () => {
    if (slides.length === 0) {
      toast({
        title: "No slides",
        description: "Add at least one slide before generating content",
        variant: "destructive",
      });
      return;
    }

    // Update status to generating
    if (id) {
      updatePresentation({
        id,
        status: "generating",
      });
    }

    toast({
      title: "Generating content...",
      description: "This will take 30-60 seconds"
    });

    // Navigate to editor
    setTimeout(() => {
      navigate(`/presentations/${id}/edit`);
    }, 2000);
  };

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[600px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading presentation...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (error || !presentation) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[600px]">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Presentation not found</p>
            <p className="text-muted-foreground mb-4">
              {error?.message || "The presentation you're looking for doesn't exist."}
            </p>
            <Button onClick={() => navigate("/dashboard/pitch-decks")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard/pitch-decks")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {presentation.title || "Presentation Outline"}
              </h1>
              <p className="text-muted-foreground">
                {slides.length} slides {isSaving && "• Saving..."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex items-center border border-border rounded-lg p-1 mr-2">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowThemeSelector(true)}
            >
              <Palette className="h-4 w-4 mr-2" />
              Change Theme
            </Button>
            <Button onClick={handleGenerateContent} disabled={slides.length === 0}>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Content
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(`/presentations/${id}/view`)}
            >
              <Play className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>

        {/* Description */}
        {presentation.description && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Presentation Description</h2>
            <p className="text-muted-foreground text-sm">
              {presentation.description}
            </p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Refine your presentation</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Review the outline, reorder slides by dragging, or add/remove slides before generating content.
          </p>

          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-foreground">
              <strong>Current Theme:</strong> {selectedTheme}
            </p>
            <p className="text-sm text-muted-foreground">
              Click "Change Theme" to customize the visual style of your presentation.
            </p>
          </div>
        </div>

        {/* Slides View (Grid or List) */}
        {viewMode === "grid" ? (
          <SlideGridView
            slides={slides}
            onSlideClick={(slideId) => {
              // Could navigate to slide editor or open edit dialog
              toast({ description: "Slide clicked. Edit functionality coming soon!" });
            }}
            onDeleteSlide={handleDeleteSlide}
            onAddSlide={handleAddSlide}
          />
        ) : (
          <div className="space-y-2">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={slides.map(s => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {slides.map((slide, index) => (
                  <OutlineSlideRow
                    key={slide.id}
                    slide={slide}
                    index={index}
                    onReorder={() => {}} // Handled by DndContext
                    onDelete={handleDeleteSlide}
                    onUpdateTitle={handleUpdateSlideTitle}
                  />
                ))}
              </SortableContext>
            </DndContext>

            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={handleAddSlide}
            >
              + Add Slide
            </Button>
          </div>
        )}
      </div>

      <ThemeSelector
        open={showThemeSelector}
        onClose={() => setShowThemeSelector(false)}
        selectedTheme={selectedTheme}
        onSelectTheme={handleThemeChange}
      />
    </DashboardLayout>
  );
}
