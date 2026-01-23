import { useState, useEffect, useCallback, useMemo } from "react";
import type { DashboardTab, LayoutItem, WidgetInstance } from "../types";
import { TAB_CONFIG } from "../types";
import { getWidgetDefinition } from "../widget-registry";
import {
  saveDashboardLayout,
  loadDashboardLayout,
} from "../utils/layout-storage";

const DEFAULT_WIDGETS: WidgetInstance[] = [
  { id: "widget-1", type: "stats" },
  { id: "widget-2", type: "chart" },
  { id: "widget-3", type: "recent-activity" },
  { id: "widget-4", type: "quick-actions" },
];

function getDefaultLayout(): LayoutItem[] {
  return DEFAULT_WIDGETS.map((widget, index) => {
    const definition = getWidgetDefinition(widget.type);
    const constraints = definition?.constraints;

    return {
      i: widget.id,
      x: (index % 2) * 6,
      y: Math.floor(index / 2) * 3,
      w: constraints?.defaultW ?? 6,
      h: constraints?.defaultH ?? 3,
    };
  });
}

function createDefaultTabs(): { activeTabId: string; tabs: DashboardTab[] } {
  const mainTabId = `tab-${Date.now()}`;
  return {
    activeTabId: mainTabId,
    tabs: [
      {
        id: mainTabId,
        title: TAB_CONFIG.defaultTabTitle,
        layout: getDefaultLayout(),
        widgets: DEFAULT_WIDGETS,
      },
    ],
  };
}

export function useDashboardState() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTabId, setActiveTabId] = useState<string>("");
  const [tabs, setTabs] = useState<DashboardTab[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved layout on mount
  useEffect(() => {
    const saved = loadDashboardLayout();
    if (saved && saved.tabs.length > 0) {
      setTabs(saved.tabs);
      setActiveTabId(saved.activeTabId);
    } else {
      const defaults = createDefaultTabs();
      setTabs(defaults.tabs);
      setActiveTabId(defaults.activeTabId);
    }
    setIsLoaded(true);
  }, []);

  // Derived state for active tab
  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId),
    [tabs, activeTabId]
  );

  const layout = activeTab?.layout ?? [];
  const widgets = activeTab?.widgets ?? [];

  // Save layout when exiting edit mode
  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => {
      if (prev) {
        // Exiting edit mode - save layout
        saveDashboardLayout(activeTabId, tabs);
      }
      return !prev;
    });
  }, [activeTabId, tabs]);

  const setActiveTab = useCallback((tabId: string) => {
    setActiveTabId(tabId);
  }, []);

  const addTab = useCallback(
    (title: string) => {
      if (tabs.length >= TAB_CONFIG.maxTabs) return;

      const trimmedTitle = title.trim().slice(0, TAB_CONFIG.maxTitleLength);
      if (!trimmedTitle) return;

      const newTabId = `tab-${Date.now()}`;
      const newTab: DashboardTab = {
        id: newTabId,
        title: trimmedTitle,
        layout: [],
        widgets: [],
      };

      setTabs((prev) => [...prev, newTab]);
      setActiveTabId(newTabId);
    },
    [tabs.length]
  );

  const deleteTab = useCallback(
    (tabId: string) => {
      if (tabs.length <= 1) return;

      setTabs((prev) => {
        const newTabs = prev.filter((tab) => tab.id !== tabId);

        // If deleting active tab, switch to first remaining tab
        if (tabId === activeTabId && newTabs.length > 0) {
          setActiveTabId(newTabs[0].id);
        }

        return newTabs;
      });
    },
    [tabs.length, activeTabId]
  );

  const updateLayout = useCallback(
    (newLayout: LayoutItem[]) => {
      setTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeTabId ? { ...tab, layout: newLayout } : tab
        )
      );
    },
    [activeTabId]
  );

  const addWidget = useCallback(
    (type: string) => {
      const definition = getWidgetDefinition(type);
      if (!definition) return;

      const newId = `widget-${Date.now()}`;
      const newWidget: WidgetInstance = { id: newId, type };

      setTabs((prev) =>
        prev.map((tab) => {
          if (tab.id !== activeTabId) return tab;

          // Find the lowest available y position
          const maxY = tab.layout.reduce(
            (max, item) => Math.max(max, item.y + item.h),
            0
          );

          const newLayoutItem: LayoutItem = {
            i: newId,
            x: 0,
            y: maxY,
            w: definition.constraints.defaultW,
            h: definition.constraints.defaultH,
          };

          return {
            ...tab,
            widgets: [...tab.widgets, newWidget],
            layout: [...tab.layout, newLayoutItem],
          };
        })
      );
    },
    [activeTabId]
  );

  const deleteWidget = useCallback(
    (id: string) => {
      setTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeTabId
            ? {
                ...tab,
                widgets: tab.widgets.filter((w) => w.id !== id),
                layout: tab.layout.filter((l) => l.i !== id),
              }
            : tab
        )
      );
    },
    [activeTabId]
  );

  return {
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
  };
}
