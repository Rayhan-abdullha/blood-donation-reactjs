import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
const menus = [
    { link: "patient/home", name: "Home" },
  { link: "patient/requests", name: "Requests" }
  ]
export default function PatientLayout() {
  return (
    <div className="mx-auto rounded shadow">
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
