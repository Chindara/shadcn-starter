import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { menuItems } from "./menu";
import { TeamSwitcher } from "./TeamSwitcher";
import { NavGroup } from "./nav-group";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={menuItems.teams} />
      </SidebarHeader>
      <SidebarContent>
        {menuItems.navGroups.map((props) => (
          <NavGroup
            key={props.title}
            title={props.title}
            items={props.items}
          />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={menuItems.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
