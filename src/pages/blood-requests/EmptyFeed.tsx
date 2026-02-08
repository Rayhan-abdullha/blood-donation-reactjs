import { 
 Inbox, Activity,
} from "lucide-react";
import { motion } from "framer-motion";

function EmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden text-center py-20 px-8 bg-white rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/20"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-50/50 rounded-full blur-3xl -z-10" />
      
      <div className="relative z-10">
        <div className="w-24 h-24 bg-gradient-to-tr from-slate-50 to-white rounded-[2.5rem] shadow-inner flex items-center justify-center mx-auto mb-8 rotate-3 border border-slate-50">
          <Inbox size={48} strokeWidth={1.5} className="text-slate-200" />
        </div>
        
        <h3 className="text-2xl font-[1000] text-slate-900 mb-3 tracking-tight">
          সবাই সুস্থ আছে!
        </h3>
        
        <p className="text-slate-500 text-sm font-medium max-w-[240px] mx-auto leading-relaxed mb-10">
          বর্তমানে কোনো সক্রিয় ব্লাড রিকোয়েস্ট নেই। নতুন রিকোয়েস্ট আসলে এখানে লাইভ দেখতে পাবেন।
        </p>

        <button className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-3xl font-black text-sm hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
          <Activity size={16} /> ফিড রিফ্রেশ করুন
        </button>
      </div>
    </motion.div>
  );
}
export default EmptyState