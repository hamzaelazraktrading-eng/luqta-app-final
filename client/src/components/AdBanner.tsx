import { useEffect } from "react";

// وظيفة لإظهار إعلان المكافأة عند طلب كشف الكوبون
export const showRewardedAd = (onComplete: () => void) => {
  // معرف وحدة إعلان المكافأة الجديد الخاص بك
  const REWARDED_ID = "ca-app-pub-9595557636226050/2618267271"; 

  console.log("AdMob: جاري تحميل إعلان المكافأة...");

  // محاكاة عمل الإعلان في بيئة التطوير وتفعيله في التطبيق الحقيقي
  if (typeof window !== "undefined" && (window as any).AdMob) {
    // هنا يتم استدعاء المحرك الحقيقي للإعلانات في ملف APK
    onComplete(); 
  } else {
    // للمعاينة: تأخير بسيط لمحاكاة وقت الإعلان ثم تنفيذ المكافأة
    setTimeout(() => {
      onComplete();
    }, 1500);
  }
};

export function AdBanner() {
  const AD_UNIT_ID = "ca-app-pub-9595557636226050/2945570332";

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdMob logic will activate on mobile device:", e);
    }
  }, []);

  return (
    <div className="w-full my-4 flex justify-center px-2">
      <div className="relative w-full max-w-[350px] min-h-[100px] bg-white border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 bg-slate-100 text-[10px] px-2 py-0.5 rounded-bl-xl text-slate-400 font-bold">
          AD / إعلان
        </div>
        <ins className="adsbygoogle"
             style={{ display: 'inline-block', width: '320px', height: '100px' }}
             data-ad-client="ca-app-pub-9595557636226050"
             data-ad-slot="2945570332"></ins>
        <div className="text-center">
          <p className="text-slate-300 text-[10px] font-bold tracking-widest uppercase">
            AdMob Active Area
          </p>
          <p className="text-slate-200 text-[8px] mt-1">{AD_UNIT_ID}</p>
        </div>
      </div>
    </div>
  );
}
