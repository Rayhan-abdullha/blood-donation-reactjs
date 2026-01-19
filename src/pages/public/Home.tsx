import Card from "../../components/Card"
import Button from "../../components/Button"
import { Link } from "react-router-dom"

export default function PublicHome() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
       <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">
          Donate Blood, Save Lives
        </h1>
        <p className="text-gray-600">
          Connect donors and patients instantly
        </p>
        <Link to={"/patient/home"}>
        <Button text="Become a Donor" variant="primary" 
         /></Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-semibold">🩸 Find Donors Fast</h3>
          <p className="text-gray-600">
            Emergency matching based on blood group and location.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold">📍 Location Based</h3>
          <p className="text-gray-600">
            Nearby donors get instant notifications.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold">🔐 Safe & Trusted</h3>
          <p className="text-gray-600">
            Verified donors and secure access.
          </p>
        </Card>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Donors</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["A+", "O+", "B+"].map((bg, i) => (
            <Card key={i}>
              <p className="font-semibold">Blood Group: {bg}</p>
              <p>Location: City</p>
              <p className="text-green-600 font-semibold">Available</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
