import type { DashboardTab, LayoutItem, WidgetInstance } from "../types";
import { TAB_CONFIG } from "../types";

const LAYOUT_STORAGE_KEY = "dashboard-layout";
const WIDGETS_STORAGE_KEY = "dashboard-widgets";

// Old format (for migration)
interface LegacyStoredDashboard {
  layout: LayoutItem[];
  widgets: WidgetInstance[];
}

// New format with tabs
interface StoredDashboard {
  activeTabId: string;
  tabs: DashboardTab[];
}

function isLegacyFormat(data: unknown): data is LegacyStoredDashboard {
  return (
    typeof data === "object" &&
    data !== null &&
    "layout" in data &&
    "widgets" in data &&
    !("tabs" in data)
  );
}

function migrateToTabsFormat(legacy: LegacyStoredDashboard): StoredDashboard {
  const mainTabId = `tab-${Date.now()}`;
  return {
    activeTabId: mainTabId,
    tabs: [
      {
        id: mainTabId,
        title: TAB_CONFIG.defaultTabTitle,
        layout: legacy.layout,
        widgets: legacy.widgets,
      },
    ],
  };
}

export function saveDashboardLayout(
  activeTabId: string,
  tabs: DashboardTab[]
): void {
  const data: StoredDashboard = { activeTabId, tabs };
  localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(data));
}

export function loadDashboardLayout(): StoredDashboard | null {
  const stored = localStorage.getItem(LAYOUT_STORAGE_KEY);
  if (!stored) return null;

  try {
    const data = JSON.parse(stored);

    // Handle legacy format migration
    if (isLegacyFormat(data)) {
      const migrated = migrateToTabsFormat(data);
      // Save migrated data
      saveDashboardLayout(migrated.activeTabId, migrated.tabs);
      return migrated;
    }

    return data as StoredDashboard;
  } catch {
    return null;
  }
}

export function clearDashboardLayout(): void {
  localStorage.removeItem(LAYOUT_STORAGE_KEY);
  localStorage.removeItem(WIDGETS_STORAGE_KEY);
}
