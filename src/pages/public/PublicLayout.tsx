import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import CoffeeModal from "../../components/CoffeeModal"
import StickyMenu from "../../components/StickyMenu"

export default function PublicLayout() {
  
  return (
    <div className="max-w-auto mx-auto bg-gray-50 rounded shadow">
      <Navbar
        title="রক্ত বীর"
        isMainMenu={true}
        searchBar={true}
      />
      <div className="">
        <Outlet />
      </div>
      <CoffeeModal />
       <StickyMenu/>
      <Footer/>
    </div>
  )
}
