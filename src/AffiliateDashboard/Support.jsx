import React, { useState } from 'react';
import Layout from './Layout';

function Support() {
  const [activeTab, setActiveTab] = useState('requests');
  const tabs = [
    { id: 'requests', label: 'Support Requests', content: 'Customer Support Requests' },
    { id: 'feedback', label: 'Feedback', content: 'Feedback' },
    { id: 'faq', label: 'FAQ', content: 'FAQ' },
    { id: 'agreement', label: 'Affiliate Agreement', content: 'Affiliate Agreement' },
    { id: 'review', label: 'Review', content: 'Review' },
  ];

  return (
    <Layout pageTitle="Support">
      <div className="space-y-6 max-w-[1380px]">
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
              <h4 className="text-xl text-white font-semibold mb-4">{tab.content}</h4>
              {tab.id === 'requests' ? (
                <>
                  <div className="text-center py-8 text-gray-400">No Data Found</div>
                  <button
                    className="inline-flex items-center justify-center h-10 px-4 py-2 w-full sm:w-auto rounded-md text-sm font-medium bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                  >
                    Create New Support Ticket
                  </button>
                </>
              ) : (
                <div className="text-center py-8 text-gray-400">{tab.content} content will be added here.</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Support;