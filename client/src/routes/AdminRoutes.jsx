import { Route, Routes, Navigate } from "react-router-dom";

import AdminTrackAgent from "../pages/Admin/AdminTrackAgent/AdminTrackAgent";
// import AdminTrackBuses from "../pages/Admin/AdminTrackBuses/AdminTrackBuses";
import {
  AdminDashboard,
  AdminLayout,
  AdminRecords,
  AdminWallet,
} from "../pages/Admin";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="wallet" element={<AdminWallet />} />
        <Route path="records" element={<AdminRecords />} />
        <Route path="track-bdas" element={<AdminTrackAgent />} />
        <Route path="*" element={<Navigate to={"/not-found"} replace />} />
        {/* <Route path="track-buses" element={<AdminTrackBuses />} /> */}
      </Route>
    </Routes>
  );
}
