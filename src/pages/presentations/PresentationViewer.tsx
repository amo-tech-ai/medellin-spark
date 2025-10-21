import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Edit, Share2, Loader2, ArrowLeft } from "lucide-react";
import { usePresentationQuery } from "@/hooks/usePresentationQuery";

interface Slide {
  slide_number: number;
  title: string;
  layout: string;
  content: {
    headline?: string;
    bullets?: string[];
    notes?: string;
    company_name?: string;
    tagline?: string;
    logo_placeholder?: string;
    [key: string]: any;
  };
}

export default function PresentationViewer() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Database hooks
  const { data: presentation, isLoading, error } = usePresentationQuery(id);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);

  // Initialize slides from presentation data
  useEffect(() => {
    if (presentation) {
      // Load slides from content JSONB
      if (presentation.content && Array.isArray(presentation.content.slides)) {
        setSlides(presentation.content.slides);
      }
    }
  }, [presentation]);

  const currentSlide = slides[currentSlideIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "Escape") navigate(`/dashboard/pitch-decks`);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlideIndex, slides.length]);

  // Auto-hide controls after 3 seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showControls, currentSlideIndex]);

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setShowControls(true);
    }
  };

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setShowControls(true);
    }
  };

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
            Create an outline first before viewing your presentation.
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
    <div
      className="h-screen bg-background relative"
      onMouseMove={() => setShowControls(true)}
    >
      {/* Top Bar */}
      <div
        className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 flex items-center justify-between z-10 transition-opacity ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={() => navigate("/dashboard/pitch-decks")}
        >
          <X className="h-5 w-5" />
        </Button>

        <h1 className="text-white font-semibold">
          {presentation.title || "Untitled Presentation"}
        </h1>

        <div className="flex items-center gap-2">
          <span className="text-white text-sm mr-4">
            {currentSlideIndex + 1} / {slides.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => navigate(`/presentations/${id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Main Slide */}
      <div className="h-full flex items-center justify-center p-16">
        <div className="max-w-5xl w-full bg-card rounded-lg shadow-2xl p-16 border border-border">
          {/* Cover Layout */}
          {currentSlide.layout === 'cover' && (
            <div className="text-center">
              <h1 className="text-6xl font-bold text-foreground mb-4">
                {currentSlide.content.company_name}
              </h1>
              <p className="text-3xl text-muted-foreground">
                {currentSlide.content.tagline}
              </p>
            </div>
          )}

          {/* Title + Content Layout */}
          {currentSlide.layout === 'title_content' && (
            <>
              <h2 className="text-5xl font-bold text-foreground mb-4">
                {currentSlide.title}
              </h2>
              {currentSlide.content.headline && (
                <h3 className="text-3xl font-semibold text-primary mb-6">
                  {currentSlide.content.headline}
                </h3>
              )}
              {currentSlide.content.bullets && (
                <ul className="space-y-4 text-2xl text-muted-foreground">
                  {currentSlide.content.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-3">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
              {currentSlide.content.notes && !currentSlide.content.bullets && (
                <p className="text-2xl text-muted-foreground leading-relaxed">
                  {currentSlide.content.notes}
                </p>
              )}
            </>
          )}

          {/* Fallback for other layouts */}
          {!['cover', 'title_content'].includes(currentSlide.layout) && (
            <>
              <h2 className="text-5xl font-bold text-foreground mb-8">
                {currentSlide.title}
              </h2>
              <p className="text-2xl text-muted-foreground leading-relaxed">
                {JSON.stringify(currentSlide.content)}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6 flex items-center justify-center gap-4 z-10 transition-opacity ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={handlePrevious}
          disabled={currentSlideIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <span className="text-white font-medium">
          Slide {currentSlideIndex + 1} of {slides.length}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={handleNext}
          disabled={currentSlideIndex === slides.length - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
