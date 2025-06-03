import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth(); // Use isAuthenticated and isLoading from context

  if (isLoading) {
    // Optional: Show a loading spinner or a blank page while auth state is being determined
    // This prevents a flash of the login page if the user is actually authenticated but
    // the context is still initializing from localStorage.
    return <div>Loading authentication...</div>; // Or a proper spinner component
  }

  if (!isAuthenticated) {
    // If not authenticated (after initial loading is done), redirect to login
    return <Navigate to="/admin_login" replace />;
  }

  // If authenticated, render the child route elements
  return <Outlet />;
};

export default ProtectedRoute;  