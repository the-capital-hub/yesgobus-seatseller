// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../CabDriver/HomeNavbar/NavBar";
import MobileBottomToolbar from "../../CabDriver/MobileBottomToolbar/MobileBottomToolbar";
import "./CabDriverHomeLayout.scss";

const Layout = () => {
  return (
    <div>
      <NavBar />

      <main className="cab-home-layout">
        {/* Outlet is used here to render child routes */}
        <Outlet />
      </main>
      <MobileBottomToolbar />
    </div>
  );
};

export default Layout;
