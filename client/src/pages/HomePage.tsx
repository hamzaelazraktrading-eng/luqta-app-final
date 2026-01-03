import { useState, useEffect } from "react";
import { useOffers } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { Search, Loader2, Info, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav, AdBanner } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLocation } from "wouter";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [, setLocation] = useLocation();
  const { data: offers, isLoading } = useOffers({ search, category });

  const categories = [
    { id: "electronics", label: "إلكترونيات" },
    { id: "perfumes", label: "عطور" },
    { id: "fashion", label: "أزياء" },
    { id: "home", label: "المنزل والمطبخ" },
    { id: "accessories", label: "الساعات والإكسسوارات" },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0f172a] font-tajawal" dir="rtl">
      <header className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-xl text-white border-b border-white/5 shadow-lg">
        <div className="px-6 py-2 flex justify-between items-center h-12">
          <h1 className="text-xl font-bold text-[#f97316] leading-none">لُقطة</h1>
          <div className="flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 flex-1 max-w-[200px] ml-4">
            <Search className="text-[#f97316]" size={14} />
            <input
              type="text"
              placeholder="ابحث..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-white placeholder-white/30 text-xs w-full outline-none font-medium"
            />
          </div>
          <Info size={16} className="text-white/40" />
        </div>
        <div className="px-6 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setLocation(`/category/${cat.id}`)}
              className="px-3 py-1 rounded-lg text-[10px] font-bold bg-white/5 text-white/60 border border-white/5 whitespace-nowrap"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-3 pt-4">
        <AdBanner type="hero" />
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-[#f97316]" /></div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" 
          >
            {offers?.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
          </motion.div>
        )}
      </main>

      <div className="mt-8">
        <BottomNav />
        <AdBanner type="footer" />
        <Footer />
      </div>

      <BackToTop />
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-10 left-6 z-[90] w-12 h-12 bg-[#0f172a] text-white rounded-2xl shadow-xl flex items-center justify-center hover:bg-[#f97316] transition-colors"
        >
          <ChevronRight className="rotate-90" size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
