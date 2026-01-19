export default function Button({
  text,
  variant,
}: {
  text: string
  variant: "primary" | "success" | "danger"
}) {
  const styles = {
    primary: "bg-primary",
    success: "bg-success",
    danger: "bg-danger",
  }

  return (
    <button
      className={`${styles[variant]} text-white cursor-pointer px-4 py-2 rounded hover:opacity-90 w-full`}
    >
      {text}
    </button>
  )
}
