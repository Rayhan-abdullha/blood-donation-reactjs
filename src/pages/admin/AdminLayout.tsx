import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
const menus = [
    { link: "admin/home", name: "Home" },
    { link: "admin/history", name: "History" },
    { link: "admin/requests", name: "Requests" },
    { link: "admin/profile", name: "Profile" },
  ]
export default function AdminLayout() {
  return (
    <div className="max-w-6xl mx-auto mt-6 bg-gray-50 rounded shadow">
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
