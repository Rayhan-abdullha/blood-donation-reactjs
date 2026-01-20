import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import { Outlet } from "react-router-dom"
const menus = [
    { link: "admin/home", name: "Home" },
    { link: "admin/profile", name: "Profile" },
  ]
export default function AdminLayout() {
  return (
    <div className="max-w-6xl mx-auto mt-6 bg-gray-50 rounded shadow">
      <Navbar
        title="রক্ত বীর"
        menus={menus}
        user="Rayhan"
      />
      <div className="p-6">
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}
