import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Hexagon, Lock, Mail, ShieldAlert, Loader2, AlertCircle } from "lucide-react";
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
    // Credentials requirement: admin@skylinkscapital.com / Admin@123
    const isValid = email === "admin@skylinkscapital.com" && password === "Admin@123";
    if (isValid || inviteToken) {
      await new Promise(r => setTimeout(r, 1000));
      login(inviteToken ? `guest_${inviteToken.slice(0,4)}@guest.local` : email);
      toast.success("Identity Verified. Terminal access granted.");
      navigate("/overview");
    } else {
      await new Promise(r => setTimeout(r, 500));
      toast.error("Invalid Credentials", {
        description: "The security key or email provided does not match our records.",
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
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Hexagon className="h-7 w-7 text-white fill-white/20" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">FinNexus</h1>
          {inviteToken ? (
             <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-3 border-emerald-500/30 bg-emerald-500/5 text-emerald-600 font-bold uppercase tracking-widest text-[10px]">
               <ShieldAlert className="h-3 w-3" /> Guest Access Authorized
             </Badge>
          ) : (
            <p className="text-muted-foreground text-center max-w-xs">
              SkyLinks Capital Enterprise Terminal
            </p>
          )}
        </div>
        <motion.div animate={controls}>
          <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none bg-background/80 backdrop-blur-sm">
            <form onSubmit={handleLogin}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">{inviteToken ? "Collaborator Login" : "Secure Authentication"}</CardTitle>
                <CardDescription>
                  {inviteToken ? "Temporary read-only session will be initiated" : "Enter enterprise credentials to access the core"}
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
                        <button type="button" className="text-xs text-primary hover:underline">Reset Node Key?</button>
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
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Maintain persistent node connection
                      </Label>
                    </div>
                  </>
                ) : (
                  <div className="py-4 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <ShieldAlert className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Access granted via invitation. Terminal modules will be limited to read-only analytics.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" disabled={authenticating} className="w-full btn-gradient py-6 text-lg">
                  {authenticating ? <Loader2 className="h-5 w-5 animate-spin" /> : (inviteToken ? "Initialize Guest Link" : "Authorize Access")}
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
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Problems logging in? Contact the <span className="text-primary cursor-pointer hover:underline">Dealing Desk Security Team</span>
          </p>
        )}
      </div>
    </div>
  );
}