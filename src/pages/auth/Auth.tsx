import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BackHome from "../../components/BackHome";

import useLoginAction from "../../hooks/useLogin";
import useRegisterAction from "../../hooks/useRegister";
import useVerifyAction from "../../hooks/useVerifyOtp";
import useResetPassword from "../../hooks/useResetPassword";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import VerifyOtpForm from "./components/VerifyOtpForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import useForgotPassword from "../../hooks/useForgotPass";
import ResetPasswordForm from "./components/ResetPassordForm";
import { useAuthStore } from "../../store/authStore";
import { getOneSignalId, initOneSignal, requestLocationPermission } from "../../utils/permissionManager";
import toast from "react-hot-toast";

type AuthState =
  | "login"
  | "register"
  | "verify-email"
  | "forgot-password"
  | "reset-password";

const AuthPage: React.FC = () => {
  const [wait, setWait] = useState(false);
  const [view, setView] = useState<AuthState>("login");
  const [timer, setTimer] = useState(30);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

    const email = watch("email");

    const { mutate: loginUser, isPending: isLoginLoading } = useLoginAction();
    const { mutate: registerUser, isPending: isRegisterLoading } =
      useRegisterAction();
    const { mutate: verifyOtp, isPending: isVerifyLoading } = useVerifyAction();
    const { mutate: forgotPassword, isPending: isForgotLoading } =
      useForgotPassword();
    const { mutate: resetPassword, isPending: isResetLoading } =
      useResetPassword();

    const handleAuth = async (data: any) => {
      if (view === "login") {
        loginUser(data);
      }

      if (view === "register") {
        const toastId = toast.loading("Creating your account...");
        const registerData = {...data}
        try {
            await initOneSignal();
          const playerID = await getOneSignalId();
          registerData.onesignal_id = playerID ?? null;
          setWait(true);
        } catch (error) {
             registerData.onesignal_id = null;
          }
        try {
          const locationData = await requestLocationPermission();
          registerData.latitude = locationData?.latitude ?? null;
          registerData.longitude = locationData?.longitude ?? null;
          console.log(registerData);
        } catch (_err) {
          if (!registerData?.latitude && !registerData?.longitude) {
            toast.custom("location does not access!")
          }
          if (!registerData.onesignal_id) {
            toast.custom("notification does not access!")
          }
        }
        registerUser(registerData, {
          onSuccess: (res) => {
            toast.dismiss(toastId);
            toast.success("Account created successfully 🎉");
            localStorage.setItem("otp_email", res?.data);
            setView("verify-email");
            setWait(false);
          },

          onError: (error: any) => {
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.data.error || "কিছু ভুল হয়েছে");
            setWait(false);
          },
        });
      }


      if (view === "verify-email") {
        const email = localStorage.getItem("otp_email");
        verifyOtp(
          { email: email, otp: data.code },
          {
            onSuccess: () => {
              setView("login");
              localStorage.removeItem("otp_email");
            },
          }
        );
      }

      if (view === "forgot-password") {
        forgotPassword(
          { email: data.email },
          { onSuccess: () => setView("reset-password") }
        );
      }

      if (view === "reset-password") {
        resetPassword(
          {
            email,
            otp: data.otp,
            newPassword: data.newPassword,
          },
          { onSuccess: () => setView("login") }
        );
      }
    };

  useEffect(() => {
    if (localStorage.getItem("otp_email")) {
      setView("verify-email");
    }
    if (useAuthStore.getState().token) {
      location.href = "/";
    }
    let interval: any;
    if (view === "verify-email" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [view, timer]);


  return (
    <div className="min-h-screen flex bg-white font-sans">
      <BackHome className="absolute top-6 left-6 z-50" />

      {/* LEFT BRAND */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center p-12">
        <div className="relative z-10 max-w-lg text-center text-white">
          <span className="text-4xl bg-white/10 p-5 rounded-3xl inline-block mb-8">
            🩸
          </span>
          <h1 className="text-5xl font-black mb-6">
            রক্ত দিন, জীবন বাঁচান <br />
            <span className="text-red-500">Save Lives.</span>
          </h1>
          <p className="text-slate-400">
            আপনার এক ব্যাগ রক্ত হতে পারে অন্য কারো বেঁচে থাকার শেষ সম্বল।
          </p>
        </div>
      </div>

      {/* RIGHT AUTH */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-black text-center mb-8">
            {view === "login" && "স্বাগতম (Welcome Back)"}
            {view === "register" && "নতুন অ্যাকাউন্ট (Join Us)"}
            {view === "verify-email" && "কোড যাচাই করুন"}
            {view === "forgot-password" && "পাসওয়ার্ড ভুলে গেছেন"}
            {view === "reset-password" && "নতুন পাসওয়ার্ড দিন"}
          </h2>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl">
            <form onSubmit={handleSubmit(handleAuth)} className="space-y-5">
              {view === "login" && (
                <LoginForm
                  register={register}
                  errors={errors}
                  isLoginLoading={isLoginLoading}
                  setView={setView}
                />
              )}

              {view === "register" && (
                <RegisterForm
                  wait={wait}
                  register={register}
                  errors={errors}
                  isRegisterLoading={isRegisterLoading}
                />
              )}

              {view === "verify-email" && (
                <VerifyOtpForm
                  register={register}
                  isVerifyLoading={isVerifyLoading}
                />
              )}

              {view === "forgot-password" && (
                <ForgotPasswordForm
                  register={register}
                  errors={errors}
                  isLoading={isForgotLoading}
                  setView={setView}
                />
              )}

              {view === "reset-password" && (
                <ResetPasswordForm
                  register={register}
                  errors={errors}
                  isLoading={isResetLoading}
                />
              )}
            </form>

            {(view === "login" || view === "register") && (
              <div className="mt-6 text-center">
                <button
                  onClick={() =>
                    setView(view === "login" ? "register" : "login")
                  }
                  className="text-sm text-slate-500"
                >
                  {view === "login" ? "অ্যাকাউন্ট নেই?" : "অ্যাকাউন্ট আছে?"}
                  <span className="ml-2 text-red-600 font-black underline">
                    {view === "login" ? "রেজিস্ট্রেশন করুন" : "লগইন করুন"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
