import { Routes, Route, Navigate } from "react-router-dom"
import PublicHome from "./pages/public/Home"
import DonorLayout from "./pages/donor/DonorLayout"
import Requests from "./pages/blood-requests/CreateRequest"

import AdminLayout from "./pages/admin/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
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

import SupportPage from "./pages/support/Support"
import { useEffect } from "react"
import Profile from "./pages/user/Profile"
import { ProtectedRoute } from "./components/ProtectedRoute"
import UserLayout from "./pages/user/UserLayout"
import UserDashboard from "./pages/user/UserDashboard"
import BloodLayout from "./pages/blood-requests/BloodLayout"
import PublicRequests from "./pages/blood-requests/AllBloodRequest"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authStore"

export default function App() {
 const pathname = location.pathname
  useEffect(() => {
    const checkDonor = async () => {
      const flag = localStorage.getItem("donor_registered");

      // যদি flag নাই তাহলে কিছুই করবে না
      if (!flag) return;

      // 🔒 Lock system (prevent multiple refreshUser calls)
      const lock = localStorage.getItem("donor_registered_lock");
      if (lock === "true") return;

      // lock set
      localStorage.setItem("donor_registered_lock", "true");

      try {
        await useAuthStore.getState().refreshUser();

        const user = useAuthStore.getState().user;

        if (user?.role === "donor") {
          localStorage.removeItem("donor_registered");
          localStorage.removeItem("donor_registered_lock");

          useAuthStore.getState().setAuth(null, null);
          window.location.replace("/auth/login");
        } else {
          // user donor না হলে lock remove করে দিবে
          localStorage.removeItem("donor_registered_lock");
        }
      } catch (err) {
        // refresh fail হলে lock remove করে দিবে
        localStorage.removeItem("donor_registered_lock");
      }
    };

    checkDonor();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);
  return (
    <>
    <Toaster position="top-center"/>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<PublicHome />} />
        </Route>

        {/* donor search */}
        <Route path="/donor/search" element={<SearchLayout />}>
          <Route index path="" element={<DonorSearch />} />
        </Route>

        {/* profile */}
        <Route />

        {/* authentication */}
        <Route path="/auth/login" element={<AuthPage />}></Route>

        {/* donor */}
        <Route path="/donor" element={
            <DonorLayout />
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ProtectedRoute role={["admin", "donor"]}><DonorDashboard /></ProtectedRoute>} />
          <Route path="be-donor" element={<ProtectedRoute role={["user", "admin"]}><DonorRegistration /></ProtectedRoute>} />
        </Route>

        {/* admin route */}
        <Route path="/admin" element={
          <AdminLayout />
        }>
            
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="requests" element={<Requests />} />
        </Route>

        {/* blood request */}
        <Route path="/blood" element={<BloodLayout/>}
        >
          <Route index element={<Navigate to="request" replace />} />
          {/* private */}
            <Route path="request" element={<ProtectedRoute role={["user", "admin", "donor"]}><Requests /></ProtectedRoute>} />
          <Route path="public-requests" element={<PublicRequests/>} />
        </Route>

        {/* profile */}


        {/* user route */}
        <Route path="/home" element={
          <ProtectedRoute role={["user", "admin", "donor"]}>
            <UserLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={ <ProtectedRoute role={["user", "admin", "donor"]}><Profile/></ProtectedRoute>}/>
        </Route>

        {/* about */}
        <Route path="/about" element={<AboutLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<AboutPage/>} />
        </Route>
        {/* support */}
        <Route path="/support" element={<SupportPage />} />
        {/* Notfound */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  )
}

