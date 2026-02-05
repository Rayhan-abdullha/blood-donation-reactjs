import { useState, useEffect } from "react";

const TimerAvailability = ({ donatedAt }: { donatedAt: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const nextDate = new Date(donatedAt).getTime() + (90 * 24 * 60 * 60 * 1000);
      const diff = nextDate - new Date().getTime();

      if (diff <= 0) {
        setIsAvailable(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
      });
    };

    calculate();
    const timer = setInterval(calculate, 60000); // প্রতি মিনিটে আপডেট হবে (Tiny টাইমারের জন্য যথেষ্ট)
    return () => clearInterval(timer);
  }, [donatedAt]);

  if (isAvailable) {
    return (
      <div className="flex items-center justify-center gap-2 bg-emerald-50/50 border border-emerald-100 px-4 py-2 mt-5 rounded-xl">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-black text-emerald-700 uppercase tracking-tighter">Ready to Donate</span>
      </div>
    );
  }
  if (!donatedAt) {
    return null;
  }

  return (
    <div className="inline-flex items-center bg-slate-900 rounded-2xl p-1 shadow-2xl shadow-slate-200 border border-slate-800">
      {/* Icon Section */}
      <div className="bg-slate-800 p-2.5 rounded-xl text-amber-400 text-sm">
        ⏳
      </div>

      {/* Timer Section */}
      <div className="flex items-center px-3 gap-3">
        {[
          { label: "D", value: timeLeft.days },
          { label: "H", value: timeLeft.hours },
          { label: "M", value: timeLeft.mins },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-white text-sm font-black leading-none tabular-nums">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[7px] font-bold text-slate-500 uppercase mt-0.5">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Status Label */}
      <div className="bg-red-500/10 px-3 py-2 rounded-xl border border-red-500/20">
        <span className="text-[9px] font-black text-red-500 uppercase tracking-tighter italic">রিকবারিং..</span>
      </div>
    </div>
  );
};
export default TimerAvailability