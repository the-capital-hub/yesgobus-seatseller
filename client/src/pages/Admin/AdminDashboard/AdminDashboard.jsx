import "./AdminDashboard.scss";
import DashboardHeader from "./Components/DashboardHeader/DashboardHeader";
import DashboardSide from "./Components/DashboardSide/DashboardSide";
import TrackAgentList from "./Components/TrackAgentList/TrackAgentList";
import { ADMIN_KEY } from "../AdminLogin/AdminLogin";

export default function AdminDashboard() {
  const loggedInAdmin = JSON.parse(
    localStorage.getItem(`${ADMIN_KEY}-loggedInAdmin`)
  );

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <DashboardHeader />

        <DashboardSide />
      </header>

      {/* Track Agent */}
      {loggedInAdmin?.role === "YSB_ADMIN" && (
        <div className="trackAgent-container flex flex-col gap-5 pt-5">
          <h2 className="m-0">Track Business Development Associate (BDA)</h2>
          <TrackAgentList />
        </div>
      )}
    </div>
  );
}
