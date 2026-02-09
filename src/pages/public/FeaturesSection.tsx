import { Droplet, MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

function FeaturesSection() {
  const features = [
    { 
      title: "দ্রুত দাতা খুঁজুন", 
      desc: "জরুরি ভিত্তিতে আপনার এলাকা থেকে দাতা খুঁজে নিন মুহূর্তের মধ্যেই।", 
      icon: <Droplet size={26} />, 
      tag: "Real-time" 
    },
    { 
      title: "স্মার্ট লোকেশন ট্রেসিং", 
      desc: "নিকটস্থ রক্তদাতাদের কাছে সাথে সাথে নোটিফিকেশন পৌঁছে দেওয়ার আধুনিক প্রযুক্তি।", 
      icon: <MapPin size={26} />, 
      tag: "Precision" 
    },
    { 
      title: "নিরাপদ ও ভেরিফাইড", 
      desc: "প্রতিটি প্রোফাইল ম্যানুয়ালি ভেরিফাইড, আপনার নিরাপত্তা আমাদের সর্বোচ্চ অগ্রাধিকার।", 
      icon: <ShieldCheck size={26} />, 
      tag: "Elite Security" 
    },
  ];

  return (
    <section className="relative bg-white py-24 md:py-32 px-6 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header - Minimalist & Elite */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 relative">
      {/* Left Side: Typography & Brand Accent */}
      <div className="max-w-3xl relative">
        {/* Animated Accent Line */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "40px" }}
          className="h-1 bg-red-600 mb-6 rounded-full"
        />
        
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-red-600 text-[9px] md:text-[11px] font-[1000] uppercase tracking-[0.5em] block mb-3"
        >
          Our Ecosystem
        </motion.span>
        
        <h2 className="text-3xl md:text-4xl font-[1000] text-slate-900 tracking-[-0.05em] leading-[1.05]">
          জীবন রক্ষায় সবচেয়ে <br/>
          <span className="bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent font-medium italic pr-4">
            আধুনিক ইকোসিস্টেম
          </span>
        </h2>
      </div>

      {/* Right Side: Sophisticated Context Block */}
      <div className="relative group max-w-sm">
        {/* Desktop Only: Decorative Background Number or Text */}
        <span className="hidden md:block absolute -top-12 -left-4 text-[5rem] font-black text-slate-50 select-none -z-10 group-hover:text-red-50/50 transition-colors duration-500">
          01
        </span>
        
        <div className="border-l-[3px] border-red-600/20 pl-6 py-1 group-hover:border-red-600 transition-colors duration-700">
          <p className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-widest mb-2">
            Humanitarian Tech
          </p>
          <p className="text-slate-400 font-medium text-[13px] md:text-[15px] leading-relaxed italic">
            "আমরা শুধু একটি প্ল্যাটফর্ম নই; এটি একটি আধুনিক লাইফ-সেভিং নেটওয়ার্ক যা প্রতিটি সেকেন্ডের মূল্য বোঝে।"
          </p>
        </div>
      </div>
    </div>
        
        {/* Features Grid - Bento Style */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-red-100 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(220,38,38,0.1)]"
            >
              {/* Hover Arrow */}
              <div className="absolute top-8 right-8 text-slate-200 group-hover:text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                <ArrowUpRight size={20} />
              </div>

              {/* Icon Logic */}
              <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center mb-10 group-hover:bg-red-600 group-hover:text-white group-hover:rotate-[10deg] transition-all duration-500 shadow-sm">
                {f.icon}
              </div>

              <div className="mb-4">
                <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">{f.tag}</span>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-1 tracking-tight">{f.title}</h3>
              </div>
              
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                {f.desc}
              </p>

              {/* Subtle Bottom Accent */}
              <div className="absolute bottom-0 left-10 right-10 h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;