import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function PhoneChecker() {
  const [phone, setPhone] = useState("");
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
  async function logLookup(phoneValue) {
    await supabase.from("lookup_logs").insert({
      ip_address: "client-ip",
      lookup_type: "phone",
      searched_value: phoneValue,
    });
  }

  // 🔵 SIMPLE PHONE SANITY CHECK
  function validatePhone(num) {
    const clean = num.replace(/\D/g, ""); // remove non-digits

    if (clean.length < 10 || clean.length > 15) {
      return { valid: false };
    }

    return {
      valid: true,
      digits: clean,
      possibleCountry: clean.length === 11 && clean.startsWith("1") ? "USA" : "Unknown",
    };
  }

  async function handleCheck() {
    setResult(null);

    if (!phone.trim()) {
      setResult({ error: "Enter a phone number first." });
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
    const res = validatePhone(phone);

    // 3️⃣ LOG LOOKUP
    await logLookup(phone);

    setLoading(false);

    // 4️⃣ SAVE RESULT
    setResult(res);
  }

  return (
    <section className="fade-in">
      <h2>Phone Number Checker</h2>
      <p>Check if a phone number is formatted correctly.</p>

      <div className="card" style={{ padding: "20px", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter a phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          {loading ? "Checking…" : "Check Number"}
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
                <p><strong>Digits:</strong> {result.digits}</p>
                <p><strong>Possible Country:</strong> {result.possibleCountry}</p>
              </>
            )}

            {!result.valid && !result.error && (
              <p style={{ color: "red" }}>
                ❌ Not a valid phone number format.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
