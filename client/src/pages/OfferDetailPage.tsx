import { useQuery } from "@tanstack/react-query";
import { Offer } from "@shared/schema";
import { useRoute, useLocation } from "wouter";
import { Loader2, ArrowRight, MessageCircle, Share2, ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav, AdBanner } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";

export default function OfferDetailPage() {
  const [, params] = useRoute("/offer/:id");
  const [, setLocation] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { data: offer, isLoading } = useQuery<Offer>({
    queryKey: [`/api/offers/${params?.id}`],
  });

  useEffect(() => {
    if (offer) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.some((f: any) => f.id === offer.id));
    }
  }, [offer]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#f97316]" />
      </div>
    );
  }

  if (!offer) return null;

  const images = [offer.imageUrl, ...(offer.galleryUrls || [])];

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((f: any) => f.id !== offer.id);
    } else {
      newFavorites = [...favorites, offer];
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`شاهد هذا العرض الرائع من لُقطة: ${offer.title}\n${offer.affiliateUrl || ''}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-tajawal pb-24" dir="rtl">
      <div className="max-w-screen-md mx-auto">
        {/* Back Button Row */}
        <div className="p-4 bg-transparent">
          <button 
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 bg-[#f97316] px-4 py-2 rounded-xl font-bold text-xs hover:bg-[#ea580c] transition-colors text-white shadow-lg"
          >
            <ArrowRight size={16} />
            رجوع للرئيسية
          </button>
        </div>

        <main className="p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-white"
          >
            {/* Image Slider */}
            <div className="aspect-[16/10] overflow-hidden relative group bg-slate-100">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={images[currentImageIndex]} 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full h-full object-cover" 
                />
              </AnimatePresence>
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {offer.discount && (
                <div className="absolute top-6 right-6 bg-[#f97316] text-white px-4 py-2 rounded-2xl font-bold shadow-lg">
                  خصم {offer.discount}%
                </div>
              )}

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'w-6 bg-[#f97316]' : 'w-1.5 bg-white/50'}`} />
                ))}
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-col mb-8">
                <h1 className="text-3xl font-bold text-[#0f172a] leading-tight mb-4">{offer.title}</h1>
                <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <div>
                    <p className="text-4xl font-black text-[#f97316]">{offer.newPrice} ر.س</p>
                    {offer.oldPrice && (
                      <p className="text-lg text-slate-400 line-through mt-1">{offer.oldPrice} ر.س</p>
                    )}
                  </div>
                  <div className="mr-auto text-left">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">المتجر</span>
                    <span className="text-sm font-bold text-[#0f172a] bg-white px-3 py-1 rounded-lg border border-slate-100">{offer.storeName || "متجر موثوق"}</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h2 className="text-xl font-bold text-[#0f172a] mb-4">تفاصيل العرض</h2>
                <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                  {offer.longDescription || offer.description}
                </p>
              </div>
            </div>
          </motion.div>

          <AdBanner type="content" />
        </main>
      </div>

      <Footer />
      <BottomNav />

      {/* Floating Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-t border-slate-100 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-screen-md mx-auto flex gap-4">
          <Button 
            asChild 
            className="flex-[3] h-14 bg-[#0f172a] hover:bg-[#1e293b] rounded-2xl font-bold gap-3 text-lg active:scale-95 transition-all shadow-xl shadow-indigo-900/10"
          >
            <a href={offer.affiliateUrl || "#"} target="_blank">
              <ShoppingCart size={22} />
              اقتنص العرض الآن
            </a>
          </Button>
          <Button 
            onClick={handleWhatsApp} 
            className="flex-1 h-14 bg-green-500 hover:bg-green-600 rounded-2xl font-bold active:scale-95 transition-all shadow-xl shadow-green-500/10"
          >
            <MessageCircle size={24} />
          </Button>
          <Button 
            onClick={toggleFavorite}
            variant="outline" 
            className={`h-14 w-14 rounded-2xl border-slate-200 transition-all ${isFavorite ? 'bg-red-50 text-red-500 border-red-100' : 'bg-white'}`}
          >
            <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
          </Button>
        </div>
      </div>
      
      {/* Floating Back to Top */}
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
          className="fixed bottom-32 left-6 z-[90] w-12 h-12 bg-[#0f172a] text-white rounded-2xl shadow-xl flex items-center justify-center hover:bg-[#f97316] transition-colors"
        >
          <ChevronLeft className="rotate-90" size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
