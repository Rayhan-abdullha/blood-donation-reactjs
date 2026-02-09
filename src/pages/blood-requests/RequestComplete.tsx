import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Mail, User, Phone, Calendar, 
  MoreVertical, Droplets, ChevronDown, ChevronUp, Users, 
  Hospital, Search, CheckCircle2, Clock,
  CheckCircle,
  XCircle,
  RefreshCcw
} from "lucide-react";
import uesGetResponseByDonor from "../../hooks/useGetResponseByDonor";
import CountdownTimer from "../donor/Timer";
import useCompleteOrCencelDonation from "../../hooks/useCompleteOrCencelDonation";
import toast from "react-hot-toast";
import ShowDate from "../../components/ShowDate";
import LoadingSvg from "../../components/LoadingSvg";

export default function RequestWithResponses({ request }: { request: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: responseData } = uesGetResponseByDonor(request.id);
  const { mutate, isPending } = useCompleteOrCencelDonation()
  const responses = responseData?.data || [];

  // Logical groupings for UI
  const expired = new Date(request.expires_at) < new Date();
  const isActive = request?.status === "searching" || request?.status === "partially_fulfilled" && !expired
  const isCompleted = request?.status === "fulfilled" || request?.staus === "partially_fulfilled" && expired

  const handleCompleteDonation = (requestId: number, donorId: number, donatedQty: number, action: "donated" | "timeout") => {
    const data = {
      request_id: requestId,
      assigned_donor_id: donorId,
      donated_quantity: donatedQty,
      action: ""
    }
    if (action === "donated") {
        data.action = "donated"
    } else if (action === "timeout") {
        data.action = "timeout"
    }
    // console.log(data)
      mutate(data, {
        onSuccess: () => {
        if (action === "donated") {
            toast.success("ডোনেশন সফল হয়েছে!")
        } else {
            toast.success("ডোনেশন রিকুয়েস্ট ডিসমিস হয়েছে!")
        }
        },
        onError: () => toast.error("somthing went to wrong")
    })
}

 
  return (
    <div className={`bg-white rounded-[2.5rem] border transition-all duration-500 overflow-hidden
        ${isActive && !expired ? 'border-red-100 shadow-lg shadow-red-50' : 'border-slate-200 shadow-sm opacity-90'}`}>
      
      {/* 1. PRIMARY REQUEST HEADER */}
      <div className="p-6 md:p-8 relative">
        
        {/* Status Animated Badge */}
        {(isActive && !expired) && (
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
          <motion.div 
            layout
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`relative w-24 h-24 rounded-[2rem] flex flex-col items-center justify-center border-2 transition-all duration-500 shadow-sm
              ${isActive && !expired
                ? 'bg-red-50 border-red-200 text-red-600 animate-pulse-slow' 
                : isCompleted 
                  ? 'bg-green-50 border-green-200 text-green-600' 
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
          >
            {/* 1. Icon Layer */}
            <div className="mb-1">
              {isActive ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Droplets size={16} fill="currentColor" className="opacity-80" />
                </motion.div>
              ) : isCompleted ? (
                <CheckCircle2 size={18} strokeWidth={3} className="text-green-500" />
              ) : (
                <XCircle size={16} className="opacity-40" />
              )}
            </div>

            {/* 2. Blood Type Text */}
            <span className={`text-3xl font-[1000] leading-none tracking-tighter ${isActive ? 'drop-shadow-sm' : ''}`}>
              {request.blood_type}
            </span>

            {/* 3. Label */}
            <span className="text-[8px] font-black uppercase tracking-[0.15em] mt-1 opacity-60">
              {isCompleted ? 'Done' : 'Group'}
            </span>

            {/* 4. Real-time Status Ping (Only if Active) */}
            {(isActive && !expired) && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
              </span>
            )}
          </motion.div>
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
                      ${isActive && !expired ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-green-50 border-green-100 text-green-600'}`}>
                        {isActive && !expired ? <Search size={10} strokeWidth={3}/> : <CheckCircle2 size={10} strokeWidth={3}/>}
                        {isActive && !expired ? "দাতা খোঁজা হচ্ছে" : 
                         request.status === "" ? "গ্রহন করা হয়েছে" : 
                      request.status === "fulfilled" ? "রক্তদান সম্পন্ন" : expired ? "Timeout" : "আবেদন পেন্ডিং"}
                    </span>
                </div>
              {
                isCompleted ? <ShowDate date={request.updated_at} /> : (
                  <CountdownTimer expiresAt={request.expires_at} />
                )
              }
              <div className="pt-2">
                <h3 className="capitalize flex items-center gap-2 text-lg font-black text-slate-700 leading-tight">
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
                className={`cursor-pointer flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                  ${isOpen ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                {isOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                {isOpen ? 'বন্ধ করুন' : 'দাতা তালিকা দেখুন'}
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
                     <p className="text-[10px] font-bold text-slate-400">{responses?.length} জন দাতা সাড়া দিয়েছেন</p>
                   </div>
                </div>
                {isActive && (
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full">
                    <Clock size={12} className="text-amber-500" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">নতুন সাড়ার অপেক্ষা</span>
                  </div>
                )}
              </div>

              {responses?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {responses?.map((donor: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white p-5 rounded-[1.8rem] border border-slate-200 shadow-sm flex flex-col gap-4 hover:border-blue-400 transition-all duration-300"
                    >
                      {/* Top Profile Section */}
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {donor.pic ? (
                            <img src={donor?.pic} alt={donor?.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-sm" />
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                              <User size={24} />
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-600 border-2 border-white rounded-full flex items-center justify-center text-[9px] font-black text-white shadow-sm">
                            {donor?.blood_group}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-base font-[1000] text-slate-800 tracking-tight leading-none">{donor?.name}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border
                              ${donor?.status === 'accepted' ? 'bg-green-50 border-green-100 text-green-600' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
                              {donor?.status === 'accepted' && 'আপনার রিকুয়েস্ট গ্রহণ করেছে'}
                              {donor?.status === 'declined' && 'আপনার রিকুয়েস্ট গ্রহণ করেনি'}
                              {donor?.status === 'donated' && 'রক্ত দান করেছে'}
                              {donor?.status === 'timeout' && 'রক্ত দান করেনি'}
                            </span>
                          </div>
                        </div>
                        
                        <a href={`tel:${donor?.phone}`} className="w-11 h-11 flex items-center justify-center rounded-xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm">
                          <Phone size={16} fill="currentColor" />
                        </a>
                      </div>

                      {/* Info Rows */}
                      <div className="grid grid-cols-1 gap-2 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3 text-slate-500">
                            <MapPin size={13} className="text-slate-400 shrink-0" />
                            <span className="text-[10px] font-bold truncate tracking-tight uppercase">{donor?.Address || "ঠিকানা দেওয়া হয়নি"}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500">
                            <Mail size={13} className="text-slate-400 shrink-0" />
                            <span className="text-[10px] font-bold truncate tracking-tight">{donor?.email || "ইমেইল নেই"}</span>
                        </div>
                          </div>
                          
                          {
                              donor?.status === 'accepted' && donor?.confirmed_by === null && (
                                <div className="flex-1 flex items-center justify-between bg-blue-50/50 border border-blue-100 p-4 rounded-2xl cursor-default group">
                                  <div className="flex items-center gap-3">
                                    {/* Animated Live Pulse Indicator */}
                                    <div className="relative flex h-3 w-3">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                      <span className="text-[11px] font-black text-blue-700 uppercase tracking-widest leading-none">
                                        দাতা রক্তদানের জন্য প্রস্তুত
                                      </span>
                                      <span className="text-[9px] font-bold text-blue-500/70 uppercase tracking-tighter mt-1">
                                        Donor is ready to donate
                                      </span>
                                    </div>
                                  </div>
                                  {/* Real-time Badge */}
                                    <div className="bg-blue-600 text-[8px] font-black text-white px-2 py-1 rounded-md uppercase tracking-tighter animate-pulse">
                                        Live
                                      </div>
                                    </div>
                                    )
                                  }
                            {/* --- ACTION BUTTONS --- */}
                            {
                              donor?.status === 'accepted' && donor?.confirmed_by === null &&
                                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                                      <button
                                          onClick={() => handleCompleteDonation(donor?.request_id, donor?.donor_id, 1, "donated")}
                                          className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 px-4 rounded-2xl font-black text-[10px] sm:text-md uppercase tracking-widest hover:bg-green-600 transition-all duration-300 active:scale-95 shadow-lg shadow-slate-100"
                                      >
                                          {
                                              isPending ? <><LoadingSvg/> <span className="text-md">অপেক্ষা করুন...</span></>: <span className="flex gap-2 items-center">
                                            <CheckCircle size={18} strokeWidth={3} className="shrink-0" />
                                            <span className="truncate">রক্তদান সম্পন্ন (Complete)</span>
                                          </span>
                                          }
                                      </button>
                                      <button
                                          onClick={() => handleCompleteDonation(donor?.request_id, donor?.donor_id, 0, "timeout")}
                                          className="cursor-pointer flex-1 sm:flex-none sm:px-6 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-500 py-4 rounded-2xl font-black text-[10px] sm:text-md uppercase tracking-tighter hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all active:scale-95">
                                          {
                                              isPending ? <><LoadingSvg text="text-red-600"/> <span className="text-md">অপেক্ষা করুন...</span></> :  <span>
                                              <span className="flex gap-2 items-center"><XCircle size={16} className="shrink-0" />
                                                <span>বাতিল (Dismiss)</span>
                                              </span></span>
                                          }
                                      </button>
                                  </div>
                            }
 
                          {
                              donor?.status === 'accepted' && donor?.confirmed_by === "user" && 
                              <div className="flex-1 flex items-center justify-center gap-3 bg-amber-50/50 border border-amber-100 text-amber-600 py-4 px-4 rounded-2xl font-black text-[10px] sm:text-[11px] uppercase tracking-widest cursor-default animate-pulse">
                                {/* Using a Refresh or Clock icon to represent 'waiting' */}
                                <RefreshCcw size={18} className="shrink-0 animate-spin-slow" />
                                <div className="flex flex-col items-center">
                                    <span>অ্যাডমিন অনুমোদনের অপেক্ষায়</span>
                                    <span className="text-[8px] opacity-70 tracking-tighter">Waiting for Admin Approval</span>
                                </div>
                                </div>
                            }     
                            <div className="flex flex-col sm:flex-row gap-3 mt-2">
                                { donor?.status === 'donated' && donor?.confirmed_by === "admin" && (
                                    /* MARKED AS COMPLETE (Static Status) */
                                    <div className="flex-1 flex items-center justify-center gap-2 bg-green-50 border border-green-100 text-green-600 py-4 px-4 rounded-2xl font-black text-[10px] sm:text-[11px] uppercase tracking-widest cursor-default">
                                    <CheckCircle size={18} strokeWidth={3} className="shrink-0" />
                                    <span className="truncate">রক্তদান সম্পন্ন (Completed)</span>
                                    </div>
                                )} 
                                    
                                  {
                                    donor?.status === 'timeout' || donor?.status === 'diclined' && donor?.confirmed_by === "admin" && (
                                    /* MARKED AS DISMISSED (Static Status) */
                                    <div className="flex-1 flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 text-slate-400 py-4 px-4 rounded-2xl font-black text-[10px] sm:text-[11px] uppercase tracking-tighter cursor-default">
                                        <XCircle size={18} className="shrink-0" />
                                        <span>বাতিল (Dismissed)</span>
                                    </div>
                                )}  
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


