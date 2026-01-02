import { useState, useEffect } from "react";
import { Ticket, Loader2, Eye, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav, AdBanner } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

export default function CouponsPage() {
  const [unlocking, setUnlocking] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const coupons = [
    { id: 1, store: "أمازون", code: "AMZ50", discount: "خصم 50%", desc: "على كافة المنتجات الإلكترونية" },
    { id: 2, store: "نون", code: "NOON10", discount: "خصم 10%", desc: "لمستلزمات المنزل والمطبخ" },
    { id: 3, store: "نامشي", code: "NAM20", discount: "خصم 20%", desc: "على أرقى صيحات الموضة" },
  ];

  const handleUnlock = (id: number) => {
    setUnlocking(id);
    setTimeout(() => {
      setUnlocked([...unlocked, id]);
      setUnlocking(null);
      toast({ title: "تم فتح الكود بنجاح!" });
    }, 2000);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    toast({ title: "تم نسخ الكود!" });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-[140px] font-tajawal" dir="rtl">
      <header className="bg-[#0f172a] text-white p-8 shadow-2xl rounded-b-[3rem] text-center">
        <h1 className="text-3xl font-bold text-[#f97316]">كوبونات اليوم</h1>
        <p className="text-white/50 text-sm mt-2 font-medium">أكواد خصم حصرية بانتظارك</p>
      </header>

      <main className="p-6 space-y-6 -mt-6">
        <AdBanner type="hero" />
        {coupons.map((coupon) => (
          <motion.div 
            key={coupon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#f97316]">
                  <Ticket size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-[#0f172a] text-lg">{coupon.store}</h3>
                  <p className="text-sm text-[#f97316] font-bold">{coupon.discount}</p>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 font-medium">{coupon.desc}</p>
            
            <div className="mt-2 pt-4 border-t border-dashed border-gray-100">
              {unlocked.includes(coupon.id) ? (
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-50 px-6 py-3 rounded-2xl border-2 border-dashed border-gray-100 font-mono font-bold text-[#0f172a] text-center text-lg tracking-widest">
                    {coupon.code}
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => copyCode(coupon.code)}
                    className="h-14 w-14 rounded-2xl border-gray-100 text-[#0f172a]"
                  >
                    {copied === coupon.code ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => handleUnlock(coupon.id)}
                  disabled={unlocking === coupon.id}
                  className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-2xl h-14 font-bold shadow-lg gap-3 active:scale-95 transition-all"
                >
                  {unlocking === coupon.id ? <Loader2 className="animate-spin" size={20} /> : <Eye size={20} />}
                  {unlocking === coupon.id ? "جاري الفتح..." : "فتح الكوبون"}
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col pointer-events-none">
        <div className="pointer-events-auto">
          <AdBanner type="footer" />
        </div>
        <div className="pointer-events-auto">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
