import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, Search, Droplets, ShieldCheck, HeartPulse } from "lucide-react";

interface Donor {
  id: number;
  name: string;
  blood_group: string;
  pic: string;
  address: string;
  phone: string;
  is_verified: boolean;
}

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: Donor[];
}

export default function RequestResultsModal({ isOpen, onClose, requests }: ResultsModalProps) {
  const AUTO_CLOSE_TIME = 15000; // 5 seconds

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, AUTO_CLOSE_TIME);
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
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-20"
          >
            {/* Header */}
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
                  requests.map((donor) => (
                    <motion.div 
                      key={donor.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="group relative flex items-center justify-between p-4 bg-slate-50 rounded-[2rem] border border-transparent hover:border-red-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {/* Profile Image or Blood Group Fallback */}
                          <div className="w-14 h-14 rounded-2xl bg-white flex flex-col items-center justify-center border border-slate-100 overflow-hidden group-hover:border-red-100 transition-colors">
                            {donor.pic ? (
                                <img src={donor.pic} alt={donor.name} className="w-full h-full object-cover" />
                            ) : (
                                <>
                                    <span className="text-xs font-black text-red-600 leading-none">{donor.blood_group}</span>
                                    <Droplets size={12} className="text-red-500 mt-1" fill="currentColor" />
                                </>
                            )}
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                        </div>

                        <div>
                          <h4 className="capitalize font-black text-slate-800 text-base group-hover:text-red-600 transition-colors">
                            {donor.name || "Anonymous"} 
                            <span className="ml-2 text-xs text-red-500 font-bold">({donor.blood_group})</span>
                          </h4>
                          <div className="flex flex-col gap-0.5 mt-1">
                            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                              <MapPin size={12} className="text-slate-400" /> {donor.address}
                            </span>
                            {donor.is_verified && (
                                <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter flex items-center gap-1">
                                    <ShieldCheck size={10} /> Verified Donor
                                </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <a 
                        href={`tel:${donor.phone}`}
                        className="flex items-center gap-2 bg-slate-900 text-white pl-4 pr-5 py-3 rounded-2xl text-xs font-black hover:bg-red-600 hover:shadow-lg transition-all active:scale-95"
                      >
                        <Phone size={14} fill="currentColor" />
                        যোগাযোগ
                      </a>
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
                  এটি {AUTO_CLOSE_TIME / 1000} সেকেন্ড পর বন্ধ হয়ে যাবে
                </p>
                <div className="h-1.5 w-48 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: AUTO_CLOSE_TIME / 1000, ease: "linear" }}
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