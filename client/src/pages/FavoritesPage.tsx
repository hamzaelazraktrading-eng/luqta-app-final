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
      <header className="bg-[#0f172a] text-white p-8 shadow-2xl rounded-b-[3rem] flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-3">
          <Heart className="text-red-500 fill-red-500" size={28} />
          <h1 className="text-2xl font-bold">المفضلة</h1>
        </div>
        <p className="text-white/40 text-xs font-medium">عروضك التي حفظتها للعودة إليها لاحقاً</p>
      </header>

      <main className="p-4 pt-8 max-w-screen-xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-red-500" /></div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-32 h-32 bg-white rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-gray-100">
              <Heart size={48} className="text-gray-200" />
            </div>
            <h2 className="text-xl font-bold text-[#0f172a] mb-2">قائمة المفضلة فارغة</h2>
            <p className="text-sm text-slate-400 max-w-[200px] mb-8 font-medium">أضف بعض العروض التي تهمك لتجدها هنا لاحقاً</p>
            <Button 
              onClick={() => setLocation("/")}
              className="bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-2xl h-12 px-8 font-bold gap-2 active:scale-95 transition-all"
            >
              اكتشف العروض
              <ArrowRight size={18} />
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {favorites.map((offer: any) => <OfferCard key={offer.id} offer={offer} />)}
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
