import React, { useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Search, Bell, User as UserIcon, LogOut, Settings, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { ShareAccessDialog } from "@/components/ShareAccessDialog";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [shareOpen, setShareOpen] = React.useState(false);
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);
  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-950">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/20 border border-primary/40" />
          <span className="text-xs text-primary font-mono tracking-widest uppercase">Securing Session...</span>
        </div>
      </div>
    );
  }
  const currentUser = user!;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-slate-950/50 relative">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <div className="relative hidden md:block w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search terminal..."
                className="w-full bg-secondary/50 pl-9 focus-visible:ring-primary"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9 border border-border shadow-sm">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {currentUser.role === "admin" && (
                  <>
                    <DropdownMenuItem onClick={() => setShareOpen(true)} className="cursor-pointer font-medium text-primary focus:bg-primary/5">
                      <UserPlus className="mr-2 h-4 w-4" /> Share Access
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
            {children}
          </div>
          <ShareAccessDialog open={shareOpen} onOpenChange={setShareOpen} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}