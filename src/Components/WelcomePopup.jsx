import { useEffect, useState } from "react";
import { hasDismissedPopup, recordPopupDismissal } from "../services/popupService";
import "./PopupStyles.css";

export default function WelcomePopup() {
  const [show, setShow] = useState(false);
  const popupName = "welcome_popup";

  const userId =
    localStorage.getItem("smb_user_id") || crypto.randomUUID();

  useEffect(() => {
    localStorage.setItem("smb_user_id", userId);
    check();
  }, []);

  async function check() {
    const { data, error } = await hasDismissedPopup(userId, popupName);
    if (error) {
      console.error("WelcomePopup check error:", error);
      setShow(true); // fail-open in dev
      return;
    }
    if (!data) setShow(true);
  }

  async function dismiss() {
    setShow(false);
    const { error } = await recordPopupDismissal(userId, popupName);
    if (error) console.error("WelcomePopup dismiss error:", error);
  }

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2 className="popup-title">
          <span>Welcome to</span>
          <span className="highlight">SecureMeBuddy</span>
        </h2>
        <div className="popup-body">
          <p>
            I’ll guide you through staying safer online with simple tools,
            checklists, and clear explanations. You’re in the right place. 💙
          </p>
          <p className="popup-caption">
            Tip: Start with <strong>Learn</strong> or try the{" "}
            <strong>Risk Helper</strong> to see where you stand.
          </p>
        </div>
        <div className="popup-footer">
          <button className="popup-primary-btn" onClick={dismiss}>
            Let&apos;s get started
          </button>
        </div>
      </div>
    </div>
  );
}

