import { createSlice } from '@reduxjs/toolkit';

const tripSlice = createSlice({
  name: 'trips',
  initialState: { trips: [], trip: null, loading: false, error: null },
  reducers: {
    fetchTripsRequest: (state) => { state.loading = true; state.error = null; },
    fetchTripsSuccess: (state, action) => { state.loading = false; state.trips = action.payload; },
    fetchTripsFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    fetchTripSuccess: (state, action) => { state.loading = false; state.trip = action.payload; },
    createTripSuccess: (state, action) => { state.trips.unshift(action.payload); },
    updateTripSuccess: (state, action) => {
      state.trips = state.trips.map((t) => t._id === action.payload._id ? action.payload : t);
      state.trip = action.payload;
    },
    deleteTripSuccess: (state, action) => {
      state.trips = state.trips.filter((t) => t._id !== action.payload);
    },
  },
});

export const {
  fetchTripsRequest, fetchTripsSuccess, fetchTripsFailure,
  fetchTripSuccess, createTripSuccess, updateTripSuccess, deleteTripSuccess,
} = tripSlice.actions;

export default tripSlice.reducer;
