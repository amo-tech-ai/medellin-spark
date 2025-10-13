import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VerificationBadgeProps {
  type: "email" | "linkedin" | "github" | "domain";
  verified?: boolean;
  className?: string;
}

const badgeLabels = {
  email: "Email",
  linkedin: "LinkedIn",
  github: "GitHub",
  domain: "Domain",
};

export const VerificationBadge = ({ 
  type, 
  verified = true,
  className 
}: VerificationBadgeProps) => {
  return (
    <Badge
      variant={verified ? "secondary" : "outline"}
      className={cn(
        "gap-1 text-xs",
        verified && "bg-success/10 text-success border-success/20",
        className
      )}
    >
      {verified && <Check className="h-3 w-3" />}
      {badgeLabels[type]}
    </Badge>
  );
};
