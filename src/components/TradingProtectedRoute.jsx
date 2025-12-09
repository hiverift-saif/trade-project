// src/components/TradingProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function TradingProtectedRoute({ children }) {
  const location = useLocation();
  
  const token = 
    localStorage.getItem("user") || 
    sessionStorage.getItem("user");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}