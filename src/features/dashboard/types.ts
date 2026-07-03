import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export interface WidgetSizeConstraints {
  minW: number;
  maxW: number;
  minH: number;
  maxH: number;
  defaultW: number;
  defaultH: number;
}

export interface WidgetProps {
  id: string;
  isEditMode: boolean;
}

export interface WidgetDefinition {
  type: string;
  title: string;
  description: string;
  previewImage: string;
  icon: LucideIcon;
  component: ComponentType<WidgetProps>;
  constraints: WidgetSizeConstraints;
}

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
}

export interface WidgetInstance {
  id: string;
  type: string;
  config?: Record<string, unknown>;
}

export interface DashboardTab {
  id: string;
  title: string;
  layout: LayoutItem[];
  widgets: WidgetInstance[];
}

export interface DashboardState {
  isEditMode: boolean;
  activeTabId: string;
  tabs: DashboardTab[];
}

export const TAB_CONFIG = {
  maxTabs: 10,
  maxTitleLength: 30,
  defaultTabTitle: "Main",
} as const;

export const GRID_CONFIG = {
  cols: 12,
  rowHeight: 75,
  margin: [8, 8] as [number, number],
  containerPadding: [0, 0] as [number, number],
};
