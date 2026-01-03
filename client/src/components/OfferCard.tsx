import { Offer } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Share2, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "wouter";

interface OfferCardProps {
  offer: Offer;
  isAdmin?: boolean;
  onDelete?: () => void;
}

export function OfferCard({ offer, isAdmin, onDelete }: OfferCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some((f: any) => f.id === offer.id));
  }, [offer.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = encodeURIComponent(`شاهد هذا العرض الرائع من لُقطة: ${offer.title}\n${offer.affiliateUrl || ''}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <Link href={`/offer/${offer.id}`}>
      <motion.div 
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="w-full h-full cursor-pointer"
      >
        <Card className="overflow-hidden bg-white border border-slate-100 flex flex-col h-full rounded-[20px] shadow-sm hover:shadow-md transition-all">
          <div className="relative w-full aspect-square overflow-hidden bg-slate-50">
            <img 
              src={offer.imageUrl} 
              alt={offer.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/600x400/0f172a/f97316?text=Luqta+Offer";
              }}
            />
            {offer.discount && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-lg shadow-lg">
                {offer.discount}% خصم
              </div>
            )}
            <button 
              onClick={toggleFavorite}
              className={`absolute top-2 left-2 p-1.5 rounded-full backdrop-blur-md transition-colors ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-black/10 text-white hover:bg-white hover:text-red-500'}`}
            >
              <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>

          <CardContent className="p-2 flex-1 flex flex-col justify-between text-right" dir="rtl">
            <div>
              <span className="text-[7px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded mb-1 inline-block">
                {offer.storeName || "متجر موثوق"}
              </span>
              <h3 className="text-[10px] font-bold text-slate-800 line-clamp-1 mb-1 leading-tight">
                {offer.title}
              </h3>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-xs font-black text-[#0f172a]">{offer.newPrice} ر.س</span>
                {offer.oldPrice && (
                  <span className="text-[8px] text-slate-400 line-through decoration-red-400/30">{offer.oldPrice} ر.س</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 pt-1.5 border-t border-slate-50">
              <div className="flex gap-1">
                <Button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); offer.affiliateUrl && window.open(offer.affiliateUrl, '_blank'); }}
                  className="flex-1 bg-[#0f172a] hover:bg-[#f97316] text-white h-7 rounded-lg text-[9px] font-bold gap-1 transition-colors"
                >
                  <ShoppingCart size={10} />
                  اقتنص
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  variant="outline" 
                  className="w-7 h-7 p-0 border-green-100 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg"
                >
                  <MessageCircle size={14} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
