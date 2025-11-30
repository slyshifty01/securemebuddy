// src/Components/PublicFooter.jsx
// Clean, neutral footer for all public-facing pages

import { Link } from "react-router-dom";
import "./PublicFooter.css";

export default function PublicFooter() {
  return (
    <footer className="public-footer">

      <div className="public-footer-inner">

        {/* Link Sections */}
        <div className="footer-link-group">
          <Link to="/privacy">Privacy Policy</Link>
          <span className="footer-sep">•</span>
          <Link to="/terms">Terms of Service</Link>
          <span className="footer-sep">•</span>
          <Link to="/contact">Contact</Link>
          <span className="footer-sep">•</span>
          <Link to="/trust">Trust Center</Link>
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          © {new Date().getFullYear()} SecureMeBuddy — All Rights Reserved
        </div>

      </div>

    </footer>
  );
}
