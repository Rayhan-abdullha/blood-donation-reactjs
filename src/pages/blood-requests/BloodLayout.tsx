import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function BloodLayout() {
  
  return (
    <div className="max-w-auto mx-auto bg-gray-50 rounded shadow">
      <Navbar
        title="রক্ত বীর"
        searchBar={true}
        isMainMenu={false}
      />
      <div className="mt-15">
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}
