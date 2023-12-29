import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.scss";
import { useEffect, useState } from "react";
import { ADMIN_KEY } from "../AdminLogin/AdminLogin";
import AdminSidebar from "./Components/AdminSidebar/AdminSidebar";

export default function AdminLayout() {
  const navigate = useNavigate();

  // local state
  const [admin, setAdmin] = useState({});

  // Check if logged in
  useEffect(() => {
    const loggedInAdmin = localStorage.getItem(`${ADMIN_KEY}-loggedInAdmin`);
    const adminToken = localStorage.getItem(`${ADMIN_KEY}-token`);
    if (!adminToken || !loggedInAdmin) {
      localStorage.removeItem(`${ADMIN_KEY}-loggedInAdmin`);
      localStorage.removeItem(`${ADMIN_KEY}-token`);
      navigate("/admin/login");
    }
  }, []);

  // Read admin data
  useEffect(() => {
    const loggedInAdmin = localStorage.getItem(`${ADMIN_KEY}-loggedInAdmin`);
    if (loggedInAdmin) {
      setAdmin(JSON.parse(loggedInAdmin));
    } else {
      localStorage.removeItem(`${ADMIN_KEY}-loggedInAdmin`);
      localStorage.removeItem(`${ADMIN_KEY}-token`);
      navigate("/admin/login");
    }
  }, []);

  return (
    <div className="admin-layout-wrapper">
      {/* Sidebar */}
      <AdminSidebar admin={admin}/>
      <div className="" id="main">
        <div className="main-content" id="main-content">
          <Outlet context={{ admin }} />
        </div>
      </div>
    </div>
  );
}
