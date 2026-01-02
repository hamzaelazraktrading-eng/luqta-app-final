import { useOffers } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { Flame, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { BottomNav, AdBanner } from "@/components/Navigation";

import { Footer } from "@/components/Footer";

export default function TrendingPage() {
  const { data: offers, isLoading } = useOffers();
  const trendingOffers = offers?.slice(0, 10);

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-tajawal" dir="rtl">
      <header className="bg-[#0f172a] text-white p-8 shadow-2xl rounded-b-[3rem] flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-3">
          <Flame className="text-[#f97316]" size={28} />
          <h1 className="text-2xl font-bold">رائج الآن</h1>
        </div>
        <p className="text-white/40 text-xs font-medium">أكثر العروض مشاهدة وطلباً في الساعات الأخيرة</p>
      </header>

      <main className="p-4 pt-8 max-w-screen-xl mx-auto">
        <AdBanner type="hero" />
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-[#f97316]" /></div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingOffers?.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
          </div>
        )}
      </main>

      <div className="mt-8">
        <AdBanner type="footer" />
        <Footer />
        <BottomNav />
      </div>
    </div>
  );
}
