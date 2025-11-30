// src/dashboard/components/Topbar.jsx
// Modern glassmorphic neon topbar

import React from "react";
import "./Topbar.css";
import { FiBell, FiSun, FiMoon, FiUser } from "react-icons/fi";
import { useState } from "react";

export const Topbar = () => {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
    // We can wire this later to a global theme system
  }

  return (
    <div className="topbar">
      {/* Left title */}
      <h2 className="topbar-title">SecureMeBuddy Dashboard</h2>

      {/* Right action buttons */}
      <div className="topbar-actions">
        {/* Notification Icon */}
        <button className="topbar-icon-btn" title="Notifications">
          <FiBell />
        </button>

        {/* Theme Toggle */}
        <button
          className="topbar-icon-btn"
          title="Toggle Theme"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>

        {/* User Menu Placeholder */}
        <button className="topbar-icon-btn user-btn" title="Account">
          <FiUser />
        </button>
      </div>
    </div>
  );
};

