import { useMemo, useState } from "react";
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

interface GridLinesProps {
  width: number;
  cols: number;
  rowHeight: number;
  margin: [number, number];
  containerPadding: [number, number];
}

function GridLines({
  width,
  cols,
  rowHeight,
  margin,
  containerPadding,
}: GridLinesProps) {
  // Logic reversed from react-grid-layout to match their rounding exactly
  // https://github.com/react-grid-layout/react-grid-layout/blob/master/src/calculateUtils.ts#L48
  // Logic reversed from react-grid-layout to match their rounding exactly
  // https://github.com/react-grid-layout/react-grid-layout/blob/master/src/calculateUtils.ts#L48
  const colWidth =
    (width - margin[0] * (cols - 1) - containerPadding[0] * 2) / cols;

  // We need enough rows to fill the screen or at least a reasonable amount
  const rowCount = 20;

  const cells = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rowCount; j++) {
      const left = Math.round((colWidth + margin[0]) * i + containerPadding[0]);
      const top = Math.round((rowHeight + margin[1]) * j + containerPadding[1]);
      const w = Math.round(colWidth); // RGL calculation for 1 unit width
      const h = rowHeight; // Fixed height in RGL usually? RGL actually uses: Math.round(rowHeight * h + Math.max(0, h - 1) * margin[1]) -> for 1 unit: Math.round(rowHeight)

      cells.push(
        <div
          key={`${i}-${j}`}
          className="absolute border border-gray-500/20"
          style={{
            left: left,
            top: top,
            width: w,
            height: h,
          }}
        />
      )
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {cells}
    </div>
  );
}

export function DashboardGrid({
  layout,
  widgets,
  isEditMode,
  width,
  onLayoutChange,
  onDeleteWidget,
}: DashboardGridProps) {
  // Track live dimensions during resize for real-time badge updates
  const [resizingItem, setResizingItem] = useState<{
    id: string;
    w: number;
    h: number;
  } | null>(null);

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

  // Get layout item dimensions for a widget (use live dimensions during resize)
  const getWidgetDimensions = (widgetId: string) => {
    if (resizingItem && resizingItem.id === widgetId) {
      return { w: resizingItem.w, h: resizingItem.h };
    }
    const layoutItem = layout.find((item) => item.i === widgetId);
    return layoutItem ? { w: layoutItem.w, h: layoutItem.h } : { w: 0, h: 0 };
  };

  // Handle resize to update live dimensions
  const handleResize = (
    _layout: LayoutItem[],
    _oldItem: LayoutItem,
    newItem: LayoutItem
  ) => {
    setResizingItem({ id: newItem.i, w: newItem.w, h: newItem.h });
  };

  const handleResizeStop = () => {
    setResizingItem(null);
  };


  // Ensure we show enough grid lines for the content plus some buffer
  // In edit mode we might want fixed height or dynamic.
  // The GridLines component helps visualize available slots.

  return (
    <div className="relative min-h-[400px]">
      {isEditMode && (
        <GridLines
          width={width}
          cols={GRID_CONFIG.cols}
          rowHeight={GRID_CONFIG.rowHeight}
          margin={GRID_CONFIG.margin}
          containerPadding={GRID_CONFIG.containerPadding}
        />
      )}
      <GridLayout
        className={cn("layout relative z-10")}
        layout={gridLayout}
        cols={GRID_CONFIG.cols}
        rowHeight={GRID_CONFIG.rowHeight}
        width={width}
        margin={GRID_CONFIG.margin}
        containerPadding={GRID_CONFIG.containerPadding}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        onLayoutChange={handleLayoutChange}
        onResize={handleResize}
        onResizeStop={handleResizeStop}
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
                dimensions={getWidgetDimensions(widget.id)}
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
