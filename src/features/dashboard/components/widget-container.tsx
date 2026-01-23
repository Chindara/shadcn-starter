import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WidgetContainerProps {
  id: string;
  isEditMode: boolean;
  onDelete: (id: string) => void;
  children: React.ReactNode;
}

export function WidgetContainer({
  id,
  isEditMode,
  onDelete,
  children,
}: WidgetContainerProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full",
        isEditMode && "ring-2 ring-primary/20 ring-offset-2 rounded-xl"
      )}
    >
      {isEditMode && (
        <Button
          variant="destructive"
          size="icon-sm"
          className="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
      {children}
    </div>
  );
}
