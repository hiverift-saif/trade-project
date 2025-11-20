import React, { useState } from 'react';
import Layout from './Layout';

function Statistics() {
  const [activeTab, setActiveTab] = useState('day');

  return (
    <Layout pageTitle="Statistics">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 bg-gray-800/50 border border-gray-700 rounded-xl p-1">
            {['day', 'links', 'trader', 'performance'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 min-w-[80px] px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* ✅ DAY TAB STATIC TABLE */}
          {activeTab === 'day' && (
            <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-6">
              <h4 className="text-white text-lg font-semibold mb-4">Statistics by Day</h4>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-800">
                    <tr>
                      {['Date', 'Clicks', 'Registrations', 'Deposits', 'Deposits Sum', 'Commission', 'Withdrawals', 'Traders', 'Turnover All'].map((header) => (
                        <th key={header} className="p-2 text-left text-gray-400 font-medium">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* ✅ Static Rows */}
                    <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-13</td>
                      <td className="p-2 text-white">12</td>
                      <td className="p-2 text-white">3</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$150.00</td>
                      <td className="p-2 text-white">$12.50</td>
                      <td className="p-2 text-white">$0.00</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$540.00</td>
                    </tr>

                    <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>


                         <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>     <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">2025-10-12</td>
                      <td className="p-2 text-white">20</td>
                      <td className="p-2 text-white">4</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$50.00</td>
                      <td className="p-2 text-white">$4.00</td>
                      <td className="p-2 text-white">$15.00</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$300.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ✅ LINKS TAB STATIC TABLE */}
          {activeTab === 'links' && (
            <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-6">
              <h4 className="text-white text-lg font-semibold mb-4">Links Statistics</h4>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-800">
                    <tr>
                      {['Link', 'Clicks', 'Registrations', 'Deposits', 'Commission'].map((header) => (
                        <th key={header} className="p-2 text-left text-gray-400 font-medium">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">https://abc.com/ref123</td>
                      <td className="p-2 text-white">30</td>
                      <td className="p-2 text-white">5</td>
                      <td className="p-2 text-white">2</td>
                      <td className="p-2 text-white">$20</td>
                    </tr>

                    <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">https://abc.com/ref456</td>
                      <td className="p-2 text-white">18</td>
                      <td className="p-2 text-white">3</td>
                      <td className="p-2 text-white">1</td>
                      <td className="p-2 text-white">$9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ✅ TRADER TAB STATIC TABLE */}
          {activeTab === 'trader' && (
            <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-6">
              <h4 className="text-white text-lg font-semibold mb-4">Trader Statistics</h4>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-800">
                    <tr>
                      {['Trader ID', 'Name', 'Deposits', 'Trades', 'Profit', 'Commission'].map((header) => (
                        <th key={header} className="p-2 text-left text-gray-400 font-medium">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">TRD2452</td>
                      <td className="p-2 text-white">Rahul Verma</td>
                      <td className="p-2 text-white">$120</td>
                      <td className="p-2 text-white">42</td>
                      <td className="p-2 text-white">$35</td>
                      <td className="p-2 text-white">$3.50</td>
                    </tr>

                    <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">TRD9821</td>
                      <td className="p-2 text-white">Amit Kumar</td>
                      <td className="p-2 text-white">$80</td>
                      <td className="p-2 text-white">28</td>
                      <td className="p-2 text-white">$12</td>
                      <td className="p-2 text-white">$1.20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ✅ PERFORMANCE TAB STATIC TABLE */}
          {activeTab === 'performance' && (
            <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-6">
              <h4 className="text-white text-lg font-semibold mb-4">Performance Overview</h4>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-800">
                    <tr>
                      {['Metric', 'Value'].map((header) => (
                        <th key={header} className="p-2 text-left text-gray-400 font-medium">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">Total Clicks</td>
                      <td className="p-2 text-white">320</td>
                    </tr>

                    <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">Total Registrations</td>
                      <td className="p-2 text-white">55</td>
                    </tr>

                    <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">Total Deposits</td>
                      <td className="p-2 text-white">$780</td>
                    </tr>

                    <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="p-2 text-white">Total Commission</td>
                      <td className="p-2 text-white">$74.40</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}

export default Statistics;
