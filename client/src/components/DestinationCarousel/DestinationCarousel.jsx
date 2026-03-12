import React from 'react';
import { Link } from 'react-router-dom';
import './DestinationCarousel.css';

const DestinationCarousel = ({ destinations = [] }) => {
  if (!destinations.length) return null;

  return (
    <div id="destinationCarousel" className="carousel slide destination-carousel" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {destinations.slice(0, 5).map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#destinationCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {destinations.slice(0, 5).map((dest, index) => (
          <div key={dest._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <div className="carousel-image-wrapper">
              <img
                src={dest.images?.[0] || `https://source.unsplash.com/1400x600/?${dest.name}`}
                className="carousel-img"
                alt={dest.name}
              />
              <div className="carousel-gradient-overlay"></div>
            </div>
            <div className="carousel-caption-custom">
              <div className="carousel-badge">
                <i className="fas fa-fire me-1"></i> Featured Destination
              </div>
              <h2 className="carousel-title">{dest.name}</h2>
              <p className="carousel-country">
                <i className="fas fa-globe me-1"></i>{dest.country}
              </p>
              <p className="carousel-desc">{dest.description?.substring(0, 120)}...</p>
              <div className="carousel-meta">
                <span className="carousel-rating">
                  <i className="fas fa-star"></i> {dest.rating} ({dest.numReviews?.toLocaleString()} reviews)
                </span>
                <span className="carousel-cost">
                  <i className="fas fa-dollar-sign"></i> From ${dest.averageCost?.toLocaleString()}
                </span>
              </div>
              <Link to={`/destinations/${dest._id}`} className="btn btn-carousel">
                Explore <i className="fas fa-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#destinationCarousel" data-bs-slide="prev">
        <div className="carousel-ctrl-btn">
          <i className="fas fa-chevron-left"></i>
        </div>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#destinationCarousel" data-bs-slide="next">
        <div className="carousel-ctrl-btn">
          <i className="fas fa-chevron-right"></i>
        </div>
      </button>
    </div>
  );
};

export default DestinationCarousel;
