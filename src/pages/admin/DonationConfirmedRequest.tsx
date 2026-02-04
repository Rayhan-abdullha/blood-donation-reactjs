import { CheckCircle, XCircle, MapPin, Phone, Calendar, Heart, Hospital, Activity } from "lucide-react";
import { motion } from "framer-motion";
import useGetAllCompleteOrDeclineDonation from "../../hooks/useGetAllCompleteOrDeclineDonation";
import type { MarkDonationDetails } from "../../types";
import toast from "react-hot-toast";
import useAdminCompleteDonation from "../../hooks/useCompleteDonation";
import LoadingSvg from "../../components/LoadingSvg";

// --- SKELETON LOADER ---
const ReviewSkeleton = () => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 animate-pulse">
    <div className="h-12 w-12 bg-slate-100 rounded-2xl mb-4" />
    <div className="space-y-3">
      <div className="h-4 w-3/4 bg-slate-100 rounded" />
      <div className="h-3 w-1/2 bg-slate-50 rounded" />
    </div>
    <div className="mt-6 space-y-2">
      <div className="h-20 w-full bg-slate-50 rounded-2xl" />
      <div className="h-20 w-full bg-slate-50 rounded-2xl" />
    </div>
  </div>
);

const DonationConfirmedReviewRequest = () => {
  const { data, isLoading } = useGetAllCompleteOrDeclineDonation();
  const { mutate, isPending, variables } = useAdminCompleteDonation();
  const action = variables?.action
  const responses = (data?.data as MarkDonationDetails[]) || [];
  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {[...Array(4)].map((_, i) => <ReviewSkeleton key={i} />)}
    </div>
  );

  const handleIsCompleteDonation = (
    action: "donated" | "timeout",
    donorId: number,
    requestId: number,
    donatedQt: number
  ) => {
    const data = {
      action,
      donor_id: donorId,
      request_id: requestId,
      donated_quantity: donatedQt // fixed typo
    };
    mutate(data, {
      onSuccess: () => {
        if (action === "donated") {
          toast.success("ডোনেশন সফল হয়েছে!");
        } else if (action === "timeout") {
          toast.success("ডোনেশন কমপ্লিট রিকুয়েস্ট ডিসমিস হয়েছে!");
        }
      },
      onError: () => toast.error("কিছু ভুল হয়েছে"),
    });
  };

  if (!responses || responses.length === 0) return (
    <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200 m-4">
      <Heart size={48} className="text-slate-200 mb-4" />
      <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No records found</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {responses.map((item: MarkDonationDetails, idx: number) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col"
        >
          {/* Top Section: Donor Info */}
          <div className="p-6 pb-0 flex justify-between items-start">
            <div className="flex gap-4">
              <div className="relative">
                <img
                  src={item.pic || "https://via.placeholder.com/150"}
                  className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50"
                  alt="donor"
                />
                <div className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg border-2 border-white">
                  {item.blood_group}
                </div>
              </div>
              <div>
                <h3 className="text-base font-black text-slate-800 tracking-tight">{item.donor_name}</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Donor / User ID: {item.donor_user_id}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Phone size={10} className="text-blue-500" />
                  <span className="text-[11px] font-bold text-slate-600">{item.donor_phone}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-black text-slate-300 uppercase block">Ref: #{item.id}</span>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg mt-1 inline-block">
                Qty: {item.donated_quantity} Bag
              </span>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 space-y-4">
            {/* Hospital & Location */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <Hospital size={12} className="text-slate-400" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Hospital</span>
                </div>
                <p className="text-[11px] font-bold text-slate-700 truncate">{item.hospital}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={12} className="text-slate-400" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Location</span>
                </div>
                <p className="text-[11px] font-bold text-slate-700 truncate">{item.location}</p>
              </div>
            </div>

            {/* Patient Info Section */}
            <div className="bg-blue-50/30 p-4 rounded-[1.8rem] border border-blue-50">
              <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-3">Patient Details</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-500">Name:</span>
                  <span className="text-[11px] font-black text-slate-800">{item.patient_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-500">Phone:</span>
                  <span className="text-[11px] font-black text-slate-800">{item.patient_phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-500">Email:</span>
                  <span className="text-[11px] font-medium text-slate-600 italic">{item.patient_email}</span>
                </div>
              </div>
            </div>

            {/* Date & Action Type */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Calendar size={12} className="text-slate-300" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity size={12} className="text-slate-300" />
                <span className="text-[10px] font-bold text-slate-400 uppercase italic">
                  Action: {item.action}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 pt-0 mt-auto">
            {item.donor_status === "accepted" ? (
              // Status accepted → show buttons
              <div className="flex gap-3">
                <button 
                  onClick={() => handleIsCompleteDonation("donated", item.assigned_donor_id, item.request_id, item.donated_quantity)}
                  className="flex-1 bg-slate-900 text-white py-3 rounded-2xl flex gap-2 items-center cursor-pointer font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    {
                        isPending && action === "donated" ? <><LoadingSvg/> <span className="text-md">অপেক্ষা করুন...</span></>: <span className="flex gap-2 items-center">
                      <CheckCircle size={18} strokeWidth={3} className="shrink-0" />
                      <span className="truncate">রক্তদান সম্পন্ন (Complete)</span>
                       </span>
                    }
                </button>
                <button 
                  onClick={() => handleIsCompleteDonation("timeout", item.assigned_donor_id, item.request_id, item.donated_quantity)}
                  className="px-6 bg-white border border-slate-200 flex gap-2 items-center cursor-pointertext-slate-400 py-3 rounded-2xl font-black text-[10px] uppercase hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all active:scale-95"
                >
                    {
                    isPending && action === "timeout" ? <><LoadingSvg text="tex-red-600"/> <span className="text-md">অপেক্ষা করুন...</span></>: <span className="flex gap-2 items-center">
                  <CheckCircle size={18} strokeWidth={3} className="shrink-0" />
                  <span className="truncate">Decline</span>
                </span>
                }
                </button>
              </div>
            ) : item.donor_status === "donated" ? (
              // Status donated → show donated mark
              <div className="w-full flex items-center justify-center gap-2 bg-green-50 border border-green-100 text-green-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-default">
                <CheckCircle size={16} strokeWidth={3} /> রক্তদান সম্পন্ন (Donated)
              </div>
            ) : item.donor_status === "timeout" ? (
              // Status timeout → show declined mark
              <div className="w-full flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 text-slate-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-default">
                <XCircle size={16} /> বাতিল (Timeout)
              </div>
            ) : null}
          </div>

        </motion.div>
      ))}
    </div>
  );
};

export default DonationConfirmedReviewRequest;
