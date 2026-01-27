function FeaturesSection() {
    return (
         <section className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">আমাদের বৈশিষ্ট্যসমূহ</h2>
            <div className="h-1 w-20 bg-red-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "দ্রুত দাতা খুঁজুন", desc: "জরুরি ভিত্তিতে আপনার এলাকা থেকে দাতা খুঁজে নিন সহজে।", emoji: "🩸", color: "bg-red-50" },
              { title: "লোকেশন ভিত্তিক", desc: "নিকটস্থ রক্তদাতাদের কাছে সাথে সাথে নোটিফিকেশন পৌঁছে যায়।", emoji: "📍", color: "bg-blue-50" },
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
  )
}

export default FeaturesSection