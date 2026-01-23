import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
const menus = [
    { link: "patient/home", name: "Home" },
    { link: "patient/requests", name: "Blood-Requests" }
  ]
export default function AboutLayout() {
  return (
    <div className="mx-auto rounded shadow">
        <Navbar
        title="রক্ত বীর"
        menus={menus}
        user="Rayhan"
        />
      <div className="">
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}
