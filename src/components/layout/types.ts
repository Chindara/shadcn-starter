import { type LinkProps } from "@tanstack/react-router";

type User = {
  name: string;
  email: string;
  avatar: string;
};

type NavLink = {
  title: string;
  url: LinkProps["to"] | (string & {});
  icon?: React.ElementType;
  badge?: string;
};

type NavSectionBase = {
  title: string;
  icon: React.ElementType;
};

// A rail section either opens the panel with its items or links directly.
type NavSectionGroup = NavSectionBase & {
  items: NavLink[];
  url?: never;
};

type NavSectionLink = NavSectionBase & {
  url: LinkProps["to"] | (string & {});
  items?: never;
};

type NavSection = NavSectionGroup | NavSectionLink;

type SidebarData = {
  user: User;
  sections: NavSection[];
};

export type { SidebarData, NavSection, NavLink };
