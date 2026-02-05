import LoadingSvg from "../../../components/LoadingSvg";
import ResendOtp from "./ResendOtp";

const VerifyOtpForm = ({ register, isVerifyLoading }: any) => {
  return <div className="text-center space-y-6">
    <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">৬ ডিজিটের কোডটি দিন</p>
    <input maxLength={6} {...register("code", { required: true })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-center text-2xl tracking-[0.5em] font-black" placeholder="000000" />
    <button type="submit" disabled={isVerifyLoading} className="cursor-pointer w-full bg-slate-900 text-white py-4 rounded-2xl font-bold">
      {isVerifyLoading ? <span className="flex justify-center items-center"><LoadingSvg /> যাচাই হচ্ছে...</span> : "যাচাই করুন (Verify)"}
    </button>
    <ResendOtp/>
  </div>
}

export default VerifyOtpForm;
