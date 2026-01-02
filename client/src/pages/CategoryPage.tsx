import { useOffers } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { Loader2, ArrowRight } from "lucide-react";
import { BottomNav, AdBanner } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useRoute, useLocation } from "wouter";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:category");
  const [, setLocation] = useLocation();
  const categoryId = params?.category || "all";
  
  const categories: Record<string, { label: string, desc: string }> = {
    electronics: { label: "إلكترونيات", desc: "أقوى العروض التقنية المختارة بعناية من أفضل المتاجر" },
    perfumes: { label: "عالم العطور", desc: "تشكيلة فاخرة من العطور العالمية بخصومات حصرية" },
    fashion: { label: "أزياء وموضة", desc: "أحدث صيحات الموضة والأزياء لجميع أفراد العائلة" },
    home: { label: "المطبخ", desc: "كل ما يحتاجه منزلك ومطبخك بأسعار لا تقبل المنافسة" },
  };

  const currentCategory = categories[categoryId] || { label: "عروض متنوعة", desc: "استكشف مجموعة مختارة من أفضل العروض والخصومات" };
  const { data: offers, isLoading } = useOffers({ category: categoryId });

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0f172a] font-tajawal" dir="rtl">
      <header className="bg-[#0f172a] text-white p-8 shadow-2xl rounded-b-[3rem] relative flex flex-col items-center justify-center gap-4">
        <button 
          onClick={() => setLocation("/")}
          className="absolute top-8 right-6 flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-white/80 hover:bg-white/20 transition-all text-xs font-bold"
        >
          <ArrowRight size={16} />
          رجوع للرئيسية
        </button>
        <h1 className="text-3xl font-bold text-[#f97316] mb-2">{currentCategory.label}</h1>
        <p className="text-white/40 text-xs font-medium text-center">{currentCategory.desc}</p>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <AdBanner type="hero" />
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-[#f97316]" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers?.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
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
