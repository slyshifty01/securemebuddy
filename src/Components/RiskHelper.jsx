function RiskHelper({ riskAnswers, setRiskAnswers, riskResult }) {
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

      <div
        className={
          "risk-result " +
          (riskResult.label === "Low Risk"
            ? "risk-low"
            : riskResult.label === "Medium Risk"
            ? "risk-medium"
            : riskResult.label === "High Risk"
            ? "risk-high"
            : "")
        }
      >
        <h3>{riskResult.label}</h3>
        <p>{riskResult.message}</p>
      </div>
    </section>
  );
}

export default RiskHelper;
