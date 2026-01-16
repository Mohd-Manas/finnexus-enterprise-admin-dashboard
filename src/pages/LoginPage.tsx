import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Hexagon, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
export function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Hexagon className="h-7 w-7 text-white fill-white/20" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">FinNexus</h1>
          <p className="text-muted-foreground text-center max-w-xs">
            Enter your credentials to access the enterprise terminal
          </p>
        </div>
        <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none bg-background/80 backdrop-blur-sm">
          <form onSubmit={handleLogin}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>Secure biometric or password login required</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="admin@finnexus.com" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Security Key</Label>
                  <Link to="#" className="text-xs text-primary hover:underline">Forgot key?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" className="pl-10" required />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Trust this device for 30 days
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full btn-gradient py-6 text-lg">
                Authorize Access
              </Button>
              <div className="text-center text-xs text-muted-foreground">
                Authorized access only. All actions are audited.
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}