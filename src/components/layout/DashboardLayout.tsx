import React, { useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Search, Bell, User as UserIcon, LogOut, Settings, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
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
      <div className="h-screen w-screen flex items-center justify-center bg-[#020B4B]">
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <div className="h-20 w-20 rounded-3xl bg-blue-900/30 border border-blue-500/30 animate-pulse shadow-2xl" />
            <div className="absolute inset-0 h-20 w-20 rounded-3xl border-t-4 border-emerald-500 animate-spin" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] text-emerald-400 font-black tracking-[0.6em] uppercase">Establishing Secure Node</span>
            <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">ENCRYPTING SkyLinks Terminal SESSION...</span>
          </div>
        </div>
      </div>
    );
  }
  const isAdmin = user.role === "admin";
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-slate-950/50 relative">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-xl sm:px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-primary transition-colors h-9 w-9" />
            <div className="relative hidden md:block w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search secure terminal..."
                className="w-full bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 pl-10 focus-visible:ring-2 focus-visible:ring-primary h-9 rounded-xl text-xs font-bold"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2 pr-1 border-r mr-1 border-slate-200 dark:border-slate-800">
              <ThemeToggle className="relative top-0 right-0 h-9 w-9" />
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors h-9 w-9">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-emerald-500 border border-background" />
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-xl p-0 overflow-hidden ring-offset-background transition-all hover:ring-2 hover:ring-primary/40 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-[#020B4B] text-white font-black text-xs">{user.name[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mt-2 rounded-xl shadow-2xl border-slate-200 dark:border-slate-800" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-black leading-none tracking-tight">{user.name}</p>
                    <p className="text-[10px] leading-none text-muted-foreground font-bold uppercase tracking-widest">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <>
                    <DropdownMenuItem
                      onClick={() => setShareOpen(true)}
                      className="cursor-pointer py-3 font-black text-xs uppercase tracking-widest text-[#020B4B] dark:text-blue-400 focus:bg-primary/5 flex items-center gap-2"
                    >
                      <UserPlus className="h-4 w-4" /> Share Terminal Access
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem className="cursor-pointer py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <UserIcon className="h-4 w-4" /> Account Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Platform Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-rose-600 focus:text-rose-700 focus:bg-rose-50 py-3 font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" /> Terminate Session
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
            {children}
          </div>
          {isAdmin && <ShareAccessDialog open={shareOpen} onOpenChange={setShareOpen} />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}