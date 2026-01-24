import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
const menus = [
    { link: "about/home", name: "হোম" },
    { link: "patient/requests", name: "আমাদের সম্পর্কে" }
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
