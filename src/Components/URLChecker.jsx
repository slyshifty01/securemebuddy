import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function URLChecker() {
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // 🔵 1. Rate-limit check via your Edge Function
  async function checkLimit() {
    const endpoint =
      "https://fbqidnsnhhjaabynxdjd.supabase.co/functions/v1/verify-lookup-limit";

    const response = await fetch(endpoint);
    const data = await response.json();

    return data.allowed;
  }

  // 🔵 2. Log the lookup to Supabase
  async function logLookup(urlValue) {
    await supabase.from("lookup_logs").insert({
      ip_address: "client-ip", // you can enhance this with a real IP API later
      lookup_type: "url",
      searched_value: urlValue,
    });
  }

  // 🔵 3. Simple SAFE URL validation (no external APIs yet)
  function basicURLCheck(raw) {
    try {
      const url = new URL(raw);
      return {
        valid: true,
        domain: url.hostname,
        https: url.protocol === "https:",
      };
    } catch {
      return { valid: false };
    }
  }

  // 🔵 4. Main handler for the URL check
  async function handleCheck() {
    setResult(null);

    if (!urlInput.trim()) {
      setResult({ error: "Enter a website URL first." });
      return;
    }

    // 1️⃣ Check rate-limit first
    const allowed = await checkLimit();

    if (!allowed) {
      setResult({
        error:
          "You've reached your daily free limit. Upgrade to Pro for unlimited checks.",
      });
      return;
    }

    setLoading(true);

    // 2️⃣ Run the URL validation
    const check = basicURLCheck(urlInput);

    // 3️⃣ Log to Supabase
    await logLookup(urlInput);

    setLoading(false);

    // 4️⃣ Save result
    setResult(check);
  }

  return (
    <section className="fade-in">
      <h2>URL Safety Checker</h2>
      <p>Check if a website address is formatted correctly and safe to visit.</p>

      <div className="card" style={{ padding: "20px", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter a URL (example: https://google.com)"
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
          {loading ? "Checking…" : "Check Now"}
        </button>

        {/* 🔵 RESULT BOX */}
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

            {result.valid && !result.error && (
              <>
                <p>
                  <strong>Domain:</strong> {result.domain}
                </p>
                <p>
                  <strong>HTTPS Secure:</strong>{" "}
                  {result.https ? "Yes" : "No (Not encrypted)"}
                </p>
              </>
            )}

            {!result.valid && !result.error && (
              <p style={{ color: "red" }}>
                ❌ The URL is not valid. Please check the spelling.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
