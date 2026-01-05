import { motion } from "framer-motion";
import { MessageCircle, Instagram, Twitter, Facebook } from "lucide-react";
import { useLocation } from "wouter";

export function Footer() {
  const [, setLocation] = useLocation();

  return (
    <footer className="bg-[#0f172a] text-white p-8 rounded-t-[3rem] mt-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center gap-6">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-[#f97316]">لُقطة</h2>
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Luqta Premium Deals</p>
        </div>

        <p className="text-sm text-white/70 max-w-xs leading-relaxed font-medium">
          وجهتك الأولى لأقوى العروض والكوبونات الحصرية في الخليج. نجمع لك أفضل الصيدات من أشهر المتاجر العالمية.
        </p>

        <div className="flex gap-4">
          {[Twitter, Instagram, Facebook].map((Icon, i) => (
            <motion.a 
              key={i} 
              href="#" 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 text-[#f97316]"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>

        <div className="w-full h-[1px] bg-white/5 my-2" />

        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] text-white/30 font-bold">
            © 2026 جميع الحقوق محفوظة لشركة لُقطة للتجارة الرقمية
          </p>
          <div className="flex gap-4 mt-2">
            <button 
              onClick={() => setLocation("/privacy")}
              className="text-[10px] text-white/20 hover:text-[#f97316] transition-colors underline"
            >
              سياسة الخصوصية
            </button>
            <button 
              onClick={() => setLocation("/admin")}
              className="text-[10px] text-white/10 hover:text-white/30 transition-colors"
            >
              نظام الإدارة
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
