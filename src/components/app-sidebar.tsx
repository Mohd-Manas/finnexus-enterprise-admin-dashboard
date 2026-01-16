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
interface NavRoute {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const { user, logout } = useAuth();
  if (!user) return <Sidebar />;
  const isGuest = user.role === "guest";
  const platformRoutes: NavRoute[] = [
    { name: "Overview", icon: LayoutDashboard, path: "/overview" },
    { name: "Dealing", icon: CandlestickChart, path: "/dealing" },
    { name: "Marketing", icon: Megaphone, path: "/marketing" },
  ];
  const operationsRoutes: NavRoute[] = [
    { name: "Back Office", icon: ShieldCheck, path: "/backoffice" },
    { name: "Tasks", icon: CheckSquare, path: "/tasks" },
    { name: "Reports", icon: BarChart3, path: "/reports" },
  ];
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-slate-200 dark:border-slate-800">
      <SidebarHeader className="h-16 flex items-center px-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Hexagon className="h-5 w-5 text-primary-foreground fill-primary-foreground/20" />
          </div>
          <span className="text-sm font-black tracking-tighter text-foreground group-data-[collapsible=icon]:hidden uppercase">
            SkyLinks Capital
          </span>
        </div>
        {isGuest && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 group-data-[collapsible=icon]:hidden">
            <Badge variant="outline" className="h-5 px-1.5 text-[8px] border-primary/20 text-primary uppercase font-black bg-primary/5">Limited</Badge>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] px-4 mb-2 opacity-50">Platform</SidebarGroupLabel>
          <SidebarMenu className="px-2">
            {platformRoutes.map((route) => (
              <SidebarMenuItem key={route.path}>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === route.path} 
                  tooltip={route.name}
                  className="rounded-xl h-10 data-[active=true]:bg-primary/5 data-[active=true]:text-primary"
                >
                  <Link to={route.path}>
                    <route.icon className="h-4 w-4" />
                    <span className="font-bold">{route.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        {!isGuest && (
          <>
            <SidebarSeparator className="mx-4 my-2" />
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] px-4 mb-2 opacity-50">Operations</SidebarGroupLabel>
              <SidebarMenu className="px-2">
                {operationsRoutes.map((route) => (
                  <SidebarMenuItem key={route.path}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === route.path} 
                      tooltip={route.name}
                      className="rounded-xl h-10 data-[active=true]:bg-primary/5 data-[active=true]:text-primary"
                    >
                      <Link to={route.path}>
                        <route.icon className="h-4 w-4" />
                        <span className="font-bold">{route.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t p-4 space-y-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings" className="rounded-xl font-bold">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              className="rounded-xl font-bold text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
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