import React from "react";
import ReactDOM from "react-dom";
import "../styles/popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const PopUp = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <div className="popup-content">{children}</div>
      </div>
    </div>,
    document.getElementById("popup-root")
  );
};

export default PopUp;
