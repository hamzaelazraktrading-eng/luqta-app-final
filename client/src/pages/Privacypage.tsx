import { ArrowRight, ShieldCheck, Lock, EyeOff } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Privacy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-tajawal pb-12" dir="rtl">
      {/* Header مع زر الرجوع */}
      <header className="bg-[#0f172a] text-white p-6 shadow-xl rounded-b-[2.5rem] relative mb-8">
        <div className="flex items-center justify-between mt-4">
          <h1 className="text-2xl font-black text-white">سياسة الخصوصية</h1>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 px-4 py-2 bg-[#f97316] rounded-xl text-white font-bold text-sm shadow-lg shadow-orange-900/20"
          >
            <ArrowRight size={18} />
            الرئيسية
          </motion.button>
        </div>
      </header>

      <main className="px-6 space-y-6 max-w-md mx-auto">
        {/* بطاقة المقدمة */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 leading-relaxed">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#f97316] mb-4">
            <ShieldCheck size={28} />
          </div>
          <p className="text-slate-700 font-medium">
            نحن في تطبيق <span className="text-[#f97316] font-black">"لُقطة"</span> نحترم خصوصيتك تماماً. نهدف من خلال هذه السياسة إلى توضيح كيفية تعاملنا مع البيانات لضمان تجربة آمنة وموثوقة.
          </p>
        </div>

        {/* بنود السياسة */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-[1.5rem] shadow-sm flex items-start gap-4 border-r-4 border-[#f97316]">
            <Lock className="text-slate-400 mt-1" size={20} />
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-1">جمع البيانات</h3>
              <p className="text-slate-500 text-xs">نقوم بجمع معلومات تقنية بسيطة لتحسين أداء التطبيق وسرعة استجابته.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-[1.5rem] shadow-sm flex items-start gap-4 border-r-4 border-[#f97316]">
            <EyeOff className="text-slate-400 mt-1" size={20} />
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-1">إعلانات الطرف الثالث</h3>
              <p className="text-slate-500 text-xs">يتم عرض الإعلانات بواسطة <span className="font-bold">Google AdMob</span>، والتي قد تستخدم معرفات تقنية لعرض إعلانات تهمك.</p>
            </div>
          </div>
        </div>

        {/* التذييل */}
        <div className="text-center pt-8">
          <div className="inline-block px-4 py-1 bg-slate-200 rounded-full text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            آخر تحديث: يناير 2026
          </div>
        </div>
      </main>
    </div>
  );
}
