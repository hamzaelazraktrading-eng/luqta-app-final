import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOfferSchema, type InsertOffer, type Offer } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function OfferForm({ offer, onSuccess }: { offer?: Offer, onSuccess?: () => void }) {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      // 1. معالجة روابط الصور الإضافية لتحويلها من نص إلى مصفوفة نظيفة
      let galleryArray: string[] = [];
      if (data.galleryUrls && typeof data.galleryUrls === 'string') {
        galleryArray = data.galleryUrls.split('\n').map((u: string) => u.trim()).filter((u: string) => u !== "");
      } else if (Array.isArray(data.galleryUrls)) {
        galleryArray = data.galleryUrls;
      }

      // 2. تجهيز الكائن النهائي للإرسال مع التأكد من أنواع البيانات
      const finalData = {
        ...data,
        oldPrice: String(data.oldPrice || ""),
        newPrice: String(data.newPrice || ""),
        discount: String(data.discount || ""),
        galleryUrls: galleryArray, // إرسالها كمصفوفة حصراً
      };

      const res = offer 
        ? await apiRequest("PATCH", `/api/offers/${offer.id}`, finalData)
        : await apiRequest("POST", "/api/offers", finalData);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "فشلت عملية الحفظ");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/offers"] });
      toast({ title: "تم نشر العرض بنجاح! 🚀" });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      console.error("خطأ في الإرسال:", error);
      toast({ 
        title: "لم يتم إضافة العرض", 
        description: "تأكد من ملء جميع الحقول والروابط بشكل صحيح",
        variant: "destructive" 
      });
    }
  });

  const form = useForm({
    defaultValues: offer ? {
      ...offer,
      galleryUrls: Array.isArray(offer.galleryUrls) ? offer.galleryUrls.join('\n') : ""
    } : {
      title: "", description: "عرض حصري لفترة محدودة", longDescription: "", 
      oldPrice: "", newPrice: "", discount: "", 
      imageUrl: "", galleryUrls: "", category: "electronics",
      storeName: "", affiliateUrl: "",
    },
  });

  const fieldStyle = "w-full p-4 border-2 border-slate-200 rounded-2xl focus:border-orange-500 outline-none text-right text-black font-bold bg-white mb-4 shadow-sm";

  return (
    <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="p-1" dir="rtl">
      <div className="space-y-1">

        <label className="block text-sm font-black mb-1 mr-2 text-slate-700">عنوان العرض</label>
        <input {...form.register("title", { required: true })} className={fieldStyle} placeholder="مثال: سماعة ابل ايربودز برو" />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-black mb-1 mr-2 text-slate-700">السعر الجديد</label>
            <input {...form.register("newPrice", { required: true })} className={fieldStyle} placeholder="مثال: 899" />
          </div>
          <div>
            <label className="block text-sm font-black mb-1 mr-2 text-slate-700">السعر القديم</label>
            <input {...form.register("oldPrice")} className={fieldStyle} placeholder="مثال: 1200" />
          </div>
        </div>

        <label className="block text-sm font-black mb-1 mr-2 text-slate-700">اسم المتجر</label>
        <input {...form.register("storeName", { required: true })} className={fieldStyle} placeholder="نون، جرير، أمازون..." />

        <label className="block text-sm font-black mb-1 mr-2 text-orange-600">رابط الصورة الرئيسية</label>
        <textarea {...form.register("imageUrl", { required: true })} className={`${fieldStyle} h-20 border-orange-200`} placeholder="الصق رابط الصورة هنا..." />

        <label className="block text-sm font-black mb-1 mr-2 text-slate-700">صور إضافية (رابط في كل سطر)</label>
        <textarea {...form.register("galleryUrls")} className={`${fieldStyle} h-28`} placeholder="رابط صورة 1&#10;رابط صورة 2" />

        <label className="block text-sm font-black mb-1 mr-2 text-orange-600">رابط الأفلييت / المنتج</label>
        <textarea {...form.register("affiliateUrl", { required: true })} className={`${fieldStyle} h-20 border-orange-200`} placeholder="الصق رابط شراء المنتج هنا..." />

        <label className="block text-sm font-black mb-1 mr-2 text-slate-700">وصف العرض</label>
        <textarea {...form.register("longDescription")} className={`${fieldStyle} h-32`} placeholder="اكتب تفاصيل العرض هنا..." />
      </div>

      <Button 
        type="submit" 
        className="w-full h-16 bg-orange-600 hover:bg-orange-700 text-white text-xl font-black rounded-2xl mt-4 shadow-xl active:scale-95 transition-transform"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? <Loader2 className="animate-spin" /> : "إضافة العرض الآن ✨"}
      </Button>
    </form>
  );
}
