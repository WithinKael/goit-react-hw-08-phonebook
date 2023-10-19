import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectSignIn } from 'redux/authSlice';

const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const isSignedIn = useSelector(selectSignIn);

  return isSignedIn ? children : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
