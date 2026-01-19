import Button from "../../components/Button"

export default function Register() {
  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register as Donor</h2>

      <input className="border p-2 w-full mb-2" placeholder="Full Name" />
      <input className="border p-2 w-full mb-2" placeholder="Phone Number" />
      <select className="border p-2 w-full mb-4">
        <option>Select Blood Group</option>
        <option>A+</option>
        <option>O+</option>
        <option>B+</option>
      </select>
{/* link="/donor/home" */}
      <Button text="Register" variant="success"  />
    </div>
  )
}
