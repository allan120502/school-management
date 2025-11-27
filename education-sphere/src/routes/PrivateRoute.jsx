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
  const { currentUser } = useAuth();

  // Not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but role not allowed
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return (
      <h1 className="p-6 text-3xl text-center" style={{ color: "#0B3D91" }}>
        403 - Unauthorized
      </h1>
    );
    // Or redirect to a specific unauthorized page:
    // return <Navigate to="/unauthorized" replace />;
  }

  // Access allowed
  return children || <Outlet />;
};

export default PrivateRoute;
