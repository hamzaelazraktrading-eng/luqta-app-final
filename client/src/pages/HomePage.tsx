import { useState } from "react";
import { useOffers } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { Search, Loader2, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav, AdBanner } from "@/components/Navigation";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { data: offers, isLoading } = useOffers({ search, category });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] pb-32 font-tajawal" dir="rtl">
      <header className="sticky top-0 z-50 bg-[#0f172a] text-white shadow-xl border-b border-indigo-500/20">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-indigo-400 leading-none">لُقطة <span className="text-white/60 font-light text-sm ml-1">Luqta</span></h1>
            <p className="text-[10px] text-white/50 mt-1">أفضل الصيدات في مكان واحد</p>
          </div>
          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 text-indigo-400">
            <Info size={18} />
          </div>
        </div>
        <div className="px-6 pb-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="ابحث عن لُقطتك القادمة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md text-white placeholder-white/30 text-sm h-12 pr-11 rounded-2xl border border-white/10 focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
            <Search className="absolute right-4 top-3.5 text-indigo-400" size={18} />
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 pt-6">
        <AdBanner type="hero" />
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-indigo-500" /></div>
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
      <AdBanner type="footer" />
      <BottomNav />
    </div>
  );
}
