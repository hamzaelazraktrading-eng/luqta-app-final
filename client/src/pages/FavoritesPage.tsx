import { useOffers } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { Heart, Loader2 } from "lucide-react";
import { BottomNav } from "@/components/Navigation";

export default function FavoritesPage() {
  const { data: offers, isLoading } = useOffers();
  const favoriteOffers = offers?.slice(0, 2); // Mock favorites

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32 font-tajawal" dir="rtl">
      <header className="bg-[#0f172a] text-white p-6 shadow-xl flex items-center justify-center gap-2">
        <Heart className="text-red-500 fill-red-500" />
        <h1 className="text-2xl font-black">المفضلة</h1>
      </header>

      <main className="p-4">
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-red-500" /></div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {favoriteOffers?.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
