import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthActions } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import axios from "axios";
import { apiKey } from "../../config/config";
import LoadingSvg from "../../components/LoadingSvg";
import { motion, AnimatePresence } from "framer-motion"; // Added for animation
import { ChevronDown, Sparkles } from "lucide-react"; // Added for icons

type DonorRequestForm = {
  bloodGroup: string;
  address: string;
  nidNumber: string;
  nidFront: FileList;
  profilePic: FileList;
  agreement: boolean;
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function DonorRegistration() {
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false); // Dropdown State

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm<DonorRequestForm>();
  const { donorRegister } = useAuthActions();

  const selectedBloodGroup = watch("bloodGroup");

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
      return response.data.data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const onSubmit = async (data: DonorRequestForm) => {
    setLoading(true);
    if (!data.bloodGroup || !data.address) {
      toast.error("ব্লাড গ্রুপ এবং লোকেশন প্রয়োজনীয়!");
      setLoading(false);
      return;
    }
    
    let profilePicUrl = null;
    if (data.profilePic[0]) {
      toast.loading("প্রোফাইল ইমেজ আপলোড হচ্ছে...");
      profilePicUrl = await uploadImage(data.profilePic[0]);
      toast.dismiss();
      if (!profilePicUrl) {
        toast.error("ইমেজ আপলোড ব্যর্থ হয়েছে!");
        setLoading(false);
        return;
      }
      toast.success("প্রোফাইল ইমেজ আপলোড সফল!");
    }

    let nidFrontUrl = null;
    if (data.nidFront[0]) {
      toast.loading("Nid ইমেজ আপলোড হচ্ছে...");
      nidFrontUrl = await uploadImage(data.nidFront[0]);
      toast.dismiss();
      if (!nidFrontUrl) {
        toast.error("NID আপলোড ব্যর্থ হয়েছে!");
        setLoading(false);
        return;
      }
      toast.success("NID আপলোড সফল!");
    }

    const finalData = {
      address: data.address,
      blood_group: data.bloodGroup,
      nid: data.nidNumber,
      pic: profilePicUrl,
      nid_pic: nidFrontUrl
    };

    donorRegister.mutate(finalData);
    setLoading(false);
  };

  const handleImgPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const inputClasses = `
    w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none 
    transition-all duration-300 placeholder:text-slate-400 text-slate-700
    focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10
  `;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16 mt-5 font-sans">
      <div className="w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-white overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Sidebar Info */}
        <div className="md:w-1/3 bg-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-red-900/20">❤️</div>
            <h2 className="text-2xl font-black leading-tight">রক্তদাতা হিসেবে নিবন্ধন করুন</h2>
            <p className="text-slate-400 text-sm mt-4 leading-relaxed">
              আপনার তথ্যগুলো আমাদের সুরক্ষিত সার্ভারে সংরক্ষিত থাকবে।
            </p>
          </div>
          <div className="space-y-4 mt-8 relative z-10">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
              <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-red-500 text-[10px]">✓</span>
              এনআইডি ভেরিফিকেশন
            </div>
          </div>
          {/* Subtle background glow */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side Form */}
        <div className="md:w-2/3 p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative group">
                <div className={`w-24 h-24 rounded-[2rem] bg-slate-50 border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-500 ${errors.profilePic ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-slate-200 group-hover:border-red-400 shadow-sm group-hover:shadow-lg group-hover:shadow-red-50'}`}>
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl">📷</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Upload</span>
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  {...register("profilePic", { 
                    required: "প্রোফাইল ছবি প্রয়োজন", 
                    onChange: handleImgPreview 
                  })}
                />
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase mt-3 tracking-widest">আপনার প্রোফাইল ছবি*</p>
              {errors.profilePic && <p className="text-red-500 text-[10px] font-bold mt-1 animate-pulse">{errors.profilePic.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* CUSTOM GORGEOUS BLOOD GROUP SELECT */}
              <div className="space-y-2 relative">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">রক্তের গ্রুপ*</label>
                
                <div 
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className={`flex items-center justify-between cursor-pointer ${inputClasses} ${errors.bloodGroup ? 'border-red-500 bg-red-50/20' : ''} ${isSelectOpen ? 'border-red-500 ring-4 ring-red-500/10' : ''}`}
                >
                  <span className={`font-bold ${selectedBloodGroup ? 'text-slate-800' : 'text-slate-400'}`}>
                    {selectedBloodGroup || "নির্বাচন করুন"}
                  </span>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${isSelectOpen ? 'rotate-180 text-red-500' : ''}`} />
                </div>

                <AnimatePresence>
                  {isSelectOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute z-[100] w-full bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-2xl p-2 grid grid-cols-4 gap-2"
                    >
                      {bloodGroups.map((bg) => (
                        <div
                          key={bg}
                          onClick={() => {
                            setValue("bloodGroup", bg);
                            setIsSelectOpen(false);
                            trigger("bloodGroup");
                          }}
                          className={`h-11 flex items-center justify-center rounded-xl text-xs font-black transition-all cursor-pointer border-2
                            ${selectedBloodGroup === bg 
                              ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-200' 
                              : 'bg-slate-50 border-transparent text-slate-500 hover:bg-red-50 hover:text-red-500'}`}
                        >
                          {bg}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <input type="hidden" {...register("bloodGroup", { required: "রক্তের গ্রুপ নির্বাচন করুন" })} />
                {errors.bloodGroup && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.bloodGroup.message}</p>}
              </div>

              {/* address */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">বর্তমান ঠিকানা*</label>
                <input 
                  {...register("address", { required: "ঠিকানা প্রয়োজন" })} 
                  placeholder="উদা: মিরপুর, ঢাকা" 
                  className={`${inputClasses} ${errors.address ? 'border-red-500' : ''}`} 
                />
                {errors.address && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.address.message}</p>}
              </div>
            </div>

            {/* NID Number */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">এনআইডি নম্বর</label>
              <input 
                {...register("nidNumber")} 
                placeholder="এনআইডি নম্বর দিন" 
                className={`${inputClasses} ${errors.nidNumber ? 'border-red-500' : ''}`} 
              />
            </div>

            {/* NID File Upload */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">এনআইডি কপি</label>
              <div className={`relative border-2 border-dashed rounded-2xl p-4 hover:bg-slate-50 transition-all group ${errors.nidFront ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-red-200 shadow-sm'}`}>
                <input 
                  type="file" 
                  {...register("nidFront")} 
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white shadow-md rounded-xl flex items-center justify-center text-xl">📄</div>
                  <div>
                    <p className="text-xs font-bold text-slate-600">এনআইডি কার্ডের ছবি দিন</p>
                    <p className="text-[9px] text-slate-400 font-medium">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className={`flex items-start gap-3 p-4 rounded-2xl transition-all ${errors.agreement ? 'bg-red-100/50 border border-red-200' : 'bg-red-50/50 border border-red-50'}`}>
              <input type="checkbox" {...register("agreement", { required: true })} className="mt-1 w-4 h-4 accent-red-600 cursor-pointer" />
              <p className="text-[10px] text-red-800 font-bold leading-relaxed">
                আমি নিশ্চিত করছি যে আমি স্বেচ্ছায় রক্তদান করতে আগ্রহী এবং সকল তথ্য সঠিক।
              </p>
            </div>

            <button 
              type="submit"
              className={`${donorRegister.isPending || loading ? "cursor-not-allowed" : "cursor-pointer"} relative w-full bg-slate-900 text-white py-4.5 rounded-2xl font-black text-base shadow-xl shadow-slate-200 hover:bg-black active:scale-[0.98] transition-all disabled:bg-slate-300 disabled:cursor-not-allowed overflow-hidden group`}
            >
              <div className="flex items-center justify-center gap-3 relative z-10">
                {(donorRegister.isPending || loading) ? <LoadingSvg/> : <Sparkles size={18} className="text-red-500" />}
                <span>
                  {donorRegister.isPending || loading ? "প্রসেসিং হচ্ছে..." : "নিবন্ধন অনুরোধ পাঠান"}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}