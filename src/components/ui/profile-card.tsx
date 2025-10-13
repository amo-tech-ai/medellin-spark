import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { MapPin, Briefcase, Rocket } from "lucide-react";

interface ProfileCardProps {
  name: string;
  title: string;
  company?: string;
  location?: string;
  category?: string;
  tags?: string[];
  image?: string;
  onClick?: () => void;
  className?: string;
}

export const ProfileCard = ({
  name,
  title,
  company,
  location,
  category,
  tags = [],
  image,
  onClick,
  className,
}: ProfileCardProps) => {
  return (
    <Card
      className={cn("card-interactive overflow-hidden", className)}
      onClick={onClick}
    >
      {image && (
        <div className="w-full h-48 bg-secondary overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{title}</p>
          </div>
          {category && (
            <Badge variant="secondary" className="shrink-0">
              {category}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-4">
        {company && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="w-4 h-4 shrink-0" />
            <span className="truncate">{company}</span>
          </div>
        )}
        
        {location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="w-full">
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};
