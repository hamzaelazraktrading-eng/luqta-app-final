import { useOffers } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { Flame, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { BottomNav, AdBanner } from "@/components/Navigation";

export default function TrendingPage() {
  const { data: offers, isLoading } = useOffers();
  const trendingOffers = offers?.filter((_, i) => i % 2 === 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32 font-tajawal" dir="rtl">
      <header className="bg-[#0f172a] text-white p-6 shadow-xl flex items-center justify-center gap-2">
        <Flame className="text-orange-500" />
        <h1 className="text-2xl font-black">العروض الرائجة</h1>
      </header>

      <main className="p-4">
        <AdBanner type="hero" />
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-orange-500" /></div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {trendingOffers?.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
