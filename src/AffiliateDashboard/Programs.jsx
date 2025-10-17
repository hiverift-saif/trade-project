import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import { LayoutDashboard, User, ChartColumn, Link2, CreditCard, Image, Send, CircleQuestionMark, FileText, Users, X, Search } from 'lucide-react';

function Programs() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', link: '/Dashboard', active: false },
    { icon: User, label: 'Profile', link: '/profile', active: false },
    { icon: ChartColumn, label: 'Statistics', link: '/statistics', active: false },
    { icon: Link2, label: 'Links', link: '/links', active: false },
    { icon: CreditCard, label: 'Payments', link: '/payments', active: false },
    { icon: Image, label: 'Promo Materials', link: '/promo', active: false },
    { icon: Send, label: 'Telegram Bot', link: '/telegram', active: false },
    { icon: CircleQuestionMark, label: 'Support', link: '/support', active: false },
    { icon: FileText, label: 'Affiliate Programs', link: '/programs', active: true },
    { icon: Users, label: 'Sub Affiliate', link: '/sub-affiliate', active: false },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Toggleable on mobile */}
        <Sidebar navItems={navItems} isOpen={isSidebarOpen} onToggle={toggleSidebar} />

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <main className={`flex-1 ${isSidebarOpen ? 'ml-64 md:ml-64' : 'ml-0'} transition-all duration-300`}>
          {/* Mobile Header with Toggle */}
          <div className="md:hidden bg-gray-900/50 border-b border-gray-800 sticky top-0 z-10 p-4 flex justify-between items-center">
            <button onClick={toggleSidebar} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <h1 className="text-xl text-white font-semibold">Affiliate Programs</h1>
            <button onClick={toggleSidebar} className="text-white focus:outline-none md:hidden">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Custom Header with Search and Balance */}
          <div className="bg-gray-900/50 border-b border-gray-800 sticky top-0 z-10 backdrop-blur-xl">
            <div className="px-6 py-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="w-full max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" aria-hidden="true" />
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border px-3 py-2 text-base transition-all outline-none focus-visible:ring-blue-500/50 focus-visible:ring-2 pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 placeholder:font-normal"
                      placeholder="Find client by UID"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Balance</p>
                    <p className="text-white">$0</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Pending</p>
                    <p className="text-yellow-400">$0</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Hold</p>
                    <p className="text-red-400">$0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="space-y-6 max-w-[1380px]">
              <h1 className="text-3xl text-white font-semibold">Trade Pro Affiliate Program Terms and Conditions</h1>
              <div data-slot="card" className="text-card-foreground flex flex-col gap-6 rounded-xl border bg-gray-900/50 border-gray-800 p-8">
                <div data-slot="card-content" className="space-y-6 text-gray-300 text-sm">
                  <p>
                    The Trade Pro Affiliate Program is designed to reward individuals for promoting our trading platform. Affiliates can earn commissions by referring new traders to Trade Pro. This program is an excellent opportunity for anyone looking to generate additional income by simply sharing their positive experiences with our platform.
                  </p>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-3">Commission Structure</h3>
                    <p>
                      Affiliates can earn up to 80% of the broker's trading commissions. This lucrative commission structure motivates affiliates to refer active traders, which in turn increases their potential earnings. The more active traders you bring on board, the higher your commission will be!
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-3">How to Join</h3>
                    <p className="mb-2">Joining the Trade Pro  Affiliate Program is simple. Follow these steps:</p>
                    <ol className="list-decimal list-inside space-y-2 pl-4">
                      <li>Fill out the registration form available on our website.</li>
                      <li>Accept the terms and conditions of the program.</li>
                      <li>Receive your unique affiliate link and promotional materials.</li>
                      <li>Start promoting and earning commissions!</li>
                    </ol>
                  </div>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-3">Promotional Tools</h3>
                    <p className="mb-2">We provide a variety of marketing materials to help you succeed. These include:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Banners for your website or blog</li>
                      <li>Referral links to track your leads</li>
                      <li>Content suggestions for social media posts</li>
                    </ul>
                    <p className="mt-2">These tools are designed to maximize your potential for attracting new traders.</p>
                  </div>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-3">Support and Resources</h3>
                    <p className="mb-2">Our affiliates have access to a dedicated support team to assist with any questions or challenges. Additionally, we offer:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                      <li>Frequently Asked Questions (FAQs)</li>
                      <li>Webinars and training sessions</li>
                      <li>Access to a community of affiliates</li>
                    </ul>
                    <p className="mt-2">We're committed to helping you succeed in your affiliate marketing journey!</p>
                  </div>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-3">Success Stories and Testimonials</h3>
                    <p className="mb-4">Read inspiring testimonials from our top-performing affiliates:</p>
                    <div className="space-y-4 bg-gray-800/30 p-4 rounded-lg">
                      <p className="italic text-gray-300">"Joining the Trade Pro Affiliate Program changed my life! I never thought I could earn this much by simply sharing a link!" - Jane D.</p>
                      <p className="italic text-gray-300">"The support I received was incredible. The tools provided made it easy to promote and succeed." - John S.</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl text-white font-semibold mb-3">Regulations and Compliance</h3>
                    <p>
                      Affiliates must adhere to our ethical marketing guidelines and comply with legal requirements. This ensures that we maintain the integrity of the Trade Pro brand and protect our community. Familiarize yourself with our compliance policy to ensure your marketing efforts align with our standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Programs;