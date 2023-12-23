import { Route, Routes } from "react-router-dom";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="" element={<p>Admin Layout</p>}>
        <Route path="dashboard" element={<p>Dashboard</p>} />
        <Route path="wallet" element={<p>Wallet</p>} />
        <Route path="track-agent" element={<p>Track Agent</p>} />
      </Route>
    </Routes>
  );
}
