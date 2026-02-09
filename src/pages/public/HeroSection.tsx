import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Droplets, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

const HeroSection = () => {
  const { user } = useAuthStore();
  
  // --- REAL-TIME INTERACTIVE PHYSICS ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs add "inertia" - making the light feel like heavy liquid blood/plasma
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  // Subtle tilt effect for the content based on mouse position
  const rotateX = useTransform(springY, [-300, 300], [5, -5]);
  const rotateY = useTransform(springX, [-300, 300], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position relative to center
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative bg-[#020617] pt-20 sm:pt-40 pb-35 sm:pb-40 px-6 overflow-hidden flex items-center justify-center min-h-[80vh]">
      
      <div 
        className="absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />

      {/* 2. Interactive Liquid Light (The Mouse Follower) */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"
      />

      {/* 3. The "Pulse" Scanning Beam - High Precision Look */}
      <motion.div 
        animate={{ 
          y: ['-20vh', '120vh'],
          opacity: [0, 0.5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent z-0"
      >
        {/* Glow effect for the line */}
        <div className="absolute inset-0 bg-red-500 blur-[4px] opacity-50" />
      </motion.div>

      {/* --- CONTENT LAYER --- */}
      <motion.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        
        {/* Elite Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2.5 bg-white/[0.03] backdrop-blur-xl px-5 py-2 rounded-full border border-white/10 mb-10 shadow-2xl"
        >
          <Sparkles className="text-red-500" size={14} />
          <span className="text-white/70 text-[10px] font-black uppercase tracking-[0.4em]">
            RayHan's Network
          </span>
        </motion.div>

        {/* Balanced Headline */}
        <h1 className="text-[2.6rem] md:text-7xl font-[1000] text-white mb-8 leading-[1.05] tracking-tighter">
          রক্তের বন্ধনে <br />
          <span className="bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">গড়ি আগামীর স্বপ্ন</span>
        </h1>

        {/* Sophisticated Subtext */}
        <p className="text-slate-400 text-sm md:text-lg max-w-xl mx-auto mb-14 font-medium leading-relaxed">
          আপনার একটি সাহসী পদক্ষেপ হতে পারে কারো জীবনের শেষ আশা। আমাদের প্রযুক্তিনির্ভর প্ল্যাটফর্ম আপনাকে দ্রুততম সময়ে নির্ভরযোগ্য দাতার সাথে যুক্ত করে।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          {user?.role !== "donor" && (
            <Link to="/donor/be-donor" className="w-full sm:w-auto group">
              <motion.button 
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer w-full sm:px-12 py-4.5 bg-white text-slate-950 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)]"
              >
                <Heart fill="currentColor" size={18} />
                <span>রক্তদাতা হন</span>
              </motion.button>
            </Link>
          )}

          <Link to="/blood/request" className="w-full sm:w-auto">
            <motion.button 
              whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer w-full sm:px-12 py-4.5 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest backdrop-blur-xl transition-all flex items-center justify-center gap-3 shadow-2xl"
            >
              <Droplets size={18} className="text-red-500" />
              <span>রক্তের অনুরোধ</span>
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Elegant Bottom Transition */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-50 to-transparent md:from-[#F8FAFC]" />
    </section>
  );
};

export default HeroSection;