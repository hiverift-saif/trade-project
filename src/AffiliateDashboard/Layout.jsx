import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, X, Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { navItems } from './constants/navItems';

function Layout({ children, pageTitle }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const updatedNavItems = navItems.map(item => ({
    ...item,
    active: item.link === location.pathname
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-80 md:w-64 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-900/50 backdrop-blur-xl md:bg-gray-900/70`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 flex justify-between items-center md:justify-center">
              <h2 className="text-xl font-semibold text-white md:hidden">Menu</h2>
              <button
                onClick={toggleSidebar}
                className="md:hidden text-white focus:outline-none"
                aria-label="Close sidebar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <Sidebar navItems={updatedNavItems} />
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 md:hidden"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}

        {/* Main Content */}
        <div className="flex-1 md:ml-64 transition-all duration-300">
          {/* Top Bar */}
          <div className="bg-gray-900/50 border-b border-gray-800 sticky top-0 z-10 backdrop-blur-xl">
            <div className="px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
                {/* Mobile Top Section */}
                <div className="flex w-full items-center justify-between md:hidden">
                  <button
                    onClick={toggleSidebar}
                    className="text-white focus:outline-none"
                    aria-label="Open sidebar"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  <h1 className="text-lg font-semibold text-white">{pageTitle}</h1>
                  <div className="w-6" />
                </div>

                {/* Search + Balance section (compact on mobile) */}
                <div className="flex w-full flex-col sm:flex-row items-center justify-between gap-3">
                  {/* Search box */}
                  <div className="w-full sm:max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" aria-hidden="true" />
                      <input
                        type="text"
                        className="flex h-9 sm:h-10 w-full rounded-md border px-3 py-1.5 text-sm sm:text-base transition-all outline-none focus-visible:ring-blue-500/50 focus-visible:ring-2 pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                        placeholder="Find client by UID"
                      />
                    </div>
                  </div>

                  {/* Balance info */}
                  <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm">
                    <div className="text-center sm:text-right">
                      <p className="text-[11px] text-gray-400">Balance</p>
                      <p className="text-white text-sm sm:text-base">$0</p>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="text-[11px] text-gray-400">Pending</p>
                      <p className="text-yellow-400 text-sm sm:text-base">$0</p>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="text-[11px] text-gray-400">Hold</p>
                      <p className="text-red-400 text-sm sm:text-base">$0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <main className="p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl text-white font-semibold mb-6 hidden md:block">{pageTitle}</h1>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
