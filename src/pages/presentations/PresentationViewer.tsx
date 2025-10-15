import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Edit, Share2 } from "lucide-react";

export default function PresentationViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  
  const slides = [
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
  ];

  const currentSlide = slides[currentSlideIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "Escape") navigate(`/dashboard/pitch-decks`);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlideIndex]);

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

        <h1 className="text-white font-semibold">EventOS Startup Pitch</h1>

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
          <h2 className="text-5xl font-bold text-foreground mb-8">
            {currentSlide.title}
          </h2>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            {currentSlide.content}
          </p>
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
