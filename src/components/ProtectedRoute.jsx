import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
const isLoggedIn = localStorage.getItem("affiliate_user");
// console.log(isLoggedIn,"isLoggedIn")

  // Agar login nahi hua hai to redirect kar do login page pe
  if (!isLoggedIn) {
    return <Navigate to="/affiliatelogin" replace />;
  }

  // Agar login hua hai to page dikhao
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
