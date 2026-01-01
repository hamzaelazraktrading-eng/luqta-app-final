import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Home, Search } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
              <span className="text-2xl">🦅</span>
            </div>
            <h1 className="text-2xl font-black font-heading tracking-tighter text-white">
              صيدات <span className="text-primary">الخليج</span>
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant={location === "/" ? "default" : "ghost"} size="sm">
              <Home className="h-4 w-4 ml-2" />
              <span className="hidden sm:inline">الرئيسية</span>
            </Button>
          </Link>
          
          <Link href="/admin">
            <Button variant={location === "/admin" ? "default" : "ghost"} size="sm">
              <LayoutDashboard className="h-4 w-4 ml-2" />
              <span className="hidden sm:inline">الإدارة</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
