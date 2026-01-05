import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { LayoutGrid, Flame, Heart, Ticket } from "lucide-react";
// استيراد مكون الإعلانات الحقيقي
import { AdBanner as RealAdBanner } from "./AdBanner";

export function BottomNav() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { id: "/", label: "الرئيسية", icon: <LayoutGrid size={24} /> },
    { id: "/trending", label: "الرائج", icon: <Flame size={24} /> },
    { id: "/favorites", label: "المفضلة", icon: <Heart size={24} /> },
    { id: "/coupons", label: "كوبونات", icon: <Ticket size={24} /> },
  ];

  return (
    <nav className="w-full bg-[#0f172a] h-20 border-t border-white/5 flex items-center justify-around px-6 z-50">
      {navItems.map((item) => {
        const isActive = location === item.id || (item.id === "/" && location.startsWith("/category"));
        return (
          <button 
            key={item.id}
            onClick={() => setLocation(item.id)} 
            className={`flex flex-col items-center flex-1 py-3 transition-all duration-300 relative ${isActive ? 'text-[#f97316]' : 'text-slate-400'}`}
          >
            <motion.div whileTap={{ scale: 0.8 }} className="relative z-10">{item.icon}</motion.div>
            <span className="text-[10px] mt-1.5 font-black tracking-wide relative z-10">{item.label}</span>
            {isActive && (
              <motion.div 
                layoutId="active-nav"
                className="absolute inset-x-2 inset-y-1 bg-white/5 rounded-2xl z-0"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

// تحديث المكون ليعرض الإعلانات الحقيقية بدلاً من Placeholder
export function AdBanner({ type }: { type: 'hero' | 'footer' | 'content' }) {
  return <RealAdBanner />;
}
