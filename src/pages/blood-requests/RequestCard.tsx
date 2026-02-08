import type { BloodRequest } from "../../types";
import CountdownTimer from "../donor/Timer";
import { 
  Droplets, MapPin, Hospital, Clock, Phone, Users, Activity,
  Share2
} from "lucide-react";
import { motion } from "framer-motion";


function RequestCard({ req, getTimeAgo }: { req: BloodRequest, getTimeAgo: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative bg-white border border-slate-100 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.07)] transition-all duration-700"
    >
      {/* Floating Urgency Tag */}
      <div className="absolute -top-4 left-8 z-10">
        <div className={`px-5 py-2 rounded-2xl shadow-lg flex items-center gap-2 backdrop-blur-md border border-white/20 
          ${req.urgency === 'urgent' ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'}`}>
          <Activity size={14} className={req.urgency === 'urgent' ? 'animate-pulse' : ''} />
          <span className="text-[11px] font-black uppercase tracking-tighter">
            {req.urgency === 'urgent' ? 'জরুরী সাহায্য প্রয়োজন' : 'রক্তের রিকোয়েস্ট'}
          </span>
        </div>
      </div>

      {/* Profile Header */}
      <div className="p-8 pb-4 flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden">
               <span className="text-xl font-black text-red-600">{req.blood_type[0]}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-lg shadow-md">
                <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
          </div>
          <div>
            <h4 className="capitalize text-lg font-black text-slate-800 leading-none mb-1">{req.name}</h4>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
              <Clock size={12} /> {getTimeAgo(req.created_at)}
            </p>
          </div>
        </div>
        <CountdownTimer expiresAt={req.expires_at} />
      </div>

      {/* Main Stats Card */}
      <div className="px-6">
        <div className="bg-slate-50 rounded-[2.5rem] p-6 border border-slate-100/50">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
               <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">রক্তের গ্রুপ</p>
               <div className="flex items-center gap-2">
                 <Droplets size={20} className="text-red-500" fill="currentColor" />
                 <span className="text-3xl font-[1000] text-slate-900">{req.blood_type}</span>
               </div>
            </div>
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
               <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">পরিমাণ</p>
               <div className="flex items-center gap-2">
                 <span className="text-3xl font-[1000] text-slate-900">{req.quantity}</span>
                 <span className="text-xs font-bold text-slate-500">ব্যাগ</span>
               </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <Hospital size={16} />
              </div>
              <span className="capitalize text-sm font-bold">{req.hospital}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                <MapPin size={16} />
              </div>
              <span className="capitalize text-sm font-bold">{req.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="p-8 py-6">
        <p className="capitalize text-slate-600 text-sm leading-relaxed font-medium bg-red-50/30 p-4 rounded-2xl border-l-4 border-red-500">
          {req.description}
        </p>
      </div>

      {/* Interaction Footer */}
      <div className="px-8 pb-8 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 px-4 py-4 bg-slate-900 rounded-3xl text-white">
           <a href={`tel:${req.phone}`} className="flex-1 flex items-center justify-center gap-2 font-black text-sm">
             <Phone size={18} fill="currentColor" /> কল করুন
           </a>
        </div>
        
        <button className="p-4 bg-slate-50 text-slate-400 rounded-3xl hover:bg-slate-100 transition-all group">
          <Share2 size={20} className="group-hover:text-slate-900 transition-colors" />
        </button>
      </div>

      {/* Live Social Proof */}
      <div className="px-8 pb-6 border-t border-slate-50 pt-4 flex justify-between items-center">
        <div className="flex -space-x-2">
          {[1,2,3].map(i => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
          ))}
          <div className="w-6 h-6 rounded-full border-2 border-white bg-red-50 flex items-center justify-center text-[8px] font-black text-red-600">
            +5
          </div>
        </div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
          <Users size={12} /> ৮ জন আগ্রহ দেখিয়েছেন
        </span>
      </div>
    </motion.div>
  );
}
export default RequestCard