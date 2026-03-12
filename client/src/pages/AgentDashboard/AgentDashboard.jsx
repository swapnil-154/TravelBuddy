import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import './AgentDashboard.css';

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'overview') {
        const { data } = await api.get('/agent/stats');
        setStats(data.stats);
      } else if (activeTab === 'bookings') {
        const { data } = await api.get('/agent/bookings');
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Failed to fetch agent data:', error);
    }
    setLoading(false);
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = async (bookingId, status) => {
    try {
      await api.put(`/agent/bookings/${bookingId}/status`, { status });
      fetchData();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="agent-dashboard">
      <div className="agent-hero">
        <div className="container">
          <h1><i className="fas fa-headset me-3"></i>Agent Dashboard</h1>
          <p>Manage bookings and assist customers</p>
        </div>
      </div>

      <div className="container py-4">
        <div className="admin-tabs">
          {['overview', 'bookings'].map((tab) => (
            <button
              key={tab}
              className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <i className={`fas fa-${tab === 'overview' ? 'chart-bar' : 'ticket-alt'} me-2`}></i>
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
                    <div className="stat-card stat-bookings">
                      <i className="fas fa-ticket-alt"></i>
                      <h3>{stats.totalBookings}</h3>
                      <p>Total Bookings</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="stat-card stat-users">
                      <i className="fas fa-clock"></i>
                      <h3>{stats.pendingBookings}</h3>
                      <p>Pending</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="stat-card stat-destinations">
                      <i className="fas fa-check-circle"></i>
                      <h3>{stats.confirmedBookings}</h3>
                      <p>Confirmed</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="stat-card stat-revenue">
                      <i className="fas fa-users"></i>
                      <h3>{stats.totalCustomers}</h3>
                      <p>Customers</p>
                    </div>
                  </div>
                </div>

                <div className="admin-card">
                  <h5><i className="fas fa-clock me-2"></i>Recent Bookings</h5>
                  {stats.recentBookings.length === 0 ? (
                    <p className="text-muted">No bookings yet</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table admin-table">
                        <thead>
                          <tr>
                            <th>Code</th>
                            <th>Customer</th>
                            <th>Type</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.recentBookings.map((b) => (
                            <tr key={b._id}>
                              <td><strong>{b.confirmationCode}</strong></td>
                              <td>{b.user?.name || 'N/A'}<br /><small className="text-muted">{b.user?.email}</small></td>
                              <td>{b.type}</td>
                              <td>${b.totalCost}</td>
                              <td><span className={`status-badge ${b.status}`}>{b.status}</span></td>
                              <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
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
                          <th>Customer</th>
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
                                onChange={(e) => handleStatusChange(b._id, e.target.value)}
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

export default AgentDashboard;
