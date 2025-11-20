// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./Pages/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./Pages/ScrollToTop";

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
import Links from "./AffiliateDashboard/links";
import Payments from "./AffiliateDashboard/payments";
import Telegram from "./AffiliateDashboard/telegram";
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

// Finance Pages
import DepositPage from "./Pages/finance/DepositPage";
import WithdrawPage from "./Pages/finance/WithdrawPage";
import PaymentMethodPage from "./Pages/finance/PaymentMethodPage";
import HistoryPage from "./Pages/finance/HistoryPage";
import CashbackPage from "./Pages/finance/CashbackPage";
import PromoCodesPage from "./Pages/finance/PromoCodesPage";
import MySafePage from "./Pages/finance/MySafePage";
import FinanceLayout from "./layout/FinanceLayout";
import PaymentDetailsPage from "./Pages/finance/PaymentDetailsPage";

// Profile Pages
// import TradingProfilePage from "./Pages/profile/TradingProfile";
// import TradingHistoryPage from "./Pages/profile/TradingHistoryPage";

import ProfileLayout from "./layout/ProfileLayout";
import { TradingHistoryPage } from "./Pages/Profile/TradingHistoryPage";
import TradingProfilePage from "./Pages/Profile/TradingProfile";
import ProfilePage from "./Pages/Profile/ProfilePage";

function AppContent() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

    const hideNavbarRoutes = [
    "/profile/Profile",
    "/profile/Trading-Profile",
    "/profile/Trading-History"
  ];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);


  useEffect(() => {
    // Disable browser scroll restoration
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
  ];

  const isDashboardRoute = dashboardPaths.includes(
    location.pathname.toLowerCase()
  );

  // Check if it's a finance or profile route (don't show default navbar/footer)
  const isFinanceRoute = location.pathname.toLowerCase().startsWith("/finance");
  const isProfileRoute = location.pathname.toLowerCase().startsWith("/profile");
  const isTradingRoute = location.pathname.toLowerCase().startsWith("/trading"); // 👈 NEW
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      {/* ✅ Navbar hide only for dashboard or trading */}
      {!isDashboardOrTradingRoute && <Navbar />}
    {!hideNavbar &&
 !isDashboardRoute &&
 !isFinanceRoute &&
 <Navbar />}


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
          {/* <Route path="/trading/*" element={<Trading />} /> */}
          <Route path="/affiliates" element={<Affiliates />} />
          <Route path="/affiliatesignup" element={<AffiliateSignup />} />
          <Route path="/RefrelSignUp/:id" element={<RefrelSignUp />} />
          <Route path="/SubAffiliateSignUp" element={<SubAffiliateSignUp />} />

          <Route
            path="/trading/*"
            element={
              <ProtectedRoute>
                <Trading />
              </ProtectedRoute>
            }
          />
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
          {/* Affiliate Dashboard Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/sub-affiliate" element={<Subaffiliate />} />
          <Route path="/support" element={<Support />} />
          <Route path="/telegram" element={<Telegram />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/links" element={<Links />} />

          {/* Finance Section with Sidebar Layout */}
          <Route path="/finance" element={<FinanceLayout />}>
            {/* Default route - redirect to deposit */}
            <Route index element={<Navigate to="/finance/deposit" replace />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="deposit/:method" element={<PaymentDetailsPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="cashback" element={<CashbackPage />} />
            <Route path="promocodes" element={<PromoCodesPage />} />
            <Route path="mysafe" element={<MySafePage />} />
          </Route>

          {/* Profile Section with Sidebar Layout */}

          <Route path="/profile" element={<ProfileLayout />}>
            {/* Default route (redirect to /profile/Profile if user goes to /profile) */}
            <Route index element={<Navigate to="/profile/Profile" replace />} />

            {/* Separate profile page */}
            <Route path="Profile" element={<ProfilePage />} />

            {/* Trading routes */}
            <Route path="Trading-Profile" element={<TradingProfilePage />} />
            <Route path="Trading-History" element={<TradingHistoryPage />} />
          </Route>

          {/* Deposit Method Page (outside layout) */}
          <Route path="/deposit/:method" element={<PaymentMethodPage />} />
        </Routes>
      </main>
      {!isDashboardRoute && !isFinanceRoute && !isProfileRoute && <Footer />}
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
