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
      // Passing explicit guest identity instead of empty string
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
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="mb-4 overflow-hidden rounded-xl border border-border shadow-2xl bg-slate-950 p-3">
             <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-white" />
             </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">SkyLinks Capital Terminal</h1>
          {inviteToken ? (
             <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-3 border-emerald-500/30 bg-emerald-500/5 text-emerald-600 font-bold uppercase tracking-widest text-[10px]">
               <ShieldAlert className="h-3 w-3" /> Guest Node Authorized
             </Badge>
          ) : (
            <p className="text-muted-foreground text-center max-w-xs font-medium uppercase tracking-[0.2em] text-[10px]">
              Enterprise Financial Core
            </p>
          )}
        </div>
        <motion.div animate={controls}>
          <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none bg-background/80 backdrop-blur-sm">
            <form onSubmit={handleLogin}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">{inviteToken ? "Collaborator Login" : "Secure Authentication"}</CardTitle>
                <CardDescription>
                  {inviteToken ? "A temporary read-only session will be initiated" : "Enter enterprise credentials to access the core"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!inviteToken ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@skylinkscapital.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Security Key</Label>
                        <button type="button" className="text-xs text-primary hover:underline font-medium">Reset Node Key?</button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="trust" />
                      <Label htmlFor="trust" className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Trust this device for 30 days
                      </Label>
                    </div>
                  </>
                ) : (
                  <div className="py-4 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <ShieldCheck className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground px-4">
                      Access granted via invitation token. Platform modules will be restricted to read-only analytics.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" disabled={authenticating} className="w-full btn-gradient py-6 text-lg">
                  {authenticating ? <Loader2 className="h-5 w-5 animate-spin" /> : "Authorize Access"}
                </Button>
                <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                  <span className="flex items-center gap-1"><Lock className="h-2.5 w-2.5" /> 256-bit AES</span>
                  <span className="flex items-center gap-1"><ShieldAlert className="h-2.5 w-2.5" /> Audit Log Active</span>
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
        {!inviteToken && (
          <p className="mt-6 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Authorized access only. All actions are audited by SkyLinks Security.
          </p>
        )}
      </div>
    </div>
  );
}