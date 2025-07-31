import React from "react";
import "../styles/LoadingIndicator.css"; // Optional styling

const LoadingIndicator = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingIndicator;
