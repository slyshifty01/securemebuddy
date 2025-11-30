function RiskHelper({
  riskAnswers = {},        // default to empty object
  setRiskAnswers = () => {},  // default to no-op
  riskResult = { label: "Unknown", message: "No data yet." } // safe default
}) {
  // Small helper component
  const Question = ({ text, field, yes = "Yes", no = "No" }) => (
    <div className="question-card">
      <p>{text}</p>
      <div className="button-group">
        <button
          className={riskAnswers[field] === true ? "selected" : ""}
          onClick={() => setRiskAnswers({ ...riskAnswers, [field]: true })}
        >
          {yes}
        </button>

        <button
          className={riskAnswers[field] === false ? "selected" : ""}
          onClick={() => setRiskAnswers({ ...riskAnswers, [field]: false })}
        >
          {no}
        </button>
      </div>
    </div>
  );

  // Guard fallback if riskResult is missing or malformed
  const safeLabel = riskResult?.label ?? "Unknown";
  const safeMessage = riskResult?.message ?? "No data available.";

  const riskClass =
    safeLabel === "Low Risk"
      ? "risk-low"
      : safeLabel === "Medium Risk"
      ? "risk-medium"
      : safeLabel === "High Risk"
      ? "risk-high"
      : "";

  return (
    <section className="fade-in">
      <h2>Risk Helper</h2>

      <Question text="Do you use strong passwords?" field="hasStrongPasswords" />
      <Question text="Do you use 2FA on important accounts?" field="uses2FA" />
      <Question
        text="Do you click links you're unsure of?"
        field="clicksUnknownLinks"
        yes="Yes, sometimes"
        no="No, I'm careful"
      />
      <Question text="Does anyone else use your device?" field="sharesDevice" />

      <div className={`risk-result ${riskClass}`}>
        <h3>{safeLabel}</h3>
        <p>{safeMessage}</p>
      </div>
    </section>
  );
}

export default RiskHelper;
