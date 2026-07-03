import { Sparkles } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../mode-toggle";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-(--header-height) w-full shrink-0 items-center justify-between border-b bg-background px-4">
      {/* Left side of the header */}
      <div className="flex items-center gap-2">
        {/* Drawer trigger; the desktop collapse control lives in the
            section panel header inside the sidebar */}
        <SidebarTrigger className="-ml-1 md:hidden" />
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Sparkles className="size-4" />
        </div>
        <div className="grid text-left text-sm leading-tight">
          <span className="truncate font-semibold">Shadcn Starter</span>
          <span className="truncate text-xs text-muted-foreground">
            Vite + ShadcnUI
          </span>
        </div>
      </div>

      {/* Right side of the header */}
      <div>
        <ModeToggle />
      </div>
    </header>
  );
}
