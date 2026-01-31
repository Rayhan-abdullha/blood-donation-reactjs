import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Mail, User, Phone, Calendar, Plus, 
  MoreVertical, HeartPulse, Droplets, ChevronDown, ChevronUp, Users, 
  Hospital, Search, CheckCircle2, Clock
} from "lucide-react";
import uesGetResponseByDonor from "../../hooks/useGetResponseByDonor";
import useMyBloodRequests from "../../hooks/useMyBloodRequests";
import BloodRequestSkeleton from "../blood-requests/SkeletonBloodRequest";
import CountdownTimer from "../donor/Timer";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function UserDashboard() {
  const { data, isLoading } = useMyBloodRequests();
  const { user } = useAuthStore();

  return (
    <div className="max-w-5xl mx-auto mt-24 px-4 pb-16 font-sans">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 mb-8 text-white shadow-2xl shadow-slate-200">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-[1000] mb-3 tracking-tight">স্বাগতম, {user?.name}! 👋</h1>
          <p className="text-slate-400 text-base font-medium max-w-lg leading-relaxed">
            আপনার রক্তের আবেদন এবং দাতাদের তালিকা পরিচালনা করুন
          </p>
        </div>
        <div className="absolute top-[-30%] right-[-5%] w-80 h-80 bg-red-600/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">আপনার কার্যক্রম</h2>
        <Link to={"/blood/request"} className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-600 text-white px-7 py-3.5 rounded-[1.3rem] font-black text-[11px] uppercase tracking-[0.15em] transition-all active:scale-95 shadow-xl shadow-slate-200">
          <Plus size={18} strokeWidth={3} /> নতুন আবেদন
        </Link>
      </div>

      {/* Requests List */}
      <div className="grid grid-cols-1 gap-8">
        {isLoading ? (
          <BloodRequestSkeleton />
        ) : data?.data?.length > 0 ? (
          data?.data?.map((r: any) => (
            <RequestWithResponses key={r.id} request={r} />
          ))
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] py-24 text-center">
            <HeartPulse size={54} className="mx-auto text-slate-100 mb-4" />
            <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">সক্রিয় কোনো আবেদন নেই</p>
          </div>
        )}
      </div>
    </div>
  );
}

function RequestWithResponses({ request }: { request: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: responseData } = uesGetResponseByDonor(request.id);
  const responses = responseData?.data || [];
  
  // Logical groupings for UI
  const expired = new Date(request.expires_at) < new Date();
  const isActive = (request?.status === "searching" || request?.status === "pending" || request?.status === "accepted") && !expired
  const isCompleted = request?.status === "completed"
 
  return (
    <div className={`bg-white rounded-[2.5rem] border transition-all duration-500 overflow-hidden
        ${isActive ? 'border-red-100 shadow-lg shadow-red-50' : 'border-slate-200 shadow-sm opacity-90'}`}>
      
      {/* 1. PRIMARY REQUEST HEADER */}
      <div className="p-6 md:p-8 relative">
        
        {/* Status Animated Badge */}
        {isActive && (
           <div className="absolute top-6 right-8 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Searching Live</span>
           </div>
        )}

        {
          isCompleted ? (
            <div className="absolute top-6 right-8 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Completed</span>
            </div>
          ) : expired && (
            <div className="absolute top-6 right-8 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Expired</span>
            </div>
          )
        }

        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* Blood Group Square */}
          <div className="shrink-0">
            <div className={`w-20 h-20 rounded-[1.8rem] flex flex-col items-center justify-center border transition-all shadow-sm
              ${request.urgency === 'urgent' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-50 border-slate-100 text-slate-800'}`}>
              <Droplets size={14} fill="currentColor" className="mb-0.5 opacity-60" />
              <span className="text-3xl font-[1000] leading-none tracking-tighter">{request.blood_type}</span>
              <span className="text-[8px] font-black uppercase tracking-widest mt-1 opacity-40">Group</span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border
                      ${request.urgency === "urgent" ? "bg-red-50 border-red-100 text-red-600" : "bg-amber-50 border-amber-100 text-amber-600" }`}>
                      {request.urgency === "urgent" ? "জরুরি" : "সাধারণ" }
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5
                      ${isActive ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-green-50 border-green-100 text-green-600'}`}>
                        {isActive ? <Search size={10} strokeWidth={3}/> : <CheckCircle2 size={10} strokeWidth={3}/>}
                        {request.status === "searching" ? "দাতা খোঁজা হচ্ছে" : 
                         request.status === "accepted" ? "গ্রহন করা হয়েছে" : 
                         request.status === "completed" ? "রক্তদান সম্পন্ন" : "আবেদন পেন্ডিং"}
                    </span>
                </div>

              <CountdownTimer expiresAt={request.expires_at} />
              
              <div className="pt-2">
                <h3 className="capitalize flex items-center gap-2 text-md font-black text-slate-700 leading-tight">
                  <Hospital size={15} className="text-blue-500 shrink-0" /> 
                  <span className="truncate">{request.hospital}</span>
                </h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
                  <Calendar size={12} /> {new Date(request.created_at).toLocaleDateString("bn-BD")}
                </p>
              </div>
            </div>

            <div className="hidden md:flex flex-col justify-center border-x border-slate-100 px-8">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">প্রয়োজনীয় রক্ত</p>
              <p className="text-2xl font-[1000] text-slate-800 tracking-tighter">
                {String(request.quantity).padStart(2, '0')} 
                <span className="text-xs font-black text-slate-400 ml-2">ব্যাগ</span>
              </p>
            </div>

            <div className="flex items-center md:justify-end gap-3 w-full md:w-auto">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                  ${isOpen ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                {isOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                {isOpen ? 'বন্ধ করুন' : 'দাতা তালিকা'}
              </button>
              <button className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-200 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DONOR RESPONSES SECTION */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-slate-50/50 border-t border-slate-100"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                   <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
                     <Users size={18} className="text-blue-500" />
                   </div>
                   <div>
                     <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em]">সংগৃহীত সাড়া</h4>
                     <p className="text-[10px] font-bold text-slate-400">{responses.length} জন দাতা সাড়া দিয়েছেন</p>
                   </div>
                </div>
                {isActive && (
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full">
                    <Clock size={12} className="text-amber-500" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">নতুন সাড়ার অপেক্ষা</span>
                  </div>
                )}
              </div>

              {responses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {responses.map((donor: any, idx: number) => (
                    <motion.div 
                      key={donor.ID}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white p-5 rounded-[1.8rem] border border-slate-200 shadow-sm flex flex-col gap-5 hover:border-blue-400 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {donor.Pic ? (
                            <img src={donor.Pic} alt={donor.Name} className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-sm" />
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                              <User size={24} />
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-600 border-2 border-white rounded-full flex items-center justify-center text-[9px] font-black text-white shadow-sm">
                            {donor.BloodGroup}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-base font-[1000] text-slate-800 tracking-tight leading-none">{donor.Name}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border
                              ${donor.Status === 'accepted' ? 'bg-green-50 border-green-100 text-green-600' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
                              {donor.Status === 'accepted' ? 'গ্রহনকৃত' : 'অপেক্ষমান'}
                            </span>
                          </div>
                        </div>
                        
                        <a href={`tel:${donor.Phone}`} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm">
                          <Phone size={18} fill="currentColor" />
                        </a>
                      </div>

                      <div className="grid grid-cols-1 gap-2 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                         <div className="flex items-center gap-3 text-slate-500">
                            <MapPin size={14} className="text-slate-400 shrink-0" />
                            <span className="text-[11px] font-bold truncate tracking-tight uppercase">{donor.Address || "ঠিকানা দেওয়া হয়নি"}</span>
                         </div>
                         <div className="flex items-center gap-3 text-slate-500">
                            <Mail size={14} className="text-slate-400 shrink-0" />
                            <span className="text-[11px] font-bold truncate tracking-tight">{donor.Email || "ইমেইল নেই"}</span>
                         </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white/60 rounded-[2.5rem] border-2 border-dashed border-slate-100">
                  <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                    <Search size={24} className="text-slate-200 animate-pulse" />
                  </div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">এখনও কেউ সাড়া দেয়নি</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-2">দাতাদের সাড়ার জন্য অপেক্ষা করুন</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}