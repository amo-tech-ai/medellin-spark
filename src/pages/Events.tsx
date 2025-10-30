import { useState } from "react";
import { useEffect } from "react";
import { useEvents } from "@/hooks/useEvents";
import { analytics } from "@/lib/analytics";
import { EventCard } from "@/components/events/EventCard";
import { EventCardSkeleton } from "@/components/events/EventCardSkeleton";
import { EventsEmptyState } from "@/components/events/EventsEmptyState";
import { EventsErrorState } from "@/components/events/EventsErrorState";
import { FilterGroup } from "@/components/ui/filter-buttons";

const Events = () => {
  const { data: events, isLoading, error, refetch } = useEvents();

  // Track page view
  useEffect(() => {
    analytics.page('Events List');
  }, []);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  const filters = [
    { label: "All Events", value: "all" },
    { label: "Hackathons", value: "hackathons" },
    { label: "Workshops", value: "workshops" },
    { label: "Conferences", value: "conferences" },
    { label: "Networking", value: "networking" },
  ];

  // Filter events by tags if needed (future enhancement)
  const filteredEvents = events || [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-3 md:mb-4 text-primary text-3xl md:text-4xl lg:text-5xl">Events</h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Join our community events to learn, network, and grow in the world of artificial intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-6 md:py-8">
        <FilterGroup filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </section>

      {/* Content Area */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCardSkeleton count={6} />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <EventsErrorState onRetry={() => refetch()} />
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredEvents.length === 0 && (
          <EventsEmptyState />
        )}

        {/* Events Grid */}
        {!isLoading && !error && filteredEvents.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Events;
