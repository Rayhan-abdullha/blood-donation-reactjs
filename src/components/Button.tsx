export default function Button({
  text,
  variant,
  onClick
}: {
  text: string
    variant: "primary" | "success" | "danger"
    onClick?: () => void
}) {
  const styles = {
    primary: "bg-primary",
    success: "bg-success",
    danger: "bg-danger",
  }

  return (
    <button
      onClick={onClick}
      className={`${styles[variant]} text-white cursor-pointer px-4 py-2 rounded hover:opacity-90 w-full`}
    >
      {text}
    </button>
  )
}
