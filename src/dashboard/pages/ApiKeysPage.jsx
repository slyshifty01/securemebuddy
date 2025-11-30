// src/dashboard/pages/ApiKeysPage.jsx
// Hybrid Modern + Neon Polish — API Key Management Page

import React, { useState, useEffect } from "react";
import "./ApiKeysPage.css";
import { createClient } from "@supabase/supabase-js";
import { FiCopy, FiTrash2, FiKey } from "react-icons/fi";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const FUNCTION_BASE_URL =
  import.meta.env.VITE_SUPABASE_FUNCTION_URL ||
  "https://fbqidnsnhhjaabynxdjd.functions.supabase.co";

export default function ApiKeysPage() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(null);
  const [error, setError] = useState(null);

  const DEMO_USER_ID = "demo-user-1";

  async function loadKeys() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("api_keys")
        .select("id, api_key, created_at, active")
        .eq("user_id", DEMO_USER_ID)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setKeys(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadKeys();
  }, []);

  async function generateKey() {
    try {
      setGenerating(true);

      const res = await fetch(`${FUNCTION_BASE_URL}/generate-api-key`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const { api_key } = await res.json();

      const { error } = await supabase.from("api_keys").insert([
        { user_id: DEMO_USER_ID, api_key, active: true },
      ]);

      if (error) throw error;

      await loadKeys();
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  }

  async function revokeKey(id) {
    const { error } = await supabase
      .from("api_keys")
      .update({ active: false })
      .eq("id", id);

    if (error) setError(error.message);
    await loadKeys();
  }

  function copyKey(text, id) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="apikeys-page">

      <div className="apikeys-header">
        <h1>API Keys</h1>
        <p>Generate, manage, and revoke API keys used to access SecureMeBuddy services.</p>
      </div>

      <button
        className="apikey-generate-btn"
        onClick={generateKey}
        disabled={generating}
      >
        {generating ? "Generating..." : "Generate New API Key"}
      </button>

      {error && <p className="apikey-error">⚠️ {error}</p>}

      <div className="apikey-list-panel">
        {loading ? (
          <p className="apikey-placeholder">Loading keys...</p>
        ) : keys.length === 0 ? (
          <p className="apikey-placeholder">No API keys yet.</p>
        ) : (
          <table className="apikey-table">
            <thead>
              <tr>
                <th><FiKey /> Key</th>
                <th>Status</th>
                <th>Created</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr key={k.id}>
                  <td className="truncate">
                    {k.api_key}
                  </td>

                  <td>
                    <span className={k.active ? "badge-active" : "badge-revoked"}>
                      {k.active ? "Active" : "Revoked"}
                    </span>
                  </td>

                  <td>{new Date(k.created_at).toLocaleString()}</td>

                  <td className="actions">
                    <button
                      className="icon-btn"
                      onClick={() => copyKey(k.api_key, k.id)}
                      title="Copy key"
                    >
                      <FiCopy />
                      {copied === k.id && <span className="copy-popup">Copied!</span>}
                    </button>

                    {k.active && (
                      <button
                        className="icon-btn danger"
                        onClick={() => revokeKey(k.id)}
                        title="Revoke key"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
