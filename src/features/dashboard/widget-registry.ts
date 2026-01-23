import { BarChart3, Activity, Zap, PieChart } from "lucide-react";
import type { WidgetDefinition } from "./types";
import {
  StatsWidget,
  ChartWidget,
  RecentActivityWidget,
  QuickActionsWidget,
  GenderWiseEmployeesWidget,
} from "./widgets";

const widgetDefinitions: WidgetDefinition[] = [
  {
    type: "stats",
    title: "Statistics",
    description: "Display key metrics and statistics with trend indicators",
    previewImage:
      "https://placehold.co/300x200/e2e8f0/64748b?text=Stats+Widget",
    icon: BarChart3,
    component: StatsWidget,
    constraints: {
      minW: 2,
      maxW: 6,
      minH: 2,
      maxH: 3,
      defaultW: 3,
      defaultH: 2,
    },
  },
  {
    type: "chart",
    title: "Analytics Chart",
    description: "Visualize data trends with an interactive area chart",
    previewImage:
      "https://placehold.co/300x200/e2e8f0/64748b?text=Chart+Widget",
    icon: PieChart,
    component: ChartWidget,
    constraints: {
      minW: 4,
      maxW: 12,
      minH: 2,
      maxH: 4,
      defaultW: 6,
      defaultH: 3,
    },
  },
  {
    type: "recent-activity",
    title: "Recent Activity",
    description: "Track recent user activities and actions",
    previewImage:
      "https://placehold.co/300x200/e2e8f0/64748b?text=Activity+Widget",
    icon: Activity,
    component: RecentActivityWidget,
    constraints: {
      minW: 3,
      maxW: 6,
      minH: 2,
      maxH: 5,
      defaultW: 4,
      defaultH: 3,
    },
  },
  {
    type: "quick-actions",
    title: "Quick Actions",
    description: "Access frequently used actions with one click",
    previewImage:
      "https://placehold.co/300x200/e2e8f0/64748b?text=Actions+Widget",
    icon: Zap,
    component: QuickActionsWidget,
    constraints: {
      minW: 2,
      maxW: 4,
      minH: 2,
      maxH: 3,
      defaultW: 3,
      defaultH: 2,
    },
  },
  {
    type: "gender-wise-employees",
    title: "Gender-wise Employees",
    description: "View employee distribution by gender",
    previewImage:
      "https://placehold.co/300x200/e2e8f0/64748b?text=Gender+Widget",
    icon: Zap,
    component: GenderWiseEmployeesWidget,
    constraints: {
      minW: 2,
      maxW: 4,
      minH: 2,
      maxH: 3,
      defaultW: 3,
      defaultH: 2,
    },
  },
];

// Build the Map from the array - no more duplicate keys
export const widgetRegistry = new Map<string, WidgetDefinition>(
  widgetDefinitions.map((w) => [w.type, w]),
);

export function getWidgetDefinition(
  type: string,
): WidgetDefinition | undefined {
  return widgetRegistry.get(type);
}

export function getAllWidgetDefinitions(): WidgetDefinition[] {
  return Array.from(widgetRegistry.values());
}
