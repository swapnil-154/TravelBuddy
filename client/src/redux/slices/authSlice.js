import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;
const tokenFromStorage = localStorage.getItem('token') || null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromStorage,
    token: tokenFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state) => { state.loading = true; state.error = null; },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    registerRequest: (state) => { state.loading = true; state.error = null; },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    registerFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    updateUserSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearError: (state) => { state.error = null; },
    loadUserFromToken: (state) => {
      // Token-based re-hydration is handled by saga; this is a no-op trigger
    },
  },
});

export const {
  loginRequest, loginSuccess, loginFailure,
  registerRequest, registerSuccess, registerFailure,
  logout, updateUserSuccess, clearError, loadUserFromToken,
} = authSlice.actions;

export default authSlice.reducer;
