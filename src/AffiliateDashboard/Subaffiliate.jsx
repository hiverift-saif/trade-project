import React, { useState } from 'react';
import Layout from './Layout';
import { Copy } from 'lucide-react';

function Subaffiliate() {
  const [activeTab, setActiveTab] = useState('sub');
  const tabs = [
    { id: 'sub', label: 'Sub Affiliate', content: 'Sub Affiliate' },
    { id: 'day', label: 'Day', content: 'Day' },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.write('https://www.equ.com/affilates/signup?pid=50000');
    alert('Referral link copied to clipboard!');
  };

  return (
    <Layout pageTitle="Sub Affiliate Program">
      <div className="space-y-6 max-w-[1380px]">
        <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Your Affiliate Referral Link:</label>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-base bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                  readOnly
                  value="https://www.e.com/affilates/signup?pid=50000"
                />
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center h-10 px-4 py-2 rounded-md text-sm font-medium border border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700/50"
                >
                  <Copy className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Invite other affiliates to join our affiliate program, and get a percentage of their earnings! See the Affiliate Programs page for details.
            </p>
            <p className="text-gray-400 text-sm">
              You can find the referred affiliate stats below. These stats are updated on a weekly basis.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 bg-gray-800/50 border border-gray-700 rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex-1 min-w-[80px] px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab.id ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className="rounded-xl border bg-gray-900/50 border-gray-800 p-6"
              style={{ display: activeTab === tab.id ? 'block' : 'none' }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-800">
                    <tr>
                      {['No.', 'Partner ID', 'Name', 'Email', 'Total Amount', 'Total Commission'].map((header) => (
                        <th key={header} className="p-4 text-left text-gray-400 font-medium">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="p-4 text-center text-gray-400 py-8" colSpan={6}>No Data Found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Subaffiliate;