import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CandlestickChart,
  Megaphone,
  ShieldCheck,
  CheckSquare,
  BarChart3,
  Settings,
  LogOut,
  Hexagon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const { user, logout } = useAuth();
  if (!user) return <Sidebar />;
  const isGuest = user.role === "guest";
  const platformRoutes = [
    { name: "Overview", icon: LayoutDashboard, path: "/overview" },
    { name: "Dealing", icon: CandlestickChart, path: "/dealing" },
    { name: "Marketing", icon: MarketingDashboardPlaceholder, path: "/marketing" },
  ];
  // Using a small mapping because some routes are only for admins
  const operationsRoutes = [
    { name: "Back Office", icon: ShieldCheck, path: "/backoffice" },
    { name: "Tasks", icon: CheckSquare, path: "/tasks" },
    { name: "Reports", icon: BarChart3, path: "/reports" },
  ];
  // Helper because we can't import icons inside mapping easily if they vary
  function MarketingDashboardPlaceholder() { return <Megaphone className="h-4 w-4" />; }
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="h-16 flex items-center px-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Hexagon className="h-5 w-5 text-primary-foreground fill-primary-foreground/20" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
            FinNexus {isGuest && <span className="text-[10px] font-normal text-muted-foreground ml-1">(GUEST)</span>}
          </span>
        </div>
        {isGuest && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 group-data-[collapsible=icon]:hidden">
            <Badge variant="outline" className="h-5 px-1.5 text-[9px] border-primary/20 text-primary uppercase font-bold">Limited</Badge>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {platformRoutes.map((route) => (
              <SidebarMenuItem key={route.path}>
                <SidebarMenuButton asChild isActive={location.pathname === route.path} tooltip={route.name}>
                  <Link to={route.path}>
                    {typeof route.icon === 'function' ? <route.icon /> : <route.icon className="h-4 w-4" />}
                    <span>{route.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        {!isGuest && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Operations</SidebarGroupLabel>
              <SidebarMenu>
                {operationsRoutes.map((route) => (
                  <SidebarMenuItem key={route.path}>
                    <SidebarMenuButton asChild isActive={location.pathname === route.path} tooltip={route.name}>
                      <Link to={route.path}>
                        <route.icon className="h-4 w-4" />
                        <span>{route.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              tooltip="Logout" 
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}