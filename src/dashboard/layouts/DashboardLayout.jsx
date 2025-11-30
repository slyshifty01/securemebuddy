// src/dashboard/layouts/DashboardLayout.jsx
// Clean, modern dashboard shell (Sidebar + Topbar + Content)

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { Topbar } from "../components/Topbar.jsx";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard-shell">

      {/* Left: Neon Sidebar */}
      <Sidebar />

      {/* Right side: Topbar + page content */}
      <div className="dashboard-main">
        <Topbar />

        <div className="dashboard-main-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
