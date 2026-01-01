import { useState } from "react";
import { useOffers } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { data: offers, isLoading, error } = useOffers({ search, category });

  const categories = [
    { id: "all", label: "الكل" },
    { id: "electronics", label: "إلكترونيات" },
    { id: "perfumes", label: "عطور" },
    { id: "fashion", label: "أزياء" },
    { id: "food", label: "مأكولات" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto relative z-10 text-center max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black font-heading mb-6 leading-tight"
          >
            اكتشف أفضل <span className="text-gold-gradient">العروض الحصرية</span> في الخليج
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed"
          >
            وجهتك الأولى للتوفير. نجمع لك أفضل الخصومات والصفقات المميزة في مكان واحد.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2 max-w-xl mx-auto bg-card/50 p-2 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm"
          >
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                className="pr-10 bg-transparent border-none h-12 text-lg focus-visible:ring-0 placeholder:text-muted-foreground/50"
                placeholder="ابحث عن عرض..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button size="lg" className="h-12 px-8 rounded-xl">بحث</Button>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="container mx-auto px-4 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={category === cat.id ? "default" : "outline"}
              onClick={() => setCategory(cat.id)}
              className={`rounded-full px-6 transition-all duration-300 ${category === cat.id ? 'shadow-lg shadow-primary/20 scale-105' : 'bg-card border-white/5 hover:border-primary/50'}`}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Offers Grid */}
      <section className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive text-lg">حدث خطأ أثناء تحميل العروض</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>إعادة المحاولة</Button>
          </div>
        ) : offers?.length === 0 ? (
          <div className="text-center py-20 bg-card/30 rounded-3xl border border-dashed border-white/10">
            <p className="text-muted-foreground text-lg">لا توجد عروض مطابقة لبحثك</p>
            <Button variant="link" onClick={() => { setSearch(""); setCategory("all"); }} className="mt-2 text-primary">
              عرض كل العروض
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {offers?.map((offer, index) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}
