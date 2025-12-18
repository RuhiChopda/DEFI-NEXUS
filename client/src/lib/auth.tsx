import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: "google" | "linkedin";
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (provider: "google" | "linkedin") => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const login = (provider: "google" | "linkedin") => {
    // Mock login delay
    setTimeout(() => {
      setUser({
        id: "1",
        name: "Alex Crypto",
        email: "alex@example.com",
        avatar: "https://github.com/shadcn.png",
        provider,
      });
      toast({
        title: "Welcome back!",
        description: `Successfully logged in with ${provider === "google" ? "Google" : "LinkedIn"}.`,
      });
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}