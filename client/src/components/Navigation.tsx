import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { LayoutGrid, Flame, Heart, Ticket } from "lucide-react";

export function BottomNav() {
  const [location, setLocation] = useLocation();
  
  const navItems = [
    { id: "/", label: "الرئيسية", icon: <LayoutGrid size={22} /> },
    { id: "/trending", label: "الرائج", icon: <Flame size={22} /> },
    { id: "/favorites", label: "المفضلة", icon: <Heart size={22} /> },
    { id: "/coupons", label: "كوبونات", icon: <Ticket size={22} /> },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 bg-[#0f172a]/90 backdrop-blur-xl h-20 rounded-[2.5rem] shadow-2xl border border-white/10 flex items-center justify-around z-50 overflow-hidden px-4">
      {navItems.map((item) => (
        <button 
          key={item.id}
          onClick={() => setLocation(item.id)} 
          className={`flex flex-col items-center flex-1 py-3 transition-all duration-300 relative ${location === item.id ? 'text-[#F97316]' : 'text-white/40'}`}
        >
          {location === item.id && (
            <motion.div 
              layoutId="nav-glow"
              className="absolute -top-1 w-8 h-1 bg-[#F97316] rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"
            />
          )}
          <motion.div whileTap={{ scale: 0.8 }} className="mb-1">{item.icon}</motion.div>
          <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export function AdBanner({ type }: { type: 'hero' | 'footer' | 'content' }) {
  const styles = {
    hero: "w-full h-20 bg-slate-50 rounded-2xl mb-6 flex items-center justify-center border border-dashed border-slate-200 overflow-hidden relative group",
    footer: "fixed bottom-[6.5rem] left-6 right-6 h-[60px] bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center border border-indigo-50 z-40 shadow-xl",
    content: "w-full h-32 bg-slate-50/50 rounded-3xl flex items-center justify-center border border-dashed border-slate-200 my-6"
  };

  return (
    <div className={styles[type]}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest relative z-10">مساحة إعلانية - Ad Space</span>
    </div>
  );
}
