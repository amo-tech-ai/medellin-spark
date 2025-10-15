import { Loader2, Check, AlertCircle } from "lucide-react";

interface AutoSaveIndicatorProps {
  isSaving: boolean;
  status: "idle" | "saving" | "saved" | "error";
}

export const AutoSaveIndicator = ({ isSaving, status }: AutoSaveIndicatorProps) => {
  if (status === "idle") return null;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {status === "saving" && (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Saving...</span>
        </>
      )}
      {status === "saved" && (
        <>
          <Check className="h-4 w-4 text-success" />
          <span className="text-success">Saved</span>
        </>
      )}
      {status === "error" && (
        <>
          <AlertCircle className="h-4 w-4 text-destructive" />
          <span className="text-destructive">Save failed</span>
        </>
      )}
    </div>
  );
};
