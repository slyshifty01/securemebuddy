import { useEffect, useState } from "react";
import { hasDismissedPopup, recordPopupDismissal } from "../services/popupService";
import "./PopupStyles.css";

export default function CookiePopup() {
  const [show, setShow] = useState(false);
  const popupName = "cookie_popup";
  const userId =
    localStorage.getItem("smb_user_id") || crypto.randomUUID();

  useEffect(() => {
    localStorage.setItem("smb_user_id", userId);
    check();
  }, []);

  async function check() {
    const { data, error } = await hasDismissedPopup(userId, popupName);
    if (error) {
      console.error("CookiePopup check error:", error);
      return;
    }
    if (!data) setShow(true);
  }

  async function accept() {
    setShow(false);
    const { error } = await recordPopupDismissal(userId, popupName);
    if (error) console.error("CookiePopup dismiss error:", error);
  }

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2 className="popup-title">
          <span className="highlight">Cookies</span>
          <span>& privacy</span>
        </h2>
        <div className="popup-body">
          <p>
            SecureMeBuddy uses basic cookies and storage to remember your skill
            level, progress, and preferences. No creepy tracking. No selling
            your data. Ever.
          </p>
          <p className="popup-caption">
            You can clear this any time by wiping your browser data.
          </p>
        </div>
        <div className="popup-footer">
          <button className="popup-primary-btn" onClick={accept}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
