import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterGroup } from "@/components/ui/filter-buttons";
import { CategoryBadge } from "@/components/ui/category-badge";
import { Calendar, ArrowRight } from "lucide-react";

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { label: "All", value: "all" },
    { label: "AI News", value: "news" },
    { label: "Local Spotlights", value: "spotlights" },
    { label: "Industry Use Cases", value: "cases" },
    { label: "Event Recaps", value: "recaps" },
    { label: "Learning Guides", value: "guides" },
  ];

  const featuredPost = {
    id: 1,
    title: "The AI Revolution Comes to Medellín",
    excerpt: "Discover how artificial intelligence is transforming Colombia's tech scene with Medellín at the forefront of innovation.",
    date: "Sep 28, 2025",
    category: "Medellín new articles",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop",
  };

  const posts = [
    {
      id: 2,
      title: "10 Tips for Building AI Products",
      excerpt: "Essential advice for founders and developers looking to create AI-powered applications that users love.",
      date: "Sep 21, 2025",
      category: "Essential advice for...",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Medellín's Tech Ecosystem in 2025",
      excerpt: "An inside look at the vibrant community of developers, entrepreneurs, and innovators shaping Colombia's future.",
      date: "Sep 13, 2025",
      category: "An inside look...",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4 text-primary">Blog</h1>
            <p className="text-lg text-muted-foreground">
              Insights, tutorials, and stories from the Medellín AI community
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <FilterGroup filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </section>

      {/* Featured Post */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid md:grid-cols-2 gap-8 bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-smooth">
          {/* Image */}
          <div className="relative aspect-video md:aspect-auto">
            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
            <CategoryBadge
              label={featuredPost.category}
              variant="featured"
              className="absolute top-4 left-4"
            />
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
            <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Calendar size={16} />
              <span>{featuredPost.date}</span>
            </div>
            <Button className="w-fit group">
              Read More
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-glow hover:border-primary transition-smooth"
            >
              {/* Image */}
              <div className="relative aspect-video">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <CategoryBadge
                  label={post.category}
                  variant="featured"
                  className="absolute top-4 left-4"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
                <Button variant="outline" className="group">
                  Read More
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
