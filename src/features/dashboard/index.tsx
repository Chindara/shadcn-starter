import { useState } from "react";
import { Pencil, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardGrid, DashboardTabs, WidgetSelector } from "./components";
import { useDashboardState } from "./hooks";
import { useResizeDetector } from "react-resize-detector";

export default function Dashboard() {
  const {
    isEditMode,
    activeTabId,
    tabs,
    layout,
    widgets,
    isLoaded,
    toggleEditMode,
    setActiveTab,
    addTab,
    deleteTab,
    updateLayout,
    addWidget,
    deleteWidget,
  } = useDashboardState();

  const [selectorOpen, setSelectorOpen] = useState(false);
  //const containerRef = useRef<HTMLDivElement>(null);
  const { width, ref } = useResizeDetector();
  //const [containerWidth, setContainerWidth] = useState(1200);

  // useEffect(() => {
  //   const updateWidth = () => {
  //     if (containerRef.current) {
  //       setContainerWidth(containerRef.current.offsetWidth);
  //     }
  //   };

  //   updateWidth();
  //   window.addEventListener("resize", updateWidth);
  //   return () => window.removeEventListener("resize", updateWidth);
  // }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full -mx-8">
      <div className="px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            {isEditMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectorOpen(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Widget
              </Button>
            )}
            <Button
              variant={isEditMode ? "default" : "outline"}
              size="sm"
              onClick={toggleEditMode}
            >
              {isEditMode ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Done
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <DashboardTabs
          tabs={tabs}
          activeTabId={activeTabId}
          isEditMode={isEditMode}
          onTabChange={setActiveTab}
          onAddTab={addTab}
          onDeleteTab={deleteTab}
        />
      </div>

      {/* Grid - full width */}
      <div
        ref={ref}
        className="flex-1 min-h-0 px-6"
      >
        {widgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl mx-8">
            <p className="text-muted-foreground mb-4">No widgets added yet</p>
            {isEditMode && (
              <Button
                variant="outline"
                onClick={() => setSelectorOpen(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add your first widget
              </Button>
            )}
          </div>
        ) : (
          <DashboardGrid
            layout={layout}
            widgets={widgets}
            isEditMode={isEditMode}
            width={width || 1200}
            onLayoutChange={updateLayout}
            onDeleteWidget={deleteWidget}
          />
        )}
      </div>

      {/* Widget Selector */}
      <WidgetSelector
        open={selectorOpen}
        onOpenChange={setSelectorOpen}
        onSelectWidget={addWidget}
      />
    </div>
  );
}
