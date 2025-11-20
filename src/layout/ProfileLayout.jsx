// src/layout/ProfileLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import Navbar from "../components/Navbar";

function ProfileLayout() {
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Profile");
  const [showSignals, setShowSignals] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const location = useLocation();

  // Keep Profile menu active when on any profile route
  useEffect(() => {
    if (location.pathname.startsWith('/profile')) {
      setActiveMenu('Profile');
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
        {/* Left Sidebar - Always visible on profile pages */}
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

export default ProfileLayout;