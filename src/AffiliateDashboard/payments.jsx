import React, { useState } from 'react';
import Layout from './Layout';
import axios from 'axios';
import Swal from 'sweetalert2';

function Payments() {
  const [activeTab, setActiveTab] = useState('request');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    crypto: 'BTC',
    amount: '',
    address: '',
    otp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Allow only numbers for amount
    if (name === 'amount' && value && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const { amount, address, otp } = formData;
    if (!amount || !address || !otp) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill all fields including OTP.',
        confirmButtonColor: '#f59e0b',
        background: '#1a1a1a',
        color: '#fff',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://192.168.0.112:3000/api/v1/wallet/withdraw',
        {
          crypto: formData.crypto,
          amount: parseInt(formData.amount),
          address: formData.address,
          otp: formData.otp,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.statusCode === 200) {
        await Swal.fire({
          icon: 'success',
          title: 'Withdrawal Initiated!',
          html: `
            <div class="text-left text-sm">
              <p><strong>Amount:</strong> ${formData.amount} ${formData.crypto}</p>
              <p><strong>Address:</strong> ${formData.address}</p>
              <p><strong>TX ID:</strong> <span class="font-mono">${response.data.result.id}</span></p>
              <p><strong>Status:</strong> <span class="text-yellow-400">Pending</span></p>
            </div>
          `,
          confirmButtonColor: '#10b981',
          background: '#1a1a1a',
          color: '#fff',
          backdrop: 'rgba(0,0,0,0.9)',
        });

        // Reset form
        setFormData({ crypto: 'BTC', amount: '', address: '', otp: '' });
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        'Withdrawal failed. Please try again.';

      await Swal.fire({
        icon: 'error',
        title: 'Withdrawal Failed',
        text: msg,
        confirmButtonColor: '#ef4444',
        background: '#1a1a1a',
        color: '#fff',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout pageTitle="Payments">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 bg-gray-800/50 border border-gray-700 rounded-xl p-1">
            {['request', 'history'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 min-w-[100px] px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'request' ? 'Request a Withdrawal' : 'History'}
              </button>
            ))}
          </div>

          {/* Request Tab */}
          {activeTab === 'request' && (
            <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-6 space-y-6">
              <div>
                <h4 className="text-white text-lg font-semibold">Request a Withdrawal</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Withdraw your earnings in BTC or USDT (TRC-20).
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Crypto Type */}
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">Crypto Type</label>
                  <select
                    name="crypto"
                    value={formData.crypto}
                    onChange={handleChange}
                    className="h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    {/* <option value="BTC">Bitcoin (BTC)</option> */}
                    <option value="USDT">USDT (TRC-20)</option>
                  </select>
                </div>

                {/* Amount */}
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      {formData.crypto === 'BTC' ? '₿' : '$'}
                    </span>
                    <input
                      type="text"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className="h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 pl-8 pr-3 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-400">Max: $0.00 (Update from API)</p>
                </div>

                {/* Wallet Address */}
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">Wallet Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Enter wallet address"
                    required
                  />
                </div>

                {/* OTP */}
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">OTP (Sent to Email/Phone)</label>
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    maxLength="6"
                    className="h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50 text-center font-mono text-lg tracking-widest"
                    placeholder="123456"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !formData.amount || !formData.address || !formData.otp}
                  className={`w-full h-10 rounded-md text-sm font-medium transition-all flex items-center justify-center ${
                    loading || !formData.amount || !formData.address || !formData.otp
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit Withdrawal Request'
                  )}
                </button>
              </form>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-8">
              <h4 className="text-white text-lg font-semibold mb-4">
                Withdrawal History
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400 text-left">
                      <th className="p-2">No.</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Amount</th>
                      <th className="p-2">Crypto</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">TX ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800 text-center text-gray-400">
                      <td colSpan="6" className="p-4">
                        No withdrawal history found
                      </td>
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

export default Payments;