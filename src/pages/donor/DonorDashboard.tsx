import Badge from "../../components/Badge";
import Card from "../../components/Card";

export default function DonorDashboard() {
  const donorName = "John";
  
  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 pb-12 font-sans">
      
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-rose-500 rounded-3xl p-8 mb-8 text-white shadow-lg shadow-orange-100">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">স্বাগতম, {donorName}! (Welcome)</h1>
          <p className="text-orange-50 opacity-90 text-lg">
            আপনি বর্তমানে রক্তদানের জন্য প্রস্তুত। আপনার একটি দান একটি প্রাণ বাঁচাতে পারে।
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Status: Available to Donate
          </div>
        </div>
        {/* Decorative background shape */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Side: New Requests Feed */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 ml-2">
            <span className="text-red-500">🔔</span> নতুন অনুরোধ (New Requests)
          </h3>
          
          <Card className="border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow rounded-3xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Blood Group Highlight */}
              <div className="bg-red-50 md:w-40 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-red-100">
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">প্রয়োজন</span>
                <span className="text-5xl font-black text-red-600">A+</span>
                <Badge text="Emergency" color="red" className="mt-3" />
              </div>

              {/* Request Details */}
              <div className="p-6 flex-1">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">হাসপাতাল</p>
                    <p className="text-slate-700 font-bold text-lg">City Hospital</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">পরিমাণ</p>
                    <p className="text-slate-700 font-bold text-lg text-red-500">২ ব্যাগ (2 Bags)</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-100 active:scale-95">
                    Accept (গ্রহণ করুন)
                  </button>
                  <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 rounded-xl font-bold transition-all active:scale-95">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side: Stats & History */}
        <div className="space-y-6">
          {/* Donation Stats Grid */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-3 text-xl">
                ❤️
              </div>
              <p className="text-4xl font-black text-slate-800">০৮</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mt-1">মোট দান (Total Donations)</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">📅</span> গুরুত্বপূর্ণ তারিখ
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-2xl">
                  <span className="text-sm text-blue-700 font-medium">সর্বশেষ দান</span>
                  <span className="text-sm font-bold text-blue-800">Feb 15, 2024</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-2xl">
                  <span className="text-sm text-amber-700 font-medium">পরবর্তী রিমাইন্ডার</span>
                  <span className="text-sm font-bold text-amber-800">May 10, 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Impact Card */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white text-center">
            <p className="text-slate-400 text-sm mb-2">আপনি এ পর্যন্ত বাঁচিয়েছেন</p>
            <p className="text-2xl font-bold text-white mb-4 underline decoration-red-500 underline-offset-8">২৪টি প্রাণ (24 Lives)</p>
            <p className="text-xs text-slate-500 leading-relaxed">আপনার উদারতা আমাদের সমাজের শক্তি। রক্তদান অব্যাহত রাখুন।</p>
          </div>
        </div>

      </div>
    </div>
  );
}