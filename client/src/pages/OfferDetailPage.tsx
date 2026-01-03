import { useQuery } from "@tanstack/react-query";
import { Offer } from "@shared/schema";
import { useRoute, useLocation } from "wouter";
import { Loader2, ArrowRight, MessageCircle, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BottomNav, AdBanner } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function OfferDetailPage() {
  const [, params] = useRoute("/offer/:id");
  const [, setLocation] = useLocation();
  const { data: offer, isLoading } = useQuery<Offer>({
    queryKey: [`/api/offers/${params?.id}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#f97316]" />
      </div>
    );
  }

  if (!offer) return null;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`شاهد هذا العرض الرائع من لُقطة: ${offer.title}\n${offer.affiliateUrl || ''}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-tajawal" dir="rtl">
      <header className="bg-[#0f172a] text-white p-6 sticky top-0 z-50 shadow-lg">
        <button 
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 bg-[#f97316] px-4 py-2 rounded-xl font-bold text-xs"
        >
          <ArrowRight size={16} />
          رجوع للرئيسية
        </button>
      </header>

      <main className="max-w-screen-md mx-auto p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-white"
        >
          <div className="aspect-[16/10] overflow-hidden relative">
            <img src={offer.imageUrl} className="w-full h-full object-cover" />
            {offer.discount && (
              <div className="absolute top-6 right-6 bg-[#f97316] text-white px-4 py-2 rounded-2xl font-bold">
                خصم {offer.discount}%
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-2xl font-bold text-[#0f172a] leading-tight">{offer.title}</h1>
              <div className="text-left">
                <p className="text-3xl font-bold text-[#f97316]">{offer.newPrice} ر.س</p>
                {offer.oldPrice && (
                  <p className="text-sm text-slate-400 line-through">{offer.oldPrice} ر.س</p>
                )}
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-8 whitespace-pre-wrap">{offer.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild className="h-14 bg-[#0f172a] rounded-2xl font-bold gap-3 text-lg">
                <a href={offer.affiliateUrl || "#"} target="_blank">
                  <ShoppingCart size={22} />
                  اذهب للمتجر
                </a>
              </Button>
              <div className="flex gap-4">
                <Button onClick={handleWhatsApp} className="flex-1 h-14 bg-green-500 hover:bg-green-600 rounded-2xl font-bold gap-3">
                  <MessageCircle size={22} />
                  واتساب
                </Button>
                <Button variant="outline" className="h-14 w-14 rounded-2xl border-slate-200">
                  <Share2 size={22} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <AdBanner type="content" />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
