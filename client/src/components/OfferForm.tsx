import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOfferSchema, type InsertOffer, type Offer } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateOffer, useUpdateOffer } from "@/hooks/use-offers";
import { Loader2, Tag, DollarSign, Store, Link as LinkIcon, Image as ImageIcon, Type, AlignLeft } from "lucide-react";

export function OfferForm({ offer, onSuccess }: { offer?: Offer, onSuccess?: () => void }) {
  const createMutation = useCreateOffer();
  const updateMutation = useUpdateOffer();
  const form = useForm<InsertOffer>({
    resolver: zodResolver(insertOfferSchema),
    defaultValues: offer || {
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

  const onSubmit = async (data: InsertOffer) => {
    if (offer) {
      await updateMutation.mutateAsync({ id: offer.id, ...data });
    } else {
      await createMutation.mutateAsync(data);
    }
    if (onSuccess) onSuccess();
  };

  const inputClasses = "bg-white border-slate-200 h-12 rounded-xl focus:ring-2 focus:ring-[#f97316]/20 transition-all text-sm pr-10 text-slate-900 placeholder:text-slate-400";
  const textAreaClasses = "bg-white border-slate-200 rounded-xl focus:ring-2 focus:ring-[#f97316]/20 transition-all text-sm p-4 text-slate-900 placeholder:text-slate-400 min-h-[120px]";

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
            <option value="home">المنزل والمطبخ</option>
            <option value="accessories">الساعات والإكسسوارات</option>
          </select>
        </div>

        <div className="relative md:col-span-2">
          <textarea 
            {...form.register("description")} 
            className="w-full bg-white border-slate-200 rounded-xl focus:ring-2 focus:ring-[#f97316]/20 transition-all text-sm p-4 text-slate-900 placeholder:text-slate-400 min-h-[80px]" 
            placeholder="وصف قصير للعرض..."
          />
        </div>

        <div className="relative md:col-span-2">
          <textarea 
            {...form.register("longDescription")} 
            className={textAreaClasses} 
            placeholder="وصف تفصيلي للعرض (يظهر في صفحة التفاصيل)..."
          />
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
          <Input {...form.register("imageUrl")} className={inputClasses} placeholder="رابط الصورة الرئيسية (رابط مباشر)" />
        </div>

        <div className="relative md:col-span-2 space-y-2">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-2">
            <ImageIcon size={14} />
            <span>صور إضافية لمعرض الصور (روابط مباشرة مفصولة بفاصلة)</span>
          </div>
          <Input 
            className={inputClasses} 
            placeholder="link1.jpg, link2.jpg, link3.jpg"
            onChange={(e) => {
              const urls = e.target.value.split(',').map(u => u.trim()).filter(u => u !== "");
              form.setValue("galleryUrls", urls);
            }}
          />
        </div>

        <div className="relative md:col-span-2">
          <LinkIcon className="absolute right-3 top-3.5 text-[#0f172a]" size={18} />
          <Input {...form.register("affiliateUrl")} className={inputClasses} placeholder="رابط شراء المنتج (رابط الأفلييت)" />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-14 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-900/10 active:scale-95 transition-all"
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
