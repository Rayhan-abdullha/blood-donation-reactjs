import { useState, useEffect } from "react";
import Splash from "./Splash";
import FeaturesSection from "./FeaturesSection";
import DonorAvailibility from "./DonorAvailibility";
import ImpactState from "./ImpactState";
import HeroSection from "./HeroSection";

export default function PublicHome() {
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true); // State to control splash screen

  // Timer logic for Splash Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000); // 2 seconds duration
    return () => clearTimeout(timer);
  }, []);

  const handleViewDetails = (donorData: any) => {
    setSelectedDonor(donorData);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* 1. SPLASH SCREEN SECTION */}
      <Splash showSplash={showSplash} />
      {/* 2. MAIN WEBSITE CONTENT */}
      <div className={`space-y-16 pb-20 transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <HeroSection/>
        {/* IMPACT STATS */}
       <ImpactState/>
        {/* DONOR AVAILABILITY SECTION */}
        <DonorAvailibility isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedDonor={selectedDonor} handleViewDetails={handleViewDetails}/>
        {/* FEATURES SECTION */}
        <FeaturesSection />
      </div>
    </>
  )
}