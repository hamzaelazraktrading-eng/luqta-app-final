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
    <nav className="fixed bottom-4 left-4 right-4 bg-[#0f172a] h-18 rounded-3xl shadow-2xl border border-white/10 flex items-center justify-around z-50 overflow-hidden px-2">
      {navItems.map((item) => (
        <button 
          key={item.id}
          onClick={() => setLocation(item.id)} 
          className={`flex flex-col items-center flex-1 py-3 transition-all duration-300 ${location === item.id ? 'text-[#f97316]' : 'text-white/40'}`}
        >
          <motion.div whileTap={{ scale: 0.8 }}>{item.icon}</motion.div>
          <span className="text-[10px] mt-1 font-bold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export function AdBanner({ type }: { type: 'hero' | 'footer' | 'content' }) {
  const styles = {
    hero: "w-full h-20 bg-gray-50 dark:bg-slate-800 rounded-xl mb-6 flex items-center justify-center border border-dashed border-gray-300 dark:border-slate-700",
    footer: "fixed bottom-24 left-4 right-4 h-[50px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl flex items-center justify-center border border-gray-100 dark:border-slate-800 z-40 shadow-sm",
    content: "w-full h-32 bg-gray-100 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center border border-dashed border-gray-200 dark:border-slate-700 my-4"
  };

  return (
    <div className={styles[type]}>
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">مساحة إعلانية - Ad Space</span>
    </div>
  );
}
