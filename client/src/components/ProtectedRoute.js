import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ element, allowedRoles }) {
  const { user } = useAuth(); // Adjusted to get user role

  if (user) {
    // User is authenticated
    if (allowedRoles.includes(user.role)) {
      return element;
    }
    // Redirect based on role
    return user.role === 'admin' ? <Navigate to="/allorders" /> : <Navigate to="/myorders" />;
  }

  // Not authenticated
  return <Navigate to="/loginuser" />;
}

export default ProtectedRoute;
