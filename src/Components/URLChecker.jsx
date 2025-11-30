import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function URLChecker() {
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Persistent device/user ID
  const userId =
    localStorage.getItem("smb_user_id") || crypto.randomUUID();
  localStorage.setItem("smb_user_id", userId);

  // Rate limit check
  async function checkLimit() {
    const endpoint =
      "https://fbqidnsnhhjaabynxdjd.supabase.co/functions/v1/verify-lookup-limit";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        limit: 25,
      }),
    });

    const data = await response.json();
    return data.allowed;
  }

  // Basic URL validation
  function validateURL(link) {
    const lower = link.toLowerCase();

    if (!lower.startsWith("http://") && !lower.startsWith("https://")) {
      return { valid: false };
    }

    const is_safe =
      lower.startsWith("https://") &&
      !lower.includes("phishing") &&
      !lower.includes("steal") &&
      !lower.includes("free-gift") &&
      !lower.includes("malware");

    return { valid: true, is_safe };
  }

  async function handleCheck() {
    setResult(null);

    if (!urlInput.trim()) {
      setResult({ error: "Enter a URL first." });
      return;
    }

    const allowed = await checkLimit();
    if (!allowed) {
      setResult({
        error:
          "You've reached your free daily limit. Upgrade to Pro for unlimited lookups.",
      });
      return;
    }

    setLoading(true);

    const check = validateURL(urlInput);

    // Log to Supabase
    await supabase.from("lookup_logs").insert({
      user_id: userId,
      lookup_type: "url",
      value: urlInput,
      is_safe: check.valid && check.is_safe,
    });

    setLoading(false);
    setResult(check);
  }

  return (
    <section className="fade-in">
      <h2>URL Safety Checker</h2>
      <p>Check if a website link looks safe or suspicious.</p>

      <div className="card" style={{ padding: "20px", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="button"
          onClick={handleCheck}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            background: "#0078ff",
            color: "white",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          {loading ? "Checking…" : "Check URL"}
        </button>

        {result && (
          <div
            style={{
              marginTop: "20px",
              background: "#f5f5f5",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            {result.error && (
              <p style={{ color: "red", fontWeight: "bold" }}>{result.error}</p>
            )}

            {!result.error && !result.valid && (
              <p style={{ color: "red" }}>
                ❌ Invalid URL format. Use http:// or https://
              </p>
            )}

            {result.valid && !result.error && (
              <p>
                <strong>Safety:</strong>{" "}
                {result.is_safe ? (
                  <span style={{ color: "green", fontWeight: "bold" }}>SAFE</span>
                ) : (
                  <span style={{ color: "red", fontWeight: "bold" }}>UNSAFE</span>
                )}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
