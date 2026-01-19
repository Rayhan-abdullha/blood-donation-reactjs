import Button from "../../components/Button";
import Card from "../../components/Card";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto mt-6 bg-gray-50 rounded-lg shadow">
      <div className="p-6 space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold">Total Donors</h3>
            <p className="text-2xl font-bold text-primary">320</p>
          </Card>

          <Card>
            <h3 className="font-semibold">Active Requests</h3>
            <p className="text-2xl font-bold text-orange-500">45</p>
          </Card>

          <Card>
            <h3 className="font-semibold">Completed Donations</h3>
            <p className="text-2xl font-bold text-success">210</p>
          </Card>
        </div>

        <Card>
          <h2 className="font-semibold mb-4">Verify New Donors</h2>
          <div className="flex justify-between items-center mb-3">
            <p>Rahul (A+)</p>
            <div className="flex gap-2">
              <Button text="Approve" variant="success" />
              <Button text="Reject" variant="danger" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
