import React, { useState } from 'react';
import Layout from './Layout';
import { Send } from 'lucide-react';

function Telegram() {
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Your Telegram Bot Username
  const botUsername = "Tradee_probot";

  const handleLinkBot = () => {
window.open(`https://t.me/${botUsername}`, "_blank");
  
  };

  return (
    <Layout pageTitle="Telegram Bot">
      <div className="space-y-6">

        <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-6">
          <h4 className="text-xl text-white font-semibold mb-4">Linked Telegram Accounts</h4>
          <div className="text-center py-8 text-gray-400">No Data Found</div>
        </div>

        <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-6">
          <h4 className="text-xl text-white font-semibold mb-4">How It Works</h4>

          <div className="space-y-4">
            {[
              'Click the "Link Telegram Account" button to start the bot.',
              'Use the /start command to start the Bot.',
              'Use the /help command to get list of commands.',
              'Use /todaystats to get Today Stats summary.',
              'Use /yesterdaystats for yesterday summary.',
              'Retrieve user details by typing a valid ID like: id 158 or 158.'
            ].map((text, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 font-medium">{index + 1}</span>
                </div>
                <p className="text-gray-300 text-sm pt-1">{text}</p>
              </div>
            ))}

            {/* ✅ Telegram Bot Link Button */}
            <button
              onClick={handleLinkBot}
              className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 w-full sm:w-auto rounded-md text-sm font-medium bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white mt-6"
            >
              <Send className="w-4 h-4 mr-2" aria-hidden="true" />
              Link Telegram Account
            </button>

          </div>
        </div>

        <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-6">
          <h4 className="text-xl text-white font-semibold mb-4">Telegram Commissions Status</h4>
          <div className="text-center py-8 text-gray-400">No Data Found</div>
        </div>

      </div>
    </Layout>
  );
}

export default Telegram;
