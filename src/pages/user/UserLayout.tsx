import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import StickyMenu from "../../components/StickyMenu"
export default function UserLayout() {
  return (
    <div className="mx-auto rounded shadow">
        <Navbar
        title="রক্ত বীর"
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
