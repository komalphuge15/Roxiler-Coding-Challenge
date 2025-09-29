import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" />;

  if (role && role !== userRole) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
