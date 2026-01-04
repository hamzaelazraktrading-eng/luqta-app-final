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
      
      // Request notification permission if not asked
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, [offer]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
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
    <div className="min-h-screen bg-white font-tajawal pb-24" dir="rtl">
      {/* Expansive Design - No Card Container */}
      
      {/* Sticky Back Button Bar */}
      <div className="sticky top-0 z-[60] p-4 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center">
        <button 
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-xl font-bold text-xs hover:bg-orange-600 transition-colors text-white shadow-lg"
        >
          <ArrowRight size={16} />
          رجوع للرئيسية
        </button>
      </div>

      <div className="max-w-screen-xl mx-auto">
        <main className="w-full">
          {/* Large Image Slider */}
          <div className="w-full aspect-[21/9] md:aspect-[21/7] overflow-hidden relative group bg-slate-100">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImageIndex}
                src={images[currentImageIndex]} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full object-contain" 
              />
            </AnimatePresence>
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all shadow-2xl"
                >
                  <ChevronLeft size={32} />
                </button>
                <button 
                  onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all shadow-2xl"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentImageIndex ? 'w-8 bg-orange-500' : 'w-2 bg-white/50'}`} />
              ))}
            </div>
          </div>

          <div className="max-w-screen-md mx-auto px-6 py-12">
            <div className="flex flex-col mb-12">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight flex-1">{offer.title}</h1>
                {offer.discount && (
                  <div className="bg-red-500 text-white px-4 py-2 rounded-2xl font-black shadow-xl ml-4 rotate-3">
                    {offer.discount}% خصم
                  </div>
                )}
              </div>
              
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="text-center md:text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">السعر الحالي</p>
                  <p className="text-6xl font-black text-slate-900">{offer.newPrice} <span className="text-2xl">ر.س</span></p>
                  {offer.oldPrice && (
                    <p className="text-xl text-slate-400 line-through mt-2 decoration-red-500/20">{offer.oldPrice} ر.س</p>
                  )}
                </div>
                <div className="md:mr-auto text-center md:text-left">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">متوفر في</span>
                  <span className="text-xl font-bold text-slate-900 bg-white px-6 py-2 rounded-2xl border border-slate-200 shadow-sm">{offer.storeName || "متجر موثوق"}</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-black text-slate-900 mb-6 border-r-4 border-orange-500 pr-4">تفاصيل العرض</h2>
                <div className="text-slate-600 leading-relaxed text-xl whitespace-pre-wrap bg-slate-50/50 p-8 rounded-[2.5rem]">
                  {offer.longDescription || offer.description}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      
      {/* Fixed Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-2xl border-t border-slate-100 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-screen-md mx-auto flex gap-4">
          <Button 
            asChild 
            className="flex-[4] h-16 bg-slate-900 hover:bg-slate-800 rounded-2xl font-black gap-3 text-xl active:scale-95 transition-all shadow-2xl shadow-slate-900/20"
          >
            <a href={offer.affiliateUrl || "#"} target="_blank">
              <ShoppingCart size={24} />
              اقتنص العرض الآن
            </a>
          </Button>
          <Button 
            onClick={handleWhatsApp} 
            className="flex-1 h-16 bg-green-500 hover:bg-green-600 rounded-2xl font-black active:scale-95 transition-all shadow-2xl shadow-green-500/20 text-white"
          >
            <MessageCircle size={28} />
          </Button>
          <Button 
            onClick={toggleFavorite}
            variant="outline" 
            className={`h-16 w-16 rounded-2xl border-slate-200 transition-all ${isFavorite ? 'bg-red-50 text-red-500 border-red-100' : 'bg-white'}`}
          >
            <Heart size={28} fill={isFavorite ? "currentColor" : "none"} />
          </Button>
        </div>
      </div>

      {/* Sticky Ad Above Bottom Nav */}
      <div className="fixed bottom-24 left-0 right-0 z-[90] px-4 pointer-events-none">
        <div className="max-w-screen-md mx-auto pointer-events-auto">
          <AdBanner type="hero" />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 z-[110]">
        <BottomNav />
      </div>

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
          className="fixed bottom-40 right-6 z-[120] w-14 h-14 bg-orange-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-orange-600 transition-all active:scale-90"
        >
          <ArrowRight className="-rotate-90" size={28} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
