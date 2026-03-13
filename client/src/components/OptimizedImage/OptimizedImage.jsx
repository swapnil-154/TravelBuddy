import React, { useState, useRef, useEffect, useCallback } from 'react';
import './OptimizedImage.css';

const OptimizedImage = ({
  src,
  alt = '',
  className = '',
  style = {},
  fallback = 'https://via.placeholder.com/400x300?text=Image+Not+Found',
  onClick,
  sizes,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const element = imgRef.current;
    if (!element) return;

    // Use IntersectionObserver for lazy loading with a rootMargin
    // to start loading slightly before the image enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
    setLoaded(true);
  }, []);

  const imageSrc = error ? fallback : src || fallback;

  return (
    <div
      ref={imgRef}
      className={`optimized-image-wrapper ${loaded ? 'loaded' : ''} ${className}`}
      style={style}
      onClick={onClick}
    >
      {isVisible && (
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          className="optimized-image"
        />
      )}
      {!loaded && <div className="image-placeholder" aria-hidden="true" />}
    </div>
  );
};

export default OptimizedImage;
