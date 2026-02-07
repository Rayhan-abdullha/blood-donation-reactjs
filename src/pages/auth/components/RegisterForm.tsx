import LoadingSvg from "../../../components/LoadingSvg";

const RegisterForm = ({ register, errors, isRegisterLoading, wait }: any) => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <input type="text" {...register("name", { required: "আপনার নাম দিন" })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl" placeholder="নাম" />
        {errors.name && <p className="text-[12px] text-red-500 ml-2 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <input
            type="tel"
            {...register("phone", { 
              required: "১১ ডিজিটের নম্বর দিন", 
              pattern: { value: /^[0-9]{11}$/, message: "সঠিক নম্বর দিন (১১ ডিজিট)" } 
            })} 
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl" placeholder="ফোন" />
        {errors.phone && <p className="text-[12px] text-red-500 ml-2 mt-1">{errors.phone.message}</p>}
      </div>
    </div>

    <div>
      <input type="email" {...register("email", { required: "ইমেইল অ্যাড্রেস দিন" })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl" placeholder="ইমেইল" />
      {errors.email && <p className="text-[12px] text-red-500 ml-2 mt-1">{errors.email.message}</p>}
    </div>

    <div>
      <input type="password" {...register("password", { required: "পাসওয়ার্ড দিন" })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl" placeholder="নতুন পাসওয়ার্ড" />
      {errors.password && <p className="text-[12px] text-red-500 ml-2 mt-1">{errors.password.message}</p>}
    </div>

    <button type="submit" disabled={isRegisterLoading && wait} className="cursor-pointer w-full bg-red-600 text-white py-4 rounded-2xl font-bold">
      {isRegisterLoading && wait ? <span className="flex gap-2 justify-center"><LoadingSvg /> অপেক্ষা করুন...</span> : "অ্যাকাউন্ট তৈরি করুন"}
    </button>
  </>
);

export default RegisterForm;
