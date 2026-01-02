import { useOffers, useDeleteOffer } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { OfferForm } from "@/components/OfferForm";
import { useState } from "react";
import { Loader2, Plus, LayoutDashboard, TrendingUp, Tag, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

export default function AdminPage() {
  const { data: offers, isLoading } = useOffers();
  const deleteMutation = useDeleteOffer();
  const [showForm, setShowForm] = useState(false);
  const [, setLocation] = useLocation();

  const stats = [
    { label: "إجمالي العروض", value: offers?.length || 0, icon: <Tag className="text-blue-500" /> },
    { label: "العروض النشطة", value: offers?.length || 0, icon: <TrendingUp className="text-green-500" /> },
    { label: "المشاهدات", value: "2.4K", icon: <LayoutDashboard className="text-purple-500" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a237e] text-white p-6 hidden md:flex flex-col shadow-2xl">
        <div className="mb-10">
          <h2 className="text-2xl font-black text-[#c5a059]">لوحة التحكم</h2>
          <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Gulf Catches Admin</p>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-white font-bold transition-all">
            <LayoutDashboard size={20} />
            الرئيسية
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-white/5 rounded-xl transition-all">
            <Tag size={20} />
            العروض
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-white/5 rounded-xl transition-all">
            <Settings size={20} />
            الإعدادات
          </button>
        </nav>

        <Button 
          variant="ghost" 
          onClick={() => setLocation("/")}
          className="mt-auto flex items-center gap-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl justify-start h-12"
        >
          <LogOut size={20} />
          الخروج للمتجر
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-800">إدارة العروض</h1>
            <p className="text-gray-500 mt-1">مرحباً بك، يمكنك إضافة وإدارة العروض من هنا</p>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)} 
            className="bg-[#c5a059] hover:bg-[#b38f4d] text-[#1a237e] font-bold h-12 px-6 rounded-xl shadow-lg transition-all active:scale-95"
          >
            <Plus className="ml-2 h-5 w-5" />
            إضافة عرض جديد
          </Button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-black text-gray-800">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#c5a059]/20">
                <OfferForm onSuccess={() => setShowForm(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="animate-spin text-[#c5a059] h-10 w-10" />
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
