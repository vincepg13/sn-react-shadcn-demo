import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/shadcn/app-sidebar";
import { Outlet } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/shadcn/theme-toggle";

const Layout = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 flex justify-between items-center">
            <div className="flex flex items-center h-6 gap-3">
              <SidebarTrigger variant="outline" className="scale-125 sm:scale-100" />
              <Separator orientation="vertical" className="h-6" />
            </div>
            <div className="text-muted-foreground">@sn-react/shadcn-kit demo</div>
            <ModeToggle />
          </div>
          <div className="p-4 mb-4">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default Layout;
