import { useState } from "react";
import { 
  Phone, MapPin, ChevronDown, ChevronUp, CheckCircle, Clock, 
  Droplet, Heart, Activity, MessageSquare, ShieldCheck,
  HospitalIcon,
  Calendar
} from "lucide-react";
import Card from "../../components/Card";
import { useAuthStore } from "../../store/authStore";
import DonorCardSkeleton from "../search/DonorSkeleton";
import CountdownTimer from "./Timer";
import { motion, AnimatePresence } from "framer-motion";
import { useAcceptOrDeclineResponse } from "../../hooks/useRequestAcceptDecline";
import useDonorResponseRequests from "../../hooks/useDonorResponseRequests";

export default function DonorDashboard() {
  const { user } = useAuthStore();
  const { data, isLoading } = useDonorResponseRequests();
  const requests = data?.data || [];
  const { mutate, isPending } = useAcceptOrDeclineResponse();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleAction = (status: "accepted" | "declined", requestId: number, donorId: number) => {
    mutate({ requestId, status, donorId });
  };

  const toggleExpand = (id: number) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4 pb-12 font-sans">
      
      {/* Hero Welcome */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 mb-10 text-white shadow-2xl shadow-slate-200">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-[1000] mb-3 tracking-tight">স্বাগতম, {user?.name}! 👋</h1>
          <p className="text-slate-400 text-base font-medium max-w-lg leading-relaxed">
            আপনার রক্তদান আমাদের সমাজের শক্তি। আজই একজনকে সাহায্য করুন।
          </p>
        </div>
        <div className="absolute top-[-30%] right-[-5%] w-80 h-80 bg-red-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 px-2">
            <span className="p-2 bg-red-50 rounded-xl text-red-500"><Activity size={20}/></span> 
            নতুন অনুরোধ ({requests.length})
          </h3>
          
          {isLoading ? (
            [1, 2, 3].map((n) => <DonorCardSkeleton key={n}/>)
          ) : requests.length > 0 ? (
            requests.map((req: any) => {
              const isExpanded = expandedId === req.id;
              const isAccepted = req.status === "accepted";
              console.log(req)
              return (
                <Card key={req.id} className={`group border-none rounded-[2rem] overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 ${isAccepted ? 'bg-green-50/20' : 'bg-white'}`}>
                  
                  {/* COMPACT VIEW */}
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.8rem] flex flex-col items-center justify-center border transition-all duration-500
                          ${isAccepted ? 'bg-green-600 border-green-400 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'}`}>
                          <Droplet size={14} className={isAccepted ? "text-white" : "text-red-500"} fill="currentColor" />
                          <span className="text-2xl md:text-3xl font-[1000] tracking-tighter leading-none mt-1">{req.blood_type}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex gap-2 mb-4">
                            <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-widest border border-red-100">
                              {req.urgency === "urgent" ? "জরুরি" : "পরে লাগবে" }
                            </span>
                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${isAccepted ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'}`}>
                              {req.status === "sent" ? "১ টা রক্তের আবেদন করা হয়েছে" : isAccepted ? "তুমি রিকুয়েস্ট গ্রহন করেছ" : "তুমি রিকুয়েস্ট গ্রহন করনি"}
                            </span>
                          </div>
                          <CountdownTimer expiresAt={req.expires_at} />
                          <h4 className="flex items-center gap-2 capitalize text-md font-black text-slate-500 leading-tight mt-4">
                            <HospitalIcon size={13} className="text-slate-600 opacity-70" />
                            {req.hospital}
                          </h4>
                          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 mt-4">
                            <Calendar size={13} className="opacity-70" /> {new Date(req.created_at).toLocaleDateString("bn-BD")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-8 pt-4 md:pt-0 border-t md:border-none border-slate-50">
                        <div className="text-left md:text-right">
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Quantity</p>
                            <p className="text-2xl font-[1000] text-slate-800 tracking-tighter">
                            {String(req.quantity).padStart(2, '0')} 
                            <span className="text-xs font-black text-slate-400 ml-2">ব্যাগ</span>
                          </p>
                        </div>
                        <button 
                          onClick={() => toggleExpand(req.id)}
                          className={`cursor-pointer group/btn px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                            ${isExpanded ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                        >
                          <span className="flex items-center gap-2">
                            {isExpanded ? 'Hide Details' : 'View Details'}
                            {isExpanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* EXPANDED MODAL-LIKE VIEW */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: "auto" }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-slate-50/50 border-t border-slate-100 overflow-hidden"
                      >
                        <div className="p-8 space-y-8">
                          {/* Info Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <DetailBox icon={<MapPin size={16}/>} label="Location" value={req.location} />
                            <DetailBox icon={<Phone size={16}/>} label="Contact" value={req.phone} isLink />
                            <DetailBox icon={<ShieldCheck size={16}/>} label="Status" value={req.status} />
                          </div>

                          {/* Action Modal Area */}
                          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                              <MessageSquare size={14}/> Action Required
                            </h5>
                            
                            {isAccepted ? (
                              <div className="flex flex-col items-center py-4 space-y-3">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                  <CheckCircle size={24}/>
                                </div>
                                <p className="font-black text-slate-800 tracking-tight">You have accepted this request</p>
                              </div>
                            ) : (
                              <div className="flex flex-col sm:flex-row gap-4">
                                <button 
                                  onClick={() => handleAction("accepted", req.request_id, req.donor_id)} 
                                  disabled={isPending}
                                  className="cursor-pointer flex-[2] bg-slate-900 hover:bg-green-600 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-slate-100"
                                >
                                  {isPending ? "Processing..." : "Confirm Acceptance"}
                                </button>
                                <button 
                                  onClick={() => handleAction("declined", req.request_id, req.donor_id)} 
                                  disabled={isPending}
                                  className="cursor-pointer flex-1 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all"
                                >
                                  {isPending ? "..." : "Decline"}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
              <Clock size={40} className="text-slate-200 mx-auto mb-4"/>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[11px]">No active requests found</p>
            </div>
          )}
        </div>

        {/* Right Side: Achievement Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Heart size={28} fill="currentColor" />
            </div>
            <p className="text-6xl font-[1000] text-slate-900 tracking-tighter mb-1">0</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Donations Completed</p>
          </div>

          <div className="relative rounded-[2.5rem] p-10 overflow-hidden bg-gradient-to-br from-red-600 to-rose-600 text-white shadow-2xl shadow-red-100">
            <h2 className="text-4xl font-[1000] mb-2 tracking-tight">0 টি প্রাণ</h2>
            <p className="text-red-100 text-xs font-black uppercase tracking-[0.15em] opacity-80 mb-10">বাঁচিয়েছেন</p>
            <div className="h-3 w-full bg-black/10 rounded-full mb-6">
              <div className="h-full bg-white rounded-full shadow-lg" style={{ width: '10%' }} />
            </div>
            <button className="w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/20 transition-all active:scale-95">
              Impact Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBox({ icon, label, value, isLink }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 shadow-sm group hover:border-slate-300 transition-colors">
      <div className="flex items-center gap-2 mb-2 text-slate-400">
        <span className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">{icon}</span>
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      {isLink ? (
        <a href={`tel:${value}`} className="text-sm font-black text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-2">
          {value || "N/A"}
        </a>
      ) : (
        <p className="text-sm font-black text-slate-700 capitalize">{value}</p>
      )}
    </div>
  );
}