import { Check, X, Trash2, MapPin, Phone, Mail, MoreVertical } from "lucide-react";
import useGetAllDonorRequests from "../../hooks/useGetAllDonorRequests";
import BloodRequestSkeleton from "../blood-requests/SkeletonBloodRequest";
export type PendingDonor = {
  id: number;
  pic: string;
  address: string;
  nid: string;
  blood_group: string; // e.g. "O+"
  name: string;
  email: string;
  phone: string;
};


export default function DonorVerificationView() {
    const { data, isLoading } = useGetAllDonorRequests()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Donor Verification</h3>
          <p className="text-slate-500 text-sm font-medium">Verify credentials before they appear in public search.</p>
        </div>
        <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-2xl border border-amber-100 text-xs font-bold">
          {data?.data.length} Pending Approval
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {
                isLoading ? (
                    <BloodRequestSkeleton/>
                ) : data?.data?.map((donor: PendingDonor) => (
                <div key={donor?.id} className="bg-white rounded-[2.5rem] border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all group">
                    <div className="flex items-start justify-between mb-6">
                    <div className="flex gap-4">
                        <div className="relative">
                        <img 
                            src={donor?.pic} 
                            alt={donor.name} 
                            className="w-20 h-20 rounded-[1.5rem] object-cover bg-slate-100 border-2 border-slate-50" 
                        />
                        <div className="absolute -bottom-2 -right-2 bg-red-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black border-4 border-white text-sm shadow-lg">
                            {donor?.blood_group}
                        </div>
                        </div>
                        <div>
                        <h4 className="capitalize text-lg font-black text-slate-800">{donor?.name}</h4>
                        <div className="flex items-center gap-2 text-slate-400 text-xs mt-1 font-bold">
                            <Mail size={12} /> {donor?.email}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs mt-1 font-bold">
                            <Phone size={12} /> {donor?.phone}
                        </div>
                        </div>
                    </div>
                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreVertical size={20} />
                    </button>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg text-red-500 shadow-sm">
                        <MapPin size={16} />
                    </div>
                    <p className="capitalize text-xs font-bold text-slate-600">{donor?.address}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                    <button className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-2xl font-black text-xs hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 transition-all active:scale-95">
                        <Check size={16} strokeWidth={3} /> Approve
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 py-3 rounded-2xl font-black text-xs hover:bg-slate-50 transition-all active:scale-95">
                        <X size={16} strokeWidth={3} /> Decline
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-2xl font-black text-xs hover:bg-red-600 hover:text-white transition-all active:scale-95">
                        <Trash2 size={16} /> Delete
                    </button>
                    </div>
                </div>
            ))
        }
      </div>
      
      {data?.data.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-[3rem]">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No pending verifications</p>
        </div>
      )}
    </div>
  );
}