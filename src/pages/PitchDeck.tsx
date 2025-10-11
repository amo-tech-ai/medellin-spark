import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Sparkles, FileText } from "lucide-react";

const PitchDeck = () => {
  const [formData, setFormData] = useState({
    description: "",
    slides: "5",
    language: "english",
    webSearch: false,
  });

  const examples = [
    {
      title: "The Future of Artificial Intelligence in Engineering",
      slides: "5 slides",
      language: "English",
    },
    {
      title: "Sustainable Materials for Construction Projects",
      slides: "5 slides",
      language: "English",
    },
    {
      title: "Best Practices for Project Management in Engineering",
      slides: "5 slides",
      language: "English",
    },
    {
      title: "Advancements in Robotics and Automation",
      slides: "5 slides",
      language: "English",
    },
    {
      title: "Innovations in Renewable Energy Technology",
      slides: "5 slides",
      language: "English",
    },
    {
      title: "Cybersecurity Challenges in Engineering Systems",
      slides: "5 slides",
      language: "English",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">Create stunning presentations</h1>
            <p className="text-lg text-muted-foreground">
              Transform your ideas into professional presentations instantly. Just describe your topic and let AI do the rest.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8 shadow-card">
            <div className="space-y-6">
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Describe your topic or paste your content here</Label>
                <Textarea
                  id="description"
                  placeholder="Create a pitch deck for an event management system for businesses"
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <p className="text-xs text-muted-foreground text-right">0 characters</p>
              </div>

              {/* Options Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="slides">Number of Slides</Label>
                  <Select value={formData.slides} onValueChange={(value) => setFormData({ ...formData, slides: value })}>
                    <SelectTrigger id="slides">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 slides</SelectItem>
                      <SelectItem value="10">10 slides</SelectItem>
                      <SelectItem value="15">15 slides</SelectItem>
                      <SelectItem value="20">20 slides</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">🇺🇸 English</SelectItem>
                      <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
                      <SelectItem value="french">🇫🇷 French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="web-search">Web Search</Label>
                  <div className="flex items-center gap-2 pt-2">
                    <Switch
                      id="web-search"
                      checked={formData.webSearch}
                      onCheckedChange={(checked) => setFormData({ ...formData, webSearch: checked })}
                    />
                    <span className="text-sm text-muted-foreground">
                      {formData.webSearch ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button size="lg" className="w-full group">
                <Sparkles size={20} className="mr-2" />
                Generate Presentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={20} className="text-primary" />
            <h3 className="text-xl font-semibold">Try these examples</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">Click any example to get started instantly</p>

          <div className="grid md:grid-cols-2 gap-4">
            {examples.map((example, index) => (
              <button
                key={index}
                className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary hover:shadow-glow transition-smooth"
              >
                <div className="flex items-start gap-3">
                  <FileText size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-2">{example.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {example.slides} • {example.language}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">Shuffle Examples</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PitchDeck;
