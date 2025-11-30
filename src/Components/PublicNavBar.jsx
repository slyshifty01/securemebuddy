import React from "react";
import { Link } from "react-router-dom";
import "./PublicNavbar.css";

export default function PublicNavbar() {
  return (
    <header className="public-navbar">
      <div className="nav-top">
        <img src="/Buddy.png" alt="SecureMeBuddy Logo" className="nav-logo" />
        <div className="nav-title-group">
          <h1 className="nav-title">SecureMeBuddy</h1>
          <p className="nav-subtitle">Your friendly guide to staying safe online.</p>
        </div>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/learn">Learn</Link>
        <Link to="/checklists">Checklists</Link>
        <Link to="/risk-helper">Risk Helper</Link>
        <Link to="/scam-reports">Scam Reports</Link>
        <Link to="/guides">Guides</Link>
        <Link to="/glossary">Glossary</Link>
        <Link to="/software">Software</Link>
        <Link to="/privacy">Privacy Center</Link>
        <Link to="/lookup-tools">Lookup Tools</Link>
      </nav>
    </header>
  );
}
