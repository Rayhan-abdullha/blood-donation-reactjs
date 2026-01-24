import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import CoffeeModal from "../../components/CoffeeModal"
const menus = [
    { link: "home", name: "হোম" },
    { link: "donor", name: "দানকারী" },
    { link: "patient", name: "রোগী" },
    { link: "admin", name: "অ্যাডমিন" },
    { link: "about", name: "আমাদের সম্পর্কে" },
    { link: "auth/login", name: "লগইন" },
];

export default function PublicLayout() {
  return (
    <div className="max-w-auto mx-auto bg-gray-50 rounded shadow">
      <Navbar
        title="রক্ত বীর"
        menus={menus}
        user="Rayhan"
        isMainMenu={true}
        searchBar={true}
      />
      <div className="">
        <Outlet />
      </div>
      <CoffeeModal/>
      <Footer/>
    </div>
  )
}
