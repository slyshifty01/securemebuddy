import "./dashboard-theme.css";

export default function AffiliatesPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Affiliates</h1>
      <p className="page-subtitle">Track affiliate performance and payouts.</p>

      <div className="neon-card">
        <p>💸 Total Affiliates: 12</p>
      </div>

      <div className="neon-card">
        <p>💵 Last Payout: $42.00</p>
      </div>
    </div>
  );
}
