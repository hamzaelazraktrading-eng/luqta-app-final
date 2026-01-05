import { useOffers } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { Flame, Loader2, ArrowRight } from "lucide-react";
import { BottomNav, AdBanner } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLocation } from "wouter";

export default function TrendingPage() {
  const { data: offers, isLoading } = useOffers();
  const [, setLocation] = useLocation();
  const trendingOffers = offers?.slice(0, 10);

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-tajawal" dir="rtl">
      <header className="bg-[#0f172a] text-white p-8 shadow-2xl rounded-b-[3rem] flex flex-col items-center justify-center gap-4 relative">
        <div className="absolute top-8 right-6">
          <button 
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 px-4 py-2 bg-[#f97316] rounded-xl border border-white/10 text-white hover:bg-[#ea580c] transition-all text-xs font-bold shadow-lg"
          >
            <ArrowRight size={16} />
            رجوع للرئيسية
          </button>
        </div>
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <Flame className="text-[#f97316]" size={28} />
            <h1 className="text-2xl font-bold">رائج الآن</h1>
          </div>
          <p className="text-white/40 text-xs font-medium">أكثر العروض مشاهدة وطلباً</p>
        </div>
      </header>

      <main className="p-4 pt-8 max-w-screen-xl mx-auto min-h-[50vh]">
        <AdBanner type="hero" />
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-[#f97316]" /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trendingOffers?.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
          </div>
        )}
      </main>

      <div className="flex flex-col mt-10">
        <div className="px-6 mb-4"><AdBanner type="footer" /></div>
        <BottomNav />
        <Footer />
      </div>
    </div>
  );
}
