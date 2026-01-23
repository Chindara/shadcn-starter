import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { WidgetCard } from "./widget-card";
import { getAllWidgetDefinitions } from "../widget-registry";

interface WidgetSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectWidget: (type: string) => void;
}

export function WidgetSelector({
  open,
  onOpenChange,
  onSelectWidget,
}: WidgetSelectorProps) {
  const widgets = getAllWidgetDefinitions();

  const handleSelect = (type: string) => {
    onSelectWidget(type);
    onOpenChange(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto px-4"
      >
        <SheetHeader>
          <SheetTitle>Add Widget</SheetTitle>
          <SheetDescription>
            Select a widget to add to your dashboard
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {widgets.map((widget) => (
            <WidgetCard
              key={widget.type}
              widget={widget}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
