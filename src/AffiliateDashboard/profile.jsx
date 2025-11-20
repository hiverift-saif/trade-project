import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import BASE from "../config";

function Profile() {
  const [getuser, setUser] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "", email: "", emailStatus: "Unverified",
    country: "", whatsapp: "", telegram: "", link: "", description: "",
    oldPassword: "", newPassword: "", confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // Load user from localStorage
  useEffect(() => {
    const userRaw = localStorage.getItem("affiliate_user");
    if (userRaw) {
      const user = JSON.parse(userRaw);
      setUser(user);
      setProfileData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        emailStatus: user.emailStatus || "Unverified",
        country: user.country || "",
        whatsapp: user.whatsapp || "",
        telegram: user.telegram || "",
        link: user.link || "",
        description: user.description || ""
      }));
    }
  }, []);

  const validateProfile = () => {
    let newErrors = {};
    if (!profileData.name.trim()) newErrors.name = "Name is required";
    if (!profileData.country.trim()) newErrors.country = "Country is required";
    if (!profileData.whatsapp.trim()) newErrors.whatsapp = "WhatsApp is required";
    if (!profileData.telegram.trim()) newErrors.telegram = "Telegram is required";
    if (!profileData.link.trim()) newErrors.link = "Link is required";
    if (!profileData.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const validatePassword = () => {
    let newErrors = {};
    if (!profileData.oldPassword) newErrors.oldPassword = "Old password required";
    if (!profileData.newPassword) newErrors.newPassword = "New password required";
    if (profileData.newPassword.length < 6) newErrors.newPassword = "Min 6 characters";
    if (profileData.newPassword === profileData.oldPassword)
      newErrors.newPassword = "New password must be different";
    if (profileData.newPassword !== profileData.confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";
    return newErrors;
  };

  // UPDATE PROFILE
  const handleUpdateProfile = async () => {
    const validationErrors = validateProfile();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoadingUpdate(true);
    setProfileMessage("");

    const token = localStorage.getItem("affiliate_token");
    const userId = getuser?._id;

    if (!userId || !token) {
      setProfileMessage("User not authenticated");
      setLoadingUpdate(false);
      return;
    }

    const payload = {
      name: profileData.name,
      country: profileData.country,
      whatsapp: profileData.whatsapp,
      telegram: profileData.telegram,
      link: profileData.link,
      description: profileData.description
    };

    try {
      const res = await axios.put(
        `${BASE.BASE_URL}/affiliate/auth/updateProfile/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (res.data.statusCode === 200) {
        const updatedUser = res.data.result;
        setUser(updatedUser);
        localStorage.setItem("affiliate_user", JSON.stringify(updatedUser));
        setProfileMessage("Profile updated successfully!");
        setTimeout(() => setProfileMessage(""), 3000);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update profile";
      setProfileMessage(msg);
    } finally {
      setLoadingUpdate(false);
    }
  };

  // CHANGE PASSWORD
  const handleChangePassword = async () => {
    const validationErrors = validatePassword();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoadingPassword(true);
    setPasswordMessage("");

    const token = localStorage.getItem("affiliate_token");
    const userId = getuser?._id;

    if (!userId || !token) {
      setPasswordMessage("User not authenticated");
      setLoadingPassword(false);
      return;
    }

    try {
      const res = await axios.put(
        `${BASE.BASE_URL}/affiliate/auth/updatePassword/${userId}`,
        {
          oldPassword: profileData.oldPassword,
          newPassword: profileData.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (res.data.statusCode === 200) {
        setPasswordMessage("Password changed successfully!");
        setProfileData(prev => ({
          ...prev,
          oldPassword: "", newPassword: "", confirmPassword: ""
        }));
        setTimeout(() => setPasswordMessage(""), 3000);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Password change failed";
      setPasswordMessage(msg);
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleResendVerification = () => {
    setProfileMessage("Verification email sent.");
    setTimeout(() => setProfileMessage(""), 3000);
  };

  if (!getuser) {
    return <Layout pageTitle="Profile"><div className="text-white p-5">Loading...</div></Layout>;
  }

  return (
    <Layout pageTitle="Profile">
      <div className="space-y-4 sm:space-y-6">

        {/* PROFILE SECTION */}
        <div className="flex flex-col gap-4 rounded-xl border bg-gray-900/50 border-gray-800">
          <div className="px-4 sm:px-6 pt-4">
            <h4 className="text-white text-base sm:text-lg">Personal information</h4>
          </div>

          <div className="px-4 sm:px-6 space-y-4">
            {profileMessage && (
              <p className={`text-sm ${profileMessage.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                {profileMessage}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Name *</label>
                <input
                  className="flex h-9 w-full rounded-md border px-3 py-1 bg-gray-800/50 border-gray-700 text-white"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
                {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Email *</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    className="flex h-9 w-full rounded-md border px-3 py-1 bg-gray-800/50 border-gray-700 text-white"
                    value={profileData.email}
                    readOnly
                  />
                  <button className="h-9 px-4 bg-orange-500 text-white rounded-md text-xs">
                    {profileData.emailStatus}
                  </button>
                  <button
                    className="h-9 px-4 text-blue-400 border border-gray-700 rounded-md text-xs"
                    onClick={handleResendVerification}
                  >
                    Resend
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Country *</label>
                <input
                  className="flex h-9 w-full rounded-md border px-3 py-1 bg-gray-800/50 border-gray-700 text-white"
                  value={profileData.country}
                  onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                />
                {errors.country && <p className="text-red-400 text-xs">{errors.country}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">WhatsApp *</label>
                <input
                  className="flex h-9 w-full rounded-md border px-3 py-1 bg-gray-800/50 border-gray-700 text-white"
                  value={profileData.whatsapp}
                  onChange={(e) => setProfileData({ ...profileData, whatsapp: e.target.value })}
                />
                {errors.whatsapp && <p className="text-red-400 text-xs">{errors.whatsapp}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Telegram ID *</label>
                <input
                  className="flex h-9 w-full rounded-md border px-3 py-1 bg-gray-800/50 border-gray-700 text-white"
                  value={profileData.telegram}
                  onChange={(e) => setProfileData({ ...profileData, telegram: e.target.value })}
                />
                {errors.telegram && <p className="text-red-400 text-xs">{errors.telegram}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Link *</label>
                <input
                  className="flex h-9 w-full rounded-md border px-3 py-1 bg-gray-800/50 border-gray-700 text-white"
                  value={profileData.link}
                  onChange={(e) => setProfileData({ ...profileData, link: e.target.value })}
                />
                {errors.link && <p className="text-red-400 text-xs">{errors.link}</p>}
              </div>

              <div className="space-y-1.5 col-span-1 sm:col-span-2">
                <label className="text-sm text-gray-300">Description *</label>
                <textarea
                  className="resize-none min-h-[100px] w-full rounded-md border px-3 py-2 bg-gray-800/50 border-gray-700 text-white"
                  value={profileData.description}
                  onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                />
                {errors.description && <p className="text-red-400 text-xs">{errors.description}</p>}
              </div>
            </div>

            <button
              className="h-9 px-4 mb-5 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-md w-full sm:w-auto disabled:opacity-50"
              onClick={handleUpdateProfile}
              disabled={loadingUpdate}
            >
              {loadingUpdate ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>

        {/* SECURITY SECTION */}
        <div className="flex flex-col gap-4 rounded-xl border bg-gray-900/50 border-gray-800">
          <div className="px-4 sm:px-6 pt-4">
            <h4 className="text-white text-base sm:text-lg">Security</h4>
          </div>

          <div className="px-4 sm:px-6 space-y-4">
            {passwordMessage && (
              <p className={`text-sm ${passwordMessage.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                {passwordMessage}
              </p>
            )}

            <div className="space-y-1.5">
              <label className="text-sm text-gray-300">Old Password *</label>
              <input
                type="password"
                className="flex h-9 w-full rounded-md border px-3 py-1 bg-gray-800/50 border-gray-700 text-white"
                value={profileData.oldPassword}
                onChange={(e) => setProfileData({ ...profileData, oldPassword: e.target.value })}
              />
              {errors.oldPassword && <p className="text-red-400 text-xs">{errors.oldPassword}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-gray-300">New Password *</label>
              <input
                type="password"
                className="flex h-9 w-full rounded-md border px-3 py-1 bg-gray-800/50 border-gray-700 text-white"
                value={profileData.newPassword}
                onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
              />
              {errors.newPassword && <p className="text-red-400 text-xs">{errors.newPassword}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-gray-300">Confirm Password *</label>
              <input
                type="password"
                className="flex h-9 w-full rounded-md border px-3 py-1 bg-gray-800/50 border-gray-700 text-white"
                value={profileData.confirmPassword}
                onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword}</p>}
            </div>

            <button
              className="h-9 px-4 mb-5 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-md w-full sm:w-auto disabled:opacity-50"
              onClick={handleChangePassword}
              disabled={loadingPassword}
            >
              {loadingPassword ? "Changing..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;