import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchDestinationsRequest } from '../../redux/slices/destinationSlice';
import Loading from '../../components/Loading/Loading';
import './Destinations.css';

const categories = ['all', 'beach', 'city', 'mountain', 'cultural', 'adventure', 'wildlife'];

const Destinations = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { destinations, loading, total, pages, currentPage } = useSelector((state) => state.destinations);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('');
  const q = searchParams.get('q');

  useEffect(() => {
    const params = { limit: 9, page: currentPage };
    if (activeCategory !== 'all') params.category = activeCategory;
    if (sortBy) params.sort = sortBy;
    dispatch(fetchDestinationsRequest(params));
  }, [dispatch, activeCategory, sortBy, currentPage]);

  return (
    <div className="destinations-page">
      <div className="destinations-hero">
        <div className="container">
          <h1>Explore Destinations</h1>
          <p>Discover {total}+ amazing places around the world</p>
        </div>
      </div>

      <div className="container py-5">
        {/* Filters */}
        <div className="filters-bar mb-4">
          <div className="categories-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort by: Default</option>
            <option value="rating">Top Rated</option>
            <option value="cost-asc">Price: Low to High</option>
            <option value="cost-desc">Price: High to Low</option>
          </select>
        </div>

        {q && (
          <p className="search-info">
            Showing results for "<strong>{q}</strong>"
          </p>
        )}

        {loading ? (
          <Loading text="Loading destinations..." />
        ) : (
          <>
            <div className="row g-4">
              {destinations.map((dest, index) => (
                <div key={dest._id} className="col-lg-4 col-md-6">
                  <Link to={`/destinations/${dest._id}`} className="dest-card-link">
                    <div className="dest-card card-hover animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                      <div className="dest-card-img">
                        <img src={dest.images?.[0] || 'https://via.placeholder.com/400x250'} alt={dest.name} />
                        {dest.featured && <span className="featured-badge">✨ Featured</span>}
                        <span className={`cat-badge cat-${dest.category}`}>{dest.category}</span>
                      </div>
                      <div className="dest-card-body">
                        <div className="dest-card-header">
                          <div>
                            <h5>{dest.name}</h5>
                            <p className="dest-country"><i className="fas fa-map-marker-alt me-1 text-primary"></i>{dest.country}</p>
                          </div>
                          <div className="dest-rating-badge">
                            <i className="fas fa-star text-warning"></i>
                            <span>{dest.rating}</span>
                          </div>
                        </div>
                        <p className="dest-desc">{dest.description?.substring(0, 90)}...</p>
                        <div className="dest-card-footer">
                          <div className="dest-price">
                            <small>From</small>
                            <strong>${dest.averageCost?.toLocaleString()}</strong>
                          </div>
                          <div className="dest-activities-chips">
                            {dest.popularActivities?.slice(0, 2).map((act) => (
                              <span key={act} className="act-chip">{act}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {destinations.length === 0 && (
              <div className="empty-state text-center py-5">
                <i className="fas fa-map-marked-alt fa-4x text-muted mb-3"></i>
                <h4>No destinations found</h4>
                <p className="text-muted">Try a different category or search term</p>
                <button className="btn btn-primary mt-2" onClick={() => setActiveCategory('all')}>
                  Show All Destinations
                </button>
              </div>
            )}

            {pages > 1 && (
              <div className="pagination-wrapper d-flex justify-content-center mt-5">
                {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`page-btn ${page === currentPage ? 'active' : ''}`}
                    onClick={() => dispatch(fetchDestinationsRequest({ page, limit: 9, ...(activeCategory !== 'all' ? { category: activeCategory } : {}) }))}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Destinations;
