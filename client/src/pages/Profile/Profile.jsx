import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserSuccess } from '../../redux/slices/authSlice';
import api from '../../services/api';
import './Profile.css';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: user?.name || '',
    avatar: user?.avatar || '',
    preferences: user?.preferences || { travelStyle: 'adventure', budgetRange: 'medium' },
  });
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    const { data } = await api.put('/auth/profile', form);
    dispatch(updateUserSuccess(data.user));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="container">
          <div className="profile-hero-content">
            <div className="profile-avatar-large">
              {user?.avatar && user.avatar.startsWith('http') ? (
                <img src={user.avatar} alt={user.name} loading="lazy" decoding="async" />
              ) : (
                <span>{user?.name?.charAt(0)?.toUpperCase()}</span>
              )}
            </div>
            <div>
              <h1>{user?.name}</h1>
              <p>{user?.email}</p>
              <span className={`role-badge ${user?.role}`}>{user?.role}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="profile-card">
              <h5>Profile Picture</h5>
              <div className="avatar-preview">
                <div className="avatar-circle">
                  {form.avatar && form.avatar.startsWith('http') ? (
                    <img src={form.avatar} alt="Preview" loading="lazy" decoding="async" />
                  ) : (
                    <span>{user?.name?.charAt(0)?.toUpperCase()}</span>
                  )}
                </div>
              </div>
              <input
                className="form-control mt-3"
                placeholder="Avatar URL"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              />
            </div>
          </div>

          <div className="col-lg-8">
            <div className="profile-card">
              <h5>Personal Information</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label>Full Name</label>
                  <input className="form-control" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label>Email</label>
                  <input className="form-control" value={user?.email} disabled />
                </div>
                <div className="col-md-6">
                  <label>Travel Style</label>
                  <select className="form-control" value={form.preferences.travelStyle}
                    onChange={(e) => setForm({ ...form, preferences: { ...form.preferences, travelStyle: e.target.value } })}>
                    {['adventure', 'luxury', 'budget', 'cultural', 'family', 'solo', 'romantic'].map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label>Budget Range</label>
                  <select className="form-control" value={form.preferences.budgetRange}
                    onChange={(e) => setForm({ ...form, preferences: { ...form.preferences, budgetRange: e.target.value } })}>
                    {['budget', 'medium', 'premium', 'luxury'].map((b) => (
                      <option key={b} value={b}>{b.charAt(0).toUpperCase() + b.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="btn btn-save-profile mt-4" onClick={handleSave}>
                {saved ? (
                  <><i className="fas fa-check me-2"></i>Saved!</>
                ) : (
                  <><i className="fas fa-save me-2"></i>Save Changes</>
                )}
              </button>
            </div>

            <div className="profile-card mt-4">
              <h5>Account Stats</h5>
              <div className="stats-grid">
                <div className="profile-stat">
                  <i className="fas fa-suitcase-rolling"></i>
                  <span>Trips</span>
                  <strong>0</strong>
                </div>
                <div className="profile-stat">
                  <i className="fas fa-bookmark"></i>
                  <span>Bookings</span>
                  <strong>0</strong>
                </div>
                <div className="profile-stat">
                  <i className="fas fa-pen-fancy"></i>
                  <span>Blog Posts</span>
                  <strong>0</strong>
                </div>
                <div className="profile-stat">
                  <i className="fas fa-star"></i>
                  <span>Reviews</span>
                  <strong>0</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
