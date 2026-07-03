import * as React from "react";
import { Link, useLocation } from "@tanstack/react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { NavUser } from "@/components/nav-user";
import { menuItems } from "./menu";
import type { NavLink, NavSection } from "./types";

// Hides the text/chevron of the NavUser button so only the avatar shows
// inside the narrow icon rail, and centers the button within its item
// (when the panel is collapsed the button shrinks to a 32px square).
const railCompactClasses =
  "[&_li]:flex [&_li]:justify-center [&_[data-sidebar=menu-button]]:justify-center [&_[data-sidebar=menu-button]>div:not(:first-child)]:hidden [&_[data-sidebar=menu-button]>svg]:hidden";

const railItemClasses =
  "flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-md px-0 py-1 text-sidebar-foreground/70 outline-hidden ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground";

function isUrlActive(href: string, url: NavLink["url"] | undefined) {
  if (!url) return false;
  const path = href.split("?")[0];
  return (
    href === url || path === url || (url !== "/" && path.startsWith(`${url}/`))
  );
}

function findSectionForHref(sections: NavSection[], href: string) {
  return sections.find((section) =>
    section.items
      ? section.items.some((item) => isUrlActive(href, item.url))
      : isUrlActive(href, section.url),
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setOpen, setOpenMobile } = useSidebar();
  const href = useLocation({ select: (location) => location.href });
  const sections = menuItems.sections;

  const routeSection = findSectionForHref(sections, href);
  const routeSectionTitle = routeSection?.title;
  const routeSectionIsDirect = !!routeSection && !routeSection.items;
  const [activeTitle, setActiveTitle] = React.useState(
    routeSectionTitle ?? sections[0].title,
  );
  // Follow route changes: highlight the owning rail item and collapse the
  // panel when landing on a direct (no sub-items) route. Keyed on href only:
  // setOpen changes identity with the open state, and reacting to it would
  // instantly re-close a panel opened while a direct route is active.
  React.useEffect(() => {
    if (!routeSectionTitle) return;
    setActiveTitle(routeSectionTitle);
    if (routeSectionIsDirect) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href]);
  const activeSection = sections.find(
    (section) => section.title === activeTitle,
  );

  return (
    <Sidebar
      collapsible="icon"
      className="top-(--header-height)! h-[calc(100svh-var(--header-height)-var(--footer-height))]! overflow-hidden"
      {...props}
    >
      <div className="flex h-full w-full">
        {/* Panel 1: icon rail */}
        <Sidebar
          collapsible="none"
          className="w-(--sidebar-width-icon) shrink-0 border-r"
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {sections.map((section) => (
                    <SidebarMenuItem key={section.title}>
                      {section.items ? (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTitle(section.title);
                            setOpen(true);
                          }}
                          data-active={section.title === activeTitle}
                          className={railItemClasses}
                        >
                          <section.icon className="size-5 shrink-0" />
                          <span className="w-full truncate text-center text-xs leading-tight">
                            {section.title}
                          </span>
                        </button>
                      ) : (
                        <Link
                          to={section.url}
                          onClick={() => {
                            setActiveTitle(section.title);
                            setOpen(false);
                            setOpenMobile(false);
                          }}
                          data-active={section.title === activeTitle}
                          className={railItemClasses}
                        >
                          <section.icon className="size-5 shrink-0" />
                          <span className="w-full truncate text-center text-xs leading-tight">
                            {section.title}
                          </span>
                        </Link>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className={railCompactClasses}>
            <NavUser user={menuItems.user} />
          </SidebarFooter>
        </Sidebar>

        {/* Panel 2: active section menu; only sections with items have a
            panel. display none when collapsed so its links leave the tab
            order, not just get clipped */}
        {activeSection?.items && (
          <Sidebar
            collapsible="none"
            className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden"
          >
            <SidebarHeader className="border-b p-4">
              <div className="flex items-center justify-between">
                <div className="text-base font-medium text-foreground">
                  {activeSection.title}
                </div>
                <SidebarTrigger className="-my-1 -mr-2" />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {activeSection.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={isUrlActive(href, item.url)}
                        >
                          <Link
                            to={item.url}
                            onClick={() => setOpenMobile(false)}
                          >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            {item.badge && (
                              <Badge className="ms-auto rounded-full px-1 py-0 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        )}
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
