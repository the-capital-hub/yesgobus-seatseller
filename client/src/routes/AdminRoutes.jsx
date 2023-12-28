import { Route, Routes } from "react-router-dom";
import { AdminDashboard, AdminLayout, AdminWallet } from "../pages/Admin";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="wallet" element={<AdminWallet />} />
        <Route path="records" element={<p>Wallet</p>} />
        <Route path="track-agents" element={<p>Track Agent</p>} />
        <Route path="track-buses" element={<p>Track Agent</p>} />
      </Route>
    </Routes>
  );
}
