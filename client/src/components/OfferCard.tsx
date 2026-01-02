import { Offer } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

interface OfferCardProps {
  offer: Offer;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function OfferCard({ offer, isAdmin, onEdit, onDelete }: OfferCardProps) {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(`مرحباً صيدات الخليج، أود الاستفسار عن: ${offer.title}`);
    window.open(`https://wa.me/966XXXXXXXXX?text=${text}`, '_blank');
  };

  return (
    <motion.div whileHover={{ y: -5 }} className="h-full">
      <Card className="overflow-hidden bg-white border border-gray-100 h-full flex flex-col rounded-[20px] shadow-sm">
        <div className="relative aspect-square">
          <img src={offer.imageUrl} className="w-full h-full object-cover" />
          {offer.discount && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">
              {offer.discount}% خصم
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-white/90 text-[#1a237e] text-[10px] px-2 py-1 rounded font-bold">
            {offer.storeName || "متجر"}
          </div>
        </div>
        <CardContent className="p-3 text-right" dir="rtl">
          <h3 className="text-xs font-bold text-gray-800 line-clamp-2 mb-2">{offer.title}</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-black text-[#1a237e]">{offer.newPrice} ر.س</span>
            {offer.oldPrice && <span className="text-[10px] text-gray-400 line-through">{offer.oldPrice} ر.س</span>}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => offer.affiliateUrl && window.open(offer.affiliateUrl, '_blank')} className="flex-1 bg-[#1a237e] text-white text-[10px] h-9 rounded-lg">
              اقتنص العرض
            </Button>
            <Button onClick={handleWhatsApp} variant="outline" className="w-10 h-9 p-0 border-green-200 bg-green-50">
              <MessageCircle size={18} className="text-green-600" />
            </Button>
          </div>
          {isAdmin && (
            <div className="flex gap-2 mt-2 pt-2 border-t border-gray-50">
              <Button onClick={onDelete} variant="ghost" className="text-[10px] text-red-500 flex-1">حذف</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
