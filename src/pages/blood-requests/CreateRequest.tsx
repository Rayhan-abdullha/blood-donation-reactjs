import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Droplets, Hospital, MapPin, MessageSquare, ChevronDown, 
  Sparkles, Phone, AlertCircle, ArrowLeft
} from "lucide-react";

// Components & Hooks
import LoadingSvg from "../../components/LoadingSvg";
import RequestResultsModal from "./RequestResultsModal";
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

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm<BloodRequestForm>({
    defaultValues: { urgency: "non-urgent" }
  });

  const urgencyValue = watch("urgency");
  const selectedBloodType = watch("blood_type");
  const selectedQuantity = watch("quantity");

  const onSubmit = async (data: BloodRequestForm) => {
    mutate(data, {
      onSuccess: (data) => {
        setFoundDonors(data?.data || []);
        setShowModal(true);
        setTimeout(() => { setShowModal(false); navigate("/blood/public-requests"); }, 15000);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "রক্তের আবেদন ব্যর্থ হয়েছে");
      },
    });
  };
     useEffect(() => {
      document.title = "রক্ত বীর | রক্তের আবেদন";
    }, []);

  return (
    <div className="min-h-screen bg-slate-50 md:bg-[#F8FAFC] pb-20 md:pb-0 md:mt-10">
      
      {/* MOBILE APP HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 z-50 flex items-center px-4 justify-between">
        <button onClick={() => navigate(-1)} className="cursor-pointer flex items-center gap-2 -ml-2 text-slate-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-md font-[1000] text-red-700 self-center uppercase tracking-widest">নতুন রিকোয়েস্ট</h1>
        <div className="w-10" />
      </div>

      <div className="max-w-6xl mx-auto md:pt-12 md:px-6">
        <div className="grid md:grid-cols-12 gap-12">
          
          {/* DESKTOP INFO SIDE */}
          <div className="hidden md:flex md:col-span-5 flex-col justify-center">
             <div className="w-16 h-16 bg-red-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-red-100">
                <Droplets className="text-white" size={32} />
             </div>
             <h2 className="text-5xl font-[1000] text-slate-900 leading-tight tracking-tighter mb-6">
               আপনার <span className="text-red-600">জরুরি</span> <br /> রিকোয়েস্ট পাঠান
             </h2>
             <p className="text-slate-500 text-lg font-medium leading-relaxed">
               সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন। আমাদের সিস্টেম স্বয়ংক্রিয়ভাবে আপনার আশেপাশে থাকা রক্তদাতাদের কাছে নোটিফিকেশন পাঠিয়ে দিবে।
             </p>
          </div>

          {/* FORM CONTAINER */}
          <div className="md:col-span-7 pt-20 md:pt-0">
            <div className="bg-white md:rounded-[3rem] shadow-none md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] p-6 md:p-12 min-h-screen md:min-h-0">
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                
                {/* 1. Blood & Quantity Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block ml-1">রক্তের গ্রুপ</label>
                    <button type="button" onClick={() => setActivePicker(activePicker === "blood" ? null : "blood")} 
                      className={`w-full h-14 px-4 bg-slate-50 rounded-2xl border ${errors.blood_type ? 'border-red-300 bg-red-50/30' : 'border-slate-100'} flex items-center justify-between`}>
                      <span className={selectedBloodType ? 'text-slate-900 font-bold' : 'text-slate-300'}>{selectedBloodType || "নির্বাচন"}</span>
                      <ChevronDown size={18} className="text-slate-400" />
                    </button>
                    {errors.blood_type && <p className="text-red-500 text-[10px] font-bold mt-2 ml-1 flex items-center gap-1"><AlertCircle size={10}/> গ্রুপ প্রয়োজন</p>}
                    
                    <AnimatePresence>
                      {activePicker === "blood" && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute z-[60] left-0 right-0 mt-2 bg-white border border-slate-100 shadow-2xl rounded-3xl p-3 grid grid-cols-4 gap-2">
                          {bloodGroups.map((bg) => (
                            <button key={bg} type="button" onClick={() => { setValue("blood_type", bg); setActivePicker(null); trigger("blood_type"); }} 
                              className={`h-11 rounded-xl text-xs font-black ${selectedBloodType === bg ? 'bg-red-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-red-50'}`}>{bg}</button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <input type="hidden" {...register("blood_type", { required: true })} />
                  </div>

                  <div className="relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block ml-1">পরিমাণ (ব্যাগ)</label>
                    <button type="button" onClick={() => setActivePicker(activePicker === "quantity" ? null : "quantity")} 
                      className={`w-full h-14 px-4 bg-slate-50 rounded-2xl border ${errors.quantity ? 'border-red-300 bg-red-50/30' : 'border-slate-100'} flex items-center justify-between`}>
                      <span className={selectedQuantity ? 'text-slate-900 font-bold' : 'text-slate-300'}>{selectedQuantity ? `${selectedQuantity} Bag` : "সংখ্যা"}</span>
                      <ChevronDown size={18} className="text-slate-400" />
                    </button>
                    {errors.quantity && <p className="text-red-500 text-[10px] font-bold mt-2 ml-1 flex items-center gap-1"><AlertCircle size={10}/> পরিমাণ প্রয়োজন</p>}

                    <AnimatePresence>
                      {activePicker === "quantity" && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute z-[60] left-0 right-0 mt-2 bg-white border border-slate-100 shadow-2xl rounded-3xl p-3 grid grid-cols-3 gap-2">
                          {quantities.map((q) => (
                            <button key={q} type="button" onClick={() => { setValue("quantity", q); setActivePicker(null); trigger("quantity"); }} 
                              className={`h-11 rounded-xl text-xs font-black ${selectedQuantity === q ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>{q}</button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <input type="hidden" {...register("quantity", { required: true })} />
                  </div>
                </div>

                {/* 2. Hospital & Location */}
                <div className="space-y-4">
                  <div className="relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block ml-1">হাসপাতাল ও এলাকা</label>
                    <div className="flex flex-col gap-3">
                      <div className="relative">
                        <Hospital className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input {...register("hospital", { required: "হাসপাতালের নাম লিখুন" })} placeholder="হাসপাতালের নাম লিখুন" className={`w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border outline-none focus:border-red-300 transition-all font-bold text-sm ${errors.hospital ? 'border-red-300' : 'border-slate-100'}`} />
                        {errors.hospital && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.hospital.message}</p>}
                      </div>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input {...register("location", { required: "লোকেশন লিখুন" })} placeholder="লোকেশন (উদা: শাহবাগ, ঢাকা)" className={`w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border outline-none focus:border-red-300 transition-all font-bold text-sm ${errors.location ? 'border-red-300' : 'border-slate-100'}`} />
                        {errors.location && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.location.message}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Phone */}
                <div className="relative">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block ml-1">আপনার ফোন নম্বর</label>
                  <Phone className="absolute left-4 top-[3.7rem] -translate-y-1/2 text-slate-300 z-10" size={18} />
                  <input type="tel" {...register("phone", { required: "১১ ডিজিটের নম্বর দিন", pattern: { value: /^[0-9]{11}$/, message: "সঠিক নম্বর দিন (১১ ডিজিট)" } })} placeholder="01XXXXXXXXX" className={`w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border outline-none focus:border-red-300 transition-all font-bold text-sm tracking-widest ${errors.phone ? 'border-red-300' : 'border-slate-100'}`} />
                  {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-2 ml-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.phone.message}</p>}
                </div>

                {/* 4. Description (Optional) */}
                <div className="relative">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block ml-1">বিস্তারিত (ঐচ্ছিক)</label>
                  <MessageSquare className="absolute left-4 top-[3.7rem] text-slate-300" size={18} />
                  <textarea {...register("description")} placeholder="রোগীর অবস্থা বা জরুরি কিছু জানাতে পারেন..." rows={3} className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-red-300 transition-all font-bold text-sm resize-none" />
                </div>

                {/* 5. Urgency Switch */}
                <div className="flex bg-slate-100 p-1.5 rounded-full gap-2">
                  <button type="button" onClick={() => setValue("urgency", "non-urgent")} className={`flex-1 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${urgencyValue === 'non-urgent' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}>Normal</button>
                  <button type="button" onClick={() => setValue("urgency", "urgent")} className={`flex-1 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${urgencyValue === 'urgent' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400'}`}>Emergency</button>
                </div>

                {/* STICKY CTA BUTTON */}
                <div className="fixed md:relative bottom-0 left-0 right-0 p-4 md:p-0 bg-white md:bg-transparent border-t border-slate-100 md:border-0 z-[100]">
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={isPending}
                    className="cursor-pointer w-full bg-slate-900 hover:bg-black text-white py-5 rounded-2xl md:rounded-[1.8rem] font-black text-sm transition-all flex justify-center items-center gap-3 shadow-xl shadow-slate-200"
                  >
                    {isPending ? <LoadingSvg /> : <><Sparkles size={18} className="text-red-500" /> <span>রিকোয়েস্ট পাঠান</span></>}
                  </motion.button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <RequestResultsModal isOpen={showModal} onClose={() => setShowModal(false)} requests={foundDonors} />
        )}
      </AnimatePresence>
    </div>
  );
}