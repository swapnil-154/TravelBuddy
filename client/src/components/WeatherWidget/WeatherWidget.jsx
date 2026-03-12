import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './WeatherWidget.css';

const WeatherWidget = ({ destination }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!destination) return;
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/weather/${encodeURIComponent(destination)}`);
        setWeather(data.weather);
      } catch (err) {
        setError('Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [destination]);

  if (loading) {
    return (
      <div className="weather-widget weather-loading">
        <div className="weather-skeleton"></div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="weather-widget weather-error">
        <i className="fas fa-cloud-rain"></i>
        <p>{error || 'Weather unavailable'}</p>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <div className="weather-location">
          <i className="fas fa-map-marker-alt"></i>
          <span>{weather.destination}</span>
        </div>
        <div className="weather-updated">
          <small>Updated just now</small>
        </div>
      </div>

      <div className="weather-main">
        <div className="weather-icon-temp">
          <span className="weather-emoji">{weather.icon}</span>
          <div className="weather-temp">
            <span className="temp-celsius">{weather.temperature.celsius}°C</span>
            <span className="temp-fahrenheit">{weather.temperature.fahrenheit}°F</span>
          </div>
        </div>
        <div className="weather-condition">
          <h4>{weather.condition}</h4>
          <div className="weather-details">
            <span><i className="fas fa-tint"></i> {weather.humidity}%</span>
            <span><i className="fas fa-wind"></i> {weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      <div className="weather-forecast">
        {weather.forecast.slice(0, 5).map((day, index) => (
          <div key={index} className="forecast-day">
            <span className="forecast-date">{day.date.split(',')[0]}</span>
            <span className="forecast-icon">{day.icon}</span>
            <div className="forecast-temps">
              <span className="high">{day.high}°</span>
              <span className="low">{day.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;
