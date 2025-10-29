import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, Users, ChevronRight } from "lucide-react";
import { useEventDetail } from "@/hooks/useEventDetail";
import { useEventRegistration } from "@/hooks/useEventRegistration";
import { RegistrationButton } from "@/components/events/RegistrationButton";
import { EventsErrorState } from "@/components/events/EventsErrorState";
import { analytics } from "@/lib/analytics";
import { format } from "date-fns";

const EventDetail = () => {
  const { id: eventId } = useParams();
  const { data: event, isLoading, error, refetch } = useEventDetail(eventId);
  const {
    isRegistered,
    isLoading: regLoading,
    register,
    cancel,
  } = useEventRegistration(eventId);

  // Track page view when event loads
  useEffect(() => {
    if (event) {
      analytics.page('Event Detail', {
        eventId: event.id,
        eventTitle: event.title,
      });
    }
  }, [event]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="h-[400px] w-full rounded-xl mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <EventsErrorState onRetry={refetch} />
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.event_date);
  const formattedDate = format(eventDate, "EEEE, MMMM d, yyyy");
  const formattedTime = format(eventDate, "h:mm a");
  const progressPercent = event.capacity ? (event.registered_count / event.capacity) * 100 : 0;

  // Use real data instead of mock
  const eventData = {
    title: event.title,
    date: formattedDate,
    time: formattedTime,
    description: event.description,
    capacity: event.capacity || 0,
    registered: event.registered_count,
    isVirtual: event.is_virtual,
    virtualUrl: event.virtual_url,
  };


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-smooth">
            Home
          </Link>
          <ChevronRight size={16} />
          <Link to="/events" className="hover:text-primary transition-smooth">
            Events
          </Link>
          <ChevronRight size={16} />
          <span className="text-foreground">{eventData.title}</span>
        </div>

        {/* Hero Banner */}
        <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
          {event.image_url ? (
            <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {event.is_virtual && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-white/20 text-white border-white/30">Virtual Event</Badge>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-2">{eventData.title}</h1>
          </div>
        </div>

        {/* Event Details Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Date & Time */}
              <div className="flex gap-4">
                <Calendar className="text-primary flex-shrink-0" size={32} />
                <div>
                  <p className="font-semibold">{eventData.date}</p>
                  <p className="text-sm text-muted-foreground">{eventData.time}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <MapPin className="text-primary flex-shrink-0" size={32} />
                <div>
                  <p className="font-semibold">{eventData.isVirtual ? 'Virtual Event' : 'Location TBD'}</p>
                  {eventData.virtualUrl && (
                    <a href={eventData.virtualUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                      Join Link
                    </a>
                  )}
                </div>
              </div>

              {/* Capacity */}
              <div className="flex gap-4">
                <Users className="text-primary flex-shrink-0" size={32} />
                <div className="w-full">
                  <p className="font-semibold mb-2">
                    {eventData.registered} {eventData.capacity > 0 ? `of ${eventData.capacity}` : ''} registered
                  </p>
                  {eventData.capacity > 0 && (
                    <>
                      <Progress value={progressPercent} className="mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {eventData.capacity - eventData.registered} spots left
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About This Event */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {eventData.description}
              </p>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Registration */}
            <Card>
              <CardContent className="pt-6">
                <RegistrationButton
                  event={event}
                  isRegistered={isRegistered}
                  isLoading={regLoading}
                  onRegister={register}
                  onCancel={cancel}
                />
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetail;
