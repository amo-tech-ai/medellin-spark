import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillProgressCardProps {
  name: string;
  category: string;
  proficiency: number; // 0-100
  endorsements?: number;
  proof?: string;
  className?: string;
}

const getProficiencyLabel = (level: number) => {
  if (level >= 80) return "Expert";
  if (level >= 60) return "Proficient";
  if (level >= 40) return "Familiar";
  return "Novice";
};

export const SkillProgressCard = ({
  name,
  category,
  proficiency,
  endorsements,
  proof,
  className,
}: SkillProgressCardProps) => {
  return (
    <Card className={cn("p-4 hover:shadow-card-hover transition-smooth", className)}>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground">{name}</h4>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
          <Badge variant="outline" className="shrink-0 text-xs">
            {getProficiencyLabel(proficiency)}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Proficiency</span>
            <span className="font-medium text-foreground">{proficiency}%</span>
          </div>
          <div className="h-2 bg-divider rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-dark transition-all"
              style={{ width: `${proficiency}%` }}
            />
          </div>
        </div>

        {proof && (
          <p className="text-sm text-muted-foreground line-clamp-2">{proof}</p>
        )}

        {endorsements !== undefined && endorsements > 0 && (
          <p className="text-xs text-muted-foreground">
            {endorsements} endorsement{endorsements !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </Card>
  );
};
