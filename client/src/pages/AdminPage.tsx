import { useOffers, useDeleteOffer } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { OfferForm } from "@/components/OfferForm";
import { useState } from "react";
import { Loader2, Plus, LayoutDashboard, TrendingUp, Tag, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

export default function AdminPage() {
  const { data: offers, isLoading } = useOffers();
  const deleteMutation = useDeleteOffer();
  const [showForm, setShowForm] = useState(false);
  const [, setLocation] = useLocation();

  const stats = [
    { label: "إجمالي العروض", value: offers?.length || 0, icon: <Tag className="text-indigo-600" /> },
    { label: "العروض النشطة", value: offers?.length || 0, icon: <TrendingUp className="text-emerald-500" /> },
    { label: "المشاهدات", value: "3.2K", icon: <LayoutDashboard className="text-orange-500" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-tajawal" dir="rtl">
      {/* Sidebar */}
      <aside className="w-72 bg-[#312E81] text-white p-8 hidden lg:flex flex-col shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        
        <div className="mb-12 relative z-10">
          <h2 className="text-3xl font-black text-white tracking-tight">لُقطة <span className="text-orange-500">.</span></h2>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-2 font-black">Admin Dashboard</p>
        </div>
        
        <nav className="space-y-3 flex-1 relative z-10">
          <button className="w-full flex items-center gap-4 px-5 py-4 bg-white/10 rounded-2xl text-white font-black transition-all border border-white/5 shadow-inner">
            <LayoutDashboard size={22} />
            نظرة عامة
          </button>
          <button className="w-full flex items-center gap-4 px-5 py-4 text-white/40 hover:bg-white/5 rounded-2xl transition-all font-bold">
            <Tag size={22} />
            إدارة العروض
          </button>
        </nav>

        <Button 
          variant="ghost" 
          onClick={() => setLocation("/")}
          className="mt-auto flex items-center gap-4 text-white/40 hover:text-white hover:bg-white/10 rounded-2xl justify-start h-14 font-black transition-all group"
        >
          <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
          الرجوع للمتجر
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">لوحة الإدارة</h1>
            <p className="text-slate-400 mt-2 font-medium">تحكم كامل في محتوى وعروض المنصة</p>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)} 
            className="bg-[#F97316] hover:bg-[#ea580c] text-white font-black h-14 px-8 rounded-2xl shadow-xl shadow-orange-500/20 transition-all active:scale-95 gap-2"
          >
            <Plus className="h-5 w-5" />
            إضافة لُقطة جديدة
          </Button>
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
                <p className="text-3xl font-black text-slate-800">{stat.value}</p>
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
              className="mb-12"
            >
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-indigo-50">
                <OfferForm onSuccess={() => setShowForm(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="animate-spin text-[#312E81] h-12 w-12" />
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
