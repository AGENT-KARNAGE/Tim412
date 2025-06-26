// src/components/NotFound.jsx
import React from 'react';
import './NotFound.css'; // 👈 Link to external CSS

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h2>404 - Page Not Found 😢</h2>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFound;
