import { Route, Routes } from "react-router-dom";

import AdminTrackAgent from "../pages/Admin/AdminTrackAgent/AdminTrackAgent";
import AdminTrackBuses from "../pages/Admin/AdminTrackBuses/AdminTrackBuses";
import {
  AdminDashboard,
  AdminLayout,
  AdminRecords,
  AdminWallet,
} from "../pages/Admin";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="wallet" element={<AdminWallet />} />
        <Route path="records" element={<AdminRecords />} />
        <Route path="track-agents" element={<AdminTrackAgent />} />
        {/* <Route path="track-buses" element={<AdminTrackBuses />} /> */}
      </Route>
    </Routes>
  );
}
