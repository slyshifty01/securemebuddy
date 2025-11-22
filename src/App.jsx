import React, { useState } from "react";
import {
  FaHome,
  FaBookOpen,
  FaClipboardCheck,
  FaShieldAlt
} from "react-icons/fa";

const SECTIONS = {
  HOME: "HOME",
  LEARN: "LEARN",
  CHECKLISTS: "CHECKLISTS",
  RISK_HELPER: "RISK_HELPER",
};

// ================= LESSONS =================
const lessons = [
  {
    id: 1,
    title: "Passwords Made Simple",
    level: "Beginner",
    summary: "How to make strong passwords easily.",
    content: [
      "Use a passphrase instead of a single word.",
      "Never reuse passwords for important accounts.",
      "Turn on two-factor authentication (2FA) whenever possible.",
    ],
  },
  {
    id: 2,
    title: "Spotting Scams & Phishing",
    level: "Beginner",
    summary: "Learn how to avoid fake messages and scam links.",
    content: [
      "Be suspicious of messages that create urgency.",
      "Check the sender email carefully.",
      "Avoid clicking login links — go directly to the site.",
    ],
  },
  {
    id: 3,
    title: "Keeping Your Phone Safe",
    level: "Beginner",
    summary: "Simple ways to keep your device secure.",
    content: [
      "Use a PIN or biometric lock.",
      "Keep your device updated.",
      "Install apps only from official stores.",
    ],
  },
];

// ================= CHECKLISTS =================
const checklists = [
  {
    id: 1,
    title: "Account Safety Checklist",
    description: "Quick steps to protect your accounts.",
    items: [
      "Your email uses a strong password.",
      "2FA is turned on.",
      "You do not reuse passwords.",
      "You never share verification codes.",
      "Your banking apps require PIN/biometrics.",
    ],
  },
  {
    id: 2,
    title: "Device Safety Checklist",
    description: "Steps to keep your device safe.",
    items: [
      "Your device has a lock screen.",
      "Your device updates automatically.",
      "You only install trusted apps.",
      "Your photos/files are backed up.",
    ],
  },
];

function App() {
  const [activeSection, setActiveSection] = useState(SECTIONS.HOME);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [checklistProgress, setChecklistProgress] = useState({});
  const [riskAnswers, setRiskAnswers] = useState({
    hasStrongPasswords: null,
    uses2FA: null,
    clicksUnknownLinks: null,
    sharesDevice: null,
  });

  const handleChecklistToggle = (checklistId, index) => {
    setChecklistProgress((prev) => {
      const set = new Set(prev[checklistId] || []);
      set.has(index) ? set.delete(index) : set.add(index);
      return { ...prev, [checklistId]: [...set] };
    });
  };

  // ================= RISK CALCULATOR =================
  const calculateRisk = () => {
    const { hasStrongPasswords, uses2FA, clicksUnknownLinks, sharesDevice } =
      riskAnswers;

    if (
      hasStrongPasswords === null ||
      uses2FA === null ||
      clicksUnknownLinks === null ||
      sharesDevice === null
    ) {
      return {
        label: "Incomplete",
        message: "Answer all questions to see your risk level.",
      };
    }

    let score = 0;
    if (!hasStrongPasswords) score += 2;
    if (!uses2FA) score += 2;
    if (clicksUnknownLinks) score += 3;
    if (sharesDevice) score += 2;

    if (score <= 2)
      return { label: "Low Risk", message: "Your habits look good — keep it up!" };

    if (score <= 5)
      return {
        label: "Medium Risk",
        message: "A few improvements can help keep you safer.",
      };

    return {
      label: "High Risk",
      message:
        "You're in a higher-risk zone. Focus on strong passwords and caution with links.",
    };
  };

  const riskResult = calculateRisk();

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header fade-in">
        <img src="/logo.png" alt="SecureMeBuddy logo" className="app-logo" />
        <h1>SecureMeBuddy</h1>
        <p>Your friendly guide to staying safe online.</p>
      </header>

      {/* NAVIGATION */}
      <nav className="app-nav">
        <button className={activeSection === SECTIONS.HOME ? "active" : ""} onClick={() => setActiveSection(SECTIONS.HOME)}>
          <FaHome /> Home
        </button>
        <button className={activeSection === SECTIONS.LEARN ? "active" : ""} onClick={() => setActiveSection(SECTIONS.LEARN)}>
          <FaBookOpen /> Learn
        </button>
        <button className={activeSection === SECTIONS.CHECKLISTS ? "active" : ""} onClick={() => setActiveSection(SECTIONS.CHECKLISTS)}>
          <FaClipboardCheck /> Checklists
        </button>
        <button className={activeSection === SECTIONS.RISK_HELPER ? "active" : ""} onClick={() => setActiveSection(SECTIONS.RISK_HELPER)}>
          <FaShieldAlt /> Risk Helper
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="app-main fade-in">
        {activeSection === SECTIONS.HOME && <HomeSection />}
        {activeSection === SECTIONS.LEARN && (
          <LearnSection lessons={lessons} selectedLesson={selectedLesson} onSelectLesson={setSelectedLesson} />
        )}
        {activeSection === SECTIONS.CHECKLISTS && (
          <ChecklistSection checklists={checklists} checklistProgress={checklistProgress} onToggleItem={handleChecklistToggle} />
        )}
        {activeSection === SECTIONS.RISK_HELPER && (
          <RiskHelper riskAnswers={riskAnswers} setRiskAnswers={setRiskAnswers} riskResult={riskResult} />
        )}
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <small>SecureMeBuddy © 2025</small>
      </footer>
    </div>
  );
}

// ================= COMPONENTS =================

function HomeSection() {
  return (
    <section className="fade-in">
      <h2>Welcome</h2>
      <p>
        SecureMeBuddy is designed for people who say{" "}
        <strong>“I'm not good with technology.”</strong>
        Learn simple ways to stay safe online — without the tech jargon.
      </p>
    </section>
  );
}

function LearnSection({ lessons, selectedLesson, onSelectLesson }) {
  if (selectedLesson) {
    return (
      <section className="fade-in">
        <button onClick={() => onSelectLesson(null)}>← Back</button>
        <h2>{selectedLesson.title}</h2>
        <p><em>{selectedLesson.level}</em></p>
        <ol>
          {selectedLesson.content.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section className="fade-in">
      <h2>Learn the Basics</h2>
      <div className="card-grid">
        {lessons.map((lesson) => (
          <article key={lesson.id} className="card" onClick={() => onSelectLesson(lesson)}>
            <h3>{lesson.title}</h3>
            <p className="tag">{lesson.level}</p>
            <p>{lesson.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ChecklistSection({ checklists, checklistProgress, onToggleItem }) {
  return (
    <section className="fade-in">
      <h2>Safety Checklists</h2>
      <div className="card-grid">
        {checklists.map((list) => {
          const completed = checklistProgress[list.id]?.length || 0;
          const total = list.items.length;

          return (
            <article key={list.id} className="card checklist-card">
              <h3>{list.title}</h3>
              <p>{list.description}</p>
              <p>Progress: {completed} / {total}</p>

              <ul className="checklist-items">
                {list.items.map((item, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={checklistProgress[list.id]?.includes(index) || false}
                        onChange={() => onToggleItem(list.id, index)}
                      />
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

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

export default App;
