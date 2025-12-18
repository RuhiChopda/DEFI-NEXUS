import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Chrome, Linkedin } from "lucide-react";
import { useState } from "react";

export function AuthModal({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="default" className="neon-glow">Connect Wallet</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card/90 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-center">Welcome to Dabloan</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Connect your identity to start lending and borrowing.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button 
            variant="outline" 
            className="h-12 border-white/10 hover:bg-white/5 hover:text-white justify-start pl-4 gap-3 relative overflow-hidden group"
            onClick={handleLogin}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Chrome className="w-5 h-5 text-red-500" />
            <span className="flex-1 text-left">Continue with your Identity</span>
          </Button>
        </div>
        <div className="text-xs text-center text-muted-foreground">
          By connecting, you agree to our Terms of Service and Privacy Policy.
        </div>
      </DialogContent>
    </Dialog>
  );
}
