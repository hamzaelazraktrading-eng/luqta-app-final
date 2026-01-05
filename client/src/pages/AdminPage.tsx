import { useOffers, useDeleteOffer } from "@/hooks/use-offers";
import { OfferCard } from "@/components/OfferCard";
import { OfferForm } from "@/components/OfferForm";
import { CouponForm } from "@/components/CouponForm";
import { useState, useEffect } from "react";
import { Loader2, Plus, LayoutDashboard, TrendingUp, Tag, LogOut, Ticket, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminPage() {
  const { data: offers, isLoading } = useOffers();
  const deleteMutation = useDeleteOffer();
  const [showForm, setShowForm] = useState<"offer" | "coupon" | "notification" | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const stats = [
    { label: "إجمالي العروض", value: offers?.length || 0, icon: <Tag className="text-slate-900" /> },
    { label: "العروض النشطة", value: offers?.length || 0, icon: <TrendingUp className="text-emerald-500" /> },
    { label: "المشاهدات", value: "3.2K", icon: <LayoutDashboard className="text-orange-500" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex font-tajawal" dir="rtl">
      {/* Sidebar - تم تحسين التباين */}
      <aside className="w-72 bg-[#0f172a] text-white p-8 hidden lg:flex flex-col shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />

        <div className="mb-12 relative z-10">
          <h2 className="text-3xl font-bold text-white tracking-tight">لُقطة <span className="text-[#f97316]">.</span></h2>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-2 font-bold">لوحة التحكم</p>
        </div>

        <nav className="space-y-3 flex-1 relative z-10">
          <button className="w-full flex items-center gap-4 px-5 py-4 bg-white/10 rounded-2xl text-white font-bold transition-all border border-white/5">
            <LayoutDashboard size={22} />
            نظرة عامة
          </button>
          <button className="w-full flex items-center gap-4 px-5 py-4 text-slate-400 hover:bg-white/5 rounded-2xl transition-all font-bold">
            <Tag size={22} />
            إدارة العروض
          </button>
          <button className="w-full flex items-center gap-4 px-5 py-4 text-slate-400 hover:bg-white/5 rounded-2xl transition-all font-bold">
            <Ticket size={22} />
            إدارة الكوبونات
          </button>
        </nav>

        <Button 
          variant="ghost" 
          onClick={() => setLocation("/")}
          className="mt-auto flex items-center gap-4 text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl justify-start h-14 font-bold transition-all group"
        >
          <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
          الرجوع للمتجر
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">لوحة الإدارة</h1>
            <p className="text-slate-500 mt-2 font-medium">تحكم كامل في محتوى وعروض المنصة</p>
          </div>
          {/* تحسين ترتيب الأزرار لتكون تحت بعضها في الجوال */}
          <div className="flex flex-col gap-3 w-full sm:w-80">
            <Button 
              onClick={() => setShowForm(showForm === "notification" ? null : "notification")} 
              className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-bold h-12 rounded-xl shadow-lg transition-all gap-2"
            >
              <Bell className="h-4 w-4" />
              إرسال إشعار
            </Button>
            <Button 
              onClick={() => setShowForm(showForm === "coupon" ? null : "coupon")} 
              className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-bold h-12 rounded-xl shadow-lg transition-all gap-2"
            >
              <Ticket className="h-4 w-4" />
              إضافة كوبون
            </Button>
            <Button 
              onClick={() => setShowForm(showForm === "offer" ? null : "offer")} 
              className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold h-14 rounded-xl shadow-xl shadow-orange-500/20 transition-all gap-2"
            >
              <Plus className="h-5 w-5" />
              إضافة لُقطة جديدة
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-200 flex items-center gap-4 group hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold mb-0.5">{stat.label}</p>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-xl border border-slate-200">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-slate-900">
                    {showForm === "offer" ? "إضافة عرض جديد" : showForm === "coupon" ? "إضافة كوبون جديد" : "إرسال إشعار للمستخدمين"}
                  </h2>
                  <Button variant="ghost" onClick={() => setShowForm(null)} className="text-slate-400 hover:text-red-500">إغلاق</Button>
                </div>
                {showForm === "offer" ? (
                  <OfferForm onSuccess={() => setShowForm(null)} />
                ) : showForm === "coupon" ? (
                  <CouponForm onSuccess={() => setShowForm(null)} />
                ) : (
                  <NotificationForm onSuccess={() => setShowForm(null)} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* قائمة العروض */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="animate-spin text-slate-900 h-10 w-10" />
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

// نموذج الإشعارات مع إصلاح مشكلة تباين الألوان واللصق
function NotificationForm({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (data: { title: string, message: string }) => {
      const res = await apiRequest("POST", "/api/notifications", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "تم إرسال الإشعار بنجاح" });
      onSuccess();
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate({
      title: formData.get("title") as string,
      message: formData.get("message") as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-slate-700 font-bold text-sm">عنوان الإشعار</label>
        <Input 
          name="title" 
          required 
          className="bg-slate-50 border-slate-200 h-12 rounded-xl text-slate-900 focus:bg-white transition-colors" 
          placeholder="مثال: خصم جديد رائع!"
        />
      </div>
      <div className="space-y-2">
        <label className="text-slate-700 font-bold text-sm">محتوى الإشعار</label>
        <Textarea 
          name="message" 
          required 
          className="bg-slate-50 border-slate-200 min-h-[100px] rounded-xl text-slate-900 focus:bg-white transition-colors" 
          placeholder="اكتب تفاصيل الإشعار هنا..."
        />
      </div>
      <Button type="submit" className="w-full h-12 bg-[#0f172a] hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg" disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="animate-spin" /> : "إرسال الإشعار الآن"}
      </Button>
    </form>
  );
}
