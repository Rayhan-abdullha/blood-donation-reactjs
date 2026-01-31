import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Droplets, 
  Hospital, 
  MapPin, 
  MessageSquare, 
  ChevronDown, 
  Sparkles, 
  Phone, 
  AlertCircle 
} from "lucide-react";

// Components & Hooks
import LoadingSvg from "../../components/LoadingSvg";
import RequestResultsModal from "./AllDonors";
import useCreateBloodRequest from "../../hooks/useCreateBloodRequest";
import toast from "react-hot-toast";

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
  const [foundDonors, setFoundDonors] = useState<any[]>([]);

  const { mutate, isPending } = useCreateBloodRequest();
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue, 
    trigger, 
    formState: { errors } 
  } = useForm<BloodRequestForm>({
    defaultValues: { urgency: "non-urgent" }
  });

  const urgencyValue = watch("urgency");
  const selectedBloodType = watch("blood_type");
  const selectedQuantity = watch("quantity");

  const onSubmit = async (data: BloodRequestForm) => {
    mutate(data, {
      onSuccess: () => {
        const mockDonors = [
          { name: "Rayhan Hossain", location: "Dhaka" },
          { name: "Arif Ahmed", location: "Mirpur" },
        ];

        setFoundDonors(mockDonors);
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
          navigate("/blood/public-requests");
        }, 10000);
      },

      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message || "রক্তের আবেদন ব্যর্থ হয়েছে"
        );
      },
    });
  };

  const inputClasses = (hasError: boolean) => `
    w-full px-4 py-3.5 bg-slate-50/50 border rounded-2xl outline-none 
    transition-all duration-300 text-slate-700 text-sm font-medium
    ${hasError 
      ? 'border-red-500 ring-4 ring-red-500/10 bg-red-50/30' 
      : 'border-slate-100 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/5'}
  `;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 z-10"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl shadow-xl shadow-red-200/50 mb-4 border border-red-50">
          <Droplets className="text-red-500" size={30} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">রক্তের আবেদন করুন</h2>
        <p className="text-slate-500 font-medium text-xs mt-2">আপনার সঠিক তথ্য দ্রুত রক্তদাতার কাছে পৌঁছাতে সাহায্য করে</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-[0_20px_70px_-15px_rgba(0,0,0,0.1)] border border-slate-100 z-10"
      >
        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Blood Type & Quantity Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="relative">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">রক্তের গ্রুপ*</label>
                <div 
                  onClick={() => setActivePicker(activePicker === "blood" ? null : "blood")} 
                  className={`${inputClasses(!!errors.blood_type)} flex justify-between items-center cursor-pointer`}
                >
                  <span className={`font-bold ${selectedBloodType ? 'text-slate-900' : 'text-slate-400'}`}>
                    {selectedBloodType || "নির্বাচন করুন"}
                  </span>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform ${activePicker === "blood" ? "rotate-180" : ""}`} />
                </div>
                
                <AnimatePresence>
                  {activePicker === "blood" && (
                    <motion.div 
                      key="blood-picker"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 5 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute z-50 w-full bg-white border border-slate-100 shadow-2xl rounded-2xl p-2 grid grid-cols-4 gap-2 top-full"
                    >
                      {bloodGroups.map((bg) => (
                        <button key={bg} type="button" 
                          onClick={() => { setValue("blood_type", bg); setActivePicker(null); trigger("blood_type"); }} 
                          className={`h-10 flex items-center justify-center rounded-xl text-xs font-black transition-all ${selectedBloodType === bg ? 'bg-red-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-red-50'}`}>{bg}</button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                {errors.blood_type && (
                  <div className="flex items-center gap-1 text-red-500 mt-1 ml-1">
                    <AlertCircle size={10} /> <span className="text-[10px] font-bold">গ্রুপ প্রয়োজন</span>
                  </div>
                )}
                <input type="hidden" {...register("blood_type", { required: true })} />
              </div>

              <div className="relative">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">রক্তের পরিমাণ*</label>
                <div 
                  onClick={() => setActivePicker(activePicker === "quantity" ? null : "quantity")} 
                  className={`${inputClasses(!!errors.quantity)} flex justify-between items-center cursor-pointer`}
                >
                  <span className={`font-bold ${selectedQuantity ? 'text-slate-900' : 'text-slate-400'}`}>
                    {selectedQuantity ? `${selectedQuantity} Bag` : "নির্বাচন করুন"}
                  </span>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform ${activePicker === "quantity" ? "rotate-180" : ""}`} />
                </div>

                <AnimatePresence>
                  {activePicker === "quantity" && (
                    <motion.div 
                      key="qty-picker"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 5 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute z-50 w-full bg-white border border-slate-100 shadow-2xl rounded-2xl p-2 grid grid-cols-3 gap-2 top-full"
                    >
                      {quantities.map((q) => (
                        <button key={q} type="button"
                          onClick={() => { setValue("quantity", q); setActivePicker(null); trigger("quantity"); }} 
                          className={`h-10 flex items-center justify-center rounded-xl text-xs font-black transition-all ${selectedQuantity === q ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>{q} Bag</button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                {errors.quantity && (
                  <div className="flex items-center gap-1 text-red-500 mt-1 ml-1">
                    <AlertCircle size={10} /> <span className="text-[10px] font-bold">পরিমাণ প্রয়োজন</span>
                  </div>
                )}
                <input type="hidden" {...register("quantity", { required: true })} />
              </div>
            </div>

            {/* Hospital & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">হাসপাতাল*</label>
                <div className="relative">
                  <Hospital className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input {...register("hospital", { required: "হাসপাতালের নাম লিখুন" })} placeholder="ঢাকা মেডিকেল" className={`${inputClasses(!!errors.hospital)} pl-11`} />
                </div>
                {errors.hospital && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.hospital.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">লোকেশন*</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input {...register("location", { required: "লোকেশন লিখুন" })} placeholder="শাহবাগ, ঢাকা" className={`${inputClasses(!!errors.location)} pl-11`} />
                </div>
                {errors.location && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.location.message}</p>}
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">ফোন নম্বর*</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  type="tel"
                  {...register("phone", { 
                    required: "১১ ডিজিটের নম্বর দিন", 
                    pattern: { value: /^[0-9]{11}$/, message: "সঠিক নম্বর দিন (১১ ডিজিট)" } 
                  })} 
                  placeholder="01XXXXXXXXX" 
                  className={`${inputClasses(!!errors.phone)} pl-11`} 
                />
              </div>
              {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.phone.message}</p>}
            </div>

            {/* Description (Optional) */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">রোগীর অবস্থা (ঐচ্ছিক)</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-slate-300" size={16} />
                <textarea {...register("description")} placeholder="অতিরিক্ত তথ্য দিন..." rows={2} className={`${inputClasses(false)} pl-11 resize-none py-3`} />
              </div>
            </div>

            {/* Urgency Switcher */}
            <div className="pt-2">
              <div className="flex bg-slate-100/50 p-1.5 rounded-2xl gap-2 mb-6 shadow-inner">
                <button type="button" onClick={() => setValue("urgency", "non-urgent")} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${urgencyValue === 'non-urgent' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}>Normal</button>
                <button type="button" onClick={() => setValue("urgency", "urgent")} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${urgencyValue === 'urgent' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400'}`}>Emergency</button>
              </div>

              <motion.button 
                whileTap={{ scale: 0.97 }}
                type="submit" 
                disabled={isPending}
                className="cursor-pointer w-full bg-red-600 hover:bg-red-500 text-white py-4.5 rounded-[1.25rem] font-black text-sm shadow-xl shadow-red-200 transition-all flex justify-center items-center gap-2 group disabled:opacity-70 h-[60px]"
              >
                {isPending ? <LoadingSvg /> : <><Sparkles size={18} /> <span>আবেদন নিশ্চিত করুন</span></>}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* RESULT MODAL */}
      <AnimatePresence>
        {showModal && (
          <RequestResultsModal 
            isOpen={showModal} 
            onClose={() => setShowModal(false)} 
            requests={foundDonors} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}