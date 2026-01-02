import { useState } from "react";
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
    }, 3000);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    toast({ title: "تم نسخ الكود!" });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-40 font-tajawal" dir="rtl">
      <header className="bg-[#312E81] text-white p-8 shadow-2xl rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <h1 className="text-3xl font-black text-indigo-100 relative z-10">كوبونات اليوم</h1>
        <p className="text-indigo-200/60 text-sm mt-2 font-medium relative z-10">أكواد خصم حصرية بانتظارك</p>
      </header>

      <main className="p-6 space-y-6 -mt-6">
        <AdBanner type="hero" />
        {coupons.map((coupon) => (
          <motion.div 
            key={coupon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-indigo-50/50 flex flex-col gap-4 relative overflow-hidden group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-[#312E81] group-hover:scale-110 transition-transform">
                  <Ticket size={28} />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-lg">{coupon.store}</h3>
                  <p className="text-sm text-[#F97316] font-black">{coupon.discount}</p>
                </div>
              </div>
              <div className="text-left">
                 <p className="text-[10px] text-slate-400 font-bold mb-1">القسم</p>
                 <span className="bg-slate-50 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500">منوع</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 font-medium">{coupon.desc}</p>
            
            <div className="mt-2 pt-4 border-t border-dashed border-indigo-100 flex items-center justify-between">
              {unlocked.includes(coupon.id) ? (
                <div className="flex-1 flex gap-2">
                  <div className="flex-1 bg-indigo-50/50 px-6 py-3 rounded-2xl border-2 border-dashed border-indigo-100 font-mono font-black text-[#312E81] text-center text-lg tracking-widest">
                    {coupon.code}
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => copyCode(coupon.code)}
                    className="h-14 w-14 rounded-2xl border-indigo-100 bg-indigo-50/30 text-[#312E81] hover:bg-indigo-50"
                  >
                    {copied === coupon.code ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => handleUnlock(coupon.id)}
                  disabled={unlocking === coupon.id}
                  className="w-full bg-[#312E81] hover:bg-[#1e1b4b] text-white rounded-[1.5rem] h-14 font-black shadow-lg shadow-indigo-900/10 gap-3"
                >
                  {unlocking === coupon.id ? <Loader2 className="animate-spin" size={20} /> : <Eye size={20} />}
                  {unlocking === coupon.id ? "جاري الفتح..." : "شاهد الإعلان لفتح الكود"}
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </main>
      <AdBanner type="footer" />
      <BottomNav />
    </div>
  );
}
