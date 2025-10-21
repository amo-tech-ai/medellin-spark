import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Edit, Download, Share2, Presentation } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Slide {
  slide_no: number;
  title: string | null;
  content: any;
  outline: string[] | null;
  notes: string | null;
}

interface PitchDeck {
  id: string;
  title: string;
  company_name: string | null;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export function PitchDeckPreview() {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const [deck, setDeck] = useState<PitchDeck | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (deckId) {
      loadDeck();
    }
  }, [deckId]);

  const loadDeck = async () => {
    try {
      setLoading(true);

      // Fetch deck details
      const { data: deckData, error: deckError } = await supabase
        .from('pitch_decks')
        .select('*')
        .eq('id', deckId)
        .single();

      if (deckError) throw deckError;
      setDeck(deckData);

      // Fetch slides
      const { data: slidesData, error: slidesError } = await supabase
        .from('pitch_deck_slides')
        .select('*')
        .eq('deck_id', deckId)
        .order('slide_no', { ascending: true });

      if (slidesError) throw slidesError;
      setSlides(slidesData || []);

    } catch (err: any) {
      console.error('Error loading pitch deck:', err);
      setError(err.message || 'Failed to load pitch deck');
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, slides.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your pitch deck...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-destructive mb-4">❌ {error}</p>
          <Button onClick={() => navigate('/pitch-deck')}>
            ← Back to Pitch Deck
          </Button>
        </div>
      </div>
    );
  }

  if (!deck || slides.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-muted-foreground mb-4">No slides found in this deck.</p>
          <Button onClick={() => navigate('/pitch-deck')}>
            ← Back to Pitch Deck
          </Button>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/pitch-deck')}
            >
              ← Back
            </Button>
            <div>
              <h1 className="font-semibold">{deck.title}</h1>
              {deck.company_name && (
                <p className="text-xs text-muted-foreground">{deck.company_name}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate(`/pitch-deck/${deckId}/edit`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Presentation className="w-4 h-4 mr-2" />
              Present
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide Thumbnails Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-border bg-muted/30 p-4">
          <ScrollArea className="h-full">
            <div className="space-y-2">
              {slides.map((s, index) => (
                <button
                  key={s.slide_no}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentSlide === index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card hover:bg-muted'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-medium">{s.slide_no}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {s.title || s.content?.title || `Slide ${s.slide_no}`}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Slide Viewer */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center p-8">
            <Card className="w-full max-w-5xl aspect-[16/9] bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
              <div className="h-full p-12 flex flex-col">
                {/* Slide Title */}
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {slide.title || slide.content?.title || `Slide ${slide.slide_no}`}
                  </h1>
                  {deck.company_name && slide.slide_no === 1 && (
                    <p className="text-xl text-muted-foreground mt-2">
                      {deck.company_name}
                    </p>
                  )}
                </div>

                {/* Slide Content */}
                <div className="flex-1 overflow-auto">
                  {slide.content?.headline && (
                    <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                      {slide.content.headline}
                    </p>
                  )}

                  {slide.content?.bullets && Array.isArray(slide.content.bullets) && (
                    <ul className="space-y-3">
                      {slide.content.bullets.map((bullet: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-primary text-xl">•</span>
                          <span className="text-lg text-gray-700 dark:text-gray-300">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {slide.content?.content && typeof slide.content.content === 'string' && (
                    <div className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {slide.content.content}
                    </div>
                  )}
                </div>

                {/* Slide Number */}
                <div className="mt-4 text-right text-sm text-muted-foreground">
                  {slide.slide_no} / {slides.length}
                </div>
              </div>
            </Card>
          </div>

          {/* Navigation Controls */}
          <div className="border-t border-border bg-background p-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Slide {currentSlide + 1} of {slides.length}
                </span>
              </div>

              <Button
                variant="outline"
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
