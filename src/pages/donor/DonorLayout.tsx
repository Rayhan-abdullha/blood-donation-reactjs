import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
const menus = [
    { link: "donor/home", name: "হোম" },
    { link: "donor/requests", name: "রক্তের আবেদন" }
]

export default function DonorLayout() {
  return (
    <div className="mx-auto rounded shadow">
       <Navbar
          title="রক্ত বীর"
          menus={menus}
          user="Rayhan"
        />
      <div className="mt-5">
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}
