import React from "react";
import URLChecker from "./URLChecker";
import PhoneChecker from "./PhoneChecker";
import EmailChecker from "./EmailChecker";

function LookupToolsSection() {
  return (
    <section className="fade-in">
      <h2>Lookup Tools</h2>
      <p>
        Use these tools to quickly check website addresses, phone numbers, and
        email formats. Free lookups are limited per day to help prevent abuse.
      </p>

      <div className="card-grid" style={{ marginTop: "20px" }}>
        <div className="card">
          <URLChecker />
        </div>

        <div className="card">
          <PhoneChecker />
        </div>

        <div className="card">
          <EmailChecker />
        </div>
      </div>
    </section>
  );
}

export default LookupToolsSection;
