import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative bg-background overflow-x-hidden">
        {/* Unified Background Blobs */}
        <div className="absolute top-20 -left-40 w-160 h-160 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />
        <div className="hidden lg:block absolute top-60 right-20 w-120 h-120 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />

        <div className="relative z-10">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-transparent">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
