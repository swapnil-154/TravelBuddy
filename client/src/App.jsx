import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Destinations from './pages/Destinations/Destinations';
import DestinationDetail from './pages/DestinationDetail/DestinationDetail';
import TripPlanner from './pages/TripPlanner/TripPlanner';
import FlightSearch from './pages/FlightSearch/FlightSearch';
import HotelSearch from './pages/HotelSearch/HotelSearch';
import BookingFlow from './pages/BookingFlow/BookingFlow';
import MyTrips from './pages/MyTrips/MyTrips';
import Blog from './pages/Blog/Blog';
import BlogDetail from './pages/BlogDetail/BlogDetail';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';

import ProtectedRoute from './components/ProtectedRoute';
import { loadUserFromToken } from './redux/slices/authSlice';

import './styles/variables.css';
import './styles/global.css';
import './styles/animations.css';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) dispatch(loadUserFromToken());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetail />} />
        <Route path="/flights" element={<FlightSearch />} />
        <Route path="/hotels" element={<HotelSearch />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/trip-planner" element={<ProtectedRoute><TripPlanner /></ProtectedRoute>} />
        <Route path="/trip-planner/:id" element={<ProtectedRoute><TripPlanner /></ProtectedRoute>} />
        <Route path="/my-trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute><BookingFlow /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
