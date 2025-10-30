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
    description: string;
    type: string;
    location: string | null;
    remote_allowed: boolean;
    salary_min: number | null;
    salary_max: number | null;
    salary_currency: string | null;
    companies?: {
      name: string;
    };
  };
  isSaved: boolean;
  hasApplied: boolean;
  applicationStatus?: string;
  onSave: () => void;
  onApply: () => void;
}

export function JobCard({ job, isSaved, hasApplied, applicationStatus, onSave, onApply }: JobCardProps) {
  const getStatusBadge = () => {
    if (!applicationStatus) return null;
    const statusColors: Record<string, string> = {
      submitted: "bg-blue-500/10 text-blue-500",
      interviewing: "bg-purple-500/10 text-purple-500",
      rejected: "bg-red-500/10 text-red-500",
      offer: "bg-green-500/10 text-green-500",
    };
    return (
      <Badge className={statusColors[applicationStatus] || "bg-muted"}>
        {applicationStatus}
      </Badge>
    );
  };
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
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl flex-1">{job.title}</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          <span>{job.companies?.name || "Company"}</span>
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
            <span>{job.location || "Not specified"}</span>
          </div>
          {job.salary_min && job.salary_max && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>
                ${job.salary_min.toLocaleString()} - $
                {job.salary_max.toLocaleString()} {job.salary_currency || "USD"}
              </span>
            </div>
          )}
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
