// src/hook/getRole.js
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const getRole = () => {
 
  const role = localStorage.getItem('role');
  return role;
};

const ProtectedRoute = ({ allowedRoles }) => {
  const role = getRole();
  const location = useLocation();

  if (!role) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  }

  // If the role is not allowed, redirect to a 404 page
  return <Navigate to="/404" state={{ from: location }} replace />;
};

export default ProtectedRoute;
