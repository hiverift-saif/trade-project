// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './Pages/ScrollToTop';

// Pages
import Home from './Pages/Home';
import FreeDemo from './Pages/FreeDemo';
import AboutUs from './Pages/AboutUs';
import Blog from './Pages/Blog';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Quickstart from './Pages/Quickstart';
import TradingDashboard from './Freedemo/TradingDashboard';
import TradeClosed from './Freedemo/TradeClosed';
import Maintrading from './Freedemo/Maintrading';
import Trading from './Pages/Trading';
import Affiliates from './Pages/Affiliates';
import AffiliateSignup from './Pages/AffiliateSignup';
import AffiliateLogin from './Pages/AffiliateLogin';


// Affiliate Dashboard Pages
import Links from './AffiliateDashboard/links';
import Payments from './AffiliateDashboard/payments';
import Telegram from './AffiliateDashboard/telegram';
import Support from './AffiliateDashboard/support';
import Subaffiliate from './AffiliateDashboard/subaffiliate';
import Statistics from './AffiliateDashboard/statistics';
import Promo from './AffiliateDashboard/promo';
import Programs from './AffiliateDashboard/programs';
import Profile from './AffiliateDashboard/profile';
import Dashboard from './AffiliateDashboard/Dashboard';


// import Dashboard from './AffiliateDashboard/Dashboard';
// import Profile from './AffiliateDashboard/profile';
// import Programs from './AffiliateDashboard/programs';
// import Promo from './AffiliateDashboard/promo';
// import Statistics from './AffiliateDashboard/statistics';
// import Subaffiliate from './AffiliateDashboard/subaffiliate';
// import Support from './AffiliateDashboard/support';
// import Telegram from './AffiliateDashboard/telegram';
// import Payments from './AffiliateDashboard/payments';
// import Links from './AffiliateDashboard/links'; // Make sure this exists

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Force scroll to top on page load
    window.scrollTo(0, 0);
  }, [location]);

  // Dashboard paths where Navbar and Footer should be hidden
  const dashboardPaths = [
    '/dashboard',
    '/profile',
    '/programs',
    '/promo',
    '/statistics',
    '/sub-affiliate',
    '/support',
    '/telegram',
    '/payments',
    '/links',
  ];

  const isDashboardRoute = dashboardPaths.includes(location.pathname.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {!isDashboardRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Public Pages */}
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
          <Route path="/affiliatelogin" element={<AffiliateLogin />} />

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
        </Routes>
      </main>
      {!isDashboardRoute && <Footer />}
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
