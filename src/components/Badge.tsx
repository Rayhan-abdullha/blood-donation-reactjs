export default function Badge({
  text,
  color,
}: {
  text: string
  color: "red" | "green" | "gray"
}) {
  const styles = {
    red: "text-red-600",
    green: "text-green-600",
    gray: "text-gray-600",
  }

  return <span className={`font-semibold ${styles[color]}`}>{text}</span>
}
