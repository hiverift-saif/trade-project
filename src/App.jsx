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

// Global Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./Pages/ScrollToTop";

// Protected Routes
import TradingProtectedRoute from "./components/TradingProtectedRoute";
import AffiliateProtectedRoute from "./components/AffiliateProtectedRoute";
import DashboardLayout from './components/DashboardLayout'; // ✅ New Layout Import

// Public Pages
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

// Affiliate Pages
import Affiliates from "./Pages/Affiliates";
import AffiliateSignup from "./Pages/AffiliateSignup";
import AffiliateLogin from "./Pages/AffiliateLogin";

// Affiliate Dashboard
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

// Referral Pages
import RefrelSignUp from "./Refrel/RefrelSignUp";
import TermsAndConditions from "./Refrel/TermsAndConditions";
import SubAffiliateSignUp from "./Refrel/SubAffiliateSignUp";

// Finance Section
import DepositPage from "./Pages/finance/DepositPage";
import WithdrawPage from "./Pages/finance/WithdrawPage";
import PaymentMethodPage from "./Pages/finance/PaymentMethodPage";
import HistoryPage from "./Pages/finance/HistoryPage";
import CashbackPage from "./Pages/finance/CashbackPage";
import PromoCodesPage from "./Pages/finance/PromoCodesPage";
import MySafePage from "./Pages/finance/MySafePage";
import PaymentDetailsPage from "./Pages/finance/PaymentDetailsPage";

// Profile Section
import ProfilePage from "./Pages/Profile/ProfilePage";
import TradingProfilePage from "./Pages/Profile/TradingProfile";
import { TradingHistoryPage } from "./Pages/Profile/TradingHistoryPage";
import ForgotPassword from "./Pages/ForgotPassword.jsx";

// ---------------------------------------------------
// APP CONTENT
// ---------------------------------------------------
function AppContent() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // Auto scroll on route change
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [location]);

  // Hide Global Navbar on selected routes (Kyuki DashboardLayout ka apna header hai)
const hideNavbar =
    // path.startsWith("/affiliate") ||
    path.startsWith("/trading") ||
    path.startsWith("/finance") ||
    path.startsWith("/profilelayout") ||
    path === "/login" ||
    path === "/registration" ||
    path === "/forgot-password";


  // Hide footer on selected routes
  const hideFooter =
    hideNavbar ||
    ["/login", "/registration", "/affiliatelogin", "/affiliatesignup"].includes(
      path
    );

  return (
    <div className="">
      <ScrollToTop />

      {!hideNavbar && <Navbar />}

      {/* ROUTES */}
      
      <main className="">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/quickstart" element={<Quickstart />} />
          <Route path="/freedemo" element={<FreeDemo />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/tradingdashboard" element={<TradingDashboard />} />
          <Route path="/trade-closed" element={<TradeClosed />} />
          <Route path="/maintrading" element={<Maintrading />} />

          {/* Affiliates */}
          <Route path="/affiliates" element={<Affiliates />} />
          <Route path="/affiliatesignup" element={<AffiliateSignup />} />
          <Route path="/affiliatelogin" element={<AffiliateLogin />} />
          <Route path="/RefrelSignUp/:id" element={<RefrelSignUp />} />
          <Route path="/SubAffiliateSignUp" element={<SubAffiliateSignUp />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />

      
{/* PROTECTED DASHBOARD ROUTES */}


<Route
  element={
    <TradingProtectedRoute>
      <DashboardLayout />
    </TradingProtectedRoute>
  }
>
  {/* TRADING PAGES */}
  <Route path="/trading/*" element={<TradingProtectedRoute><Trading /></TradingProtectedRoute>} />

  {/* FINANCE PAGES */}
  <Route path="/finance/deposit" element={<DepositPage />} />
  <Route path="/finance/deposit/:method" element={<PaymentDetailsPage />} />
  <Route path="/finance/withdraw" element={<WithdrawPage />} />
  <Route path="/finance/history" element={<HistoryPage />} />
  <Route path="/finance/cashback" element={<CashbackPage />} />
  <Route path="/finance/promocodes" element={<PromoCodesPage />} />
  <Route path="/finance/mysafe" element={<MySafePage />} />

  <Route
    path="/finance"
    element={<Navigate to="/finance/deposit" replace />}
  />

  {/* PROFILE PAGES */}
  <Route
    path="/ProfileLayout/ProfilePage"
    element={<ProfilePage />}
  />
  <Route
    path="/ProfileLayout/Trading-Profile"
    element={<TradingProfilePage />}
  />
  <Route
    path="/ProfileLayout/Trading-History"
    element={<TradingHistoryPage />}
  />

  <Route
    path="/ProfileLayout"
    element={<Navigate to="/ProfileLayout/ProfilePage" replace />}
  />
</Route>



          {/* Affiliate Dashboard (Ye alag system hai isliye alag rakha hai) */}
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

          {/* Other */}
          <Route path="/deposit/:method" element={<PaymentMethodPage />} />
        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}

// ---------------------------------------------------
// MAIN APP WRAPPER
// ---------------------------------------------------
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;