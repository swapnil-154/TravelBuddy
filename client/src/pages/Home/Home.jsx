import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDestinationsRequest } from '../../redux/slices/destinationSlice';
import { fetchBlogsRequest } from '../../redux/slices/blogSlice';
import ParallaxHero from '../../components/ParallaxHero/ParallaxHero';
import SearchBar from '../../components/SearchBar/SearchBar';
import DestinationCarousel from '../../components/DestinationCarousel/DestinationCarousel';
import BlogPost from '../../components/BlogPost/BlogPost';
import CurrencyConverter from '../../components/CurrencyConverter/CurrencyConverter';
import Loading from '../../components/Loading/Loading';
import './Home.css';

const HERO_BG = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80';

const features = [
  { icon: 'fa-map-marked-alt', title: 'Trip Planner', desc: 'Create & manage trips with day-by-day itinerary builder', color: '#2563eb' },
  { icon: 'fa-plane', title: 'Flight Search', desc: 'Search and book flights from hundreds of airlines', color: '#7c3aed' },
  { icon: 'fa-hotel', title: 'Hotel Booking', desc: 'Find the perfect accommodation for your trip', color: '#10b981' },
  { icon: 'fa-cloud-sun', title: 'Weather Info', desc: 'Real-time weather data for your destinations', color: '#f59e0b' },
  { icon: 'fa-coins', title: 'Currency Converter', desc: 'Convert currencies with live exchange rates', color: '#ef4444' },
  { icon: 'fa-receipt', title: 'Expense Splitter', desc: 'Split travel costs among your companions', color: '#8b5cf6' },
];

const stats = [
  { value: '500+', label: 'Destinations', icon: 'fa-globe' },
  { value: '50K+', label: 'Happy Travelers', icon: 'fa-users' },
  { value: '10K+', label: 'Trips Planned', icon: 'fa-suitcase' },
  { value: '4.9★', label: 'Average Rating', icon: 'fa-star' },
];

const Home = () => {
  const dispatch = useDispatch();
  const { destinations, loading } = useSelector((state) => state.destinations);
  const { blogs, loading: blogsLoading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchDestinationsRequest({ featured: true, limit: 6 }));
    dispatch({ type: 'blogs/fetchBlogsRequest', payload: { limit: 3 } });
  }, [dispatch]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <ParallaxHero
        backgroundImage={HERO_BG}
        height="100vh"
      >
        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <i className="fas fa-star me-1"></i> #1 Travel Planning Platform
          </div>
          <h1 className="hero-title animate-fade-in-up">
            Explore the World <br />
            <span className="hero-highlight">With Confidence</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-up delay-2">
            Plan your perfect trip, book hotels & flights, discover hidden gems, and share your travel stories
          </p>

          <div className="hero-search animate-fade-in-up delay-3">
            <SearchBar placeholder="Where do you want to go?" large />
          </div>

          <div className="hero-quick-links animate-fade-in-up delay-4">
            <span>Popular:</span>
            {['Bali', 'Paris', 'Tokyo', 'Maldives', 'Santorini'].map((dest) => (
              <Link key={dest} to={`/destinations?q=${dest}`} className="quick-link">
                {dest}
              </Link>
            ))}
          </div>
        </div>
      </ParallaxHero>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="row g-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-md-3">
                <div className="stat-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <i className={`fas ${stat.icon} stat-icon`}></i>
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Everything You Need for Perfect Travel</h2>
            <p className="section-subtitle">All-in-one platform for planning, booking, and sharing your adventures</p>
          </div>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="feature-icon" style={{ background: `${feature.color}15`, color: feature.color }}>
                    <i className={`fas ${feature.icon}`}></i>
                  </div>
                  <h5 className="feature-title">{feature.title}</h5>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations Carousel */}
      {!loading && destinations.length > 0 && (
        <section className="carousel-section">
          <div className="container">
            <div className="text-center mb-4">
              <h2 className="section-title">Featured Destinations</h2>
              <p className="section-subtitle">Hand-picked destinations for unforgettable experiences</p>
            </div>
            <DestinationCarousel destinations={destinations} />
          </div>
        </section>
      )}

      {/* Destinations Grid */}
      <section className="destinations-section">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="section-title mb-1">Popular Destinations</h2>
              <p className="section-subtitle mb-0">Explore our top-rated destinations around the world</p>
            </div>
            <Link to="/destinations" className="btn btn-outline-primary rounded-pill">
              View All <i className="fas fa-arrow-right ms-1"></i>
            </Link>
          </div>

          {loading ? (
            <Loading text="Loading destinations..." />
          ) : (
            <div className="row g-4">
              {destinations.slice(0, 6).map((dest, index) => (
                <div key={dest._id} className="col-lg-4 col-md-6">
                  <Link to={`/destinations/${dest._id}`} className="destination-card-link">
                    <div className="destination-card card-hover animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="dest-image">
                        <img src={dest.images?.[0] || 'https://via.placeholder.com/400x300'} alt={dest.name} />
                        {dest.featured && <span className="badge-featured">Featured</span>}
                        <div className="dest-overlay">
                          <div className="dest-info">
                            <h4>{dest.name}</h4>
                            <p><i className="fas fa-globe me-1"></i>{dest.country}</p>
                          </div>
                        </div>
                      </div>
                      <div className="dest-body">
                        <div className="dest-meta">
                          <span className="dest-rating">
                            <i className="fas fa-star text-warning me-1"></i>{dest.rating}
                            <small className="text-muted ms-1">({dest.numReviews?.toLocaleString()})</small>
                          </span>
                          <span className={`category-badge category-${dest.category}`}>{dest.category}</span>
                        </div>
                        <p className="dest-description">{dest.description?.substring(0, 80)}...</p>
                        <div className="dest-footer">
                          <div className="dest-cost">
                            <small>From</small>
                            <strong>${dest.averageCost?.toLocaleString()}/person</strong>
                          </div>
                          <div className="dest-activities">
                            {dest.popularActivities?.slice(0, 2).map((act) => (
                              <span key={act} className="activity-tag">{act}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Parallax CTA Section */}
      <section
        className="cta-parallax"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80)' }}
      >
        <div className="cta-overlay">
          <div className="container text-center">
            <h2 className="cta-title animate-fade-in-up">Ready for Your Next Adventure?</h2>
            <p className="cta-subtitle animate-fade-in-up delay-2">
              Join thousands of travelers who plan their perfect trips with TravelBuddy
            </p>
            <div className="cta-buttons animate-fade-in-up delay-3">
              <Link to="/register" className="btn btn-cta-primary">
                <i className="fas fa-rocket me-2"></i>Start Planning Free
              </Link>
              <Link to="/destinations" className="btn btn-cta-secondary">
                <i className="fas fa-compass me-2"></i>Explore Destinations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="tools-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Travel Tools</h2>
            <p className="section-subtitle">Everything you need to plan your budget and convert currencies</p>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-lg-5 col-md-6">
              <CurrencyConverter />
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="trip-planner-cta">
                <div className="planner-content">
                  <div className="planner-icon">🗺️</div>
                  <h3>Build Your Dream Itinerary</h3>
                  <p>Create detailed day-by-day plans with our intuitive itinerary builder. Add activities, set budgets, and share with travel companions.</p>
                  <ul className="planner-features">
                    <li><i className="fas fa-check-circle"></i> Drag & drop activity scheduling</li>
                    <li><i className="fas fa-check-circle"></i> Budget tracking & expense splitting</li>
                    <li><i className="fas fa-check-circle"></i> Share with travel companions</li>
                    <li><i className="fas fa-check-circle"></i> Export to PDF or calendar</li>
                  </ul>
                  <Link to="/trip-planner" className="btn btn-planner">
                    <i className="fas fa-plus me-2"></i>Create New Trip
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="section-title mb-1">Travel Stories</h2>
              <p className="section-subtitle mb-0">Get inspired by real travel experiences</p>
            </div>
            <Link to="/blog" className="btn btn-outline-primary rounded-pill">
              All Stories <i className="fas fa-arrow-right ms-1"></i>
            </Link>
          </div>

          {blogsLoading ? (
            <Loading text="Loading stories..." />
          ) : (
            <div className="row g-4">
              {blogs.slice(0, 3).map((blog) => (
                <div key={blog._id} className="col-lg-4 col-md-6">
                  <BlogPost blog={blog} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
