export default function Requests() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Blood Request</h2>

      <select className="border p-2 w-full mb-2">
        <option>Select Blood Group</option>
        <option>A+</option>
        <option>B+</option>
        <option>O+</option>
        <option>O-</option>
      </select>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Hospital Name"
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Location"
      />

      <select className="border p-2 w-full mb-4">
        <option>Urgency</option>
        <option>Normal</option>
        <option>Emergency</option>
      </select>

      <button className="bg-red-600 text-white w-full p-2 rounded">
        Submit Request
      </button>
    </div>
  )
}
