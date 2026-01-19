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
  } = useForm<BloodRequestForm>();

  const urgencyValue = watch("urgency");

  const onSubmit = (data: BloodRequestForm) => {
    console.log("Blood Request:", data);
  };

  // Reusable input style
  const inputClasses = `
    w-full px-4 py-3 
    bg-gray-50 border-2 border-slate-200 
    rounded-xl outline-none transition-all duration-200
    focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf2f2] px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 md:p-10 border border-red-50">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-2xl mb-4 text-3xl shadow-inner">
            🩸
          </div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            রক্তের আবেদন (Blood Request)
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            সঠিক তথ্য দিয়ে ফরমটি পূরণ করুন, জীবন বাঁচাতে সাহায্য করুন
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
        >
          {/* Blood Group */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">রক্তের গ্রুপ (Blood Group)</label>
            <select
              {...register("bloodGroup", { required: "রক্তের গ্রুপ প্রয়োজন" })}
              className={inputClasses}
            >
              <option value="">নির্বাচন করুন</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
            {errors.bloodGroup && <p className="text-red-500 text-xs font-medium mt-1">{errors.bloodGroup.message}</p>}
          </div>

          {/* Bags */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">ব্যাগের সংখ্যা (How many bags?)</label>
            <input
              type="number"
              {...register("bags", {
                required: "ব্যাগের সংখ্যা প্রয়োজন",
                min: { value: 1, message: "অন্তত ১ ব্যাগ প্রয়োজন" },
              })}
              placeholder="উদা: ২"
              className={inputClasses}
            />
            {errors.bags && <p className="text-red-500 text-xs font-medium mt-1">{errors.bags.message}</p>}
          </div>

          {/* Hospital */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">হাসপাতালের নাম (Hospital Name)</label>
            <input
              type="text"
              {...register("hospital", { required: "হাসপাতালের নাম প্রয়োজন" })}
              placeholder="উদা: ঢাকা মেডিকেল"
              className={inputClasses}
            />
            {errors.hospital && <p className="text-red-500 text-xs font-medium mt-1">{errors.hospital.message}</p>}
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">লোকেশন (Location)</label>
            <input
              type="text"
              {...register("location", { required: "লোকেশন প্রয়োজন" })}
              placeholder="উদা: বকশীবাজার, ঢাকা"
              className={inputClasses}
            />
            {errors.location && <p className="text-red-500 text-xs font-medium mt-1">{errors.location.message}</p>}
          </div>

          {/* Urgency */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">জরুরি অবস্থা (Urgency Level)</label>
            <div className={`p-1 rounded-2xl border-2 transition-all ${urgencyValue === 'Emergency' ? 'border-red-500 bg-red-50' : 'border-slate-100 bg-gray-50'}`}>
              <div className="flex gap-2">
                <label className={`flex-1 flex items-center justify-center py-3 rounded-xl cursor-pointer transition-all ${urgencyValue === 'Normal' ? 'bg-white shadow-sm text-gray-800 font-bold' : 'text-gray-500'}`}>
                  <input type="radio" value="Normal" {...register("urgency")} className="hidden" />
                  সাধারণ (Normal)
                </label>
                <label className={`flex-1 flex items-center justify-center py-3 rounded-xl cursor-pointer transition-all ${urgencyValue === 'Emergency' ? 'bg-red-600 shadow-md text-white font-bold' : 'text-gray-500'}`}>
                  <input type="radio" value="Emergency" {...register("urgency")} className="hidden" />
                  জরুরি (Emergency)
                </label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">বিস্তারিত তথ্য (Details - Optional)</label>
            <textarea
              {...register("description")}
              rows={3}
              placeholder="রোগীর অবস্থা বা বিশেষ কোনো তথ্য থাকলে লিখুন..."
              className={`${inputClasses} resize-none`}
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-700 active:scale-[0.98] transition-all shadow-xl shadow-red-200"
            >
              আবেদন জমা দিন (Submit Request)
            </button>
            <p className="text-center text-gray-400 text-xs mt-4 uppercase tracking-widest">
              Secured by Blood Network
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}