import React from "react";
import ReactDOM from "react-dom";
import "../assets/css/Popup.css";

const Popup = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>,
    document.getElementById("popup-root") //
  );
};

export default Popup;
