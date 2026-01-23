import { useState, useEffect } from 'react';
import MapSection from './Map';

const DonorSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<null | {latitude: number, longitude: number}>(null);
  const [loading, setLoading] = useState(false);
  const [_, setError] = useState<string | null>(null);
  const [allDonors, setAllDonors] = useState<any[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<any[]>([]);
  const [maxDistance, setMaxDistance] = useState(500);

  // Haversine Logic (Same as yours)
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  
  useEffect(() => {
    const sampleDonors = [
      { id: 1, name: "Rahim Khan", bloodGroup: "O+", latitude: 23.8103, longitude: 90.4125, phone: "01711-123456" },
      { id: 2, name: "Karim Hossain", bloodGroup: "A+", latitude: 23.6850, longitude: 90.3563, phone: "01819-987654" },
      { id: 3, name: "Sadia Akter", bloodGroup: "B-", latitude: 23.8700, longitude: 90.4000, phone: "01912-345678" },
      { id: 4, name: "Faruk Ahmed", bloodGroup: "AB+", latitude: 24.0000, longitude: 90.3000, phone: "01678-901234" },
      { id: 5, name: "Nusrat Jahan", bloodGroup: "O-", latitude: 23.7500, longitude: 90.3800, phone: "01755-667788" },
      { id: 6, name: "Asif Iqbal", bloodGroup: "A-", latitude: 23.7800, longitude: 90.4200, phone: "01817-112233" },
      { id: 7, name: "Rina Begum", bloodGroup: "O+", latitude: 23.8200, longitude: 90.4100, phone: "01933-445566" },
    ];
    setAllDonors(sampleDonors);
    getUserLocation(); // Auto-fetch on mount
  }, []);

  const getUserLocation = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError("আপনার ব্রাউজার লোকেশন সাপোর্ট করে না।");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setLoading(false);
      },
      () => {
        setError("লোকেশন এক্সেস পাওয়া যায়নি। অনুগ্রহ করে পারমিশন দিন।");
        setLoading(false);
      }
    );
  };

    useEffect(() => {
  if (!userLocation) return;
  
  let result = [...allDonors]; // কপি তৈরি করুন

  // সার্চ কুয়েরি ফিল্টার
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    result = result.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.bloodGroup.toLowerCase().includes(q)
    );
  }

  // দূরত্ব ক্যালকুলেশন এবং ফিল্টার
  result = result.map(d => {
    const dist = getDistance(userLocation.latitude, userLocation.longitude, d.latitude, d.longitude);
    return { ...d, distance: dist.toFixed(1) };
  }).filter(d => Number(d.distance) <= maxDistance); // এখানে নিশ্চিত করুন Number হিসেবে চেক হচ্ছে

  setFilteredDonors(result);
}, [searchQuery, userLocation, maxDistance, allDonors]);
  return (
  <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
    <div className="max-w-6xl mx-auto">
      
      {/* ১. হেডার সেকশন */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">
          নিকটস্থ রক্তদাতা <span className="text-red-600 underline underline-offset-8">খুঁজুন</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ২. বাম পাশ: সার্চ ফিল্টার (এটি সবসময় দৃশ্যমান থাকবে) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white sticky top-24 z-10">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-red-500">🔍</span> সার্চ ফিল্টার
            </h3>
            
            {/* সার্চ ইনপুট */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">নাম বা রক্তের গ্রুপ</label>
                <input
                  type="text"
                  placeholder="উদা: O+ বা রহিম"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full mt-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all"
                />
              </div>

              {/* ডিসটেন্স স্লাইডার */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">দূরত্ব (ব্যাসার্ধ)</label>
                  <span className="text-red-600 font-black text-lg">{maxDistance} কিমি</span>
                </div>
                <input
                  type="range" min="1" max="1000" step="10"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              <button 
                onClick={getUserLocation}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-black transition-all"
              >
                📍 লোকেশন আপডেট করুন
              </button>
            </div>
          </div>
        </div>

        {/* ৩. ডান পাশ: ম্যাপ এবং ডোনার লিস্ট */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* ম্যাপ সেকশন (লোকেশন পাওয়া গেলে দেখাবে) */}
          {userLocation ? (
            <div className="w-full">
              <h3 className="text-xl font-bold text-slate-800 ml-4 mb-4">📍 লাইভ ম্যাপ ভিউ</h3>
              <MapSection userLocation={userLocation} donors={filteredDonors} />
            </div>
          ) : (
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 text-blue-600 font-bold text-center">
              ম্যাপ দেখতে আপনার লোকেশন পারমিশন দিন।
            </div>
          )}

          {/* ডোনার লিস্ট সেকশন */}
          <div className="space-y-4">
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest px-4">
              {filteredDonors.length} জন রক্তদাতা পাওয়া গেছে
            </p>
            
            {loading ? (
              <p className="text-center py-10">লোডিং...</p>
            ) : (
              filteredDonors.map((donor) => (
                <div key={donor.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex justify-between items-center">
                  <div>
                    <h4 className="text-xl font-black text-slate-800">{donor.name}</h4>
                    <p className="text-red-600 font-bold">{donor.bloodGroup} | {donor.distance} km away</p>
                  </div>
                  <a href={`tel:${donor.phone}`} className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold">কল</a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
};

export default DonorSearch;