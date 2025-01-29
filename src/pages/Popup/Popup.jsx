import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Popup.css";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { platform } = location.state;
  console.log(platform);
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 300);
  }, []);

  const handleContinue = () => {
    navigate("/user-dashboard", { state: { platform } });
  };

  return (
    <div className="div-pop">
      <div className={`pop-payment-card ${showPopup ? "popup" : ""}`}>
        <div className="pop-payment-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="50"
            height="50"
            className="tick-animate"
          >
            <circle cx="12" cy="12" r="12" fill="#4CAF50" />
            <path
              fill="white"
              d="M9.707 16.707L5.293 12.293 6.707 10.879 9.707 13.879 17.293 6.293 18.707 7.707z"
            />
          </svg>
        </div>
        <h2 className="pop-payment-title">Payment Complete</h2>
        <p className="pop-payment-message">
          Thank you, your subscription payment has been{" "}
          <strong>PROCESSED</strong>.
        </p>
        <button className="pop-payment-button" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Popup;
