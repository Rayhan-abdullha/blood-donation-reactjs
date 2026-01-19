import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
const menus = [
    { link: "home", name: "Home" },
    { link: "patient/requests", name: "Blood-Request" },
    { link: "donor", name: "Be a Donor" },
    { link: "patient", name: "Be a Patient" },
    { link: "admin", name: "Admin" },
    { link: "auth/login", name: "Login" }
  ]
export default function PublicLayout() {
  return (
    <div className="max-w-auto mx-auto mt-6 bg-gray-50 rounded shadow">
      <Navbar
        title="রক্ত বীর"
        menus={menus}
        user="Rayhan"
      />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  )
}
