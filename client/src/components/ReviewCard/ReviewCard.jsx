import React from 'react';
import { getRelativeTime } from '../../utils/dateHelpers';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`fas fa-star ${i < rating ? 'filled' : 'empty'}`}></i>
    ));
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <div className="reviewer-avatar">
            {review.user?.avatar && review.user.avatar.startsWith('http') ? (
              <img src={review.user.avatar} alt={review.user?.name} loading="lazy" decoding="async" />
            ) : (
              <span>{review.user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
            )}
          </div>
          <div>
            <h6 className="reviewer-name">{review.user?.name || 'Anonymous'}</h6>
            <span className="review-date">{getRelativeTime(review.createdAt)}</span>
          </div>
        </div>
        <div className="review-rating">
          <div className="stars">{renderStars(review.rating)}</div>
          <span className="rating-number">{review.rating}/5</span>
        </div>
      </div>

      <h5 className="review-title">{review.title}</h5>
      <p className="review-content">{review.content}</p>

      {review.images?.length > 0 && (
        <div className="review-images">
          {review.images.slice(0, 3).map((img, index) => (
            <img key={index} src={img} alt={`Review ${index + 1}`} loading="lazy" decoding="async" />
          ))}
        </div>
      )}

      <div className="review-footer">
        <button className="helpful-btn">
          <i className="fas fa-thumbs-up me-1"></i> Helpful ({review.helpful || 0})
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
