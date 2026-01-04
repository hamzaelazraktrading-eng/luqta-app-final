import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { LayoutGrid, Flame, Heart, Ticket } from "lucide-react";

export function BottomNav() {
  const [location, setLocation] = useLocation();
  
  const navItems = [
    { id: "/", label: "الرئيسية", icon: <LayoutGrid size={24} /> },
    { id: "/trending", label: "الرائج", icon: <Flame size={24} /> },
    { id: "/favorites", label: "المفضلة", icon: <Heart size={24} /> },
    { id: "/coupons", label: "كوبونات", icon: <Ticket size={24} /> },
  ];

  return (
    <nav className="w-full bg-slate-900 h-20 border-t border-white/5 flex items-center justify-around px-6">
      {navItems.map((item) => {
        const isActive = location === item.id || (item.id === "/" && location.startsWith("/category"));
        return (
          <button 
            key={item.id}
            onClick={() => setLocation(item.id)} 
            className={`flex flex-col items-center flex-1 py-3 transition-all duration-300 relative ${isActive ? 'text-orange-500' : 'text-slate-400'}`}
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

export function AdBanner({ type }: { type: 'hero' | 'footer' | 'content' }) {
  const styles = {
    hero: "w-full bg-white/80 backdrop-blur-xl rounded-3xl p-6 flex items-center justify-center border-2 border-dashed border-slate-200 overflow-hidden shadow-lg min-h-[100px]",
    footer: "w-full h-[80px] bg-white border-t border-slate-100 flex items-center justify-center",
    content: "w-full bg-slate-50 rounded-[2.5rem] flex items-center justify-center border-2 border-dashed border-slate-200 my-8 p-12 min-h-[160px]"
  };

  return (
    <div className={styles[type]}>
      <div className="flex flex-col items-center gap-2">
        <span className="bg-slate-200 text-slate-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">مساحة إعلانية</span>
        <span className="text-xs text-slate-400 font-bold">AdMob Placeholder</span>
      </div>
    </div>
  );
}
