const AboutPage = () => {
  return (
    <div className="bg-white font-sans">
      {/* 1. Hero Section: Mission Statement */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/10 blur-[120px] rounded-full transform translate-x-1/2"></div>
        <div className="container mx-auto px-6 relative z-10 text-center mt-12">
          <span className="text-red-500 font-black tracking-[0.3em] uppercase text-sm">আমাদের লক্ষ্য (Our Mission)</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mt-4 mb-8 leading-tight">
            প্রযুক্তির মাধ্যমে <span className="text-red-500">জীবন বাঁচানোই</span> <br /> আমাদের মূল উদ্দেশ্য।
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            আমরা এমন একটি প্ল্যাটফর্ম তৈরি করছি যেখানে রক্তের প্রয়োজনে কাউকে আর অসহায় বোধ করতে হবে না। মাত্র কয়েক ক্লিকেই রক্তদাতা এবং গ্রহীতার মধ্যে সেতুবন্ধন তৈরি করাই আমাদের কাজ।
          </p>
        </div>
      </section>

      {/* 2. Impact Stats: Trust by Numbers */}
      <section className="py-12 -mt-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "সক্রিয় রক্তদাতা", value: "১০,০০০+", icon: "❤️" },
              { label: "সফল রক্তদান", value: "৫,০০০+", icon: "🩸" },
              { label: "আচ্ছাদিত এলাকা", value: "৬৪ জেলা", icon: "📍" },
              { label: "২৪/৭ সহায়তা", value: "সাপোর্ট", icon: "📞" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center transform hover:-translate-y-2 transition-transform">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-black text-slate-800">{stat.value}</div>
                <div className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The "Why Us" Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-100 rounded-3xl -z-10"></div>
              <h2 className="text-4xl font-black text-slate-800 mb-6">আমরা কেন আলাদা?</h2>
            </div>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl">১</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800">দ্রুত যোগাযোগ</h4>
                  <p className="text-slate-500 mt-2">আমাদের অ্যালগরিদম সবচেয়ে কাছের রক্তদাতার কাছে আপনার রিকোয়েস্ট পৌঁছে দেয় কয়েক সেকেন্ডে।</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl">২</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800">ভেরিফাইড রক্তদাতা</h4>
                  <p className="text-slate-500 mt-2">এনআইডি (NID) এবং পূর্ববর্তী রক্তদানের ইতিহাস যাচাই করে আমরা রক্তদাতার প্রোফাইল নিশ্চিত করি।</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl">৩</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800">সম্পূর্ণ ফ্রি</h4>
                  <p className="text-slate-500 mt-2">আমাদের এই সেবাটি সম্পূর্ণ অলাভজনক। জীবন বাঁচানোর এই যুদ্ধে আমাদের লক্ষ্য শুধু সেবা দেওয়া।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-64 bg-slate-200 rounded-[2.5rem] overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1615461066841-6116ecaaba30?auto=format&fit=crop&q=80&w=500" alt="Blood Donation" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="h-40 bg-red-600 rounded-[2.5rem] flex items-center justify-center p-8">
                 <p className="text-white font-black text-2xl leading-tight">রক্তদানই মহৎ দান।</p>
              </div>
            </div>
            <div className="pt-12 space-y-4">
              <div className="h-40 bg-slate-900 rounded-[2.5rem] flex items-center justify-center p-8">
                 <p className="text-slate-400 font-bold">Safe & Secured Network</p>
              </div>
              <div className="h-64 bg-slate-200 rounded-[2.5rem] overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1579154235602-3c35bd79939e?auto=format&fit=crop&q=80&w=500" alt="Laboratory" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Call to Action */}
      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-6">আপনি কি আমাদের সাথে যুক্ত হতে চান?</h2>
          <p className="text-slate-600 mb-10 max-w-xl mx-auto font-medium">
            আজই একজন রক্তদাতা হিসেবে নিবন্ধন করুন এবং অন্য কারো জীবনে আশার আলো হয়ে দাঁড়ান।
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-red-200 hover:bg-red-700 transition-all">রক্তদাতা হোন</button>
            <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-black transition-all">সহযোগিতা করুন</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;