import { Heart, Loader2, ArrowRight } from "lucide-react";
import { BottomNav, AdBanner } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { OfferCard } from "@/components/OfferCard";
import { Footer } from "@/components/Footer";

export default function FavoritesPage() {
  const [, setLocation] = useLocation();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
    setLoading(false);
  }, []);

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
            <Heart className="text-red-500 fill-red-500" size={28} />
            <h1 className="text-2xl font-bold">المفضلة</h1>
          </div>
          <p className="text-white/40 text-xs font-medium">عروضك التي حفظتها</p>
        </div>
      </header>

      <main className="p-4 pt-8 max-w-screen-xl mx-auto min-h-[50vh]">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-red-500" /></div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-xl font-bold text-[#0f172a] mb-2">قائمة المفضلة فارغة</h2>
            <Button onClick={() => setLocation("/")} className="bg-[#0f172a] mt-4 rounded-2xl h-12 px-8 font-bold gap-2">
              اكتشف العروض
              <ArrowRight size={18} />
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((offer: any) => <OfferCard key={offer.id} offer={offer} />)}
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
