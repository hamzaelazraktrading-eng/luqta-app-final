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
    <nav className="w-full bg-[#1e1b4b] h-20 border-t border-white/10 flex items-center justify-around px-4">
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
    hero: "w-full h-20 bg-white rounded-2xl mb-6 flex items-center justify-center border border-dashed border-gray-200 overflow-hidden",
    footer: "w-full h-[60px] bg-white/70 backdrop-blur-md flex items-center justify-center border-t border-gray-100",
    content: "w-full h-32 bg-white/50 rounded-3xl flex items-center justify-center border border-dashed border-gray-200 my-4"
  };

  return (
    <div className={styles[type]}>
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">مساحة إعلانية - Ad Space</span>
    </div>
  );
}
