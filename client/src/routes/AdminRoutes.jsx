import { Route, Routes } from "react-router-dom";
import { AdminDashboard, AdminLayout } from "../pages/Admin";
import AdminTrackAgent from "../pages/Admin/AdminTrackAgent/AdminTrackAgent";
import AdminTrackBuses from "../pages/Admin/AdminTrackBuses/AdminTrackBuses";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="wallet" element={<p>Wallet</p>} />
        <Route path="records" element={<p>Wallet</p>} />
        <Route path="track-agents" element={<AdminTrackAgent />} />
        <Route path="track-buses" element={<AdminTrackBuses />} />
      </Route>
    </Routes>
  );
}
