import { Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import { AppFooter } from "./app-footer";

// SidebarProvider writes the sidebar_state cookie but never reads it,
// so the persisted collapse state must be passed back in as defaultOpen.
function getSidebarDefaultOpen() {
  return !document.cookie
    .split("; ")
    .includes("sidebar_state=false");
}

export function AuthenticatedLayout() {
  return (
    <SidebarProvider
      defaultOpen={getSidebarDefaultOpen()}
      className="flex flex-col"
      style={
        {
          "--sidebar-width": "19rem",
          "--sidebar-width-icon": "5rem",
          "--header-height": "4rem",
          "--footer-height": "2.5rem",
        } as React.CSSProperties
      }
    >
      <AppHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 px-8 py-4 overflow-y-auto">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
      <AppFooter />
    </SidebarProvider>
  );
}
