import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FilterGroup } from "@/components/ui/filter-buttons";
import { Search, Rocket } from "lucide-react";

const Startups = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { label: "All Stages", value: "all" },
    { label: "Idea", value: "idea" },
    { label: "Seed", value: "seed" },
    { label: "Series A", value: "series-a" },
    { label: "Growth", value: "growth" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-3 md:mb-4 text-3xl md:text-4xl lg:text-5xl">Startups Directory</h1>
            <p className="text-base md:text-lg text-muted-foreground mb-3 md:mb-4 px-2">
              Discover AI startups building the future in Medellín
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Rocket size={18} className="md:w-5 md:h-5" />
              <span className="text-sm font-medium">0 startups</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search startups by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <FilterGroup filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>
      </section>

      {/* Empty State */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-12 md:p-16 text-center">
            <Rocket size={40} className="mx-auto mb-4 md:mb-6 text-muted-foreground md:w-12 md:h-12" />
            <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">No startups found</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Startups;
