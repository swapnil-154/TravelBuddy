import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearSearchResults } from '../../redux/slices/destinationSlice';
import './SearchBar.css';

const SearchBar = ({ placeholder = 'Search destinations...', large = false }) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchResults } = useSelector((state) => state.destinations);
  const wrapperRef = useRef(null);

  // jQuery-powered AJAX live search effect
  useEffect(() => {
    if (query.length >= 2) {
      dispatch({ type: 'destinations/searchDestinations', payload: query });
      setShowResults(true);
    } else {
      dispatch(clearSearchResults());
      setShowResults(false);
    }
  }, [query, dispatch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (destination) => {
    setQuery('');
    setShowResults(false);
    dispatch(clearSearchResults());
    navigate(`/destinations/${destination._id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/destinations?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  return (
    <div ref={wrapperRef} className={`search-bar-wrapper ${large ? 'search-bar-large' : ''}`}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setShowResults(true)}
          />
          {query && (
            <button
              type="button"
              className="search-clear"
              onClick={() => { setQuery(''); dispatch(clearSearchResults()); setShowResults(false); }}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
          <button type="submit" className="search-btn">
            Search
          </button>
        </div>
      </form>

      {showResults && searchResults.length > 0 && (
        <div className="search-dropdown animate-fade-in-up">
          {searchResults.map((destination) => (
            <div
              key={destination._id}
              className="search-result-item"
              onClick={() => handleSelect(destination)}
            >
              <div className="result-image">
                <img src={destination.images?.[0] || 'https://via.placeholder.com/50'} alt={destination.name} loading="lazy" decoding="async" />
              </div>
              <div className="result-info">
                <span className="result-name">{destination.name}</span>
                <span className="result-country">
                  <i className="fas fa-globe-americas me-1"></i>{destination.country}
                </span>
              </div>
              <div className="result-rating">
                <i className="fas fa-star text-warning me-1"></i>
                {destination.rating}
              </div>
            </div>
          ))}
          <div className="search-footer" onClick={handleSubmit}>
            <span>See all results for "<strong>{query}</strong>"</span>
            <i className="fas fa-arrow-right ms-2"></i>
          </div>
        </div>
      )}

      {showResults && query.length >= 2 && searchResults.length === 0 && (
        <div className="search-dropdown">
          <div className="search-empty">
            <i className="fas fa-search-minus"></i>
            <p>No destinations found for "{query}"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
