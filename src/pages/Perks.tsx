import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Sparkles } from "lucide-react";

const Perks = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { label: "All", value: "all" },
    { label: "Cloud", value: "cloud" },
    { label: "Marketing", value: "marketing" },
    { label: "Development", value: "development" },
    { label: "Design", value: "design" },
    { label: "Analytics", value: "analytics" },
    { label: "AI", value: "ai" },
    { label: "Productivity", value: "productivity" },
  ];

  const perks = [
    {
      id: 1,
      partner: "Google Cloud",
      description: "A full suite of cloud computing services designed to help businesses build, innovate, and scale.",
      benefit: "Up to $200,000 in Credits",
      category: "cloud",
      badge: "FEATURED",
      featured: true,
    },
    {
      id: 2,
      partner: "HubSpot",
      description: "The ultimate platform for inbound marketing, sales, and customer service under one roof.",
      benefit: "30-75% Off over 1-3 Years",
      category: "marketing",
      badge: "POPULAR",
      featured: true,
    },
    {
      id: 3,
      partner: "AWS",
      description: "Cloud services for compute power, database storage, and content delivery.",
      benefit: "Up to $100,000 in Credits",
      category: "cloud",
      featured: true,
    },
    {
      id: 4,
      partner: "Stripe",
      description: "Stripe makes it easy for businesses of all sizes to accept payments and manage their businesses online.",
      benefit: "Waived fees on first $1M",
      category: "development",
      featured: false,
    },
    {
      id: 5,
      partner: "Notion",
      description: "Your all-in-one workspace for notes, tasks, wikis, and databases.",
      benefit: "6 Months Free + Unlimited AI",
      category: "productivity",
      featured: false,
    },
    {
      id: 6,
      partner: "Zendesk",
      description: "Customer engagement software for customer interactions in one dynamic interface.",
      benefit: "6 months free",
      category: "marketing",
      featured: false,
    },
    {
      id: 7,
      partner: "OpenAI",
      description: "Advanced AI models and APIs for building intelligent applications.",
      benefit: "$500 in API Credits",
      category: "ai",
      featured: false,
    },
    {
      id: 8,
      partner: "Figma",
      description: "Collaborative interface design tool for teams.",
      benefit: "Professional Plan Free for 1 Year",
      category: "design",
      featured: false,
    },
    {
      id: 9,
      partner: "SendGrid",
      description: "Email delivery service for transactional and marketing emails at scale.",
      benefit: "100,000 emails/month for 1 year",
      category: "marketing",
      featured: false,
    },
    {
      id: 10,
      partner: "Twilio",
      description: "Communication platform for SMS, voice, and video APIs.",
      benefit: "$500 in Credits",
      category: "development",
      featured: false,
    },
    {
      id: 11,
      partner: "GitHub",
      description: "Version control and collaboration platform for developers.",
      benefit: "GitHub Enterprise Free for 1 Year",
      category: "development",
      featured: false,
    },
    {
      id: 12,
      partner: "Mixpanel",
      description: "Advanced product analytics to understand user behavior and drive growth.",
      benefit: "$50,000 in Credits",
      category: "analytics",
      featured: false,
    },
    {
      id: 13,
      partner: "Segment",
      description: "Customer data platform that collects, cleans, and controls customer data.",
      benefit: "$50,000 in Credits",
      category: "analytics",
      featured: false,
    },
    {
      id: 14,
      partner: "Mailchimp",
      description: "All-in-one marketing platform for growing businesses.",
      benefit: "6 Months Free on Premium",
      category: "marketing",
      featured: false,
    },
    {
      id: 15,
      partner: "Canva",
      description: "Design platform with templates for social media, presentations, and more.",
      benefit: "Canva Pro Free for 1 Year",
      category: "design",
      featured: false,
    },
    {
      id: 16,
      partner: "Airtable",
      description: "Spreadsheet-database hybrid for building collaborative applications.",
      benefit: "Pro Plan Free for 1 Year",
      category: "productivity",
      featured: false,
    },
  ];

  const filteredPerks = perks.filter((perk) => {
    const matchesFilter = activeFilter === "all" || perk.category === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      perk.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perk.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-dark px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles size={16} />
              FEATURED
            </div>
            <h1 className="mb-6">Exclusive Perks for AI Founders</h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Access $500k+ in credits and discounts from the best startup tools
            </p>
            <Button size="lg" className="shadow-glow">
              Browse All Perks
            </Button>
          </div>

          {/* Featured Perk Card */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-card hover:shadow-card-hover transition-smooth">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-block bg-primary/10 text-primary-dark px-3 py-1 rounded-full text-xs font-semibold mb-4">
                    PARTNER SPOTLIGHT
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Google Cloud</h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    Get up to $200,000 in cloud credits to build, deploy, and scale your AI applications.
                  </p>
                  <Button>Claim Offer</Button>
                </div>
                <div className="w-full md:w-64 h-48 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">GCP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="bg-background border-b border-border sticky top-0 z-10 backdrop-blur-sm bg-background/95">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
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
            <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth ${
                    activeFilter === filter.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border text-foreground hover:bg-accent"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Perks Grid Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 text-primary-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
            PARTNER PERKS
          </div>
          <h2 className="text-4xl font-bold mb-4">Tools to Scale Your Startup</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showing {filteredPerks.length} of {perks.length} exclusive partner perks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPerks.map((perk) => (
            <div
              key={perk.id}
              className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover hover:border-primary transition-smooth hover:-translate-y-2"
            >
              {/* Logo Container */}
              <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-primary">{perk.partner.charAt(0)}</span>
              </div>

              {/* Badge */}
              {perk.badge && (
                <div className="inline-block bg-primary/10 text-primary-dark px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  {perk.badge}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3">{perk.partner}</h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{perk.description}</p>

              {/* Benefit */}
              <div className="bg-secondary p-3 rounded-lg mb-6 flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" />
                <span className="font-semibold text-sm">{perk.benefit}</span>
              </div>

              {/* CTA Button */}
              <Button variant="outline" className="w-full group">
                View Deal
              </Button>
            </div>
          ))}
        </div>

        {filteredPerks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No perks found matching your criteria.</p>
            <Button variant="outline" onClick={() => { setActiveFilter("all"); setSearchQuery(""); }} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <h3 className="text-5xl font-bold text-primary mb-2">$500k+</h3>
              <p className="text-muted-foreground font-medium">in Credits</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-primary mb-2">50+</h3>
              <p className="text-muted-foreground font-medium">Partners</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-primary mb-2">1,000+</h3>
              <p className="text-muted-foreground font-medium">Startups Helped</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-primary mb-2">100+</h3>
              <p className="text-muted-foreground font-medium">Tools</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background border-t border-border py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to unlock exclusive perks?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join the community to access all deals and start saving on the tools you need to grow
          </p>
          <Button size="lg" className="shadow-glow">
            Join Medellin AI Community
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Perks;
