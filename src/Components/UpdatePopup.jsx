import { useEffect, useState } from "react";
import { hasDismissedPopup, recordPopupDismissal } from "../services/popupService";
import "./PopupStyles.css";

export default function UpdatePopup() {
  const [show, setShow] = useState(false);
  const popupName = "update_popup";
  const userId =
    localStorage.getItem("smb_user_id") || crypto.randomUUID();

  useEffect(() => {
    check();
  }, []);

  async function check() {
    const { data, error } = await hasDismissedPopup(userId, popupName);
    if (error) {
      console.error("UpdatePopup check error:", error);
      return;
    }
    // later we can add version-based logic here
    if (!data) setShow(true);
  }

  async function dismiss() {
    setShow(false);
    const { error } = await recordPopupDismissal(userId, popupName);
    if (error) console.error("UpdatePopup dismiss error:", error);
  }

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2 className="popup-title">
          <span className="highlight">New tools</span>
          <span>just landed</span>
        </h2>
        <div className="popup-body">
          <p>
            We’ve added improvements and new safety tools to help you spot scams
            faster and protect your accounts more easily.
          </p>
          <p className="popup-caption">
            Check out the <strong>Lookup Tools</strong> and{" "}
            <strong>Guides</strong> sections to explore what’s new.
          </p>
        </div>
        <div className="popup-footer">
          <button className="popup-primary-btn" onClick={dismiss}>
            Awesome!
          </button>
        </div>
      </div>
    </div>
  );
}
