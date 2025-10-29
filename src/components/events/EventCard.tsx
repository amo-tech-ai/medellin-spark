import { Link } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/events";
import { format } from "date-fns";

interface EventCardProps {
  event: Event & { is_registered?: boolean };
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.event_date);
  const formattedDate = format(eventDate, "MMM d, yyyy");
  const formattedTime = format(eventDate, "h:mm a");
  
  const spotsLeft = event.capacity 
    ? event.capacity - event.registered_count 
    : null;

  return (
    <Card className="hover:shadow-glow hover:border-primary transition-smooth overflow-hidden">
      {/* Event Image */}
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
        {event.image_url ? (
          <img 
            src={event.image_url} 
            alt={event.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="w-16 h-16 text-primary/30" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {event.is_virtual && (
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              Virtual
            </Badge>
          )}
          {event.is_registered && (
            <Badge variant="default" className="bg-primary/80 backdrop-blur-sm">
              ✓ Registered
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-semibold line-clamp-2 min-h-[3.5rem]">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={16} className="flex-shrink-0" />
            <span>{formattedDate} at {formattedTime}</span>
          </div>
          
          {!event.is_virtual && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} className="flex-shrink-0" />
              <span className="line-clamp-1">Location TBD</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users size={16} className="flex-shrink-0" />
            <span>
              {event.registered_count} registered
              {spotsLeft !== null && spotsLeft > 0 && (
                <span className="text-primary"> • {spotsLeft} spots left</span>
              )}
              {spotsLeft === 0 && (
                <span className="text-destructive"> • Event Full</span>
              )}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          asChild 
          className="w-full"
          disabled={spotsLeft === 0}
        >
          <Link to={`/events/${event.id}`}>
            {spotsLeft === 0 ? 'Event Full' : 'View Details'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
