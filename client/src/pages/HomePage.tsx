import { useState, useEffect } from "react";
import { useOffers } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { Search, Loader2, Info, ChevronRight, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-slate-100 text-slate-900 font-tajawal" dir="rtl">
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-2xl text-white border-b border-white/5 shadow-2xl">
        <div className="px-6 py-3 flex justify-between items-center h-16">
          <h1 className="text-3xl font-black text-orange-500 tracking-tighter">لُقطة</h1>
          <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl border border-white/10 flex-1 max-w-[300px] ml-6 group focus-within:bg-white/20 transition-all">
            <Search className="text-orange-500" size={18} />
            <input
              type="text"
              placeholder="ابحث عن أفضل العروض..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-white placeholder-white/30 text-sm w-full outline-none font-bold"
            />
          </div>
          <button className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <Info size={20} />
          </button>
        </div>
        <div className="px-6 pb-4 flex gap-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setLocation(`/category/${cat.id}`)}
              className="px-5 py-2 rounded-xl text-xs font-black bg-white/5 text-slate-400 border border-white/5 whitespace-nowrap hover:bg-white/10 hover:text-white transition-all active:scale-95"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 pt-8">
        <AdBanner type="hero" />
        
        <div className="mt-10 mb-6 flex justify-between items-end px-2">
          <div>
            <h2 className="text-3xl font-black text-slate-900">أحدث اللُقطات</h2>
            <p className="text-slate-500 font-bold mt-1">عروض متجددة على مدار الساعة</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-40"><Loader2 className="h-16 w-16 animate-spin text-orange-500" /></div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" 
          >
            {offers?.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
          </motion.div>
        )}
      </main>

      <div className="mt-20">
        <Footer />
      </div>

      <div className="fixed bottom-24 left-0 right-0 z-[90] px-4 pointer-events-none">
        <div className="max-w-screen-md mx-auto pointer-events-auto">
          <AdBanner type="hero" />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 z-[100]">
        <BottomNav />
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
          className="fixed bottom-40 left-6 z-[120] w-14 h-14 bg-orange-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-orange-600 transition-all active:scale-90"
        >
          <ArrowRight className="-rotate-90" size={28} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
