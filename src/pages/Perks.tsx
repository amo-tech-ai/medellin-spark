import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterGroup } from "@/components/ui/filter-buttons";
import { CategoryBadge } from "@/components/ui/category-badge";
import { Search, ArrowRight } from "lucide-react";

const Perks = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { label: "All Perks", value: "all" },
    { label: "Marketing Tools", value: "marketing" },
    { label: "Saas & CRM", value: "saas" },
    { label: "Productivity", value: "productivity" },
    { label: "AI & Automation", value: "ai" },
    { label: "Finance", value: "finance" },
  ];

  const perks = [
    {
      id: 1,
      partner: "Amazon Web Services",
      description: "$5,000 in AWS credits for startups. Valid for 2 years.",
      value: "$5,000",
      category: "Cloud",
      featured: true,
    },
    {
      id: 2,
      partner: "HubSpot",
      description: "90% off HubSpot CRM + Marketing for 1 year.",
      value: "$4,500",
      category: "Analytics",
      featured: true,
    },
    {
      id: 3,
      partner: "Google Cloud",
      description: "$3,000 in Google Cloud credits for AI/ML workloads.",
      value: "$3,000",
      category: "Cloud",
      featured: true,
    },
    {
      id: 4,
      partner: "GitHub",
      description: "Free GitHub Enterprise for 1 year (unlimited private repos).",
      value: "$2,500",
      category: "Devtools",
      featured: false,
    },
    {
      id: 5,
      partner: "SendGrid",
      description: "Free email service for first 100,000 emails/month for 1 year.",
      value: "$1,200",
      category: "Comms",
      featured: false,
    },
    {
      id: 6,
      partner: "Twilio",
      description: "$500 in credits for SMS, voice, and video.",
      value: "$500",
      category: "Comms",
      featured: false,
    },
    {
      id: 7,
      partner: "OpenAI",
      description: "$500 in API credits for GPT models and embeddings.",
      value: "$500",
      category: "AI",
      featured: false,
    },
    {
      id: 8,
      partner: "Notion",
      description: "Free Notion Plus Plan for 1 year. Unlimited pages and blocks.",
      value: "$150",
      category: "Productivity",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <CategoryBadge label="# $1 Exclusive Offers" variant="featured" className="mb-4" />
            <h1 className="mb-4">All Startup Perks & Exclusive Offers</h1>
            <p className="text-lg text-muted-foreground">
              Explore tools and benefits from our global network of startup partners. Save over $25,000 in credits and
              services.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search tools or partners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <FilterGroup filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>
      </section>

      {/* Perks Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">All Partner Offers</h2>
          <p className="text-muted-foreground">Showing 8 of 8 exclusive partner perks</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk) => (
            <div
              key={perk.id}
              className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-glow hover:border-primary transition-smooth"
            >
              {/* Badges */}
              <div className="flex items-center justify-between mb-4">
                {perk.featured && <CategoryBadge label="Featured" variant="featured" />}
                <CategoryBadge label={`$ ${perk.value}`} variant="default" className="ml-auto" />
              </div>

              {/* Partner */}
              <h3 className="text-lg font-semibold mb-2">{perk.partner}</h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4">{perk.description}</p>

              {/* Category */}
              <CategoryBadge label={perk.category} variant="default" className="mb-4" />

              {/* CTA */}
              <Button variant="outline" className="w-full group">
                View Details
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">Trusted by 25,000+ founders worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <span className="text-xl font-semibold">Stripe</span>
            <span className="text-xl font-semibold">HubSpot</span>
            <span className="text-xl font-semibold">Zendesk</span>
            <span className="text-xl font-semibold">AWS</span>
            <span className="text-xl font-semibold">Google</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Perks;
