import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('adminAuthToken');

  // Check if token exists.
  // In a real application, you might also want to decode the token
  // here to check for expiration or even make a quick API call to
  // validate the token with the backend, but for this capstone,
  // just checking for existence is a good start.
  if (!token) {
    // If no token, redirect to the admin login page
    // You can also pass the current location to redirect back after login
    // using the `state` prop in Navigate, but we'll keep it simple for now.
    return <Navigate to="/admin_login" replace />;
  }

  // If token exists, render the child route elements
  return <Outlet />;
};

export default ProtectedRoute;