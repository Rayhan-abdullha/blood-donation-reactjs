import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Card from "../../components/Card";

export default function PatientDashboard() {
  return (
    <div className="max-w-6xl mx-auto mt-6 bg-gray-50 rounded-lg shadow">

      <div className="p-6 space-y-6">
        <Button text="New Blood Request" variant="primary" />

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h2 className="font-semibold mb-3">Current Blood Request</h2>
            <p>Blood Group: <b>A+</b></p>
            <p>Bags Needed: 2</p>
            <p>Hospital: City Hospital</p>
            <p>Urgency: <Badge text="Emergency" color="red" /></p>
            <p>Status: <Badge text="Pending" color="gray" /></p>
          </Card>

          <Card>
            <h2 className="font-semibold mb-3">Donor Responses</h2>
            <p><Badge text="Accepted:" color="green" /> Michael S.</p>
            <p><Badge text="Declined:" color="red" /> David L., Priya K.</p>
          </Card>
        </div>

        <div className="max-w-sm">
          <Button text="Mark as Request Completed" variant="success" />
        </div>
      </div>
    </div>
  )
}
