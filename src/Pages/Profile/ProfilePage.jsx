import React, { useState } from "react";
import { Eye, EyeOff, Upload, AlertCircle } from "lucide-react";

const ProfilePage = () => {
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [formData, setFormData] = useState({
    name: "user 50032",
    email: "saif755055@gmail.com",
    dob: "",
    country: "India",
    state: "",
    city: "",
    address: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050713] via-[#0d1220] to-[#000000] text-gray-200 p-4 md:p-8 font-sans">
      <div className="max-w-[1780px] mx-auto ">
        
        {/* ================= PERSONAL DATA ================= */}
        <div className="bg-[#1a1d28] border border-[#2d3748] rounded-xl p-6 mb-6">
          <h4 className="text-xl font-semibold text-white mb-6 border-b border-[#2d3748] pb-4">
            Personal Data
          </h4>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-6">
              
              {/* Profile Image */}
              <div className="bg-[#1f2330] p-4 rounded-lg flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-[#3b82f6]">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-2">Upload profile photo via:</p>
                  <label className="flex items-center justify-center sm:justify-start gap-2 cursor-pointer bg-[#2d3748] hover:bg-[#374151] text-white py-2 px-4 rounded transition-colors w-fit">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm">Choose File</span>
                    <input type="file" className="hidden" />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Choose a photo for your account.
                  </p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your Name"
                    className="w-full bg-[#0f172a] border border-[#2d3748] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="block text-sm text-gray-400">Email</label>
                    <div className="flex items-center gap-2">
                      <span className="bg-red-500/10 text-red-500 text-[10px] px-2 py-0.5 rounded border border-red-500/20">
                        Unverified
                      </span>
                      <button className="text-[10px] text-yellow-400 hover:text-yellow-300">
                        Resend
                      </button>
                    </div>
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-[#0f172a] border border-[#2d3748] rounded-lg px-4 py-2.5 text-gray-500 cursor-not-allowed"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    onChange={handleInputChange}
                    className="w-full bg-[#0f172a] border border-[#2d3748] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors [color-scheme:dark]"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-[#0f172a] border border-[#2d3748] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter your State"
                    onChange={handleInputChange}
                    className="w-full bg-[#0f172a] border border-[#2d3748] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your City"
                    onChange={handleInputChange}
                    className="w-full bg-[#0f172a] border border-[#2d3748] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    onChange={handleInputChange}
                    className="w-full bg-[#0f172a] border border-[#2d3748] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-4">
                <button className="bg-white text-black font-semibold py-2.5 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                  Save Personal Data
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ================= DOCUMENT VERIFICATION ================= */}
        <div className="bg-[#1a1d28] border border-[#2d3748] rounded-xl p-6 mb-6">
          <h4 className="text-xl font-semibold text-white mb-4 border-b border-[#2d3748] pb-4">
            Documents Verification
          </h4>
          <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">Webcam not found on this device.</p>
          </div>
        </div>

        {/* ================= SECURITY ================= */}
        <div className="bg-[#1a1d28] border border-[#2d3748] rounded-xl p-6 mb-6">
          <h4 className="text-xl font-semibold text-white mb-6 border-b border-[#2d3748] pb-4">
            Security
          </h4>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              {/* Old Password */}
              <div className="relative">
                <label className="block text-sm text-gray-400 mb-1">Old Password</label>
                <input
                  type={showOldPass ? "text" : "password"}
                  placeholder="Enter old password"
                  className="w-full bg-[#0f172a] border border-[#2d3748] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPass(!showOldPass)}
                  className="absolute right-3 top-[34px] text-gray-400 hover:text-white"
                >
                  {showOldPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* New Password */}
              <div className="relative">
                <label className="block text-sm text-gray-400 mb-1">New Password</label>
                <input
                  type={showNewPass ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full bg-[#0f172a] border border-[#2d3748] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 top-[34px] text-gray-400 hover:text-white"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
                <input
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className="w-full bg-[#0f172a] border border-[#2d3748] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-[34px] text-gray-400 hover:text-white"
                >
                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Update Password
            </button>
          </form>
        </div>

        {/* ================= HISTORY + SESSIONS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Login History */}
          <div className="bg-[#1a1d28] border border-[#2d3748] rounded-xl p-6 h-full">
            <h4 className="text-xl font-semibold text-white mb-4 border-b border-[#2d3748] pb-4">
              Login history
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-[#0f172a] text-gray-200 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Date</th>
                    <th className="px-4 py-3">IP</th>
                    <th className="px-4 py-3">Device/OS</th>
                    <th className="px-4 py-3">Browser</th>
                    <th className="px-4 py-3 rounded-r-lg">Country</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500 italic">
                      No Data Found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-[#1a1d28] border border-[#2d3748] rounded-xl p-6 h-full">
            <div className="flex justify-between items-center mb-4 border-b border-[#2d3748] pb-4">
              <h4 className="text-xl font-semibold text-white">Active sessions</h4>
              <button className="bg-red-500/10 text-red-500 text-xs font-semibold px-3 py-1.5 rounded hover:bg-red-500/20 border border-red-500/20 transition-colors">
                Terminate all
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-[#0f172a] text-gray-200 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Last Activity</th>
                    <th className="px-4 py-3">IP</th>
                    <th className="px-4 py-3">Device</th>
                    <th className="px-4 py-3">Browser</th>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3 rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500 italic">
                      No Data Found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* ================= DELETE ================= */}
        <div className="flex justify-center pb-8">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors w-full max-w-md">
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
