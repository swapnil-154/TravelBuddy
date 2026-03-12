import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => (
  <div className="not-found-page">
    <div className="not-found-content">
      <div className="not-found-emoji">🗺️</div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! It seems like you've wandered off the beaten path. Let's get you back on track!</p>
      <div className="not-found-actions">
        <Link to="/" className="btn btn-home">
          <i className="fas fa-home me-2"></i>Back to Home
        </Link>
        <Link to="/destinations" className="btn btn-explore">
          <i className="fas fa-compass me-2"></i>Explore Destinations
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
