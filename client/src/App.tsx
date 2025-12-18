import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { LandingPage } from "@/pages/landing-page";
import { Dashboard } from "@/pages/dashboard";
import { Markets } from "@/pages/markets";
import { AppLayout } from "@/components/app-layout";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/api/login";
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppLayout>
      <Component />
    </AppLayout>
  );
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>;
  }

  return (
    <Switch>
      <Route path="/">
        {isAuthenticated ? (
          <ProtectedRoute component={Dashboard} />
        ) : (
          <LandingPage />
        )}
      </Route>
      
      <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>
      
      <Route path="/markets">
        <ProtectedRoute component={Markets} />
      </Route>

      <Route path="/portfolio">
        <ProtectedRoute component={Dashboard} />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
