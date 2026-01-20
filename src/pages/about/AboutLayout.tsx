import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
const menus = [
    { link: "patient/home", name: "Home" },
    { link: "patient/requests", name: "Requests" }
  ]
export default function AboutLayout() {
  return (
    <div className="max-w-6xl mx-auto mt-6 rounded shadow">
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
