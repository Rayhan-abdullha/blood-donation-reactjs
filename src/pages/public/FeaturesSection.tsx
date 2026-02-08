import { Droplet, MapPin, ShieldCheck } from "lucide-react";

function FeaturesSection() {
  const features = [
    { title: "দ্রুত দাতা খুঁজুন", desc: "জরুরি ভিত্তিতে আপনার এলাকা থেকে দাতা খুঁজে নিন সহজে।", icon: <Droplet size={24}/>, color: "red" },
    { title: "লোকেশন ভিত্তিক", desc: "নিকটস্থ রক্তদাতাদের কাছে সাথে সাথে নোটিফিকেশন পৌঁছে যায়।", icon: <MapPin size={24}/>, color: "blue" },
    { title: "নিরাপদ ও বিশ্বস্ত", desc: "সকল দাতা ভেরিফাইড এবং আপনার তথ্য আমাদের কাছে নিরাপদ।", icon: <ShieldCheck size={24}/>, color: "green" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <h2 className="text-2xl md:text-4xl font-[1000] text-slate-900 tracking-tighter mb-4">সবচেয়ে আধুনিক পদ্ধতিতে <br/><span className="text-red-600 underline decoration-slate-200 underline-offset-8">রক্তের সন্ধান</span></h2>
        <p className="text-slate-400 font-medium text-sm">আমাদের ফিচারের মাধ্যমে জীবন বাঁচানো এখন আরও দ্রুত ও নিরাপদ</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-12">
        {features.map((f, i) => (
          <div key={i} className="relative group">
            <div className="absolute -inset-4 bg-slate-50 rounded-[3rem] scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 -z-10" />
            <div className={`w-16 h-16 rounded-[1.8rem] bg-${f.color}-50 text-${f.color}-600 flex items-center justify-center mb-8 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 group-hover:-rotate-12`}>
              {f.icon}
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{f.title}</h3>
            <p className="text-slate-500 text-sm leading-loose font-medium">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;