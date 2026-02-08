import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import StickyMenu from "../../components/StickyMenu"
const othersMenu = [
  { link: "blood/request", name: "রক্তের আবেদন" }
]
export default function UserLayout() {
  return (
    <div className="mx-auto rounded shadow">
        <Navbar
        title="রক্ত বীর"
        othersMenu={othersMenu}
        isMainMenu={false}
        />
      <div className="">
        <Outlet />
      </div>
        <StickyMenu/>
      <Footer/>
    </div>
  )
}
