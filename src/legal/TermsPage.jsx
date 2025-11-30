import "./legal.css";

export function TermsPage() {
  return (
    <div className="legal-page">
      <h1>Terms of Service</h1>
      <p><strong>Last Updated:</strong> January 2025</p>

      <p>
        These Terms describe your rights and responsibilities when using
        SecureMeBuddy’s tools and services.
      </p>

      <h2>1. Using the Service</h2>
      <p>
        You may use SecureMeBuddy to check emails, phone numbers, and URLs for
        safety signals.
      </p>

      <h2>2. Accuracy of Results</h2>
      <p>
        Our tools provide risk assessments based on patterns and signals.
        Results are not guarantees and should be used as guidance.
      </p>

      <h2>3. Responsibilities</h2>
      <ul>
        <li>Use the service legally and respectfully</li>
        <li>Do not harm or disrupt the platform</li>
        <li>Protect your account credentials and API keys</li>
      </ul>

      <h2>4. Limitation of Liability</h2>
      <p>
        SecureMeBuddy is provided “as is” without warranties of any kind.
        We are not liable for damages arising from use of the service.
      </p>

      <h2>5. Changes to These Terms</h2>
      <p>
        We may update these Terms as the service evolves. When we do, we will
        update the “Last Updated” date above.
      </p>

      <h2>6. Contact</h2>
      <p>Questions? Email <strong>support@securemebuddy.com</strong>.</p>
    </div>
  );
}
