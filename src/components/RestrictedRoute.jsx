import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectSignIn } from 'redux/authSlice';

const RestrictedRoute = ({ children, redirectTo = '/' }) => {
  const isSignedIn = useSelector(selectSignIn);

  return isSignedIn ? <Navigate to={redirectTo} replace /> : children;
};

export default RestrictedRoute;
