import React, { useState } from 'react';
import Layout from './Layout';

function Payments() {
  const [activeTab, setActiveTab] = useState('request');
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  return (
    <Layout pageTitle="Payments">
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 bg-gray-800/50 border border-gray-700 rounded-xl p-1">
            {['request', 'history'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 min-w-[100px] px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'request' ? 'Request a Withdrawal' : 'History'}
              </button>
            ))}
          </div>
          {activeTab === 'request' && (
            <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-6 space-y-6">
              <div>
                <h4 className="text-white text-lg font-semibold">Request a Withdrawal</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Request a withdrawal of the received commission using the available payment methods.
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 pl-8 pr-3 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Enter amount"
                    />
                  </div>
                  <p className="text-xs text-gray-400">Max: $0.00</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">Payment Method</label>
                  <input
                    readOnly
                    value="USDT_TRC_20 address"
                    className="h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 text-white text-sm outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">Wallet Address</label>
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Enter wallet address"
                  />
                </div>
                <button
                  disabled={!amount || !walletAddress}
                  className={`w-full h-10 rounded-md text-sm font-medium transition-all ${
                    !amount || !walletAddress
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white'
                  }`}
                >
                  Submit Withdrawal Request
                </button>
              </div>
            </div>
          )}
          {activeTab === 'history' && (
            <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-6">
              <p className="text-white">No withdrawal history available.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Payments;