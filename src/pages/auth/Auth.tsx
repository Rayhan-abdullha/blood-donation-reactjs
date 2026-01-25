import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import  { Toaster } from "react-hot-toast"; // টোস্টের জন্য
import BackHome from "../../components/BackHome";
import { useAuthActions } from "../../hooks/useAuth"; // আমাদের তৈরি করা হুক

import { useNavigate } from "react-router-dom";

type AuthState = "login" | "register" | "forgot-password" | "verify-email" | "reset-password";

const inputClasses = `
  w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none 
  transition-all duration-300 placeholder:text-slate-400 text-slate-700
  focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10
`;

const AuthPage: React.FC = () => {
  const [view, setView] = useState<AuthState>("login");
  const [timer, setTimer] = useState(30);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  
  // আমাদের API হুকগুলো কল করা হচ্ছে
  const { loginUser, registerUser, verifyOtp } = useAuthActions();

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (view === "verify-email" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [view, timer]);

  // Form Submission Logic
  const handleAuth = async (data: any) => {
    if (view === "login") {
      loginUser.mutate(data, {
        onSuccess: () => {
          // redirect public home
          navigate("/home");
        }
      });
    } 
    else if (view === "register") {
      registerUser.mutate(data, {
        onSuccess: () => setView("verify-email")
      });
    } 
    else if (view === "verify-email") {
      // ইমেইল এবং ওটিপি একসাথে পাঠানো
      verifyOtp.mutate({ email: data.email, otp: data.code }, {
        onSuccess: () => setView("login")
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      <Toaster /> {/* টোস্ট মেসেজ দেখানোর জন্য */}
      <BackHome className="absolute top-6 left-6 z-50 "/>

      {/* LEFT SIDE: Brand (আগের মতোই থাকবে) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-10 left-10 w-64 h-64 bg-red-600 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-600 rounded-full blur-[150px]"></div>
        </div>
        <div className="relative z-10 max-w-lg text-center text-white">
          <span className="text-4xl bg-white/10 p-5 rounded-3xl inline-block mb-8 shadow-2xl">🩸</span>
          <h1 className="text-5xl font-black mb-6 leading-tight text-white">
            রক্ত দিন, জীবন বাঁচান <br />
            <span className="text-red-500">Save Lives.</span>
          </h1>
            <p className="text-slate-400 text-lg">আপনার এক ব্যাগ রক্ত হতে পারে অন্য কারো বেঁচে থাকার শেষ সম্বল। আজই যুক্ত হোন আমাদের সাথে।</p>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md">  
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-800 text-center">
                {view === "login" && "স্বাগতম (Welcome Back)"}
                {view === "register" && "নতুন অ্যাকাউন্ট (Join Us)"}
                {view === "verify-email" && "কোড যাচাই করুন"}
            </h2>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white">
            <form onSubmit={handleSubmit(handleAuth)} className="space-y-5">
              {/* --- LOGIN --- */}
              {view === "login" && (
                <>
                  <div>
                    <input {...register("email", { required: "ইমেইল বা ফোন নম্বর দিন" })} className={inputClasses} placeholder="ইমেইল বা ফোন নম্বর" />
                    {errors.email && <p className="text-sm text-red-500 mt-1 ml-2">{errors.email.message as string}</p>}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-end">
                      <button onClick={() => setView("forgot-password")} type="button" className="text-sm font-bold text-red-600 hover:underline">পাসওয়ার্ড ভুলে গেছেন?</button>
                    </div>
                    <input type="password" {...register("password", { required: "পাসওয়ার্ড দিন" })} className={inputClasses} placeholder="পাসওয়ার্ড" />
                    {errors.password && <p className="text-sm text-red-500 mt-1 ml-2">{errors.password.message as string}</p>}
                  </div>
                  <button type="submit" disabled={loginUser.isPending} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all">
                    {loginUser.isPending ? "লোডিং..." : "লগইন করুন"}
                  </button>
                </>
              )}
              {/* --- REGISTER --- */}
              {view === "register" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <input 
                        {...register("name", { required: "আপনার নাম দিন" })} 
                        className={inputClasses} 
                        placeholder="নাম" 
                      />
                      {errors.name && <p className="text-[12px] text-red-500 font-medium ml-2">{errors.name.message as string}</p>}
                    </div>
                    
                    <div className="space-y-1">
                      <input 
                        {...register("phone", { required: "ফোন নম্বর দিন" })} 
                        className={inputClasses} 
                        placeholder="ফোন" 
                      />
                      {errors.phone && <p className="text-[12px] text-red-500 font-medium ml-2">{errors.phone.message as string}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <input 
                      type="email" 
                      {...register("email", { 
                        required: "ইমেইল অ্যাড্রেস দিন",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "সঠিক ইমেইল ফরম্যাট দিন"
                        }
                      })} 
                      className={inputClasses} 
                      placeholder="ইমেইল" 
                    />
                    {errors.email && <p className="text-[12px] text-red-500 font-medium ml-2">{errors.email.message as string}</p>}
                  </div>

                  <div className="space-y-1">
                    <input 
                      type="password" 
                      {...register("password", { 
                        required: "পাসওয়ার্ড দিন", 
                        minLength: { value: 6, message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে" } 
                      })} 
                      className={inputClasses} 
                      placeholder="নতুন পাসওয়ার্ড" 
                    />
                    {errors.password && <p className="text-[12px] text-red-500 font-medium ml-2">{errors.password.message as string}</p>}
                  </div>

                  <button type="submit" disabled={registerUser.isPending} className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-200">
                    {registerUser.isPending ? "প্রসেসিং..." : "অ্যাকাউন্ট তৈরি করুন"}
                  </button>
                </>
              )}
              {/* --- VERIFY OTP --- */}
              {view === "verify-email" && (
                <div className="text-center space-y-6">
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">৬ ডিজিটের কোডটি দিন</p>
                  <input maxLength={6} {...register("code", { required: true })} className={`${inputClasses} text-center text-2xl tracking-[0.5em] font-black`} placeholder="000000" />
                  <button type="submit" disabled={verifyOtp.isPending} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold">
                    {verifyOtp.isPending ? "যাচাই হচ্ছে..." : "যাচাই করুন (Verify)"}
                  </button>
                </div>
              )}
              {/* --- FORGOT PASSWORD --- */}
              {view === "forgot-password" && (
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
                      className={inputClasses} 
                      placeholder="আপনার ইমেইল" 
                    />
                    {errors.email && <p className="text-[12px] text-red-500 font-medium">{errors.email.message as string}</p>}
                  </div>

                  <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-100">
                    ওটিপি পাঠান
                  </button>

                  <div className="text-center">
                    <button 
                      type="button" 
                      onClick={() => setView("login")} 
                      className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      ← লগইন পেজে ফিরে যান
                    </button>
                  </div>
                </div>
                            )}
              {/* --- RESET PASSWORD --- */}
              {view === "reset-password" && (
                <div className="space-y-5">
                  <div className="space-y-1">
                    <input 
                      type="password" 
                      {...register("newPassword", { 
                        required: "নতুন পাসওয়ার্ড দিন", 
                        minLength: { value: 6, message: "কমপক্ষে ৬ অক্ষরের হতে হবে" } 
                      })} 
                      className={inputClasses} 
                      placeholder="নতুন পাসওয়ার্ড লিখুন" 
                    />
                    {errors.newPassword && <p className="text-[12px] text-red-500 font-medium">{errors.newPassword.message as string}</p>}
                  </div>

                  <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold transition-all">
                    পাসওয়ার্ড রিসেট করুন
                  </button>
                </div>
              )}
            </form>
            {/* SHARED FOOTER */}
            {(view === "login" || view === "register") && (
                <div className="mt-3 pt-6 border-t border-slate-50 text-center">
                    <button onClick={() => setView(view === "login" ? "register" : "login")} className="text-sm font-medium text-slate-500">
                        {view === "login" ? "অ্যাকাউন্ট নেই?" : "অ্যাকাউন্ট আছে?"}
                        <span className="text-red-600 font-black ml-2 underline underline-offset-8">
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