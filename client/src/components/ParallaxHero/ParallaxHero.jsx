import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrolled * 0.5}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={heroRef}
      className="parallax-hero"
      style={{
        backgroundImage: `url(${backgroundImage})`,
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
