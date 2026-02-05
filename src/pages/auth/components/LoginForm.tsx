import LoadingSvg from "../../../components/LoadingSvg";


const LoginForm = ({ register, errors, isLoginLoading, setView }: any) => (
  <>
    <div>
      <input type="email" {...register("email", {
        required: "ইমেইল বা ফোন নম্বর দিন",   
      })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all duration-300 placeholder:text-slate-400 text-slate-700 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10" placeholder="ইমেইল বা ফোন নম্বর" />
      {errors.email && <p className="text-sm text-red-500 mt-1 ml-2">{errors.email.message}</p>}
    </div>

    <div className="space-y-2">
      <div className="flex justify-end">
        <button onClick={() => setView("forgot-password")} type="button" className="text-sm font-bold text-red-600 hover:underline">
          পাসওয়ার্ড ভুলে গেছেন?
        </button>
      </div>

      <input type="password" {...register("password", { required: "পাসওয়ার্ড দিন" })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all duration-300 placeholder:text-slate-400 text-slate-700 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10" placeholder="পাসওয়ার্ড" />
      {errors.password && <p className="text-sm text-red-500 mt-1 ml-2">{errors.password.message}</p>}
    </div>

    <button type="submit" disabled={isLoginLoading} className="cursor-pointer w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all">
      {isLoginLoading ? <span className="flex gap-2 items-center justify-center"><LoadingSvg /> অপেক্ষা করুন...</span> : "লগইন করুন"}
    </button>
  </>
);

export default LoginForm;
