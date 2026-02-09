import { motion } from "framer-motion";
import { ShieldCheck, Zap, Heart, ArrowRight, Globe, Users } from "lucide-react";

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
  };

  return (
    <div className="bg-[#FCFCFD] overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-red-50 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-50 rounded-full blur-[100px] opacity-40" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.span 
            {...fadeIn}
            className="inline-block px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            আমাদের লক্ষ্য • Our Mission
          </motion.span>
          <motion.h1 
            {...fadeIn}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-[1000] text-slate-900 leading-[1.1] tracking-tighter mb-8"
          >
            প্রযুক্তির স্পর্শে <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">জীবন বাঁচানোর</span> নতুন দিগন্ত।
          </motion.h1>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
          >
            আমরা শুধু একটি ওয়েবসাইট নই; আমরা একটি জীবনদায়ী নেটওয়ার্ক। আমাদের লক্ষ্য রক্তদাতা ও গ্রহীতার মাঝে দূরত্ব কমিয়ে আনা।
          </motion.p>
        </div>
      </section>

      {/* --- FEATURE GRID (WHY US) --- */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="text-amber-500" />}
              title="অত্যন্ত দ্রুত"
              desc="সেকেন্ডের মধ্যে নিকটস্থ ভেরিফাইড রক্তদাতার কাছে নোটিফিকেশন পৌঁছে যায়।"
              delay={0.1}
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-blue-500" />}
              title="নিরাপদ নেটওয়ার্ক"
              desc="প্রতিটি রক্তদাতার তথ্য এনআইডি ও পূর্ববর্তী ইতিহাসের মাধ্যমে যাচাইকৃত।"
              delay={0.2}
            />
            <FeatureCard 
              icon={<Globe className="text-emerald-500" />}
              title="সম্পূর্ণ উন্মুক্ত"
              desc="আমাদের সেবাটি সম্পূর্ণ অলাভজনক এবং সবার জন্য সবসময় ফ্রি।"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* --- BENTO GALLERY SECTION --- */}
      <section className="py-20 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn} className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
              মানবিকতার টানে, <br /> প্রযুক্তির গানে।
            </h2>
            <div className="space-y-6">
              <CheckItem text="সহজ ও সাবলীল ইউজার ইন্টারফেস" />
              <CheckItem text="২৪/৭ ইমার্জেন্সি সাপোর্ট সিস্টেম" />
              <CheckItem text="রক্তদানের ডিজিটাল সার্টিফিকেট ও সম্মাননা" />
            </div>
          </motion.div>

          {/* Premium Image Bento Box */}
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-4">
                <div className="h-64 rounded-[2rem] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1536856789559-1cb49a8fc71c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Volunteers" />
                </div>
                <div className="h-40 bg-red-600 rounded-[2rem] flex items-center justify-center p-6">
                   <Heart size={48} className="text-white opacity-20 absolute" />
                   <p className="text-white font-black text-xl text-center relative z-10 leading-tight">১০ হাজার মানুষের ভরসা</p>
                </div>
             </div>
             <div className="pt-12 space-y-4">
                <div className="h-40 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/10 flex flex-col items-center justify-center">
                   <Users className="text-red-400 mb-2" size={32} />
                   <p className="text-white font-bold text-xs uppercase tracking-widest">Active Community</p>
                </div>
                <div className="h-64 rounded-[2rem] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1579154235602-3c35bd79939e?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700" alt="Lab" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6">
        <motion.div 
          {...fadeIn}
          className="max-w-4xl mx-auto bg-gradient-to-br from-red-600 to-rose-500 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-red-200"
        >
          {/* Decorative Rings */}
          <div className="absolute -top-20 -right-20 w-64 h-64 border-[30px] border-white/10 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />

          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 relative z-10 leading-tight">
            আপনি কি একজন <br /> জীবন রক্ষাকারী হতে চান?
          </h2>
          <p className="text-red-50 mb-10 text-lg opacity-90 font-medium relative z-10">
            আজই নিবন্ধন করুন এবং আমাদের কমিউনিটির অংশ হোন।
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <button className="bg-white text-red-600 px-10 py-5 rounded-2xl font-black shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              রক্তদাতা হোন <ArrowRight size={18} />
            </button>
            <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-black transition-all">
              সহযোগিতা করুন
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

// Reusable Sub-components
const FeatureCard = ({ icon, title, desc, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all group"
  >
    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white group-hover:shadow-lg transition-all">
      {icon}
    </div>
    <h3 className="text-xl font-black text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm font-medium">{desc}</p>
  </motion.div>
);

const CheckItem = ({ text }: any) => (
  <div className="flex items-center gap-4 group">
    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500 transition-colors">
      <div className="w-2 h-2 bg-red-500 rounded-full group-hover:bg-white" />
    </div>
    <p className="text-slate-300 font-bold group-hover:text-white transition-colors">{text}</p>
  </div>
);

export default AboutPage;