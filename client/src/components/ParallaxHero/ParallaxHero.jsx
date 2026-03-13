import React, { useEffect, useRef, useState } from 'react';
import './ParallaxHero.css';

const ParallaxHero = ({
  backgroundImage,
  title,
  subtitle,
  children,
  height = '100vh',
  overlay = true,
}) => {
  const heroRef = useRef(null);
  const rafRef = useRef(null);
  const [bgLoaded, setBgLoaded] = useState(false);

  // Lazy-load background image via IntersectionObserver
  useEffect(() => {
    if (!backgroundImage) return;

    const element = heroRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.src = backgroundImage;
          img.onload = () => setBgLoaded(true);
          // If image is already cached, onload fires synchronously
          if (img.complete) setBgLoaded(true);
          observer.unobserve(element);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [backgroundImage]);

  // Throttled parallax scroll using requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          if (heroRef.current) {
            const scrolled = window.scrollY;
            heroRef.current.style.backgroundPositionY = `${scrolled * 0.5}px`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className={`parallax-hero ${bgLoaded ? 'parallax-hero--loaded' : ''}`}
      style={{
        backgroundImage: bgLoaded ? `url(${backgroundImage})` : 'none',
        minHeight: height,
      }}
    >
      {overlay && <div className="parallax-hero-overlay"></div>}
      <div className="parallax-hero-content container">
        {title && (
          <h1 className="parallax-hero-title animate-fade-in-up">{title}</h1>
        )}
        {subtitle && (
          <p className="parallax-hero-subtitle animate-fade-in-up delay-2">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
};

export default ParallaxHero;
