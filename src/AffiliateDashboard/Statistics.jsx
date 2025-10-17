import React, { useState } from 'react';
import Layout from './Layout';

function Statistics() {
  const [activeTab, setActiveTab] = useState('day');
  const [startDate, setStartDate] = useState('2025-10-06');
  const [endDate, setEndDate] = useState('2025-10-13');
  const [statsData, setStatsData] = useState([
    {
      date: '2025-10-13',
      clicks: 0,
      registrations: 0,
      deposits: '-',
      depositsSum: '$0.00',
      commission: '$0.00',
      withdrawals: '$0.00',
      traders: 0,
      turnoverAll: '$0.00',
    },
  ]);

  return (
    <Layout pageTitle="Statistics">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 bg-gray-800/50 border border-gray-700 rounded-xl p-1">
            {['day', 'links', 'trader', 'performance'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 min-w-[80px] px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          {activeTab === 'day' && (
            <div className="rounded-xl border bg-gray-900/50 border-gray-800">
              <div className="p-6 space-y-4">
                <h4 className="text-white text-lg font-semibold">Statistics by Day</h4>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <input
                    type="date"
                    className="h-10 w-full sm:w-40 rounded-md border px-3 py-2 text-base bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <input
                    type="date"
                    className="h-10 w-full sm:w-40 rounded-md border px-3 py-2 text-base bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
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
                      {statsData.map((row, index) => (
                        <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
                          <td className="p-2 text-white">{row.date}</td>
                          <td className="p-2 text-white">{row.clicks}</td>
                          <td className="p-2 text-white">{row.registrations}</td>
                          <td className="p-2 text-white">{row.deposits}</td>
                          <td className="p-2 text-white">{row.depositsSum}</td>
                          <td className="p-2 text-white">{row.commission}</td>
                          <td className="p-2 text-white">{row.withdrawals}</td>
                          <td className="p-2 text-white">{row.traders}</td>
                          <td className="p-2 text-white">{row.turnoverAll}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {['links', 'trader', 'performance'].map((tab) => (
            activeTab === tab && (
              <div key={tab} className="rounded-xl border bg-gray-900/50 border-gray-800 p-6">
                <p className="text-white">{tab.charAt(0).toUpperCase() + tab.slice(1)} content will be added here.</p>
              </div>
            )
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Statistics;