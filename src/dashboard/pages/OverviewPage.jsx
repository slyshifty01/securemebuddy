// src/dashboard/pages/OverviewPage.jsx
import React, { useEffect, useState } from "react";
import "./dashboard-theme.css";

// Base URL for your Supabase Edge Functions
// You can override this in .env with:
// VITE_SUPABASE_FUNCTION_URL=https://fbqidnsnhhjaabynxdjd.functions.supabase.co
const FUNCTION_BASE_URL =
  import.meta.env.VITE_SUPABASE_FUNCTION_URL ||
  "https://fbqidnsnhhjaabynxdjd.functions.supabase.co";

const DEMO_USER_ID = "demo-user-1"; // TODO: replace with real authenticated user id later

const OverviewPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Shape fallback so UI never explodes if fields are missing
  const safeStats = {
    total_lookups: stats?.total_lookups ?? 0,
    email_lookups: stats?.email_lookups ?? 0,
    phone_lookups: stats?.phone_lookups ?? 0,
    url_lookups: stats?.url_lookups ?? 0,
    flagged_lookups: stats?.flagged_lookups ?? 0,
    recent: Array.isArray(stats?.recent) ? stats.recent : [],
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${FUNCTION_BASE_URL}/lookup-stats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: DEMO_USER_ID }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(
            `lookup-stats failed (${res.status}): ${text || "Unknown error"}`
          );
        }

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching lookup stats:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-page overview-page">
      {/* Header */}
      <div className="overview-header">
        <div>
          <h1 className="overview-title">Security Overview</h1>
          <p className="overview-subtitle">
            High-level view of your SecureMeBuddy activity, lookups, and safety
            signals.
          </p>
        </div>
        <div className="overview-header-tags">
          <span className="tag-pill">Secure Dashboard</span>
          <span className="tag-pill tag-pill-accent">Live Data</span>
        </div>
      </div>

      {/* Loading / error states */}
      {loading && (
        <div className="overview-state-card">
          <p>Loading your security stats… 🛡️</p>
        </div>
      )}

      {!loading && error && (
        <div className="overview-state-card overview-state-error">
          <p>Couldn&apos;t load stats: {error}</p>
          <p className="overview-state-hint">
            Make sure your <code>lookup-stats</code> Edge Function is deployed
            and reachable.
          </p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Stats grid */}
          <div className="overview-grid">
            <div className="stat-card">
              <p className="stat-label">Total Lookups</p>
              <p className="stat-value">{safeStats.total_lookups}</p>
              <p className="stat-hint">
                Sum of all email, phone, and URL checks.
              </p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Email Checks</p>
              <p className="stat-value">{safeStats.email_lookups}</p>
              <p className="stat-hint">Phishing, scams, and fraud patterns.</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Phone Checks</p>
              <p className="stat-value">{safeStats.phone_lookups}</p>
              <p className="stat-hint">Robo-calls, spam, and suspicious numbers.</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">URL Checks</p>
              <p className="stat-value">{safeStats.url_lookups}</p>
              <p className="stat-hint">Shady domains, fake logins, and traps.</p>
            </div>

            <div className="stat-card stat-card-accent">
              <p className="stat-label">Flagged / Risky</p>
              <p className="stat-value">{safeStats.flagged_lookups}</p>
              <p className="stat-hint">
                Lookups that triggered scam or fraud indicators.
              </p>
            </div>
          </div>

          {/* Recent activity */}
          <div className="overview-section">
            <div className="overview-section-header">
              <h2>Recent Activity</h2>
              <p>Latest lookups run through your SecureMeBuddy tools.</p>
            </div>

            {safeStats.recent.length === 0 ? (
              <div className="overview-state-card">
                <p>No recent lookups yet.</p>
                <p className="overview-state-hint">
                  Once you start using the safety tools, your latest checks will
                  appear here.
                </p>
              </div>
            ) : (
              <div className="overview-table-wrapper">
                <table className="overview-table">
                  <thead>
                    <tr>
                      <th>When</th>
                      <th>Type</th>
                      <th>Value</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {safeStats.recent.map((entry, idx) => (
                      <tr key={entry.id || idx}>
                        <td>
                          {entry.created_at
                            ? new Date(entry.created_at).toLocaleString()
                            : "N/A"}
                        </td>
                        <td className="badge-cell">
                          <span className="badge">
                            {entry.type ? entry.type.toUpperCase() : "N/A"}
                          </span>
                        </td>
                        <td className="truncate-cell">
                          <span title={entry.value || ""}>
                            {entry.value || "N/A"}
                          </span>
                        </td>
                        <td>
                          <span
                            className={
                              entry.is_safe
                                ? "status-pill status-pill-safe"
                                : "status-pill status-pill-risky"
                            }
                          >
                            {entry.is_safe ? "Safe" : "Risky"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OverviewPage;
