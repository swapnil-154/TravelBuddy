import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TripCard from '../../components/TripCard/TripCard';
import Loading from '../../components/Loading/Loading';
import { fetchTripsRequest } from '../../redux/slices/tripSlice';
import './MyTrips.css';

const MyTrips = () => {
  const dispatch = useDispatch();
  const { trips, loading } = useSelector((state) => state.trips);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTripsRequest());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Delete this trip?')) {
      dispatch({ type: 'trips/deleteTrip', payload: id });
    }
  };

  return (
    <div className="my-trips-page">
      <div className="my-trips-hero">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1>My Trips 🗺️</h1>
              <p>Welcome back, {user?.name?.split(' ')[0]}! Here are your planned adventures.</p>
            </div>
            <Link to="/trip-planner" className="btn btn-create-trip">
              <i className="fas fa-plus me-2"></i>New Trip
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-5">
        {loading ? (
          <Loading text="Loading your trips..." />
        ) : trips.length === 0 ? (
          <div className="empty-trips text-center py-5">
            <div className="empty-icon">🌍</div>
            <h3>No trips planned yet</h3>
            <p className="text-muted">Start planning your next adventure!</p>
            <Link to="/trip-planner" className="btn btn-primary rounded-pill mt-3 px-4">
              <i className="fas fa-plus me-2"></i>Plan Your First Trip
            </Link>
          </div>
        ) : (
          <>
            <div className="trips-summary mb-4">
              <div className="summary-stat">
                <strong>{trips.length}</strong><span>Total Trips</span>
              </div>
              <div className="summary-stat">
                <strong>{trips.filter(t => t.status === 'completed').length}</strong><span>Completed</span>
              </div>
              <div className="summary-stat">
                <strong>{trips.filter(t => t.status === 'planning').length}</strong><span>Planning</span>
              </div>
            </div>

            <div className="row g-4">
              {trips.map((trip) => (
                <div key={trip._id} className="col-lg-4 col-md-6">
                  <TripCard trip={trip} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
