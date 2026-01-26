import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthActions } from "../../hooks/useAuth"; // আপনার হুক অনুযায়ী
import { toast } from "react-hot-toast";
import axios from "axios";
import { apiKey } from "../../config/config";
import LoadingSvg from "../../components/LoadingSvg";

type DonorRequestForm = {
  bloodGroup: string;
  address: string;
  nidNumber: string;
  nidFront: FileList;
  profilePic: FileList;
  agreement: boolean;
};

export default function DonorRegistration() {
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<DonorRequestForm>();
  const { donorRegister } = useAuthActions(); // ধরলাম আপনার হুকে donorRegister মিউটেশন আছে

  const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  
  try {
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
    return response.data.data.url; // এটিই আপনার ইমেজের ডাইরেক্ট লিঙ্ক
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};
  const onSubmit = async (data: DonorRequestForm) => {
    setLoading(true);
    if (!data.bloodGroup || !data.address) {
      toast.error("ব্লাড গ্রুপ এবং লোকেশন প্রয়োজনীয়!");
      setLoading(false);
      return;
    }
    let profilePicUrl = null;
    if (data.profilePic[0]) {
      toast.loading("প্রোফাইল ইমেজ আপলোড হচ্ছে...");
       profilePicUrl = await uploadImage(data.profilePic[0]);
      if (!profilePicUrl) {
        toast.dismiss();
        toast.error("ইমেজ আপলোড ব্যর্থ হয়েছে!");
      setLoading(false);
        return;
      } else {
        toast.dismiss();
        toast.success("ইমেজ আপলোড সফল হয়েছে!");
      }
    }
    let nidFrontUrl = null;
    if (data.nidFront[0]) {
      toast.loading("Nid ইমেজ আপলোড হচ্ছে...");
      nidFrontUrl = await uploadImage(data.nidFront[0]);
      if (!nidFrontUrl) {
        toast.dismiss();
        toast.error("ইমেজ আপলোড ব্যর্থ হয়েছে! try...");
        setLoading(false);
        return;
      } else {
        toast.dismiss();
        toast.success("ইমেজ আপলোড সফল হয়েছে!");
      }
    }
  
    if (!profilePicUrl) {
      toast.error("সব প্রয়োজনীয় ফিল্ড পূরণ করুন!");
      setLoading(false);
      return;
    }
    // ৩. এখন সব ডাটা এবং ইমেজের লিঙ্কগুলো আপনার ব্যাকএন্ডে পাঠান
    const finalData = {
      address: data.address,
      blood_group: data.bloodGroup,
      nid: data.nidNumber,
      pic: profilePicUrl, // ফাইলের বদলে এখন লিঙ্ক যাচ্ছে
      nid_pic: nidFrontUrl      // ফাইলের বদলে এখন লিঙ্ক যাচ্ছে
    };

    donorRegister.mutate(finalData);
    setLoading(false)
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16 mt-5">
      <div className="w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-white overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Sidebar Info */}
        <div className="md:w-1/3 bg-slate-900 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-2xl mb-6">❤️</div>
            <h2 className="text-2xl font-black leading-tight">রক্তদাতা হিসেবে নিবন্ধন করুন</h2>
            <p className="text-slate-400 text-sm mt-4 leading-relaxed">
              আপনার তথ্যগুলো আমাদের সুরক্ষিত সার্ভারে সংরক্ষিত থাকবে।
            </p>
          </div>
          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
              <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-red-500">✓</span>
              এনআইডি ভেরিফিকেশন
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:w-2/3 p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className={`w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed flex items-center justify-center overflow-hidden transition-all ${errors.profilePic ? 'border-red-500' : 'border-slate-300 group-hover:border-red-400'}`}>
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">📷</span>
                  )}
                </div>
                <input 
                  type="file" 
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  {...register("profilePic", { 
                    required: "প্রোফাইল ছবি প্রয়োজন", 
                    onChange: handleImgPreview 
                  })}
                />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest">আপনার ছবি (Required)*</p>
              {errors.profilePic && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.profilePic.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Blood Group */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">রক্তের গ্রুপ*</label>
                <select 
                  {...register("bloodGroup", { required: "রক্তের গ্রুপ নির্বাচন করুন" })} 
                  className={`${inputClasses} ${errors.bloodGroup ? 'border-red-500' : ''}`}
                >
                  <option value="">নির্বাচন করুন</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
                {errors.bloodGroup && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.bloodGroup.message}</p>}
              </div>

              {/* address */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">বর্তমান ঠিকানা*</label>
                <input 
                  {...register("address", { required: "ঠিকানা প্রয়োজন" })} 
                  placeholder="উদা: মিরপুর, ঢাকা" 
                  className={`${inputClasses} ${errors.address ? 'border-red-500' : ''}`} 
                />
                {errors.address && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.address.message}</p>}
              </div>
            </div>

            {/* NID Number */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">এনআইডি নম্বর</label>
              <input 
                {...register("nidNumber")} 
                placeholder="এনআইডি নম্বর দিন" 
                className={`${inputClasses} ${errors.nidNumber ? 'border-red-500' : ''}`} 
              />
              {/* {errors.nidNumber && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.nidNumber.message}</p>} */}
            </div>

            {/* NID File Upload */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">এনআইডি কপি</label>
              <div className={`relative border-2 border-dashed rounded-2xl p-4 hover:bg-slate-50 transition-colors group ${errors.nidFront ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}>
                <input 
                  type="file" 
                  {...register("nidFront")} 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white shadow-sm rounded-xl flex items-center justify-center text-xl">📄</div>
                  <div>
                    <p className="text-sm font-bold text-slate-600">এনআইডি কার্ডের ছবি দিন</p>
                    {/* {errors.nidFront && <p className="text-[10px] text-red-500 font-bold">{errors.nidFront.message}</p>} */}
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className={`flex items-start gap-3 p-4 rounded-2xl transition-all ${errors.agreement ? 'bg-red-100 border border-red-200' : 'bg-red-50'}`}>
              <input type="checkbox" {...register("agreement", { required: true })} className="mt-1 accent-red-600" />
              <p className="text-[11px] text-red-800 font-medium leading-relaxed">
                আমি নিশ্চিত করছি যে আমি স্বেচ্ছায় রক্তদান করতে আগ্রহী এবং সকল তথ্য সঠিক।
              </p>
            </div>
            <button 
              type="submit"
              disabled={donorRegister.isPending || loading}
              className="cursor-pointer relative w-full bg-red-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-red-200 hover:bg-red-700 active:scale-95 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed overflow-hidden group"
            >
              <div className="flex items-center justify-center gap-3">
                {(donorRegister.isPending || loading) && (
                  <LoadingSvg/>
                )}
                
                <span>
                  {donorRegister.isPending || loading ? "প্রসেসিং হচ্ছে..." : "নিবন্ধন অনুরোধ পাঠান"}
                </span>
              </div>

              {/* Button Shine Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}