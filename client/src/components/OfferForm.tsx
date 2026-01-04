import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOfferSchema, type InsertOffer, type Offer } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Tag, Image as ImageIcon, Link as LinkIcon, Info, LayoutGrid, DollarSign, Type, Store } from "lucide-react";

export function OfferForm({ offer, onSuccess }: { offer?: Offer, onSuccess?: () => void }) {
  const { toast } = useToast();
  
  const mutation = useMutation({
    mutationFn: async (data: InsertOffer) => {
      const res = offer 
        ? await apiRequest("PATCH", `/api/offers/${offer.id}`, data)
        : await apiRequest("POST", "/api/offers", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/offers"] });
      toast({ title: offer ? "تم تحديث العرض بنجاح" : "تم إضافة العرض بنجاح" });
      if (onSuccess) onSuccess();
    },
  });

  const form = useForm<InsertOffer>({
    resolver: zodResolver(insertOfferSchema),
    defaultValues: offer ? {
      ...offer,
      galleryUrls: offer.galleryUrls || [],
    } : {
      title: "",
      description: "",
      longDescription: "",
      oldPrice: "",
      newPrice: "",
      discount: "",
      imageUrl: "",
      galleryUrls: [],
      category: "electronics",
      storeName: "",
      affiliateUrl: "",
    },
  });

  const inputClasses = "bg-slate-50 border-slate-200 h-12 rounded-xl focus:ring-2 focus:ring-orange-500/20 transition-all text-sm pr-10 text-slate-900 placeholder:text-slate-400";

  return (
    <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <Type className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input {...form.register("title")} className={inputClasses} placeholder="عنوان العرض" />
        </div>

        <div className="relative">
          <LayoutGrid className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <select 
            {...form.register("category")} 
            className={`${inputClasses} w-full appearance-none pr-10 bg-slate-50`}
          >
            <option value="electronics">إلكترونيات</option>
            <option value="perfumes">عطور</option>
            <option value="fashion">أزياء</option>
            <option value="home">المنزل والمطبخ</option>
            <option value="accessories">الساعات والإكسسوارات</option>
          </select>
        </div>

        <div className="relative">
          <DollarSign className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input {...form.register("newPrice")} className={inputClasses} placeholder="السعر الجديد (مثال: 100)" />
        </div>

        <div className="relative">
          <DollarSign className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input {...form.register("oldPrice")} className={inputClasses} placeholder="السعر القديم (اختياري)" />
        </div>

        <div className="relative">
          <Store className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input {...form.register("storeName")} className={inputClasses} placeholder="اسم المتجر" />
        </div>

        <div className="relative">
          <Tag className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input {...form.register("discount")} className={inputClasses} placeholder="نسبة الخصم" />
        </div>

        <div className="relative md:col-span-2">
          <ImageIcon className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input {...form.register("imageUrl")} className={inputClasses} placeholder="رابط صورة المنتج" />
        </div>

        <div className="relative md:col-span-2">
          <LinkIcon className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input {...form.register("affiliateUrl")} className={inputClasses} placeholder="رابط المتجر (الأفيلييت)" />
        </div>

        <div className="relative md:col-span-2">
          <Info className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input {...form.register("description")} className={inputClasses} placeholder="وصف قصير" />
        </div>

        <div className="relative md:col-span-2">
          <Textarea 
            {...form.register("longDescription")} 
            className="bg-slate-50 border-slate-200 min-h-[120px] rounded-xl text-slate-900 pr-4" 
            placeholder="وصف تفصيلي للعرض" 
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black text-lg shadow-xl active:scale-95 transition-all"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? <Loader2 className="animate-spin" /> : (offer ? "تحديث العرض" : "إضافة لُقطة جديدة")}
      </Button>
    </form>
  );
}
