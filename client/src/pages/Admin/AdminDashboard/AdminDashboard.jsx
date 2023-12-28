import "./AdminDashboard.scss";
import DashboardHeader from "./Components/DashboardHeader/DashboardHeader";
import DashboardSide from "./Components/DashboardSide/DashboardSide";
import TrackAgentList from "./Components/TrackAgentList/TrackAgentList";

export default function AdminDashboard() {
  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <DashboardHeader />

        <DashboardSide />
      </header>

      {/* Track Agent */}
      <div className="trackAgent-container flex flex-col gap-5 pt-5">
        <h2 className="m-0">Track Agent</h2>

        <TrackAgentList />
      </div>
    </div>
  );
}
