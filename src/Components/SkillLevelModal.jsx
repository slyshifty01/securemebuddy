import React from "react";
import "./SkillLevelModal.css";

const SkillLevelModal = ({ onClose, onLevelSelect }) => {
  const handleChoice = (level) => {
    // Save so modal doesn't show again
    localStorage.setItem("smb_skill_level", level);

    // Tell App.jsx which level they picked
    if (onLevelSelect) {
      onLevelSelect(level);
    }

    onClose();
  };

  return (
    <div className="smb-overlay">
      <div className="smb-modal">
        <img src="/Buddy.png" alt="Buddy Mascot" className="smb-mascot" />

        <h2 className="smb-title">What’s your tech comfort level?</h2>

        <p className="smb-subtext">
          Don’t worry — this just helps us guide you to the right tools.
        </p>

        <div className="smb-buttons">
          <button
            className="smb-btn beginner"
            onClick={() => handleChoice("beginner")}
          >
            Beginner
          </button>

          <button
            className="smb-btn intermediate"
            onClick={() => handleChoice("intermediate")}
          >
            Intermediate
          </button>

          <button
            className="smb-btn advanced"
            onClick={() => handleChoice("advanced")}
          >
            Advanced
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillLevelModal;
