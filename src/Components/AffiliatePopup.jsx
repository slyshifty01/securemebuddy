import { useEffect, useState } from "react";
import { hasDismissedPopup, recordPopupDismissal } from "../services/popupService";
import "./PopupStyles.css";

export default function AffiliatePopup() {
  const [show, setShow] = useState(false);
  const popupName = "affiliate_popup";
  const userId =
    localStorage.getItem("smb_user_id") || crypto.randomUUID();

  useEffect(() => {
    check();
  }, []);

  async function check() {
    const { data, error } = await hasDismissedPopup(userId, popupName);
    if (error) {
      console.error("AffiliatePopup check error:", error);
      return;
    }
    if (!data) setShow(true);
  }

  async function dismiss() {
    setShow(false);
    const { error } = await recordPopupDismissal(userId, popupName);
    if (error) console.error("AffiliatePopup dismiss error:", error);
  }

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2 className="popup-title">
          <span>Support</span>
          <span className="highlight">SecureMeBuddy</span>
        </h2>
        <div className="popup-body">
          <p>
            Some tools we recommend may use affiliate links. If you choose to
            buy through them, it helps support this project at no extra cost to
            you.
          </p>
          <p className="popup-caption">
            We only highlight tools we trust for safety and usefulness.
          </p>
        </div>
        <div className="popup-footer">
          <button className="popup-primary-btn" onClick={dismiss}>
            I understand
          </button>
        </div>
      </div>
    </div>
  );
}

