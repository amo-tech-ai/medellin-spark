import { Building2, MapPin, DollarSign, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company_name: string;
    description: string;
    type: string;
    location: string;
    remote_allowed: boolean;
    salary_min: number;
    salary_max: number;
    salary_currency: string;
  };
  isSaved: boolean;
  hasApplied: boolean;
  onSave: () => void;
  onApply: () => void;
}

export function JobCard({ job, isSaved, hasApplied, onSave, onApply }: JobCardProps) {
  return (
    <Card className="hover:shadow-md transition-all active:scale-[0.98] relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={onSave}
      >
        <Bookmark
          className={cn("h-5 w-5", isSaved && "fill-primary text-primary")}
        />
      </Button>

      <CardHeader>
        <CardTitle className="text-xl pr-8">{job.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          <span>{job.company_name}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{job.type}</Badge>
          {job.remote_allowed && (
            <Badge variant="default" className="bg-primary/10 text-primary">
              Remote
            </Badge>
          )}
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>
              ${job.salary_min.toLocaleString()} - $
              {job.salary_max.toLocaleString()} {job.salary_currency}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          disabled={hasApplied}
          onClick={onApply}
        >
          {hasApplied ? "Applied" : "Apply Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}
