import { Link } from "react-router-dom"

export default function PublicHome() {
  return (
    <div className="space-y-16 pb-20">
      <section className="relative bg-slate-900 pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/10 skew-x-12 translate-x-20"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10 mt-10">
          <span className="inline-block bg-red-500/20 text-red-400 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-6 border border-red-500/30">
            🩸 রক্তদান মহৎ দান (Blood Donation is Noble)
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            রক্ত দিন, জীবন বাঁচান <br />
            <span className="text-red-500">Donate Blood, Save Lives</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            রক্তদাতা এবং রোগীদের মধ্যে তাৎক্ষণিক সংযোগ স্থাপন করাই আমাদের লক্ষ্য। আপনার একটি ছোট উদ্যোগ কারো জীবনে বড় হাসি ফোটাতে পারে।
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/donor/form">
              <button className="cursor-pointer px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-600/20 transition-all active:scale-95">
                রক্তদাতা হন (Become a Donor)
              </button>
            </Link>
            <Link to="/donor/requests">
              <button className="cursor-pointer px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold text-lg backdrop-blur-md transition-all">
                রক্তের জন্য আবেদন (Request Blood)
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. IMPACT STATS (The "Something Extra") */}
      <div className="max-w-5xl mx-auto px-6 -mt-24 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "নিবন্ধিত দাতা", value: "১২৫০+", icon: "👥" },
            { label: "সফল দান", value: "৮৫০+", icon: "✅" },
            { label: "বর্তমান অনুরোধ", value: "১৫", icon: "🕒" },
            { label: "জেলাভিত্তিক সেবা", value: "৬৪", icon: "📍" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-black text-slate-800">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. FEATURES SECTION */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">আমাদের বৈশিষ্ট্যসমূহ</h2>
          <div className="h-1 w-20 bg-red-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "দ্রুত দাতা খুঁজুন", desc: "জরুরি ভিত্তিতে আপনার এলাকা থেকে দাতা খুঁজে নিন সহজে।", emoji: "🩸", color: "bg-red-50" },
            { title: "লোকেশন ভিত্তিক", desc: "নিকটস্থ রক্তদাতাদের কাছে সাথে সাথে নোটিফিকেশন পৌঁছে যায়।", emoji: "📍", color: "bg-blue-50" },
            { title: "নিরাপদ ও বিশ্বস্ত", desc: "সকল দাতা ভেরিফাইড এবং আপনার তথ্য আমাদের কাছে নিরাপদ।", emoji: "🔐", color: "bg-green-50" },
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl border border-slate-100 hover:border-red-100 hover:shadow-lg transition-all group">
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                {feature.emoji}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DONOR AVAILABILITY SECTION */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">উপলব্ধ রক্তদাতা (Available Donors)</h2>
              <p className="text-slate-500 mt-2 font-medium italic">আপনার প্রয়োজনীয় গ্রুপের দাতা খুঁজে নিন</p>
            </div>
            <Link to="/donor/search" className="text-red-600 font-bold hover:underline hidden md:block">
              সবাইকে দেখুন (View All) →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["A+", "O+", "B+", "AB+"].map((bg, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:ring-2 hover:ring-red-500 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xl font-black">
                    {bg}
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Available
                  </span>
                </div>
                <p className="text-slate-800 font-bold">John Doe</p>
                <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                  <span>📍</span> Dhaka, Bangladesh
                </div>
                <Link to={`/donor/details/${i}`} className="block w-full"> 
                  <button className="w-full mt-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all">
                    বিবরণ দেখুন (View Details)
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}