import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import AdminPage from "@/pages/AdminPage";
import TrendingPage from "@/pages/TrendingPage";
import FavoritesPage from "@/pages/FavoritesPage";
import CouponsPage from "@/pages/CouponsPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/trending" component={TrendingPage} />
      <Route path="/favorites" component={FavoritesPage} />
      <Route path="/coupons" component={CouponsPage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
