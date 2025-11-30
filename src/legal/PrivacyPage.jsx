import "./legal.css";

export function PrivacyPage() {
  return (
    <div className="legal-page">
      <h1>Privacy Policy</h1>
      <p><strong>Last Updated:</strong> January 2025</p>

      <p>
        SecureMeBuddy is designed with privacy and clarity in mind. Our tools
        help people stay safer online without tracking, profiling, or collecting
        unnecessary information.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>A. Information You Provide</h3>
      <ul>
        <li>Your email if you sign up for the waitlist</li>
        <li>Optional account details for dashboard users</li>
      </ul>

      <h3>B. Safety Checks</h3>
      <p>
        You may submit emails, phone numbers, or URLs for safety scanning.
        This information is processed only to generate a safety result.
      </p>

      <h3>C. Lookup Logs</h3>
      <ul>
        <li>User ID (if logged in)</li>
        <li>Lookup type (email, phone, URL)</li>
        <li>Timestamp</li>
        <li>Safety label (safe / risky)</li>
      </ul>

      <h2>2. How We Use Information</h2>
      <ul>
        <li>Provide accurate safety results</li>
        <li>Maintain system reliability</li>
        <li>Prevent abuse</li>
        <li>Improve detection signals</li>
      </ul>

      <h2>3. What We Do NOT Do</h2>
      <ul>
        <li>No advertising networks</li>
        <li>No tracking cookies</li>
        <li>No behavioral profiling</li>
        <li>No selling or renting data</li>
      </ul>

      <h2>4. Data Retention</h2>
      <p>
        We keep only the minimum necessary information, and you may request
        deletion at any time.
      </p>

      <h2>5. Your Rights</h2>
      <p>You may request access, correction, deletion, or export of your data.</p>

      <h2>6. Contact Us</h2>
      <p>Email us at <strong>support@securemebuddy.com</strong>.</p>
    </div>
  );
}
