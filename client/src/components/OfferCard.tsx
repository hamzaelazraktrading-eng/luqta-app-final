import { Offer } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";

interface OfferCardProps {
  offer: Offer;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function OfferCard({ offer, isAdmin, onDelete }: OfferCardProps) {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(`شاهد هذا العرض الرائع من لُقطة: ${offer.title}\n${offer.affiliateUrl || ''}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: offer.title,
        text: offer.description || '',
        url: offer.affiliateUrl || window.location.href,
      });
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -6 }} 
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col"
    >
      <Card className="overflow-hidden bg-white border-0 h-full flex flex-col rounded-[20px] shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/50">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <motion.img 
            src={offer.imageUrl} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute top-2 right-2 flex flex-col gap-1.5">
            {offer.discount && (
              <div className="bg-orange-500 text-white text-[10px] font-black px-2.5 py-1.5 rounded-xl shadow-lg shadow-orange-500/30">
                {offer.discount}% لُقطة
              </div>
            )}
          </div>
          <div className="absolute bottom-2 left-2 bg-[#121212]/80 backdrop-blur-md text-white text-[9px] px-2.5 py-1 rounded-lg font-bold border border-white/10">
            {offer.storeName || "عرض خاص"}
          </div>
          <button className="absolute top-2 left-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all shadow-md active:scale-90">
            <Heart size={16} />
          </button>
        </div>
        <CardContent className="p-3.5 text-right flex-1 flex flex-col justify-between" dir="rtl">
          <div>
            <h3 className="text-[13px] font-bold text-[#121212] line-clamp-2 mb-2 leading-snug h-[36px] overflow-hidden">{offer.title}</h3>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-black text-orange-600">{offer.newPrice} ر.س</span>
              {offer.oldPrice && (
                <span className="text-[10px] text-gray-400 line-through decoration-gray-400/50">{offer.oldPrice} ر.س</span>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button 
                onClick={() => offer.affiliateUrl && window.open(offer.affiliateUrl, '_blank')} 
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-[11px] h-10 rounded-xl font-black transition-all shadow-md active:scale-95"
              >
                اقتنص الآن
              </Button>
              <Button onClick={handleWhatsApp} variant="outline" className="w-10 h-10 p-0 border-green-100 bg-green-50 rounded-xl hover:bg-green-100 transition-all hover:scale-105 active:scale-90 flex items-center justify-center">
                <MessageCircle size={18} className="text-green-600" />
              </Button>
            </div>
            
            <Button onClick={handleShare} variant="ghost" className="w-full h-8 text-gray-400 hover:text-orange-500 text-[10px] gap-2 p-0 flex items-center justify-center">
              <Share2 size={12} />
              <span>مشاركة العرض</span>
            </Button>
          </div>

          {isAdmin && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
              <Button onClick={onDelete} variant="ghost" className="text-[10px] text-red-500 h-8 flex-1 hover:bg-red-50 font-bold">حذف لُقطة</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
