import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, Search, Droplets, ShieldCheck, HeartPulse } from "lucide-react";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: any[]; // Replace with your actual donor data type
}

export default function RequestResultsModal({ isOpen, onClose, requests }: ResultsModalProps) {
  
  // Auto-close logic
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden z-20"
          >
            {/* Header Sticky */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-slate-50 flex justify-between items-center z-30">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-50 rounded-2xl text-red-600">
                  <Search size={22} strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">
                    রক্তদাতা পাওয়া গেছে
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {requests?.length || 0} জন দাতা আপনার কাছাকাছি আছেন
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-4">
                {requests && requests.length > 0 ? (
                  requests.map((donor, id) => (
                    <motion.div 
                      key={id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: id * 0.1 }}
                      className="group relative flex items-center justify-between p-5 bg-slate-50 rounded-[2rem] border border-transparent hover:border-red-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-5">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-2xl bg-white flex flex-col items-center justify-center border border-slate-100 shadow-sm group-hover:border-red-100 transition-colors">
                            <span className="text-xs font-black text-red-600 leading-none">A+</span>
                            <Droplets size={12} className="text-red-500 mt-1" fill="currentColor" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                        </div>

                        <div>
                          <h4 className="font-black text-slate-800 text-base group-hover:text-red-600 transition-colors">
                            {donor.name || "Donor Name"}
                          </h4>
                          <div className="flex flex-col gap-1 mt-1">
                            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                              <MapPin size={12} className="text-slate-400" /> {donor.location || "Location"}
                            </span>
                            <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter flex items-center gap-1">
                              <ShieldCheck size={10} /> Verified Donor
                            </span>
                          </div>
                        </div>
                      </div>

                      <button className="flex items-center gap-2 bg-slate-900 text-white pl-4 pr-5 py-3 rounded-2xl text-xs font-black hover:bg-red-600 hover:shadow-lg hover:shadow-red-200 transition-all active:scale-95">
                        <Phone size={14} fill="currentColor" />
                        যোগাযোগ
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HeartPulse size={40} className="text-slate-200" />
                    </div>
                    <h4 className="text-slate-800 font-black italic">দুঃখিত!</h4>
                    <p className="text-slate-500 text-xs font-medium mt-1">এই মুহূর্তে কোনো দাতা পাওয়া যায়নি।</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer with Progress Bar */}
            <div className="p-6 bg-slate-50/50 border-t border-slate-100">
              <div className="flex flex-col items-center gap-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  এটি ৫ সেকেন্ড পর বন্ধ হয়ে যাবে
                </p>
                <div className="h-1.5 w-48 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 10, ease: "linear" }}
                    className="h-full bg-red-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}