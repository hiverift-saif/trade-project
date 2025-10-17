import React, { useState } from 'react';
import Layout from './Layout';
import { Download, Image } from 'lucide-react';

function Promo() {
  const [activeTab, setActiveTab] = useState('landings');

  return (
    <Layout pageTitle="Promo Materials">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 bg-gray-800/50 border border-gray-700 rounded-xl p-1">
            {['landings', 'banners'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 min-w-[100px] px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'landings' ? 'Referral Landings' : 'Banners'}
              </button>
            ))}
          </div>
          {activeTab === 'landings' && (
            <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-8 text-center">
              <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl text-white mb-2">Invest anytime, anywhere</h3>
              <p className="text-gray-400 mb-4">Download our promotional materials</p>
              <button
                className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 w-full sm:w-auto rounded-md text-sm font-medium bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
              >
                <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                Download Assets
              </button>
            </div>
          )}
          {activeTab === 'banners' && (
            <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-8 text-center">
              <p className="text-white">Banners content will be added here.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Promo;