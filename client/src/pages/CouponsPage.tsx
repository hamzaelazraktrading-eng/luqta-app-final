import { useState, useEffect } from "react";
import { Ticket, Loader2, Eye, Copy, Check, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";
import { useLocation } from "wouter";
// استيراد المكونات الحقيقية للإعلانات ووظيفة المكافأة
import { AdBanner, showRewardedAd } from "@/components/AdBanner";

import { useQuery } from "@tanstack/react-query";
import { Coupon } from "@shared/schema";

export default function CouponsPage() {
  const [unlocking, setUnlocking] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data: coupons, isLoading } = useQuery<Coupon[]>({
    queryKey: ["/api/coupons"],
  });

  const handleUnlock = (id: number) => {
    // تفعيل حالة التحميل بصرياً
    setUnlocking(id);

    // استدعاء إعلان المكافأة الحقيقي من AdMob
    showRewardedAd(() => {
      // هذا الجزء لا ينفذ إلا بعد انتهاء مشاهدة الإعلان
      setUnlocked([...unlocked, id]);
      setUnlocking(null);
      toast({ 
        title: "تم فتح الكود بنجاح!", 
        description: "شكراً لدعمك التطبيق بمشاهدة الإعلان." 
      });
    });
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    toast({ title: "تم نسخ الكود!" });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-tajawal" dir="rtl">
      <header className="bg-[#0f172a] text-white p-8 shadow-2xl rounded-b-[3rem] text-center relative mb-10">
        <div className="absolute top-6 right-6">
          <button 
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 px-4 py-2 bg-[#f97316] rounded-xl border border-white/10 text-white hover:bg-[#ea580c] transition-all text-xs font-bold shadow-lg"
          >
            <ArrowRight size={16} />
            رجوع للرئيسية
          </button>
        </div>
        <div className="mt-12">
          <h1 className="text-3xl font-bold text-[#f97316]">كوبونات اليوم</h1>
          <p className="text-white/50 text-sm mt-2 font-medium">شاهد إعلان قصير لكشف الكود</p>
        </div>
      </header>

      <main className="p-6 space-y-6 max-w-screen-md mx-auto min-h-[50vh]">
        {/* إعلان بانر علوي */}
        <AdBanner />

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-[#f97316]" /></div>
        ) : coupons?.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-bold bg-white rounded-[2rem] shadow-sm">لا توجد كوبونات متاحة حالياً</div>
        ) : (
          coupons?.map((coupon) => (
            <motion.div 
              key={coupon.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col gap-4 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-2 h-full bg-[#f97316]/20" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#f97316] border border-orange-100">
                    <Ticket size={28} />
                  </div>
                  <div>
                    <h3 className="font-black text-[#0f172a] text-lg leading-none">{coupon.store}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-sm text-[#f97316] font-black">{coupon.discount}% خصم</p>
                      <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-full">
                        <Clock size={10} />
                        ينتهي قريباً
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-bold leading-relaxed">{coupon.description}</p>

              <div className="mt-2 pt-4 border-t border-dashed border-gray-200">
                {unlocked.includes(coupon.id) ? (
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-50 px-6 py-3 rounded-2xl border-2 border-dashed border-orange-200 font-mono font-bold text-[#0f172a] text-center text-lg tracking-widest uppercase">
                      {coupon.code}
                    </div>
                    <Button variant="outline" size="icon" onClick={() => copyCode(coupon.code)} className="h-14 w-14 rounded-2xl border-gray-200">
                      {copied === coupon.code ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => handleUnlock(coupon.id)} 
                    disabled={unlocking === coupon.id}
                    className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-2xl h-14 font-black shadow-lg gap-3"
                  >
                    {unlocking === coupon.id ? <Loader2 className="animate-spin" size={20} /> : <Eye size={20} />}
                    {unlocking === coupon.id ? "جاري تشغيل الإعلان..." : "كشف كود الخصم (إعلان)"}
                  </Button>
                )}
              </div>
            </motion.div>
          ))
        )}

        {/* إعلان بانر سفلي */}
        <AdBanner />
      </main>

      <div className="flex flex-col mt-10">
        <BottomNav />
        <Footer />
      </div>
    </div>
  );
}
