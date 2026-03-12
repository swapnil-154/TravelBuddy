import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'overview') {
        const { data } = await api.get('/admin/stats');
        setStats(data.stats);
      } else if (activeTab === 'users') {
        const { data } = await api.get('/admin/users');
        setUsers(data.users);
      } else if (activeTab === 'bookings') {
        const { data } = await api.get('/admin/bookings');
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    }
    setLoading(false);
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      fetchData();
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  const handleBookingStatusChange = async (bookingId, status) => {
    try {
      await api.put(`/admin/bookings/${bookingId}/status`, { status });
      fetchData();
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-hero">
        <div className="container">
          <h1><i className="fas fa-tachometer-alt me-3"></i>Admin Dashboard</h1>
          <p>Manage users, bookings, and view analytics</p>
        </div>
      </div>

      <div className="container py-4">
        <div className="admin-tabs">
          {['overview', 'users', 'bookings'].map((tab) => (
            <button
              key={tab}
              className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <i className={`fas fa-${tab === 'overview' ? 'chart-bar' : tab === 'users' ? 'users' : 'ticket-alt'} me-2`}></i>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Loading...</p>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && stats && (
              <div>
                <div className="row g-4 mb-4">
                  <div className="col-md-3">
                    <div className="stat-card stat-users">
                      <i className="fas fa-users"></i>
                      <h3>{stats.totalUsers}</h3>
                      <p>Total Users</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="stat-card stat-bookings">
                      <i className="fas fa-ticket-alt"></i>
                      <h3>{stats.totalBookings}</h3>
                      <p>Total Bookings</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="stat-card stat-destinations">
                      <i className="fas fa-map-marker-alt"></i>
                      <h3>{stats.totalDestinations}</h3>
                      <p>Destinations</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="stat-card stat-revenue">
                      <i className="fas fa-dollar-sign"></i>
                      <h3>${stats.totalRevenue.toLocaleString()}</h3>
                      <p>Total Revenue</p>
                    </div>
                  </div>
                </div>

                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="admin-card">
                      <h5><i className="fas fa-users me-2"></i>Users by Role</h5>
                      <div className="role-breakdown">
                        {stats.usersByRole.map((r) => (
                          <div key={r._id} className="role-item">
                            <span className={`role-badge ${r._id}`}>{r._id}</span>
                            <strong>{r.count}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="admin-card">
                      <h5><i className="fas fa-chart-pie me-2"></i>Bookings by Status</h5>
                      <div className="status-breakdown">
                        {stats.bookingsByStatus.map((b) => (
                          <div key={b._id} className="status-item">
                            <span className={`status-badge ${b._id}`}>{b._id}</span>
                            <strong>{b.count}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row g-4 mt-2">
                  <div className="col-md-6">
                    <div className="admin-card">
                      <h5><i className="fas fa-clock me-2"></i>Recent Bookings</h5>
                      {stats.recentBookings.length === 0 ? (
                        <p className="text-muted">No bookings yet</p>
                      ) : (
                        <div className="recent-list">
                          {stats.recentBookings.map((b) => (
                            <div key={b._id} className="recent-item">
                              <div>
                                <strong>{b.user?.name || 'Unknown'}</strong>
                                <small className="text-muted d-block">{b.type} - {b.confirmationCode}</small>
                              </div>
                              <span className={`status-badge ${b.status}`}>{b.status}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="admin-card">
                      <h5><i className="fas fa-user-plus me-2"></i>Recent Users</h5>
                      {stats.recentUsers.length === 0 ? (
                        <p className="text-muted">No users yet</p>
                      ) : (
                        <div className="recent-list">
                          {stats.recentUsers.map((u) => (
                            <div key={u._id} className="recent-item">
                              <div>
                                <strong>{u.name}</strong>
                                <small className="text-muted d-block">{u.email}</small>
                              </div>
                              <span className={`role-badge ${u.role}`}>{u.role}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="admin-card">
                <h5><i className="fas fa-users me-2"></i>All Users</h5>
                {users.length === 0 ? (
                  <p className="text-muted">No users found</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Joined</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u._id}>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div className="table-avatar">{u.name?.charAt(0)?.toUpperCase()}</div>
                                {u.name}
                              </div>
                            </td>
                            <td>{u.email}</td>
                            <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
                            <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                            <td>
                              <select
                                className="form-select form-select-sm"
                                value={u.role}
                                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                style={{ width: '120px' }}
                              >
                                <option value="user">User</option>
                                <option value="agent">Agent</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="admin-card">
                <h5><i className="fas fa-ticket-alt me-2"></i>All Bookings</h5>
                {bookings.length === 0 ? (
                  <p className="text-muted">No bookings found</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table admin-table">
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>User</th>
                          <th>Type</th>
                          <th>Cost</th>
                          <th>Status</th>
                          <th>Payment</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((b) => (
                          <tr key={b._id}>
                            <td><strong>{b.confirmationCode}</strong></td>
                            <td>{b.user?.name || 'N/A'}<br /><small className="text-muted">{b.user?.email}</small></td>
                            <td><span className="badge bg-info">{b.type}</span></td>
                            <td>${b.totalCost} {b.currency}</td>
                            <td><span className={`status-badge ${b.status}`}>{b.status}</span></td>
                            <td><span className={`status-badge ${b.paymentStatus}`}>{b.paymentStatus}</span></td>
                            <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                            <td>
                              <select
                                className="form-select form-select-sm"
                                value={b.status}
                                onChange={(e) => handleBookingStatusChange(b._id, e.target.value)}
                                style={{ width: '130px' }}
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="completed">Completed</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
