// src/components/CustomAlert.jsx
import React from "react";
import "./customAlert.css";

const CustomAlert = ({ message, type = "success", onClose }) => {
  if (!message) return null;

  return (
    <div className="alert-overlay">
      <div className={`custom-alert ${type}`}>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default CustomAlert;