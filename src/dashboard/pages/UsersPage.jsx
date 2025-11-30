import "./dashboard-theme.css";

export default function UsersPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Users</h1>
      <p className="page-subtitle">View and manage all registered SecureMeBuddy users.</p>

      <div className="neon-card">
        <p>👤 Example User: JohnDoe@example.com</p>
      </div>

      <div className="neon-card">
        <p>👤 Example User: Ashley@example.com</p>
      </div>
    </div>
  );
}
