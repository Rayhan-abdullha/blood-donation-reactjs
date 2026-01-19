import React, { useState } from "react";
import { useForm } from "react-hook-form";

type DonorRequestForm = {
  bloodGroup: string;
  location: string;
  nidNumber: string;
  nidFront: FileList;
  profilePic: FileList;
  agreement: boolean;
};

export default function DonorRegistration() {
  const [preview, setPreview] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<DonorRequestForm>();

  const onSubmit = (data: DonorRequestForm) => {
    console.log("Donor Application:", data);
    // Here you would typically use FormData to upload files to your server
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-white overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Sidebar Info (Visual Trust) */}
        <div className="md:w-1/3 bg-slate-900 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-2xl mb-6">❤️</div>
            <h2 className="text-2xl font-black leading-tight">রক্তদাতা হিসেবে নিবন্ধন করুন</h2>
            <p className="text-slate-400 text-sm mt-4 leading-relaxed">
              আপনার তথ্যগুলো আমাদের সুরক্ষিত সার্ভারে সংরক্ষিত থাকবে এবং শুধুমাত্র ভেরিফিকেশনের জন্য ব্যবহৃত হবে।
            </p>
          </div>
          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
              <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-red-500">✓</span>
              এনআইডি ভেরিফিকেশন
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
              <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-red-500">✓</span>
              গোপনীয়তা রক্ষা
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:w-2/3 p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-red-400">
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
                  {...register("profilePic", { required: true, onChange: handleImgPreview })}
                />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest">আপনার ছবি (Profile Pic)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Blood Group */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">রক্তের গ্রুপ</label>
                <select {...register("bloodGroup", { required: true })} className={inputClasses}>
                  <option value="">নির্বাচন করুন</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">বর্তমান ঠিকানা</label>
                <input {...register("location", { required: true })} placeholder="উদা: মিরপুর, ঢাকা" className={inputClasses} />
              </div>
            </div>

            {/* NID Number */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">এনআইডি নম্বর (NID Number)</label>
              <input {...register("nidNumber", { required: true })} placeholder="আপনার এনআইডি কার্ডের নম্বর দিন" className={inputClasses} />
            </div>

            {/* NID File Upload */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">এনআইডি কপি (NID Card Copy)</label>
              <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-4 hover:bg-slate-50 transition-colors group">
                <input 
                  type="file" 
                  {...register("nidFront", { required: true })} 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white shadow-sm rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📄</div>
                  <div>
                    <p className="text-sm font-bold text-slate-600">এনআইডি কার্ডের ছবি আপলোড করুন</p>
                    <p className="text-[10px] text-slate-400 font-medium">PNG, JPG (Max 5MB)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-2xl">
              <input type="checkbox" {...register("agreement", { required: true })} className="mt-1 accent-red-600" />
              <p className="text-[11px] text-red-800 font-medium leading-relaxed">
                আমি নিশ্চিত করছি যে আমি স্বেচ্ছায় রক্তদান করতে আগ্রহী এবং উপরে প্রদত্ত সকল তথ্য সঠিক। আমার কোনো দীর্ঘস্থায়ী রোগ নেই।
              </p>
            </div>

            <button 
              type="submit"
              className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-red-200 hover:bg-red-700 active:scale-95 transition-all"
            >
              নিবন্ধন অনুরোধ পাঠান (Request to Join)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}