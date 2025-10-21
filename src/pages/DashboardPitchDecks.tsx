import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Sparkles, Layout, FileText, BarChart3, MoreVertical, Search, Filter, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { usePresentationsQuery, type Presentation as DBPresentation } from "@/hooks/usePresentationsQuery";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  isPremium: boolean;
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Startup Pitch",
    description: "Perfect for seed-stage fundraising",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
    category: "Fundraising",
    isPremium: false,
  },
  {
    id: "2",
    name: "Product Demo",
    description: "Showcase your product features",
    thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=225&fit=crop",
    category: "Product",
    isPremium: true,
  },
  {
    id: "3",
    name: "Sales Proposal",
    description: "Win more deals with clarity",
    thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=225&fit=crop",
    category: "Sales",
    isPremium: false,
  },
  {
    id: "4",
    name: "Quarterly Review",
    description: "Share progress with stakeholders",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    category: "Internal",
    isPremium: false,
  },
];

const DashboardPitchDecks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: presentations = [], isLoading, error } = usePresentationsQuery();
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort presentations
  const filteredPresentations = useMemo(() => {
    let filtered = presentations;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "slides":
        sorted.sort((a, b) => (b.slide_count || 0) - (a.slide_count || 0));
        break;
      case "status":
        sorted.sort((a, b) => (a.status || "").localeCompare(b.status || ""));
        break;
      case "recent":
      default:
        sorted.sort((a, b) => {
          const aDate = new Date(a.updated_at || a.created_at || 0);
          const bDate = new Date(b.updated_at || b.created_at || 0);
          return bDate.getTime() - aDate.getTime();
        });
    }

    return sorted;
  }, [presentations, searchQuery, sortBy]);

  // Get user's display name from email or profile
  const userName = user?.email?.split("@")[0] || "there";
  const capitalizedUserName = userName.charAt(0).toUpperCase() + userName.slice(1);

  const handleCreateAI = () => {
    navigate("/pitch-deck-wizard");
  };

  const handleUseTemplate = (templateName: string) => {
    toast({
      title: "Template Selected",
      description: `Creating presentation from "${templateName}"`,
    });
    // Navigate to outline editor with template
    navigate("/presentations/new-template/outline");
  };

  const handleEdit = (presentationId: string) => {
    navigate(`/presentations/${presentationId}/edit`);
  };

  const handleViewPresentation = (presentationId: string) => {
    navigate(`/presentations/${presentationId}/view`);
  };

  const handleDuplicate = (title: string) => {
    toast({
      title: "Duplicated",
      description: `Created a copy of "${title}"`,
    });
  };

  const handleDelete = (title: string) => {
    toast({
      title: "Deleted",
      description: `"${title}" has been removed`,
      variant: "destructive",
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading your presentations...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-4 text-destructive" />
          <p className="text-lg font-semibold mb-2">Error loading presentations</p>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-surface">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Good morning, {capitalizedUserName}</h1>
              <p className="text-muted-foreground mt-1">
                {filteredPresentations.length} {filteredPresentations.length === 1 ? "deck" : "decks"} ready
              </p>
            </div>
            <Button className="gap-2" onClick={handleCreateAI}>
              <Plus className="h-4 w-4" />
              New Deck
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Create Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Create New Presentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* AI Generate Card */}
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-primary/20 bg-gradient-to-br from-primary/5 to-transparent cursor-pointer" onClick={handleCreateAI}>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">AI Generate</CardTitle>
                <CardDescription>Create with artificial intelligence</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full" size="sm">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Template Library Card */}
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <Layout className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Template Library</CardTitle>
                <CardDescription>Browse 50+ professional templates</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" size="sm">
                  Browse
                </Button>
              </CardContent>
            </Card>

            {/* Start Blank Card */}
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Start Blank</CardTitle>
                <CardDescription>Build from scratch with full control</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" size="sm">
                  Create
                </Button>
              </CardContent>
            </Card>

            {/* Budget Deck Card */}
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Budget Deck</CardTitle>
                <CardDescription>Quick financial presentation</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" size="sm">
                  Start
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* My Presentations Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">My Presentations</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search decks..."
                  className="pl-9 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="slides">Slide Count</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredPresentations.length === 0 ? (
            <Card className="py-16">
              <CardContent className="text-center">
                <div className="h-16 w-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {presentations.length === 0 ? "No presentations yet" : "No matching presentations"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {presentations.length === 0
                    ? "Create your first deck to get started"
                    : "Try a different search term"}
                </p>
                {presentations.length === 0 && (
                  <Button onClick={handleCreateAI}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Deck
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPresentations.map((presentation) => {
                // Format the last edited time
                const lastEdited = presentation.updated_at
                  ? formatDistanceToNow(new Date(presentation.updated_at), { addSuffix: true })
                  : "Never";

                // Get thumbnail or use default
                const thumbnail =
                  presentation.thumbnail_url ||
                  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=225&fit=crop";

                // Get status badge variant
                const statusVariant = presentation.status === "completed" ? "default" : "secondary";

                return (
                  <Card
                    key={presentation.id}
                    className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] overflow-hidden"
                  >
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img src={thumbnail} alt={presentation.title} className="w-full h-full object-cover" />
                      {presentation.status && (
                        <Badge className="absolute top-2 right-2" variant={statusVariant}>
                          {presentation.status}
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base line-clamp-1">{presentation.title}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(presentation.id)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(presentation.title)}>
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(presentation.title)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{presentation.slide_count || 0} slides</span>
                        <span>•</span>
                        <span>{lastEdited}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button
                        variant="outline"
                        className="w-full"
                        size="sm"
                        onClick={() => handleViewPresentation(presentation.id)}
                      >
                        View Deck
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* Recommended Templates Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recommended Templates</h2>
            <Button variant="ghost">Browse All →</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] overflow-hidden group cursor-pointer" onClick={() => handleUseTemplate(template.name)}>
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  {template.isPremium && (
                    <Badge className="absolute top-2 right-2 bg-warning text-warning-foreground">
                      Premium
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm">Use Template</Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription className="text-sm">{template.description}</CardDescription>
                  <Badge variant="outline" className="w-fit mt-2">
                    {template.category}
                  </Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPitchDecks;
