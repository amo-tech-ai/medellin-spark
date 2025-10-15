import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Wand2, Palette } from "lucide-react";
import { OutlineSlideRow } from "@/components/presentation/outline/OutlineSlideRow";
import { ThemeSelector } from "@/components/presentation/outline/ThemeSelector";
import { useToast } from "@/hooks/use-toast";

export default function OutlineEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [slides, setSlides] = useState([
    { id: "1", title: "Title Slide", order: 0 },
    { id: "2", title: "The Problem", order: 1 },
    { id: "3", title: "Our Solution", order: 2 },
    { id: "4", title: "Market Opportunity", order: 3 },
    { id: "5", title: "Business Model", order: 4 },
    { id: "6", title: "Traction", order: 5 },
    { id: "7", title: "Team", order: 6 },
    { id: "8", title: "Ask & Use of Funds", order: 7 },
    { id: "9", title: "Competition", order: 8 },
    { id: "10", title: "Thank You", order: 9 },
  ]);
  
  const [selectedTheme, setSelectedTheme] = useState("waterfall");
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const handleReorder = (dragIndex: number, hoverIndex: number) => {
    const dragSlide = slides[dragIndex];
    const newSlides = [...slides];
    newSlides.splice(dragIndex, 1);
    newSlides.splice(hoverIndex, 0, dragSlide);
    setSlides(newSlides.map((slide, idx) => ({ ...slide, order: idx })));
  };

  const handleDeleteSlide = (slideId: string) => {
    setSlides(slides.filter(s => s.id !== slideId));
    toast({ description: "Slide deleted" });
  };

  const handleGenerateContent = () => {
    toast({ 
      title: "Generating content...", 
      description: "This will take 30-60 seconds" 
    });
    // Navigate to editor after generation
    setTimeout(() => {
      navigate(`/presentations/${id}/edit`);
    }, 2000);
  };

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
              <h1 className="text-3xl font-bold text-foreground">Presentation Outline</h1>
              <p className="text-muted-foreground">{slides.length} slides</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowThemeSelector(true)}
            >
              <Palette className="h-4 w-4 mr-2" />
              Change Theme
            </Button>
            <Button onClick={handleGenerateContent}>
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

        {/* Refine Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Refine your presentation</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Review the outline, reorder slides by dragging, or add/remove slides before generating content.
          </p>
          
          <div className="bg-muted/30 rounded-lg p-4 mb-4">
            <p className="text-sm text-foreground">
              <strong>Startup Pitch: EventOS</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Event planning is broken — it takes days, too many tools, and endless manual work.
              EventOS fixes this with an AI-powered event management system.
            </p>
          </div>
        </div>

        {/* Slides List */}
        <div className="space-y-2">
          {slides.map((slide, index) => (
            <OutlineSlideRow
              key={slide.id}
              slide={slide}
              index={index}
              onReorder={handleReorder}
              onDelete={handleDeleteSlide}
            />
          ))}
          
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => {
              const newSlide = {
                id: String(slides.length + 1),
                title: "New Slide",
                order: slides.length
              };
              setSlides([...slides, newSlide]);
            }}
          >
            + Add Slide
          </Button>
        </div>
      </div>

      <ThemeSelector
        open={showThemeSelector}
        onClose={() => setShowThemeSelector(false)}
        selectedTheme={selectedTheme}
        onSelectTheme={setSelectedTheme}
      />
    </DashboardLayout>
  );
}
