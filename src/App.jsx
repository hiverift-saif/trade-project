import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
import ScrollToTop from "./Pages/ScrollToTop";

function App() {
  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Force scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Quickstart" element={<Quickstart />} />
          <Route path="/freedemo" element={<FreeDemo />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/TradingDashboard" element={<TradingDashboard />} />
          <Route path="/trade-closed" element={<TradeClosed />} />
          <Route path="/Maintrading" element={<Maintrading />} />
          <Route path="/Trading" element={<Trading />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
