// src/components/Loading.jsx
import React from "react";
import "./loading.css";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loading-overlay">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Loading;
