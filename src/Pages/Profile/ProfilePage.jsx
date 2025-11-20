import React, { useState } from 'react';
import { Camera } from 'lucide-react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: 'ramandeepbhangoo.com',
    phone: '',
    dateOfBirth: '',
    islamicHalal: false,
    requiredData: ''
  });

  const [notifications, setNotifications] = useState({
    manager: true,
    companyNews: true,
    companyInnovation: true,
    tradingAnalysis: true,
    stockInvestments: true,
    educationSheets: true,
    schoolNotifications: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleNotificationToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const languages = [
    'English', 'हिन्दी', 'Português', 'Français', 'Italiano', 
    'Español', 'Ελληνικά', 'Nederlands', 'עברית', 'বাংলা',
    'polski', 'Lietuvių', 'Magyar', '中文', 'മലയാളം',
    'தமிழ்', 'اردو', 'ગુજરાતી', 'తెలుగు', 'Afrikaans',
    'Türkçe', '日本語', 'ಕನ್ನಡ', 'मराठी', 'ไทย'
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">User Profile</h1>
        </div>

        {/* Update Button */}
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded mb-6 transition-colors font-medium">
          Update
        </button>

        {/* Identity Info Section */}
        <div className="bg-slate-800 rounded-lg p-4 md:p-6 mb-4">
          <h2 className="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-2">Identity Info</h2>

          <div className="space-y-4">
            {/* First Name */}
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="text-sm text-gray-300 md:w-48 mb-1 md:mb-0">First name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="••••"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="text-sm text-gray-300 md:w-48 mb-1 md:mb-0">Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="••••"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="text-sm text-gray-300 md:w-48 mb-1 md:mb-0">Email</label>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                />
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Unverified</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition-colors whitespace-nowrap">
                  Resend
                </button>
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="text-sm text-gray-300 md:w-48 mb-1 md:mb-0">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="••••"
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="text-sm text-gray-300 md:w-48 mb-1 md:mb-0">Date of birth</label>
              <input
                type="text"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="••••"
              />
            </div>

            {/* Islamic Halal Account */}
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="text-sm text-gray-300 md:w-48 mb-1 md:mb-0">Islamic halal account</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="islamicHalal"
                    checked={formData.islamicHalal === true}
                    onChange={() => setFormData({ ...formData, islamicHalal: true })}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600"
                  />
                  <span className="ml-2 text-sm text-gray-300">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="islamicHalal"
                    checked={formData.islamicHalal === false}
                    onChange={() => setFormData({ ...formData, islamicHalal: false })}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600"
                  />
                  <span className="ml-2 text-sm text-gray-300">No</span>
                </label>
              </div>
            </div>

            {/* Required Data */}
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="text-sm text-gray-300 md:w-48 mb-1 md:mb-0">Required data</label>
              <input
                type="text"
                name="requiredData"
                value={formData.requiredData}
                onChange={handleInputChange}
                className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="•••"
              />
            </div>
          </div>
        </div>

        {/* Identity Status */}
        <div className="bg-slate-800 rounded-lg p-4 md:p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold text-white">Identity status</h2>
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">Unverified</span>
          </div>

          <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg p-4">
            <p className="text-sm text-amber-200">
              Before uploading the documents please fill in this information in your profile: First name, Last name, Date of birth
            </p>
          </div>
        </div>

        {/* Social Trading Section */}
        <div className="bg-slate-800 rounded-lg p-4 md:p-6 mb-4">
          <h2 className="text-lg font-semibold text-white mb-6 border-b border-slate-700 pb-2">Social Trading</h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Section - Left Side */}
            <div className="flex flex-col items-center md:items-start">
              <label className="text-sm text-gray-300 mb-3">Avatar</label>
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border-2 border-slate-600">
                  {/* <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  /> */}
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-colors shadow-lg">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Upload Section - Right Side */}
            <div className="flex-1">
              <label className="text-sm text-gray-300 mb-3 block">Click or Drag image here</label>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-750">
                <div className="flex flex-col items-center justify-center gap-2">
                  <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-400 text-sm">Click or Drag image here</p>
                  <p className="text-xs text-gray-500">
                    Support: JPG, PNG<br />
                    Max size: 5MB | 300 x 300 px
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Email Notifications Section */}
        <div className="bg-slate-800 rounded-lg p-4 md:p-6 mb-4">
          <h2 className="text-lg font-semibold text-white mb-6 border-b border-slate-700 pb-2">Email notifications</h2>

          <div className="space-y-4">
            {/* Subscribed to updates from your Manager */}
            <div className="flex items-center justify-between py-2">
              <label className="text-sm text-gray-300">Subscribed to updates from your Manager</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.manager}
                  onChange={() => handleNotificationToggle('manager')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Subscribed to Company's news */}
            <div className="flex items-center justify-between py-2">
              <label className="text-sm text-gray-300">Subscribed to Company's news</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.companyNews}
                  onChange={() => handleNotificationToggle('companyNews')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Subscribed to Company's Innovation */}
            <div className="flex items-center justify-between py-2">
              <label className="text-sm text-gray-300">Subscribed to Company's Innovation</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.companyInnovation}
                  onChange={() => handleNotificationToggle('companyInnovation')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Subscribed to Company's Trading Analysis */}
            <div className="flex items-center justify-between py-2">
              <label className="text-sm text-gray-300">Subscribed to Company's Trading Analysis</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.tradingAnalysis}
                  onChange={() => handleNotificationToggle('tradingAnalysis')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Subscribed to trading investments */}
            <div className="flex items-center justify-between py-2">
              <label className="text-sm text-gray-300">Subscribed to trading investments</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.stockInvestments}
                  onChange={() => handleNotificationToggle('stockInvestments')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Subscribed on Education Sheets */}
            <div className="flex items-center justify-between py-2">
              <label className="text-sm text-gray-300">Subscribed on Education Sheets</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.educationSheets}
                  onChange={() => handleNotificationToggle('educationSheets')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* School notifications */}
            <div className="flex items-center justify-between py-2">
              <label className="text-sm text-gray-300">School notifications</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.schoolNotifications}
                  onChange={() => handleNotificationToggle('schoolNotifications')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Language Section */}
        <div className="bg-slate-800 rounded-lg p-4 md:p-6 mb-4">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <label className="text-lg font-semibold text-white md:w-32 shrink-0">Language</label>
            <div className="flex-1 flex flex-wrap gap-2">
              {languages.map((lang, index) => (
                <button
                  key={index}
                  className="bg-slate-700 hover:bg-blue-600 text-gray-300 hover:text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Delete Account Button */}
        <button className="w-full bg-[#172832] hover:bg-[#fb5858] text-white py-3 rounded font-semibold transition-colors">
          Delete account
        </button>
      </div>
    </div>
  );
}