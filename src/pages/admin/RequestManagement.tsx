import { RefreshCcw, MapPin, ChevronUp, Activity, Droplets, Hospital, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added for smoother premium animations
import useGetAllBloodRequests from "../../hooks/useGetAllBloodRequests";
import CountdownTimer from "../donor/Timer";

function RequestManagementView() {
  const { data, isLoading } = useGetAllBloodRequests();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (isLoading) return (
    <div className="p-20 flex flex-col items-center justify-center space-y-4">
      <RefreshCcw className="animate-spin text-red-600" size={40} />
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Initializing Secure Feed...</p>
    </div>
  );

  return (
    <div className="space-y-10 max-w-9xl mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
            Blood <span className="text-red-600">Requests</span>
          </h3>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em] mt-2 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Real-Time Network Monitoring
          </p>
        </motion.div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-600 bg-white border-2 border-slate-100 px-8 py-4 rounded-[1.5rem] shadow-xl shadow-slate-100 hover:border-slate-900 transition-all"
        >
          <RefreshCcw size={14}/> Sync Database
        </motion.button>
      </div>

      {/* Requests Grid */}
      <div className="grid gap-8">
        {data?.data?.map((req: any, index: number) => (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group bg-white rounded-[3.5rem] border-2 transition-all duration-500 
              ${expandedId === req.id 
                ? 'border-red-200 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]' 
                : 'border-red-50 hover:border-red-100 hover:shadow-[0_30px_60px_-12px_rgba(220,38,38,0.1)]'}`}
          >
            
            {/* MAIN CARD ROW */}
            <div className="p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-8 w-full lg:w-auto">
                {/* Blood Type Display */}
                <div className="relative">
                  <div className={`w-24 h-24 rounded-[2.5rem] flex flex-col items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-105
                    ${req.status === 'searching' ? 'bg-slate-900 text-white' : 'bg-red-50 text-red-600'}`}>
                    <span className="text-3xl font-black leading-none">{req.blood_type}</span>
                    <span className="text-[9px] font-black uppercase tracking-tighter mt-1 opacity-50">Group</span>
                  </div>
                  {req.status === 'searching' && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded-lg border-4 border-white animate-bounce">LIVE</span>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-4 flex-wrap">
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight capitalize">
                      {req.patient?.name}
                    </h4>
                    
                    <div className={`
  relative inline-flex items-center gap-2.5 px-4 py-1.5 
  rounded-full border-2 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] 
  transition-all duration-500 hover:scale-105 hover:shadow-md
  ${req.urgency === "urgent" 
    ? "bg-red-50/50 text-red-700 border-red-100/80 ring-1 ring-red-200/30" 
    : "bg-emerald-50/50 text-emerald-700 border-emerald-100/80 ring-1 ring-emerald-200/30"}
`}>
  {/* Status Indicator Pulse */}
  <span className="relative flex h-2 w-2">
    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 
      ${req.urgency === "urgent" ? "bg-red-500" : "bg-emerald-500"}`}></span>
    <span className={`relative inline-flex rounded-full h-2 w-2 
      ${req.urgency === "urgent" ? "bg-red-600" : "bg-emerald-600"}`}></span>
  </span>
  
  {/* Text Label */}
  <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none capitalize italic">
    {req.urgency}
  </span>
</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-black text-slate-400 uppercase tracking-[0.1em]">
                    <span className="flex items-center gap-2 text-slate-700 capitalize"><Hospital size={16} className="text-red-500"/> {req.hospital}</span>
                    <span className="flex items-center gap-2 capitalize"><MapPin size={16}/> {req.location}</span>
                  </div>
                </div>
              </div>

              {/* Progress & UI Controls */}
              <div className="flex items-center gap-12 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-8 lg:pt-0">
                <div className="hidden sm:block space-y-3">
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fulfillment</p>
                    <span className="text-xs font-black text-slate-900">{req.fulfilled_quantity}/{req.quantity} Bags</span>
                  </div>
                  <div className="w-44 h-3 bg-slate-100 rounded-full overflow-hidden p-[2px]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(req.fulfilled_quantity / req.quantity) * 100}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-slate-900 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-sm border-2
                    ${req.status === 'searching' ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-green-50 border-green-100 text-green-600'}`}>
                    {req.status}
                  </div>
                  
                  <button 
                    onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
                    className={`w-16 h-16 rounded-[1.8rem] transition-all duration-500 flex items-center justify-center shadow-lg
                      ${expandedId === req.id ? 'bg-slate-900 text-white rotate-180 shadow-slate-300' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                  >
                    <ChevronUp size={28}/>
                  </button>
                </div>
              </div>
            </div>

            {/* EXPANDED CONTENT */}
            <AnimatePresence>
              {expandedId === req.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-10 pb-12 pt-4 border-t border-slate-50">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      
                      {/* Left: Patient Details Card */}
                      <div className="lg:col-span-4">
                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 shadow-3xl transform transition-transform hover:scale-[1.02]">
                          <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Patient Intelligence</p>
                            <div className="space-y-5">
                              <div className="flex justify-between items-center group/item">
                                <span className="text-[12px] font-bold text-slate-500 uppercase">Contact</span>
                                <span className="text-[13px] font-black tracking-wider text-white">{req.patient?.phone}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-[12px] font-bold text-slate-500 uppercase">Email</span>
                                <span className="text-[12px] font-bold text-slate-300 lowercase">{req.patient?.email}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-8 border-t border-white/5 space-y-3">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Case Description</p>
                            <p className="text-[13px] font-medium text-slate-300 leading-relaxed italic capitalize">
                              "{req.description || "Active emergency broadcast. scanning for regional verified donors..."}"
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Deployed Donors List */}
                      <div className="lg:col-span-8 space-y-6">
                        <div className="flex items-center justify-between px-2">
                          <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                            <Droplets size={18} className="text-red-600 animate-pulse"/> 
                            Deployed Responders ({req.donors?.length})
                          </h5>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {req.donors?.length > 0 ? (
                            req?.donors?.map((donor: any, idx: number) => (
                              <motion.div 
                                whileHover={{ y: -5 }}
                                key={idx} 
                                className="flex items-center justify-between bg-white p-6 rounded-[2.5rem] border border-slate-100 hover:border-red-300 transition-all shadow-sm hover:shadow-2xl hover:shadow-slate-100 group/donor"
                              >
                                <div className="flex items-center gap-5 min-w-0">
                                  <img src={donor.pic || "https://via.placeholder.com/150"} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50" alt="donor" />
                                  <div className="min-w-0">
                                    <p className="text-md font-black text-slate-900 truncate capitalize">{donor.name}</p>
                                    <p className="text-[10px] my-3 font-bold text-slate-400 uppercase tracking-tighter truncate capitalize">{donor.address}</p>
                                    <p className="text-[11px] font-black text-blue-600 mt-1">{donor.phone}</p>
                                  </div>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover/donor:bg-slate-900 group-hover/donor:text-white transition-colors">
                                  <ExternalLink size={16} />
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <div className="col-span-2 h-48 flex flex-col items-center justify-center border-4 border-dashed border-slate-50 rounded-[3.5rem] bg-slate-50/30">
                              <Activity className="text-slate-200 mb-2 animate-pulse" size={40} />
                              <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest">Searching Network...</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer Metadata */}
                    <div className="mt-12 pt-10 border-t border-slate-100 flex flex-wrap gap-10 items-center justify-between">
                      <div className="flex items-center gap-8">
                        <CountdownTimer expiresAt={req?.expires_at}/>
                        <div className="flex items-center gap-3 text-slate-400 bg-slate-50 px-6 py-3 rounded-2xl">
                          <MapPin size={16}/>
                          <span className="text-[11px] font-black uppercase tracking-widest capitalize">Area: {req.location}</span>
                        </div>
                      </div>
                      <div className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em]">
                        SECURE-UID: {req.patient?.id}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default RequestManagementView;