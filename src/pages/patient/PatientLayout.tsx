import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
const othersMenu = [
  { link: "user/requests", name: "রক্তের আবেদন" }
]
export default function PatientLayout() {
  return (
    <div className="mx-auto rounded shadow">
        <Navbar
        title="রক্ত বীর"
        othersMenu={othersMenu}
        />
      <div className="p-6">
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}
