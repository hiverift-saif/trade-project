// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./Pages/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./Pages/Home";
import FreeDemo from "./Pages/FreeDemo";
import AboutUs from "./Pages/AboutUs";
import Blog from "./Pages/Blog";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Quickstart from "./Pages/Quickstart";
import TradingDashboard from "./Freedemo/TradingDashboard";
import TradeClosed from "./Freedemo/TradeClosed";
import Maintrading from "./Freedemo/Maintrading";
import Trading from "./Pages/Trading";
import Affiliates from "./Pages/Affiliates";
import AffiliateSignup from "./Pages/AffiliateSignup";
import AffiliateLogin from "./Pages/AffiliateLogin";

// Affiliate Dashboard Pages
import Links from "./AffiliateDashboard/Links";
import Payments from "./AffiliateDashboard/payments";
import Telegram from "./AffiliateDashboard/Telegram";
import Support from "./AffiliateDashboard/support";
import Subaffiliate from "./AffiliateDashboard/subaffiliate";
import Statistics from "./AffiliateDashboard/statistics";
import Promo from "./AffiliateDashboard/promo";
import Programs from "./AffiliateDashboard/programs";
import Profile from "./AffiliateDashboard/profile";
import Dashboard from "./AffiliateDashboard/Dashboard";
import RefrelSignUp from "./Refrel/RefrelSignUp";
import TermsAndConditions from "./Refrel/TermsAndConditions";
import Analytics from "./AffiliateDashboard/Analytics";
import SubAffiliateSignUp from "./Refrel/SubAffiliateSignUp";

function AppContent() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [location]);

  // ✅ Navbar hide routes (dashboard + trading)
  const dashboardPaths = [
    "/dashboard",
    "/profile",
    "/programs",
    "/promo",
    "/statistics",
    "/sub-affiliate",
    "/support",
    "/telegram",
    "/payments",
    "/links",
    "/analytics",
  ];

  const isDashboardOrTradingRoute =
    dashboardPaths.includes(path) || path.startsWith("/trading");

  // ✅ Footer hide routes (dashboard + trading + login/register)
  const hideFooterPaths = [
    "/login",
    "/registration",
    "/affiliatelogin",
    "/affiliatesignup",
  ];

  const shouldHideFooter =
    isDashboardOrTradingRoute || hideFooterPaths.includes(path);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      {/* ✅ Navbar hide only for dashboard or trading */}
      {!isDashboardOrTradingRoute && <Navbar />}

      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/quickstart" element={<Quickstart />} />
          <Route path="/freedemo" element={<FreeDemo />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/tradingdashboard" element={<TradingDashboard />} />
          <Route path="/trade-closed" element={<TradeClosed />} />
          <Route path="/maintrading" element={<Maintrading />} />
          <Route path="/trading/*" element={<Trading />} />
          <Route path="/affiliates" element={<Affiliates />} />
          <Route path="/affiliatesignup" element={<AffiliateSignup />} />
          <Route path="/RefrelSignUp/:id" element={<RefrelSignUp />} />
          <Route path="/SubAffiliateSignUp" element={<SubAffiliateSignUp />} />

          <Route path="/affiliatelogin" element={<AffiliateLogin />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />

          {/* ✅ Protected Affiliate Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programs"
            element={
              <ProtectedRoute>
                <Programs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/promo"
            element={
              <ProtectedRoute>
                <Promo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sub-affiliate"
            element={
              <ProtectedRoute>
                <Subaffiliate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            }
          />
          <Route
            path="/telegram"
            element={
              <ProtectedRoute>
                <Telegram />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/links"
            element={
              <ProtectedRoute>
                <Links />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* ✅ Footer hide based on login/register + dashboard + trading */}
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
