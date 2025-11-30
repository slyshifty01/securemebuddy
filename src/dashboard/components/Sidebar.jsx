// src/dashboard/components/Sidebar.jsx
// Clean, modern neon-accented sidebar with full routing

import React from "react";
import { NavLink } from "react-router-dom";
import "../pages/dashboard-theme.css";
import "./Sidebar.css";

export default function Sidebar() {
  const links = [
    { to: "/secure/dashboard", label: "Overview" },
    { to: "/secure/dashboard/users", label: "Users" },
    { to: "/secure/dashboard/affiliates", label: "Affiliates" },
    { to: "/secure/dashboard/safety", label: "Safety Checkers" },
    { to: "/secure/dashboard/api-keys", label: "API Keys" },
    { to: "/secure/dashboard/settings", label: "Settings" },
  ];

  return (
    <aside className="sidebar-wrapper">
      <h2 className="sidebar-logo">SecureMeBuddy</h2>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
