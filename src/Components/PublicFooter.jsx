// src/Components/PublicFooter.jsx
// Clean, neutral footer with NO legal links

import "./PublicFooter.css";

export default function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer-inner">

        {/* Simple branding only — no links */}
        <div className="footer-link-group">
          <span>SecureMeBuddy</span>
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          © {new Date().getFullYear()} SecureMeBuddy
        </div>

      </div>
    </footer>
  );
}
