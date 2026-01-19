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

// ================= COMPONENT =================
const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Login Form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormValues>();

  // Register Form
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormValues>();

  // ================= HANDLERS =================
  const onLoginSubmit = (data: LoginFormValues) => {
    console.log("Login Data:", data);
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    console.log("Register Data:", data);
  };

  // ================= UI =================
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <p className="text-center text-red-600 font-semibold mb-2">
          🩸 Save Lives, Donate Blood
        </p>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* LOGIN FORM */}
        {isLogin && (
          <form
            onSubmit={handleLoginSubmit(onLoginSubmit)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email or Phone
              </label>
              <input
                type="text"
                {...loginRegister("emailOrPhone", {
                  required: "Email or phone is required",
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
              {loginErrors.emailOrPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {loginErrors.emailOrPhone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                {...loginRegister("password", {
                  required: "Password is required",
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
              {loginErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {loginErrors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Login
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {!isLogin && (
          <form
            onSubmit={handleRegisterSubmit(onRegisterSubmit)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                {...registerRegister("name", { required: "Name is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
              {registerErrors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {registerErrors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                {...registerRegister("email", { required: "Email is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
              {registerErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {registerErrors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone
              </label>
              <input
                type="text"
                {...registerRegister("phone", { required: "Phone is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
              {registerErrors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {registerErrors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Role
              </label>
              <select
                {...registerRegister("role", { required: "Role is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option value="">Select role</option>
                <option value="donor">Donor</option>
                <option value="requester">Requester</option>
              </select>
              {registerErrors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {registerErrors.role.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                {...registerRegister("password", {
                  required: "Password is required",
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
              {registerErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {registerErrors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-2 rounded-lg font-semibold hover:bg-rose-700 transition"
            >
              Register
            </button>
          </form>
        )}

        {/* TOGGLE */}
        <p className="text-center text-gray-600 mt-6">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-red-600 font-semibold hover:underline cursor-pointer"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;