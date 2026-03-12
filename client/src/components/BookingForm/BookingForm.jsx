import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setBookingData } from '../../redux/slices/bookingSlice';
import './BookingForm.css';

const BookingForm = ({ item, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    specialRequests: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBook = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(setBookingData({ ...formData, selectedItem: item, type }));
    navigate('/booking');
  };

  return (
    <div className="booking-form">
      <h5 className="booking-form-title">
        <i className="fas fa-lock me-2"></i>Book Now
      </h5>

      <div className="price-display">
        <span className="price-label">Total Price</span>
        <span className="price-amount">${(item?.totalPrice || item?.price || 0).toLocaleString()}</span>
        <span className="price-currency">USD</span>
      </div>

      <div className="row g-3">
        <div className="col-6">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <input
            type="tel"
            className="form-control"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <textarea
            className="form-control"
            placeholder="Special Requests (optional)"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </div>

      <button className="btn btn-book-now w-100 mt-3" onClick={handleBook}>
        <i className="fas fa-credit-card me-2"></i>
        {user ? 'Proceed to Payment' : 'Login to Book'}
      </button>

      <div className="booking-security">
        <i className="fas fa-shield-alt"></i>
        <span>Secure & Encrypted Booking</span>
      </div>
    </div>
  );
};

export default BookingForm;
