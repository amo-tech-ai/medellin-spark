import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, TrendingUp, ExternalLink } from "lucide-react";

interface ProfileSidebarProps {
  profileStrength: number;
  aiRecommendations?: string[];
  skillMatches?: {
    investors: number;
    jobs: number;
    coFounders: number;
  };
}

export const ProfileSidebar = ({
  profileStrength,
  aiRecommendations = [],
  skillMatches,
}: ProfileSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Profile Strength */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profile Strength</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-divider"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - profileStrength / 100)}`}
                  className="text-primary transition-all"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{profileStrength}%</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-center text-muted-foreground">
            {profileStrength >= 80 ? "Strong" : profileStrength >= 50 ? "Moderate" : "Weak"}
          </p>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      {aiRecommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {aiRecommendations.slice(0, 4).map((rec, index) => (
                <li key={index} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
            <Button variant="link" className="mt-4 p-0 h-auto text-sm" asChild>
              <a href="/dashboard">
                Manage in Dashboard <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Skill Match Scores */}
      {skillMatches && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Skill Match Scores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Investors</span>
                <span className="font-medium">{skillMatches.investors}%</span>
              </div>
              <Progress value={skillMatches.investors} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Jobs</span>
                <span className="font-medium">{skillMatches.jobs}%</span>
              </div>
              <Progress value={skillMatches.jobs} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Co-founders</span>
                <span className="font-medium">{skillMatches.coFounders}%</span>
              </div>
              <Progress value={skillMatches.coFounders} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
