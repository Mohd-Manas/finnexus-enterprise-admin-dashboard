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
  Hexagon
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
import { cn } from "@/lib/utils";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const platformRoutes = [
    { name: "Overview", icon: LayoutDashboard, path: "/" },
    { name: "Dealing", icon: CandlestickChart, path: "/dealing" },
    { name: "Marketing", icon: Megaphone, path: "/marketing" },
  ];
  const operationsRoutes = [
    { name: "Back Office", icon: ShieldCheck, path: "/backoffice" },
    { name: "Tasks", icon: CheckSquare, path: "/tasks" },
    { name: "Reports", icon: BarChart3, path: "/reports" },
  ];
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="h-16 flex items-center px-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Hexagon className="h-5 w-5 text-primary-foreground fill-primary-foreground/20" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
            FinNexus
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {platformRoutes.map((route) => (
              <SidebarMenuItem key={route.path}>
                <SidebarMenuButton asChild isActive={location.pathname === route.path} tooltip={route.name}>
                  <Link to={route.path}>
                    <route.icon />
                    <span>{route.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarMenu>
            {operationsRoutes.map((route) => (
              <SidebarMenuItem key={route.path}>
                <SidebarMenuButton asChild isActive={location.pathname === route.path} tooltip={route.name}>
                  <Link to={route.path}>
                    <route.icon />
                    <span>{route.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout" className="text-destructive hover:text-destructive">
              <LogOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}