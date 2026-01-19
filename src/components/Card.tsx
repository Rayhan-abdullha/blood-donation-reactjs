import type { ReactNode } from "react"

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      {children}
    </div>
  )
}
