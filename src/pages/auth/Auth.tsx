import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BackHome from "../../components/BackHome";

// New State added: "reset-password"
type AuthState = "login" | "register" | "forgot-password" | "verify-email" | "reset-password";
// type UserRole = "donor" | "requester" | "admin";

const inputClasses = `
  w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none 
  transition-all duration-300 placeholder:text-slate-400 text-slate-700
  focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10
`;

const AuthPage: React.FC = () => {
  const [view, setView] = useState<AuthState>("login");
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (view === "verify-email" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [view, timer]);

  const { register, handleSubmit } = useForm();

  const handleNextStep = (data: unknown) => {
    console.log("Submit Data:", data);
    if (view === "register" || view === "forgot-password") setView("verify-email");
    else if (view === "verify-email") setView("reset-password");
    else if (view === "reset-password") setView("login");
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      <BackHome className="absolute top-6 left-6 z-50 "/>
      {/* LEFT SIDE: Brand & Impact */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-10 left-10 w-64 h-64 bg-red-600 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-600 rounded-full blur-[150px]"></div>
        </div>
        <div className="relative z-10 max-w-lg text-center text-white">
          <span className="text-4xl bg-white/10 p-5 rounded-3xl inline-block mb-8 shadow-2xl">🩸</span>
          <h1 className="text-5xl font-black mb-6 leading-tight">
            রক্ত দিন, জীবন বাঁচান <br />
            <span className="text-red-500">Save Lives.</span>
          </h1>
          <p className="text-slate-400 text-xl font-medium">
            আপনার এক ব্যাগ রক্ত হতে পারে অন্য কারো বেঁচে থাকার শেষ সম্বল। আজই যুক্ত হোন আমাদের সাথে।
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md">
          
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-800">
                {view === "login" && "স্বাগতম (Welcome Back)"}
                {view === "register" && "নতুন অ্যাকাউন্ট (Join Us)"}
                {view === "forgot-password" && "পাসওয়ার্ড রিসেট"}
                {view === "verify-email" && "কোড যাচাই করুন"}
                {view === "reset-password" && "নতুন পাসওয়ার্ড"}
            </h2>
            <p className="text-slate-500 font-medium mt-1">
                {view === "login" ? "লগইন করতে আপনার তথ্য দিন" : "জীবন বাঁচাতে আমাদের কমিউনিটিতে যোগ দিন"}
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white">
            
            <form onSubmit={handleSubmit(handleNextStep)} className="space-y-5">
              
              {/* --- LOGIN --- */}
              {view === "login" && (
                <>
                  <input {...register("emailOrPhone")} className={inputClasses} placeholder="ইমেইল বা ফোন নম্বর" />
                  <div className="space-y-2">
                    <div className="flex justify-end">
                      <button onClick={() => setView("forgot-password")} type="button" className="text-xs font-bold text-red-600 hover:underline">পাসওয়ার্ড ভুলে গেছেন?</button>
                    </div>
                    <input type="password" {...register("password")} className={inputClasses} placeholder="পাসওয়ার্ড (Password)" />
                  </div>
                  <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all">লগইন করুন</button>
                </>
              )}

              {/* --- REGISTER --- */}
              {view === "register" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                      <input {...register("name")} className={inputClasses} placeholder="নাম" />
                      <input {...register("phone")} className={inputClasses} placeholder="ফোন" />
                  </div>
                  <input type="email" {...register("email")} className={inputClasses} placeholder="ইমেইল" />
                  <select {...register("role")} className={inputClasses}>
                      <option value="donor">রক্তদাতা (Donor)</option>
                      <option value="requester">রোগী (Patient)</option>
                  </select>
                  <input type="password" {...register("password")} className={inputClasses} placeholder="নতুন পাসওয়ার্ড" />
                  <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-200">অ্যাকাউন্ট তৈরি করুন</button>
                </>
              )}

              {/* --- FORGOT PASSWORD --- */}
              {view === "forgot-password" && (
                <>
                  <p className="text-sm text-slate-500 text-center">আপনার ইমেইল দিন, আমরা একটি ভেরিফিকেশন কোড পাঠাবো।</p>
                  <input type="email" {...register("email")} className={inputClasses} placeholder="আপনার ইমেইল" />
                  <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold">কোড পাঠান</button>
                  <button onClick={() => setView("login")} className="w-full text-sm font-bold text-slate-400">পিছনে যান (Back)</button>
                </>
              )}

              {/* --- VERIFY OTP --- */}
              {view === "verify-email" && (
                <div className="text-center space-y-6">
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">৬ ডিজিটের কোডটি দিন</p>
                  <input maxLength={6} {...register("code")} className={`${inputClasses} text-center text-2xl tracking-[0.5em] font-black`} placeholder="000000" />
                  <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold">যাচাই করুন (Verify)</button>
                  <div className="text-sm">
                    {timer > 0 ? (
                        <span className="text-slate-400">পুনরায় কোড পাঠান {timer}s</span>
                    ) : (
                        <button type="button" onClick={() => setTimer(30)} className="text-red-600 font-bold underline">Resend OTP</button>
                    )}
                  </div>
                </div>
              )}

              {/* --- NEW PASSWORD STEP --- */}
              {view === "reset-password" && (
                <>
                  <p className="text-sm text-slate-500 mb-2">আপনার নতুন পাসওয়ার্ড সেট করুন।</p>
                  <input type="password" {...register("new_password")} className={inputClasses} placeholder="নতুন পাসওয়ার্ড" />
                  <input type="password" {...register("confirm_password")} className={inputClasses} placeholder="পাসওয়ার্ড নিশ্চিত করুন" />
                  <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold">পাসওয়ার্ড পরিবর্তন করুন</button>
                </>
              )}

            </form>

            {/* SHARED FOOTER */}
            {(view === "login" || view === "register") && (
                <div className="mt-8 pt-6 border-t border-slate-50 text-center">
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