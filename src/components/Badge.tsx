export default function Badge({
  text,
  color,
  className
}: {
  text: string
    color: "red" | "green" | "gray" | "blue" | "slate"
  className?: string
}) {
  const styles = {
    red: "text-red-600",
    green: "text-green-600",
    gray: "text-gray-600",
    blue: "text-blue-600",
    slate: "text-slate-600",
  }

  return <span className={`font-semibold ${styles[color]} ${className}`}>{text}</span>
}
