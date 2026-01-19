// import { NavLink } from "react-router-dom"

import { Link, NavLink } from "react-router-dom"

interface Props {
  title: string
  menus: Array<{ link: string, name: string }>
  user: string
}

export default function Navbar({ title, menus, user }: Props) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-white border-b-2 border-white pb-1"
      : "text-white/80 hover:text-white"

  return (
    <>
      <div className="bg-primary text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
        <h1 className="font-semibold text-lg flex items-center gap-2">
          <Link to="/">{title}</Link>
        </h1>
        <div className="flex items-center gap-2">
          <span>Hello, {user}</span>
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full border"
          />
        </div>
      </div>

      <div className="bg-black px-6 py-3 flex gap-6 border-b">
        {
          menus.map((item: { link: string, name: string }, id: number) => (
            <NavLink key={id} to={`/${item.link.toLowerCase()}`} className={linkClass}>{item.name}</NavLink>
          ))
        }
      </div>
    </>
  )
}
