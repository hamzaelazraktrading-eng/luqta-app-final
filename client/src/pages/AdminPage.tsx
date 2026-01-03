import { useOffers, useDeleteOffer } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { OfferForm } from "@/components/OfferForm";
import { CouponForm } from "@/components/CouponForm";
import { useState } from "react";
import { Loader2, Plus, LayoutDashboard, TrendingUp, Tag, LogOut, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

export default function AdminPage() {
  const { data: offers, isLoading } = useOffers();
  const deleteMutation = useDeleteOffer();
  const [showForm, setShowForm] = useState<"offer" | "coupon" | null>(null);
  const [, setLocation] = useLocation();

  const stats = [
    { label: "إجمالي العروض", value: offers?.length || 0, icon: <Tag className="text-[#0f172a]" /> },
    { label: "العروض النشطة", value: offers?.length || 0, icon: <TrendingUp className="text-emerald-500" /> },
    { label: "المشاهدات", value: "3.2K", icon: <LayoutDashboard className="text-[#f97316]" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-tajawal" dir="rtl">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0f172a] text-white p-8 hidden lg:flex flex-col shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        
        <div className="mb-12 relative z-10">
          <h2 className="text-3xl font-bold text-white tracking-tight">لُقطة <span className="text-[#f97316]">.</span></h2>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-2 font-bold">Admin Dashboard</p>
        </div>
        
        <nav className="space-y-3 flex-1 relative z-10">
          <button className="w-full flex items-center gap-4 px-5 py-4 bg-white/10 rounded-2xl text-white font-bold transition-all border border-white/5">
            <LayoutDashboard size={22} />
            نظرة عامة
          </button>
          <button className="w-full flex items-center gap-4 px-5 py-4 text-white/40 hover:bg-white/5 rounded-2xl transition-all font-bold">
            <Tag size={22} />
            إدارة العروض
          </button>
          <button className="w-full flex items-center gap-4 px-5 py-4 text-white/40 hover:bg-white/5 rounded-2xl transition-all font-bold">
            <Ticket size={22} />
            إدارة الكوبونات
          </button>
        </nav>

        <Button 
          variant="ghost" 
          onClick={() => setLocation("/")}
          className="mt-auto flex items-center gap-4 text-white/40 hover:text-white hover:bg-white/10 rounded-2xl justify-start h-14 font-bold transition-all group"
        >
          <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
          الرجوع للمتجر
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-[#0f172a] tracking-tight">لوحة الإدارة</h1>
            <p className="text-slate-400 mt-2 font-medium">تحكم كامل في محتوى وعروض المنصة</p>
          </div>
          <div className="flex gap-4">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => setShowForm(showForm === "coupon" ? null : "coupon")} 
                className="bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold h-14 px-8 rounded-2xl shadow-xl transition-all gap-2"
              >
                <Ticket className="h-5 w-5" />
                إضافة كوبون
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => setShowForm(showForm === "offer" ? null : "offer")} 
                className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold h-14 px-8 rounded-2xl shadow-xl shadow-orange-500/20 transition-all gap-2"
              >
                <Plus className="h-5 w-5" />
                إضافة لُقطة جديدة
              </Button>
            </motion.div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-[1.25rem] bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-slate-400 font-bold mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-[#0f172a]">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="mb-12 overflow-hidden"
            >
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {showForm === "offer" ? "إضافة عرض جديد" : "إضافة كوبون جديد"}
                  </h2>
                  <Button variant="ghost" onClick={() => setShowForm(null)} className="text-slate-400">إغلاق</Button>
                </div>
                {showForm === "offer" ? (
                  <OfferForm onSuccess={() => setShowForm(null)} />
                ) : (
                  <CouponForm onSuccess={() => setShowForm(null)} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="animate-spin text-[#0f172a] h-12 w-12" />
            </div>
          ) : (
            offers?.map(offer => (
              <OfferCard 
                key={offer.id} 
                offer={offer} 
                isAdmin 
                onDelete={() => deleteMutation.mutate(offer.id)} 
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
