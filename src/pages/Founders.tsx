import { useState } from "react";
import { Search, MapPin, Briefcase, TrendingUp, Users, Building2, Sparkles } from "lucide-react";
import { ProfileCard } from "@/components/ui/profile-card";
import { SearchBar } from "@/components/ui/search-bar";
import { FilterGroup } from "@/components/ui/filter-buttons";
import { StatsCard } from "@/components/ui/stats-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { label: "All", value: "all" },
  { label: "AI/ML", value: "ai-ml" },
  { label: "FinTech", value: "fintech" },
  { label: "HealthTech", value: "healthtech" },
  { label: "EdTech", value: "edtech" },
  { label: "E-commerce", value: "ecommerce" },
  { label: "SaaS", value: "saas" },
];

const stages = [
  { label: "All Stages", value: "all" },
  { label: "Idea", value: "idea" },
  { label: "MVP", value: "mvp" },
  { label: "Launch", value: "launch" },
  { label: "Growth", value: "growth" },
  { label: "Scale", value: "scale" },
];

const founders = [
  {
    id: 1,
    name: "Justin McAfee",
    title: "Founder & CEO",
    company: "AI/ML Innovate",
    location: "Medellín, Colombia",
    category: "AI/ML",
    tags: ["Machine Learning", "Computer Vision", "Series A"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Sofia Martinez",
    title: "Co-Founder & CTO",
    company: "HealthTech Solutions",
    location: "Bogotá, Colombia",
    category: "HealthTech",
    tags: ["Healthcare", "AI Diagnostics", "Seed"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Carlos Rodriguez",
    title: "Founder",
    company: "FinTech Colombia",
    location: "Medellín, Colombia",
    category: "FinTech",
    tags: ["Payments", "Blockchain", "Series B"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Ana Garcia",
    title: "CEO & Founder",
    company: "EdLearn AI",
    location: "Cali, Colombia",
    category: "EdTech",
    tags: ["Education", "Personalized Learning", "Pre-Seed"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Diego Hernandez",
    title: "Co-Founder",
    company: "Commerce Plus",
    location: "Medellín, Colombia",
    category: "E-commerce",
    tags: ["Retail", "Logistics", "Growth"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Laura Ramirez",
    title: "Founder & CEO",
    company: "SaaS Analytics",
    location: "Bogotá, Colombia",
    category: "SaaS",
    tags: ["Analytics", "B2B", "Series A"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  },
];

export default function Founders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeStage, setActiveStage] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filteredFounders = founders.filter((founder) => {
    const matchesSearch =
      searchQuery === "" ||
      founder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      founder.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      founder.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || founder.category.toLowerCase() === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              FOUNDER DIRECTORY
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Connect with AI Founders in Colombia
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover, connect, and collaborate with innovative founders building the future of AI
              in Latin America.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="cta" size="lg">
                Join the Community
              </Button>
              <Button variant="outline" size="lg">
                Browse All Founders
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatsCard
              value="500+"
              label="Active Founders"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              value="80+"
              label="AI Startups"
              icon={Building2}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              value="$50M+"
              label="Funding Raised"
              icon={TrendingUp}
              trend={{ value: 25, isPositive: true }}
            />
            <StatsCard
              value="15+"
              label="Countries"
              icon={MapPin}
              trend={{ value: 3, isPositive: true }}
            />
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search Bar */}
            <div className="w-full lg:w-96">
              <SearchBar
                placeholder="Search founders, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery("")}
              />
            </div>

            {/* Filters */}
            <div className="flex-1 flex flex-wrap items-center gap-3">
              <FilterGroup
                filters={categories}
                activeFilter={activeCategory}
                onFilterChange={setActiveCategory}
              />
            </div>

            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 h-12">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="recent">Recently Joined</SelectItem>
                <SelectItem value="az">A-Z</SelectItem>
                <SelectItem value="location">Location</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Founders Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {filteredFounders.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredFounders.length} of {founders.length} founders
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFounders.map((founder) => (
                  <ProfileCard
                    key={founder.id}
                    name={founder.name}
                    title={founder.title}
                    company={founder.company}
                    location={founder.location}
                    category={founder.category}
                    tags={founder.tags}
                    image={founder.image}
                    onClick={() => console.log("View profile:", founder.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              icon={Search}
              title="No founders found"
              description="Try adjusting your search or filters to find what you're looking for."
              action={{
                label: "Clear Filters",
                onClick: () => {
                  setSearchQuery("");
                  setActiveCategory("all");
                },
              }}
            />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-secondary/50 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to join Colombia's AI community?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with fellow founders, access resources, and grow your startup with Medellin AI.
          </p>
          <Button variant="cta" size="lg">
            Create Your Profile
          </Button>
        </div>
      </section>
    </div>
  );
}
