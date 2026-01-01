import { useQuery } from "@tanstack/react-query";
import { Offer } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, Share2, WhatsApp } from "lucide-react";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: offers, isLoading } = useQuery<Offer[]>({
    queryKey: ["/api/offers"],
  });

  const filteredOffers = offers?.filter(offer => 
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shareOnWhatsApp = (offer: Offer) => {
    const text = `شاهد هذا العرض الرائع من صيدات الخليج: ${offer.title} بسعر ${offer.newPrice} ريال بدلاً من ${offer.oldPrice} ريال!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-white dir-rtl" dir="rtl">
      {/* Hero Section */}
      <header className="bg-[#0a192f] border-b border-[#d4af37]/20 py-8 px-4 text-center">
        <h1 className="text-4xl font-bold text-[#d4af37] mb-2 font-cairo">صيدات الخليج</h1>
        <p className="text-gray-400">وجهتك الأولى لأفضل العروض والخصومات في الخليج</p>
        
        <div className="max-w-md mx-auto mt-8 relative">
          <Search className="absolute right-3 top-3 text-[#d4af37]" />
          <Input 
            className="bg-[#112240] border-[#d4af37]/30 text-white pr-10 focus:border-[#d4af37]"
            placeholder="ابحث عن العروض..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Card key={i} className="bg-[#112240] border-[#d4af37]/10 animate-pulse h-96" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers?.map((offer) => (
              <Card key={offer.id} className="bg-[#112240] border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={offer.imageUrl} 
                    alt={offer.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-[#d4af37] text-[#0a192f] font-bold px-2 py-1 rounded-md">
                    {offer.discount}% خصم
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="text-sm text-[#d4af37] mb-1">{offer.category}</div>
                  <h3 className="text-xl font-bold">{offer.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm line-clamp-2">{offer.description}</p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#d4af37]">{offer.newPrice} ريال</span>
                    <span className="text-sm text-gray-500 line-through">{offer.oldPrice} ريال</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    className="flex-1 bg-[#d4af37] hover:bg-[#b8962f] text-[#0a192f] font-bold"
                    onClick={() => shareOnWhatsApp(offer)}
                  >
                    <Share2 className="ml-2 h-4 w-4" />
                    مشاركة
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
