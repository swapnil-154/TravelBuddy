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
                  <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                  <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
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
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Partners</a></li>
                <li><a href="#">Contact</a></li>
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
                  <a href="#" className="app-badge"><i className="fab fa-apple me-1"></i> App Store</a>
                  <a href="#" className="app-badge"><i className="fab fa-google-play me-1"></i> Play Store</a>
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
              <a href="#">Privacy Policy</a>
              <span className="mx-2">|</span>
              <a href="#">Terms of Service</a>
              <span className="mx-2">|</span>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
