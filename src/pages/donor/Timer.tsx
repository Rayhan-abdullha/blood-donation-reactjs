import { useState, useEffect } from "react";

const CountdownTimer = ({ expiresAt }: { expiresAt: string }) => {
  const [timeLeft, setTimeLeft] = useState({ h: "00", m: "00", s: "00" });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const now = Date.now();
      const expiry = new Date(expiresAt).getTime();
      const distance = expiry - now;

      if (distance <= 0) {
        setIsExpired(true);
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        h: String(hours).padStart(2, "0"),
        m: String(minutes).padStart(2, "0"),
        s: String(seconds).padStart(2, "0"),
      });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  if (isExpired) {
    return (
      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
        Expired
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 bg-gradient-to-b from-white to-slate-100 p-1 rounded-2xl border border-slate-300 shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_1px_0_white] group">
      
      {/* Icon Capsule */}
      <div className="flex items-center justify-center w-8 h-8 rounded-[11px] bg-white border border-slate-200 shadow-sm">
         <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-[pulse_1.5s_infinite]" />
      </div>

      {/* Timer Display */}
      <div className="flex items-center gap-1 pr-3">
        <WatchUnit value={timeLeft.h} label="hr" />
        <span className="text-slate-300 font-light text-lg mb-2">:</span>
        <WatchUnit value={timeLeft.m} label="min" />
        <span className="text-slate-300 font-light text-lg mb-2">:</span>
        <WatchUnit value={timeLeft.s} label="sec" isRed />
      </div>
    </div>
  );
};

const WatchUnit = ({ value, label, isRed = false }: { value: string, label: string, isRed?: boolean }) => (
  <div className="flex flex-col items-center min-w-[32px]">
    <span className={`font-mono text-base font-[1000] tracking-tight leading-none ${isRed ? 'text-red-600' : 'text-slate-800'}`}>
      {value}
    </span>
    <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
      {label}
    </span>
  </div>
);

export default CountdownTimer;