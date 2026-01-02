import { Offer } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
    <motion.div 
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="h-full flex flex-col"
    >
      <Card className="overflow-hidden bg-white/70 backdrop-blur-md border border-white h-full flex flex-col rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-square overflow-hidden group">
          <motion.img 
            src={offer.imageUrl} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4">
            {offer.discount && (
              <div className="bg-[#f97316] text-white text-[10px] font-bold px-3 py-1.5 rounded-2xl shadow-lg">
                خصم {offer.discount}%
              </div>
            )}
          </div>
          <motion.button 
            whileTap={{ scale: 0.8 }}
            onClick={(e) => { e.preventDefault(); toggleFavorite(); }}
            className={`absolute top-4 left-4 w-10 h-10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-md transition-colors ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400'}`}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </motion.button>
        </div>
        
        <CardContent className="p-5 text-right flex-1 flex flex-col justify-between" dir="rtl">
          <div>
            <h3 className="text-sm font-bold text-[#0f172a] line-clamp-2 mb-3 leading-relaxed h-[40px]">{offer.title}</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-[#0f172a]">{offer.newPrice} ر.س</span>
              {offer.oldPrice && (
                <span className="text-[11px] text-gray-400 line-through font-medium">{offer.oldPrice} ر.س</span>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button 
                asChild
                className="flex-1 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs h-12 rounded-2xl font-bold active:scale-95 transition-all"
              >
                <a href={offer.affiliateUrl || '#'} target="_blank" rel="noopener noreferrer">اقتنص العرض</a>
              </Button>
              <Button onClick={handleWhatsApp} variant="outline" className="w-12 h-12 p-0 border-green-100 bg-green-50 rounded-2xl hover:bg-green-100 active:scale-95 transition-all">
                <MessageCircle size={22} className="text-green-600" />
              </Button>
            </div>
            
            <motion.div 
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center py-2 px-4 rounded-full border border-indigo-100 bg-white text-[10px] text-[#0f172a] gap-2 hover:bg-indigo-50 transition-colors cursor-pointer shadow-sm"
            >
              <Share2 size={14} />
              <span className="font-bold">مشاركة العرض</span>
            </motion.div>
          </div>
          
          {isAdmin && (
            <Button onClick={onDelete} variant="ghost" className="mt-4 text-[10px] text-red-500 h-8 w-full hover:bg-red-50 rounded-xl">حذف العرض</Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
