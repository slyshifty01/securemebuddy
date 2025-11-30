import React, { useState, useEffect } from "react";

// PUBLIC NAVBAR (new)
import PublicNavbar from "./PublicNavBar.jsx";


// Sections (public site content)
import HomeSection from "./HomeSection.jsx";
import LearnSection from "./LearnSection.jsx";
import ChecklistSection from "./ChecklistSection.jsx";
import LookupToolsSection from "./LookupToolsSection.jsx";
import RiskHelper from "./RiskHelper.jsx";
import ScamReportsSection from "./ScamReportsSection.jsx";
import PrivacyCenterSection from "./PrivacyCenterSection.jsx";
import SoftwareSection from "./SoftwareSection.jsx";
import GuidesSection from "./GuidesSection.jsx";
import GlossarySection from "./GlossarySection.jsx";

// Popups / Modals
import SkillLevelModal from "./SkillLevelModal.jsx";
import WelcomePopup from "./WelcomePopup.jsx";
import ReturningUserPopup from "./ReturningUserPopup.jsx";

// Page Styles
import "./HomePage.css";

export default function HomePage() {
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skillLevel, setSkillLevel] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("smb_skill_level");
    if (!saved) {
      setShowSkillModal(true);
    } else {
      setSkillLevel(saved);
    }
  }, []);

  return (
    <div className="homepage-container">
      {/* Header / Navbar */}
      <PublicNavbar />

      {/* Onboarding Modals */}
      {showSkillModal && (
        <SkillLevelModal
          onClose={() => setShowSkillModal(false)}
          onLevelSelect={(level) => setSkillLevel(level)}
        />
      )}

      {/* Only show returning popups if user has a skill level */}
      {skillLevel && (
        <>
          <WelcomePopup />
          <ReturningUserPopup />
        </>
      )}

      {/* MAIN HOMEPAGE CONTENT */}
      <main className="homepage-content">
        <HomeSection />
        <LearnSection />
        <ChecklistSection />
        <LookupToolsSection />
        <RiskHelper />
        <ScamReportsSection />
        <GuidesSection />
        <GlossarySection />
        <SoftwareSection />
        <PrivacyCenterSection />
      </main>
    </div>
  );
}
