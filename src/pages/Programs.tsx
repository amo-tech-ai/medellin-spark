import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterGroup } from "@/components/ui/filter-buttons";
import { CategoryBadge } from "@/components/ui/category-badge";
import { Rocket, ExternalLink } from "lucide-react";

const Programs = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { label: "All Stages", value: "all" },
    { label: "Idea", value: "idea" },
    { label: "Seed", value: "seed" },
    { label: "Series A", value: "series-a" },
    { label: "Growth", value: "growth" },
  ];

  const programs = [
    {
      id: 1,
      name: "Medellin Ventures Early Stage",
      stage: "Idea",
      timeline: "Closes in about 1 month",
      description: "Support for Idea-to-MVP Colombian startups with mentorship and small grants.",
    },
    {
      id: 2,
      name: "Ruta N AI Accelerator 2025",
      stage: "Growth",
      timeline: "Closes in about 2 months",
      description: "Intensive 3-month program for AI startups in Medellín. $50K investment + mentorship.",
    },
    {
      id: 3,
      name: "Apps.co Seed Program",
      stage: "Seed",
      timeline: "Closes in 3 months",
      description: "Government-backed program supporting early-stage Colombian tech startups. Non-dilutive funding up to $30K.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-3 md:mb-4 text-3xl md:text-4xl lg:text-5xl">Accelerator Programs</h1>
            <p className="text-base md:text-lg text-muted-foreground mb-3 md:mb-4 px-2">
              Apply to programs designed for AI startups at every stage
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Rocket size={18} className="md:w-5 md:h-5" />
              <span className="text-sm font-medium">3 active programs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-6 md:py-8">
        <FilterGroup filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </section>

      {/* Programs List */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-card border border-border rounded-xl p-5 md:p-8 shadow-card hover:shadow-glow hover:border-primary transition-smooth"
            >
              {/* Header */}
              <div className="flex flex-col gap-3 md:gap-4 mb-3 md:mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">{program.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <CategoryBadge label={program.stage} variant="default" />
                    <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {program.timeline}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-muted-foreground mb-5 md:mb-6">{program.description}</p>

              {/* CTA */}
              <Button className="group w-full sm:w-auto">
                Apply Now
                <ExternalLink size={16} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Programs;
