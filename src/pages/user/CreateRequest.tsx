import { useForm } from "react-hook-form";
import LoadingSvg from "../../components/LoadingSvg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Hospital, MapPin, MessageSquare, ChevronDown, Sparkles, Phone } from "lucide-react";
import { useBloodActions } from "../../hooks/useBlood";
import RequestResultsModal from "../blood-requests/AllDonors";

// ... Types and Constants remain the same ...
type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
type Urgency = "urgent" | "non-urgent";
type BloodRequestForm = {
  blood_type: BloodGroup;
  hospital: string;
  location: string;
  phone: string;
  urgency: Urgency;
  description?: string;
  quantity: number;
};
const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const quantities = [1, 2, 3, 4, 5, 6];

export default function Requests() {
  const [activePicker, setActivePicker] = useState<"blood" | "quantity" | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [foundDonors, setFoundDonors] = useState<any[]>([]); // To store mock or real donors

  const { createBloodRequest } = useBloodActions();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm<BloodRequestForm>({
    defaultValues: { urgency: "non-urgent" }
  });

  const loading = createBloodRequest.isPending;
  const urgencyValue = watch("urgency");
  const selectedBloodType = watch("blood_type");
  const selectedQuantity = watch("quantity");

  const onSubmit = async (data: BloodRequestForm ) => {
    createBloodRequest.mutate(data, {
      onSuccess: () => {
        const mockDonors: any = [
          { name: "Rayhan Hossain", location: "Dhaka" },
          { name: "Arif Ahmed", location: "Mirpur" }
        ];
        
        setFoundDonors(mockDonors);
        setShowModal(true);

        // Auto close and navigate after 5 seconds
        setTimeout(() => {
          setShowModal(false);
          navigate("/blood/public-requests"); // or wherever appropriate
        }, 10000);
      },
    });
  };

  // Tightened input classes
  const inputClasses = `
    w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none 
    transition-all duration-300 placeholder:text-slate-300 text-slate-700 text-sm
    focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/5
  `;

  const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1 block">
      {children}
    </label>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center px-4">
      
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-lg shadow-red-100 mb-3 border border-red-50">
          <Droplets className="text-red-500" size={24} />
        </div>
        <h2 className="text-xl font-black text-slate-800 tracking-tight">রক্তের আবেদন করুন</h2>
        <p className="text-slate-400 font-medium text-[10px] mt-1">সঠিক তথ্য দ্রুত রক্তদাতার কাছে পৌঁছাতে সাহায্য করে</p>
      </div>

      <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden relative">
        <div className="p-6 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* ... Group & Quantity selectors remain same ... */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 relative">
                <FieldLabel>রক্তের গ্রুপ*</FieldLabel>
                <div onClick={() => setActivePicker(activePicker === "blood" ? null : "blood")} className={`${inputClasses} flex justify-between items-center cursor-pointer ${errors.blood_type ? 'border-red-400 bg-red-50/30' : ''}`}>
                  <span className={`font-bold ${selectedBloodType ? 'text-slate-800' : 'text-slate-400'}`}>{selectedBloodType || "নির্বাচন করুন"}</span>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${activePicker === "blood" ? "rotate-180" : ""}`} />
                </div>
                <AnimatePresence>
                  {activePicker === "blood" && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 5 }} exit={{ opacity: 0, y: 5 }} className="absolute z-50 w-full bg-white border border-slate-100 shadow-2xl rounded-2xl p-2 grid grid-cols-4 gap-1.5">
                      {bloodGroups.map((bg) => (
                        <div key={bg} onClick={() => { setValue("blood_type", bg); setActivePicker(null); trigger("blood_type"); }} className={`h-9 flex items-center justify-center rounded-lg text-xs font-black cursor-pointer border ${selectedBloodType === bg ? 'bg-red-600 border-red-600 text-white' : 'bg-slate-50 border-transparent text-slate-500 hover:bg-red-50'}`}>{bg}</div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <input type="hidden" {...register("blood_type", { required: true })} />
              </div>

              <div className="space-y-1 relative">
                <FieldLabel>রক্তের পরিমাণ*</FieldLabel>
                <div onClick={() => setActivePicker(activePicker === "quantity" ? null : "quantity")} className={`${inputClasses} flex justify-between items-center cursor-pointer ${errors.quantity ? 'border-red-400 bg-red-50/30' : ''}`}>
                  <span className={`font-bold ${selectedQuantity ? 'text-slate-800' : 'text-slate-400'}`}>{selectedQuantity ? `${selectedQuantity} Bag` : "নির্বাচন করুন"}</span>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${activePicker === "quantity" ? "rotate-180" : ""}`} />
                </div>
                <AnimatePresence>
                  {activePicker === "quantity" && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 5 }} exit={{ opacity: 0, y: 5 }} className="absolute z-50 w-full bg-white border border-slate-100 shadow-2xl rounded-2xl p-2 grid grid-cols-3 gap-1.5">
                      {quantities.map((q) => (
                        <div key={q} onClick={() => { setValue("quantity", q); setActivePicker(null); trigger("quantity"); }} className={`h-9 flex items-center justify-center rounded-lg text-xs font-black cursor-pointer border ${selectedQuantity === q ? 'bg-slate-800 border-slate-800 text-white' : 'bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100'}`}>{q} Bag</div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <input type="hidden" {...register("quantity", { required: true })} />
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <FieldLabel>হাসপাতাল*</FieldLabel>
                <div className="relative"><Hospital className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={15} /><input {...register("hospital", { required: "হাসপাতালের নাম প্রয়োজন" })} placeholder="ঢাকা মেডিকেল" className={`${inputClasses} pl-10`} /></div>
              </div>
              <div className="space-y-1">
                <FieldLabel>লোকেশন*</FieldLabel>
                <div className="relative"><MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={15} /><input {...register("location", { required: "লোকেশন প্রয়োজন" })} placeholder="শাহবাগ, ঢাকা" className={`${inputClasses} pl-10`} /></div>
              </div>
            </div>

            <div className="space-y-1">
              <FieldLabel>ফোন নম্বর*</FieldLabel>
              <div className="relative"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={15} /><input {...register("phone", { required: "নম্বর প্রয়োজন", pattern: { value: /^[0-9]{11}$/, message: "১১ ডিজিটের নম্বর দিন" } })} placeholder="01XXXXXXXXX" className={`${inputClasses} pl-10`} /></div>
              {errors.phone && <p className="text-red-500 text-[9px] font-bold mt-1 ml-1">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1">
              <FieldLabel>রোগীর অবস্থা (ঐচ্ছিক)</FieldLabel>
              <div className="relative"><MessageSquare className="absolute left-3.5 top-3 text-slate-300" size={15} /><textarea {...register("description")} placeholder="বিস্তারিত তথ্য..." rows={2} className={`${inputClasses} pl-10 resize-none py-2.5`} /></div>
            </div>

            {/* Submit Section */}
            <div className="pt-2">
              <div className="flex bg-slate-100/80 p-1 rounded-xl gap-1.5 mb-5 shadow-inner">
                <button type="button" onClick={() => setValue("urgency", "non-urgent")} className={`flex-1 py-3 rounded-lg font-black text-[9px] uppercase tracking-wider transition-all ${urgencyValue === 'non-urgent' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}>Normal</button>
                <button type="button" onClick={() => setValue("urgency", "urgent")} className={`flex-1 py-3 rounded-lg font-black text-[9px] uppercase tracking-wider transition-all ${urgencyValue === 'urgent' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400'}`}>Emergency</button>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-red-100 transition-all flex justify-center items-center gap-2 group disabled:opacity-70"
              >
                {loading ? <><LoadingSvg /> <span>প্রসেসিং...</span></> : <><Sparkles size={16} /> <span>আবেদন নিশ্চিত করুন</span></>}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* RESULT MODAL */}
      {
        showModal && <RequestResultsModal isOpen={showModal} onClose={() => setShowModal(false)} requests={foundDonors} />
      }
    </div>
  );
}