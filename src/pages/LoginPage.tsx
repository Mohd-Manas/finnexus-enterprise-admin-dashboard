import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock, Mail, ShieldAlert, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useAnimation } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [authenticating, setAuthenticating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const controls = useAnimation();
  const inviteToken = searchParams.get('invite');
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticating(true);
    const isAdmin = email === "admin@skylinkscapital.com" && password === "Admin@123";
    if (inviteToken) {
      await new Promise(r => setTimeout(r, 1200));
      login("guest-node@skylinkscapital.com", "guest");
      toast.success("SkyLinks Capital: Guest access authorized.");
      navigate("/overview");
    } else if (isAdmin) {
      await new Promise(r => setTimeout(r, 1000));
      login(email, "admin");
      toast.success("SkyLinks Capital: Identity Verified. Terminal access granted.");
      navigate("/overview");
    } else {
      await new Promise(r => setTimeout(r, 500));
      toast.error("Invalid Credentials", {
        description: "The security key or email provided does not match SkyLinks records.",
      });
      controls.start({
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      });
      setAuthenticating(false);
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#020B4B]/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full" />
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="flex flex-col items-center gap-2 mb-8">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl bg-[#020B4B] p-4"
          >
             <ShieldCheck className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground text-center">SkyLinks Capital Terminal</h1>
          {inviteToken ? (
             <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-3 border-emerald-500/30 bg-emerald-500/5 text-emerald-600 font-bold uppercase tracking-widest text-[10px]">
               <ShieldAlert className="h-3 w-3" /> Guest Node Authorized
             </Badge>
          ) : (
            <p className="text-muted-foreground text-center max-w-xs font-semibold uppercase tracking-[0.3em] text-[10px]">
              Enterprise Financial Core
            </p>
          )}
        </div>
        <motion.div animate={controls}>
          <Card className="border-slate-200 dark:border-slate-800 shadow-2xl shadow-[#020B4B]/5 bg-background/90 backdrop-blur-md">
            <form onSubmit={handleLogin}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-center">{inviteToken ? "Collaborator Login" : "Secure Authentication"}</CardTitle>
                <CardDescription className="text-center">
                  {inviteToken ? "A temporary read-only session will be initiated" : "Enter enterprise credentials to access the core"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {!inviteToken ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wide">Work Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@skylinkscapital.com"
                          className="pl-10 bg-secondary/30"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wide">Security Key</Label>
                        <button type="button" className="text-[10px] text-primary hover:underline font-bold uppercase tracking-tight">Reset Key?</button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          className="pl-10 bg-secondary/30"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="trust" />
                      <Label htmlFor="trust" className="text-xs font-medium leading-none text-muted-foreground cursor-pointer">
                        Trust this terminal for 30 days
                      </Label>
                    </div>
                  </>
                ) : (
                  <div className="py-6 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="h-16 w-16 rounded-full bg-[#020B4B]/5 flex items-center justify-center border border-[#020B4B]/10">
                        <ShieldCheck className="h-8 w-8 text-[#020B4B]" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground px-4 font-medium leading-relaxed">
                      Access granted via invitation token. Platform modules will be restricted to read-only analytics.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-6 pt-2">
                <Button type="submit" disabled={authenticating} className="w-full btn-gradient py-6 text-base font-bold uppercase tracking-widest transition-all">
                  {authenticating ? <Loader2 className="h-5 w-5 animate-spin" /> : "Authorize Access"}
                </Button>
                <div className="flex items-center justify-center gap-6 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
                  <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> AES-256</span>
                  <span className="flex items-center gap-1.5 text-primary"><ShieldAlert className="h-3 w-3" /> AUDITED</span>
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
        <p className="mt-8 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-[0.25em] max-w-[280px] mx-auto leading-loose">
          Authorized access only. All sessions are monitored by SkyLinks Security.
        </p>
      </div>
    </div>
  );
}