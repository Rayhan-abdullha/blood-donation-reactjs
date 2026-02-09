import { User, Phone, Mail, Lock, UserPlus, ShieldCheck, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSvg from "../../../components/LoadingSvg";

const RegisterForm = ({ register, errors, isRegisterLoading, wait }: any) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Form Header Info */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div>
          <h2 className="text-2xl font-[1000] text-slate-900 tracking-tight">নতুন অ্যাকাউন্ট</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">নিরাপদ এবং দ্রুত নিবন্ধন</p>
        </div>
        <div className="h-12 w-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shadow-inner">
          <ShieldCheck size={24} />
        </div>
      </div>

      <div className="space-y-6">
        {/* Row 1: Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField 
            icon={<User size={18} />}
            label="নাম"
            placeholder="আপনার নাম"
            error={errors.name}
            registration={register("name", { required: "নাম আবশ্যক" })}
          />
          <InputField 
            icon={<Phone size={18} />}
            label="ফোন"
            placeholder="017XXXXXXXX"
            error={errors.phone}
            registration={register("phone", { 
                required: "নম্বর দিন", 
                pattern: { value: /^[0-9]{11}$/, message: "১১ ডিজিট দিন" } 
            })}
          />
        </div>

        {/* Row 2: Email */}
        <InputField 
          icon={<Mail size={18} />}
          label="ইমেইল"
          placeholder="example@mail.com"
          error={errors.email}
          registration={register("email", { required: "ইমেইল আবশ্যক" })}
        />

        {/* Row 3: Password */}
        <InputField 
          icon={<Lock size={18} />}
          label="পাসওয়ার্ড"
          placeholder="••••••••"
          type="password"
          error={errors.password}
          registration={register("password", { required: "পাসওয়ার্ড দিন" })}
        />

        {/* Premium Submit Action */}
        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isRegisterLoading && wait}
            className={`
              relative w-full py-5 rounded-[1.5rem] font-black text-[12px] uppercase tracking-[0.2em]
              transition-all duration-500 overflow-hidden shadow-2xl
              ${isRegisterLoading && wait 
                ? 'bg-slate-100 text-slate-400' 
                : 'bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-red-200'}
            `}
          >
            <div className="flex items-center justify-center gap-3 relative z-10">
              {isRegisterLoading && wait ? (
                <><LoadingSvg /> অনুরোধ পাঠানো হচ্ছে...</>
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>নিবন্ধন সম্পন্ন করুন</span>
                </>
              )}
            </div>
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Extracted Sub-Component for a cleaner "Premium" architecture
const InputField = ({ icon, label, error, registration, type = "text", placeholder }: any) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center px-1">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">{label}</label>
      <AnimatePresence>
        {error && (
          <motion.span 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[9px] font-bold text-red-500 uppercase bg-red-50 px-2 py-0.5 rounded-md"
          >
            {error.message}
          </motion.span>
        )}
      </AnimatePresence>
    </div>

    <motion.div 
      variants={{
        error: { x: [-2, 2, -2, 2, 0], transition: { duration: 0.4 } }
      }}
      animate={error ? "error" : ""}
      className="relative group"
    >
      <div className={`
        absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 z-10
        ${error ? 'text-red-500 scale-110' : 'text-slate-400 group-focus-within:text-red-500'}
      `}>
        {error ? <AlertCircle size={18} /> : icon}
      </div>

      <input 
        type={type}
        {...registration}
        placeholder={placeholder}
        className={`
          w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300 outline-none font-semibold text-slate-700
          ${error 
            ? 'border-red-100 bg-red-50/30 text-red-900 placeholder:text-red-300' 
            : 'border-slate-100 bg-white group-focus-within:border-red-500 group-focus-within:shadow-[0_0_20px_rgba(239,68,68,0.1)]'}
        `}
      />
    </motion.div>
  </div>
);

export default RegisterForm;