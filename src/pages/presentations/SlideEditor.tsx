import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Layout, Palette, Download, Loader2, Menu } from "lucide-react";
import { ThumbnailPanel } from "@/components/presentation/editor/ThumbnailPanel";
import { SlideContent } from "@/components/presentation/editor/SlideContent";
import { AutoSaveIndicator } from "@/components/presentation/editor/AutoSaveIndicator";
import { LayoutSelector } from "@/components/presentations/LayoutSelector";
import { usePresentationQuery } from "@/hooks/usePresentationQuery";
import { useUpdatePresentation } from "@/hooks/usePresentationMutations";
import { useToast } from "@/hooks/use-toast";
import { type LayoutType } from "@/types/layouts";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditorSlideContent {
  headline?: string;
  bullets?: string[];
  notes?: string;
}

interface Slide {
  id: string;
  title: string;
  content: EditorSlideContent | string;
  layout?: LayoutType;
}

export default function SlideEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Database hooks
  const { data: presentation, isLoading, error } = usePresentationQuery(id);
  const { mutate: updatePresentation, isPending: isSaving } = useUpdatePresentation();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [layoutSelectorOpen, setLayoutSelectorOpen] = useState(false);
  const [mobileThumbnailsOpen, setMobileThumbnailsOpen] = useState(false);

  // Initialize slides from presentation
  useEffect(() => {
    if (presentation) {
      // Load slides from content JSONB or create from outline
      if (presentation.content && Array.isArray(presentation.content.slides)) {
        // Map OpenAI-generated slides to editor format
        const loadedSlides = presentation.content.slides.map((slide: any, index: number) => ({
          id: slide.id || `slide-${index}`,
          title: slide.title,
          content: slide.content,
          layout: slide.layout,
        }));
        setSlides(loadedSlides);
      } else if (presentation.outline && Array.isArray(presentation.outline)) {
        // Create slides from outline
        const slidesFromOutline = presentation.outline.map((title: string, index: number) => ({
          id: `slide-${index}`,
          title,
          content: { notes: `Content for ${title}` },
        }));
        setSlides(slidesFromOutline);
      } else {
        // Create default slides
        setSlides([
          { id: "slide-0", title: "Title Slide", content: { notes: "Your presentation title" } },
          { id: "slide-1", title: "Introduction", content: { notes: "Introduce your topic..." } },
        ]);
      }
    }
  }, [presentation]);

  // Update save status
  useEffect(() => {
    if (isSaving) {
      setSaveStatus("saving");
    } else if (hasUnsavedChanges) {
      setSaveStatus("saved");
      setHasUnsavedChanges(false);
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  }, [isSaving, hasUnsavedChanges]);

  // Save slides to database
  const saveSlides = (updatedSlides: Slide[]) => {
    if (!id) return;

    setSaveStatus("saving");
    setHasUnsavedChanges(true);

    updatePresentation({
      id,
      content: { slides: updatedSlides },
      slide_count: updatedSlides.length,
      status: "completed",
    }, {
      onSuccess: () => {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      },
      onError: () => {
        setSaveStatus("error");
        toast({
          title: "Save failed",
          description: "Could not save your changes. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  // Debounced save
  useEffect(() => {
    if (slides.length > 0 && hasUnsavedChanges) {
      const timer = setTimeout(() => {
        saveSlides(slides);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [slides, hasUnsavedChanges]);

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handleSlideClick = (index: number) => {
    setCurrentSlideIndex(index);
    setMobileThumbnailsOpen(false); // Close mobile drawer after selection
  };

  const handleSlideUpdate = (updates: Partial<Slide>) => {
    const newSlides = [...slides];
    newSlides[currentSlideIndex] = { ...newSlides[currentSlideIndex], ...updates };
    setSlides(newSlides);
    setHasUnsavedChanges(true);
  };

  const handleLayoutSelect = (layoutId: LayoutType) => {
    handleSlideUpdate({ layout: layoutId });
    toast({
      title: "Layout updated",
      description: "Your slide layout has been changed.",
    });
  };

  const currentSlide = slides[currentSlideIndex];

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading presentation...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !presentation) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
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
    );
  }

  // No slides state
  if (slides.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">No slides yet</p>
          <p className="text-muted-foreground mb-4">
            Create an outline first before editing slides.
          </p>
          <Button onClick={() => navigate(`/presentations/${id}/outline`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Create Outline
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard/pitch-decks")}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {/* Mobile Thumbnail Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileThumbnailsOpen(true)}
            className="md:hidden shrink-0"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="min-w-0 flex-1">
            <h1 className="font-semibold text-foreground truncate text-sm md:text-base">
              {presentation.title || "Untitled Presentation"}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              Slide {currentSlideIndex + 1} of {slides.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <AutoSaveIndicator isSaving={isSaving} status={saveStatus} />

          {/* Desktop Toolbar */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setLayoutSelectorOpen(true)}>
              <Layout className="h-4 w-4 mr-2" />
              Layout
            </Button>
            <Button variant="outline" size="sm">
              <Palette className="h-4 w-4 mr-2" />
              Theme
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => navigate(`/presentations/${id}/view`)}>
              Preview
            </Button>
          </div>

          {/* Mobile/Tablet Toolbar */}
          <div className="flex lg:hidden items-center gap-1">
            <Button variant="outline" size="icon" onClick={() => setLayoutSelectorOpen(true)}>
              <Layout className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Palette className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={() => navigate(`/presentations/${id}/view`)}>
              Preview
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Thumbnails */}
        <ThumbnailPanel
          slides={slides}
          currentSlideIndex={currentSlideIndex}
          onSlideClick={handleSlideClick}
        />

        {/* Center - Slide Content */}
        <div className="flex-1 flex flex-col">
          <SlideContent
            slide={currentSlide}
            onUpdate={handleSlideUpdate}
          />

          {/* Bottom Navigation */}
          <div className="border-t border-border bg-card px-6 py-4 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentSlideIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Slide {currentSlideIndex + 1} of {slides.length}
            </span>

            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentSlideIndex === slides.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Layout Selector Modal */}
      <LayoutSelector
        open={layoutSelectorOpen}
        onOpenChange={setLayoutSelectorOpen}
        currentLayout={currentSlide?.layout}
        onSelectLayout={handleLayoutSelect}
      />

      {/* Mobile Thumbnail Sheet */}
      <Sheet open={mobileThumbnailsOpen} onOpenChange={setMobileThumbnailsOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="p-4 border-b border-border">
            <SheetTitle>Slides</SheetTitle>
            <SheetDescription>Select a slide to edit</SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-5rem)]">
            <div className="p-3 space-y-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => handleSlideClick(index)}
                  className={`w-full text-left rounded-lg border-2 transition-all ${
                    index === currentSlideIndex
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 bg-background"
                  }`}
                >
                  <div className="aspect-video bg-muted flex items-center justify-center rounded-t-md">
                    <span className="text-4xl font-bold text-muted-foreground/30">
                      {index + 1}
                    </span>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium text-foreground truncate">
                      {slide.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
