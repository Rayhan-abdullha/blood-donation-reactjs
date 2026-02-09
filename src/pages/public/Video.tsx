import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Droplets, Heart } from "lucide-react";

export default function VideoSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-20 px-6 bg-white mb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-4"
          >
            <Droplets size={16} className="text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
              দেখুন আমরা কিভাবে কাজ করি
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter mb-4">
            প্রতিটি রক্তদান একটি <span className="text-red-600">নতুন জীবন</span>
          </h2>
          <p className="max-w-xl text-slate-500 font-medium text-sm md:text-base leading-relaxed">
             রক্তদানের মাধ্যমে আপনি একজনের মুখে হাসি ফোটাতে পারেন। আমাদের প্ল্যাটফর্ম ব্যবহার করে খুব সহজেই রক্তদান এবং গ্রহণ করার প্রক্রিয়াটি দেখে নিন।
          </p>
        </div>

        {/* Video Preview Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative max-w-5xl mx-auto group"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50 group-hover:bg-red-200 transition-colors" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 group-hover:bg-blue-200 transition-colors" />

          {/* Thumbnail Container */}
          <div 
            onClick={() => setIsOpen(true)}
            className="relative aspect-video rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl shadow-slate-200 border-8 border-white group"
          >
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 transition-opacity group-hover:opacity-40" />
            
            {/* Background Image (Replace with your thumbnail) */}
            <img 
              src="https://i.ibb.co.com/G4SCxnd8/Gemini-Generated-Image-65ad4k65ad4k65ad.png" 
              alt="Blood Donation Process"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Floating UI Elements over Video */}
            <div className="absolute bottom-8 left-8 z-20 hidden md:flex items-center gap-4">
               <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <Heart className="text-red-500" fill="currentColor" size={20} />
                  </div>
                  <div>
                    <p className="text-white text-[10px] font-black uppercase tracking-widest">Lives Impacted</p>
                    <p className="text-white text-lg font-black leading-none">12,400+</p>
                  </div>
               </div>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center shadow-2xl relative"
              >
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20" />
                <Play size={32} fill="currentColor" className="text-red-600 ml-1" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl aspect-video rounded-[2rem] overflow-hidden shadow-2xl bg-black border border-white/10 z-10"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X size={24} />
              </button>
              
              <iframe width="1249" height="703" src="https://www.youtube.com/embed/Z4YvULm6XkE" title="সঠিক নিয়ম মানলে, ৩ মাসেই সুস্থ জীবনে ফিরতে পারবেন—ইনশাআল্লাহ। Dr Jahangir Kabir। JK Lifestyle" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}