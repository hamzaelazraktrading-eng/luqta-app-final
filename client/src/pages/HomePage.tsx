import { useState } from "react";
import { useOffers } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { Input } from "@/components/ui/input";
import { Search, Loader2, LayoutGrid, Flame, Heart, ShoppingCart, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter"; // لإصلاح عمل القوائم

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [, setLocation] = useLocation(); // وظيفة التنقل بين الصفحات
  const { data: offers, isLoading, error } = useOffers({ search, category });

  const categories = [
    { id: "all", label: "الكل", icon: <LayoutGrid size={14} /> },
    { id: "electronics", label: "إلكترونيات", icon: <ShoppingCart size={14} /> },
    { id: "perfumes", label: "عطور", icon: <Flame size={14} /> },
    { id: "fashion", label: "أزياء", icon: <Heart size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-foreground pb-28 font-sans" dir="rtl">
      
      {/* 1. هيدر نحيف وأنيق (Fixed Slim Header) */}
      <div className="sticky top-0 z-50 bg-[#1a237e] text-white shadow-xl border-b border-[#c5a059]/30">
        <div className="px-6 py-3 flex justify-between items-center">
           <div className="flex flex-col">
             <h1 className="text-xl font-black text-[#c5a059] leading-none">صيدات الخليج</h1>
             <p className="text-[9px] text-white/70 mt-1 font-medium">أقوى عروض نون، أمازون، ونامشي في مكان واحد</p>
           </div>
           <div className="flex gap-2">
             <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
               <Info size={16} className="text-[#c5a059]" />
             </div>
           </div>
        </div>

        {/* 2. شريط البحث المدمج (Compact Search) */}
        <div className="px-6 pb-3">
          <div className="relative group">
            <input
              type="text"
              placeholder="ابحث عن العرض المفقود..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/95 text-gray-900 text-xs h-10 pr-10 rounded-xl shadow-inner focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
          </div>
        </div>
      </div>

      {/* 3. شريط الأقسام (Modern Scroll) */}
      <div className="flex gap-2 overflow-x-auto p-4 no-scrollbar bg-white shadow-sm mb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl whitespace-nowrap text-xs font-bold transition-all border ${
              category === cat.id 
              ? "bg-[#c5a059] text-[#1a237e] border-[#1a237e]/10 shadow-md" 
              : "bg-gray-50 text-gray-500 border-transparent"
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* 4. منطقة العروض */}
      <main className="px-4 mt-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[#c5a059]" />
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 gap-3">
            <AnimatePresence>
              {offers?.map((offer: any) => (
                <motion.div key={offer.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <OfferCard offer={offer} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* 5. القائمة السفلية (إصلاح الروابط) */}
      <nav className="fixed bottom-4 left-4 right-4 bg-[#1a237e] h-16 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-around z-[100]">
        <button onClick={() => setLocation("/")} className="flex flex-col items-center text-[#c5a059]">
           <LayoutGrid size={20} />
           <span className="text-[10px] mt-1">الرئيسية</span>
        </button>
        <button onClick={() => setLocation("/trending")} className="flex flex-col items-center text-white/40">
           <Flame size={20} />
           <span className="text-[10px] mt-1">الرائج</span>
        </button>
        <button onClick={() => setLocation("/favorites")} className="flex flex-col items-center text-white/40">
           <Heart size={20} />
           <span className="text-[10px] mt-1">المفضلة</span>
        </button>
        {/* زر سري للأدمن */}
        <button onDoubleClick={() => setLocation("/admin")} className="flex flex-col items-center text-white/20">
           <ShoppingCart size={20} />
           <span className="text-[10px] mt-1">المتجر</span>
        </button>
      </nav>
    </div>
  );
}
