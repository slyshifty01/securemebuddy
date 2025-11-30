import "./legal.css";

export function TrustCenterPage() {
  return (
    <div className="legal-page">
      <h1>SecureMeBuddy Trust Center</h1>
      <p>
        Transparency and safety guide everything we build. This page explains
        our approach to security, privacy, and responsible design.
      </p>

      <h2>Data Handling</h2>
      <ul>
        <li>We collect only what is required for functionality.</li>
        <li>No tracking cookies or advertising networks.</li>
        <li>All communication uses encrypted connections (HTTPS).</li>
      </ul>

      <h2>Security Practices</h2>
      <ul>
        <li>Supabase-backed secure infrastructure.</li>
        <li>Strict access controls and rate limiting.</li>
        <li>Minimal data retention by default.</li>
      </ul>

      <h2>Responsible Technology</h2>
      <p>
        SecureMeBuddy focuses on clarity, honesty, and user empowerment.
        Our safety signals are designed to help people make informed decisions,
        not to create fear or manipulate behavior.
      </p>

      <h2>Report a Security Issue</h2>
      <p>
        If you believe you’ve found a vulnerability, please notify us at:<br />
        <strong>security@securemebuddy.com</strong>
      </p>
    </div>
  );
}
