import "./dashboard-theme.css";

export default function SettingsPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">Adjust your dashboard preferences and account settings.</p>

      <div className="neon-card">
        <p>⚙️ Dark Mode: Enabled</p>
      </div>

      <div className="neon-card">
        <p>👤 Account: Ashley Morales (Owner)</p>
      </div>
    </div>
  );
}
