// src/Pages/profile/TradingProfilePage.jsx
import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export default function TradingProfilePage() {
  const [dateRange, setDateRange] = useState('2025-11-10 - 2025-11-10');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Trading profile</h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full"></div>
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    User115378818 <span className="text-yellow-500">🎮</span>
                  </div>
                  <div className="text-sm text-slate-400 flex items-center gap-1">
                    UID 115378818 
                    <Copy className="w-3 h-3 cursor-pointer hover:text-white transition-colors" />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-slate-400 mb-1">Balance</div>
                <div className="text-2xl font-bold">₹0</div>
              </div>

              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium mb-2 transition-colors">
                Invest real money
              </button>
              <button className="w-full border border-slate-600 hover:border-slate-500 text-white py-3 rounded-lg font-medium transition-colors">
                open real account
              </button>

              <div className="mt-6">
                <input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-sm"
                />
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700/50 space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="text-slate-400">Trades:</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="text-slate-400">Profitable trades:</span>
                <span className="font-semibold">0%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="text-slate-400">Trading turnover:</span>
                <span className="font-semibold">₹0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="text-slate-400">Trading profit:</span>
                <span className="font-semibold">₹0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="text-slate-400">Max. trade:</span>
                <span className="font-semibold">₹0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="text-slate-400">Min. trade:</span>
                <span className="font-semibold">₹0</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">Max. profit:</span>
                <span className="font-semibold">₹0</span>
              </div>
            </div>

            {/* Bonus Card */}
            <div className="bg-gradient-to-r from-orange-600/20 to-orange-800/20 backdrop-blur rounded-xl p-6 border border-orange-600/30">
              <div className="text-center">
                <div className="font-semibold mb-2">Get 50% bonus</div>
                <div className="text-sm text-slate-300">on your deposit</div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profitability Chart */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold mb-6">Profitability</h3>
              
              {/* Chart Area */}
              <div className="relative h-64 mb-4">
                {/* Y-axis */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-500">
                  <span>0</span>
                </div>
                
                {/* Chart Line */}
                <div className="ml-8 h-full relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full border-2 border-slate-900"></div>
                        <div className="absolute -top-12 right-0 bg-slate-700 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap">
                          Monday, Sep 16, 08:32 AM
                          <div className="text-cyan-400">Profit ₹0</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* X-axis Timeline */}
              <div className="ml-8 flex justify-between text-xs text-slate-500 mt-2 overflow-x-auto">
                <span>Nov 10</span>
                <span>01:00 AM</span>
                <span>02:00 AM</span>
                <span>03:00 AM</span>
                <span>04:00 AM</span>
                <span>05:00 AM</span>
                <span>06:00 AM</span>
                <span>07:00 AM</span>
                <span>08:00 AM</span>
                <span>09:00 AM</span>
                <span>10:00 AM</span>
                <span>11:00 AM</span>
                <span>12:00 PM</span>
                <span>01:00 PM</span>
                <span>02:00 PM</span>
                <span>03:00 PM</span>
                <span>04:00 PM</span>
              </div>
            </div>

            {/* Trades Distribution */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold mb-4">Trades distribution by assets</h3>
              <div className="text-center py-12 text-slate-500">
                No trading history
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}