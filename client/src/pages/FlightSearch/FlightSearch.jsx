import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import './FlightSearch.css';

const FlightSearch = () => {
  const dispatch = useDispatch();
  const { flights, loading, error } = useSelector((state) => state.bookings);
  const [form, setForm] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
    cabinClass: 'Economy',
  });

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: 'bookings/searchFlights', payload: form });
  };

  const handleBook = (flight) => {
    dispatch({ type: 'bookings/setBookingData', payload: { selectedItem: flight, type: 'flight' } });
  };

  return (
    <div className="flight-search-page">
      <div className="flight-hero">
        <div className="container">
          <h1><i className="fas fa-plane me-2"></i>Search Flights</h1>
          <p>Find the best deals on flights worldwide</p>

          <form onSubmit={handleSearch} className="flight-search-form">
            <div className="row g-3">
              <div className="col-md-3">
                <label>From</label>
                <input className="form-control" placeholder="Departure city" value={form.from}
                  onChange={(e) => setForm({ ...form, from: e.target.value })} required />
              </div>
              <div className="col-md-3">
                <label>To</label>
                <input className="form-control" placeholder="Destination city" value={form.to}
                  onChange={(e) => setForm({ ...form, to: e.target.value })} required />
              </div>
              <div className="col-md-2">
                <label>Date</label>
                <input type="date" className="form-control" value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              </div>
              <div className="col-md-2">
                <label>Passengers</label>
                <input type="number" className="form-control" min={1} max={9} value={form.passengers}
                  onChange={(e) => setForm({ ...form, passengers: Number(e.target.value) })} />
              </div>
              <div className="col-md-2">
                <label>Class</label>
                <select className="form-control" value={form.cabinClass}
                  onChange={(e) => setForm({ ...form, cabinClass: e.target.value })}>
                  <option>Economy</option>
                  <option>Business</option>
                  <option>First</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-search-flights mt-3">
              <i className="fas fa-search me-2"></i>Search Flights
            </button>
          </form>
        </div>
      </div>

      <div className="container py-5">
        {loading && <Loading text="Searching flights..." />}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && flights.length > 0 && (
          <>
            <h4 className="results-heading">
              {flights.length} flights found from <strong>{form.from}</strong> to <strong>{form.to}</strong>
            </h4>
            <div className="flights-list">
              {flights.map((flight) => (
                <div key={flight.id} className="flight-card">
                  <div className="flight-airline">
                    <div className="airline-logo">
                      <i className="fas fa-plane-departure"></i>
                    </div>
                    <div>
                      <strong>{flight.airline}</strong>
                      <small>{flight.flightNumber}</small>
                    </div>
                  </div>

                  <div className="flight-route">
                    <div className="flight-time">
                      <span className="time">{flight.departureTime}</span>
                      <span className="city">{flight.from}</span>
                    </div>
                    <div className="flight-duration">
                      <div className="duration-line"></div>
                      <span>{flight.duration}</span>
                      <small>{flight.stops === 0 ? 'Direct' : `${flight.stops} stop`}</small>
                    </div>
                    <div className="flight-time">
                      <span className="time">{flight.arrivalTime}</span>
                      <span className="city">{flight.to}</span>
                    </div>
                  </div>

                  <div className="flight-details">
                    <span className="flight-class"><i className="fas fa-chair me-1"></i>{flight.class}</span>
                    <span><i className="fas fa-luggage-cart me-1"></i>{flight.baggage}</span>
                    {flight.meal && <span><i className="fas fa-utensils me-1 text-success"></i>Meal</span>}
                  </div>

                  <div className="flight-price">
                    <div>
                      <span className="price-main">${flight.price}</span>
                      <small>/person</small>
                    </div>
                    <div className="total-price">Total: ${flight.totalPrice}</div>
                    <span className={`seats-badge ${flight.seatsAvailable < 5 ? 'urgent' : ''}`}>
                      {flight.seatsAvailable} seats left
                    </span>
                    <button className="btn btn-book-flight" onClick={() => handleBook(flight)}>
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && flights.length === 0 && !error && (
          <div className="empty-search text-center py-5">
            <i className="fas fa-plane fa-4x text-muted mb-3"></i>
            <h4>Search for available flights</h4>
            <p className="text-muted">Enter your travel details above to find the best flights</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
