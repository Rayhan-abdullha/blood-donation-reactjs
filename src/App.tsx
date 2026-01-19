import { Routes, Route, Navigate } from "react-router-dom"
import PublicHome from "./pages/public/Home"
import DonorLayout from "./pages/donor/DonorLayout"
import Requests from "./pages/donor/CreateRequest"
import History from "./pages/donor/History"
import Profile from "./pages/donor/Profile"

import AdminLayout from "./pages/admin/AdminLayout"
import PatientLayout from "./pages/patient/PatientLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import PatientDashboard from "./pages/patient/PatientDashboard"
import PublicLayout from "./pages/public/PublicLayout"
import DonorDashboard from "./pages/donor/DonorDashboard"
import AuthPage from "./pages/auth/Auth"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<PublicHome />} />
      </Route>
      <Route path="/auth/login" element={<AuthPage />}></Route>
      <Route path="/donor" element={<DonorLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<DonorDashboard />} />
        <Route path="requests" element={<Requests />} />
        <Route path="history" element={<History/>} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<AdminDashboard/>} />
        <Route path="requests" element={<Requests />} />
        <Route path="history" element={<History/>} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/patient" element={<PatientLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<PatientDashboard />} />
        <Route path="requests" element={<Requests />} />
        <Route path="history" element={<History/>} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
