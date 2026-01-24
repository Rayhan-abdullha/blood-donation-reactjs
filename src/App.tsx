import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import PublicHome from "./pages/public/Home"
import DonorLayout from "./pages/donor/DonorLayout"
import Requests from "./pages/patient/CreateRequest"

import AdminLayout from "./pages/admin/AdminLayout"
import PatientLayout from "./pages/patient/PatientLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import PatientDashboard from "./pages/patient/PatientDashboard"
import PublicLayout from "./pages/public/PublicLayout"
import DonorDashboard from "./pages/donor/DonorDashboard"
import AuthPage from "./pages/auth/Auth"
import './App.css';
import DonorRegistration from "./pages/donor/DonorRegisterForm"
import AboutLayout from "./pages/about/AboutLayout"
import AboutPage from "./pages/about/About"
import NotFound from "./components/Notfound"
import DonorSearch from "./pages/search/Search"
// import OneSignal from 'react-onesignal';
// import { useEffect } from "react"
import SearchLayout from "./pages/search/SearchLayout"
import DonorDetails from "./pages/donor/DonorDetails"

import ImageUpload from "./components/ImgUpload"
import SupportPage from "./pages/support/Support"
import { useEffect } from "react"
import Profile from "./pages/donor/Profile"
export interface IOneSignalOneSignal {
  // ...other properties...
  isInitialized: boolean;
}
// ১. কম্পোনেন্টের বাইরে একটি ফ্ল্যাগ ভেরিয়েবল রাখুন
// let isOneSignalInitialized = false;
export default function App() {
  // console.log('hello routes')
  
  // useEffect(() => {
  //   const initOneSignal = async () => {
  //     // ২. যদি আগে থেকেই ইনিশিয়ালাইজড থাকে বা কাজ শুরু হয়ে থাকে তবে ফিরে যান
  //     if (isOneSignalInitialized) return;
  //     isOneSignalInitialized = true;

  //     try {
  //       await OneSignal.init({
  //         appId: "00187e74-3cf4-4ca4-ac6e-7a8fadabb41e",
  //         allowLocalhostAsSecureOrigin: true,
  //       });

  //       console.log("OneSignal Initialized");

  //       OneSignal.Notifications.addEventListener("click", (event) => {
  //       const actionId = event.result.actionId; // কোন বাটনে ক্লিক করেছে তা এখানে পাওয়া যাবে
  //       const additionalData: any = event.notification.additionalData; // ব্যাকএন্ড থেকে পাঠানো 'data'
  //       if (actionId === "accept_id") {
  //         console.log("ইউজার রক্ত দিতে রাজি হয়েছে!");
  //         // এখানে আপনি আপনার ব্যাকএন্ডে একটি এপিআই কল করতে পারেন (যেমন: /api/accept-request)
  //       } else if (actionId === "view_location") {
  //         console.log("ম্যাপ ওপেন করা হচ্ছে...");
  //         // ইউজারকে সরাসরি ম্যাপ পেজে পাঠিয়ে দিন
  //         window.location.href = "/map?request_id=" + additionalData.request_id;
  //       } else {
  //         console.log("ইউজার সাধারণ নোটিফিকেশনে ক্লিক করেছে");
  //       }
  //     });
              
  //       // ৩. প্রম্পট দেখান
  //       await OneSignal.Slidedown.promptPush();

  //     } catch (err) {
  //       console.error("OneSignal error:", err);
  //     }
  //   };
  //   initOneSignal();
  //   // ইউজারের PlayerID বা External ID পাওয়ার পদ্ধতি
  //   OneSignal.User.PushSubscription.addEventListener("change", (event) => {
  //     if (event.current.id) {
  //       console.log("OneSignal Player ID:", event.current.id);
  //       // এই ID-টি আপনার Golang ব্যাকএন্ডে পাঠিয়ে দিন ডাটাবেজে সেভ করার জন্য
  //     }
  //   });

  // }, []);

    const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // smooth scrolling
    });
  }, [pathname]); // runs every time the path changes
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<PublicHome />} />
        <Route path="home/profile" element={ <Profile/>}/>
      </Route>

      {/* donor search */}
      <Route path="/donor/search" element={<SearchLayout />}>
        <Route index path="" element={<DonorSearch />} />
      </Route>

      {/* profile */}
      <Route />

      {/* authentication */}
      <Route path="/auth/login" element={<AuthPage />}></Route>
      <Route path="/donor" element={<DonorLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<DonorDashboard />} />
        <Route path="requests" element={<Requests />} />
        <Route path="form" element={<DonorRegistration />} />
      </Route>
      <Route path="/donor/details/:id" element={<DonorDetails />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<AdminDashboard/>} />
        <Route path="requests" element={<Requests />} />
      </Route>
      <Route path="/patient" element={<PatientLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<PatientDashboard />} />
        <Route path="requests" element={<Requests />} />
      </Route>
      <Route path="/about" element={<AboutLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<AboutPage/>} />
      </Route>
      {/* support */}
      <Route path="/support" element={<SupportPage />} />

      {/* upload images */}
      <Route path="/api/images" element={<ImageUpload/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}

