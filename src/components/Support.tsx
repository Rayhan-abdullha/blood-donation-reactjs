import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SupportPage() {
  const [amount, setAmount] = useState("100");
  const [trxId, setTrxId] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  
  // পপআপ কন্ট্রোল করার স্টেট
  const [showTerms, setShowTerms] = useState(false);

  // পেজ লোড হওয়ার পর পপআপ দেখানো এবং ১০ সেকেন্ড পর বন্ধ করা
  useEffect(() => {
    setShowTerms(true); // পেজ ওপেন হলে পপআপ দেখাবে

    const timer = setTimeout(() => {
      setShowTerms(false); // ১০ সেকেন্ড পর অটো বন্ধ হবে
    }, 10000);

    return () => clearTimeout(timer); // মেমোরি লিক রোধ করতে ক্লিয়ার করা
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 relative">
      
      {/* --- TERMS AND CONDITIONS POPUP --- */}
      {showTerms && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
          {/* Backdrop/Overlay */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowTerms(false)}></div>
          
          {/* Modal Content */}
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full relative z-10 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-800 tracking-tight">📜 শর্তাবলী (Terms)</h2>
              <button onClick={() => setShowTerms(false)} className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors">✕</button>
            </div>
            
            <div className="space-y-4 text-slate-600 text-sm font-medium leading-relaxed">
              <p>১. আপনার প্রদানকৃত ডোনেশন শুধুমাত্র অ্যাপের সার্ভার এবং ডেভেলপমেন্ট কাজে ব্যবহৃত হবে।</p>
              <p>২. ট্রানজেকশন আইডি ভুল প্রদান করলে আপনার ডোনেশনটি গ্রহণ করা হবে না।</p>
              <p>৩. যেকোনো সমস্যায় আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।</p>
            </div>

            <div className="mt-8">
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="bg-yellow-400 h-full animate-[progress_10s_linear]"></div>
              </div>
              <p className="text-[10px] text-center mt-2 text-slate-400 font-bold uppercase tracking-widest">এটি ১০ সেকেন্ড পর অটোমেটিক বন্ধ হয়ে যাবে</p>
            </div>

            <button 
              onClick={() => setShowTerms(false)}
              className="w-full mt-6 bg-slate-900 text-white py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all"
            >
              আমি বুঝেছি (Got it)
            </button>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto">
        {/* Back Button */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-red-600 font-bold transition-all hover:-translate-x-1">
            <span className="text-xl mr-2">←</span> ফিরে যান (Back)
          </Link>
          
          {/* শর্তাবলী পুনরায় দেখার বাটন */}
          <button 
            onClick={() => setShowTerms(true)}
            className="text-[10px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 text-slate-500 hover:text-red-600 transition-all"
          >
            শর্তাবলী দেখুন 📜
          </button>
        </div>

        <div className="text-center">
          {/* Header */}
          <div className="mb-10">
            <div className="w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-yellow-100 animate-bounce">
              ☕
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-4">প্রজেক্টটি এগিয়ে নিতে সাহায্য করুন</h1>
          </div>

          {/* Donation Card - আগের মতোই থাকবে */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-700 mb-6 text-left border-l-4 border-yellow-400 pl-3">ডোনেশন পরিমাণ নির্বাচন করুন</h3>
                      {/* ... বাকি কোড ... */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {["50", "100", "500"].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`py-4 rounded-2xl font-black transition-all ${
                    amount === val ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400"
                  }`}
                >৳{val}</button>
              ))}
            </div>
            <PaymentMethod
                name="nagad"
                number="01798716196"
                color="bg-pink-50 text-pink-600"
            />
            {/* Transaction Fields */}
            <div className="space-y-4 text-left border-t border-slate-100 pt-8">
               <input 
                  type="text"
                  placeholder="আপনার ফোন নম্বর"
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 outline-none"
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
               />
               <input 
                  type="text"
                  placeholder="TrxID: 8N7A6D5E"
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 outline-none uppercase font-black tracking-widest"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
               />
            </div>
            <button className="w-full mt-10 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-2xl font-black text-md transition-all shadow-lg cursor-pointer">
                ডোনেশন নিশ্চিত করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// আপনার CSS ফাইলে এই এনিমেশনটি যোগ করুন অথবা Tailwind config এ দিন:
// @keyframes progress {
//   from { width: 100%; }
//   to { width: 0%; }
// }
function PaymentMethod({ name, number, color }: { name: string, number: string, color: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // 1.5 seconds later reset
  };

  return (
    <div className={`p-4 rounded-2xl flex justify-between items-center ${color}`}>
      <div className="flex flex-col justify-start">
        <p className="text-[10px] font-black uppercase tracking-wider opacity-70">{name}</p>
        <p className="font-bold text-lg tracking-tight">{number}</p>
      </div>
      <button 
              onClick={handleCopy}
              className={`bg-white/50 px-3 py-1.5 ${copied && 'text-black'} rounded-xl text-xs font-bold hover:bg-white transition-all shadow-sm cursor-pointer`}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
