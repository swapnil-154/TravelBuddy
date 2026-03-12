import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    booking: null,
    flights: [],
    hotels: [],
    loading: false,
    error: null,
    step: 1,
    bookingData: {},
    selectedItem: null,
    bookingType: 'flight',
  },
  reducers: {
    fetchBookingsRequest: (state) => { state.loading = true; state.error = null; },
    fetchBookingsSuccess: (state, action) => { state.loading = false; state.bookings = action.payload; },
    fetchBookingsFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    setFlights: (state, action) => { state.flights = action.payload; state.loading = false; },
    setHotels: (state, action) => { state.hotels = action.payload; state.loading = false; },
    searchStart: (state) => { state.loading = true; state.error = null; },
    searchError: (state, action) => { state.loading = false; state.error = action.payload; },
    setStep: (state, action) => { state.step = action.payload; },
    setBookingData: (state, action) => {
      state.bookingData = { ...state.bookingData, ...action.payload };
      if (action.payload.selectedItem) state.selectedItem = action.payload.selectedItem;
      if (action.payload.type) state.bookingType = action.payload.type;
    },
    createBookingSuccess: (state, action) => {
      state.bookings.unshift(action.payload);
      state.booking = action.payload;
      state.step = 1;
      state.bookingData = {};
    },
    clearBookingError: (state) => { state.error = null; },
  },
});

export const {
  fetchBookingsRequest, fetchBookingsSuccess, fetchBookingsFailure,
  setFlights, setHotels, searchStart, searchError,
  setStep, setBookingData, createBookingSuccess, clearBookingError,
} = bookingSlice.actions;

export default bookingSlice.reducer;
