import { useState } from "react";
import { Ticket, Loader2, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BottomNav, AdBanner } from "@/components/Navigation";

export default function CouponsPage() {
  const [unlocking, setUnlocking] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState<number[]>([]);

  const coupons = [
    { id: 1, store: "Amazon", code: "AMZ50", discount: "50%" },
    { id: 2, store: "Noon", code: "NOON10", discount: "10%" },
    { id: 3, store: "Namshi", code: "NAM20", discount: "20%" },
  ];

  const handleUnlock = (id: number) => {
    setUnlocking(id);
    setTimeout(() => {
      setUnlocked([...unlocked, id]);
      setUnlocking(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32 font-tajawal" dir="rtl">
      <header className="bg-[#0f172a] text-white p-6 shadow-xl text-center">
        <h1 className="text-2xl font-black text-orange-500">كوبونات اليوم</h1>
        <p className="text-white/50 text-xs mt-1">شاهد الإعلان لفتح الكود</p>
      </header>

      <main className="p-6 space-y-4">
        <AdBanner type="hero" />
        {coupons.map((coupon) => (
          <motion.div 
            key={coupon.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-50/50 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                <Ticket size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{coupon.store}</h3>
                <p className="text-xs text-green-600 font-bold">خصم {coupon.discount}</p>
              </div>
            </div>
            
            {unlocked.includes(coupon.id) ? (
              <div className="bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 font-mono font-bold text-indigo-600">
                {coupon.code}
              </div>
            ) : (
              <Button 
                onClick={() => handleUnlock(coupon.id)}
                disabled={unlocking === coupon.id}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-10 px-4 gap-2"
              >
                {unlocking === coupon.id ? <Loader2 className="animate-spin" size={16} /> : <Eye size={16} />}
                {unlocking === coupon.id ? "جاري الفتح..." : "فتح الكود"}
              </Button>
            )}
          </motion.div>
        ))}
      </main>
      <BottomNav />
    </div>
  );
}
