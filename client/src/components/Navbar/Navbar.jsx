import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-icon">✈️</span>
          <span className="brand-text">TravelBuddy</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/destinations" onClick={() => setMenuOpen(false)}>
                <i className="fas fa-map-marker-alt me-1"></i>Destinations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/flights" onClick={() => setMenuOpen(false)}>
                <i className="fas fa-plane me-1"></i>Flights
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/hotels" onClick={() => setMenuOpen(false)}>
                <i className="fas fa-hotel me-1"></i>Hotels
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/blog" onClick={() => setMenuOpen(false)}>
                <i className="fas fa-blog me-1"></i>Blog
              </NavLink>
            </li>
          </ul>

          <div className="navbar-actions d-flex align-items-center gap-3">
            {user ? (
              <div className="dropdown">
                <button className="btn btn-user dropdown-toggle" data-bs-toggle="dropdown">
                  <div className="user-avatar">
                    {user.avatar && user.avatar.startsWith('http') ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <span>{user.name?.charAt(0)?.toUpperCase()}</span>
                    )}
                  </div>
                  <span className="user-name d-none d-lg-inline">{user.name?.split(' ')[0]}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/my-trips"><i className="fas fa-suitcase me-2"></i>My Trips</Link></li>
                  <li><Link className="dropdown-item" to="/profile"><i className="fas fa-user me-2"></i>Profile</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-nav" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-nav-primary" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
