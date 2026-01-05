import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCouponSchema, type InsertCoupon, type Coupon } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Store, Ticket, Tag, Calendar, AlignLeft } from "lucide-react";

export function CouponForm({ coupon, onSuccess }: { coupon?: Coupon, onSuccess?: () => void }) {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: InsertCoupon) => {
      // تأكد من إرسال البيانات بشكل صحيح للخادم
      const res = coupon 
        ? await apiRequest("PATCH", `/api/coupons/${coupon.id}`, data)
        : await apiRequest("POST", "/api/coupons", data);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "فشل حفظ الكوبون");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/coupons"] });
      toast({ title: coupon ? "تم تحديث الكوبون بنجاح" : "تم إضافة الكوبون بنجاح" });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast({ 
        title: "خطأ في الإضافة", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const form = useForm<InsertCoupon>({
    resolver: zodResolver(insertCouponSchema),
    defaultValues: coupon ? {
      ...coupon,
      expiryDate: new Date(coupon.expiryDate).toISOString().split('T')[0] as any
    } : {
      store: "",
      code: "",
      discount: "",
      description: "",
      expiryDate: new Date().toISOString().split('T')[0] as any,
    },
  });

  // كلاس محسّن للنصوص باللون الأسود العميق وخلفية بيضاء صريحة
  const inputClasses = "bg-white border-slate-300 h-12 rounded-xl focus:ring-2 focus:ring-orange-500/20 transition-all text-sm pr-10 text-[#0f172a] font-bold placeholder:text-slate-400";

  // دالة لضمان تفعيل اللصق يدوياً
  const handlePaste = (e: React.ClipboardEvent) => {
    e.stopPropagation();
  };

  return (
    <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* اسم المتجر */}
        <div className="relative">
          <Store className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input 
            {...form.register("store")} 
            className={inputClasses} 
            placeholder="اسم المتجر (مثال: أمازون)" 
            onPaste={handlePaste}
          />
        </div>

        {/* كود الخصم */}
        <div className="relative">
          <Ticket className="absolute right-3 top-3.5 text-[#f97316]" size={18} />
          <Input 
            {...form.register("code")} 
            className={`${inputClasses} border-orange-100 bg-orange-50/20`} 
            placeholder="كود الخصم (مثال: AMZ50)" 
            onPaste={handlePaste}
          />
        </div>

        {/* قيمة الخصم */}
        <div className="relative">
          <Tag className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input 
            {...form.register("discount")} 
            className={inputClasses} 
            placeholder="قيمة الخصم (مثال: خصم 50%)" 
            onPaste={handlePaste}
          />
        </div>

        {/* تاريخ الانتهاء */}
        <div className="relative">
          <Calendar className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input 
            type="date" 
            {...form.register("expiryDate")} 
            className={inputClasses}
            onPaste={handlePaste}
          />
        </div>

        {/* وصف الكوبون */}
        <div className="relative md:col-span-2">
          <AlignLeft className="absolute right-3 top-3.5 text-slate-400" size={18} />
          <Input 
            {...form.register("description")} 
            className={inputClasses} 
            placeholder="وصف الكوبون (مثال: على كافة المنتجات)" 
            onPaste={handlePaste}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-14 bg-[#0f172a] hover:bg-slate-800 text-white rounded-xl font-black text-lg shadow-xl active:scale-95 transition-all"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          coupon ? "تحديث الكوبون" : "إضافة الكوبون الآن"
        )}
      </Button>
    </form>
  );
}
