import { useEffect, useState } from "react";
import { Lock, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PropsType = {
  inputClasses: (hasError: boolean) => string;
  isOpen: boolean;
  onClose: () => void;
};

const ChangePasswordModal = ({ inputClasses, isOpen, onClose }: PropsType) => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 outline-none">
        
        {/* Backdrop: Darker and Higher Blur to hide Navbar content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 z-[10000] border border-slate-100"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
          >
            <X size={20} />
          </button>

          {/* Icon & Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-red-50 text-red-600 rounded-3xl mb-4">
              <Lock size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">পাসওয়ার্ড আপডেট</h3>
          </div>

          <div className="space-y-4">
            <input
              name="oldPassword"
              type="password"
              placeholder="বর্তমান পাসওয়ার্ড"
              className={inputClasses(false)}
              onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})}
            />
            
            <input
              name="newPassword"
              type="password"
              placeholder="নতুন পাসওয়ার্ড"
              className={inputClasses(!!error)}
              onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="পাসওয়ার্ড নিশ্চিত করুন"
              className={inputClasses(!!error)}
              onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
            />

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl text-sm border border-red-100"
                >
                  <AlertCircle size={16} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => {
                if(passwords.newPassword !== passwords.confirmPassword) {
                  setError("পাসওয়ার্ড মেলেনি!");
                } else {
                  setError("");
                  console.log("Success");
                }
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-red-200"
            >
              পরিবর্তন করুন
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ChangePasswordModal;