import LoadingSvg from "../../../components/LoadingSvg";

const ForgotPasswordForm = ({
  register,
  errors,
  isLoading,
  setView,
}: any) => (
  <div className="space-y-6">
    <div className="text-center">
      <p className="text-sm text-slate-500 font-medium leading-relaxed">
        আপনার রেজিস্টার্ড ইমেইলটি দিন। আমরা একটি ওটিপি (OTP) পাঠাবো।
      </p>
    </div>

    <div className="space-y-1">
      <input
        type="email"
        {...register("email", { required: "ইমেইল অ্যাড্রেসটি দিন" })}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl"
        placeholder="আপনার ইমেইল"
      />
      {errors.email && (
        <p className="text-[12px] text-red-500 font-medium">
          {errors.email.message}
        </p>
      )}
    </div>

    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-100"
    >
      {isLoading ? (
        <span className="flex justify-center gap-2">
          <LoadingSvg /> অপেক্ষা করুন...
        </span>
      ) : (
        "ওটিপি পাঠান"
      )}
    </button>

    <div className="text-center">
      <button
        type="button"
        onClick={() => setView("login")}
        className="text-sm font-bold text-slate-400 hover:text-slate-600"
      >
        ← লগইন পেজে ফিরে যান
      </button>
    </div>
  </div>
);

export default ForgotPasswordForm;
