import { motion } from "framer-motion";
import { Droplets, MapPin, Hospital, Clock, Phone, Facebook, Twitter, MessageCircle, MoreHorizontal } from "lucide-react";

export default function PublicRequestsFeed() {
  
  const handleShare = (platform: string, requestId: number) => {
    const url = `https://yourbloodapp.com/request/${requestId}`;
    const text = "জরুরী রক্ত প্রয়োজন! দয়া করে শেয়ার করে সাহায্য করুন।";
    
    const links: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text} ${url}`,
    };

    window.open(links[platform], "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="h-16 md:h-20" />
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10 text-center space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">ব্লাড রিকোয়েস্ট ফিড</h1>
          <p className="text-slate-500 text-sm">সরাসরি রক্তদাতার সাথে যোগাযোগ করুন</p>
        </div>

        <div className="space-y-8">
          {[...Array(3)].map((_, id) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={id}
              className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden group"
            >
              {/* 1. Card Header */}
              <div className="p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                    R
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800">Rayhan Hossain</h4>
                    <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1 uppercase tracking-wider">
                      <Clock size={10} /> ২ ঘণ্টা আগে
                    </p>
                  </div>
                </div>
                <button className="text-slate-300 hover:text-slate-600 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* 2. Cover Image Section */}
              <div className="relative h-64 mx-4 overflow-hidden rounded-[1.5rem] bg-slate-200">
                <img 
                  src={`https://i.ibb.co.com/21s2sNdH/Gemini-Generated-Image-65ad4k65ad4k65ad.png`} 
                  alt="Hospital"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-white">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Emergency</span>
                  </div>
                </div>
                
                {/* Floating Blood Group Badge */}
                <div className="absolute bottom-4 right-4 bg-red-600 text-white px-5 py-2 rounded-2xl shadow-2xl flex items-center gap-2">
                   <Droplets size={16} fill="white" />
                   <span className="text-xl font-black">A+</span>
                </div>
              </div>

              {/* 3. Post Info */}
              <div className="p-6">
                <div className="flex flex-wrap gap-4 mb-5">
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                    <Hospital size={14} className="text-red-500" />
                    <span className="text-xs font-bold">ঢাকা মেডিকেল হাসপাতাল</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                    <MapPin size={14} className="text-red-500" />
                    <span className="text-xs font-bold">শাহবাগ, ঢাকা</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  জরুরী ভিত্তিতে ১ ব্যাগ পজিটিভ রক্ত প্রয়োজন। থ্যালাসেমিয়া রোগীর জন্য অপারেশন চলাকালীন রক্ত প্রয়োজন। দয়া করে যোগাযোগ করুন।
                </p>
              </div>

              {/* 4. Action Bar */}
              <div className="px-6 pb-8 pt-2 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                   <button 
                    onClick={() => handleShare('facebook', id)}
                    className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"
                   >
                     <Facebook size={18} />
                   </button>
                   <button 
                    onClick={() => handleShare('whatsapp', id)}
                    className="p-3 bg-green-50 text-green-600 rounded-2xl hover:bg-green-600 hover:text-white transition-all"
                   >
                     <MessageCircle size={18} />
                   </button>
                   <button 
                    onClick={() => handleShare('twitter', id)}
                    className="p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-900 hover:text-white transition-all"
                   >
                     <Twitter size={18} />
                   </button>
                   
                   <button className="flex-1 ml-2 flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-[1.5rem] font-black text-sm shadow-xl shadow-slate-200 hover:bg-red-600 hover:shadow-red-200 transition-all active:scale-95">
                      <Phone size={16} fill="currentColor" />
                      কল করুন
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}