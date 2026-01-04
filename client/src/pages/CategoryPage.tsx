import { useOffers } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { Loader2, ArrowRight } from "lucide-react";
import { BottomNav, AdBanner } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useRoute, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:category");
  const [, setLocation] = useLocation();
  const categoryId = params?.category || "all";
  
  const categories: Record<string, { label: string, desc: string }> = {
    electronics: { label: "إلكترونيات", desc: "أقوى العروض التقنية المختارة بعناية من أفضل المتاجر" },
    perfumes: { label: "عالم العطور", desc: "تشكيلة فاخرة من العطور العالمية بخصومات حصرية" },
    fashion: { label: "أزياء وموضة", desc: "أحدث صيحات الموضة والأزياء لجميع أفراد العائلة" },
    home: { label: "المنزل والمطبخ", desc: "كل ما يحتاجه منزلك ومطبخك بأسعار لا تقبل المنافسة" },
    accessories: { label: "الساعات والإكسسوارات", desc: "أناقتك تكتمل مع تشكيلة من أفخم الساعات والإكسسوارات" },
  };

  const currentCategory = categories[categoryId] || { label: "عروض متنوعة", desc: "استكشف مجموعة مختارة من أفضل العروض والخصومات" };
  const { data: offers, isLoading } = useOffers({ category: categoryId });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-tajawal pb-24" dir="rtl">
      {/* Back Button Row - Separate Row at Top */}
      <div className="sticky top-0 z-[60] p-4 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center">
        <button 
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-xl font-black text-xs hover:bg-orange-600 transition-colors text-white shadow-lg"
        >
          <ArrowRight size={16} />
          رجوع للرئيسية
        </button>
      </div>

      <header className="bg-slate-900 text-white p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-orange-500 mb-4">{currentCategory.label}</h1>
          <p className="text-slate-400 text-sm font-bold max-w-md mx-auto">{currentCategory.desc}</p>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-12">
        <AdBanner type="hero" />
        {isLoading ? (
          <div className="flex justify-center py-40"><Loader2 className="h-16 w-16 animate-spin text-orange-500" /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {offers?.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
          </div>
        )}
      </main>

      <Footer />

      <div className="fixed bottom-24 left-0 right-0 z-[90] px-4 pointer-events-none">
        <div className="max-w-screen-md mx-auto pointer-events-auto">
          <AdBanner type="hero" />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 z-[100]">
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
