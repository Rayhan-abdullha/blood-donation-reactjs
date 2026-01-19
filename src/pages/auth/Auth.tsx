import React, { useState } from "react";
import { useForm } from "react-hook-form";

// ================= TYPES =================
type UserRole = "donor" | "requester" | "admin";
type LoginFormValues = { emailOrPhone: string; password: string };
type RegisterFormValues = { name: string; email: string; phone: string; password: string; role: UserRole };

// ================= STYLES =================
const inputClasses = `
  w-full px-4 py-3 
  bg-slate-50 border border-slate-200 
  rounded-2xl outline-none transition-all duration-300
  placeholder:text-slate-400 text-slate-700
  focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10
`;

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm<LoginFormValues>();
  const { register: registerRegister, handleSubmit: handleRegisterSubmit } = useForm<RegisterFormValues>();

  const onLoginSubmit = (data: LoginFormValues) => console.log("Login:", data);
  const onRegisterSubmit = (data: RegisterFormValues) => console.log("Register:", data);

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* LEFT SIDE: Visual Content (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
        {/* Animated Blood Drops/Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-10 left-10 w-64 h-64 bg-red-600 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-600 rounded-full blur-[150px]"></div>
        </div>

        <div className="relative z-10 max-w-lg text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl mb-8 shadow-2xl">
            <span className="text-4xl">🩸</span>
          </div>
          <h1 className="text-5xl font-black text-white leading-tight mb-6">
            Saving Lives <br /> 
            <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Starts With You.</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            Join the community that bridges the gap between those in need and those who give. 
          </p>
          
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-12">
            <div><p className="text-white font-bold text-2xl">10k+</p><p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Donors</p></div>
            <div><p className="text-white font-bold text-2xl">24/7</p><p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Support</p></div>
            <div><p className="text-white font-bold text-2xl">Instant</p><p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Matching</p></div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-slate-50">
        <div className="w-full max-w-md">
          
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
             <span className="text-4xl bg-red-100 p-4 rounded-3xl inline-block shadow-inner">🩸</span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                {isLogin ? "Welcome Back" : "Get Started"}
            </h2>
            <p className="text-slate-500 font-medium">
                {isLogin ? "Please enter your details to login" : "Create your account in 30 seconds"}
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
            {isLogin ? (
              /* LOGIN FORM */
              <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email or Phone</label>
                  <input {...loginRegister("emailOrPhone", { required: "Identity is required" })} className={inputClasses} placeholder="you@example.com" />
                  {loginErrors.emailOrPhone && <p className="text-red-500 text-xs mt-1 font-bold">{loginErrors.emailOrPhone.message}</p>}
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                        <button type="button" className="text-xs font-bold text-red-600 hover:text-red-700">Forgot?</button>
                    </div>
                  <input type="password" {...loginRegister("password", { required: "Password is required" })} className={inputClasses} placeholder="••••••••" />
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-black active:scale-[0.98] transition-all shadow-xl shadow-slate-200">
                  Sign In
                </button>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Name</label>
                        <input {...registerRegister("name", { required: "Name required" })} className={inputClasses} placeholder="John" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Phone</label>
                        <input {...registerRegister("phone", { required: "Phone required" })} className={inputClasses} placeholder="017..." />
                    </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email</label>
                  <input type="email" {...registerRegister("email", { required: "Email required" })} className={inputClasses} placeholder="email@example.com" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Register As</label>
                  <select {...registerRegister("role", { required: "Role required" })} className={`${inputClasses} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em]`}>
                    <option value="">Choose one...</option>
                    <option value="donor">Donor (Hero)</option>
                    <option value="requester">Patient / Requester</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Password</label>
                  <input type="password" {...registerRegister("password", { required: "Required" })} className={inputClasses} placeholder="••••••••" />
                </div>

                <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-700 active:scale-[0.98] transition-all shadow-xl shadow-red-200 mt-4">
                  Create Account
                </button>
              </form>
            )}

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm font-medium">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-red-600 font-black hover:text-red-700 transition-colors underline underline-offset-8"
                >
                  {isLogin ? "Join Now" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;