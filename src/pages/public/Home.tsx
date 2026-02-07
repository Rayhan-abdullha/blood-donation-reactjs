import { useEffect, useState } from "react";
import DonorShow from "./DonorShow";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import ImpactState from "./ImpactState";
import Splash from "./Splash";
import useGetAllDonors from "../../hooks/useGetAlldonors";
export default function PublicHome() {
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Fetch real data from your hook
  const { data: donors, isLoading } = useGetAllDonors();
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleViewDetails = (donorData: any) => {
    setSelectedDonor(donorData);
    setIsModalOpen(true);
  };
//   const permission = OneSignal.Notifications.permission;

//   if (!permission) {
//     // ১. যদি ব্রাউজার থেকে ব্লক থাকে
//     alert("আপনি নোটিফিকেশন ব্লক করেছেন। ব্রাউজার সেটিংস (Lock Icon) থেকে এটি Allow করুন।");
//     await OneSignal.Notifications.requestPermission();
//     await OneSignal.User.PushSubscription.optIn();

//   } else {
//     // ২. যদি পারমিশন ডিফল্ট থাকে বা অপ্ট-আউট করা থাকে
//     await OneSignal.Notifications.requestPermission();
//     await OneSignal.User.PushSubscription.optIn();
    
//     // নতুন আইডি ডাটাবেসে আপডেট করে দিন
//     const newId = OneSignal.User.PushSubscription.id;
//     console.log(newId);
//   }
// };
  return (
    <>
      <Splash showSplash={showSplash} />
      <div className={`space-y-16 pb-20 transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <HeroSection />
        <ImpactState />   
        <DonorShow
          donors={donors?.data} 
          isLoading={isLoading}
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen} 
          selectedDonor={selectedDonor} 
          handleViewDetails={handleViewDetails}
        />

        <FeaturesSection />
      </div>
    </>
  );
}