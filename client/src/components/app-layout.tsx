import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  Wallet, 
  Settings, 
  LogOut, 
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@shared/schema";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/markets", label: "Markets", icon: ArrowRightLeft },
    { href: "/portfolio", label: "Portfolio", icon: Wallet },
  ];

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const typedUser = user as User | undefined;

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
          Dabloan<span className="text-white">Verse</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "hover:bg-white/5 text-muted-foreground hover:text-white"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "group-hover:text-white transition-colors"}`} />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-white/5 mb-2">
          <Avatar className="w-8 h-8 border border-primary/20">
            <AvatarImage src={typedUser?.profileImageUrl || ""} alt={typedUser?.firstName || ""} />
            <AvatarFallback>{typedUser?.firstName?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-white">{typedUser?.firstName} {typedUser?.lastName}</p>
            <p className="text-xs text-muted-foreground truncate">{typedUser?.email}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-white/5 bg-sidebar/50 backdrop-blur-xl fixed h-full z-20">
        <NavContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-white/5 flex items-center justify-between px-4 bg-background/80 backdrop-blur-md sticky top-0 z-30">
          <span className="font-display font-bold text-lg">Dabloan Verse</span>
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-r border-white/10 bg-sidebar w-64">
              <NavContent />
            </SheetContent>
          </Sheet>
        </header>

        <div className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
