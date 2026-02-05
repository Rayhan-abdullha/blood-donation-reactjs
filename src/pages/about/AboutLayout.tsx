import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function AboutLayout() {
  return (
    <div className="mx-auto rounded shadow">
        <Navbar
        title="রক্ত বীর"
        isMainMenu={false}
        />
      <div className="">
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}
