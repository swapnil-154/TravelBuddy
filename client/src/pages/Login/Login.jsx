import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, clearError } from '../../redux/slices/authSlice';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (user) navigate('/');
    return () => dispatch(clearError());
  }, [user, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(form));
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">✈️ TravelBuddy</Link>
            <h2>Welcome back!</h2>
            <p>Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label><i className="fas fa-envelope me-2"></i>Email Address</label>
              <input
                type="email"
                className="form-control auth-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <div className="d-flex justify-content-between">
                <label><i className="fas fa-lock me-2"></i>Password</label>
                <span className="forgot-link">Forgot password?</span>
              </div>
              <input
                type="password"
                className="form-control auth-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-auth w-100" disabled={loading}>
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2"></span>Signing in...</>
              ) : (
                <><i className="fas fa-sign-in-alt me-2"></i>Sign In</>
              )}
            </button>
          </form>

          <div className="demo-credentials">
            <p><strong>Demo:</strong> admin@travelbuddy.com / Admin@123</p>
          </div>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Sign up free</Link>
          </p>
        </div>

        <div className="auth-visual">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" alt="Travel" />
          <div className="auth-visual-overlay">
            <h3>"The world is a book, and those who do not travel read only one page."</h3>
            <p>— Saint Augustine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
