import { createSlice } from '@reduxjs/toolkit';

const tripSlice = createSlice({
  name: 'trips',
  initialState: { trips: [], trip: null, loading: false, error: null },
  reducers: {
    fetchTripsRequest: (state) => { state.loading = true; state.error = null; },
    fetchTripsSuccess: (state, action) => { state.loading = false; state.trips = action.payload; },
    fetchTripsFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    fetchTrip: (state) => { state.loading = true; state.error = null; state.trip = null; },
    fetchTripSuccess: (state, action) => { state.loading = false; state.trip = action.payload; },
    createTrip: (state) => { state.loading = true; state.error = null; },
    createTripSuccess: (state, action) => { state.loading = false; state.trips.unshift(action.payload); },
    updateTrip: (state) => { state.loading = true; state.error = null; },
    updateTripSuccess: (state, action) => {
      state.loading = false;
      state.trips = state.trips.map((t) => t._id === action.payload._id ? action.payload : t);
      state.trip = action.payload;
    },
    deleteTrip: (state) => { state.loading = true; state.error = null; },
    deleteTripSuccess: (state, action) => {
      state.loading = false;
      state.trips = state.trips.filter((t) => t._id !== action.payload);
    },
    clearTrip: (state) => { state.trip = null; },
  },
});

export const {
  fetchTripsRequest, fetchTripsSuccess, fetchTripsFailure,
  fetchTrip, fetchTripSuccess,
  createTrip, createTripSuccess,
  updateTrip, updateTripSuccess,
  deleteTrip, deleteTripSuccess,
  clearTrip,
} = tripSlice.actions;

export default tripSlice.reducer;
