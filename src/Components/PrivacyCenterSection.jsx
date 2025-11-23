function PrivacyCenterSection() {
  return (
    <section className="fade-in">
      <h2>Privacy Center</h2>
      <p>
        This area will guide you through removing your information from data
        brokers and reducing how much your devices listen, track, and suggest
        things based on your activity.
      </p>

      <div className="card-grid">
        <article className="card">
          <h3>Data Broker Removal</h3>
          <p>
            In the future, this section will walk you through how to remove your
            name, address, and other personal details from major data broker sites.
          </p>
          <ul>
            <li>Spokeo</li>
            <li>Whitepages</li>
            <li>BeenVerified</li>
            <li>Intelius</li>
            <li>And more…</li>
          </ul>
          <p>
            Placeholder: later, this will display a step-by-step checklist pulled
            from a database, with links and status.
          </p>
        </article>

        <article className="card">
          <h3>Stop Your Phone from “Listening”</h3>
          <p>
            This section will eventually give you detailed, screenshot-friendly
            instructions for:
          </p>
          <ul>
            <li>Turning off microphone access for apps</li>
            <li>Disabling “Hey Siri” or “Hey Google”</li>
            <li>Limiting ad tracking and personalized ads</li>
            <li>Reviewing app permissions regularly</li>
          </ul>
          <p>
            Placeholder: for now, this card shows what is planned. We’ll turn this
            into full guides in the How-To section.
          </p>
        </article>
      </div>
    </section>
  );
}

export default PrivacyCenterSection;
