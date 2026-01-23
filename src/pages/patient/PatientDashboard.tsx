import Badge from "../../components/Badge"; // Assuming these support the new styles

export default function PatientDashboard() {
  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-2 pb-12 font-sans mt-[100px] bg-red-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">পেশেন্ট ড্যাশবোর্ড (Patient Dashboard)</h1>
          <p className="text-slate-500 text-sm">আপনার বর্তমান রক্তের আবেদন এবং দাতাদের তথ্য দেখুন</p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-red-100 flex items-center gap-2 active:scale-95">
          <span>+</span> নতুন আবেদন (New Blood Request)
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Side: Active Request (Main Focus) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-700">বর্তমান আবেদন (Current Request)</h2>
              <Badge text="Pending" color="gray" />
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-red-50 p-4 rounded-2xl text-center">
                  <p className="text-xs text-red-600 font-bold uppercase tracking-wider mb-1">গ্রুপ</p>
                  <p className="text-3xl font-black text-red-700">A+</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">ব্যাগ</p>
                  <p className="text-3xl font-black text-slate-700">02</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-center col-span-2">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">জরুরি অবস্থা</p>
                  <div className="mt-1"><Badge text="Emergency" color="red" /></div>
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-50 pt-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">🏥</span>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">হাসপাতাল</p>
                    <p className="text-slate-700 font-semibold">City General Hospital, Dhaka</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">📅</span>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">আবেদনের তারিখ</p>
                    <p className="text-slate-700 font-semibold">১৯ জানুয়ারি, ২০২৬</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 flex flex-col md:flex-row gap-3">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-bold transition-all">
                সম্পন্ন হিসেবে চিহ্নিত করুন (Mark Completed)
              </button>
              <button className="px-6 py-2.5 border border-slate-300 text-slate-600 rounded-xl font-semibold hover:bg-slate-100">
                এডিট (Edit)
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Donor Responses */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-700">দাতাদের সাড়া (Donor Responses)</h2>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Accepted Section */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-green-600 uppercase tracking-widest">গৃহীত (Accepted)</p>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-2xl border border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center font-bold text-green-700">MS</div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Michael S.</p>
                      <p className="text-[10px] text-green-600 font-medium font-mono">017XXXXXXXX</p>
                    </div>
                  </div>
                  <button className="text-xs bg-white px-3 py-1 rounded-lg shadow-sm font-bold text-green-700 border border-green-100">Call</button>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Declined Section */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">প্রত্যাখ্যাত (Declined)</p>
                <div className="space-y-2">
                  {["David L.", "Priya K."].map((name) => (
                    <div key={name} className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 opacity-70">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                        {name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <p className="text-sm font-medium text-slate-600">{name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-100">
            <h3 className="font-bold mb-2">সাহায্য প্রয়োজন?</h3>
            <p className="text-indigo-100 text-sm mb-4">রক্তদাতা খুঁজে পেতে সমস্যা হলে আমাদের হেল্পলাইনে যোগাযোগ করুন।</p>
            <button className="w-full bg-white/20 hover:bg-white/30 py-2 rounded-xl font-bold transition-all">
              হেল্পলাইন: ১৬২২২
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}