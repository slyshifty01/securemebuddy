import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function EmailChecker() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // 🔵 RATE-LIMIT CHECK
  async function checkLimit() {
    const endpoint =
      "https://fbqidnsnhhjaabynxdjd.supabase.co/functions/v1/verify-lookup-limit";

    const response = await fetch(endpoint);
    const data = await response.json();
    return data.allowed;
  }

  // 🔵 LOG LOOKUP
  async function logLookup(emailValue) {
    await supabase.from("lookup_logs").insert({
      ip_address: "client-ip",
      lookup_type: "email",
      searched_value: emailValue,
    });
  }

  // 🔵 VALIDATE EMAIL FORMAT
  function validateEmail(em) {
    const simpleRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!simpleRegex.test(em)) {
      return { valid: false };
    }

    const domain = em.split("@")[1];

    return {
      valid: true,
      domain,
      isFreeProvider:
        ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"].includes(
          domain
        ),
    };
  }

  async function handleCheck() {
    setResult(null);

    if (!email.trim()) {
      setResult({ error: "Enter an email address first." });
      return;
    }

    // 1️⃣ RATE LIMIT
    const allowed = await checkLimit();
    if (!allowed) {
      setResult({
        error:
          "You've reached your free daily limit. Upgrade to Pro for unlimited lookups.",
      });
      return;
    }

    setLoading(true);

    // 2️⃣ VALIDATE
    const res = validateEmail(email);

    // 3️⃣ LOG LOOKUP
    await logLookup(email);

    setLoading(false);

    // 4️⃣ SAVE RESULT
    setResult(res);
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

            {result.valid && !result.error && (
              <>
                <p><strong>Domain:</strong> {result.domain}</p>
                <p>
                  <strong>Free Email Provider:</strong>{" "}
                  {result.isFreeProvider ? "Yes" : "No"}
                </p>
              </>
            )}

            {!result.valid && !result.error && (
              <p style={{ color: "red" }}>
                ❌ Invalid email format. Please check again.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
