import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { Event } from "@/types/events";

interface RegistrationButtonProps {
  event: Event;
  isRegistered: boolean;
  isLoading: boolean;
  onRegister: () => Promise<boolean>;
  onCancel: () => Promise<boolean>;
}

export function RegistrationButton({
  event,
  isRegistered,
  isLoading,
  onRegister,
  onCancel,
}: RegistrationButtonProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(false);

  const spotsLeft = event.capacity 
    ? event.capacity - event.registered_count 
    : null;
  
  const isFull = spotsLeft === 0;
  const isPast = new Date(event.event_date) < new Date();

  const handleRegister = async () => {
    if (!user) {
      navigate(`/auth?redirect=/events/${event.id}`);
      return;
    }

    setLocalLoading(true);
    await onRegister();
    setLocalLoading(false);
  };

  const handleCancel = async () => {
    setLocalLoading(true);
    await onCancel();
    setLocalLoading(false);
  };

  // Already registered - show badge
  if (isRegistered) {
    return (
      <div className="flex flex-col gap-3">
        <Badge 
          variant="default" 
          className="text-base px-6 py-3 w-full justify-center"
        >
          ✓ You're Registered
        </Badge>
        <Button 
          variant="outline" 
          onClick={handleCancel}
          disabled={isLoading || localLoading || isPast}
          className="w-full"
        >
          {(isLoading || localLoading) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Cancel Registration
        </Button>
      </div>
    );
  }

  // Event full
  if (isFull) {
    return (
      <Badge 
        variant="secondary" 
        className="text-base px-6 py-3 w-full justify-center"
      >
        Event Full
      </Badge>
    );
  }

  // Event past
  if (isPast) {
    return (
      <Badge 
        variant="secondary" 
        className="text-base px-6 py-3 w-full justify-center"
      >
        Event Ended
      </Badge>
    );
  }

  // Available to register
  return (
    <Button 
      size="lg"
      onClick={handleRegister}
      disabled={isLoading || localLoading}
      className="w-full"
    >
      {(isLoading || localLoading) && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {user ? 'Register for Event' : 'Log In to Register'}
    </Button>
  );
}
