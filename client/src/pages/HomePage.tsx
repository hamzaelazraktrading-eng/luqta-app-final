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
  const [, setLocation] = useLocation();
  const { data: offers, isLoading } = useOffers({ search, category });

  const categories = [
    { id: "all", label: "الكل", icon: <LayoutGrid size={14} /> },
    { id: "electronics", label: "إلكترونيات", icon: <ShoppingCart size={14} /> },
    { id: "perfumes", label: "عطور", icon: <Flame size={14} /> },
    { id: "fashion", label: "أزياء", icon: <Heart size={14} /> },
  ];

  // Ad Container Component
  const AdContainer = ({ type }: { type: 'hero' | 'feed' | 'footer' }) => {
    const classes = {
      hero: "w-full h-24 bg-gray-100 rounded-xl mb-6 flex items-center justify-center border border-dashed border-gray-300",
      feed: "col-span-2 h-40 bg-gray-50 rounded-2xl flex items-center justify-center border border-dashed border-gray-200 my-2",
      footer: "fixed bottom-20 left-4 right-4 h-[50px] bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center border border-gray-100 z-40 shadow-sm"
    };
    return (
      <div className={classes[type]}>
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">مساحة إعلانية - Ad Space</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#121212] pb-32 font-sans" dir="rtl">
      
      {/* 1. هيدر لُقطة الجديد */}
      <div className="sticky top-0 z-50 bg-[#121212] text-white shadow-xl border-b border-orange-500/20">
        <div className="px-6 py-4 flex justify-between items-center">
           <div className="flex flex-col">
             <h1 className="text-2xl font-black text-orange-500 leading-none tracking-tight">لُقطة <span className="text-white font-light text-sm ml-1">Luqta</span></h1>
             <p className="text-[10px] text-white/60 mt-1 font-medium">أفضل الصيدات والعروض في مكان واحد</p>
           </div>
           <div className="flex gap-2">
             <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 hover:bg-orange-500/10 transition-colors">
               <Info size={18} className="text-orange-500" />
             </div>
           </div>
        </div>

        {/* 2. شريط البحث المدمج */}
        <div className="px-6 pb-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="ابحث عن لُقطتك القادمة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md text-white placeholder-white/40 text-sm h-12 pr-11 rounded-2xl shadow-inner border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
            <Search className="absolute right-4 top-3.5 text-orange-500" size={18} />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 pt-4">
        {/* AdMob Hero Space */}
        <AdContainer type="hero" />

        {/* 3. شريط الأقسام */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap text-xs font-bold transition-all border-2 ${
                category === cat.id 
                ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20" 
                : "bg-white text-gray-500 border-gray-100 hover:border-orange-500/20"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* 4. منطقة العروض */}
        <main>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {offers?.map((offer: any, index: number) => (
                  <div key={offer.id} className="contents">
                    {index > 0 && index % 5 === 0 && <AdContainer type="feed" />}
                    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                      <OfferCard offer={offer} />
                    </motion.div>
                  </div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>

      {/* AdMob Sticky Footer Space */}
      <AdContainer type="footer" />

      {/* 5. القائمة السفلية - تحديث الأمان */}
      <nav className="fixed bottom-4 left-4 right-4 bg-[#121212] h-18 rounded-3xl shadow-2xl border border-white/10 flex items-center justify-around z-50 overflow-hidden px-2">
        <button onClick={() => setLocation("/")} className={`flex flex-col items-center flex-1 py-3 transition-colors ${category === 'all' ? 'text-orange-500' : 'text-white/40'}`}>
           <LayoutGrid size={22} />
           <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>
        <button onClick={() => setLocation("/trending")} className="flex flex-col items-center flex-1 py-3 text-white/40 hover:text-orange-500 transition-colors">
           <Flame size={22} />
           <span className="text-[10px] mt-1 font-bold">الرائج</span>
        </button>
        <button onClick={() => setLocation("/favorites")} className="flex flex-col items-center flex-1 py-3 text-white/40 hover:text-orange-500 transition-colors">
           <Heart size={22} />
           <span className="text-[10px] mt-1 font-bold">المفضلة</span>
        </button>
        <button className="flex flex-col items-center flex-1 py-3 text-white/40 hover:text-orange-500 transition-colors">
           <ShoppingCart size={22} />
           <span className="text-[10px] mt-1 font-bold">المتجر</span>
        </button>
      </nav>
    </div>
  );
}
