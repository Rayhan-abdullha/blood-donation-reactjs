import { useParams, Link } from "react-router-dom";

export default function DonorDetails() {
  const { id } = useParams();
  console.log(id)
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-red-600 font-bold mb-8 transition-colors">
          ← ফিরে যান (Back)
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          
          {/* ১. কভার এবং প্রোফাইল সেকশন */}
          <div className="relative h-44 bg-gradient-to-r from-red-600 to-rose-600">
            {/* প্রোফাইল পিকচার - কভারের ওপর ভাসমান */}
            <div className="absolute -bottom-12 left-8 p-1 bg-white rounded-[2rem] shadow-lg">
              <img 
                src="https://i.pravatar.cc/300" 
                alt="Donor" 
                className="w-28 h-28 rounded-[1.8rem] object-cover"
              />
              {/* অনলাইন ইন্ডিকেটর */}
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            </div>
          </div>

          <div className="px-8 pb-10 relative">
            {/* ব্লাড গ্রুপ ব্যাজ - ডান পাশে সরিয়ে আনা হয়েছে */}
            <div className="absolute -top-12 right-8 w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center border-4 border-slate-50">
               <span className="text-3xl font-black text-red-600">A+</span>
            </div>

            {/* নাম এবং স্ট্যাটাস */}
            <div className="pt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black text-slate-800">John Doe</h1>
                <p className="text-slate-400 flex items-center gap-1 font-medium">
                   <span className="text-red-500">📍</span> Dhaka, Bangladesh
                </p>
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-2xl border border-green-100">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                <span className="text-sm font-bold uppercase tracking-wider">রক্তদানের জন্য প্রস্তুত</span>
              </div>
            </div>

            <hr className="my-8 border-slate-100" />

            {/* ৩. আগের সেই বিস্তারিত তথ্য (যা আপনি রাখতে চেয়েছেন) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-800 border-l-4 border-red-500 pl-3">যোগাযোগের তথ্য</h3>
                <div className="space-y-4">
                  <InfoItem icon="📞" label="ফোন নম্বর" value="+880 17XX XXXXXX" />
                  <InfoItem icon="✉️" label="ইমেইল" value="donor@email.com" />
                  <InfoItem icon="🎂" label="বয়স" value="26 বছর" />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-800 border-l-4 border-blue-500 pl-3">রক্তদানের ইতিহাস</h3>
                <div className="space-y-4">
                  <InfoItem icon="🗓️" label="শেষ রক্তদান" value="১২ ডিসেম্বর, ২০২৫" />
                  <InfoItem icon="💉" label="মোট দান" value="০৫ বার" />
                  <InfoItem icon="🏥" label="পেশা" value="ছাত্র" />
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 flex gap-4">
              <button className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-700 shadow-lg shadow-red-200 transition-all">
                সরাসরি কল করুন
              </button>
              <button className="w-14 h-14 bg-slate-100 flex items-center justify-center rounded-2xl hover:bg-slate-200 transition-all text-2xl">
                💬
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component (আগের ডিজাইন অনুযায়ী)
function InfoItem({ icon, label, value }: { icon: string, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl group-hover:bg-red-50 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-slate-700 font-bold">{value}</p>
      </div>
    </div>
  );
}