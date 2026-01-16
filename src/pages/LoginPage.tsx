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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020B4B] p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-emerald-500/10 blur-[150px] rounded-full" />
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="flex flex-col items-center gap-2 mb-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-4 overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-[#1E3A8A] p-4 flex items-center justify-center"
          >
             <ShieldCheck className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-black tracking-tighter text-white text-center">SKYLINKS CAPITAL</h1>
          {inviteToken ? (
             <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-3 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-widest text-[9px]">
               <ShieldAlert className="h-3 w-3" /> GUEST NODE AUTHORIZED
             </Badge>
          ) : (
            <p className="text-blue-300 text-center max-w-xs font-black uppercase tracking-[0.4em] text-[9px] opacity-80">
              SECURE FINANCIAL CORE TERMINAL
            </p>
          )}
        </div>
        <motion.div animate={controls}>
          <Card className="border-white/10 shadow-2xl bg-slate-900/90 backdrop-blur-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-[#1E3A8A] to-[#020B4B]" />
            <form onSubmit={handleLogin}>
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl text-center font-black tracking-tight text-white">
                  {inviteToken ? "Collaborator Handshake" : "Admin Authentication"}
                </CardTitle>
                <CardDescription className="text-center text-xs font-bold text-slate-400 uppercase tracking-wide">
                  {inviteToken ? "Initialize temporary terminal session" : "Provide security credentials to bypass encryption"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!inviteToken ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Work Terminal Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@skylinkscapital.com"
                          className="pl-10 bg-slate-800/50 border-white/10 text-white placeholder:text-slate-600 h-11 text-sm focus-visible:ring-emerald-500"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Terminal Security Key</Label>
                        <button type="button" className="text-[9px] text-blue-400 hover:underline font-black uppercase tracking-widest">Reset Key?</button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-slate-800/50 border-white/10 text-white h-11 text-sm focus-visible:ring-emerald-500"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="trust" className="rounded border-slate-700 bg-slate-800 data-[state=checked]:bg-emerald-500" />
                      <Label htmlFor="trust" className="text-[10px] font-black text-slate-400 cursor-pointer uppercase tracking-tight">
                        TRUST THIS TERMINAL FOR 30 DAYS
                      </Label>
                    </div>
                  </>
                ) : (
                  <div className="py-6 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="h-16 w-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 animate-pulse">
                        <ShieldCheck className="h-8 w-8 text-emerald-400" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 px-4 font-black leading-relaxed uppercase tracking-widest">
                      Link verified. Module access restricted to <span className="text-emerald-400 underline decoration-dotted underline-offset-4">Read-Only Analytics</span>.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-6 pt-2">
                <Button type="submit" disabled={authenticating} className="w-full btn-gradient py-7 text-xs font-black uppercase tracking-[0.3em] transition-all bg-gradient-to-r from-emerald-600 to-[#1E3A8A] hover:from-emerald-500 hover:to-[#1E3A8A] border-none">
                  {authenticating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Authorize Session"}
                </Button>
                <div className="flex items-center justify-center gap-6 text-[9px] text-slate-500 uppercase tracking-[0.4em] font-black">
                  <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> AES-256</span>
                  <span className="flex items-center gap-1.5 text-emerald-500/70"><ShieldAlert className="h-3 w-3" /> SECURITY AUDITED</span>
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
        <p className="mt-8 text-center text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] max-w-[320px] mx-auto leading-loose opacity-60">
          AUTHORIZED CORPORATE ACCESS ONLY. ALL SESSION METRICS ARE RECORDED AND SCRUBBED BY SKYLINKS SECURITY ENGINES.
        </p>
      </div>
    </div>
  );
}