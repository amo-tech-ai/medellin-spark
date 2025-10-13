import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  logo?: string;
  company: string;
  title: string;
  period: string;
  achievements: string[];
  className?: string;
}

export const ExperienceCard = ({
  logo,
  company,
  title,
  period,
  achievements,
  className,
}: ExperienceCardProps) => {
  return (
    <Card className={cn("p-6 hover:shadow-card-hover transition-smooth", className)}>
      <div className="flex gap-4">
        {logo && (
          <div className="shrink-0">
            <img
              src={logo}
              alt={`${company} logo`}
              className="w-12 h-12 rounded-lg object-cover"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <h4 className="font-semibold text-foreground">{title}</h4>
            <p className="text-sm text-muted-foreground">{company}</p>
            <p className="text-xs text-muted-foreground mt-1">{period}</p>
          </div>

          {achievements.length > 0 && (
            <ul className="space-y-1 mt-3">
              {achievements.map((achievement, index) => (
                <li key={index} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
};
