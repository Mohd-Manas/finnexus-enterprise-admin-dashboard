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
  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <div className="h-20 w-20 rounded-3xl bg-[#020B4B]/30 border border-[#020B4B]/50 animate-pulse shadow-2xl" />
            <div className="absolute inset-0 h-20 w-20 rounded-3xl border-t-2 border-primary animate-spin" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] text-primary font-mono tracking-[0.5em] uppercase font-black">Establishing Secure Node</span>
            <span className="text-[9px] text-slate-500 font-mono tracking-widest">ENCRYPTING SkyLinks Terminal SESSION...</span>
          </div>
        </div>
      </div>
    );
  }
  const isAdmin = user.role === "admin";
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen bg-slate-50/30 dark:bg-slate-950/30 relative">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-primary transition-colors" />
            <div className="relative hidden md:block w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search secure terminal..."
                className="w-full bg-secondary/40 border-none pl-10 focus-visible:ring-2 focus-visible:ring-primary h-9 rounded-xl text-xs font-medium"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-secondary">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive border-2 border-background" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-xl p-0 overflow-hidden ring-offset-background transition-all hover:ring-2 hover:ring-primary/20">
                  <Avatar className="h-10 w-10 border-2 border-background shadow-md">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-black text-xs">{user.name[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 mt-1 rounded-xl shadow-2xl" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-bold leading-none tracking-tight">{user.name}</p>
                    <p className="text-[10px] leading-none text-muted-foreground font-semibold uppercase tracking-wider">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <>
                    <DropdownMenuItem 
                      onClick={() => setShareOpen(true)} 
                      className="cursor-pointer py-3 font-bold text-primary focus:bg-primary/5 flex items-center gap-2"
                    >
                      <UserPlus className="h-4 w-4" /> Share Terminal Access
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem className="cursor-pointer py-2.5 flex items-center gap-2">
                  <UserIcon className="h-4 w-4" /> Account Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-2.5 flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Platform Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/5 py-2.5 font-bold flex items-center gap-2"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" /> Terminate Session
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            {children}
          </div>
          {isAdmin && <ShareAccessDialog open={shareOpen} onOpenChange={setShareOpen} />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}