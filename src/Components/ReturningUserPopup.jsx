import { useEffect, useState } from "react";
import { recordPopupDismissal } from "../services/popupService";
import "./PopupStyles.css";

export default function ReturningUserPopup() {
  const [show, setShow] = useState(false);
  const popupName = "returning_user_popup";
  const userId =
    localStorage.getItem("smb_user_id") || crypto.randomUUID();

  useEffect(() => {
    localStorage.setItem("smb_user_id", userId);

    const lastVisit = localStorage.getItem("smb_last_visit");
    const now = Date.now();
    localStorage.setItem("smb_last_visit", String(now));

    if (!lastVisit) return; // first visit

    const hoursSince = (now - Number(lastVisit)) / (1000 * 60 * 60);

    // Show this only if it's been more than 24 hours
    if (hoursSince > 24) {
      setShow(true);
    }
  }, []);

  async function dismiss() {
    setShow(false);
    const { error } = await recordPopupDismissal(userId, popupName);
    if (error) console.error("ReturningUserPopup dismiss error:", error);
  }

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2 className="popup-title">
          <span>Welcome back,</span>
          <span className="highlight">friend 👋</span>
        </h2>
        <div className="popup-body">
          <p>
            Great to see you again. Want to pick up where you left off or try a
            new tool today?
          </p>
          <p className="popup-caption">
            Hint: The <strong>Risk Helper</strong> and{" "}
            <strong>Lookup Tools</strong> are always good quick wins.
          </p>
        </div>
        <div className="popup-footer">
          <button className="popup-primary-btn" onClick={dismiss}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
