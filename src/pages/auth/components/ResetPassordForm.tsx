import LoadingSvg from "../../../components/LoadingSvg";

const ResetPasswordForm = ({
  register,
  errors,
  isLoading,
}: any) => (
  <div className="space-y-5">
    <input
      {...register("otp", { required: "ওটিপি দিন" })}
      maxLength={6}
      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-center tracking-[0.4em] font-black"
      placeholder="000000"
    />
    {errors.otp && <p className="text-[12px] text-red-500">{errors.otp.message}</p>}

    <input
      type="password"
      {...register("newPassword", {
        required: "নতুন পাসওয়ার্ড দিন",
        minLength: { value: 6, message: "কমপক্ষে ৬ অক্ষরের হতে হবে" },
      })}
      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl"
      placeholder="নতুন পাসওয়ার্ড"
    />
    {errors.newPassword && (
      <p className="text-[12px] text-red-500">{errors.newPassword.message}</p>
    )}

    <button
      type="submit"
      disabled={isLoading}
      className="cursor-pointer w-full bg-slate-900 text-white py-4 rounded-2xl font-bold"
    >
      {isLoading ? (
        <span className="flex justify-center gap-2">
          <LoadingSvg /> রিসেট হচ্ছে...
        </span>
      ) : (
        "পাসওয়ার্ড রিসেট করুন"
      )}
    </button>
  </div>
);

export default ResetPasswordForm;
