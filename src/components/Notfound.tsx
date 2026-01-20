import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 font-sans">
      <div className="max-w-2xl w-full text-center">
        
        {/* Animated Visual Element */}
        <div className="relative mb-12">
          <h1 className="text-[12rem] md:text-[18rem] font-black text-slate-200 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
               {/* Floating Heart with a crack */}
               <span className="text-8xl md:text-9xl animate-bounce inline-block">💔</span>
               <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-200 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 -mt-10">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">
            পেজটি খুঁজে পাওয়া যায়নি!
          </h2>
          <p className="text-slate-500 text-lg font-medium mb-10 max-w-md mx-auto leading-relaxed">
            দুঃখিত, আপনি যে ঠিকানাটি খুঁজছেন তা হয়তো সরিয়ে ফেলা হয়েছে অথবা বর্তমানে উপলব্ধ নেই। 
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
            >
              ← পিছনে যান (Go Back)
            </button>
            <button 
              onClick={() => navigate("/")} 
              className="w-full sm:w-auto px-10 py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 transition-all active:scale-95"
            >
              হোম পেজ (Home)
            </button>
          </div>
        </div>

        {/* Support Link */}
        <p className="mt-16 text-sm font-bold text-slate-400 uppercase tracking-widest">
          সাহায্য প্রয়োজন? <a href="/contact" className="text-red-500 underline underline-offset-4">যোগাযোগ করুন</a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;