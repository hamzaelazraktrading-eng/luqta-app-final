import { useState, useEffect } from "react";
import { useOffers } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { Search, Loader2, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav, AdBanner } from "@/components/Navigation";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { data: offers, isLoading } = useOffers({ search, category });

  const categories = [
    { id: "all", label: "الكل" },
    { id: "electronics", label: "إلكترونيات" },
    { id: "perfumes", label: "عطور" },
    { id: "fashion", label: "أزياء" },
    { id: "home", label: "منزل" },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0f172a] pb-[140px]" dir="rtl">
      <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-xl text-white border-b border-white/5">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-[#f97316] leading-none">لُقطة <span className="text-white/60 font-medium text-sm ml-1">Luqta</span></h1>
            <p className="text-[10px] text-white/50 mt-1 font-medium">أفضل الصيدات في مكان واحد</p>
          </div>
          <motion.div whileTap={{ scale: 0.9 }} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 text-[#f97316]">
            <Info size={18} />
          </motion.div>
        </div>
        <div className="px-6 pb-4 flex flex-col gap-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="ابحث عن لُقطتك القادمة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md text-white placeholder-white/30 text-sm h-12 pr-11 rounded-2xl border border-white/10 focus:ring-2 focus:ring-[#f97316]/50 transition-all outline-none"
            />
            <Search className="absolute right-4 top-3.5 text-[#f97316]" size={18} />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  category === cat.id 
                  ? "bg-[#f97316] text-white" 
                  : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 pt-6">
        <AdBanner type="hero" />
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-[#f97316]" /></div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {offers?.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
          </motion.div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col pointer-events-none">
        <div className="pointer-events-auto">
          <AdBanner type="footer" />
        </div>
        <div className="pointer-events-auto">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
