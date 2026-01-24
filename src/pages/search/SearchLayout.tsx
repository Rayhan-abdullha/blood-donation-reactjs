import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
const menus = [
    { link: "home", name: "Home" },
    { link: "patient/requests", name: "Blood-Request" }
  ]
export default function SearchLayout() {
  return (
    <div className="mx-auto shadow rounded">
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
