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

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="h-full flex flex-col"
    >
      <Card className="overflow-hidden bg-white/70 backdrop-blur-md border border-white/20 h-full flex flex-col rounded-3xl shadow-lg transition-all duration-300">
        <div className="relative aspect-square overflow-hidden group">
          <motion.img 
            src={offer.imageUrl} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            {offer.discount && (
              <div className="bg-[#f97316] text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                خصم {offer.discount}%
              </div>
            )}
          </div>
          <button className="absolute top-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 shadow-md">
            <Heart size={18} />
          </button>
        </div>
        
        <CardContent className="p-4 text-right flex-1 flex flex-col justify-between" dir="rtl">
          <div>
            <h3 className="text-sm font-bold text-slate-800 line-clamp-2 mb-3 leading-relaxed h-[40px]">{offer.title}</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-black text-[#4f46e5]">{offer.newPrice} ر.س</span>
              {offer.oldPrice && (
                <span className="text-[11px] text-gray-400 line-through">{offer.oldPrice} ر.س</span>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button 
                onClick={() => offer.affiliateUrl && window.open(offer.affiliateUrl, '_blank')} 
                className="flex-1 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs h-11 rounded-2xl font-bold shadow-indigo-200 shadow-lg"
              >
                اقتنص العرض
              </Button>
              <Button onClick={handleWhatsApp} variant="outline" className="w-11 h-11 p-0 border-green-100 bg-green-50 rounded-2xl hover:bg-green-100">
                <MessageCircle size={20} className="text-green-600" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center py-2 px-4 rounded-xl border border-slate-100 bg-slate-50/50 text-[10px] text-slate-400 gap-2 hover:bg-indigo-50 hover:text-indigo-500 transition-colors cursor-pointer shadow-sm">
              <Share2 size={12} />
              <span className="font-bold">مشاركة العرض</span>
            </div>
          </div>
          
          {isAdmin && (
            <Button onClick={onDelete} variant="ghost" className="mt-4 text-[10px] text-red-500 h-8 w-full hover:bg-red-50">حذف العرض</Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
