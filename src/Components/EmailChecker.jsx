import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function EmailChecker() {
  const [email, setEmail] = useState("");
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

  // Email validation
  function validateEmail(em) {
    const simpleRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!simpleRegex.test(em)) {
      return { valid: false };
    }

    const domain = em.split("@")[1];

    return {
      valid: true,
      domain,
      isFreeProvider: ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"].includes(domain),
    };
  }

  async function handleCheck() {
    setResult(null);

    if (!email.trim()) {
      setResult({ error: "Enter an email address first." });
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

    const check = validateEmail(email);

    // Log to Supabase
    await supabase.from("lookup_logs").insert({
      user_id: userId,
      lookup_type: "email",
      value: email,
      is_safe: check.valid,
    });

    setLoading(false);
    setResult(check);
  }

  return (
    <section className="fade-in">
      <h2>Email Checker</h2>
      <p>Check email address formatting and provider type.</p>

      <div className="card" style={{ padding: "20px", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter an email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {/* FIXED: ensure handleCheck fires */}
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
          {loading ? "Checking…" : "Check Email"}
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
                ❌ Invalid email format. Please check again.
              </p>
            )}

            {result.valid && !result.error && (
              <>
                <p>
                  <strong>Domain:</strong> {result.domain}
                </p>
                <p>
                  <strong>Free Provider:</strong>{" "}
                  {result.isFreeProvider ? "Yes" : "No"}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
