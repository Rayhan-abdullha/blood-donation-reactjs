import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Card from "../../components/Card";
// import Navbar from "../../components/Navbar";
// const menus = [
//     { link: "donor/home", name: "Home" },
//     { link: "donor/history", name: "History" },
//     { link: "donor/requests", name: "Requests" },
//     { link: "donor/profile", name: "Profile" },
//   ]
export default function DonorDashboard() {
  return (
    <div className="max-w-6xl mx-auto mt-6 bg-gray-50 rounded-lg shadow">
      {/* <Navbar title="Donor Dashboard" menus={menus} user="John" /> */}

      <div className="p-6 space-y-6">
        <div className="bg-orange-100 border text-orange-700 p-4 rounded">
          Welcome, John! You are available to donate.
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h2 className="font-semibold mb-3">New Blood Request</h2>
            <p>Blood Group: <b>A+</b></p>
            <p>Bags: <b>2</b></p>
            <p>Hospital: City Hospital</p>
            <p>Urgency: <Badge text="Emergency" color="red" /></p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button text="Accept" variant="success" />
              <Button text="Decline" variant="danger" />
            </div>
          </Card>

          <div className="space-y-4">
            <Card>
              <h2 className="font-semibold">Donation Stats</h2>
              <p>Total Donations: 8</p>
              <p>Next Reminder: May 10, 2024</p>
            </Card>

            <Card>
              <h2 className="font-semibold">My Donation History</h2>
              <p>Last Donation: Feb 15, 2024</p>
              <p>Upcoming Reminder: May 10, 2024</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
