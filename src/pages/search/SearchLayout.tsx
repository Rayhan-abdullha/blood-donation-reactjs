import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
const menus = [
    { link: "donor/search", name: "রক্ত খুঁজুন" },
    { link: "user/requests", name: "রক্তের আবেদন" }
]

export default function SearchLayout() {
  return (
    <div className="mx-auto shadow rounded">
      <Navbar
        title="রক্ত বীর"
        othersMenu={menus}
        isMainMenu={false}
      />
      <div className="">
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}
