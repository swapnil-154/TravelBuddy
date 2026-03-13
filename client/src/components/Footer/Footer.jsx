import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="footer-brand">
                <h3><span>✈️</span> TravelBuddy</h3>
                <p>Your ultimate travel companion. Plan trips, discover destinations, book hotels & flights, and share your travel stories with the world.</p>
                <div className="social-links">
                  <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                  <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                  <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                  <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                  <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-6">
              <h5 className="footer-title">Explore</h5>
              <ul className="footer-links">
                <li><Link to="/destinations">Destinations</Link></li>
                <li><Link to="/flights">Flights</Link></li>
                <li><Link to="/hotels">Hotels</Link></li>
                <li><Link to="/blog">Travel Blog</Link></li>
                <li><Link to="/my-trips">My Trips</Link></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 col-6">
              <h5 className="footer-title">Company</h5>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press</Link></li>
                <li><Link to="/partners">Partners</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6">
              <h5 className="footer-title">Newsletter</h5>
              <p className="footer-desc">Get the best travel deals and destination inspiration in your inbox.</p>
              <div className="newsletter-form">
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <button className="btn btn-newsletter">Subscribe</button>
                </div>
              </div>
              <div className="mt-3">
                <p className="footer-desc mb-2"><strong>Download our app:</strong></p>
                <div className="d-flex gap-2">
                  <span className="app-badge"><i className="fab fa-apple me-1"></i> App Store</span>
                  <span className="app-badge"><i className="fab fa-google-play me-1"></i> Play Store</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p>&copy; {new Date().getFullYear()} TravelBuddy. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <Link to="/privacy">Privacy Policy</Link>
              <span className="mx-2">|</span>
              <Link to="/terms">Terms of Service</Link>
              <span className="mx-2">|</span>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
