import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SmartCoffeeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("coffee_popup_shown");

    if (!hasVisited) {
      // ২ সেকেন্ড পর স্লাইড করে আসবে
      const openTimer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("coffee_popup_shown", "true");
      }, 2000);

      // ৩ সেকেন্ড প্রদর্শিত হয়ে চলে যাবে (মোট ৫ সেকেন্ড)
      const closeTimer = setTimeout(() => {
        setIsOpen(false);
      }, 10000);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
      };
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-[400px]">
      {/* মেইন পপআপ কন্টেইনার */}
      <div className="relative group overflow-hidden bg-slate-900/90 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 hover:border-yellow-400/50">
        
        {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/20 blur-[50px] rounded-full group-hover:bg-yellow-400/30 transition-all"></div>
        
        <div className="relative z-10 flex items-center gap-5">
          {/* এনিমেটেড আইকন */}
          <div className="relative cursor-pointer">
            <div className="absolute inset-0 bg-yellow-400 rounded-2xl blur-md opacity-20 animate-pulse"></div>
            <div className="relative w-14 h-14 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
              ☕
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
              Support Us <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping"></span>
            </h3>
            <p className="text-slate-400 text-[11px] leading-relaxed mt-1">
              আমাদের সার্ভার সচল রাখতে এবং আরো জীবন বাঁচাতে আপনার সাহায্য প্রয়োজন।
            </p>
          </div>
        </div>

        {/* অ্যাকশন বাটন */}
        <div className="mt-6 flex items-center gap-3">
          <Link 
            to="/support"
            onClick={() => setIsOpen(false)}
            className="cursor-pointer flex-[2] bg-yellow-400 hover:bg-white text-black py-3 px-4 rounded-xl font-black text-[10px] uppercase tracking-tighter text-center transition-all duration-300 active:scale-95 shadow-lg shadow-yellow-400/10"
          >
            Buy me a coffee ☕
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="cursor-pointer flex-1 bg-white/5 hover:bg-white/10 text-white/50 py-3 px-4 rounded-xl font-bold text-[10px] uppercase transition-all"
          >
            Later
          </button>
        </div>

        {/* অটো-ক্লোজ প্রোগ্রেস বার (৩ সেকেন্ডের জন্য) */}
        <div className="absolute bottom-0 left-0 h-[3px] bg-yellow-400/50 animate-[progress_10s_linear]"></div>
      </div>
    </div>
  );
}