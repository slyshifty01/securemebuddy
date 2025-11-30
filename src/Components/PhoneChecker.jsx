import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function PhoneChecker() {
  const [phone, setPhone] = useState("");
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

  // Basic phone validation
  function validatePhone(input) {
    const digits = input.replace(/\D/g, "");

    if (digits.length < 10 || digits.length > 15) {
      return { valid: false };
    }

    let country = "Unknown";
    if (digits.startsWith("1")) country = "USA / Canada";

    return {
      valid: true,
      digits,
      country,
    };
  }

  async function handleCheck() {
    setResult(null);

    if (!phone.trim()) {
      setResult({ error: "Enter a phone number first." });
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

    const check = validatePhone(phone);

    // Log to Supabase
    await supabase.from("lookup_logs").insert({
      user_id: userId,
      lookup_type: "phone",
      value: phone,
      is_safe: check.valid,
    });

    setLoading(false);
    setResult(check);
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

            {!result.error && !result.valid && (
              <p style={{ color: "red" }}>❌ Invalid phone number.</p>
            )}

            {result.valid && !result.error && (
              <>
                <p>
                  <strong>Digits:</strong> {result.digits}
                </p>
                <p>
                  <strong>Possible Country:</strong> {result.country}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
