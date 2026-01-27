import { useForm } from "react-hook-form";
import LoadingSvg from "../../components/LoadingSvg";
import { useBloodActions } from "../../hooks/useBlood";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

// ================= TYPES =================
type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
type Urgency = "urgent" | "non-urgent";

type BloodRequestForm = {
  blood_type: BloodGroup;
  hospital: string;
  location: string;
  urgency: Urgency;
  description?: string;
  quantity: number;
};
const bloodGroup: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Requests() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BloodRequestForm>({
    defaultValues: { urgency: "non-urgent" } // Set a default
  });
  const { createBloodRequest } = useBloodActions()

  const urgencyValue = watch("urgency");
  const navigate = useNavigate();

  const onSubmit = async (data: BloodRequestForm) => {
    console.log(data)
        navigate("/blood/request/results");

    // data.quantity = Number(data.quantity);
    // setLoading(true);
    // createBloodRequest.mutate(data, {
    //   onSuccess: () => {
    //     setLoading(false);
    //     navigate("/blood/request/results");
    //   },
    //   onError: () => {
    //     setLoading(false);
    //   }
    // });
  };

  const inputClasses = `
    w-full px-4 py-2 
    bg-white border border-slate-200 
    rounded-2xl outline-none transition-all duration-300
    placeholder:text-slate-400 text-slate-700
    focus:border-red-500 focus:ring-2 focus:ring-red-500/20 
  `;

  return (
    <div className="max-w-4xl mx-auto bg-[radial-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-100 px-5 py-12 mt-12">
      <div className="rounded-[2.5rem] relative overflow-hidden">    
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-red-50 rounded-full blur-3xl opacity-50" />
        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 text-red-600 rounded-3xl mb-4 shadow-inner transform -rotate-3 transition-transform hover:rotate-0">
            <span className="text-3xl">🩸</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-snug">
            রক্তের আবেদন
          </h2>
          <p className="text-slate-500 mt-2 font-medium max-w-md mx-auto leading-relaxed text-sm">
            আপনার সঠিক তথ্য দ্রুত রক্তদাতার কাছে পৌঁছাতে সাহায্য করবে।
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 relative z-10"
        >
          {/* Blood Group */}
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">রক্তের গ্রুপ (Group)</label>
            <select
              {...register("blood_type", { required: "রক্তের গ্রুপ প্রয়োজন" })}
              className={`${inputClasses} appearance-none cursor-pointer mt-2`}
            >
              <option value="">রক্তের গ্রুপ</option>
              {bloodGroup.map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
            {errors.blood_type && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.blood_type.message}</p>}
          </div>

          {/* quantity */}
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">ব্যাগের সংখ্যা (Bags)</label>
            <select
              {...register("quantity", { required: "ব্যাগের সংখ্যা প্রয়োজন" })}
              className={`${inputClasses} appearance-none cursor-pointer mt-2`}
            >
              <option value="">ব্যাগের সংখ্যা</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
            {errors.quantity && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.quantity.message}</p>}
          </div>

          {/* Hospital */}
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">হাসপাতাল (Hospital)</label>
            <input
              type="text"
              {...register("hospital", { required: "নাম প্রয়োজন" })}
              placeholder="উদা: ঢাকা মেডিকেল"
              className={`${inputClasses} mt-2`}
            />
            {errors.hospital && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.hospital.message}</p>}
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">লোকেশন (Location)</label>
            <input
              type="text"
              {...register("location", { required: "লোকেশন প্রয়োজন" })}
              placeholder="উদা: বকশীবাজার, ঢাকা"
              className={`${inputClasses} mt-2`}
            />
            {errors.location && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.location.message}</p>}
          </div>

          {/* Urgency Selector */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">জরুরি অবস্থা (Urgency)</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <label className={`
                flex items-center justify-center py-3 rounded-2xl cursor-pointer transition-all border-2 font-bold text-sm
                ${urgencyValue === 'non-urgent' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-400 border-transparent hover:bg-slate-100'}
              `}>
                <input type="radio" value="Normal" {...register("urgency")} className="hidden" />
                সাধারণ (Normal)
              </label>
              <label className={`
                flex items-center justify-center py-3 rounded-2xl cursor-pointer transition-all border-2 font-bold text-sm
                ${urgencyValue === 'urgent' ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-200' : 'bg-red-50 text-red-400 border-transparent hover:bg-red-100'}
              `}>
                <input type="radio" value="urgent" {...register("urgency")} className="hidden" />
                জরুরি (Emergency)
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">বিস্তারিত (Optional)</label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="রোগীর অবস্থা বা বিশেষ কোনো তথ্য..."
              className={`${inputClasses} mt-2 resize-none`}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              className="cursor-pointer w-full bg-red-600 text-white py-3 rounded-[2rem] font-black text-md hover:bg-red-700 active:scale-[0.98] transition-all shadow-[0_20px_40px_-10px_rgba(220,38,38,0.3)]"
            >
              <div className="flex justify-center">
                {loading ? <span className="flex gap-3 item-center"><LoadingSvg/>অনুরোধ করা হচ্ছে...</span> : <span>অনুরোধ করুন</span>}
              </div>
            </button>
            <div className="flex items-center justify-center gap-2 mt-6 opacity-40">
              <div className="h-px w-8 bg-slate-300"></div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                Life Line Network
              </p>
              <div className="h-px w-8 bg-slate-300"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
