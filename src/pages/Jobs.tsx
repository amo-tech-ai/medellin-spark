import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterGroup } from "@/components/ui/filter-buttons";
import { CategoryBadge } from "@/components/ui/category-badge";
import { Search, MapPin, Briefcase, DollarSign } from "lucide-react";

const Jobs = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { label: "All Jobs", value: "all" },
    { label: "Engineering", value: "engineering" },
    { label: "Product", value: "product" },
    { label: "Design", value: "design" },
    { label: "Marketing", value: "marketing" },
    { label: "Sales", value: "sales" },
  ];

  const jobs = [
    {
      id: 1,
      title: "Senior AI Engineer",
      company: "TechCorp AI",
      location: "Medellín, Colombia",
      type: "Full-time",
      salary: "$80K - $120K",
      remote: true,
      skills: ["Python", "TensorFlow", "AWS"],
    },
    {
      id: 2,
      title: "Machine Learning Engineer",
      company: "DataStart",
      location: "Remote",
      type: "Full-time",
      salary: "$70K - $100K",
      remote: true,
      skills: ["Python", "PyTorch", "Docker"],
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "UILabs",
      location: "Medellín, Colombia",
      type: "Contract",
      salary: "$50K - $80K",
      remote: false,
      skills: ["React", "TypeScript", "Tailwind"],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-3 md:mb-4 text-3xl md:text-4xl lg:text-5xl">Job Board</h1>
            <p className="text-base md:text-lg text-muted-foreground px-2">
              Find opportunities at AI startups and tech companies in Medellín
            </p>
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
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <FilterGroup filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>
      </section>

      {/* Jobs List */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-card hover:shadow-glow hover:border-primary transition-smooth"
            >
              <div className="flex flex-col gap-4">
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{job.title}</h3>
                  <p className="text-muted-foreground mb-3 text-sm md:text-base">{job.company}</p>

                  {/* Details */}
                  <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="md:w-4 md:h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase size={14} className="md:w-4 md:h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} className="md:w-4 md:h-4" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <CategoryBadge key={skill} label={skill} variant="default" />
                    ))}
                    {job.remote && <CategoryBadge label="Remote" variant="success" />}
                  </div>
                </div>

                {/* CTA */}
                <Button className="w-full sm:w-auto">Apply Now</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Jobs;
