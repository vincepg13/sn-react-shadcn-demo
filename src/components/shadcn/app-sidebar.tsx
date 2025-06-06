import {
  Home,
  Wind,
  ClipboardPen,
  TableOfContents,
  UsersRound,
  ChartNoAxesColumnIncreasing,
  AppWindow,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSidebar } from "../ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Tailwind",
    url: "/tailwind",
    icon: Wind,
  },
  {
    title: "Shadcn/ui",
    url: "/shadcn",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    title: "ServiceNow UI",
    url: "/snow_ui",
    icon: AppWindow,
  },
  {
    title: "ServiceNow Users",
    url: "/snow_user",
    icon: UsersRound,
  },
  {
    title: "ServiceNow Form",
    url:
      "/snow_form?table=" +
      import.meta.env.VITE_SCOPE_KEY +
      "react_demo&guid=-1",
    icon: ClipboardPen,
  },
  {
    title: "ServiceNow Tables",
    url: "/snow?table=problem&query=active=true^ORDERBYDESCnumber",
    icon: TableOfContents,
  },
];

export default function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarHeader>
          <div>
            <img src="https://www.ausa.org/sites/default/files/2023-04/servicenow.png" />
          </div>
          {state !== "collapsed" && (
            <div className="flex px-4 items-center justify-between">
              <img
                className="max-w-[25%] rounded-md"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1200px-Tailwind_CSS_Logo.svg.png"
              />
              <div className="text-4xl">+</div>
              <img
                className="max-w-[25%] rounded-md"
                src="https://mediaresource.sfo2.digitaloceanspaces.com/wp-content/uploads/2024/04/20161105/shadcn-ui-logo-EF735EC0E5-seeklogo.com.png"
              />
            </div>
          )}
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
