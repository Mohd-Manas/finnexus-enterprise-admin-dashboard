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
    // Official SkyLinks Admin Credentials - Case-insensitive email, Case-sensitive password
    const isAdmin = email.toLowerCase() === "admin@skylinkscapital.com" && password === "Admin@123";
    if (inviteToken) {
      await new Promise(r => setTimeout(r, 1200));
      login("guest-node@skylinkscapital.com", "guest");
      toast.success("SkyLinks Terminal: Guest access authorized.");
      navigate("/overview");
    } else if (isAdmin) {
      await new Promise(r => setTimeout(r, 1000));
      login(email.toLowerCase(), "admin");
      toast.success("Identity Verified. SkyLinks Terminal access granted.");
      navigate("/overview");
    } else {
      await new Promise(r => setTimeout(r, 500));
      toast.error("Security Authentication Failed", {
        description: "The work email or security key provided does not match SkyLinks Capital records.",
      });
      controls.start({
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      });
      setAuthenticating(false);
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#020B4B]/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full" />
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="flex flex-col items-center gap-2 mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-4 overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#020B4B] p-4 flex items-center justify-center"
          >
             <ShieldCheck className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-black tracking-tighter text-foreground text-center">SKYLINKS CAPITAL</h1>
          {inviteToken ? (
             <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-3 border-emerald-500/30 bg-emerald-500/5 text-emerald-600 font-bold uppercase tracking-widest text-[9px]">
               <ShieldAlert className="h-3 w-3" /> GUEST NODE AUTHORIZED
             </Badge>
          ) : (
            <p className="text-muted-foreground text-center max-w-xs font-black uppercase tracking-[0.4em] text-[9px] opacity-60">
              SECURE FINANCIAL CORE TERMINAL
            </p>
          )}
        </div>
        <motion.div animate={controls}>
          <Card className="border-slate-200 dark:border-slate-800 shadow-2xl shadow-[#020B4B]/10 bg-background/90 backdrop-blur-md overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#020B4B] via-blue-500 to-[#020B4B]" />
            <form onSubmit={handleLogin}>
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-lg text-center font-bold tracking-tight">
                  {inviteToken ? "Collaborator Handshake" : "Admin Authentication"}
                </CardTitle>
                <CardDescription className="text-center text-xs font-medium">
                  {inviteToken ? "Initialize temporary terminal session" : "Provide security credentials to bypass encryption"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!inviteToken ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Work Terminal Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/50" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@skylinkscapital.com"
                          className="pl-10 bg-secondary/20 border-slate-200 dark:border-slate-800 focus:ring-primary h-10 text-sm"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Terminal Security Key</Label>
                        <button type="button" className="text-[9px] text-primary hover:underline font-black uppercase tracking-widest">Reset Key?</button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/50" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-secondary/20 border-slate-200 dark:border-slate-800 focus:ring-primary h-10 text-sm"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="trust" className="rounded border-slate-300" />
                      <Label htmlFor="trust" className="text-[10px] font-bold text-muted-foreground cursor-pointer uppercase tracking-tight">
                        TRUST THIS TERMINAL FOR 30 DAYS
                      </Label>
                    </div>
                  </>
                ) : (
                  <div className="py-6 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="h-16 w-16 rounded-3xl bg-[#020B4B]/5 flex items-center justify-center border border-[#020B4B]/10 animate-pulse">
                        <ShieldCheck className="h-8 w-8 text-[#020B4B]" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground px-4 font-bold leading-relaxed uppercase tracking-wide">
                      Link verified. Module access restricted to <span className="text-primary underline">Read-Only Analytics</span>.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-6 pt-2">
                <Button type="submit" disabled={authenticating} className="w-full btn-gradient py-6 text-xs font-black uppercase tracking-[0.25em] transition-all">
                  {authenticating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Authorize Session"}
                </Button>
                <div className="flex items-center justify-center gap-6 text-[9px] text-muted-foreground uppercase tracking-[0.3em] font-black opacity-60">
                  <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> AES-256</span>
                  <span className="flex items-center gap-1.5 text-primary"><ShieldAlert className="h-3 w-3" /> SECURITY AUDITED</span>
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
        <p className="mt-8 text-center text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] max-w-[320px] mx-auto leading-loose opacity-40">
          AUTHORIZED CORPORATE ACCESS ONLY. ALL SESSION METRICS ARE RECORDED AND SCRUBBED BY SKYLINKS SECURITY ENGINES.
        </p>
      </div>
    </div>
  );
}