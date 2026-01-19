import { useForm } from "react-hook-form";

// ================= TYPES =================
type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
type Urgency = "Normal" | "Emergency";

type BloodRequestForm = {
  bloodGroup: BloodGroup;
  hospital: string;
  location: string;
  urgency: Urgency;
  description?: string;
  bags: number;
};

export default function Requests() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BloodRequestForm>({
    defaultValues: { urgency: "Normal" } // Set a default
  });

  const urgencyValue = watch("urgency");

  const onSubmit = (data: BloodRequestForm) => {
    console.log("Blood Request:", data);
  };

  // Improved Input Style: Lighter border, better focus shadow
  const inputClasses = `
    w-full px-4 py-3 
    bg-white border border-slate-200 
    rounded-2xl outline-none transition-all duration-300
    placeholder:text-slate-400 text-slate-700
    focus:border-red-500 focus:ring-4 focus:ring-red-500/10 
  `;

  return (
    // Background: Changed from flat pink to a clean professional gradient
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-100 px-4 py-16">
      
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] p-8 md:p-12 border border-slate-100 relative overflow-hidden">
        
        {/* Subtle Decorative Background Element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50" />

        {/* Header: More professional spacing and font weights */}
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 text-red-600 rounded-3xl mb-6 shadow-inner transform -rotate-3 transition-transform hover:rotate-0">
            <span className="text-4xl">🩸</span>
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
            রক্তের আবেদন <br />
            <span className="text-red-600 text-2xl font-bold uppercase tracking-widest">Blood Request</span>
          </h2>
          <p className="text-slate-500 mt-4 font-medium max-w-md mx-auto leading-relaxed">
            আপনার সঠিক তথ্য দ্রুত রক্তদাতার কাছে পৌঁছাতে সাহায্য করবে।
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10"
        >
          {/* Blood Group */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">রক্তের গ্রুপ (Group)</label>
            <select
              {...register("bloodGroup", { required: "রক্তের গ্রুপ প্রয়োজন" })}
              className={`${inputClasses} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em]`}
            >
              <option value="">নির্বাচন করুন</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
            {errors.bloodGroup && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.bloodGroup.message}</p>}
          </div>

          {/* Bags */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">ব্যাগের সংখ্যা (Bags)</label>
            <input
              type="number"
              {...register("bags", {
                required: "প্রয়োজন",
                min: { value: 1, message: "অন্তত ১ ব্যাগ" },
              })}
              placeholder="উদা: ২"
              className={inputClasses}
            />
            {errors.bags && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.bags.message}</p>}
          </div>

          {/* Hospital */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">হাসপাতাল (Hospital)</label>
            <input
              type="text"
              {...register("hospital", { required: "নাম প্রয়োজন" })}
              placeholder="উদা: ঢাকা মেডিকেল"
              className={inputClasses}
            />
            {errors.hospital && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.hospital.message}</p>}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">লোকেশন (Location)</label>
            <input
              type="text"
              {...register("location", { required: "লোকেশন প্রয়োজন" })}
              placeholder="উদা: বকশীবাজার, ঢাকা"
              className={inputClasses}
            />
            {errors.location && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.location.message}</p>}
          </div>

          {/* Urgency Selector - Modernized */}
          <div className="md:col-span-2 space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">জরুরি অবস্থা (Urgency)</label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`
                flex items-center justify-center py-4 rounded-2xl cursor-pointer transition-all border-2 font-bold
                ${urgencyValue === 'Normal' ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-slate-50 text-slate-400 border-transparent hover:bg-slate-100'}
              `}>
                <input type="radio" value="Normal" {...register("urgency")} className="hidden" />
                সাধারণ (Normal)
              </label>
              <label className={`
                flex items-center justify-center py-4 rounded-2xl cursor-pointer transition-all border-2 font-bold
                ${urgencyValue === 'Emergency' ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-200' : 'bg-red-50 text-red-400 border-transparent hover:bg-red-100'}
              `}>
                <input type="radio" value="Emergency" {...register("urgency")} className="hidden" />
                জরুরি (Emergency)
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">বিস্তারিত (Optional)</label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="রোগীর অবস্থা বা বিশেষ কোনো তথ্য..."
              className={`${inputClasses} resize-none`}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-6">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-5 rounded-[2rem] font-black text-xl hover:bg-red-700 active:scale-[0.98] transition-all shadow-[0_20px_40px_-10px_rgba(220,38,38,0.3)]"
            >
              আবেদন জমা দিন (Submit)
            </button>
            <div className="flex items-center justify-center gap-2 mt-8 opacity-40">
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