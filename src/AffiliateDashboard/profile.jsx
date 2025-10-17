import React, { useState } from 'react';
import Layout from './Layout';

function Profile() {
  const [profileData, setProfileData] = useState({
    name: 'Guest',
    email: 'rs5045100@gmail.com',
    emailStatus: 'Unverified',
    phone: '',
    country: '',
    whatsapp: '',
    telegram: '',
    link: '',
    description: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleUpdateProfile = () => {
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChangePassword = () => {
    if (profileData.newPassword !== profileData.confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }
    setMessage('Password changed successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleResendVerification = () => {
    setMessage('Verification email resent.');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <Layout pageTitle="Profile">
      <div className="space-y-4 sm:space-y-6 max-w-full sm:max-w-4xl">
        {message && <p className="text-green-400">{message}</p>}
        <div className="text-card-foreground flex flex-col gap-4 sm:gap-6 rounded-xl border bg-gray-900/50 border-gray-800">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-4 sm:px-6 pt-4 sm:pt-6">
            <h4 className="leading-none text-white text-base sm:text-lg">Personal information</h4>
          </div>
          <div className="px-4 sm:px-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Name *</label>
                <input
                  className="flex h-9 w-full rounded-md border px-3 py-1 text-base bg-gray-800/50 border-gray-700 text-white"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Email *</label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    className="flex h-9 w-full rounded-md border px-3 py-1 text-base bg-gray-800/50 border-gray-700 text-white"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                  <button className="h-9 px-3 sm:px-4 py-2 border border-gray-700 bg-orange-500 text-white rounded-md text-xs sm:text-sm">
                    {profileData.emailStatus}
                  </button>
                  <button
                    className="h-9 px-3 sm:px-4 py-2 border border-gray-700 text-blue-400 rounded-md text-xs sm:text-sm"
                    onClick={handleResendVerification}
                  >
                    Resend
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Phone Number *</label>
                <input
                  className="flex h-9 w-full rounded-md border px-3 py-1 text-base bg-gray-800/50 border-gray-700 text-white"
                  placeholder="Enter your phone number"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Country *</label>
                <input
                  className="flex h-9 w-full rounded-md border px-3 py-1 text-base bg-gray-800/50 border-gray-700 text-white"
                  placeholder="Enter your country"
                  value={profileData.country}
                  onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">WhatsApp</label>
                <input
                  className="flex h-9 w-full rounded-md border px-3 py-1 text-base bg-gray-800/50 border-gray-700 text-white"
                  placeholder="Enter your WhatsApp no."
                  value={profileData.whatsapp}
                  onChange={(e) => setProfileData({ ...profileData, whatsapp: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Telegram-ID</label>
                <input
                  className="flex h-9 w-full rounded-md border px-3 py-1 text-base bg-gray-800/50 border-gray-700 text-white"
                  placeholder="Enter your Username"
                  value={profileData.telegram}
                  onChange={(e) => setProfileData({ ...profileData, telegram: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Link</label>
                <input
                  className="flex h-9 w-full rounded-md border px-3 py-1 text-base bg-gray-800/50 border-gray-700 text-white"
                  placeholder="Enter your Link"
                  value={profileData.link}
                  onChange={(e) => setProfileData({ ...profileData, link: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-1 sm:col-span-2">
                <label className="text-sm text-gray-300">Description</label>
                <textarea
                  className="resize-none min-h-[100px] w-full rounded-md border px-3 py-2 text-base bg-gray-800/50 border-gray-700 text-white"
                  placeholder="Enter your Description"
                  value={profileData.description}
                  onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                />
              </div>
            </div>
            <button
              className="h-9 px-4 py-2 mb-5 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-md w-full sm:w-auto"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
          </div>
        </div>
        <div className="text-card-foreground flex flex-col gap-4 sm:gap-6 rounded-xl border bg-gray-900/50 border-gray-800">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-4 sm:px-6 pt-4 sm:pt-6">
            <h4 className="leading-none text-white text-base sm:text-lg">Security</h4>
          </div>
          <div className="px-4 sm:px-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Old Password</label>
              <input
                type="password"
                className="flex h-9 w-full rounded-md border px-3 py-1 text-base bg-gray-800/50 border-gray-700 text-white"
                placeholder="Enter your Old Password"
                value={profileData.oldPassword}
                onChange={(e) => setProfileData({ ...profileData, oldPassword: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">New Password</label>
              <input
                type="password"
                className="flex h-9 w-full rounded-md border px-3 py-1 text-base bg-gray-800/50 border-gray-700 text-white"
                placeholder="Enter your New Password"
                value={profileData.newPassword}
                onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Confirm New Password</label>
              <input
                type="password"
                className="flex h-9 w-full rounded-md border px-3 py-1 text-base bg-gray-800/50 border-gray-700 text-white"
                placeholder="Confirm your New Password"
                value={profileData.confirmPassword}
                onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
              />
            </div>
            <button
              className="h-9 px-4 mb-5 py-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-md w-full sm:w-auto"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;