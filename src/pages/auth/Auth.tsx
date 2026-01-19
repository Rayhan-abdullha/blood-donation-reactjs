import React, { useState } from "react";
import { useForm } from "react-hook-form";

// ================= TYPES =================
type UserRole = "donor" | "requester" | "admin";

type LoginFormValues = {
  emailOrPhone: string;
  password: string;
};

type RegisterFormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
};

// ================= STYLES =================
// Unified style for all text inputs/selects
const inputClasses = `
  w-full px-4 py-2.5 
  bg-gray-50
  border border-slate-300 
  rounded-xl 
  shadow-sm 
  outline-none 
  transition-all duration-200
  placeholder:text-gray-400
  focus:bg-white
  focus:ring-2 focus:ring-red-100 
  focus:border-red-500 
  focus:shadow-[0_0_12px_rgba(239,68,68,0.15)]
`;

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormValues>();

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormValues>();

  const onLoginSubmit = (data: LoginFormValues) => console.log("Login Data:", data);
  const onRegisterSubmit = (data: RegisterFormValues) => console.log("Register Data:", data);

  return (
    // Background with a subtle gradient and pattern
    <div className="min-h-screen flex items-center justify-center px-4 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-red-50 via-white to-slate-100">
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 border border-white/60 backdrop-blur-sm">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-2xl bg-red-50 mb-4">
            <span className="text-3xl">🩸</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            {isLogin 
              ? "Login to manage your donations and requests" 
              : "Join our community and start saving lives today"}
          </p>
        </div>

        {/* LOGIN FORM */}
        {isLogin && (
          <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Email or Phone
              </label>
              <input
                type="text"
                placeholder="you@example.com"
                {...loginRegister("emailOrPhone", { required: "Email or phone is required" })}
                className={inputClasses}
              />
              {loginErrors.emailOrPhone && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium italic">
                  {loginErrors.emailOrPhone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...loginRegister("password", { required: "Password is required" })}
                className={inputClasses}
              />
              {loginErrors.password && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium italic">
                  {loginErrors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 active:scale-[0.98] transition-all shadow-lg shadow-red-200 mt-2"
            >
              Sign In
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {!isLogin && (
          <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 ml-1">Name</label>
                <input {...registerRegister("name", { required: "Required" })} className={inputClasses} placeholder="John Doe" />
                {registerErrors.name && <p className="text-red-500 text-[10px] mt-1">{registerErrors.name.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 ml-1">Phone</label>
                <input {...registerRegister("phone", { required: "Required" })} className={inputClasses} placeholder="017..." />
                {registerErrors.phone && <p className="text-red-500 text-[10px] mt-1">{registerErrors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 ml-1">Email</label>
              <input type="email" {...registerRegister("email", { required: "Required" })} className={inputClasses} placeholder="email@gmail.com" />
              {registerErrors.email && <p className="text-red-500 text-[10px] mt-1">{registerErrors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 ml-1">Role</label>
              <select {...registerRegister("role", { required: "Required" })} className={inputClasses}>
                <option value="">Select role</option>
                <option value="donor">Donor</option>
                <option value="requester">Requester</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 ml-1">Password</label>
              <input type="password" {...registerRegister("password", { required: "Min 6 chars" })} className={inputClasses} placeholder="••••••••" />
              {registerErrors.password && <p className="text-red-500 text-[10px] mt-1">{registerErrors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 active:scale-[0.98] transition-all shadow-lg shadow-red-200 mt-4"
            >
              Create Account
            </button>
          </form>
        )}

        {/* Footer Toggle */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">
            {isLogin ? "New to the platform?" : "Joined us before?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-red-600 font-bold hover:text-red-700 transition-colors underline underline-offset-4"
            >
              {isLogin ? "Create Account" : "Login Now"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;