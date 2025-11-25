// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PrivateRoute component
 * - children: the component to render if access allowed
 * - allowedRoles: array of roles that can access this route
 */
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Access allowed
  return children || <Outlet />;
};

export default PrivateRoute;
