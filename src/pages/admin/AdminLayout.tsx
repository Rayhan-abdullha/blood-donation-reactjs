import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import { Outlet } from "react-router-dom"
const menus = [
    { link: "admin/home", name: "হোম" },
    { link: "admin/requests", name: "রক্তের আবেদন" },
]
export default function AdminLayout() {
  return (
    <div className="mx-auto bg-gray-50 rounded shadow">
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
