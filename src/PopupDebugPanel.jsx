import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import { POPUPS } from "../popupRegistry";  // optional, see next step

import "./PopupStyles.css";

export default function PopupDebugPanel() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("smb_user_id");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const { data, error } = await supabase
      .from("popup_events")
      .select("*")
      .eq("user_id", userId);

    if (error) console.error("DebugPanel load error:", error);

    setRows(data || []);
    setLoading(false);
  }

  async function resetPopup(popupName) {
    await supabase
      .from("popup_events")
      .delete()
      .eq("user_id", userId)
      .eq("popup_name", popupName);

    loadData();
  }

  async function resetAllPopups() {
    await supabase.from("popup_events").delete().eq("user_id", userId);
    loadData();
  }

  function clearLocalStorage() {
    localStorage.clear();
    alert("Local storage cleared. Refresh to see effect.");
  }

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ color: "#38bdf8", marginBottom: "10px" }}>
        🔧 Popup Debug Panel
      </h1>

      <p style={{ color: "#e5e7eb", marginBottom: "20px" }}>
        This tool helps you test, debug, and reset popup behavior for your current device.
      </p>

      <div
        style={{
          background: "#0b1220",
          borderRadius: "12px",
          padding: "16px",
          border: "1px solid rgba(148,163,184,0.3)",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#38bdf8", marginBottom: "10px" }}>
          User Device ID
        </h2>
        <code style={{ color: "#e5e7eb" }}>{userId}</code>
      </div>

      {/* POPUP TABLE */}
      <div
        style={{
          background: "#0b1220",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid rgba(148,163,184,0.3)",
        }}
      >
        <h2 style={{ color: "#38bdf8", marginBottom: "15px" }}>
          Popup Dismissal Records
        </h2>

        {loading ? (
          <p style={{ color: "#e5e7eb" }}>Loading...</p>
        ) : rows.length === 0 ? (
          <p style={{ color: "#e5e7eb" }}>No popup records found.</p>
        ) : (
          <table
            style={{
              width: "100%",
              color: "#e5e7eb",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #334155" }}>
                <th style={{ padding: "8px" }}>Popup Name</th>
                <th style={{ padding: "8px" }}>Dismissed?</th>
                <th style={{ padding: "8px" }}>Date</th>
                <th style={{ padding: "8px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} style={{ borderBottom: "1px solid #1e293b" }}>
                  <td style={{ padding: "8px" }}>{row.popup_name}</td>
                  <td style={{ padding: "8px" }}>
                    {row.dismissed ? "Yes" : "No"}
                  </td>
                  <td style={{ padding: "8px" }}>
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                  <td style={{ padding: "8px" }}>
                    <button
                      className="popup-secondary-btn"
                      onClick={() => resetPopup(row.popup_name)}
                    >
                      Reset
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button
          className="popup-primary-btn"
          style={{ marginTop: "15px" }}
          onClick={resetAllPopups}
        >
          Reset ALL Popups
        </button>
      </div>

      {/* CLEAR LOCAL DATA */}
      <div
        style={{
          marginTop: "20px",
          background: "#0b1220",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid rgba(148,163,184,0.3)",
        }}
      >
        <h2 style={{ color: "#38bdf8" }}>Local Storage</h2>
        <button
          className="popup-secondary-btn"
          style={{ marginTop: "10px" }}
          onClick={clearLocalStorage}
        >
          Clear Local Storage
        </button>
      </div>
    </div>
  );
}
