import { Offer } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface OfferCardProps {
  offer: Offer;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function OfferCard({ offer, isAdmin, onEdit, onDelete }: OfferCardProps) {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(`مرحباً، أود الاستفسار عن العرض: ${offer.title}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden bg-card border-none h-full flex flex-col group">
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Discount Badge */}
          {offer.discount && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 shadow-lg">
                {offer.discount} خصم
              </Badge>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm text-white border-none">
              {offer.category}
            </Badge>
          </div>

          {/* Image with overlay on hover */}
          <div className="w-full h-full relative">
            <img 
              src={offer.imageUrl} 
              alt={offer.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80"; // Fallback placeholder
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          </div>
        </div>

        <CardContent className="p-5 flex-grow">
          <h3 className="text-xl font-bold font-heading text-primary line-clamp-2 mb-2 group-hover:text-primary/80 transition-colors">
            {offer.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
            {offer.description}
          </p>
          
          <div className="flex items-end gap-3 mt-auto">
            <span className="text-2xl font-bold text-white">{offer.newPrice}</span>
            {offer.oldPrice && (
              <span className="text-sm text-muted-foreground/60 line-through mb-1">
                {offer.oldPrice}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 gap-2">
          {isAdmin ? (
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1" onClick={onEdit}>تعديل</Button>
              <Button variant="destructive" className="flex-1" onClick={onDelete}>حذف</Button>
            </div>
          ) : (
            <Button 
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold shadow-lg shadow-green-900/20"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="ml-2 h-5 w-5" />
              اطلب عبر واتساب
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
