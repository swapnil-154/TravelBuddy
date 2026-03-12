import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import WeatherWidget from '../../components/WeatherWidget/WeatherWidget';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import Loading from '../../components/Loading/Loading';
import './DestinationDetail.css';
import api from '../../services/api';

const DestinationDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { destination, loading } = useSelector((state) => state.destinations);
  const [reviews, setReviews] = React.useState([]);

  useEffect(() => {
    dispatch({ type: 'destinations/fetchDestination', payload: id });
    api.get(`/reviews/destination/${id}`).then(({ data }) => setReviews(data.reviews));
  }, [dispatch, id]);

  if (loading || !destination) return <Loading fullScreen text="Loading destination..." />;

  return (
    <div className="destination-detail">
      {/* Hero */}
      <div className="detail-hero" style={{ backgroundImage: `url(${destination.images?.[0]})` }}>
        <div className="detail-hero-overlay">
          <div className="container">
            <div className="detail-hero-content">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-light">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item"><Link to="/destinations">Destinations</Link></li>
                  <li className="breadcrumb-item active">{destination.name}</li>
                </ol>
              </nav>
              <h1>{destination.name}</h1>
              <p><i className="fas fa-map-marker-alt me-2"></i>{destination.country}</p>
              <div className="detail-meta">
                <span><i className="fas fa-star text-warning me-1"></i>{destination.rating} ({destination.numReviews?.toLocaleString()} reviews)</span>
                <span><i className="fas fa-tag me-1"></i>{destination.category}</span>
                <span><i className="fas fa-sun me-1"></i>Best: {destination.bestTimeToVisit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Main content */}
          <div className="col-lg-8">
            {/* Image Gallery */}
            {destination.images?.length > 1 && (
              <div className="image-gallery mb-5">
                <div className="gallery-grid">
                  {destination.images.slice(0, 4).map((img, i) => (
                    <div key={i} className={`gallery-item ${i === 0 ? 'gallery-main' : ''}`}>
                      <img src={img} alt={`${destination.name} ${i + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bootstrap Tabs */}
            <ul className="nav nav-tabs custom-tabs mb-4" id="destTabs">
              <li className="nav-item"><button className="nav-link active" data-bs-toggle="tab" data-bs-target="#overview">Overview</button></li>
              <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#activities">Activities</button></li>
              <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#reviews-tab">Reviews</button></li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane fade show active" id="overview">
                <h3 className="section-heading">About {destination.name}</h3>
                <p className="detail-description">{destination.description}</p>
                <div className="row g-3 mt-3">
                  <div className="col-md-4">
                    <div className="info-card">
                      <i className="fas fa-coins text-warning"></i>
                      <span>Avg. Cost</span>
                      <strong>${destination.averageCost?.toLocaleString()}/person</strong>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-card">
                      <i className="fas fa-thermometer-half text-danger"></i>
                      <span>Climate</span>
                      <strong>{destination.climate || 'Varied'}</strong>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-card">
                      <i className="fas fa-money-bill text-success"></i>
                      <span>Currency</span>
                      <strong>{destination.currency || 'USD'}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="activities">
                <h3 className="section-heading">Popular Activities</h3>
                <div className="activities-grid">
                  {destination.popularActivities?.map((activity, i) => (
                    <div key={i} className="activity-item">
                      <i className="fas fa-check-circle text-primary me-2"></i>
                      {activity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="tab-pane fade" id="reviews-tab">
                <h3 className="section-heading">Traveler Reviews ({reviews.length})</h3>
                {reviews.length === 0 ? (
                  <p className="text-muted">No reviews yet. Be the first to review!</p>
                ) : (
                  <div className="row g-3">
                    {reviews.map((review) => (
                      <div key={review._id} className="col-12">
                        <ReviewCard review={review} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="sidebar-sticky">
              {/* Weather */}
              <div className="mb-4">
                <WeatherWidget destination={destination.name} />
              </div>

              {/* Quick Actions */}
              <div className="quick-actions mb-4">
                <h5>Plan Your Trip</h5>
                <Link to="/flights" className="action-btn">
                  <i className="fas fa-plane me-2"></i>Search Flights
                </Link>
                <Link to="/hotels" className="action-btn">
                  <i className="fas fa-hotel me-2"></i>Find Hotels
                </Link>
                <Link to="/trip-planner" state={{ destination }} className="action-btn btn-primary-custom">
                  <i className="fas fa-map-marked-alt me-2"></i>Create Itinerary
                </Link>
              </div>

              {/* Best Time */}
              <div className="best-time-card">
                <h5><i className="fas fa-calendar-star me-2"></i>Best Time to Visit</h5>
                <p>{destination.bestTimeToVisit}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
