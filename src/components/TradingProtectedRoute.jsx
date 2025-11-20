// src/routes/TradingProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function TradingProtectedRoute({ children }) {
  const token = localStorage.getItem("tp_user_token");
  const location = useLocation();

  if (!token) {
    // user ne direct trading open kiya to last path save kar le
    localStorage.setItem("redirect_to", location.pathname);
    return <Navigate to="/login" replace />;
  }

  return children;
}
