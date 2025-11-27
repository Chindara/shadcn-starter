import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => <Outlet />,
});

// export const Route = createRootRoute({
//   component: () => (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>
//         <AppHeader />
//         <div className="flex flex-1 flex-col gap-4 px-8 py-4 overflow-y-auto">
//           <Outlet />
//         </div>
//         <AppFooter />
//       </SidebarInset>
//     </SidebarProvider>
//   ),
// });
