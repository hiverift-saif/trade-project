// src/components/DashboardLayout.jsx
import React, { useState , useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar'; // Tera TopBar file path check kr lena
import LeftSidebar from './LeftSidebar'; // Tera LeftSidebar file path check kr lena

const DashboardLayout = () => {
  // --- STATE MANAGEMENT ---
  // Ye state yahan isliye hai taaki page change hone par Sidebar band/chalu na ho
const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [activeMenu, setActiveMenu] = useState(null);
  
  // Balance state TopBar ke liye (dummy data ya API se connect kar skta hai)
  const [balance, setBalance] = useState(0.00); 

  // Mobile Toggle Logic
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
  const handleResize = () => {
    setIsSidebarOpen(window.innerWidth >= 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  return (
    <div className="flex flex-col h-screen bg-[#131722] text-white overflow-hidden">
      
      {/* 1. TOP BAR (Fixed Height: h-14) */}
      <div className="h-14 flex-shrink-0 z-50">
        <TopBar 
          balance={balance} 
          setBalance={setBalance}
          onToggleLeftSidebar={toggleSidebar} 
        />
      </div>

      {/* 2. MAIN LAYOUT BODY (Sidebar + Content) */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* LEFT SIDEBAR */}
        {/* 'md:static' ki wajah se desktop pe flex flow me rahega */}
        <LeftSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          // Ye props tere sidebar me use ho rahe the, unhe handle kiya:
          setShowLeftSidebar={setIsSidebarOpen} 
          setShowSignals={() => {}} 
          setShowSocialModal={() => {}}
        />

        {/* CENTER CONTENT (Dynamic Area) */}
        {/* Ye area scroll karega, sidebar aur header fix rahenge */}
        <main className="flex-1 overflow-y-auto bg-[#0b0e14] relative w-full">
           <Outlet /> 
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;