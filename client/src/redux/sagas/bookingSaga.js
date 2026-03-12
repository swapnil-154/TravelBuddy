import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import {
  searchStart, searchError, setFlights, setHotels,
  fetchBookingsRequest, fetchBookingsSuccess, fetchBookingsFailure,
  createBookingSuccess,
} from '../slices/bookingSlice';

function* searchFlightsSaga(action) {
  try {
    yield put(searchStart());
    const { from, to, date, passengers, cabinClass } = action.payload;
    const { data } = yield call(
      api.get,
      `/flights/search?from=${from}&to=${to}&date=${date}&passengers=${passengers || 1}&class=${cabinClass || 'Economy'}`
    );
    yield put(setFlights(data.flights));
  } catch (error) {
    yield put(searchError(error.response?.data?.message || 'Flight search failed'));
  }
}

function* searchHotelsSaga(action) {
  try {
    yield put(searchStart());
    const { destination, checkIn, checkOut, guests, rooms } = action.payload;
    const { data } = yield call(
      api.get,
      `/hotels/search?destination=${destination}&checkIn=${checkIn || ''}&checkOut=${checkOut || ''}&guests=${guests || 1}&rooms=${rooms || 1}`
    );
    yield put(setHotels(data.hotels));
  } catch (error) {
    yield put(searchError(error.response?.data?.message || 'Hotel search failed'));
  }
}

function* fetchBookingsSaga() {
  try {
    const { data } = yield call(api.get, '/bookings');
    yield put(fetchBookingsSuccess(data.bookings));
  } catch (error) {
    yield put(fetchBookingsFailure(error.response?.data?.message || 'Failed to fetch bookings'));
  }
}

function* createBookingSaga(action) {
  try {
    const { data } = yield call(api.post, '/bookings', action.payload);
    yield put(createBookingSuccess(data.booking));
  } catch (error) {
    yield put(searchError(error.response?.data?.message || 'Booking failed'));
  }
}

export default function* bookingSaga() {
  yield takeLatest('bookings/searchFlights', searchFlightsSaga);
  yield takeLatest('bookings/searchHotels', searchHotelsSaga);
  yield takeLatest(fetchBookingsRequest.type, fetchBookingsSaga);
  yield takeLatest('bookings/createBooking', createBookingSaga);
}
