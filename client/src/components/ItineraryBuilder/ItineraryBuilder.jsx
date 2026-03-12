import React from 'react';
import './ItineraryBuilder.css';

const ItineraryBuilder = ({ days = [], onUpdate }) => {
  return (
    <div className="itinerary-builder-component">
      {days.map((day, dayIndex) => (
        <div key={dayIndex} className="itinerary-day-row">
          <div className="itinerary-day-number">
            <span>Day {day.dayNumber}</span>
          </div>
          <div className="itinerary-day-content">
            <div className="day-activities">
              {day.activities.length === 0 ? (
                <p className="no-activities">No activities yet</p>
              ) : (
                day.activities.map((act, actIndex) => (
                  <div key={actIndex} className="itinerary-activity">
                    <span className="act-time">{act.time}</span>
                    <span className="act-icon">{getActivityIcon(act.type)}</span>
                    <div className="act-info">
                      <strong>{act.title}</strong>
                      {act.location && <small>{act.location}</small>}
                    </div>
                    {act.cost > 0 && <span className="act-cost">${act.cost}</span>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const getActivityIcon = (type) => {
  const icons = { sightseeing: '🏛️', food: '🍜', transport: '🚗', accommodation: '🏨', activity: '🏄', other: '📝' };
  return icons[type] || '📌';
};

export default ItineraryBuilder;
