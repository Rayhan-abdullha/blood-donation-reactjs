import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import BackHome from "../../components/BackHome"
const menus = [
    { link: "patient/home", name: "Home" },
    { link: "patient/history", name: "History" },
    { link: "patient/requests", name: "Requests" },
    { link: "patient/profile", name: "Profile" },
  ]
export default function PatientLayout() {
  return (
    <div className="max-w-6xl mx-auto mt-6 rounded shadow">
        <BackHome className="mb-3"/>
        <Navbar
          title="Patient Dashboard"
          menus={menus}
          user="Rayhan"
        />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  )
}
