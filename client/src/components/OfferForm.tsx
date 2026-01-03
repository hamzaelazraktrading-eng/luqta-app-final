import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOfferSchema, type InsertOffer, type Offer } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateOffer, useUpdateOffer } from "@/hooks/use-offers";
import { Loader2, Tag, DollarSign, Store, Link as LinkIcon, Image as ImageIcon, Type } from "lucide-react";

export function OfferForm({ offer, onSuccess }: { offer?: Offer, onSuccess?: () => void }) {
  const createMutation = useCreateOffer();
  const updateMutation = useUpdateOffer();
  const form = useForm<InsertOffer>({
    resolver: zodResolver(insertOfferSchema),
    defaultValues: offer || {
      title: "",
      description: "",
      oldPrice: "",
      newPrice: "",
      discount: "",
      imageUrl: "",
      category: "electronics",
      storeName: "",
      affiliateUrl: "",
    },
  });

  const onSubmit = async (data: InsertOffer) => {
    if (offer) {
      await updateMutation.mutateAsync({ id: offer.id, ...data });
    } else {
      await createMutation.mutateAsync(data);
    }
    if (onSuccess) onSuccess();
  };

  const inputClasses = "bg-white border-slate-200 h-12 rounded-xl focus:ring-2 focus:ring-[#f97316]/20 transition-all text-sm pr-10 text-slate-900 placeholder:text-slate-400";

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <Type className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input {...form.register("title")} className={inputClasses} placeholder="عنوان العرض (مثال: خصم 50% على آيفون)" />
        </div>
        
        <div className="relative">
          <Tag className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <select 
            {...form.register("category")} 
            className="w-full bg-white border-slate-200 h-12 rounded-xl px-4 pr-10 focus:ring-2 focus:ring-[#f97316]/20 transition-all text-sm appearance-none text-slate-900"
          >
            <option value="electronics">إلكترونيات</option>
            <option value="perfumes">عطور</option>
            <option value="fashion">أزياء</option>
            <option value="home">المطبخ</option>
          </select>
        </div>

        <div className="relative">
          <DollarSign className="absolute right-3 top-3.5 text-green-600" size={18} />
          <Input {...form.register("newPrice")} className={inputClasses} placeholder="السعر الجديد (مثال: 199)" />
        </div>

        <div className="relative">
          <DollarSign className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input {...form.register("oldPrice")} className={inputClasses} placeholder="السعر قبل الخصم" />
        </div>

        <div className="relative">
          <Store className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input {...form.register("storeName")} className={inputClasses} placeholder="اسم المتجر (أمازون، نون...)" />
        </div>

        <div className="relative">
          <Tag className="absolute right-3 top-3.5 text-red-500" size={18} />
          <Input {...form.register("discount")} className={inputClasses} placeholder="نسبة الخصم (مثال: 50)" />
        </div>

        <div className="relative md:col-span-2">
          <ImageIcon className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input {...form.register("imageUrl")} className={inputClasses} placeholder="رابط صورة المنتج (رابط مباشر)" />
        </div>

        <div className="relative md:col-span-2">
          <LinkIcon className="absolute right-3 top-3.5 text-[#0f172a]" size={18} />
          <Input {...form.register("affiliateUrl")} className={inputClasses} placeholder="رابط شراء المنتج (رابط الأفلييت)" />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-14 bg-[#1a237e] hover:bg-[#0d144d] text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-900/10 active:scale-95 transition-all"
        disabled={createMutation.isPending || updateMutation.isPending}
      >
        {createMutation.isPending || updateMutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          offer ? "تحديث العرض" : "نشر العرض الآن"
        )}
      </Button>
    </form>
  );
}
