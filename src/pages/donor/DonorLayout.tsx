import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
const menus = [
    { link: "donor/home", name: "Home" },
    { link: "donor/history", name: "History" },
    { link: "donor/requests", name: "Requests" },
    { link: "donor/profile", name: "Profile" },
  ]
export default function DonorLayout() {
  return (
    <div className="max-w-6xl mx-auto mt-6 rounded shadow">
       <Navbar
          title="Donor Dashboard"
          menus={menus}
          user="Rayhan"
        />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  )
}
