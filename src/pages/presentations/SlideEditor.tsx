import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Layout, Palette, Download } from "lucide-react";
import { ThumbnailPanel } from "@/components/presentation/editor/ThumbnailPanel";
import { SlideContent } from "@/components/presentation/editor/SlideContent";
import { AutoSaveIndicator } from "@/components/presentation/editor/AutoSaveIndicator";
import { useAutoSave } from "@/hooks/useAutoSave";

export default function SlideEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState([
    { id: "1", title: "Title Slide", content: "Your pitch deck title" },
    { id: "2", title: "The Problem", content: "Event planning is broken..." },
    { id: "3", title: "Our Solution", content: "EventOS fixes this with AI..." },
    { id: "4", title: "Market Opportunity", content: "Market analysis..." },
    { id: "5", title: "Business Model", content: "How we make money..." },
    { id: "6", title: "Traction", content: "Our progress so far..." },
    { id: "7", title: "Team", content: "Meet the team..." },
    { id: "8", title: "Ask & Use of Funds", content: "Investment ask..." },
    { id: "9", title: "Competition", content: "Competitive landscape..." },
    { id: "10", title: "Thank You", content: "Contact information..." },
  ]);

  const currentSlide = slides[currentSlideIndex];
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const { debouncedSave } = useAutoSave({
    presentationId: id || "",
    onSaveStart: () => setSaveStatus("saving"),
    onSaveComplete: () => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    },
    onSaveError: () => setSaveStatus("error"),
  });

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
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard/pitch-decks")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-foreground">EventOS Startup Pitch</h1>
            <p className="text-sm text-muted-foreground">
              Slide {currentSlideIndex + 1} of {slides.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AutoSaveIndicator isSaving={saveStatus === "saving"} status={saveStatus} />
          <Button variant="outline" size="sm">
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
            onUpdate={(updates) => {
              const newSlides = [...slides];
              newSlides[currentSlideIndex] = { ...currentSlide, ...updates };
              setSlides(newSlides);
              debouncedSave(updates);
            }}
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
    </div>
  );
}
