import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, getDaysBetween } from '../../utils/dateHelpers';
import './TripCard.css';

const TripCard = ({ trip, onDelete }) => {
  const nights = getDaysBetween(trip.startDate, trip.endDate);
  const statusColor = {
    planning: 'warning',
    confirmed: 'success',
    ongoing: 'primary',
    completed: 'secondary',
    cancelled: 'danger',
  };

  return (
    <div className="trip-card card-hover">
      <div className="trip-card-image">
        <img
          src={
            trip.destination?.images?.[0] ||
            trip.coverImage ||
            'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80'
          }
          alt={trip.title}
        />
        <div className="trip-card-overlay">
          <span className={`badge bg-${statusColor[trip.status] || 'secondary'} status-badge`}>
            {trip.status?.charAt(0).toUpperCase() + trip.status?.slice(1)}
          </span>
        </div>
      </div>

      <div className="trip-card-body">
        <h5 className="trip-title">{trip.title}</h5>
        <p className="trip-destination">
          <i className="fas fa-map-marker-alt"></i>
          {trip.destinationName || trip.destination?.name || 'Unknown Destination'}
        </p>

        <div className="trip-dates">
          <div className="date-item">
            <i className="fas fa-calendar-alt"></i>
            <div>
              <small>From</small>
              <span>{formatDate(trip.startDate, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
          <div className="date-separator">→</div>
          <div className="date-item">
            <i className="fas fa-calendar-check"></i>
            <div>
              <small>To</small>
              <span>{formatDate(trip.endDate, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        <div className="trip-stats">
          <div className="stat">
            <i className="fas fa-moon"></i>
            <span>{nights} night{nights !== 1 ? 's' : ''}</span>
          </div>
          <div className="stat">
            <i className="fas fa-list-ul"></i>
            <span>{trip.days?.length || 0} days planned</span>
          </div>
          {trip.budget?.total > 0 && (
            <div className="stat">
              <i className="fas fa-wallet"></i>
              <span>${trip.budget.total.toLocaleString()}</span>
            </div>
          )}
        </div>

        <div className="trip-actions">
          <Link to={`/trip-planner/${trip._id}`} className="btn btn-view-trip">
            <i className="fas fa-eye me-1"></i> View Trip
          </Link>
          {onDelete && (
            <button className="btn btn-delete-trip" onClick={() => onDelete(trip._id)}>
              <i className="fas fa-trash"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCard;
