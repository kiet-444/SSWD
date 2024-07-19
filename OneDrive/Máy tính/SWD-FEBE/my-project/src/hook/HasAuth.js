import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
export default function HasAuth() {
  const location = useLocation();

  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  console.log('HasAuth: token', token, 'role', role);
  if (token && role === "Admin") {
    console.log('Redirecting to /home');

    return <Outlet />; // Render the protected routes
  } else if (token && role === "staff") {
    return <Navigate to="/home" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
}
