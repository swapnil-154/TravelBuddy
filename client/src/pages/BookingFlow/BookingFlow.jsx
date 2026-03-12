import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../../redux/slices/bookingSlice';
import api from '../../services/api';
import './BookingFlow.css';

const STEPS = ['Select', 'Details', 'Payment', 'Confirmation'];

const BookingFlow = () => {
  const { selectedItem, bookingType } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState({ firstName: '', lastName: '', email: '', phone: '', specialRequests: '' });
  const [payment, setPayment] = useState({ cardNumber: '', expiryDate: '', cvv: '', nameOnCard: '' });
  const [confirmed, setConfirmed] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    if (step === 2) confirmBooking();
  };

  const confirmBooking = async () => {
    setProcessing(true);
    setPaymentError(null);

    try {
      const totalCost = selectedItem?.totalPrice || selectedItem?.pricePerNight || 0;

      // Step 1: Create payment intent
      const { data: paymentData } = await api.post('/payments/create-intent', {
        amount: totalCost,
        currency: 'usd',
      });

      // Step 2: Confirm payment
      const { data: confirmData } = await api.post('/payments/confirm', {
        paymentId: paymentData.paymentId,
      });

      if (confirmData.status === 'succeeded') {
        // Step 3: Create booking with payment info
        const code = 'TB' + Math.random().toString(36).slice(2, 10).toUpperCase();
        setConfirmed({ code, date: new Date().toLocaleDateString() });

        dispatch(createBooking({
          type: bookingType,
          totalCost,
          details: { ...selectedItem },
          contactEmail: details.email,
          contactPhone: details.phone,
          paymentId: paymentData.paymentId,
          paymentStatus: 'paid',
          status: 'confirmed',
        }));
      } else {
        setPaymentError('Payment could not be completed. Please try again.');
        setStep(2);
      }
    } catch (error) {
      setPaymentError(error.response?.data?.message || 'Payment processing failed. Please try again.');
      setStep(2);
    }

    setProcessing(false);
  };

  if (!selectedItem) {
    return (
      <div className="booking-empty text-center py-5">
        <i className="fas fa-ticket-alt fa-4x text-muted mb-3"></i>
        <h4>No item selected for booking</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/flights')}>Browse Flights</button>
      </div>
    );
  }

  return (
    <div className="booking-flow-page">
      <div className="booking-hero">
        <div className="container">
          <h1>Complete Your Booking</h1>
          <p>{bookingType === 'flight' ? '✈️ Flight' : '🏨 Hotel'} Booking</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="booking-stepper">
          {STEPS.map((s, i) => (
            <div key={s} className={`booking-step ${i <= step ? 'active' : ''} ${i < step ? 'completed' : ''}`}>
              <div className="step-circle">{i < step ? <i className="fas fa-check"></i> : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
          <div className="step-connector"></div>
        </div>

        <div className="row g-4 mt-2">
          <div className="col-lg-8">
            <div className="booking-card">
              {step === 0 && (
                <div>
                  <h4>Selected {bookingType === 'flight' ? 'Flight' : 'Hotel'}</h4>
                  <div className="selected-item-card">
                    {bookingType === 'flight' ? (
                      <>
                        <div className="booking-flight-route">
                          <span>{selectedItem.from}</span>
                          <i className="fas fa-plane mx-3 text-primary"></i>
                          <span>{selectedItem.to}</span>
                        </div>
                        <div className="booking-details-grid">
                          <span><strong>Airline:</strong> {selectedItem.airline}</span>
                          <span><strong>Flight:</strong> {selectedItem.flightNumber}</span>
                          <span><strong>Departure:</strong> {selectedItem.departureTime}</span>
                          <span><strong>Duration:</strong> {selectedItem.duration}</span>
                          <span><strong>Class:</strong> {selectedItem.class}</span>
                          <span><strong>Baggage:</strong> {selectedItem.baggage}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <h5>{selectedItem.name}</h5>
                        <p>{selectedItem.address}</p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h4>Passenger Details</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label>First Name</label>
                      <input className="form-control booking-input" value={details.firstName}
                        onChange={(e) => setDetails({ ...details, firstName: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label>Last Name</label>
                      <input className="form-control booking-input" value={details.lastName}
                        onChange={(e) => setDetails({ ...details, lastName: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label>Email</label>
                      <input type="email" className="form-control booking-input" value={details.email}
                        onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label>Phone</label>
                      <input className="form-control booking-input" value={details.phone}
                        onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
                    </div>
                    <div className="col-12">
                      <label>Special Requests</label>
                      <textarea className="form-control booking-input" rows={3} value={details.specialRequests}
                        onChange={(e) => setDetails({ ...details, specialRequests: e.target.value })}
                        placeholder="Wheelchair, vegetarian meal, etc." />
                    </div>
                  </div>
                  <div className="alert alert-info mt-3">
                    <i className="fas fa-info-circle me-2"></i>
                    A booking confirmation will be sent to your email and phone number.
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h4>Payment Details</h4>
                  {paymentError && (
                    <div className="alert alert-danger">
                      <i className="fas fa-exclamation-circle me-2"></i>{paymentError}
                    </div>
                  )}
                  <div className="card-visual">
                    <div className="card-chip"></div>
                    <div className="card-number">{payment.cardNumber || '•••• •••• •••• ••••'}</div>
                    <div className="card-footer-info">
                      <span>{payment.nameOnCard || 'CARD HOLDER'}</span>
                      <span>{payment.expiryDate || 'MM/YY'}</span>
                    </div>
                  </div>
                  <div className="row g-3 mt-3">
                    <div className="col-12">
                      <label>Card Number</label>
                      <input className="form-control booking-input" placeholder="1234 5678 9012 3456"
                        maxLength={19} value={payment.cardNumber}
                        onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value.replace(/(\d{4})/g, '$1 ').trim() })} />
                    </div>
                    <div className="col-md-6">
                      <label>Name on Card</label>
                      <input className="form-control booking-input" placeholder="John Doe" value={payment.nameOnCard}
                        onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })} />
                    </div>
                    <div className="col-md-3">
                      <label>Expiry Date</label>
                      <input className="form-control booking-input" placeholder="MM/YY" maxLength={5} value={payment.expiryDate}
                        onChange={(e) => setPayment({ ...payment, expiryDate: e.target.value })} />
                    </div>
                    <div className="col-md-3">
                      <label>CVV</label>
                      <input type="password" className="form-control booking-input" placeholder="•••" maxLength={4} value={payment.cvv}
                        onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} />
                    </div>
                  </div>
                  <div className="alert alert-success mt-3">
                    <i className="fas fa-shield-alt me-2"></i>
                    Your payment is processed securely. Card details are not stored.
                  </div>
                </div>
              )}

              {step === 3 && confirmed && (
                <div className="confirmation-section text-center">
                  <div className="confirmation-icon">✅</div>
                  <h3>Booking Confirmed!</h3>
                  <p className="text-muted">Your booking has been confirmed and payment processed successfully.</p>
                  <div className="confirmation-code">
                    <span>Booking Reference</span>
                    <strong>{confirmed.code}</strong>
                  </div>
                  <p className="text-muted mt-2">Confirmation sent to <strong>{details.email}</strong></p>
                  {details.phone && (
                    <p className="text-muted">SMS notification sent to <strong>{details.phone}</strong></p>
                  )}
                  <button className="btn btn-primary mt-4" onClick={() => navigate('/my-trips')}>
                    View My Trips
                  </button>
                </div>
              )}

              {step < 3 && (
                <div className="booking-nav mt-4">
                  {step > 0 && (
                    <button className="btn btn-back" onClick={() => setStep(step - 1)} disabled={processing}>
                      <i className="fas fa-arrow-left me-2"></i>Back
                    </button>
                  )}
                  <button className="btn btn-next-step ms-auto" onClick={handleNext} disabled={processing}>
                    {processing ? (
                      <><span className="spinner-border spinner-border-sm me-2"></span>Processing Payment...</>
                    ) : step === 2 ? (
                      <><i className="fas fa-lock me-2"></i>Confirm & Pay</>
                    ) : (
                      <>Continue<i className="fas fa-arrow-right ms-2"></i></>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="booking-summary">
              <h5>Price Summary</h5>
              <div className="price-breakdown">
                <div className="price-row"><span>Base Price</span><strong>${selectedItem.price || selectedItem.pricePerNight}</strong></div>
                <div className="price-row"><span>Taxes & Fees</span><strong>${Math.round((selectedItem.price || selectedItem.pricePerNight) * 0.12)}</strong></div>
                <div className="price-row price-total"><span>Total</span><strong>${selectedItem.totalPrice || Math.round((selectedItem.price || selectedItem.pricePerNight) * 1.12)}</strong></div>
              </div>
              <div className="secure-badge mt-3">
                <i className="fas fa-lock me-2"></i>Secure Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
