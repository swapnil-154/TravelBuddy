import { createSlice } from '@reduxjs/toolkit';

const destinationSlice = createSlice({
  name: 'destinations',
  initialState: {
    destinations: [],
    destination: null,
    searchResults: [],
    loading: false,
    error: null,
    total: 0,
    pages: 1,
    currentPage: 1,
  },
  reducers: {
    fetchDestinationsRequest: (state) => { state.loading = true; state.error = null; },
    fetchDestinationsSuccess: (state, action) => {
      state.loading = false;
      state.destinations = action.payload.destinations;
      state.total = action.payload.total;
      state.pages = action.payload.pages;
      state.currentPage = action.payload.currentPage;
    },
    fetchDestinationsFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    fetchDestinationSuccess: (state, action) => { state.loading = false; state.destination = action.payload; },
    setSearchResults: (state, action) => { state.searchResults = action.payload; },
    clearSearchResults: (state) => { state.searchResults = []; },
  },
});

export const {
  fetchDestinationsRequest, fetchDestinationsSuccess, fetchDestinationsFailure,
  fetchDestinationSuccess, setSearchResults, clearSearchResults,
} = destinationSlice.actions;

export default destinationSlice.reducer;
