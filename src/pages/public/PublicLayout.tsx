import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
const menus = [
    { link: "home", name: "Home" },
    { link: "patient/requests", name: "Blood-Request" },
    { link: "donor/form", name: "Be a Donor" },
    { link: "donor", name: "Donor" },
    { link: "patient", name: "Patient" },
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
        isMainMenu={true}
      />
      <div className="">
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}
