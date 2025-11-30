// src/dashboard/pages/SafetyCheckersPage.jsx
// Hybrid Neon + Modern UI Polish ✨
// Clean layout, neon accents, glowing SAFE/RISKY cards, and modern inputs.

import React, { useState } from "react";
import "./SafetyCheckersPage.css";

const FUNCTION_BASE_URL =
  import.meta.env.VITE_SUPABASE_FUNCTION_URL ||
  "https://fbqidnsnhhjaabynxdjd.functions.supabase.co";

export default function SafetyCheckersPage() {
  const [emailResult, setEmailResult] = useState(null);
  const [phoneResult, setPhoneResult] = useState(null);
  const [urlResult, setUrlResult] = useState(null);

  const [loading, setLoading] = useState({
    email: false,
    phone: false,
    url: false,
  });

  const [errors, setErrors] = useState({
    email: null,
    phone: null,
    url: null,
  });

  const DEMO_USER_ID = "demo-user-1";

  async function runChecker(type, value) {
    const endpoints = {
      email: "email-safety",
      phone: "phone-safety",
      url: "url-safety",
    };

    setLoading((p) => ({ ...p, [type]: true }));
    setErrors((p) => ({ ...p, [type]: null }));

    try {
      const res = await fetch(`${FUNCTION_BASE_URL}/${endpoints[type]}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: DEMO_USER_ID, [type]: value }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const data = await res.json();

      if (type === "email") setEmailResult(data);
      if (type === "phone") setPhoneResult(data);
      if (type === "url") setUrlResult(data);
    } catch (err) {
      setErrors((p) => ({ ...p, [type]: err.message }));
    } finally {
      setLoading((p) => ({ ...p, [type]: false }));
    }
  }

  return (
    <div className="safety-page">

      <div className="safety-header">
        <h1>Safety Checkers</h1>
        <p>
          Analyze emails, phone numbers, and URLs with SecureMeBuddy’s detection engine.
        </p>
      </div>

      <div className="safety-grid">

        <CheckerCard
          title="Email Safety Checker"
          hint="Detect scammy keywords, phishing indicators, and fraudulent patterns."
          type="email"
          placeholder="example@domain.com"
          loading={loading.email}
          onSubmit={(v) => runChecker("email", v)}
          error={errors.email}
          result={emailResult}
        />

        <CheckerCard
          title="Phone Safety Checker"
          hint="Analyze phone numbers for spam, robocalls, and scam risk."
          type="text"
          placeholder="555-123-4567"
          loading={loading.phone}
          onSubmit={(v) => runChecker("phone", v)}
          error={errors.phone}
          result={phoneResult}
        />

        <CheckerCard
          title="URL Safety Checker"
          hint="Scan websites for fake login pages, malicious redirects, and shady behavior."
          type="text"
          placeholder="https://example.com"
          loading={loading.url}
          onSubmit={(v) => runChecker("url", v)}
          error={errors.url}
          result={urlResult}
        />

      </div>
    </div>
  );
}

/* --- 💎 Sub-Components --- */

function CheckerCard({
  title,
  hint,
  type,
  placeholder,
  loading,
  onSubmit,
  error,
  result,
}) {
  const [value, setValue] = useState("");

  return (
    <div className="checker-card">

      <div className="checker-header">
        <h2>{title}</h2>
        <p>{hint}</p>
      </div>

      <div className="checker-input-row">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="checker-input"
        />

        <button
          disabled={loading || !value}
          onClick={() => onSubmit(value)}
          className="checker-btn"
        >
          {loading ? "Checking..." : "Run Check"}
        </button>
      </div>

      {error && <p className="checker-error">⚠️ {error}</p>}

      {!error && result && (
        <div
          className={
            result.is_safe
              ? "checker-result safe-glow"
              : "checker-result risky-glow"
          }
        >
          <h3>{result.is_safe ? "SAFE" : "RISKY"}</h3>
          <p>{result.is_safe
            ? "No suspicious indicators found."
            : "Warning: Risky patterns detected."}
          </p>
        </div>
      )}
    </div>
  );
}
