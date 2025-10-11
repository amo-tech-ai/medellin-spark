import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterGroup } from "@/components/ui/filter-buttons";
import { CategoryBadge } from "@/components/ui/category-badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const Events = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  const filters = [
    { label: "All Events", value: "all" },
    { label: "Hackathons", value: "hackathons" },
    { label: "Workshops", value: "workshops" },
    { label: "Conferences", value: "conferences" },
    { label: "Networking", value: "networking" },
  ];

  const events = [
    {
      id: 1,
      category: "Workshop",
      status: "upcoming",
      title: "Developer Meetup: Building with AI APIs",
      description: "Hands-on workshop covering OpenAI, Anthropic, and Google Gemini API. Bring your laptop!",
      date: "October 25, 2025",
      time: "6:28 AM - 10:28 PM",
      location: "Ruta N, Medellín",
      attendees: 0,
    },
    {
      id: 2,
      category: "Conference",
      status: "upcoming",
      title: "AI Hackathon Medellín 2025",
      description: "# Build the Future of AI",
      date: "November 2, 2025",
      time: "11:01 AM - 11:51 AM",
      location: "Ruta N Innovation Center, Medellín",
      attendees: 0,
    },
    {
      id: 3,
      category: "Networking",
      status: "upcoming",
      title: "Startup Pitch Night - March Edition",
      description: "Monthly startup showcase where 10 early-stage startups pitch to investors and community members. $5K prize for best pitch.",
      date: "November 3, 2025",
      time: "9:28 AM - 1:28 PM",
      location: "Atom House, Medellín",
      attendees: 0,
    },
    {
      id: 4,
      category: "Workshop",
      status: "upcoming",
      title: "AI for Startups Workshop",
      description: "# Practical AI Implementation",
      date: "November 17, 2025",
      time: "11:01 AM - 11:03 AM",
      location: "Atom House, Medellín",
      attendees: 0,
    },
    {
      id: 5,
      category: "Conference",
      status: "upcoming",
      title: "AI & Machine Learning Summit 2025",
      description: "# Join Latin America's premier AI conference",
      date: "November 18, 2025",
      time: "9:28 AM - 9:28 AM",
      location: "Plaza Mayor Convention Center, Medellín",
      attendees: 0,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-primary">Events</h1>
            <p className="text-lg text-muted-foreground">
              Join our community events to learn, network, and grow in the world of artificial intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <FilterGroup filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4">
        <div className="flex gap-4 border-b border-border mb-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-3 px-1 font-medium text-sm transition-smooth border-b-2 ${
              activeTab === "upcoming"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`pb-3 px-1 font-medium text-sm transition-smooth border-b-2 ${
              activeTab === "past"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Past Events
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6 pb-16">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-glow hover:border-primary transition-smooth"
            >
              {/* Badges */}
              <div className="flex items-center justify-between mb-4">
                <CategoryBadge label={event.category} variant="default" />
                <CategoryBadge label={event.status} variant="upcoming" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3">{event.title}</h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

              {/* Event Details */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={16} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users size={16} />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>

              {/* CTA */}
              <Button className="w-full">Register Now</Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Events;
