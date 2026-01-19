import { NavLink } from "react-router-dom"
type PropTypes = {
  home: string
  requests: string
  history: string
  profile: string
}
export default function TabBar({home, requests, history, profile}: PropTypes) {
  const tabClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-primary border-b-2 border-primary pb-1"
      : "text-gray-600"

  return (
    <div className="bg-white px-6 py-4 flex gap-6 border-b">
      <NavLink to={home} className={tabClass}>Home</NavLink>
      <NavLink to={requests} className={tabClass}>Requests</NavLink>
      <NavLink to={history} className={tabClass}>History</NavLink>
      <NavLink to={profile} className={tabClass}>Profile</NavLink>
    </div>
  )
}
