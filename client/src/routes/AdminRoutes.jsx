import { Route, Routes } from "react-router-dom";
import { AdminDashboard, AdminLayout } from "../pages/Admin";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="wallet" element={<p>Wallet</p>} />
        <Route path="track-agent" element={<p>Track Agent</p>} />
      </Route>
    </Routes>
  );
}
