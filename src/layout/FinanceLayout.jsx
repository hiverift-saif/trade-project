// src/layout/FinanceLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import Navbar from "../components/Navbar";

function FinanceLayout() {
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Finance");
  const [showSignals, setShowSignals] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const location = useLocation();

  // Keep Finance menu active when on any finance route
  useEffect(() => {
    if (location.pathname.startsWith('/finance')) {
      setActiveMenu('Finance');
      setShowLeftSidebar(true);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0b1320]">
      {/* Navbar */}
      <Navbar 
        setShowLeftSidebar={setShowLeftSidebar}
        showLeftSidebar={showLeftSidebar}
      />
      
      {/* Main Container with Sidebar */}
      <div className="flex pt-14">
        {/* Left Sidebar - Always visible on finance pages */}
        <LeftSidebar
          isOpen={showLeftSidebar}
          onClose={() => setShowLeftSidebar(false)}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setShowLeftSidebar={setShowLeftSidebar}
          setShowSignals={setShowSignals}
          setShowSocialModal={setShowSocialModal}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default FinanceLayout;