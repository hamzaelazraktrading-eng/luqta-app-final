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
    electronics: { label: "إلكترونيات", desc: "أقوى العروض التقنية" },
    perfumes: { label: "عالم العطور", desc: "تشكيلة فاخرة من العطور" },
    fashion: { label: "أزياء وموضة", desc: "أحدث صيحات الموضة" },
    home: { label: "المنزل والمطبخ", desc: "كل ما يحتاجه منزلك" },
    accessories: { label: "الساعات والإكسسوارات", desc: "أفخم الساعات" },
  };

  const currentCategory = categories[categoryId] || { label: "عروض متنوعة", desc: "استكشف أفضل الخصومات" };
  const { data: offers, isLoading } = useOffers({ category: categoryId });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-tajawal" dir="rtl">
      {/* تم إزالة التثبيت (sticky) من هنا */}
      <div className="p-4 bg-white border-b border-slate-100 flex items-center">
        <button 
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-xl font-black text-xs text-white shadow-md active:scale-95 transition-transform"
        >
          <ArrowRight size={16} />
          رجوع للرئيسية
        </button>
      </div>

      <header className="bg-slate-900 text-white p-10 text-center relative">
        <h1 className="text-3xl font-black text-orange-500 mb-2">{currentCategory.label}</h1>
        <p className="text-slate-400 text-sm font-bold">{currentCategory.desc}</p>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-8 min-h-[50vh]">
        <AdBanner type="hero" />
        {isLoading ? (
          <div className="flex justify-center py-40"><Loader2 className="h-12 w-12 animate-spin text-orange-500" /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {offers?.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
          </div>
        )}
      </main>

      <div className="flex flex-col">
        <div className="px-6 mb-4"><AdBanner type="footer" /></div>
        <BottomNav />
        <Footer />
      </div>
    </div>
  );
}
