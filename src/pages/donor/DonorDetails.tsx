import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, X, ShieldCheck, Mail, Calendar, Droplets, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import TimerAvailability from "./components/DonarAvailablity";

const calculateDaysAgo = (dateString: string) => {
  if (!dateString) return "0";
  const lastDate = new Date(dateString);
  const today = new Date();
  
  // Calculate difference in milliseconds
  const diffInMs = today.getTime() - lastDate.getTime();
  // Convert to days
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  return diffInDays > 0 ? diffInDays : "0";
};
export default function DonorDetailsModal({ donor, isOpen, onClose }: any) {
  if (!donor) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Content Animation */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden border border-white/10"
          >
            {/* Header Banner */}
            <div className="relative h-36 bg-gradient-to-br from-red-600 to-rose-500">
              <button 
                onClick={onClose}
                className="cursor-pointer absolute top-6 right-6 p-2.5 bg-white/20 hover:bg-white/40 backdrop-blur-lg rounded-full text-white transition-all z-20"
              >
                <X size={20} />
              </button>
            </div>

            {/* Profile Info */}
            <div className="relative px-8 pb-10">
              <div className="absolute -top-16 left-8 flex items-end gap-4">
                <div className="relative">
                  <img 
                    src={donor.pic || `https://ui-avatars.com/api/?name=${donor.name}&background=random`} 
                    className="w-32 h-32 rounded-[2.5rem] border-[6px] border-white object-cover shadow-2xl"
                    alt=""
                  />
                  {donor.is_verified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-2xl border-4 border-white shadow-lg">
                      <ShieldCheck size={20} fill="currentColor" />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-20 flex justify-between items-start">
                <div>
                  <h2 className="capitalize text-3xl font-black text-slate-800 tracking-tight">{donor.name}</h2>
                  <p className="capitalize flex items-center gap-1.5 text-slate-500 font-semibold mt-1">
                    <MapPin size={16} className="text-red-500" /> {donor.address}
                  </p>
                </div>
                <div className="bg-red-600 px-5 py-3 rounded-3xl text-center shadow-lg shadow-red-200">
                  <p className="text-[10px] font-black text-red-100 uppercase tracking-widest">Group</p>
                  <p className="text-2xl font-black text-white">{donor.blood_group}</p>
                </div>
              </div>
                <TimerAvailability donatedAt={donor.last_donated}/>


              {/* Health & Status Badges */}
              <div className="flex gap-3 mt-6">
                <div className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-2xl border font-bold text-xs uppercase tracking-wider ${donor.is_available ? 'bg-green-50 border-green-100 text-green-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${donor.is_available ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                  {donor.is_available ? "Available" : "Away"}
                </div>
                <div className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-2xl border font-bold text-xs uppercase tracking-wider ${donor.is_verified ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-orange-50 border-orange-100 text-orange-600'}`}>
                  {donor.is_verified ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                  {donor.is_verified ? "Verified" : "Pending"}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 my-6">
                 <div className="bg-slate-50 rounded-2xl p-3 text-center">
                    <Droplets size={18} className="text-red-500 mx-auto mb-1" />
                    <p className="text-lg font-black text-slate-800">{donor.donate_count || 0}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Donations</p>
                 </div>

                {
                  donor.last_donated && <div className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100 hover:bg-blue-50 transition-colors group/clock">
                  <Clock 
                    size={18} 
                    className="text-blue-500 mx-auto mb-1 group-hover/clock:scale-110 transition-transform" 
                  />
                  <p className="text-lg font-black text-slate-800 leading-none">
                    {calculateDaysAgo(donor.last_donated)}
                  </p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">
                    Days Ago
                  </p>
                </div>
                }
                 
                 <div className="bg-slate-50 rounded-2xl p-3 text-center">
                    <Calendar size={18} className="text-purple-500 mx-auto mb-1" />
                    <p className="text-lg font-black text-slate-800">{donor.age || 24}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Age</p>
                 </div>
              </div>

              {/* Contact Info */}
              <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 mb-8 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-600">{donor.email}</span>
                </div>
              </div>

              {/* Call Action */}
              <a 
                href={`tel:${donor.phone}`}
                className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 hover:bg-black text-white rounded-[2rem] font-bold transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
              >
                <Phone size={20} />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
