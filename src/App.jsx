// src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./Pages/ScrollToTop";
// import ProtectedRoute from "./components/ProtectedRoute";
import TradingProtectedRoute from "./components/TradingProtectedRoute";
import AffiliateProtectedRoute from "./components/AffiliateProtectedRoute";

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
import Payments from "./AffiliateDashboard/payments.jsx";
import Telegram from "./AffiliateDashboard/Telegram";
import Support from "./AffiliateDashboard/Support";
import Subaffiliate from "./AffiliateDashboard/Subaffiliate";
import Statistics from "./AffiliateDashboard/Statistics";
import Promo from "./AffiliateDashboard/Promo";
import Programs from "./AffiliateDashboard/Programs";
import Profile from "./AffiliateDashboard/profile.jsx";
import Dashboard from "./AffiliateDashboard/Dashboard";
import Analytics from "./AffiliateDashboard/Analytics";

// Referral
import RefrelSignUp from "./Refrel/RefrelSignUp";
import TermsAndConditions from "./Refrel/TermsAndConditions";
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
import ProfileLayout from "./layout/ProfileLayout";
import { TradingHistoryPage } from "./Pages/Profile/TradingHistoryPage";
import TradingProfilePage from "./Pages/Profile/TradingProfile";
import ProfilePage from "./Pages/Profile/ProfilePage";

function AppContent() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [location]);

  // Hide navbar routes
  const hideNavbar =
    path.startsWith("/affiliate/dashboard") ||
    path.startsWith("/affiliate/profile") ||
    path.startsWith("/affiliate/statistics") ||
    path.startsWith("/affiliate/links") ||
    path.startsWith("/affiliate/analytics") ||
    path.startsWith("/affiliate/payments") ||
    path.startsWith("/affiliate/promo") ||
    path.startsWith("/affiliate/support") ||
    path.startsWith("/affiliate/programs") ||
    path.startsWith("/affiliate/sub-affiliate") ||
    path.startsWith("/affiliate/telegram") ||
    path.startsWith("/trading") ||
    path.startsWith("/finance") ||
    path.startsWith("/profile");

  // Hide footer routes
  const hideFooter =
    hideNavbar ||
    path.startsWith("/affiliate") ||
    ["/login", "/registration", "/affiliatelogin", "/affiliatesignup"].includes(
      path
    );

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      {!hideNavbar && <Navbar />}

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
          <Route path="/affiliates" element={<Affiliates />} />
          <Route path="/affiliatesignup" element={<AffiliateSignup />} />
          <Route path="/RefrelSignUp/:id" element={<RefrelSignUp />} />
          <Route path="/SubAffiliateSignUp" element={<SubAffiliateSignUp />} />
          <Route path="/affiliatelogin" element={<AffiliateLogin />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

          {/* ⭐ Trading Protected Routes */}
          <Route
            path="/trading"
            element={
              <TradingProtectedRoute>
                <Trading />
              </TradingProtectedRoute>
            }
          />

          <Route
            path="/trading/"
            element={
              <TradingProtectedRoute>
                <Trading />
              </TradingProtectedRoute>
            }
          />

          {/* Affiliate Dashboard Routes */}
          <Route
            path="/affiliate/dashboard"
            element={
              <AffiliateProtectedRoute>
                <Dashboard />
              </AffiliateProtectedRoute>
            }
          />

          <Route
            path="/affiliate/profile"
            element={
              <AffiliateProtectedRoute>
                <Profile />
              </AffiliateProtectedRoute>
            }
          />

          <Route
            path="/affiliate/statistics"
            element={
              <AffiliateProtectedRoute>
                <Statistics />
              </AffiliateProtectedRoute>
            }
          />

          <Route
            path="/affiliate/links"
            element={
              <AffiliateProtectedRoute>
                <Links />
              </AffiliateProtectedRoute>
            }
          />

          <Route
            path="/affiliate/analytics"
            element={
              <AffiliateProtectedRoute>
                <Analytics />
              </AffiliateProtectedRoute>
            }
          />

          <Route
            path="/affiliate/payments"
            element={
              <AffiliateProtectedRoute>
                <Payments />
              </AffiliateProtectedRoute>
            }
          />

          <Route
            path="/affiliate/promo"
            element={
              <AffiliateProtectedRoute>
                <Promo />
              </AffiliateProtectedRoute>
            }
          />

          <Route
            path="/affiliate/support"
            element={
              <AffiliateProtectedRoute>
                <Support />
              </AffiliateProtectedRoute>
            }
          />

          <Route
            path="/affiliate/programs"
            element={
              <AffiliateProtectedRoute>
                <Programs />
              </AffiliateProtectedRoute>
            }
          />

          <Route
            path="/affiliate/sub-affiliate"
            element={
              <AffiliateProtectedRoute>
                <Subaffiliate />
              </AffiliateProtectedRoute>
            }
          />

          <Route
            path="/affiliate/telegram"
            element={
              <AffiliateProtectedRoute>
                <Telegram />
              </AffiliateProtectedRoute>
            }
          />

          {/* Finance Section */}
          <Route path="/finance" element={<FinanceLayout />}>
            <Route index element={<Navigate to="/finance/deposit" replace />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="deposit/:method" element={<PaymentDetailsPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="cashback" element={<CashbackPage />} />
            <Route path="promocodes" element={<PromoCodesPage />} />
            <Route path="mysafe" element={<MySafePage />} />
          </Route>

          {/* Profile Section */}
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<Navigate to="/profile/Profile" replace />} />
            <Route path="Profile" element={<ProfilePage />} />
            <Route path="Trading-Profile" element={<TradingProfilePage />} />
            <Route path="Trading-History" element={<TradingHistoryPage />} />
          </Route>

          <Route path="/deposit/:method" element={<PaymentMethodPage />} />
        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
