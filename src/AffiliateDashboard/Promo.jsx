import React, { useState } from 'react';
import Layout from './Layout';
import { Download, Image } from 'lucide-react';

function Promo() {
  const [activeTab, setActiveTab] = useState('landings');

    // 🖼️ Sample banner data (replace URLs with your actual image links)
   const banners = [
    {
      id: 1,
      title: "Banner 1 (728x90)",
     img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
      size: "100x90",
    },
    {
      id: 2,
      title: "Banner 2 (300x250)",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  size: "100x90",
    },
    {
      id: 3,
      title: "Banner 3 (160x600)",
      img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
        size: "100x90",
    },
  ];
   const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    link.click();
  };
  
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
                  {activeTab === "banners" && (
            <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-6">
              <h3 className="text-lg text-white mb-4 font-semibold">
                Promotional Banners
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((banner) => (
                  <div
                    key={banner.id}
                    className="bg-gray-800/40 border border-gray-700 rounded-xl overflow-hidden flex flex-col"
                  >
                    <img
                      src={banner.img}
                      alt={banner.title}
  className="w-full h-[300px] object-cover"
                    />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-white font-medium mb-1">
                          {/* {banner.title} */}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {/* Size: {banner.size} */}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDownload(banner.img)}
                        className="mt-4 inline-flex items-center justify-center gap-2 h-9 px-3 py-2 w-full rounded-md text-sm font-medium bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                      >
                        <Download className="w-4 h-4" aria-hidden="true" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>



          )}
        </div>
      </div>
    </Layout>
  );
}

export default Promo;