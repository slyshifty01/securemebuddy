import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import "./PopupStyles.css";

export default function DebugPanel() {
  const [logs, setLogs] = useState({
    popup_events: [],
    lookup_logs: [],
    scam_reports: [],
    risk_helper: [],
  });

  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("smb_user_id");

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);

    const tables = [
      "popup_events",
      "lookup_logs",
      "risk_helper_logs",
      "scam_reports",
    ];

    let out = {};

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("user_id", userId);

      if (error) console.error(`Debug load error: ${table}`, error);
      out[table] = data || [];
    }

    setLogs(out);
    setLoading(false);
  }

  async function clearTable(table) {
    await supabase.from(table).delete().eq("user_id", userId);
    loadAll();
  }

  function clearLocal() {
    localStorage.clear();
    alert("Local storage cleared — refresh.");
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ color: "#38bdf8" }}>🛠 Global Debug Panel</h1>
      <p style={{ color: "#e5e7eb" }}>
        Internal dashboard for viewing and clearing app logs, user state, and popup flags.
      </p>

      <section>
        <h2 style={{ color: "#38bdf8" }}>Device ID</h2>
        <code style={{ color: "#e5e7eb" }}>{userId}</code>
      </section>

      {loading ? (
        <p style={{ color: "#e5e7eb" }}>Loading logs...</p>
      ) : (
        <>
          {/* POPUP EVENTS */}
          <DebugTable
            title="Popup Events"
            tableName="popup_events"
            entries={logs.popup_events}
            onClear={clearTable}
          />

          {/* LOOKUP LOGS */}
          <DebugTable
            title="Lookup Tool Logs"
            tableName="lookup_logs"
            entries={logs.lookup_logs}
            onClear={clearTable}
          />

          {/* RISK HELPER */}
          <DebugTable
            title="Risk Helper Logs"
            tableName="risk_helper_logs"
            entries={logs.risk_helper_logs}
            onClear={clearTable}
          />

          {/* SCAM REPORTS */}
          <DebugTable
            title="Scam Reports"
            tableName="scam_reports"
            entries={logs.scam_reports}
            onClear={clearTable}
          />
        </>
      )}

      <hr style={{ margin: "30px 0", borderColor: "#334155" }} />

      <h2 style={{ color: "#38bdf8" }}>Local Storage</h2>
      <button className="popup-secondary-btn" onClick={clearLocal}>
        Clear Local Storage
      </button>
    </div>
  );
}

function DebugTable({ title, tableName, entries, onClear }) {
  return (
    <div
      style={{
        background: "#0b1220",
        padding: "16px",
        borderRadius: "12px",
        border: "1px solid rgba(148,163,184,0.3)",
        marginTop: "20px",
      }}
    >
      <h3 style={{ color: "#38bdf8" }}>{title}</h3>

      {entries.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>No records.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            color: "#e5e7eb",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid #334155" }}>
              {Object.keys(entries[0]).map((key) => (
                <th key={key} style={{ padding: "8px" }}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((row) => (
              <tr key={row.id} style={{ borderBottom: "1px solid #1e293b" }}>
                {Object.keys(row).map((key) => (
                  <td key={key} style={{ padding: "8px" }}>
                    {String(row[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="popup-secondary-btn"
        style={{ marginTop: "15px" }}
        onClick={() => onClear(tableName)}
      >
        Clear {title}
      </button>
    </div>
  );
}