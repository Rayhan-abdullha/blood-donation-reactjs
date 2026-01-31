import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, 
  Save, Lock, LogOut, ChevronRight,
  MapPin, Activity, Droplet, CheckCircle2, Clock, XCircle,
  Hash, Heart
} from "lucide-react";
import DonorCardSkeleton from "../search/DonorSkeleton";
import ChangePassword from "../../components/ChangePassword";
import { useAuthStore } from "../../store/authStore";
import { useProfileActions } from "../../hooks/useProfile";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const inputClasses = (hasError: boolean) => `
  w-full px-12 py-3.5 bg-slate-50/50 border rounded-2xl outline-none transition-all duration-300 text-sm font-semibold text-slate-700
  ${hasError 
    ? "border-red-500 ring-4 ring-red-500/10 bg-red-50/50" 
    : "border-slate-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/5 focus:bg-white focus:shadow-sm"}
`;

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 mb-1.5 block">
    {children}
  </label>
);

export default function Profile() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isBloodOpen, setIsBloodOpen] = useState(false);
  const { getUserProfile: { isLoading, data } } = useProfileActions();
  const { logout } = useAuthStore();
  
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();

  const userRole = watch("role");
  const selectedBlood = watch("blood_group");
  const isAvailable = watch("is_available");
  const donorStatus = watch("status") || "pending";

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name,
        email: data.data.email,
        phone: data.data.phone,
        role: data.data.role,
        blood_group: data.data.blood_group,
        address: data.data.address,
        nid: data.data.nid,
        is_available: data.data.is_available,
        status: data.data.status || "pending"
      });
    }
  }, [data, reset]);

  const onSubmit = (updateData: any) => {
    // updateProfile.mutate(updateData);
    console.log("Updating profile...", updateData);
  };

  return (
    <div className="min-h-screen pb-20 pt-24 px-4 md:px-8 bg-[#F8FAFC]">
      {/* Decorative Blur */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-6xl mx-auto">
        {/* --- Header & Quick Stats --- */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                Dashboard
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              আমার প্রোফাইল<span className="text-red-600">.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-[1.5rem] border border-slate-100 shadow-sm">
            <div className="px-6 py-2 border-r border-slate-50 text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Role</p>
              <p className="text-sm font-bold text-slate-800 capitalize">{userRole || "User"}</p>
            </div>
            <div className="px-6 py-2 text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Status</p>
              <div className="flex items-center gap-1.5 justify-center">
                <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-slate-300'}`} />
                <p className="text-sm font-bold text-slate-800">{isAvailable ? "Active" : "Away"}</p>
              </div>
            </div>
          </div>
        </header>

        {isLoading && !data ? <DonorCardSkeleton /> : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* --- Left Sidebar --- */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden">
                {/* Profile Card BG decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-0 opacity-50" />
                
                <div className="relative z-10 text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-28 h-28 rounded-[2.5rem] bg-slate-100 flex items-center justify-center text-slate-300 border-4 border-white shadow-xl overflow-hidden">
                       <User size={54} />
                    </div>
                    {userRole === "donor" && (
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-red-600 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg">
                        <Droplet size={18} fill="currentColor" />
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">{watch("name")}</h2>
                  <p className="text-slate-400 font-medium text-xs mb-6">{watch("email")}</p>

                  <div className="space-y-3">
                    <button onClick={() => setShowPasswordModal(true)} className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-red-500 shadow-sm transition-colors">
                          <Lock size={14} />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-wider">পাসওয়ার্ড</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button onClick={() => logout()} className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-red-500 hover:bg-red-50 font-black text-[11px] uppercase tracking-wider transition-all">
                      <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <LogOut size={14} />
                      </div>
                      লগ আউট
                    </button>
                  </div>
                </div>

                {/* --- Verification Card --- */}
                {userRole === "donor" && (
                  <div className="mt-8 pt-8 border-t border-slate-50 space-y-5">
                    <Label>Verification Status</Label>
                    <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                      donorStatus === 'approved' ? 'bg-green-50 border-green-100 text-green-700' :
                      donorStatus === 'rejected' ? 'bg-red-50 border-red-100 text-red-700' :
                      'bg-amber-50 border-amber-100 text-amber-700'
                    }`}>
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        {donorStatus === 'approved' && <CheckCircle2 size={20} />}
                        {donorStatus === 'rejected' && <XCircle size={20} />}
                        {donorStatus === 'pending' && <Clock size={20} />}
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Account</p>
                        <p className="text-sm font-black capitalize">{donorStatus}</p>
                      </div>
                    </div>

                    <div className={`p-5 rounded-2xl border-2 transition-all ${isAvailable ? 'border-red-50 bg-red-50/20' : 'border-slate-50 bg-slate-50/30'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors ${isAvailable ? 'bg-red-600 text-white' : 'bg-white text-slate-300'}`}>
                            <Activity size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase text-slate-400">Availability</p>
                            <p className="text-xs font-bold text-slate-700">{isAvailable ? "রক্ত দিতে প্রস্তুত" : "বর্তমানে বিরতিতে"}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" {...register("is_available")} className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* --- Main Content Form --- */}
            <main className="lg:col-span-8 space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* General Information */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-[1.25rem] flex items-center justify-center shadow-inner">
                      <User size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">ব্যক্তিগত তথ্য</h3>
                      <p className="text-slate-400 text-xs font-medium">আপনার প্রোফাইলের সাধারণ তথ্য</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="relative group">
                      <Label>Full Name</Label>
                      <User className="absolute left-4 top-[42px] text-slate-300 group-focus-within:text-red-500 transition-colors" size={18} />
                      <input {...register("name", { required: true })} className={inputClasses(!!errors.name)} placeholder="আপনার পুরো নাম" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <Label>Email Address</Label>
                        <Mail className="absolute left-4 top-[42px] text-slate-300" size={18} />
                        <input {...register("email")} className={`${inputClasses(false)} bg-slate-50/80 cursor-not-allowed`} readOnly />
                      </div>
                      <div className="relative group">
                        <Label>Phone Number</Label>
                        <Phone className="absolute left-4 top-[42px] text-slate-300" size={18} />
                        <input {...register("phone")} className={inputClasses(false)} placeholder="01XXXXXXXXX" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Donor Specific Data */}
                <AnimatePresence>
                  {userRole === "donor" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)]"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-[1.25rem] flex items-center justify-center shadow-inner">
                          <Heart size={22} />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-slate-900 tracking-tight">রক্তদান সংক্রান্ত তথ্য</h3>
                          <p className="text-slate-400 text-xs font-medium">রক্তদানের জন্য আপনার বিশেষ তথ্য</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Custom Blood Group */}
                        <div className="relative">
                          <Label>Blood Group</Label>
                          <div 
                            onClick={() => setIsBloodOpen(!isBloodOpen)}
                            className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl flex items-center justify-between cursor-pointer hover:border-red-500 transition-all shadow-sm group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-red-500 shadow-sm">
                                <Droplet size={16} fill={selectedBlood ? "currentColor" : "none"} />
                              </div>
                              <span className="text-sm font-bold text-slate-700">{selectedBlood || "Select Group"}</span>
                            </div>
                            <ChevronRight size={16} className={`text-slate-300 transition-transform ${isBloodOpen ? 'rotate-90' : ''}`} />
                          </div>

                          <AnimatePresence>
                            {isBloodOpen && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 5, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute z-50 w-full bg-white border border-slate-100 rounded-3xl shadow-2xl p-3 grid grid-cols-4 gap-2 mt-2"
                              >
                                {bloodGroups?.map((group) => (
                                  <button
                                    key={group}
                                    type="button"
                                    onClick={() => { setValue("blood_group", group); setIsBloodOpen(false); }}
                                    className={`py-3 rounded-2xl text-[11px] font-black transition-all ${selectedBlood === group ? 'bg-red-600 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-red-50'}`}
                                  >
                                    {group}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="relative group">
                          <Label>NID Number</Label>
                          <Hash className="absolute left-4 top-[42px] text-slate-300" size={18} />
                          <input {...register("nid")} className={inputClasses(false)} placeholder="এনআইডি নম্বর" />
                        </div>

                        <div className="md:col-span-2 relative group">
                          <Label>Full Address</Label>
                          <MapPin className="absolute left-4 top-11 text-slate-300" size={18} />
                          <textarea {...register("address")} rows={3} className={`${inputClasses(false)} py-4 pl-12 h-auto resize-none`} placeholder="গ্রাম, ইউনিয়ন, উপজেলা, জেলা..." />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action */}
                <div className="pt-4">
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }} 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:bg-red-600 transition-all group"
                  >
                    <Save size={18} className="group-hover:rotate-12 transition-transform" /> 
                    প্রোফাইল আপডেট করুন
                  </motion.button>
                </div>
              </form>
            </main>
          </div>
        )}
      </div>

      {showPasswordModal && (
        <ChangePassword inputClasses={inputClasses} isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
}