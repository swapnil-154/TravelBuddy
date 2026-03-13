import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  forgotPasswordRequest,
  resetPasswordRequest,
  clearError,
  clearMessage,
} from '../../redux/slices/authSlice';
import '../Login/Login.css';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.auth);

  const [step, setStep] = useState(1); // 1 = email, 2 = OTP + new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (message && step === 1) {
      setStep(2);
    }
    if (message && step === 2) {
      // Password reset successful, redirect to login after a short delay
      const timer = setTimeout(() => navigate('/login'), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, step, navigate]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(clearMessage());
    dispatch(forgotPasswordRequest({ email }));
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(clearMessage());

    if (password !== confirmPassword) {
      return;
    }

    dispatch(resetPasswordRequest({ email, otp, password }));
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">✈️ TravelBuddy</Link>
            <h2>{step === 1 ? 'Forgot Password?' : 'Reset Password'}</h2>
            <p>
              {step === 1
                ? 'Enter your email and we\'ll send you an OTP to reset your password'
                : 'Enter the OTP sent to your email and your new password'}
            </p>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          {message && (
            <div className="alert alert-success d-flex align-items-center gap-2">
              <i className="fas fa-check-circle"></i> {message}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="auth-form" autoComplete="off">
              <div className="form-group">
                <label><i className="fas fa-envelope me-2"></i>Email Address</label>
                <input
                  type="email"
                  className="form-control auth-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>

              <button type="submit" className="btn btn-auth w-100" disabled={loading}>
                {loading ? (
                  <><span className="spinner-border spinner-border-sm me-2"></span>Sending OTP...</>
                ) : (
                  <><i className="fas fa-paper-plane me-2"></i>Send OTP</>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="auth-form" autoComplete="off">
              <div className="form-group">
                <label><i className="fas fa-key me-2"></i>OTP Code</label>
                <input
                  type="text"
                  className="form-control auth-input"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label><i className="fas fa-lock me-2"></i>New Password</label>
                <input
                  type="password"
                  className="form-control auth-input"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>

              <div className="form-group">
                <label><i className="fas fa-lock me-2"></i>Confirm Password</label>
                <input
                  type="password"
                  className="form-control auth-input"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
                {password && confirmPassword && password !== confirmPassword && (
                  <small className="text-danger">Passwords do not match</small>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-auth w-100"
                disabled={loading || (password !== confirmPassword)}
              >
                {loading ? (
                  <><span className="spinner-border spinner-border-sm me-2"></span>Resetting...</>
                ) : (
                  <><i className="fas fa-sync-alt me-2"></i>Reset Password</>
                )}
              </button>
            </form>
          )}

          <p className="auth-switch">
            Remember your password? <Link to="/login">Sign in</Link>
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

export default ForgotPassword;
