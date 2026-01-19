export default function Profile() {
  // Mock data - replace with your actual state/props
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "01700-000000",
    bloodGroup: "A+",
    status: "Available",
    role: "user", // options: donor, patient, admin, user
  };

  const inputClasses = "w-full px-4 py-2.5 bg-gray-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">আমার প্রোফাইল (My Profile)</h2>
        </div>
        <div className="flex gap-2">
           <span className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm ${
             user.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
           }`}>
             ● {user.status}
           </span>
           <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-red-100 text-red-700 shadow-sm uppercase">
             {user.role}
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
              <span className="p-2 bg-red-50 rounded-lg">👤</span> ব্যক্তিগত তথ্য (Personal Info)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-600 ml-1">পূর্ণ নাম (Full Name)</label>
                <input type="text" defaultValue={user.name} className={inputClasses} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-600 ml-1">রক্তের গ্রুপ (Blood Group)</label>
                <select className={inputClasses} defaultValue={user.bloodGroup}>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-600 ml-1">ইমেইল (Email)</label>
                <input type="email" defaultValue={user.email} className={inputClasses} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-600 ml-1">ফোন নম্বর (Phone)</label>
                <input type="text" defaultValue={user.phone} className={inputClasses} />
              </div>
            </div>
            
            <button className="mt-6 bg-gray-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-black transition-all active:scale-95">
              Update Profile
            </button>
          </div>

          {/* Security Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
              <span className="p-2 bg-blue-50 rounded-lg">🔒</span> নিরাপত্তা (Security)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="password" placeholder="New Password" className={inputClasses} />
              <input type="password" placeholder="Confirm Password" className={inputClasses} />
            </div>
            <button className="mt-4 text-blue-600 font-semibold hover:underline text-sm">Change Password</button>
          </div>
        </div>

        {/* Right Column: Role Actions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-500 to-rose-600 p-6 rounded-3xl text-white shadow-lg shadow-red-200">
            <h3 className="text-xl font-bold mb-2">Account Status</h3>
            <p className="text-red-100 text-sm mb-6">You are currently registered as a <strong className="text-white uppercase">{user.role}</strong>.</p>
            
            {user.role === "user" && (
              <div className="space-y-3">
                <button className="w-full bg-white text-red-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                  🩸 Become a Donor
                </button>
                <button className="w-full bg-red-400/30 border border-red-300 text-white py-3 rounded-xl font-bold hover:bg-red-400/40 transition-all">
                  🏥 Request Blood (Patient)
                </button>
              </div>
            )}

            {user.role === "donor" && (
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <p className="text-sm text-center font-medium italic">Thank you for being a Hero! ❤️</p>
              </div>
            )}
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
            <h4 className="font-bold text-amber-800 mb-2">Notice</h4>
            <p className="text-sm text-amber-700 leading-relaxed">
              Updating your blood group requires admin verification for safety purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}