import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ExpenseSplitter from '../../components/ExpenseSplitter/ExpenseSplitter';
import { getDaysBetween, getDateRangeArray } from '../../utils/dateHelpers';
import './TripPlanner.css';

const TripPlanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const prefillDest = location.state?.destination;

  const [trip, setTrip] = useState({
    title: '',
    destinationName: prefillDest?.name || '',
    startDate: '',
    endDate: '',
    budget: { total: 0, currency: 'USD' },
    notes: '',
    travelers: [{ name: user?.name || '', email: user?.email || '' }],
    days: [],
    status: 'planning',
  });

  const [activeDay, setActiveDay] = useState(0);

  const generateDays = () => {
    if (!trip.startDate || !trip.endDate) return;
    const dates = getDateRangeArray(trip.startDate, trip.endDate);
    const days = dates.map((date, i) => ({
      dayNumber: i + 1,
      date,
      title: `Day ${i + 1}`,
      notes: '',
      activities: [],
    }));
    setTrip({ ...trip, days });
  };

  const addActivity = (dayIndex) => {
    const updatedDays = [...trip.days];
    updatedDays[dayIndex].activities.push({
      time: '09:00',
      title: '',
      description: '',
      location: '',
      cost: 0,
      type: 'activity',
    });
    setTrip({ ...trip, days: updatedDays });
  };

  const updateActivity = (dayIndex, actIndex, field, value) => {
    const updatedDays = [...trip.days];
    updatedDays[dayIndex].activities[actIndex][field] = value;
    setTrip({ ...trip, days: updatedDays });
  };

  const removeActivity = (dayIndex, actIndex) => {
    const updatedDays = [...trip.days];
    updatedDays[dayIndex].activities.splice(actIndex, 1);
    setTrip({ ...trip, days: updatedDays });
  };

  const handleSave = () => {
    if (!user) { navigate('/login'); return; }
    if (!trip.title || !trip.startDate || !trip.endDate) {
      alert('Please fill in trip title and dates');
      return;
    }
    dispatch({ type: 'trips/createTrip', payload: trip });
    navigate('/my-trips');
  };

  const activityTypes = [
    { value: 'sightseeing', label: '🏛️ Sightseeing', icon: 'fa-binoculars' },
    { value: 'food', label: '🍜 Food & Dining', icon: 'fa-utensils' },
    { value: 'transport', label: '🚗 Transport', icon: 'fa-car' },
    { value: 'accommodation', label: '🏨 Accommodation', icon: 'fa-hotel' },
    { value: 'activity', label: '🏄 Activity', icon: 'fa-person-hiking' },
    { value: 'other', label: '📝 Other', icon: 'fa-ellipsis' },
  ];

  const totalCost = trip.days.reduce(
    (sum, day) => sum + day.activities.reduce((s, act) => s + Number(act.cost || 0), 0), 0
  );

  return (
    <div className="trip-planner-page">
      <div className="planner-hero">
        <div className="container">
          <h1>🗺️ Trip Planner</h1>
          <p>Build your perfect day-by-day itinerary</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {/* Trip Details */}
          <div className="col-lg-4">
            <div className="planner-sidebar">
              <h4 className="sidebar-title">Trip Details</h4>

              <div className="form-group mb-3">
                <label>Trip Title *</label>
                <input className="form-control" placeholder="e.g. Bali Summer Vacation"
                  value={trip.title} onChange={(e) => setTrip({ ...trip, title: e.target.value })} />
              </div>

              <div className="form-group mb-3">
                <label>Destination</label>
                <input className="form-control" placeholder="Where are you going?"
                  value={trip.destinationName} onChange={(e) => setTrip({ ...trip, destinationName: e.target.value })} />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label>Start Date *</label>
                  <input type="date" className="form-control" value={trip.startDate}
                    onChange={(e) => setTrip({ ...trip, startDate: e.target.value })} />
                </div>
                <div className="col-6">
                  <label>End Date *</label>
                  <input type="date" className="form-control" value={trip.endDate}
                    onChange={(e) => setTrip({ ...trip, endDate: e.target.value })} />
                </div>
              </div>

              {trip.startDate && trip.endDate && trip.days.length === 0 && (
                <button className="btn btn-generate w-100 mb-3" onClick={generateDays}>
                  <i className="fas fa-calendar-plus me-2"></i>
                  Generate {getDaysBetween(trip.startDate, trip.endDate)} Day{getDaysBetween(trip.startDate, trip.endDate) !== 1 ? 's' : ''} Plan
                </button>
              )}

              <div className="form-group mb-3">
                <label>Total Budget ($)</label>
                <input type="number" className="form-control" placeholder="0"
                  value={trip.budget.total}
                  onChange={(e) => setTrip({ ...trip, budget: { ...trip.budget, total: Number(e.target.value) } })} />
              </div>

              <div className="form-group mb-3">
                <label>Notes</label>
                <textarea className="form-control" rows={3} placeholder="Any notes or reminders..."
                  value={trip.notes} onChange={(e) => setTrip({ ...trip, notes: e.target.value })} />
              </div>

              {/* Budget Summary */}
              {trip.budget.total > 0 && (
                <div className="budget-summary">
                  <div className="budget-item">
                    <span>Total Budget</span>
                    <strong>${trip.budget.total.toLocaleString()}</strong>
                  </div>
                  <div className="budget-item">
                    <span>Planned Expenses</span>
                    <strong className="text-danger">${totalCost.toLocaleString()}</strong>
                  </div>
                  <div className="budget-item">
                    <span>Remaining</span>
                    <strong className={trip.budget.total - totalCost >= 0 ? 'text-success' : 'text-danger'}>
                      ${(trip.budget.total - totalCost).toLocaleString()}
                    </strong>
                  </div>
                  <div className="budget-bar">
                    <div
                      className="budget-bar-fill"
                      style={{ width: `${Math.min((totalCost / trip.budget.total) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <button className="btn btn-save-trip w-100 mt-3" onClick={handleSave}>
                <i className="fas fa-save me-2"></i>Save Trip
              </button>
            </div>
          </div>

          {/* Itinerary Builder */}
          <div className="col-lg-8">
            {trip.days.length === 0 ? (
              <div className="empty-itinerary text-center py-5">
                <div className="empty-itinerary-icon">📅</div>
                <h4>No itinerary yet</h4>
                <p className="text-muted">Select your trip dates and click "Generate Days Plan" to start building your itinerary</p>
              </div>
            ) : (
              <div className="itinerary-builder">
                <div className="itinerary-header">
                  <h4>Itinerary Builder</h4>
                  <span className="day-count">{trip.days.length} days</span>
                </div>

                {/* Day tabs */}
                <div className="day-tabs">
                  {trip.days.map((day, index) => (
                    <button
                      key={index}
                      className={`day-tab ${activeDay === index ? 'active' : ''}`}
                      onClick={() => setActiveDay(index)}
                    >
                      Day {day.dayNumber}
                    </button>
                  ))}
                </div>

                {/* Active day */}
                {trip.days[activeDay] && (
                  <div className="day-content">
                    <div className="day-header">
                      <input
                        className="day-title-input"
                        value={trip.days[activeDay].title}
                        onChange={(e) => {
                          const updated = [...trip.days];
                          updated[activeDay].title = e.target.value;
                          setTrip({ ...trip, days: updated });
                        }}
                        placeholder="Day title..."
                      />
                      <span className="day-date">
                        {new Date(trip.days[activeDay].date).toLocaleDateString('en-US', {
                          weekday: 'long', month: 'long', day: 'numeric'
                        })}
                      </span>
                    </div>

                    {/* Activities */}
                    {trip.days[activeDay].activities.map((activity, actIndex) => (
                      <div key={actIndex} className="activity-card">
                        <div className="activity-time-col">
                          <input
                            type="time"
                            className="form-control time-input"
                            value={activity.time}
                            onChange={(e) => updateActivity(activeDay, actIndex, 'time', e.target.value)}
                          />
                        </div>
                        <div className="activity-content">
                          <div className="row g-2">
                            <div className="col-md-6">
                              <input
                                className="form-control"
                                placeholder="Activity title"
                                value={activity.title}
                                onChange={(e) => updateActivity(activeDay, actIndex, 'title', e.target.value)}
                              />
                            </div>
                            <div className="col-md-3">
                              <select
                                className="form-control"
                                value={activity.type}
                                onChange={(e) => updateActivity(activeDay, actIndex, 'type', e.target.value)}
                              >
                                {activityTypes.map((t) => (
                                  <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-3">
                              <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Cost"
                                  value={activity.cost}
                                  onChange={(e) => updateActivity(activeDay, actIndex, 'cost', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <input
                                className="form-control"
                                placeholder="Location"
                                value={activity.location}
                                onChange={(e) => updateActivity(activeDay, actIndex, 'location', e.target.value)}
                              />
                            </div>
                            <div className="col-md-6">
                              <input
                                className="form-control"
                                placeholder="Notes"
                                value={activity.description}
                                onChange={(e) => updateActivity(activeDay, actIndex, 'description', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-remove-activity" onClick={() => removeActivity(activeDay, actIndex)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}

                    <button className="btn btn-add-activity w-100" onClick={() => addActivity(activeDay)}>
                      <i className="fas fa-plus me-2"></i>Add Activity
                    </button>

                    <div className="day-notes">
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="Day notes..."
                        value={trip.days[activeDay].notes}
                        onChange={(e) => {
                          const updated = [...trip.days];
                          updated[activeDay].notes = e.target.value;
                          setTrip({ ...trip, days: updated });
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Itinerary Table */}
                {trip.days.some((d) => d.activities.length > 0) && (
                  <div className="itinerary-table-section">
                    <h5>Full Itinerary Overview</h5>
                    <div className="table-responsive">
                      <table className="table itinerary-table">
                        <thead>
                          <tr>
                            <th>Day</th>
                            <th>Time</th>
                            <th>Activity</th>
                            <th>Type</th>
                            <th>Location</th>
                            <th>Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {trip.days.map((day) =>
                            day.activities.map((act, i) => (
                              <tr key={`${day.dayNumber}-${i}`}>
                                {i === 0 && (
                                  <td rowSpan={day.activities.length} className="day-cell">
                                    Day {day.dayNumber}<br/>
                                    <small>{day.title}</small>
                                  </td>
                                )}
                                <td>{act.time}</td>
                                <td><strong>{act.title}</strong></td>
                                <td><span className="act-type-badge">{act.type}</span></td>
                                <td>{act.location}</td>
                                <td>{act.cost > 0 ? `$${act.cost}` : '-'}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Expense Splitter */}
            <div className="mt-4">
              <ExpenseSplitter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
