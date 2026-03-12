import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest, clearError } from '../../redux/slices/authSlice';
import { validateEmail, validatePassword } from '../../utils/validation';
import '../Login/Login.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (user) navigate('/');
    return () => dispatch(clearError());
  }, [user, navigate, dispatch]);

  const validate = () => {
    const errors = {};
    if (!form.name || form.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
    if (!validateEmail(form.email)) errors.email = 'Please enter a valid email';
    if (!validatePassword(form.password)) errors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(registerRequest({ name: form.name, email: form.email, password: form.password }));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">✈️ TravelBuddy</Link>
            <h2>Create your account</h2>
            <p>Start planning your dream trips today</p>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label><i className="fas fa-user me-2"></i>Full Name</label>
              <input
                type="text"
                className={`form-control auth-input ${formErrors.name ? 'is-invalid' : ''}`}
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
            </div>

            <div className="form-group">
              <label><i className="fas fa-envelope me-2"></i>Email Address</label>
              <input
                type="email"
                className={`form-control auth-input ${formErrors.email ? 'is-invalid' : ''}`}
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
            </div>

            <div className="form-group">
              <label><i className="fas fa-lock me-2"></i>Password</label>
              <input
                type="password"
                className={`form-control auth-input ${formErrors.password ? 'is-invalid' : ''}`}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
            </div>

            <div className="form-group">
              <label><i className="fas fa-lock me-2"></i>Confirm Password</label>
              <input
                type="password"
                className={`form-control auth-input ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              />
              {formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn btn-auth w-100" disabled={loading}>
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2"></span>Creating account...</>
              ) : (
                <><i className="fas fa-user-plus me-2"></i>Create Account</>
              )}
            </button>
          </form>

          <p className="auth-switch mt-3">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>

        <div className="auth-visual">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80" alt="Travel" />
          <div className="auth-visual-overlay">
            <h3>"Not all those who wander are lost."</h3>
            <p>— J.R.R. Tolkien</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
