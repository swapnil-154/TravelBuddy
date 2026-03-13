import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchHotels, setBookingData } from '../../redux/slices/bookingSlice';
import Loading from '../../components/Loading/Loading';
import './HotelSearch.css';

const HotelSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hotels, loading, error } = useSelector((state) => state.bookings);
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ destination: '', checkIn: '', checkOut: '', guests: 1, rooms: 1 });

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchHotels(form));
  };

  const handleBook = (hotel) => {
    dispatch(setBookingData({ selectedItem: hotel, type: 'hotel' }));
    if (user) {
      navigate('/booking');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="hotel-search-page">
      <div className="hotel-hero">
        <div className="container">
          <h1><i className="fas fa-hotel me-2"></i>Find Hotels</h1>
          <p>Discover perfect accommodations for every budget</p>

          <form onSubmit={handleSearch} className="hotel-search-form">
            <div className="row g-3">
              <div className="col-md-3">
                <label>Destination</label>
                <input className="form-control" placeholder="City or hotel name" value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })} required />
              </div>
              <div className="col-md-2">
                <label>Check-in</label>
                <input type="date" className="form-control" value={form.checkIn}
                  onChange={(e) => setForm({ ...form, checkIn: e.target.value })} />
              </div>
              <div className="col-md-2">
                <label>Check-out</label>
                <input type="date" className="form-control" value={form.checkOut}
                  onChange={(e) => setForm({ ...form, checkOut: e.target.value })} />
              </div>
              <div className="col-md-2">
                <label>Guests</label>
                <input type="number" className="form-control" min={1} max={10} value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} />
              </div>
              <div className="col-md-1">
                <label>Rooms</label>
                <input type="number" className="form-control" min={1} max={5} value={form.rooms}
                  onChange={(e) => setForm({ ...form, rooms: Number(e.target.value) })} />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button type="submit" className="btn btn-search-hotels w-100">
                  <i className="fas fa-search me-2"></i>Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="container py-5">
        {loading && <Loading text="Searching hotels..." />}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && hotels.length > 0 && (
          <>
            <h4 className="results-heading">{hotels.length} hotels found in <strong>{form.destination}</strong></h4>
            <div className="row g-4">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="col-lg-4 col-md-6">
                  <div className="hotel-card card-hover">
                    <div className="hotel-image">
                      <img src={hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80'} alt={hotel.name} loading="lazy" decoding="async" />
                      <div className="hotel-stars">
                        {'★'.repeat(hotel.stars)}{'☆'.repeat(5 - hotel.stars)}
                      </div>
                    </div>
                    <div className="hotel-card-body">
                      <h5>{hotel.name}</h5>
                      <p className="hotel-address"><i className="fas fa-map-marker-alt me-1 text-primary"></i>{hotel.address}</p>

                      <div className="hotel-rating">
                        <span className="rating-score">{hotel.rating}</span>
                        <div className="rating-stars">{'★'.repeat(Math.round(hotel.rating))}</div>
                        <small>({hotel.numReviews?.toLocaleString()} reviews)</small>
                      </div>

                      <div className="hotel-amenities">
                        {hotel.amenities.slice(0, 4).map((am) => (
                          <span key={am} className="amenity-tag"><i className="fas fa-check me-1"></i>{am}</span>
                        ))}
                      </div>

                      <div className="hotel-badges">
                        {hotel.freeBreakfast && <span className="hotel-badge breakfast">🍳 Free Breakfast</span>}
                        {hotel.freeCancellation && <span className="hotel-badge cancel">✓ Free Cancellation</span>}
                      </div>

                      <div className="hotel-footer">
                        <div className="hotel-price">
                          <span className="price-per-night">${hotel.pricePerNight}</span>
                          <small>/night</small>
                          <div className="total-price">Total: ${hotel.totalPrice}</div>
                        </div>
                        <div>
                          <div className="room-type">{hotel.roomType}</div>
                          <button className="btn btn-book-hotel" onClick={() => handleBook(hotel)}>Book Now</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && hotels.length === 0 && !error && (
          <div className="empty-search text-center py-5">
            <i className="fas fa-hotel fa-4x text-muted mb-3"></i>
            <h4>Search for hotels</h4>
            <p className="text-muted">Enter a destination to find the best hotels</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelSearch;
