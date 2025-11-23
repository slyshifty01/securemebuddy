import React, { useState } from "react";
import {
  FaHome,
  FaBookOpen,
  FaClipboardCheck,
  FaShieldAlt,
  FaExclamationTriangle,
  FaListAlt,
  FaGraduationCap,
  FaToolbox,
  FaUserShield,
  FaSearch,          // NEW icon for Lookup Tools
} from "react-icons/fa";

import HomeSection from "./Components/HomeSection";
import LearnSection from "./Components/LearnSection";
import ChecklistSection from "./Components/ChecklistSection";
import RiskHelper from "./Components/RiskHelper";
import ScamReportsSection from "./Components/ScamReportsSection";
import GlossarySection from "./Components/GlossarySection";
import GuidesSection from "./Components/GuidesSection";
import SoftwareSection from "./Components/SoftwareSection";
import PrivacyCenterSection from "./Components/PrivacyCenterSection";
import LookupToolsSection from "./Components/LookupToolsSection"; // NEW

const SECTIONS = {
  HOME: "HOME",
  LEARN: "LEARN",
  CHECKLISTS: "CHECKLISTS",
  RISK_HELPER: "RISK_HELPER",
  SCAM_REPORTS: "SCAM_REPORTS",
  GLOSSARY: "GLOSSARY",
  GUIDES: "GUIDES",
  SOFTWARE: "SOFTWARE",
  PRIVACY: "PRIVACY",
  LOOKUP_TOOLS: "LOOKUP_TOOLS",   // NEW
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
      return {
        label: "Low Risk",
        message: "Your habits look good — keep it up!",
      };

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
        <button
          className={activeSection === SECTIONS.HOME ? "active" : ""}
          onClick={() => setActiveSection(SECTIONS.HOME)}
        >
          <FaHome /> Home
        </button>

        <button
          className={activeSection === SECTIONS.LEARN ? "active" : ""}
          onClick={() => setActiveSection(SECTIONS.LEARN)}
        >
          <FaBookOpen /> Learn
        </button>

        <button
          className={activeSection === SECTIONS.CHECKLISTS ? "active" : ""}
          onClick={() => setActiveSection(SECTIONS.CHECKLISTS)}
        >
          <FaClipboardCheck /> Checklists
        </button>

        <button
          className={activeSection === SECTIONS.RISK_HELPER ? "active" : ""}
          onClick={() => setActiveSection(SECTIONS.RISK_HELPER)}
        >
          <FaShieldAlt /> Risk Helper
        </button>

        <button
          className={activeSection === SECTIONS.SCAM_REPORTS ? "active" : ""}
          onClick={() => setActiveSection(SECTIONS.SCAM_REPORTS)}
        >
          <FaExclamationTriangle /> Scam Reports
        </button>

        <button
          className={activeSection === SECTIONS.GLOSSARY ? "active" : ""}
          onClick={() => setActiveSection(SECTIONS.GLOSSARY)}
        >
          <FaListAlt /> Glossary
        </button>

        <button
          className={activeSection === SECTIONS.GUIDES ? "active" : ""}
          onClick={() => setActiveSection(SECTIONS.GUIDES)}
        >
          <FaGraduationCap /> Guides
        </button>

        <button
          className={activeSection === SECTIONS.SOFTWARE ? "active" : ""}
          onClick={() => setActiveSection(SECTIONS.SOFTWARE)}
        >
          <FaToolbox /> Software
        </button>

        <button
          className={activeSection === SECTIONS.PRIVACY ? "active" : ""}
          onClick={() => setActiveSection(SECTIONS.PRIVACY)}
        >
          <FaUserShield /> Privacy Center
        </button>

        {/* NEW: LOOKUP TOOLS */}
        <button
          className={activeSection === SECTIONS.LOOKUP_TOOLS ? "active" : ""}
          onClick={() => setActiveSection(SECTIONS.LOOKUP_TOOLS)}
        >
          <FaSearch /> Lookup Tools
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="app-main fade-in">
        {activeSection === SECTIONS.HOME && <HomeSection />}

        {activeSection === SECTIONS.LEARN && (
          <LearnSection
            lessons={lessons}
            selectedLesson={selectedLesson}
            onSelectLesson={setSelectedLesson}
          />
        )}

        {activeSection === SECTIONS.CHECKLISTS && (
          <ChecklistSection
            checklists={checklists}
            checklistProgress={checklistProgress}
            onToggleItem={handleChecklistToggle}
          />
        )}

        {activeSection === SECTIONS.RISK_HELPER && (
          <RiskHelper
            riskAnswers={riskAnswers}
            setRiskAnswers={setRiskAnswers}
            riskResult={riskResult}
          />
        )}

        {activeSection === SECTIONS.SCAM_REPORTS && <ScamReportsSection />}

        {activeSection === SECTIONS.GLOSSARY && <GlossarySection />}

        {activeSection === SECTIONS.GUIDES && <GuidesSection />}

        {activeSection === SECTIONS.SOFTWARE && <SoftwareSection />}

        {activeSection === SECTIONS.PRIVACY && <PrivacyCenterSection />}

        {activeSection === SECTIONS.LOOKUP_TOOLS && <LookupToolsSection />}
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <small>SecureMeBuddy © 2025</small>
      </footer>
    </div>
  );
}

export default App;
