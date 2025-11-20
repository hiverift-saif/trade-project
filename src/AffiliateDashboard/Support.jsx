import React, { useState } from 'react';
import Layout from './Layout';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

function Support() {
  const [activeTab, setActiveTab] = useState('requests');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const tabs = [
    { id: 'requests', label: 'Support Requests', content: 'Customer Support Requests' },
  ];



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.post(
        'http://192.168.0.112:4000/api/ticketsubmit',
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.success) {
        // SUCCESS SWEET ALERT
        await Swal.fire({
          icon: 'success',
          title: 'Ticket Created!',
          text: 'Your support ticket has been submitted successfully. We’ll get back to you soon!',
          confirmButtonColor: '#10b981',
          background: '#1a1a1a',
          color: '#fff',
          backdrop: `rgba(0,0,0,0.8)`,
        });

        // Reset form & close modal
        setFormData({ name: '', email: '', phone: '', message: '' });
        setShowModal(false);
      }
    } catch (error) {
      // ERROR SWEET ALERT
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        'Failed to submit. Please try again.';

      await Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: errorMsg,
        confirmButtonColor: '#ef4444',
        background: '#1a1a1a',
        color: '#fff',
        backdrop: `rgba(0,0,0,0.8)`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout pageTitle="Support">
      <div className="space-y-6">

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 bg-gray-800/50 border border-gray-700 rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 min-w-[80px] px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="rounded-xl border bg-gray-900/50 border-gray-800 p-6"
            style={{ display: activeTab === tab.id ? 'block' : 'none' }}
          >
            <h4 className="text-xl text-white font-semibold mb-4">{tab.content}</h4>
            {tab.id === 'requests' ? (
              <>
                <div className="text-center py-8 text-gray-400">No Data Found</div>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center h-10 px-4 py-2 w-full sm:w-auto rounded-md text-sm font-medium bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white transition-all"
                >
                  Create New Support Ticket
                </button>
              </>
            ) : null}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md relative shadow-xl">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
              onClick={() => setShowModal(false)}
              disabled={loading}
            >
              X
            </button>

            <h3 className="text-lg font-semibold text-white mb-4">
              Create Support Ticket
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <input
                type="number"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-lg font-medium text-white transition-all flex items-center justify-center ${
                  loading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
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
                    Submitting...
                  </>
                ) : (
                  'Submit Ticket'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Support;