import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images = [], title = '' }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!images.length) return null;

  return (
    <div className="image-gallery-component">
      <div className="gallery-grid-layout">
        {images.slice(0, 5).map((img, idx) => (
          <div
            key={idx}
            className={`gallery-grid-item ${idx === 0 ? 'gallery-grid-main' : ''} ${images.length === 1 ? 'gallery-single' : ''}`}
            onClick={() => setActiveIndex(idx)}
          >
            <img src={img} alt={`${title} ${idx + 1}`} loading="lazy" decoding="async" />
            {idx === 4 && images.length > 5 && (
              <div className="gallery-more-overlay">
                +{images.length - 5} more
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div className="gallery-lightbox" onClick={() => setActiveIndex(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setActiveIndex(null)}>
              <i className="fas fa-times"></i>
            </button>
            <button
              className="lightbox-prev"
              onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}
              disabled={images.length === 1}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <img src={images[activeIndex]} alt={`${title} ${activeIndex + 1}`} />
            <button
              className="lightbox-next"
              onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
              disabled={images.length === 1}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            <div className="lightbox-counter">{activeIndex + 1} / {images.length}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
