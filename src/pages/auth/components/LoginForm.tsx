import { Mail, Lock, LogIn, AlertCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSvg from "../../../components/LoadingSvg";

const LoginForm = ({ register, errors, isLoginLoading, setView }: any) => {
  
  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      {/* Login Header */}
      <div className="mb-8 px-1">
        <h2 className="text-2xl font-[1000] text-slate-900 tracking-tight">ফিরে আসায় স্বাগতম</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">আপনার অ্যাকাউন্টে লগইন করুন</p>
      </div>

      <div className="space-y-5">
        {/* Email / Phone Field */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">আইডেন্টিটি</label>
            <AnimatePresence>
              {errors.email && (
                <motion.span 
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  className="text-[9px] font-bold text-red-500 uppercase bg-red-50 px-2 py-0.5 rounded-md"
                >
                  {errors.email.message}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          <motion.div 
            animate={errors.email ? { x: [-2, 2, -2, 2, 0] } : {}}
            className="relative group"
          >
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${errors.email ? 'text-red-500' : 'text-slate-400 group-focus-within:text-red-600'}`}>
              {errors.email ? <AlertCircle size={18} /> : <Mail size={18} />}
            </div>
            <input 
              type="text" 
              {...register("email", { required: "ইমেইল বা ফোন নম্বর দিন" })} 
              className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300 outline-none font-semibold text-slate-700 ${errors.email ? 'border-red-100 bg-red-50/30' : 'border-slate-100 bg-white focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.08)]'}`}
              placeholder="ইমেইল বা ফোন নম্বর" 
            />
          </motion.div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">পাসওয়ার্ড</label>
            <button 
              onClick={() => setView("forgot-password")} 
              type="button" 
              className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:text-red-700 transition-colors flex items-center gap-1"
            >
              <HelpCircle size={12} /> পাসওয়ার্ড ভুলে গেছেন?
            </button>
          </div>

          <motion.div 
            animate={errors.password ? { x: [-2, 2, -2, 2, 0] } : {}}
            className="relative group"
          >
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${errors.password ? 'text-red-500' : 'text-slate-400 group-focus-within:text-red-600'}`}>
              {errors.password ? <AlertCircle size={18} /> : <Lock size={18} />}
            </div>
            <input 
              type="password" 
              {...register("password", { required: "পাসওয়ার্ড দিন" })} 
              className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300 outline-none font-semibold text-slate-700 ${errors.password ? 'border-red-100 bg-red-50/30' : 'border-slate-100 bg-white focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.08)]'}`}
              placeholder="••••••••" 
            />
          </motion.div>
          {errors.password && (
            <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest ml-1 animate-pulse">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Login Button */}
        <div className="pt-2">
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={isLoginLoading} 
            className={`group relative w-full py-5 rounded-[1.5rem] font-black text-[12px] uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden shadow-2xl flex items-center justify-center gap-3 ${isLoginLoading ? 'bg-slate-100 text-slate-400 shadow-none' : 'bg-slate-900 text-white shadow-slate-200 hover:bg-red-600 hover:shadow-red-100'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {isLoginLoading ? (
              <><LoadingSvg /> অনুরোধ করা হচ্ছে...</>
            ) : (
              <>
                <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                <span>লগইন করুন</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;