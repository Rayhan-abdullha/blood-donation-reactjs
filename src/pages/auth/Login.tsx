import Button from "../../components/Button"

export default function Login() {
  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input className="border p-2 w-full mb-3" placeholder="Phone Number" />
      <input className="border p-2 w-full mb-4" placeholder="OTP" />
{/* link="/donor/home" */}
      <Button text="Login" variant="primary"  />
    </div>
  )
}
