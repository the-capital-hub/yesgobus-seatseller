import { Outlet, Navigate } from "react-router-dom";
import "./AdminLayout.scss";
import { ADMIN_KEY } from "../AdminLogin/AdminLogin";
import AdminSidebar from "./Components/AdminSidebar/AdminSidebar";

export default function AdminLayout() {
  const loggedInAdmin = localStorage.getItem(`${ADMIN_KEY}-loggedInAdmin`);
  const adminToken = localStorage.getItem(`${ADMIN_KEY}-token`);
  let admin = {};

  // Check if logged in
  if (loggedInAdmin) {
    admin = JSON.parse(loggedInAdmin);
  }

  if (!adminToken || !loggedInAdmin) {
    localStorage.removeItem(`${ADMIN_KEY}-loggedInAdmin`);
    localStorage.removeItem(`${ADMIN_KEY}-token`);
    return <Navigate to={"/admin/login"} replace></Navigate>;
  }

  return (
    <div className="admin-layout-wrapper">
      {/* Sidebar */}
      <AdminSidebar admin={admin} />
      <div className="" id="main">
        <div className="main-content" id="main-content">
          <Outlet context={{ admin }} />
        </div>
      </div>
    </div>
  );
}
