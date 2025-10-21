import { 
  Home, 
  Calendar, 
  Briefcase, 
  Gift, 
  Rocket, 
  PresentationIcon,
  Settings,
  User,
  MessageCircle
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Events", url: "/dashboard/events", icon: Calendar },
  { title: "Jobs", url: "/dashboard/jobs", icon: Briefcase },
  { title: "Perks", url: "/dashboard/perks", icon: Gift },
  { title: "Submit Startup", url: "/startup-profile", icon: Rocket },
  { title: "Pitch Deck", url: "/pitch-deck", icon: PresentationIcon },
];

const secondaryItems = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Profile", url: "/dashboard/profile", icon: User },
  { title: "Support", url: "/contact", icon: MessageCircle },
];

export function DashboardSidebar() {
  const { open } = useSidebar();

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    `min-h-[44px] ${
      isActive
        ? "bg-accent text-accent-foreground font-medium"
        : "hover:bg-accent/50"
    } active:scale-[0.98] transition-all`;

  return (
    <Sidebar className={open ? "w-60" : "w-14"} collapsible="icon">
      <div className="p-4 border-b">
        <SidebarTrigger className="mb-2" />
        {open && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              MA
            </div>
            <span className="font-semibold text-foreground">Medellin AI</span>
          </div>
        )}
      </div>

      <SidebarContent className="overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink to={item.url} className={getNavClassName}>
                      <item.icon className="h-6 w-6" />
                      {open && <span className="text-base">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink to={item.url} className={getNavClassName}>
                      <item.icon className="h-6 w-6" />
                      {open && <span className="text-base">{item.title}</span>}
                    </NavLink>
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
