import { useMemo } from "react";
import RGL from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GridLayout = RGL as any;
import { WidgetContainer } from "./widget-container";
import { getWidgetDefinition } from "../widget-registry";
import type { LayoutItem, WidgetInstance } from "../types";
import { GRID_CONFIG } from "../types";
import { cn } from "@/lib/utils";

interface DashboardGridProps {
  layout: LayoutItem[];
  widgets: WidgetInstance[];
  isEditMode: boolean;
  width: number;
  onLayoutChange: (layout: LayoutItem[]) => void;
  onDeleteWidget: (id: string) => void;
}

export function DashboardGrid({
  layout,
  widgets,
  isEditMode,
  width,
  onLayoutChange,
  onDeleteWidget,
}: DashboardGridProps) {
  const gridLayout = useMemo(() => {
    return layout.map((item) => {
      const widget = widgets.find((w) => w.id === item.i);
      const definition = widget ? getWidgetDefinition(widget.type) : null;
      const constraints = definition?.constraints;

      return {
        ...item,
        minW: constraints?.minW ?? 2,
        maxW: constraints?.maxW ?? 12,
        minH: constraints?.minH ?? 1,
        maxH: constraints?.maxH ?? 6,
        isDraggable: isEditMode,
        isResizable: isEditMode,
      };
    });
  }, [layout, widgets, isEditMode]);

  const handleLayoutChange = (newLayout: LayoutItem[]) => {
    const updatedLayout: LayoutItem[] = newLayout.map((item) => ({
      i: item.i,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
    }));
    onLayoutChange(updatedLayout);
  };

  // Calculate grid cell dimensions for the background
  const cellWidth =
    (width -
      GRID_CONFIG.containerPadding[0] * 2 -
      GRID_CONFIG.margin[0] * (GRID_CONFIG.cols - 1)) /
    GRID_CONFIG.cols;

  //(width - GRID_CONFIG.margin[0] * (GRID_CONFIG.cols - 1)) / GRID_CONFIG.cols;
  const cellHeight = GRID_CONFIG.rowHeight;

  const gridBackgroundStyle = isEditMode
    ? {
        backgroundImage: `
          linear-gradient(to right, hsl(var(--border) / 0.5) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--border) / 0.5) 1px, transparent 1px)
        `,
        backgroundSize: `${cellWidth + GRID_CONFIG.margin[0]}px ${cellHeight + GRID_CONFIG.margin[1]}px`,
        backgroundPosition: `0px 0px`,
      }
    : undefined;

  return (
    <div
      className={cn(
        "relative rounded-lg min-h-[400px]",
        isEditMode && "bg-muted/30",
      )}
      style={gridBackgroundStyle}
    >
      <GridLayout
        className="layout"
        layout={gridLayout}
        cols={GRID_CONFIG.cols}
        rowHeight={GRID_CONFIG.rowHeight}
        width={width}
        margin={GRID_CONFIG.margin}
        containerPadding={GRID_CONFIG.containerPadding}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
        resizeHandles={isEditMode ? ["se"] : []}
      >
        {widgets.map((widget) => {
          const definition = getWidgetDefinition(widget.type);
          if (!definition) return null;

          const WidgetComponent = definition.component;

          return (
            <div
              key={widget.id}
              className={isEditMode ? "drag-handle" : ""}
            >
              <WidgetContainer
                id={widget.id}
                isEditMode={isEditMode}
                onDelete={onDeleteWidget}
              >
                <WidgetComponent
                  id={widget.id}
                  isEditMode={isEditMode}
                />
              </WidgetContainer>
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
}
