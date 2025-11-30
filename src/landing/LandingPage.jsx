// src/landing/LandingPage.jsx
// Public-facing landing page (neutral, trust-focused, with soft gold accents)

import PublicFooter from "../Components/PublicFooter";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-container">

      {/* ======================================
          HERO SECTION
      ======================================= */}
      <section className="landing-hero">
        <div className="hero-inner">

          {/* LOGO ADDED HERE */}
          <img 
            src="/logo.png" 
            alt="SecureMeBuddy Logo" 
            className="landing-logo"
          />

          <div className="hero-eyebrow">Friendly online safety tools</div>

          <h1>Stay Safer Online With SecureMeBuddy</h1>

          <p className="hero-subtext">
            SecureMeBuddy helps you check emails, phone numbers, and websites for
            scams, fraud, and safety risks. Simple, privacy-first, and designed for
            everyday people and small businesses.
          </p>

          <div className="hero-badges">
            <span className="hero-badge hero-badge-gold">No tracking or ads</span>
            <span className="hero-badge">Privacy-first design</span>
          </div>

          <div className="hero-buttons">
            <a href="#tools" className="hero-btn-primary">Explore Safety Tools</a>
            <a href="/trust" className="hero-btn-secondary">How We Protect You</a>
          </div>
        </div>
      </section>

      {/* ======================================
          FEATURES SECTION
      ======================================= */}
      <section id="tools" className="landing-features">
        <h2>What You Can Do Here</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon feature-icon-email" aria-hidden="true" />
            <h3>Email Safety Check</h3>
            <p>
              Paste an email or subject line to see if it shows signs of phishing,
              scams, or risky language before you respond.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon feature-icon-phone" aria-hidden="true" />
            <h3>Phone Number Lookup</h3>
            <p>
              Check unknown numbers before you call or text back. Filter out spam,
              robocalls, and common scam patterns.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon feature-icon-link" aria-hidden="true" />
            <h3>Website / Link Check</h3>
            <p>
              Not sure if a link is safe? Get a quick safety overview before opening
              pages that might be fake or harmful.
            </p>
          </div>

        </div>
      </section>

      {/* ======================================
          TRUST SECTION
      ======================================= */}
      <section className="landing-trust">
        <h2>Why People Trust SecureMeBuddy</h2>

        <ul className="trust-list">
          <li><span className="highlight">No tracking cookies</span> or hidden analytics that follow you around.</li>
          <li><span className="highlight">No selling of data</span> to advertisers or data brokers.</li>
          <li>Clear, calm safety explanations instead of fear-based messaging.</li>
          <li>Tools designed for real people, not just security experts.</li>
          <li>Built with privacy and safety at the center from day one.</li>
        </ul>
      </section>

      {/* ======================================
          ABOUT SECTION
      ======================================= */}
      <section className="landing-about">
        <h2>Our Mission</h2>
        <p>
          Digital safety should not feel intimidating. SecureMeBuddy focuses on
          helping people understand risks in plain language, so they can make their
          own informed choices online. We keep things honest, practical, and as
          simple as possible.
        </p>
      </section>

      {/* ======================================
          FOOTER
      ======================================= */}
      <PublicFooter />
    </div>
  );
}
