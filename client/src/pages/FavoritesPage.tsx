import { Heart, Loader2, ArrowRight } from "lucide-react";
import { BottomNav } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function FavoritesPage() {
  const [, setLocation] = useLocation();
  const isLoading = false;
  const favoriteOffers: any[] = [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-40 font-tajawal" dir="rtl">
      <header className="bg-[#312E81] text-white p-8 shadow-2xl rounded-b-[3rem] flex items-center justify-center gap-3">
        <Heart className="text-[#F97316] fill-[#F97316]" size={28} />
        <h1 className="text-2xl font-black">المفضلة</h1>
      </header>

      <main className="p-8">
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-[#F97316]" /></div>
        ) : favoriteOffers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-40 h-40 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <Heart size={64} className="text-indigo-200" />
            </div>
            <h2 className="text-xl font-black text-slate-800 mb-2">قائمة المفضلة فارغة</h2>
            <p className="text-sm text-slate-400 max-w-[200px] mb-8 font-medium">أضف بعض العروض التي تهمك لتجدها هنا لاحقاً</p>
            <Button 
              onClick={() => setLocation("/")}
              className="bg-[#312E81] hover:bg-[#1e1b4b] text-white rounded-2xl h-12 px-8 font-bold gap-2 shadow-lg"
            >
              اكتشف العروض
              <ArrowRight size={18} />
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {/* Display favs */}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
