import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Check, Loader2, QrCode, ShieldCheck, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { post } from "@/lib/api-client";
import { InviteResponse } from "@shared/types";
import { Badge } from "@/components/ui/badge";
interface ShareAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function ShareAccessDialog({ open, onOpenChange }: ShareAccessDialogProps) {
  const [loading, setLoading] = useState(false);
  const [invite, setInvite] = useState<InviteResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const generateLink = async () => {
    setLoading(true);
    try {
      const data = await post<InviteResponse>("/api/invites", {});
      setInvite(data);
      toast.success("Guest invite link generated");
    } catch (err) {
      toast.error("Failed to generate invite");
    } finally {
      setLoading(false);
    }
  };
  const copyToClipboard = () => {
    if (invite?.inviteUrl) {
      navigator.clipboard.writeText(invite.inviteUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };
  const qrUrl = invite
    ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(invite.inviteUrl)}`
    : null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Share Terminal Access
          </DialogTitle>
          <DialogDescription>
            Create a secure, time-limited link for external auditors or collaborators.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 flex flex-col items-center gap-6">
          <AnimatePresence mode="wait">
            {!invite ? (
              <motion.div
                key="generate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full"
              >
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <LinkIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold">Generate Invite Token</p>
                    <p className="text-xs text-muted-foreground">Link expires in 24 hours. Read-only access.</p>
                  </div>
                  <Button
                    onClick={generateLink}
                    disabled={loading}
                    className="w-full btn-gradient"
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Authorize Access Link"}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="invite-link" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Collaborator URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="invite-link"
                      value={invite.inviteUrl}
                      readOnly
                      className="bg-background/50 font-mono text-xs"
                    />
                    <Button size="icon" variant="outline" onClick={copyToClipboard} className="shrink-0">
                      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border shadow-sm">
                    {qrUrl && <img src={qrUrl} alt="Invite QR" className="h-32 w-32" />}
                  </div>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                    <QrCode className="h-3 w-3" /> SCAN FOR MOBILE TERMINAL ACCESS
                  </p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="text-[10px] font-mono border-dashed">
                    VALID UNTIL: {new Date(invite.expiresAt).toLocaleString()}
                  </Badge>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <DialogFooter className="sm:justify-center border-t pt-4">
          <p className="text-[10px] text-center text-muted-foreground italic">
            Note: Guests can only view Platform Overview, Dealing, and Marketing modules.
            All actions are logged under the generator's audit ID.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}