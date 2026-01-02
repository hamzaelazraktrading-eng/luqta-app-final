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
    const text = encodeURIComponent(`شاهد هذا العرض الرائع من صيدات الخليج: ${offer.title}\n${offer.affiliateUrl || ''}`);
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
      whileHover={{ y: -8 }} 
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="overflow-hidden bg-white border-0 h-full flex flex-col rounded-[24px] shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img 
            src={offer.imageUrl} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {offer.discount && (
              <div className="bg-red-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                {offer.discount}% خصم
              </div>
            )}
          </div>
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#1a237e] text-[10px] px-3 py-1 rounded-full font-bold border border-white/20">
            {offer.storeName || "عروض حصرية"}
          </div>
          <button className="absolute top-3 left-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
            <Heart size={16} />
          </button>
        </div>
        <CardContent className="p-4 text-right flex-1 flex flex-col" dir="rtl">
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-2 leading-relaxed min-h-[40px]">{offer.title}</h3>
          
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-black text-[#1a237e]">{offer.newPrice} ر.س</span>
              {offer.oldPrice && (
                <span className="text-[11px] text-gray-400 line-through decoration-red-400/50">{offer.oldPrice} ر.س</span>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => offer.affiliateUrl && window.open(offer.affiliateUrl, '_blank')} 
                className="flex-1 bg-[#c5a059] hover:bg-[#b38f4d] text-[#1a237e] text-xs h-10 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                اقتنص العرض
              </Button>
              <Button onClick={handleShare} variant="outline" className="w-10 h-10 p-0 border-gray-100 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Share2 size={18} className="text-gray-600" />
              </Button>
              <Button onClick={handleWhatsApp} variant="outline" className="w-10 h-10 p-0 border-green-100 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                <MessageCircle size={18} className="text-green-600" />
              </Button>
            </div>
          </div>

          {isAdmin && (
            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
              <Button onClick={onDelete} variant="ghost" className="text-[11px] text-red-500 flex-1 hover:bg-red-50">حذف العرض</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
