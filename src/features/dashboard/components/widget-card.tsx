import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { WidgetDefinition } from "../types";

interface WidgetCardProps {
  widget: WidgetDefinition;
  onSelect: (type: string) => void;
}

export function WidgetCard({ widget, onSelect }: WidgetCardProps) {
  return (
    <Card
      className="cursor-pointer transition-all hover:border-primary hover:shadow-md py-0 gap-0 overflow-hidden"
      onClick={() => onSelect(widget.type)}
    >
      <CardContent className="p-0">
        <img
          src={widget.previewImage}
          alt={widget.title}
          className="w-full h-32 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      </CardContent>
      <CardHeader className="p-4">
        <CardTitle className="text-base flex items-center gap-2">
          <widget.icon className="h-4 w-4 text-muted-foreground" />
          {widget.title}
        </CardTitle>
        <CardDescription className="text-xs line-clamp-2">
          {widget.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
