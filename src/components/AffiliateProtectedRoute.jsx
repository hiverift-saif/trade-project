import { Navigate } from "react-router-dom";

const AffiliateProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("affiliate_token");
  console.log("Affiliate Token:", token);
  console.log("Children:", (!token));

  if (!token) {
    return <Navigate to="/affiliatelogin" replace />;
  }

  return children;
};

export default AffiliateProtectedRoute;
