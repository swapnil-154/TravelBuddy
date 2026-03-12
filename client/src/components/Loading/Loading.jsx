import React from 'react';
import './Loading.css';

const Loading = ({ fullScreen = false, text = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="loading-content">
          <div className="loading-plane">✈️</div>
          <div className="loading-spinner"></div>
          <p className="loading-text">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <p className="mt-3 text-muted">{text}</p>}
    </div>
  );
};

export default Loading;
